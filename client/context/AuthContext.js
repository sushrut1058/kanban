// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyToken } from '../actions/authfuncs';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        userData = await verifyToken();
        if(userData){
          setAuthenticated(true);
          setUserObj(userData);
        }
      } catch (e) {
        console.log(e);
        setAuthenticated(false);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setAuthenticated(false);
    setUserObj(None);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, userObj, setUserObj, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
