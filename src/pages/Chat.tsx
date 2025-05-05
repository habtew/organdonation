// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ArrowLeft, Send } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { Donor } from '../types';
// import { db } from '../../firebase';
// import {
//     collection,
//     query,
//     orderBy,
//     onSnapshot,
//     getDoc,
//     doc,
//     addDoc,
//     serverTimestamp,
//     updateDoc,
//     setDoc,              // <--- Add this line
//   } from 'firebase/firestore';

// interface Message {
//   id: string;
//   text: string;
//   sender: 'user' | 'donor';
//   timestamp: Date;
// }

// const ChatPage: React.FC = () => {
//   const { id: chatId } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { currentUser } = useAuth();

//   const [friend, setFriend] = useState<Donor | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Scroll to bottom when messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Fetch friend user data and ensure chat document exists
//   useEffect(() => {
//     if (!chatId || !currentUser) {
//       navigate('/');
//       return;
//     }

//     const loadFriendAndChat = async () => {
//         try {
//           const [uid1, uid2] = chatId.split('_');
//           const friendId = uid1 === currentUser.id ? uid2 : uid1;
      
//           // Fetch friend user info
//           const friendDoc = await getDoc(doc(db, 'users', friendId));
//           if (!friendDoc.exists()) {
//             alert('User not found.');
//             navigate('/');
//             return;
//           }
//           setFriend(friendDoc.data() as Donor);
      
//           // Create chat document if it doesn't exist
//           const chatDocRef = doc(db, 'chats', chatId);
//           const chatDocSnap = await getDoc(chatDocRef);
//           if (!chatDocSnap.exists()) {
//             await setDoc(chatDocRef, {
//               participants: [uid1, uid2],
//               lastUpdated: serverTimestamp(),
//             });
//           }
//         } catch (err) {
//           console.error('Failed to load friend and chat doc:', err);
//           alert('Failed to load chat. Please try again.');
//           navigate('/');
//         }
//       };

//     loadFriendAndChat();
//   }, [chatId, currentUser, navigate]);

//   // Listen for messages realtime
//   useEffect(() => {
//     if (!chatId) return;

//     const messagesRef = collection(db, 'chats', chatId, 'messages');
//     const q = query(messagesRef, orderBy('timestamp', 'asc'));

//     const unsub = onSnapshot(q, (snapshot) => {
//       const loadedMessages: Message[] = snapshot.docs.map((docSnap) => {
//         const data = docSnap.data();
//         return {
//           id: docSnap.id,
//           text: data.content,
//           sender: data.senderId === currentUser?.id ? 'user' : 'donor',
//           timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
//         };
//       });
//       setMessages(loadedMessages);
//     });

//     return () => unsub();
//   }, [chatId, currentUser]);

//   // Send new message
//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!message.trim() || !chatId || !currentUser) return;

//     try {
//       const messagesRef = collection(db, 'chats', chatId, 'messages');
//       await addDoc(messagesRef, {
//         content: message,
//         senderId: currentUser.id,
//         timestamp: serverTimestamp(),
//       });

//       // Update chat's lastUpdated timestamp
//       await updateDoc(doc(db, 'chats', chatId), {
//         lastUpdated: serverTimestamp(),
//       });

//       setMessage('');
//     } catch (err) {
//       console.error('Failed to send message:', err);
//       alert('Failed to send message. Please try again.');
//     }
//   };

//   if (!friend) {
//     return (
//       <div className="flex items-center justify-center min-h-[calc(100vh-130px)]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(22,163,73)]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full" style={{ minHeight: 'calc(100vh - <navbarHeight> - <footerHeight>)' }}>
//       {/* Header */}
//       <div className="bg-white border-b px-4 py-3 flex items-center sticky top-0 z-0 mt-20">
//         <button
//           onClick={() => navigate(-1)}
//           className="mr-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
//           aria-label="Go back"
//         >
//           <ArrowLeft size={20} />
//         </button>

