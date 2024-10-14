import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUser = authService.getCurrentUser();
    if (initUser) {
      setUser(initUser);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    setUser(data);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const register = async (username, email, password) => {
    const data = await authService.register(username, email, password);
    return data;
  };

  const refreshToken = async () => {
    if (user && user.refreshToken) {
      const data = await authService.refreshToken(user.refreshToken);
      setUser(data);
      return data;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, refreshToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};