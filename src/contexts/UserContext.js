import React, { createContext, useContext } from 'react';
import { useUsers } from '../hooks/useUsers';

const UserContext = createContext({});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const userHookData = useUsers();

  return (
    <UserContext.Provider value={userHookData}>
      {children}
    </UserContext.Provider>
  );
};
