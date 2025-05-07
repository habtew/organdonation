import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole, Organ } from '../types';
import { Heart, User, Stethoscope, CheckCircle } from 'lucide-react';

import { auth, db } from '../../firebase'
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(UserRole.DONOR);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Common form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  // Donor specific fields
  const [selectedOrgans, setSelectedOrgans] = useState<Organ[]>([]);

  // Receiver specific fields
  const [medicalCondition, setMedicalCondition] = useState('');
  const [organsNeeded, setOrgansNeeded] = useState<Organ[]>([]);

  // Doctor specific fields
  const [specialization, setSpecialization] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [affiliation, setAffiliation] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!name || !email || !password || !confirmPassword || !age || !contactInfo) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Role-specific validation
    if (role === UserRole.DONOR && selectedOrgans.length === 0) {
      setError('Please select at least one organ to donate');
      return;
    }

    if (role === UserRole.RECEIVER && (organsNeeded.length === 0 || !medicalCondition)) {
      setError('Please provide all required medical information');
      return;
    }

    if (
      role === UserRole.DOCTOR &&
      (!specialization || !licenseNumber || !affiliation)
    ) {
      setError('Please provide all required professional information');
      return;
    }

    setLoading(true);

    try {
      // 1. Create user auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update display name
      await updateProfile(user, { displayName: name });

      const uid = user.uid;

      // 3. Create main user document in `users` collection
      await setDoc(doc(db, 'users', uid), {
        name,
        email,
        role,
        age: Number(age),
        contactInfo,
        createdAt: serverTimestamp(),
      });

      // 4. Initialize role-specific document with references to user's uid
      if (role === UserRole.DONOR) {
        await setDoc(doc(db, 'donors', uid), {
          userId: uid,
          organsToDonate: selectedOrgans,
          donationHistory: [],
        });
      } else if (role === UserRole.RECEIVER) {
        await setDoc(doc(db, 'receivers', uid), {
          userId: uid,
          organsNeeded: organsNeeded,
          medicalCondition,
          status: 'pending', // default status
        });
      } else if (role === UserRole.DOCTOR) {
        await setDoc(doc(db, 'doctors', uid), {
          userId: uid,
          specialization,
          licenseNumber,
          affiliation,
          approvals: [],
        });
      }

      // 5. Create empty `userChats` document for the user to hold chat metadata
      await setDoc(doc(db, 'userChats', uid), {}, { merge: true });

      // 6. (Optional) Create empty `chats` document if you want a container for chat messages by the user
      // Usually chats are named by pairs or groups, so empty doc here might not be necessary.
      // await setDoc(doc(db, 'chats', uid), {}, { merge: true });

      // Success, show form submitted
      setFormSubmitted(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Signup failed:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use. Please login or use another email.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('Failed to create an account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Organ toggle handlers for donors/receivers
  const handleOrganToggle = (organ: Organ) => {
    if (selectedOrgans.includes(organ)) {
      setSelectedOrgans(selectedOrgans.filter((o) => o !== organ));
    } else {
      setSelectedOrgans([...selectedOrgans, organ]);
    }
  };

  const handleOrgansNeededToggle = (organ: Organ) => {
    if (organsNeeded.includes(organ)) {
      setOrgansNeeded(organsNeeded.filter((o) => o !== organ));
    } else {
      setOrgansNeeded([...organsNeeded, organ]);
    }
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden p-8">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-[rgb(22,163,73)] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your account has been created. You will be redirected to the login page shortly.
            </p>
            <Link
              to="/login"
              className="text-[rgb(22,163,73)] font-medium hover:underline"
            >
              Proceed to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col items-center bg-gray-50">
      <div className="max-w-md w-full mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">Join LifeShare and make a difference</p>
          </div>

          {/* Role Selector */}
          <div className="flex justify-center mb-6">
            <div className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setRole(UserRole.DONOR)}
                className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
                  role === UserRole.DONOR
                    ? 'bg-[rgb(22,163,73)] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Heart className="h-4 w-4 mr-2" />
                Donor
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.RECEIVER)}
                className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
                  role === UserRole.RECEIVER
                    ? 'bg-[rgb(22,163,73)] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                Receiver
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.DOCTOR)}
                className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
                  role === UserRole.DOCTOR
                    ? 'bg-[rgb(22,163,73)] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Stethoscope className="h-4 w-4 mr-2" />
                Doctor
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Common Fields */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                  placeholder="Create password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password*
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age*
                </label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                  placeholder="Your age"
                  min="18"
                  max="100"
                />
              </div>
              <div>
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number*
                </label>
                <input
                  id="contactInfo"
                  type="tel"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                  placeholder="Phone number"
                />
              </div>
            </div>

            {/* Donor Specific Fields */}
            {role === UserRole.DONOR && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organs Willing to Donate*
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(Organ).map((organ) => (
                    <label key={organ} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedOrgans.includes(organ)}
                        onChange={() => handleOrganToggle(organ)}
                        className="h-4 w-4 text-[rgb(22,163,73)] rounded focus:ring-[rgb(22,163,73)]"
                      />
                      <span className="text-sm text-gray-700 capitalize">{organ}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Receiver Specific Fields */}
            {role === UserRole.RECEIVER && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organs Needed*
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(Organ).map((organ) => (
                      <label key={organ} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={organsNeeded.includes(organ)}
                          onChange={() => handleOrgansNeededToggle(organ)}
                          className="h-4 w-4 text-[rgb(22,163,73)] rounded focus:ring-[rgb(22,163,73)]"
                        />
                        <span className="text-sm text-gray-700 capitalize">{organ}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="medicalCondition" className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Condition*
                  </label>
                  <textarea
                    id="medicalCondition"
                    value={medicalCondition}
                    onChange={(e) => setMedicalCondition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                    placeholder="Describe your medical condition"
                    rows={3}
                  />
                </div>
              </>
            )}

            {/* Doctor Specific Fields */}
            {role === UserRole.DOCTOR && (
              <>
                <div className="mb-4">
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization*
                  </label>
                  <input
                    id="specialization"
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                    placeholder="Your medical specialization"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    License Number*
                  </label>
                  <input
                    id="licenseNumber"
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                    placeholder="Medical license number"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Affiliation*
                  </label>
                  <input
                    id="affiliation"
                    type="text"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                    placeholder="Hospital or clinic affiliation"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 rounded-md transition-colors duration-300 mt-4 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[rgb(22,163,73)] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;