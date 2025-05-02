import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Receiver, UserRole } from '../types';
import { ClipboardList, AlertTriangle, User, Tag, ArrowUpRight, Clock, Heart } from 'lucide-react';
import OrganBadge, { getOrganBadgeColor } from '../components/OrganBadge';

const ReceiverProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Type assertion since we know this page is only for receivers
  const receiver = currentUser as Receiver;
  
  // Redirect if not logged in or not a receiver
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== UserRole.RECEIVER) {
      // Redirect to the appropriate profile page
      switch (currentUser.role) {
        case UserRole.DONOR:
          navigate('/donor-profile');
          break;
        case UserRole.DOCTOR:
          navigate('/doctor-profile');
          break;
        default:
          navigate('/login');
      }
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || currentUser.role !== UserRole.RECEIVER) {
    return null; // Will redirect via useEffect
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'matched':
        return 'bg-blue-100 text-blue-800';
      case 'transplanted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{receiver.name}</h1>
              <p className="text-gray-300 mt-1">Receiver ID: {receiver.id}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium capitalize ${
                getStatusColor(receiver.status)
              }`}>
                {receiver.status === 'waiting' && <Clock className="h-4 w-4 mr-2" />}
                {receiver.status === 'matched' && <Heart className="h-4 w-4 mr-2" />}
                {receiver.status === 'transplanted' && <User className="h-4 w-4 mr-2" />}
                {receiver.status} Status
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2 text-[rgb(22,163,73)]" />
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{receiver.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{receiver.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{receiver.contactInfo}</p>
                  </div>
                </div>
              </div>
              
              {/* Organs Needed */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-[rgb(22,163,73)]" />
                  Organs Needed
                </h2>
                <div className="flex flex-wrap gap-2">
                  {receiver.organsNeeded.map((organ) => (
                    <OrganBadge 
                      key={organ} 
                      organ={organ} 
                      className={getOrganBadgeColor(organ)} 
                    />
                  ))}
                </div>
                {receiver.organsNeeded.length === 0 && (
                  <p className="text-gray-500 italic">No organs currently needed</p>
                )}
              </div>
              
              {/* Medical Condition */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-[rgb(22,163,73)]" />
                  Medical Condition
                </h2>
                <p className="text-gray-700">{receiver.medicalCondition}</p>
              </div>
            </div>
            
            {/* Health Timeline */}
            <div className="mt-8 bg-gray-50 p-5 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[rgb(22,163,73)]" />
                Health Timeline
              </h2>
              
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-200"></div>
                
                <ul className="space-y-6 relative">
                  <li className="ml-10">
                    <span className="absolute -left-0.5 mt-1.5 h-7 w-7 rounded-full bg-[rgb(22,163,73)] text-white flex items-center justify-center">
                      <Clock className="h-4 w-4" />
                    </span>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <p className="font-semibold text-gray-900">Added to waiting list</p>
                      <p className="text-sm text-gray-500">Jan 15, 2025</p>
                      <p className="text-gray-700 mt-1">Patient was evaluated and added to the organ waiting list.</p>
                    </div>
                  </li>
                  
                  {receiver.status === 'matched' || receiver.status === 'transplanted' ? (
                    <li className="ml-10">
                      <span className="absolute -left-0.5 mt-1.5 h-7 w-7 rounded-full bg-[rgb(22,163,73)] text-white flex items-center justify-center">
                        <Heart className="h-4 w-4" />
                      </span>
                      <div className="bg-white p-4 rounded-md shadow-sm">
                        <p className="font-semibold text-gray-900">Potential donor match found</p>
                        <p className="text-sm text-gray-500">Mar 22, 2025</p>
                        <p className="text-gray-700 mt-1">A potential donor has been identified and matched for compatibility.</p>
                      </div>
                    </li>
                  ) : null}
                  
                  {receiver.status === 'transplanted' ? (
                    <li className="ml-10">
                      <span className="absolute -left-0.5 mt-1.5 h-7 w-7 rounded-full bg-[rgb(22,163,73)] text-white flex items-center justify-center">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                      <div className="bg-white p-4 rounded-md shadow-sm">
                        <p className="font-semibold text-gray-900">Transplant Successful</p>
                        <p className="text-sm text-gray-500">May 10, 2025</p>
                        <p className="text-gray-700 mt-1">Organ transplant procedure was completed successfully.</p>
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/connections')}
                className="flex-1 bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 px-4 rounded-md transition-colors duration-300"
              >
                Find Potential Donors
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md transition-colors duration-300">
                Update Medical Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverProfile;