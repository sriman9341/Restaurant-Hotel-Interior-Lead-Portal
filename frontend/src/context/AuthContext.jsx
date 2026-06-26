import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/api/auth/me');
          if (res.data && res.data.success) {
            setUser(res.data.data);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Session validation failed:', error.message);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/api/auth/login', { email, password });
      if (res.data && res.data.success) {
        const userData = res.data.data;
        localStorage.setItem('token', userData.token);
        setUser(userData);
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Server error, please try again';
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
