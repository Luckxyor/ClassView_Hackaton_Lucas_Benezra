import axios from 'axios';
import type { CourseProgressPayload, CourseMetricsSummary } from '@/types/domain';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api'
});

export async function fetchProgress (teacherEmail: string): Promise<CourseProgressPayload[]> {
  const { data } = await api.get<{ data: CourseProgressPayload[] }>('/progress', {
    params: { teacherEmail }
  });
  return data.data;
}

export async function fetchMetrics (teacherEmail: string): Promise<CourseMetricsSummary[]> {
  const { data } = await api.get<{ data: CourseMetricsSummary[] }>('/metrics', {
    params: { teacherEmail }
  });
  return data.data;
}

export async function sendNotification (payload: { to: string; body: string; channel?: string }): Promise<void> {
  await api.post('/communications', payload);
}
