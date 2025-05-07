import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserRole, Donor, Organ } from '../types';
import { ClipboardList, Calendar, Clock, AlertCircle, Tag, Shield } from 'lucide-react';
import OrganBadge, { getOrganBadgeColor } from '../components/OrganBadge';
import NearbyHospitals from '../components/Nearbyhospitals';

const DonorProfile: React.FC = () => {
  const navigate = useNavigate();

  const [donor, setDonor] = useState<Donor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonorData = async () => {
      const user = auth.currentUser;

      if (!user) {
        navigate('/login');
        return;
      }

      try {
        // Fetch user general info
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          console.error('User document missing');
          navigate('/login');
          return;
        }

        const userData = userDocSnap.data();

        // Check if role is donor
        if (userData.role !== UserRole.DONOR) {
          // Redirect depending on their role
          switch (userData.role) {
            case UserRole.RECEIVER:
              navigate('/receiver-profile');
              break;
            case UserRole.DOCTOR:
              navigate('/doctor-profile');
              break;
            default:
              navigate('/login');
          }
          return;
        }

        // Fetch donor-specific info
        const donorDocRef = doc(db, 'donors', user.uid);
        const donorDocSnap = await getDoc(donorDocRef);

        let donorData = {
          organsToDonate: [] as Organ[],
          donationHistory: [],
        };

        if (donorDocSnap.exists()) {
          donorData = donorDocSnap.data() as Pick<Donor, 'organsToDonate' | 'donationHistory'>;
        }

        // Compose full donor object with user info + donor info
        setDonor({
          id: user.uid,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          age: userData.age,
          contactInfo: userData.contactInfo,
          organsToDonate: donorData.organsToDonate ?? [],
          donationHistory: donorData.donationHistory ?? [],
          createdAt: userData.createdAt,
        });
      } catch (error) {
        console.error('Error fetching donor data', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchDonorData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!donor) {
    return null; // Redirect handled in useEffect or no valid donor data
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{donor.name}</h1>
              <p className="text-gray-300 mt-1">Donor ID: {donor.id}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[rgb(22,163,73)] text-white text-sm font-medium">
                <Shield className="h-4 w-4 mr-2" />
                Active Donor
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
                    <p className="font-medium">{donor.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{donor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{donor.contactInfo}</p>
                  </div>
                </div>
              </div>

              {/* Organs to Donate */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-[rgb(22,163,73)]" />
                  Organs to Donate
                </h2>
                <div className="flex flex-wrap gap-2">
                  {donor.organsToDonate?.length > 0 ? (
                    donor.organsToDonate.map((organ) => (
                      <OrganBadge key={organ} organ={organ} className={getOrganBadgeColor(organ)} />
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No organs selected for donation</p>
                  )}
                </div>
              </div>

              {/* Donation History */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-[rgb(22,163,73)]" />
                  Donation History
                </h2>
                {donor.donationHistory?.length > 0 ? (
                  <ul className="space-y-3">
                    {donor.donationHistory.map((donation) => (
                      <li key={donation.id} className="border-l-2 border-[rgb(22,163,73)] pl-4">
                        <p className="font-medium capitalize">{donation.organType}</p>
                        <p className="text-sm text-gray-500">{donation.date}</p>
                        <span
                          className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                            donation.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : donation.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {donation.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-5 w-5 mr-2" />
                    <p>No donation history yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Notifications and Upcoming Appointments */}
            <div className="mt-8 bg-gray-50 p-5 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-[rgb(22,163,73)]" />
                Notifications & Upcoming Appointments
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      No upcoming appointments. View connection requests to see potential matches.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/connections')}
                className="flex-1 bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 px-4 rounded-md transition-colors duration-300"
              >
                View Connection Requests
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md transition-colors duration-300">
                Update Profile
              </button>
            </div>
            <NearbyHospitals />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;