import { apiService } from './api';
import { API_ENDPOINTS } from '../constants/api';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../types/api';

class AuthService {
  // Login user
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    if (response.success && response.data) {
      // Store tokens in localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Register user
  async register(userData: RegisterRequest): Promise<User> {
    const response = await apiService.post<User>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    return response.data;
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await apiService.get<User>(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  }

  // Refresh token
  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiService.post<{ token: string }>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );

    if (response.success && response.data) {
      localStorage.setItem('authToken', response.data.token);
      return response.data.token;
    }

    throw new Error('Failed to refresh token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get stored user data
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  }

  // Get stored auth token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}

export const authService = new AuthService();
export default authService;
