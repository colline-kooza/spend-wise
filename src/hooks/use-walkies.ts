import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  CreateWalkieTalkieRequest,
  UpdateWalkieTalkieRequest,
} from "@/types/walkie-talkie";
import {
  createWalkieTalkie,
  deleteWalkieTalkie,
  getDepartmentsForProject,
  getWalkieTalkieDetails,
  getWalkieTalkies,
  updateWalkieTalkie,
} from "@/lib/actions/walkie-talkies";
import { crewKeys } from "./use-crew-members";

// Query Keys
export const walkieTalkieKeys = {
  all: ["walkieTalkies"] as const,
  lists: () => [...walkieTalkieKeys.all, "list"] as const,
  list: (projectId: string, filters?: any) =>
    [...walkieTalkieKeys.lists(), { projectId, filters }] as const,
  details: () => [...walkieTalkieKeys.all, "detail"] as const,
  detail: (id: string) => [...walkieTalkieKeys.details(), id] as const,
  departments: (projectId: string) =>
    [...walkieTalkieKeys.all, "departments", projectId] as const,
};

// Fetch walkie talkies with pagination
export function useWalkieTalkies(
  projectId: string,
  userId: string,
  page = 1,
  filters?: any,
  sort?: { field: string; order: "asc" | "desc" }
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [...walkieTalkieKeys.list(projectId, filters), sort],
    queryFn: () => getWalkieTalkies(projectId, userId, page, 12, filters, sort),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!projectId && !!userId,
  });

  return {
    walkieTalkies: data?.walkieTalkies || [],
    pagination: data?.pagination || {
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
    isLoading,
    error: error?.message || null,
    refetch,
  };
}

// Fetch walkie talkie details
export function useWalkieTalkieDetails(
  walkieTalkieId: string,
  projectId: string,
  userId: string
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: walkieTalkieKeys.detail(walkieTalkieId),
    queryFn: () => getWalkieTalkieDetails(walkieTalkieId, projectId, userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!walkieTalkieId && !!projectId && !!userId,
  });

  return {
    walkieTalkie: data?.data,
    isLoading,
    error: error?.message || null,
    refetch,
  };
}

// Fetch departments for a project
export function useDepartmentsForProject(projectId: string, userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: walkieTalkieKeys.departments(projectId),
    queryFn: () => getDepartmentsForProject(projectId, userId),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    enabled: !!projectId && !!userId,
  });

  return {
    departments: data?.data || [],
    isLoading,
    error: error?.message || null,
  };
}

// Create walkie talkie mutation with optimistic update
export function useCreateWalkieTalkie(projectId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateWalkieTalkieRequest) => {
      const result = await createWalkieTalkie(projectId, userId, data);

      if (!result.success) {
        throw new Error(result.error || "Failed to create walkie talkie");
      }

      return result;
    },
    onMutate: async (newWalkie) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: walkieTalkieKeys.lists(),
      });

      // Snapshot previous value
      const previousWalkies = queryClient.getQueriesData({
        queryKey: walkieTalkieKeys.lists(),
      });

      // Optimistically update to the new value
      queryClient.setQueriesData(
        { queryKey: walkieTalkieKeys.lists() },
        (old: any) => {
          if (!old) return old;

          // Create optimistic walkie with temp ID
          const optimisticWalkie = {
            id: `temp-${Date.now()}`,
            serialNumber: newWalkie.serialNumber,
            label: newWalkie.label || null,
            innerLabel: newWalkie.innerLabel || null,
            status: newWalkie.departmentId
              ? "assigned"
              : newWalkie.status || "available",
            departmentId: newWalkie.departmentId || null,
            department: null, // Will be populated on success
            assignments: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          return {
            ...old,
            walkieTalkies: [optimisticWalkie, ...old.walkieTalkies],
            pagination: {
              ...old.pagination,
              total: old.pagination.total + 1,
            },
          };
        }
      );

      return { previousWalkies };
    },
    onSuccess: (data) => {
      toast.success(data.message || "Walkie talkie created successfully");
      queryClient.invalidateQueries({
        queryKey: walkieTalkieKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: crewKeys.lists(),
      });
    },
    onError: (error: any, _newWalkie, context) => {
      // Rollback on error
      if (context?.previousWalkies) {
        context.previousWalkies.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      const errorMessage = error?.message || "Failed to create walkie talkie";
      toast.error(errorMessage);
    },
  });
}

