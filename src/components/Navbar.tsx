import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getProfileLink = () => {
    if (!currentUser) return '/login';
    
    switch (currentUser.role) {
      case 'donor':
        return '/donor-profile';
      case 'receiver':
        return '/receiver-profile';
      case 'doctor':
        return '/doctor-profile';
      default:
        return '/login';
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-[rgb(22,163,73)]" />
              <span className="ml-2 text-xl font-bold text-black">Organ Donation</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-900 hover:text-[rgb(22,163,73)] px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            
            {isAuthenticated && (
              <>
                <Link to={getProfileLink()} className="text-gray-900 hover:text-[rgb(22,163,73)] px-3 py-2 rounded-md text-sm font-medium">
                  Profile
                </Link>
                <Link to="/connections" className="text-gray-900 hover:text-[rgb(22,163,73)] px-3 py-2 rounded-md text-sm font-medium">
                  Connections
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-[rgb(22,163,73)] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-[rgb(22,163,73)] focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-3 px-2 pt-2 shadow-lg">
          <div className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-900 hover:text-[rgb(22,163,73)] block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            
            {isAuthenticated && (
              <>
                <Link
                  to={getProfileLink()}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-900 hover:text-[rgb(22,163,73)] block px-3 py-2 rounded-md text-base font-medium"
                >
                  Profile
                </Link>
                <Link
                  to="/connections"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-900 hover:text-[rgb(22,163,73)] block px-3 py-2 rounded-md text-base font-medium"
                >
                  Connections
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-900 hover:text-[rgb(22,163,73)] block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;