//         <div className="flex items-center overflow-y-auto">
//           {friend.image ? (
//             <img src={friend.image} alt={friend.name} className="w-10 h-10 rounded-full object-cover mr-3" />
//           ) : (
//             <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//               <span className="text-gray-500 font-semibold">{friend.name.split(' ').map((n) => n[0]).join('')}</span>
//             </div>
//           )}

//           <div>
//             <h1 className="font-medium text-gray-900">{friend.name}</h1>
//             <p className="text-sm text-gray-500">
//               {friend.organType} • {friend.bloodType} • {friend.location}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Messages list */}
//       <div
//         className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4"
//         role="log"
//         aria-live="polite"
//         aria-relevant="additions"
//       >
//         {messages.map((msg) => (
//           <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div
//               className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
//                 msg.sender === 'user'
//                   ? 'bg-[rgb(22,163,73)] text-white rounded-br-none'
//                   : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
//               }`}
//             >
//               <p className="break-words">{msg.text}</p>
//               <p
//                 className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}
//                 aria-label={`Sent at ${new Intl.DateTimeFormat('en-US', {
//                   hour: 'numeric',
//                   minute: 'numeric',
//                   hour12: true,
//                 }).format(msg.timestamp)}`}
//               >
//                 {new Intl.DateTimeFormat('en-US', {
//                   hour: 'numeric',
//                   minute: 'numeric',
//                   hour12: true,
//                 }).format(msg.timestamp)}
//               </p>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input area */}
//       <div className="bg-white border-t p-4 sticky bottom-0 z-10">
//         <form onSubmit={handleSendMessage} className="flex gap-2" aria-label="Message input form">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
//             aria-label="Message input"
//             autoComplete="off"
//           />
//           <button
//             type="submit"
//             className="bg-[rgb(22,163,73)] text-white py-2 px-4 rounded-lg hover:bg-[rgb(18,138,62)] transition-colors duration-200 flex items-center gap-2"
//             aria-label="Send message"
//           >
//             <Send size={18} />
//             <span className="sr-only">Send</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ArrowLeft, Send } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { Donor } from '../types';
// import { db } from '../../firebase';
// import {
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   getDoc,
//   doc,
//   addDoc,
//   serverTimestamp,
//   updateDoc,
//   setDoc,
// } from 'firebase/firestore';

// interface Message {
//   id: string;
//   text: string;
//   sender: 'user' | 'donor';
//   timestamp: Date;
// }

// const ChatPage: React.FC = () => {
//   const { id: chatId } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { currentUser } = useAuth();

//   const [friend, setFriend] = useState<Donor | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Scroll to bottom when messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Fetch friend user data and ensure chat document exists
//   useEffect(() => {
//     if (!chatId || !currentUser) {
//       navigate('/');
//       return;
//     }

//     const loadFriendAndChat = async () => {
//       try {
//         const [uid1, uid2] = chatId.split('_');
//         const friendId = uid1 === currentUser.id ? uid2 : uid1;

//         // Fetch friend user info
//         const friendDoc = await getDoc(doc(db, 'users', friendId));
//         if (!friendDoc.exists()) {
//           alert('User not found.');
//           navigate('/');
//           return;
//         }
//         setFriend(friendDoc.data() as Donor);

//         // Create chat document if it doesn't exist
//         const chatDocRef = doc(db, 'chats', chatId);
//         const chatDocSnap = await getDoc(chatDocRef);
//         if (!chatDocSnap.exists()) {
//           await setDoc(chatDocRef, {
//             participants: [uid1, uid2],
//             lastUpdated: serverTimestamp(),
//           });
//         }
//       } catch (err) {
//         console.error('Failed to load friend and chat doc:', err);
//         alert('Failed to load chat. Please try again.');
//         navigate('/');
//       }
//     };

//     loadFriendAndChat();
//   }, [chatId, currentUser, navigate]);

