import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const value = await AsyncStorage.getItem('user_log');
      const parsedToken = JSON.parse(value);
      if (parsedToken?.token) {
        setIsLoggedIn(true);
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};
