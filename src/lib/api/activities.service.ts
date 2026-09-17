import { SystemActivity } from '../types/activity';
import { apiClient } from './client';


export async function getRecentActivities(limit: number = 10): Promise<SystemActivity[]> {
  return apiClient<SystemActivity[]>(`/api/activities?limit=${limit}`);
}
