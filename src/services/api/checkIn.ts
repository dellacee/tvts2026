import { apiClient } from './client';
import type { ApiResponse } from '@/types';

export interface CheckInRecord {
  userId: string;
  roomType: number;
  deskId: string;
  created: string;
}

export interface UserCheckInInfo {
  order: number;
  checkIns: CheckInRecord[];
}

export interface CheckInInput {
  roomType?: number;
  deskId?: string;
}

export const checkInService = {
  // Get current user's check-in info
  async getCurrentUserCheckIn(): Promise<ApiResponse<UserCheckInInfo>> {
    return apiClient.get('/UserCheckIn/current-user');
  },

  // Post user check-in
  async postUserCheckIn(data: CheckInInput): Promise<ApiResponse<UserCheckInInfo>> {
    return apiClient.post('/UserCheckIn/post-user-checkin', data as unknown as Record<string, unknown>);
  },
};
