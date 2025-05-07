import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, UserPlus, Stethoscope, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DonorStories from '../components/DonorStories';
import HowItWorks from '../components/HowitWorks';
import Statistics from '../components/Statistics';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import ImportanceOfDonation from '../components/Importanceofdonation';

const Home: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();

  const getStartedLink = () => {
    if (!isAuthenticated) {
      return '/signup';
    }

    // Normalize role check - adjust if your UserRole uses uppercase
    switch (currentUser?.role.toLowerCase()) {
      case 'donor':
        return '/donor-profile';
      case 'receiver':
        return '/receiver-profile';
      case 'doctor':
        return '/doctor-profile';
      default:
        return '/signup';
    }
  };

  return (
    <>
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1686467/pexels-photo-1686467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Supportive hands"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70"></div>
        </div>
        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
          <div className="flex flex-col md:flex-row items-center justify-between z-10">
            <div className="md:w-1/2 mb-10 md:mb-0 z-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Your Gift of Life <span className="text-[rgb(22,163,73)]">Saves Lives</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                One organ donor can save up to eight lives and enhance over 75 more. Join us in creating a future where nobody dies waiting for a transplant.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to={getStartedLink()}
                  className="bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white px-6 py-3 rounded-md font-medium text-center transition-colors duration-300"
                >
                  {isAuthenticated ? 'Go to Your Profile' : 'Become a Donor Today'}
                </Link>
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-md font-medium text-center transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 bg-[rgb(22,163,73)] opacity-20 rounded-full"></div>
                <Heart className="absolute inset-0 m-auto h-32 w-32 text-[rgb(22,163,73)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donor stories */}
      <div className="min-h-screen bg-white font-sans text-gray-800">
        <DonorStories />
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HowItWorks />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-[rgb(22,163,73)] bg-opacity-10 p-3 inline-block rounded-full mb-4">
                <Heart className="h-8 w-8 text-[rgb(22,163,73)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Donors</h3>
              <p className="text-gray-600 mb-4">
                Register as a donor, specify which organs you're willing to donate, and connect with recipients in need.
              </p>
              <Link to="/signup" className="text-[rgb(22,163,73)] hover:text-[rgb(18,138,62)] inline-flex items-center font-medium">
                Register as Donor <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-[rgb(22,163,73)] bg-opacity-10 p-3 inline-block rounded-full mb-4">
                <UserPlus className="h-8 w-8 text-[rgb(22,163,73)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Recipients</h3>
              <p className="text-gray-600 mb-4">
                Sign up as a recipient, specify your medical needs, and get matched with compatible donors.
              </p>
              <Link to="/signup" className="text-[rgb(22,163,73)] hover:text-[rgb(18,138,62)] inline-flex items-center font-medium">
                Register as Recipient <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-[rgb(22,163,73)] bg-opacity-10 p-3 inline-block rounded-full mb-4">
                <Stethoscope className="h-8 w-8 text-[rgb(22,163,73)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Doctors</h3>
              <p className="text-gray-600 mb-4">
                Medical professionals can join to facilitate matches, provide approval, and oversee the donation process.
              </p>
              <Link to="/signup" className="text-[rgb(22,163,73)] hover:text-[rgb(18,138,62)] inline-flex items-center font-medium">
                Register as Doctor <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Statistics />
      <ImportanceOfDonation />
      <FAQ />
    </div>
    <Footer />
    </>
  );
};

export default Home;