/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi, type AuthResponse } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

interface User { id: string; email: string; }

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage DIRECTLY - no useEffect needed
  const savedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const savedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  
  const [user, setUser] = useState<User | null>(savedUser ? JSON.parse(savedUser) : null);
  const [token, setToken] = useState<string | null>(savedToken);
  const [loading, setLoading] = useState(false); // No initial loading needed
  const navigate = useNavigate();

  const saveAuth = (response: AuthResponse) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setToken(response.token);
    setUser(response.user);
  };

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    saveAuth(response);
  };

  const register = async (email: string, password: string) => {
    const response = await authApi.register(email, password);
    saveAuth(response);
  };

  const logout = useCallback(() => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUser(null);
  navigate('/login', { replace: true });
}, [navigate]);

const handleStorageChange = useCallback(() => {
  const newToken = localStorage.getItem('token');
  const newUser = localStorage.getItem('user');
  setLoading(false);
  if (!newToken || !newUser) {
    logout();
  }
}, [logout]);

useEffect(() => {
  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, [handleStorageChange]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within AuthProvider');
  return context;
};
