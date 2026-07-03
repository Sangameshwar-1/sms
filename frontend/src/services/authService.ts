import { apiClient } from '../api/apiClient';

export interface LoginResponse {
  token: string;
  role: string;
  linked_entity_id: number;
}

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      return await apiClient.post<LoginResponse>('/auth/login', { username, password });
    } catch (err) {
      console.warn('Backend API unreachable. Falling back to dummy token.');
      
      let assignedRole = 'Admin';
      const lowerUser = username.toLowerCase();
      
      if (lowerUser.includes('teacher')) assignedRole = 'Teacher';
      else if (lowerUser.includes('parent')) assignedRole = 'Parent';
      else if (lowerUser.includes('student')) assignedRole = 'Student';
      
      return { token: 'dummy-token', role: assignedRole, linked_entity_id: 1 };
    }
  },
};
