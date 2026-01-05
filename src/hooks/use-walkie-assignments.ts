import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  cancelAssignment,
  createWalkieAssignment,
  extendAssignmentReturnDate,
  getAssignmentDetails,
  getAssignments,
  returnWalkieTalkie,
  getActiveWalkieTalkies,
  getCrewMembers,
} from "@/lib/actions/walkie-assignment";
import type {
  CreateWalkieAssignmentRequest,
  ExtendAssignmentRequest,
  ReturnAssignmentRequest,
  AssignmentFilters,
} from "@/types/walkie-assignment";

// Query Keys
export const assignmentKeys = {
  all: ["assignments"] as const,
  lists: () => [...assignmentKeys.all, "list"] as const,
  list: (projectId: string, filters?: AssignmentFilters) =>
    [...assignmentKeys.lists(), { projectId, filters }] as const,
  details: () => [...assignmentKeys.all, "detail"] as const,
  detail: (id: string) => [...assignmentKeys.details(), id] as const,
  available: () => [...assignmentKeys.all, "available"] as const,
};

// Fetch assignments
export function useAssignments(
  projectId: string,
  userId: string,
  page = 1,
  filters?: AssignmentFilters
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: assignmentKeys.list(projectId, filters),
    queryFn: () => getAssignments(projectId, userId, page, 10, filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!projectId && !!userId,
  });

  return {
    assignments: data?.data?.assignments || [],
    pagination: data?.data?.pagination || {
      page: 1,
      limit: 10,
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

// Fetch assignment details
export function useAssignmentDetails(
  assignmentId: string,
  projectId: string,
  userId: string
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: assignmentKeys.detail(assignmentId),
    queryFn: () => getAssignmentDetails(assignmentId, projectId, userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!assignmentId && !!projectId && !!userId,
  });

  return {
    assignment: data?.data,
    isLoading,
    error: error?.message || null,
    refetch,
  };
}

// Fetch available walkies
export function useAvailableWalkies(projectId: string, userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: assignmentKeys.available(),
    queryFn: () => getActiveWalkieTalkies(projectId, userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!projectId && !!userId,
  });

  return {
    walkies: data?.data || [],
    isLoading,
    error: error?.message || null,
  };
}

// Create assignment mutation
export function useCreateAssignment(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateWalkieAssignmentRequest) =>
      createWalkieAssignment(projectId, userId, data),
    onSuccess: (data) => {
      toast.success(data.message || "Assignment created successfully");
      queryClient.invalidateQueries({
        queryKey: assignmentKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: assignmentKeys.available(),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to create assignment";
      toast.error(errorMessage);
    },
  });
}

// Extend assignment mutation
export function useExtendAssignment(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ExtendAssignmentRequest) =>
      extendAssignmentReturnDate(projectId, userId, data),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Return date extended successfully");
      queryClient.setQueryData(
        assignmentKeys.detail(variables.assignmentId),
        data
      );
      queryClient.invalidateQueries({
        queryKey: assignmentKeys.lists(),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to extend return date";
      toast.error(errorMessage);
    },
  });
}

// Return assignment mutation
export function useReturnAssignment(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReturnAssignmentRequest) =>
      returnWalkieTalkie(projectId, userId, data),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Walkie-talkie returned successfully");
      queryClient.setQueryData(
        assignmentKeys.detail(variables.assignmentId),
        data
      );
      queryClient.invalidateQueries({
        queryKey: assignmentKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: assignmentKeys.available(),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to return walkie-talkie";
      toast.error(errorMessage);
    },
  });
}

// Cancel assignment mutation
export function useCancelAssignment(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignmentId: string) =>
      cancelAssignment(projectId, userId, assignmentId),
    onSuccess: (data) => {
      toast.success(data.message || "Assignment cancelled successfully");
      queryClient.invalidateQueries({
        queryKey: assignmentKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: assignmentKeys.available(),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to cancel assignment";
      toast.error(errorMessage);
    },
  });
}

// Add this to your query hooks file
export function useCrewMembers(projectId: string, userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["crewMembers", projectId],
    queryFn: () => getCrewMembers(projectId, userId),
    staleTime: 5 * 60 * 1000,
    enabled: !!projectId && !!userId,
  });

  return {
    crewMembers: data?.data || [],
    isLoading,
    error: error?.message || null,
  };
}
