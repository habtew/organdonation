import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import DonorProfile from '../pages/DonorProfile';
import ReceiverProfile from '../pages/ReceiverProfile';
import DoctorProfile from '../pages/DoctorProfile';
import Connection from '../pages/Connection';
import ChatPage from '../pages/Chat';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/donor-profile" element={<DonorProfile />} />
      <Route path="/receiver-profile" element={<ReceiverProfile />} />
      <Route path="/doctor-profile" element={<DoctorProfile />} />
      <Route path="/connections" element={<Connection />} />
      <Route path="/chat/:id" element={<ChatPage />} />
      {/* Redirect any unmatched routes to the home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;