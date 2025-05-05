// import React from 'react';
// import { User, UserRole, Organ, Donor, Receiver } from '../types';
// import { Heart, User as UserIcon, Stethoscope } from 'lucide-react';

// interface UserCardProps {
//   user: User;
//   showConnectButton?: boolean;
//   onConnect?: () => void;
// }

// const UserCard: React.FC<UserCardProps> = ({ user, showConnectButton = false, onConnect }) => {
//   const getRoleIcon = (role: UserRole) => {
//     switch (role) {
//       case UserRole.DONOR:
//         return <Heart className="h-5 w-5 text-[rgb(22,163,73)]" />;
//       case UserRole.RECEIVER:
//         return <UserIcon className="h-5 w-5 text-blue-500" />;
//       case UserRole.DOCTOR:
//         return <Stethoscope className="h-5 w-5 text-purple-500" />;
//       default:
//         return null;
//     }
//   };

//   const formatOrgans = (organs: Organ[]) => {
//     return organs.map(organ => organ.charAt(0).toUpperCase() + organ.slice(1)).join(', ');
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-[1.02] border-l-4 border-[rgb(22,163,73)]">
//       <div className="flex justify-between items-start">
//         <div className="flex items-center">
//           <div className="bg-gray-100 p-3 rounded-full mr-4">
//             {getRoleIcon(user.role)}
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">{user.name}</h3>
//             <p className="text-gray-600 text-sm capitalize">{user.role}</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4">
//         <p className="text-sm text-gray-600">Age: {user.age}</p>
        
//         {user.role === UserRole.DONOR && (
//           <p className="text-sm text-gray-600 mt-1">
//             Organs to donate: {formatOrgans((user as Donor).organsToDonatе)}
//           </p>
//         )}
        
//         {user.role === UserRole.RECEIVER && (
//           <>
//             <p className="text-sm text-gray-600 mt-1">
//               Organs needed: {formatOrgans((user as Receiver).organsNeeded)}
//             </p>
//             <p className="text-sm text-gray-600 mt-1">
//               Status: <span className="capitalize">{(user as Receiver).status}</span>
//             </p>
//           </>
//         )}
//       </div>

//       {showConnectButton && (
//         <button
//           onClick={onConnect}
//           className="mt-4 w-full bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 px-4 rounded-md transition-colors duration-300"
//         >
//           Connect
//         </button>
//       )}
//     </div>
//   );
// };

// export default UserCard;


// import React from 'react';
// import { User, UserRole, Organ, Donor, Receiver } from '../types';
// import { Heart, User as UserIcon, Stethoscope, XCircle, CheckCircle, Clock } from 'lucide-react';

// interface UserCardProps {
//   user: User;
//   showConnectButton?: boolean;
//   onConnect?: () => void;
//   disabled?: boolean;               // disable connect button (e.g., if already friend)
//   pending?: boolean;                // shows request pending state
//   onAcceptRequest?: () => void;    // callback to accept friend request
// }

// const UserCard: React.FC<UserCardProps> = ({
//   user,
//   showConnectButton = false,
//   onConnect,
//   disabled = false,
//   pending = false,
//   onAcceptRequest,
// }) => {
//   const getRoleIcon = (role: UserRole) => {
//     switch (role) {
//       case UserRole.DONOR:
//         return <Heart className="h-5 w-5 text-[rgb(22,163,73)]" />;
//       case UserRole.RECEIVER:
//         return <UserIcon className="h-5 w-5 text-blue-500" />;
//       case UserRole.DOCTOR:
//         return <Stethoscope className="h-5 w-5 text-purple-500" />;
//       default:
//         return null;
//     }
//   };

//   const formatOrgans = (organs: Organ[]) => {
//     return organs
//       .map((organ) => organ.charAt(0).toUpperCase() + organ.slice(1))
//       .join(', ');
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-[1.02] border-l-4 border-[rgb(22,163,73)]">
//       <div className="flex justify-between items-start">
//         <div className="flex items-center">
//           <div className="bg-gray-100 p-3 rounded-full mr-4">{getRoleIcon(user.role)}</div>
//           <div>
//             <h3 className="text-lg font-semibold">{user.name}</h3>
//             <p className="text-gray-600 text-sm capitalize">{user.role}</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4">
//         <p className="text-sm text-gray-600">Age: {user.age}</p>

//         {user.role === UserRole.DONOR && (
//           <p className="text-sm text-gray-600 mt-1">
//             Organs to donate: {formatOrgans((user as Donor).organsToDonate)}
//           </p>
//         )}

