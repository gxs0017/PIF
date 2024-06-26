// AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('/api/signin', { email, password });
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error('Sign In error', error);
      throw error; // Rethrow the error for the component to handle
    }
  };

  const signUp = async (email, password) => {
    try {
      const response = await axios.post('/api/signup', { email, password });
      return true;
    } catch (error) {
      console.error('Sign Up error', error);
      throw error; // Rethrow the error for the component to handle
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthContext and AuthProvider
export const useAuth = () => useContext(AuthContext); // Optional: Custom hook for using AuthContext
