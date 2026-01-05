import { useQuery } from "@tanstack/react-query";

import { getDashboardStats } from "@/auth-lib/actions/dashboard";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: (projectId: string) =>
    [...dashboardKeys.all, "stats", projectId] as const,
};

export function useDashboardStats(projectId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: dashboardKeys.stats(projectId),
    queryFn: () => getDashboardStats(projectId),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!projectId,
    refetchInterval: 5 * 60 * 1000, // refetch every 5 minutes
  });

  return {
    stats: data?.data,
    isLoading,
    error: error?.message || data?.error || null,
    refetch,
  };
}
