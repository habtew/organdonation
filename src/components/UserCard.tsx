import React from 'react';
import { User, UserRole, Organ, Donor, Receiver } from '../types';
import { Heart, User as UserIcon, Stethoscope } from 'lucide-react';

interface UserCardProps {
  user: User;
  showConnectButton?: boolean;
  onConnect?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, showConnectButton = false, onConnect }) => {
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

  const formatOrgans = (organs: Organ[]) => {
    return organs.map(organ => organ.charAt(0).toUpperCase() + organ.slice(1)).join(', ');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-[1.02] border-l-4 border-[rgb(22,163,73)]">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-full mr-4">
            {getRoleIcon(user.role)}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600 text-sm capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">Age: {user.age}</p>
        
        {user.role === UserRole.DONOR && (
          <p className="text-sm text-gray-600 mt-1">
            Organs to donate: {formatOrgans((user as Donor).organsToDonatе)}
          </p>
        )}
        
        {user.role === UserRole.RECEIVER && (
          <>
            <p className="text-sm text-gray-600 mt-1">
              Organs needed: {formatOrgans((user as Receiver).organsNeeded)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Status: <span className="capitalize">{(user as Receiver).status}</span>
            </p>
          </>
        )}
      </div>

      {showConnectButton && (
        <button
          onClick={onConnect}
          className="mt-4 w-full bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 px-4 rounded-md transition-colors duration-300"
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default UserCard;