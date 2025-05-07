import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole, User } from '../types';
import UserCard from '../components/UserCard';
import { Search, Filter, Heart, XCircle } from 'lucide-react';
import { db } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';

const organsList = ['kidney', 'liver', 'heart', 'lung', 'pancreas', 'cornea'];

interface ConnectionRequestStatus {
  status: 'pending' | 'accepted' | 'rejected';
  isRequestSender: boolean;
}

const Connection: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // --- State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrgan, setSelectedOrgan] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<Record<string, boolean>>({});
  const [connectionRequests, setConnectionRequests] = useState<Record<string, ConnectionRequestStatus>>({}); // updated type
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // --- Redirect if not logged in ---
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
  }, [currentUser, navigate]);

  // --- Listen to friends and connection requests ---
  useEffect(() => {
    if (!currentUser) return;

    const friendsRef = doc(db, 'friends', currentUser.id);
    const unsubFriends = onSnapshot(friendsRef, (docSnap) => {
      if (docSnap.exists()) {
        setFriends(docSnap.data() as Record<string, boolean>);
      } else {
        setFriends({});
      }
    });

    const connReqQuery = query(
      collection(db, 'connectionRequests'),
      where('participants', 'array-contains', currentUser.id)
    );

    const unsubRequests = onSnapshot(connReqQuery, (querySnap) => {
      const reqs: Record<string, ConnectionRequestStatus> = {};
      querySnap.forEach((doc) => {
        const data = doc.data();
        const otherUserId = data.fromUserId === currentUser.id ? data.toUserId : data.fromUserId;
        const isRequestSender = data.fromUserId === currentUser.id;

        reqs[otherUserId] = {
          status: data.status,
          isRequestSender,
        };
      });
      setConnectionRequests(reqs);
    });

    return () => {
      unsubFriends();
      unsubRequests();
    };
  }, [currentUser]);

  // --- Fetch users based on currentUser.role ---
  useEffect(() => {
    if (!currentUser) return;

    async function fetchUsers() {
      setLoadingUsers(true);
      try {
        let rolesToLoad: UserRole[] = [];

        if (currentUser.role === UserRole.DONOR) {
          rolesToLoad = [UserRole.RECEIVER, UserRole.DOCTOR];
        } else if (currentUser.role === UserRole.RECEIVER) {
          rolesToLoad = [UserRole.DONOR, UserRole.DOCTOR];
        } else if (currentUser.role === UserRole.DOCTOR) {
          rolesToLoad = [UserRole.DONOR, UserRole.RECEIVER, UserRole.DOCTOR];
        }

        const roleCollectionMap: Record<UserRole, string> = {
          [UserRole.DONOR]: 'donors',
          [UserRole.RECEIVER]: 'receivers',
          [UserRole.DOCTOR]: 'doctors',
        };

        let allUserIds: string[] = [];

        for (const role of rolesToLoad) {
          const collRef = collection(db, roleCollectionMap[role]);
          const docs = await getDocs(collRef);
          allUserIds.push(...docs.docs.map((d) => d.id));
        }

        // Remove duplicates and self
        allUserIds = Array.from(new Set(allUserIds)).filter((id) => id !== currentUser.id);

        const userDocsPromises = allUserIds.map((uid) => getDoc(doc(db, 'users', uid)));
        const userDocs = await Promise.all(userDocsPromises);

        const fetchedUsers = userDocs
          .filter((d) => d.exists())
          .map((d) => ({ id: d.id, ...d.data() } as User));

        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoadingUsers(false);
      }
    }

    fetchUsers();
  }, [currentUser]);

  // --- Filter users ---
  useEffect(() => {
    if (!users) return;

    const filtered = users.filter((user) => {
      const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());

      let userOrgans: string[] = [];

      if (user.role === UserRole.DONOR && 'organsToDonate' in user) {
        userOrgans = (user as any).organsToDonate || [];
      } else if (user.role === UserRole.RECEIVER && 'organsNeeded' in user) {
        userOrgans = (user as any).organsNeeded || [];
      }

      if (!selectedOrgan) {
        return nameMatch;
      }
      return nameMatch && userOrgans.some((o) => o.toLowerCase() === selectedOrgan.toLowerCase());
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedOrgan]);

  // --- Send connection request (with optimistic update) ---
  const sendConnectionRequest = async () => {
    if (!currentUser || !selectedUser) return;

    if (connectionRequests[selectedUser.id]?.status === 'pending') {
      alert('Connection request is already pending.');
      setShowConnectModal(false);
      return;
    }

    // Optimistic update
    setConnectionRequests((prev) => ({
      ...prev,
      [selectedUser.id]: { status: 'pending', isRequestSender: true },
    }));
    setShowConnectModal(false);

    try {
      const newRequestRef = doc(collection(db, 'connectionRequests'));

      await setDoc(newRequestRef, {
        fromUserId: currentUser.id,
        toUserId: selectedUser.id,
        participants: [currentUser.id, selectedUser.id],
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      alert(`Connection request sent to ${selectedUser.name}`);
    } catch (err) {
      console.error('Failed to send connection request:', err);
      alert('Failed to send connection request.');

      // Revert optimistic update if failed
      setConnectionRequests((prev) => {
        const copy = { ...prev };
        delete copy[selectedUser.id];
        return copy;
      });
    }
  };

  // --- Accept connection request -- batch update for atomicity ---
  const acceptRequest = async (fromUserId: string) => {
    if (!currentUser) return;

    try {
      const batch = writeBatch(db);

      const q = query(
        collection(db, 'connectionRequests'),
        where('fromUserId', '==', fromUserId),
        where('toUserId', '==', currentUser.id),
        where('status', '==', 'pending')
      );

      const querySnap = await getDocs(q);

      if (querySnap.empty) return;

      querySnap.forEach((docSnap) => {
        batch.update(docSnap.ref, { status: 'accepted' });
      });

      const currentUserFriendsRef = doc(db, 'friends', currentUser.id);
      const fromUserFriendsRef = doc(db, 'friends', fromUserId);

      batch.set(currentUserFriendsRef, { [fromUserId]: true }, { merge: true });
      batch.set(fromUserFriendsRef, { [currentUser.id]: true }, { merge: true });

      await batch.commit();

      // Optimistic UI updates
      setConnectionRequests((prev) => ({
        ...prev,
        [fromUserId]: { status: 'accepted', isRequestSender: false },
      }));

      setFriends((prev) => ({
        ...prev,
        [fromUserId]: true,
      }));

      alert('Connection request accepted!');
    } catch (err) {
      console.error('Failed to accept connection request:', err);
      alert('Failed to accept connection request.');
    }
  };

  // --- Filter friends from users list ---
  const friendsList = users.filter((u) => friends[u.id]);

  // --- Modal handling ---
  const handleConnect = (user: User) => {
    setSelectedUser(user);
    setShowConnectModal(true);
  };

  // navigate to chat
  function getChatId(uid1: string, uid2: string) {
    return [uid1, uid2].sort().join('_');
  }
  
  function navigateToChat(friend: User) {
    if (!currentUser) return;
    const chatId = getChatId(currentUser.id, friend.id);
    navigate(`/chat/${chatId}`);
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black px-6 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Potential Matches</h1>
            <p className="text-gray-300">
              {currentUser?.role === UserRole.DONOR
                ? 'Find recipients in need of your organs'
                : currentUser?.role === UserRole.RECEIVER
                ? 'Find donors with matching organs'
                : 'Review potential matches between donors and recipients'}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-gray-100 px-6 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                />
              </div>

              <div className="md:w-64">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={selectedOrgan}
                    onChange={(e) => setSelectedOrgan(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent appearance-none"
                  >
                    <option value="">All Organs</option>
                    {organsList.map((organ) => (
                      <option key={organ} value={organ}>
                        {organ.charAt(0).toUpperCase() + organ.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Friends Section */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Matches</h2>
            {friendsList.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {friendsList.map((friend) => (
                  <UserCard
                    key={friend.id}
                    user={friend}
                    showConnectButton={false} // no connect button for friends
                    showChatButton={true}     // show chat button for friends
                    onChat={() => navigateToChat(friend)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">You have no friends yet.</p>
            )}
          </div>

          {/* Connection List */}
          <div className="p-6">
            {loadingUsers ? (
              <p>Loading users...</p>
            ) : filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    disabled={!!friends[user.id]}
                    showConnectButton={!friends[user.id] && connectionRequests[user.id]?.status !== 'pending'}
                    pending={connectionRequests[user.id]?.status === 'pending'}
                    isRequestSender={connectionRequests[user.id]?.isRequestSender || false}
                    onConnect={() => handleConnect(user)}
                    onAcceptRequest={
                      connectionRequests[user.id]?.status === 'pending' &&
                      !connectionRequests[user.id]?.isRequestSender && // only receiver sees accept
                      user.id !== currentUser?.id
                        ? () => acceptRequest(user.id)
                        : undefined
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 inline-block p-4 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {searchTerm || selectedOrgan
                    ? 'Try adjusting your search or filter criteria'
                    : 'There are no matching users available at this time. Please check back later.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connection Modal */}
      {showConnectModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative animate-fadeIn">
            <button
              onClick={() => setShowConnectModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <XCircle className="h-6 w-6" />
            </button>

            <div className="text-center mb-6">
              <div className="bg-[rgb(22,163,73)] bg-opacity-10 inline-block p-3 rounded-full mb-4">
                <Heart className="h-8 w-8 text-[rgb(22,163,73)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Connect with {selectedUser.name}</h3>
              <p className="text-gray-600 mt-1">
                Send a connection request to initiate the matching process
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                placeholder="Include a personal message with your connection request..."
              ></textarea>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowConnectModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={sendConnectionRequest}
                className="flex-1 bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 px-4 rounded-md transition-colors duration-300"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connection;