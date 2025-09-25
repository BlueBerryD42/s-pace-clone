import { apiService } from './api';
import { API_ENDPOINTS } from '../constants/api';
import { User, PaginatedResponse, PaginationParams } from '../types/api';

class UserService {
  // Get all users with pagination
  async getUsers(params: PaginationParams): Promise<PaginatedResponse<User>> {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
      ...(params.sort && { sort: params.sort }),
      ...(params.order && { order: params.order }),
    });

    const response = await apiService.get<PaginatedResponse<User>>(
      `${API_ENDPOINTS.USERS.LIST}?${queryParams}`
    );
    return response.data;
  }

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const response = await apiService.get<User>(API_ENDPOINTS.USERS.DETAIL(id));
    return response.data;
  }

  // Create new user
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const response = await apiService.post<User>(API_ENDPOINTS.USERS.CREATE, userData);
    return response.data;
  }

  // Update user
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await apiService.put<User>(API_ENDPOINTS.USERS.UPDATE(id), userData);
    return response.data;
  }

  // Delete user
  async deleteUser(id: string): Promise<void> {
    await apiService.delete(API_ENDPOINTS.USERS.DELETE(id));
  }

  // Search users
  async searchUsers(query: string): Promise<User[]> {
    const response = await apiService.get<User[]>(
      `${API_ENDPOINTS.USERS.LIST}?search=${encodeURIComponent(query)}`
    );
    return response.data;
  }
}

export const userService = new UserService();
export default userService;
