import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';
import LoadingScreen from './LoadingScreen';

const ProtectedRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // If not authenticated, show login
  if (!user) {
    return <Login />;
  }

  // If authenticated, show the app (profile completion will be handled by overlays)
  return children;
};

export default ProtectedRoute;
