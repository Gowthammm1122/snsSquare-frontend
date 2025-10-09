import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/store';

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { token, user } = useAuthStore();
  const location = useLocation();

  // If user is not authenticated, redirect to login page
  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If user is authenticated but doesn't have the required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to home page or show unauthorized page
    return <Navigate to="/" replace state={{ unauthorized: true }} />;
  }

  // User is authenticated and has the required role
  return children;
};

export default RoleBasedRoute;