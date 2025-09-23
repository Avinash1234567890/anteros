import React from 'react';
import Navbar from './Navbar';
import MainDashboard from './MainDashboard';
import { useUserContext } from '../contexts/UserContext';

const AppLayout = () => {
  const { users } = useUserContext();

  const handleUserSelect = (user) => {
    console.log('Selected user:', user);
    // You can add additional user selection logic here
  };

  return (
    <div className="App">
      <Navbar users={users} onUserSelect={handleUserSelect} />
      <MainDashboard />
    </div>
  );
};

export default AppLayout;
