import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Heart, User, Stethoscope } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.DONOR);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const success = login(email, password);
    
    if (success) {
      switch (role) {
        case UserRole.DONOR:
          navigate('/donor-profile');
          break;
        case UserRole.RECEIVER:
          navigate('/receiver-profile');
          break;
        case UserRole.DOCTOR:
          navigate('/doctor-profile');
          break;
        default:
          navigate('/');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  // Demo credentials for quick login
  const demoCredentials = {
    [UserRole.DONOR]: { email: 'john@example.com', password: 'password123' },
    [UserRole.RECEIVER]: { email: 'emma@example.com', password: 'password123' },
    [UserRole.DOCTOR]: { email: 'dr.chen@example.com', password: 'password123' },
  };

  const handleQuickLogin = () => {
    const { email, password } = demoCredentials[role];
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col items-center bg-gray-50">
      <div className="max-w-md w-full mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="mt-2 text-gray-600">Access your LifeShare account</p>
          </div>

          {/* Role Selector */}
          <div className="flex justify-center mb-6">
            <div className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
              <button
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
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
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
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 rounded-md transition-colors duration-300"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-4">
            <button
              onClick={handleQuickLogin}
              className="w-full text-[rgb(22,163,73)] text-sm hover:underline"
            >
              Use demo credentials
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[rgb(22,163,73)] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;