//   // Listen for messages realtime
//   useEffect(() => {
//     if (!chatId) return;

//     const messagesRef = collection(db, 'chats', chatId, 'messages');
//     const q = query(messagesRef, orderBy('timestamp', 'asc'));

//     const unsub = onSnapshot(q, (snapshot) => {
//       const loadedMessages: Message[] = snapshot.docs.map((docSnap) => {
//         const data = docSnap.data();
//         return {
//           id: docSnap.id,
//           text: data.content,
//           sender: data.senderId === currentUser?.id ? 'user' : 'donor',
//           timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
//         };
//       });
//       setMessages(loadedMessages);
//     });

//     return () => unsub();
//   }, [chatId, currentUser]);

//   // Send new message
//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!message.trim() || !chatId || !currentUser) return;

//     try {
//       const messagesRef = collection(db, 'chats', chatId, 'messages');
//       await addDoc(messagesRef, {
//         content: message,
//         senderId: currentUser.id,
//         timestamp: serverTimestamp(),
//       });

//       // Update chat's lastUpdated timestamp
//       await updateDoc(doc(db, 'chats', chatId), {
//         lastUpdated: serverTimestamp(),
//       });

//       setMessage('');
//     } catch (err) {
//       console.error('Failed to send message:', err);
//       alert('Failed to send message. Please try again.');
//     }
//   };

//   if (!friend) {
//     return (
//       <div className="flex items-center justify-center min-h-[calc(100vh-130px)]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(22,163,73)]"></div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col mt-20"
//       style={{ height: 'calc(100vh - 128px)' }} // Adjust 128px to your navbar + footer height total
//     >
//       {/* Header */}
//       <div className="bg-white border-b px-4 py-3 flex items-center flex-shrink-0" style={{ height: '64px' }}>
//         <button
//           onClick={() => navigate(-1)}
//           className="mr-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
//           aria-label="Go back"
//         >
//           <ArrowLeft size={20} />
//         </button>

//         <div className="flex items-center overflow-y-auto">
//           {friend.image ? (
//             <img src={friend.image} alt={friend.name} className="w-10 h-10 rounded-full object-cover mr-3" />
//           ) : (
//             <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//               <span className="text-gray-500 font-semibold">{friend.name.split(' ').map((n) => n[0]).join('')}</span>
//             </div>
//           )}

