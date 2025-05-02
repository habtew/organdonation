import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Doctor, UserRole } from '../types';
import { ClipboardList, Award, CheckCircle, XCircle, Clock, ArrowUpRight } from 'lucide-react';

const DoctorProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Type assertion since we know this page is only for doctors
  const doctor = currentUser as Doctor;
  
  // Redirect if not logged in or not a doctor
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== UserRole.DOCTOR) {
      // Redirect to the appropriate profile page
      switch (currentUser.role) {
        case UserRole.DONOR:
          navigate('/donor-profile');
          break;
        case UserRole.RECEIVER:
          navigate('/receiver-profile');
          break;
        default:
          navigate('/login');
      }
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || currentUser.role !== UserRole.DOCTOR) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{doctor.name}</h1>
              <p className="text-gray-300 mt-1">Doctor ID: {doctor.id}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[rgb(22,163,73)] text-white text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                Licensed Medical Professional
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Professional Information */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2 text-[rgb(22,163,73)]" />
                  Professional Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Specialization</p>
                    <p className="font-medium">{doctor.specialization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">License Number</p>
                    <p className="font-medium">{doctor.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hospital Affiliation</p>
                    <p className="font-medium">{doctor.affiliation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{doctor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{doctor.contactInfo}</p>
                  </div>
                </div>
              </div>
              
              {/* Approvals History */}
              <div className="md:col-span-2 bg-gray-50 p-5 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-[rgb(22,163,73)]" />
                  Approvals History
                </h2>
                
                {doctor.approvals.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Donor ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Receiver ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Organ
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {doctor.approvals.map((approval) => (
                          <tr key={approval.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {approval.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {approval.donorId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {approval.receiverId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                              {approval.organType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                approval.status === 'approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : approval.status === 'rejected' 
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {approval.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                                {approval.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                                {approval.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                                {approval.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-gray-100 p-4 rounded text-center">
                    <p className="text-gray-600">No approval history found</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Pending Approvals */}
            <div className="mt-8 bg-gray-50 p-5 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[rgb(22,163,73)]" />
                Pending Approvals
              </h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      No pending approvals at this time. Visit the connections page to view potential matches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Patient Overview */}
            <div className="mt-8 bg-gray-50 p-5 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <ArrowUpRight className="h-5 w-5 mr-2 text-[rgb(22,163,73)]" />
                Patient Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-blue-500">
                  <p className="text-lg font-medium">3</p>
                  <p className="text-sm text-gray-600">Active Donors</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-purple-500">
                  <p className="text-lg font-medium">3</p>
                  <p className="text-sm text-gray-600">Active Recipients</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-[rgb(22,163,73)]">
                  <p className="text-lg font-medium">1</p>
                  <p className="text-sm text-gray-600">Successful Matches</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/connections')}
                className="flex-1 bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 px-4 rounded-md transition-colors duration-300"
              >
                Review Potential Matches
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md transition-colors duration-300">
                Update Professional Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;