//         {user.role === UserRole.RECEIVER && (
//           <>
//             <p className="text-sm text-gray-600 mt-1">
//               Organs needed: {formatOrgans((user as Receiver).organsNeeded)}
//             </p>
//             <p className="text-sm text-gray-600 mt-1">
//               Status: <span className="capitalize">{(user as Receiver).status}</span>
//             </p>
//           </>
//         )}
//       </div>

//       {/* If showConnectButton AND user has a pending request */}
//       {pending && <div className="mt-4 flex items-center text-yellow-700 font-semibold">
//         <Clock className="mr-2" /> Pending
//       </div>}

//       {/* Accept request button */}
//       {onAcceptRequest && (
//         <button
//           onClick={onAcceptRequest}
//           className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
//         >
//           <CheckCircle className="mr-2" /> Accept Request
//         </button>
//       )}

//       {/* Connect (send request) button */}
//       {!pending && !onAcceptRequest && showConnectButton && (
//         <button
//           onClick={onConnect}
//           disabled={disabled}
//           className={`mt-4 w-full ${
//             disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)]'
//           } text-white py-2 px-4 rounded-md transition-colors duration-300`}
//         >
//           Connect
//         </button>
//       )}
//     </div>
//   );
// };

// export default UserCard;


// import React from 'react';
// import { User, UserRole, Organ, Donor, Receiver } from '../types';
// import { Heart, User as UserIcon, Stethoscope, CheckCircle, Clock } from 'lucide-react';

// interface UserCardProps {
//   user: User;
//   showConnectButton?: boolean;
//   onConnect?: () => void;
//   disabled?: boolean;
//   pending?: boolean;
//   onAcceptRequest?: () => void;
// }

// const UserCard: React.FC<UserCardProps> = ({
//   user,
//   showConnectButton = false,
//   onConnect,
//   disabled = false,
//   pending = false,
//   onAcceptRequest,
// }) => {
//   // Get icon for user role
//   const getRoleIcon = (role: UserRole) => {
//     switch (role) {
//       case UserRole.DONOR:
//         return <Heart className="h-5 w-5 text-[rgb(22,163,73)]" />;
//       case UserRole.RECEIVER:
//         return <UserIcon className="h-5 w-5 text-blue-500" />;
//       case UserRole.DOCTOR:
//         return <Stethoscope className="h-5 w-5 text-purple-500" />;
//       default:
//         return null;
//     }
//   };

//   // Get border color based on role
//   const getBorderColor = (role: UserRole) => {
//     switch (role) {
//       case UserRole.DONOR:
//         return 'border-[rgb(22,163,73)]';
//       case UserRole.RECEIVER:
//         return 'border-blue-500';
//       case UserRole.DOCTOR:
//         return 'border-purple-500';
//       default:
//         return 'border-gray-300';
//     }
//   };

//   // Safely format organs array, handle undefined or empty array
//   const formatOrgans = (organs?: Organ[]) => {
//     if (!organs || organs.length === 0) return 'None';
//     return organs
//       .map((organ) => organ.charAt(0).toUpperCase() + organ.slice(1))
//       .join(', ');
//   };

//   return (
//     <div
//       className={`bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-[1.02] border-l-4 ${getBorderColor(
//         user.role
//       )}`}
//     >
//       <div className="flex justify-between items-start">
//         <div className="flex items-center">
//           <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-100 flex items-center justify-center">
//             {'photoURL' in user && user.photoURL ? (
//               <img
//                 src={user.photoURL}
//                 alt={`${user.name} avatar`}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               getRoleIcon(user.role)
//             )}
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">{user.name}</h3>
//             <p className="text-gray-600 text-sm capitalize">{user.role}</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4">
//         <p className="text-sm text-gray-600">Age: {user.age ?? 'N/A'}</p>

//         {user.role === UserRole.DONOR && (
//           <p className="text-sm text-gray-600 mt-1">
//             Organs to donate:{' '}
//             {formatOrgans((user as Donor).organsToDonate)}
//           </p>
//         )}

//         {user.role === UserRole.RECEIVER && (
//           <>
//             <p className="text-sm text-gray-600 mt-1">
//               Organs needed:{' '}
//               {formatOrgans((user as Receiver).organsNeeded)}
//             </p>
//             <p className="text-sm text-gray-600 mt-1">
//               Status:{' '}
//               <span className="capitalize">
//                 {(user as Receiver).status ?? 'Unknown'}
//               </span>
//             </p>
//           </>
//         )}
//       </div>