//           <div>
//             <h1 className="font-medium text-gray-900">{friend.name}</h1>
//             <p className="text-sm text-gray-500">
//               {friend.organType} • {friend.bloodType} • {friend.location}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Messages list */}
//       <div
//         className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-4"
//         role="log"
//         aria-live="polite"
//         aria-relevant="additions"
//       >
//         {messages.map((msg) => (
//           <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div
//               className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
//                 msg.sender === 'user'
//                   ? 'bg-[rgb(22,163,73)] text-white rounded-br-none'
//                   : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
//               }`}
//             >
//               <p className="break-words">{msg.text}</p>
//               <p
//                 className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}
//                 aria-label={`Sent at ${new Intl.DateTimeFormat('en-US', {
//                   hour: 'numeric',
//                   minute: 'numeric',
//                   hour12: true,
//                 }).format(msg.timestamp)}`}
//               >
//                 {new Intl.DateTimeFormat('en-US', {
//                   hour: 'numeric',
//                   minute: 'numeric',
//                   hour12: true,
//                 }).format(msg.timestamp)}
//               </p>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input area */}
//       <div className="bg-white border-t p-4 flex-shrink-0" style={{ height: '72px' }}>
//         <form onSubmit={handleSendMessage} className="flex gap-2" aria-label="Message input form">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
//             aria-label="Message input"
//             autoComplete="off"
//           />
//           <button
//             type="submit"
//             className="bg-[rgb(22,163,73)] text-white py-2 px-4 rounded-lg hover:bg-[rgb(18,138,62)] transition-colors duration-200 flex items-center gap-2"
//             aria-label="Send message"
//           >
//             <Send size={18} />
//             <span className="sr-only">Send</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Donor } from '../types';
import { db } from '../../firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc,
  setDoc,
} from 'firebase/firestore';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'donor';
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const { id: chatId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [friend, setFriend] = useState<Donor | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom instantly when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages]);

  // Fetch friend user data and ensure chat document exists
  useEffect(() => {
    if (!chatId || !currentUser) {
      navigate('/');
      return;
    }

    const loadFriendAndChat = async () => {
      try {
        const [uid1, uid2] = chatId.split('_');
        const friendId = uid1 === currentUser.id ? uid2 : uid1;

        // Fetch friend user info
        const friendDoc = await getDoc(doc(db, 'users', friendId));
        if (!friendDoc.exists()) {
          alert('User not found.');
          navigate('/');
          return;
        }
        setFriend(friendDoc.data() as Donor);

        // Create chat document if it doesn't exist
        const chatDocRef = doc(db, 'chats', chatId);
        const chatDocSnap = await getDoc(chatDocRef);
        if (!chatDocSnap.exists()) {
          await setDoc(chatDocRef, {
            participants: [uid1, uid2],
            lastUpdated: serverTimestamp(),
          });
        }
      } catch (err) {
        console.error('Failed to load friend and chat doc:', err);
        alert('Failed to load chat. Please try again.');
        navigate('/');
      }
    };

    loadFriendAndChat();
  }, [chatId, currentUser, navigate]);

  // Listen for messages realtime
  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsub = onSnapshot(q, (snapshot) => {
      const loadedMessages: Message[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          text: data.content,
          sender: data.senderId === currentUser?.id ? 'user' : 'donor',
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
        };
      });
      setMessages(loadedMessages);
    });

    return () => unsub();
  }, [chatId, currentUser]);

  // Send new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !chatId || !currentUser) return;

    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      await addDoc(messagesRef, {
        content: message,
        senderId: currentUser.id,
        timestamp: serverTimestamp(),
      });

      // Update chat's lastUpdated timestamp
      await updateDoc(doc(db, 'chats', chatId), {
        lastUpdated: serverTimestamp(),
      });

      setMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
      alert('Failed to send message. Please try again.');
    }
  };

  if (!friend) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-130px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(22,163,73)]"></div>
      </div>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col mt-20"
      style={{ height: 'calc(100vh - 128px)' }} // Adjust 128px to your navbar + footer height total
    >
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center flex-shrink-0" style={{ height: '64px' }}>
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center overflow-y-auto">
          {friend.image ? (
            <img src={friend.image} alt={friend.name} className="w-10 h-10 rounded-full object-cover mr-3" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <span className="text-gray-500 font-semibold">{friend.name.split(' ').map((n) => n[0]).join('')}</span>
            </div>
          )}

          <div>
            <h1 className="font-medium text-gray-900">{friend.name}</h1>
            <p className="text-sm text-gray-500">
              {friend.organType} • {friend.bloodType} • {friend.location}
            </p>
          </div>
        </div>
      </div>

      {/* Messages list */}
      <div
        className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-4"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                msg.sender === 'user'
                  ? 'bg-[rgb(22,163,73)] text-white rounded-br-none'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              <p className="break-words">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}
                aria-label={`Sent at ${new Intl.DateTimeFormat('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                }).format(msg.timestamp)}`}
              >
                {new Intl.DateTimeFormat('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                }).format(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-white border-t p-4 flex-shrink-0" style={{ height: '72px' }}>
        <form onSubmit={handleSendMessage} className="flex gap-2" aria-label="Message input form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
            aria-label="Message input"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-[rgb(22,163,73)] text-white py-2 px-4 rounded-lg hover:bg-[rgb(18,138,62)] transition-colors duration-200 flex items-center gap-2"
            aria-label="Send message"
          >
            <Send size={18} />
            <span className="sr-only">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;