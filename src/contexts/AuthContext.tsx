import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, LoginRequest, RegisterRequest, ApiError } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginLoading: boolean;
  registerLoading: boolean;
  logoutLoading: boolean;
  loginError: ApiError | null;
  registerError: ApiError | null;
  login: (credentials: LoginRequest) => Promise<any>;
  register: (userData: RegisterRequest) => Promise<any>;
  logout: () => Promise<any>;
  updateUser: (user: User) => void;
  getToken: () => string | null;
  refreshToken: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
