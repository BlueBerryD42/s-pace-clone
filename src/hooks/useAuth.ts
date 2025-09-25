import { useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';
import { User, LoginRequest, RegisterRequest } from '../types/api';
import { useApi } from './useApi';

// Auth hook for managing authentication state
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // API hooks for auth operations
  const {
    execute: login,
    loading: loginLoading,
    error: loginError,
  } = useApi(authService.login.bind(authService), {
    onSuccess: (response) => {
      setUser(response.user);
      setIsAuthenticated(true);
    },
  });

  const {
    execute: register,
    loading: registerLoading,
    error: registerError,
  } = useApi(authService.register.bind(authService));

  const {
    execute: logout,
    loading: logoutLoading,
  } = useApi(authService.logout.bind(authService), {
    onSuccess: () => {
      setUser(null);
      setIsAuthenticated(false);
    },
  });

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
          } else {
            // Try to fetch user profile if token exists but no user data
            const profile = await authService.getProfile();
            setUser(profile);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid tokens
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const handleLogin = async (credentials: LoginRequest) => {
    return login(credentials);
  };

  // Register function
  const handleRegister = async (userData: RegisterRequest) => {
    return register(userData);
  };

  // Logout function
  const handleLogout = async () => {
    return logout();
  };

  // Update user profile
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    
    // Loading states
    loginLoading,
    registerLoading,
    logoutLoading,
    
    // Errors
    loginError,
    registerError,
    
    // Actions
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateUser,
    
    // Utilities
    getToken: authService.getToken.bind(authService),
    refreshToken: authService.refreshToken.bind(authService),
  };
}
