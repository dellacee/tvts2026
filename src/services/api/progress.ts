import { apiClient } from './client';
import type { Progress, Career, Major, School, ApiResponse } from '@/types';

export const progressService = {
  // Get user progress
  async getProgress(userId: string): Promise<ApiResponse<Progress>> {
    return apiClient.get(`/progress/${userId}`);
  },

  // Update progress
  async updateProgress(userId: string, data: Partial<Progress>): Promise<ApiResponse<Progress>> {
    return apiClient.patch(`/progress/${userId}`, data as Record<string, unknown>);
  },

  // Save career choice
  async saveCareerChoice(userId: string, career: Career): Promise<ApiResponse<null>> {
    return apiClient.post(`/progress/${userId}/career`, { career } as Record<string, unknown>);
  },

  // Save major choice
  async saveMajorChoice(userId: string, major: Major): Promise<ApiResponse<null>> {
    return apiClient.post(`/progress/${userId}/major`, { major } as Record<string, unknown>);
  },

  // Save school choice
  async saveSchoolChoice(userId: string, school: School): Promise<ApiResponse<null>> {
    return apiClient.post(`/progress/${userId}/school`, { school } as Record<string, unknown>);
  },

  // Confirm QR scan
  async confirmQRScan(userId: string, boothId: string): Promise<ApiResponse<null>> {
    return apiClient.post(`/progress/${userId}/qr-confirm`, { boothId });
  },
};

export const careerService = {
  // Get all career fields
  async getFields(): Promise<ApiResponse<string[]>> {
    return apiClient.get('/careers/fields');
  },

  // Get careers by field
  async getByField(field: string): Promise<ApiResponse<Career[]>> {
    return apiClient.get(`/careers?field=${encodeURIComponent(field)}`);
  },

  // Search careers
  async search(query: string): Promise<ApiResponse<Career[]>> {
    return apiClient.get(`/careers/search?q=${encodeURIComponent(query)}`);
  },
};

export const majorService = {
  // Get popular majors
  async getPopular(): Promise<ApiResponse<Major[]>> {
    return apiClient.get('/majors/popular');
  },

  // Get all majors
  async getAll(): Promise<ApiResponse<Major[]>> {
    return apiClient.get('/majors');
  },

  // Get majors by category
  async getByCategory(category: string): Promise<ApiResponse<Major[]>> {
    return apiClient.get(`/majors?category=${encodeURIComponent(category)}`);
  },

  // Search majors
  async search(query: string): Promise<ApiResponse<Major[]>> {
    return apiClient.get(`/majors/search?q=${encodeURIComponent(query)}`);
  },
};

export const schoolService = {
  // Get all schools
  async getAll(): Promise<ApiResponse<School[]>> {
    return apiClient.get('/schools');
  },

  // Get school by ID
  async getById(id: string): Promise<ApiResponse<School>> {
    return apiClient.get(`/schools/${id}`);
  },

  // Get schools by major
  async getByMajor(majorId: string): Promise<ApiResponse<School[]>> {
    return apiClient.get(`/schools?majorId=${majorId}`);
  },
};
