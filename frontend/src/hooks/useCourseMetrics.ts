import { useQuery } from '@tanstack/react-query';
import { fetchMetrics } from '@/lib/api';
import { useUserStore } from '@/stores/userStore';

export function useCourseMetrics () {
  const { email } = useUserStore();

  return useQuery({
    queryKey: ['metrics', email],
    queryFn: async () => await fetchMetrics(email),
    enabled: Boolean(email),
    retry: 1,
    staleTime: 1000 * 60 * 5
  });
}
