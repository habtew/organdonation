import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import DonorStories from './components/DonorStories';
// import Statistics from './components/Statistics';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          {/* <DonorStories /> */}
          <main className="flex-grow bg-white font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
            <AppRoutes />
          </main>
          {/* <Footer /> */}
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;