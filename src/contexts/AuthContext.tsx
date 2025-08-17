import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';
import { UserInfoResponse } from '../types/api';

interface AuthContextType {
  user: UserInfoResponse | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isChildMode: boolean;
  setChildMode: (mode: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfoResponse | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true);
  const [isChildMode, setIsChildMode] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const response = await authAPI.getUserInfo();
          setUser(response.data.data);
        } catch {
          localStorage.removeItem('authToken');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    const newToken = response.data.data.token;
    
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    
    const userResponse = await authAPI.getUserInfo();
    setUser(userResponse.data.data);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setIsChildMode(false);
  };

  const setChildMode = (mode: boolean) => {
    setIsChildMode(mode);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
    isChildMode,
    setChildMode,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};