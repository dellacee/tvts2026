import { apiClient } from './client';
import type { User, LoginCredentials, RegisterData, ApiResponse } from '@/types';

export const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    return apiClient.post('/auth/login', credentials as unknown as Record<string, unknown>);
  },

  // Register
  async register(data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    return apiClient.post('/auth/register', data as unknown as Record<string, unknown>);
  },

  // Google OAuth
  async loginWithGoogle(token: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return apiClient.post('/auth/google', { token });
  },

  // Logout
  async logout(): Promise<ApiResponse<null>> {
    return apiClient.post('/auth/logout');
  },

  // Get current user
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get('/auth/me');
  },

  // Forgot password
  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    return apiClient.post('/auth/forgot-password', { email });
  },

  // Reset password
  async resetPassword(token: string, password: string): Promise<ApiResponse<null>> {
    return apiClient.post('/auth/reset-password', { token, password });
  },

  // Update profile
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.patch('/auth/profile', data as unknown as Record<string, unknown>);
  },
};