// Update walkie talkie mutation with optimistic update
export function useUpdateWalkieTalkie(projectId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      walkieTalkieId,
      data,
    }: {
      walkieTalkieId: string;
      data: UpdateWalkieTalkieRequest;
    }) => {
      const result = await updateWalkieTalkie(
        walkieTalkieId,
        projectId,
        userId,
        data
      );

      if (!result.success) {
        throw new Error(result.error || "Failed to update walkie talkie");
      }

      return { ...result, walkieTalkieId };
    },
    onMutate: async ({ walkieTalkieId, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: walkieTalkieKeys.lists(),
      });
      await queryClient.cancelQueries({
        queryKey: walkieTalkieKeys.detail(walkieTalkieId),
      });

      // Snapshot previous values
      const previousWalkies = queryClient.getQueriesData({
        queryKey: walkieTalkieKeys.lists(),
      });
      const previousDetails = queryClient.getQueryData(
        walkieTalkieKeys.detail(walkieTalkieId)
      );

      // Optimistically update lists
      queryClient.setQueriesData(
        { queryKey: walkieTalkieKeys.lists() },
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            walkieTalkies: old.walkieTalkies.map((w: any) =>
              w.id === walkieTalkieId
                ? {
                    ...w,
                    ...data,
                    updatedAt: new Date(),
                  }
                : w
            ),
          };
        }
      );

      // Optimistically update details
      queryClient.setQueryData(
        walkieTalkieKeys.detail(walkieTalkieId),
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              ...data,
              updatedAt: new Date(),
            },
          };
        }
      );

      return { previousWalkies, previousDetails };
    },
    onSuccess: (data) => {
      toast.success(data.message || "Walkie talkie updated successfully");
      queryClient.invalidateQueries({
        queryKey: walkieTalkieKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: walkieTalkieKeys.detail(data.walkieTalkieId),
      });
      queryClient.invalidateQueries({
        queryKey: crewKeys.lists(),
      });
    },
    onError: (error: any, { walkieTalkieId }, context) => {
      // Rollback on error
      if (context?.previousWalkies) {
        context.previousWalkies.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      if (context?.previousDetails) {
        queryClient.setQueryData(
          walkieTalkieKeys.detail(walkieTalkieId),
          context.previousDetails
        );
      }

      const errorMessage = error?.message || "Failed to update walkie talkie";
      toast.error(errorMessage);
    },
  });
}

// Delete walkie talkie mutation with optimistic update
export function useDeleteWalkieTalkie(projectId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (walkieTalkieId: string) => {
      const result = await deleteWalkieTalkie(
        walkieTalkieId,
        projectId,
        userId
      );

      if (!result.success) {
        throw new Error(result.error || "Failed to delete walkie talkie");
      }

      return result;
    },
    onMutate: async (walkieTalkieId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: walkieTalkieKeys.lists(),
      });

      // Snapshot previous value
      const previousWalkies = queryClient.getQueriesData({
        queryKey: walkieTalkieKeys.lists(),
      });

      // Optimistically remove the walkie
      queryClient.setQueriesData(
        { queryKey: walkieTalkieKeys.lists() },
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            walkieTalkies: old.walkieTalkies.filter(
              (w: any) => w.id !== walkieTalkieId
            ),
            pagination: {
              ...old.pagination,
              total: Math.max(0, old.pagination.total - 1),
            },
          };
        }
      );

      return { previousWalkies };
    },
    onSuccess: (data) => {
      toast.success(data.message || "Walkie talkie deleted successfully");
      // Invalidate to ensure consistency
      queryClient.invalidateQueries({
        queryKey: walkieTalkieKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: crewKeys.lists(),
      });
    },
    onError: (error: any, _walkieTalkieId, context) => {
      // Rollback on error
      if (context?.previousWalkies) {
        context.previousWalkies.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      const errorMessage = error?.message || "Failed to delete walkie talkie";
      toast.error(errorMessage);
    },
  });
}

// Update walkie talkie assignment mutation
export function useUpdateWalkieAssignment(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  const { updateWalkieAssignment } = require("@/lib/actions/walkie-talkies");

  return useMutation({
    mutationFn: async ({
      assignmentId,
      data,
    }: {
      assignmentId: string;
      data: { returnDate?: Date | null; expectedReturnDate?: Date | null };
    }) => {
      const result = await updateWalkieAssignment(
        assignmentId,
        projectId,
        userId,
        data
      );

      if (!result.success) {
        throw new Error(result.error || "Failed to update assignment");
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Assignment updated successfully");
      queryClient.invalidateQueries({
        queryKey: walkieTalkieKeys.lists(),
      });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update assignment");
    },
  });
}
