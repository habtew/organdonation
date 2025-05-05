import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <div className='p-10 m-0 sm:p-6 lg:p-8'>
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-[rgb(22,163,73)]" />
            <span className="ml-2 text-lg font-bold">LifeShare</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="font-medium text-[rgb(22,163,73)] mb-2">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[rgb(22,163,73)] transition-colors duration-300">Our Mission</a></li>
                <li><a href="#how-it-works" className="hover:text-[rgb(22,163,73)] transition-colors duration-300">How It Works</a></li>
                <li><a href="#" className="hover:text-[rgb(22,163,73)] transition-colors duration-300">Team</a></li>
              </ul>
            </div>
            
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="font-medium text-[rgb(22,163,73)] mb-2">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[rgb(22,163,73)] transition-colors duration-300">FAQs</a></li>
                <li><a href="#" className="hover:text-[rgb(22,163,73)] transition-colors duration-300">Donation Process</a></li>
                <li><a href="#" className="hover:text-[rgb(22,163,73)] transition-colors duration-300">Success Stories</a></li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="font-medium text-[rgb(22,163,73)] mb-2">Contact</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[rgb(22,163,73)] transition-colors duration-300">Support</a></li>
                <li><a href="#" className="hover:text-[rgb(22,163,73)] transition-colors duration-300">Partners</a></li>
                <li><a href="#" className="hover:text-[rgb(22,163,73)] transition-colors duration-300">Media</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© 2025 LifeShare. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="text-gray-400 hover:text-[rgb(22,163,73)] transition-colors duration-300 mx-2">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="text-gray-400 hover:text-[rgb(22,163,73)] transition-colors duration-300 mx-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;