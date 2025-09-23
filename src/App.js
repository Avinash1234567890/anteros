import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <UserProvider>
          <AppLayout />
        </UserProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
