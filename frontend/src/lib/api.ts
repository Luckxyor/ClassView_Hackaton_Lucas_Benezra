import axios from 'axios';
import type { CourseProgressPayload, CourseMetricsSummary } from '@/types/domain';

const FALLBACK_PROD_API_BASE_URL = 'https://backend-classview.vercel.app/api';
const FALLBACK_DEV_API_BASE_URL = 'http://localhost:4000/api';

const normalizeBaseURL = (url: string): string => {
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const resolveBaseURL = (): string => {
  const rawEnvUrl = import.meta.env.VITE_API_BASE_URL?.toString().trim();

  if (rawEnvUrl && rawEnvUrl.length > 0) {
    return normalizeBaseURL(rawEnvUrl);
  }

  if (import.meta.env.PROD) {
    return FALLBACK_PROD_API_BASE_URL;
  }

  return FALLBACK_DEV_API_BASE_URL;
};

const api = axios.create({
  baseURL: resolveBaseURL(),
  timeout: 15000
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
