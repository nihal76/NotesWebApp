import React, { createContext, useState } from 'react';

// Create a context
export const UserContext = createContext();

// Create a provider component
const ContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ isLogged, setIsLogged, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;