//       {pending && (
//         <div className="mt-4 flex items-center text-yellow-700 font-semibold">
//           <Clock className="mr-2" /> Pending
//         </div>
//       )}

//       {onAcceptRequest && (
//         <button
//           onClick={() => onAcceptRequest()}
//           className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
//           aria-label="Accept friend request"
//         >
//           <CheckCircle className="mr-2" /> Accept Request
//         </button>
//       )}

//       {!pending && !onAcceptRequest && showConnectButton && (
//         <button
//           onClick={() => onConnect && onConnect()}
//           disabled={disabled}
//           className={`mt-4 w-full ${
//             disabled
//               ? 'bg-gray-300 cursor-not-allowed'
//               : 'bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)]'
//           } text-white py-2 px-4 rounded-md transition-colors duration-300`}
//           aria-label="Connect with user"
//         >
//           Connect
//         </button>
//       )}
//     </div>
//   );
// };

// export default UserCard;


// import React from 'react';
// import { User, UserRole, Organ, Donor, Receiver } from '../types';
// import { Heart, User as UserIcon, Stethoscope, CheckCircle, Clock } from 'lucide-react';

// interface UserCardProps {
//   user: User;
//   showConnectButton?: boolean;
//   onConnect?: () => void;
//   disabled?: boolean;
//   pending?: boolean;                 // Is connection request pending (any side)
//   isRequestSender?: boolean;        // Did current user send this request (shows "Pending")
//   onAcceptRequest?: () => void;     // Accept request callback (only show if current user is receiver)
// }

// const UserCard: React.FC<UserCardProps> = ({
//   user,
//   showConnectButton = false,
//   onConnect,
//   disabled = false,
//   pending = false,
//   isRequestSender = false,
//   onAcceptRequest,
// }) => {
//   const getRoleIcon = (role: UserRole) => {
//     switch (role) {
//       case UserRole.DONOR:
//         return <Heart className="h-5 w-5 text-[rgb(22,163,73)]" />;
//       case UserRole.RECEIVER:
//         return <UserIcon className="h-5 w-5 text-blue-500" />;
//       case UserRole.DOCTOR:
//         return <Stethoscope className="h-5 w-5 text-purple-500" />;
//       default:
//         return null;
//     }
//   };

//   const getBorderColor = (role: UserRole) => {
//     switch (role) {
//       case UserRole.DONOR:
//         return 'border-[rgb(22,163,73)]';
//       case UserRole.RECEIVER:
//         return 'border-blue-500';
//       case UserRole.DOCTOR:
//         return 'border-purple-500';
//       default:
//         return 'border-gray-300';
//     }
//   };

//   const formatOrgans = (organs?: Organ[]) => {
//     if (!organs || organs.length === 0) return 'None';
//     return organs
//       .map((organ) => organ.charAt(0).toUpperCase() + organ.slice(1))
//       .join(', ');
//   };

//   return (
//     <div
//       className={`bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-[1.02] border-l-4 ${getBorderColor(
//         user.role
//       )}`}
//     >
//       <div className="flex justify-between items-start">
//         <div className="flex items-center">
//           <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-100 flex items-center justify-center">
//             {'photoURL' in user && user.photoURL ? (
//               <img
//                 src={user.photoURL}
//                 alt={`${user.name} avatar`}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               getRoleIcon(user.role)
//             )}
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">{user.name}</h3>
//             <p className="text-gray-600 text-sm capitalize">{user.role}</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4">
//         <p className="text-sm text-gray-600">Age: {user.age ?? 'N/A'}</p>

//         {user.role === UserRole.DONOR && (
//           <p className="text-sm text-gray-600 mt-1">
//             Organs to donate:{' '}
//             {formatOrgans((user as Donor).organsToDonate)}
//           </p>
//         )}

//         {user.role === UserRole.RECEIVER && (
//           <>
//             <p className="text-sm text-gray-600 mt-1">
//               Organs needed:{' '}
//               {formatOrgans((user as Receiver).organsNeeded)}
//             </p>
//             <p className="text-sm text-gray-600 mt-1">
//               Status:{' '}
//               <span className="capitalize">
//                 {(user as Receiver).status ?? 'Unknown'}
//               </span>
//             </p>
//           </>
//         )}
//       </div>

//       {/* Show Pending if connection is pending and current user sent the request */}
//       {pending && isRequestSender && (
//         <div className="mt-4 flex items-center text-yellow-700 font-semibold">
//           <Clock className="mr-2" /> Pending
//         </div>
//       )}

