import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/store';

const ProtectedRoute = ({ children }) => {
  const { token, user } = useAuthStore();
  const location = useLocation();

  // If user is not authenticated, redirect to home page
  if (!token || !user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
