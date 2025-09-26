import { useQuery } from '@tanstack/react-query';
import { fetchProgress } from '@/lib/api';
import { useUserStore } from '@/stores/userStore';

export function useTeacherProgress () {
  const { email } = useUserStore();

  return useQuery({
    queryKey: ['progress', email],
    queryFn: async () => await fetchProgress(email),
    enabled: Boolean(email),
    retry: 1,
    staleTime: 1000 * 60 * 5
  });
}