//       {/* Show Accept Request button only if connection is pending and current user is receiver */}
//       {!isRequestSender && pending && onAcceptRequest && (
//         <button
//           onClick={() => onAcceptRequest()}
//           className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
//           aria-label="Accept connection request"
//         >
//           <CheckCircle className="mr-2" /> Accept Request
//         </button>
//       )}

//       {/* Show Connect button only when no pending request and no accept possible */}
//       {!pending && !onAcceptRequest && showConnectButton && (
//         <button
//           onClick={() => onConnect && onConnect()}
//           disabled={disabled}
//           className={`mt-4 w-full ${
//             disabled
//               ? 'bg-gray-300 cursor-not-allowed'
//               : 'bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)]'
//           } text-white py-2 px-4 rounded-md transition-colors duration-300`}
//           aria-label="Connect with user"
//         >
//           Connect
//         </button>
//       )}
//     </div>
//   );
// };

// export default UserCard;

import React from 'react';
import { User, UserRole, Organ, Donor, Receiver } from '../types';
import { Heart, User as UserIcon, Stethoscope, CheckCircle, Clock } from 'lucide-react';

interface UserCardProps {
  user: User;
  showConnectButton?: boolean;
  onConnect?: () => void;
  disabled?: boolean;
  pending?: boolean;
  isRequestSender?: boolean;
  onAcceptRequest?: () => void;
  showChatButton?: boolean;
  onChat?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  showConnectButton = false,
  onConnect,
  disabled = false,
  pending = false,
  isRequestSender = false,
  onAcceptRequest,
  showChatButton = false,
  onChat,
}) => {
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.DONOR:
        return <Heart className="h-5 w-5 text-[rgb(22,163,73)]" />;
      case UserRole.RECEIVER:
        return <UserIcon className="h-5 w-5 text-blue-500" />;
      case UserRole.DOCTOR:
        return <Stethoscope className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const getBorderColor = (role: UserRole) => {
    switch (role) {
      case UserRole.DONOR:
        return 'border-[rgb(22,163,73)]';
      case UserRole.RECEIVER:
        return 'border-blue-500';
      case UserRole.DOCTOR:
        return 'border-purple-500';
      default:
        return 'border-gray-300';
    }
  };

  const formatOrgans = (organs?: Organ[]) => {
    if (!organs || organs.length === 0) return 'None';
    return organs
      .map((organ) => organ.charAt(0).toUpperCase() + organ.slice(1))
      .join(', ');
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-[1.02] border-l-4 ${getBorderColor(
        user.role
      )}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-100 flex items-center justify-center">
            {'photoURL' in user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt={`${user.name} avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              getRoleIcon(user.role)
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600 text-sm capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">Age: {user.age ?? 'N/A'}</p>

        {user.role === UserRole.DONOR && (
          <p className="text-sm text-gray-600 mt-1">
            Organs to donate:{' '}
            {formatOrgans((user as Donor).organsToDonate)}
          </p>
        )}

        {user.role === UserRole.RECEIVER && (
          <>
            <p className="text-sm text-gray-600 mt-1">
              Organs needed:{' '}
              {formatOrgans((user as Receiver).organsNeeded)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Status:{' '}
              <span className="capitalize">
                {(user as Receiver).status ?? 'Unknown'}
              </span>
            </p>
          </>
        )}
      </div>

      {/* Pending (sent request) */}
      {pending && isRequestSender && (
        <div className="mt-4 flex items-center text-yellow-700 font-semibold">
          <Clock className="mr-2" /> Pending
        </div>
      )}

      {/* Accept Request (received request) */}
      {!isRequestSender && pending && onAcceptRequest && (
        <button
          onClick={() => onAcceptRequest()}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
          aria-label="Accept connection request"
        >
          <CheckCircle className="mr-2" /> Accept Request
        </button>
      )}

      {/* Connect button */}
      {!pending && !onAcceptRequest && showConnectButton && (
        <button
          onClick={() => onConnect && onConnect()}
          disabled={disabled}
          className={`mt-4 w-full ${
            disabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)]'
          } text-white py-2 px-4 rounded-md transition-colors duration-300`}
          aria-label="Connect with user"
        >
          Connect
        </button>
      )}

      {/* Chat button */}
      {showChatButton && (
        <button
          onClick={() => onChat && onChat()}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
          aria-label={`Chat with ${user.name}`}
        >
          Chat
        </button>
      )}
    </div>
  );
};

export default UserCard;