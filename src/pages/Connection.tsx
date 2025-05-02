import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole, Donor, Receiver } from '../types';
import { getDonors, getReceivers } from '../utils/mockData';
import UserCard from '../components/UserCard';
import { Search, Filter, Heart, XCircle } from 'lucide-react';

const Connection: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrgan, setSelectedOrgan] = useState<string>('');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Donor | Receiver | null>(null);
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) {
    return null; // Will redirect via useEffect
  }

  // Get users based on the current user's role
  const users = currentUser.role === UserRole.DONOR 
    ? getReceivers() 
    : currentUser.role === UserRole.RECEIVER
    ? getDonors()
    : [...getDonors(), ...getReceivers()]; // Doctors can see both

  // Filter users based on search term and selected organ
  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!selectedOrgan) {
      return nameMatch;
    }
    
    // Check if the user has the selected organ (either to donate or needed)
    const userOrgans = 'organsToDonatе' in user 
      ? user.organsToDonatе 
      : 'organsNeeded' in user
      ? user.organsNeeded
      : [];
    
    return nameMatch && userOrgans.some(organ => organ.toLowerCase() === selectedOrgan.toLowerCase());
  });

  const handleConnect = (user: Donor | Receiver) => {
    setSelectedUser(user);
    setShowConnectModal(true);
  };

  const sendConnectionRequest = () => {
    // In a real app, this would send a connection request to the backend
    setShowConnectModal(false);
    // Show a success message or notification
    alert(`Connection request sent to ${selectedUser?.name}`);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black px-6 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Connections</h1>
            <p className="text-gray-300">
              {currentUser.role === UserRole.DONOR 
                ? 'Find recipients in need of your organs' 
                : currentUser.role === UserRole.RECEIVER
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
                    <option value="kidney">Kidney</option>
                    <option value="liver">Liver</option>
                    <option value="heart">Heart</option>
                    <option value="lung">Lung</option>
                    <option value="pancreas">Pancreas</option>
                    <option value="cornea">Cornea</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Connection List */}
          <div className="p-6">
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    showConnectButton={true}
                    onConnect={() => handleConnect(user)}
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