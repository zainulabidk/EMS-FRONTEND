// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      // Perform authentication API call here
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = () => {
    // Implement your logout logic here
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
