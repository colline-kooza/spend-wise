/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createCrewMember,
  deleteCrewMember,
  getCrewMemberDetails,
  getCrewMembers,
  updateCrewMember,
} from "@/lib/actions/crew-members";
import type {
  CreateCrewMemberRequest,
  UpdateCrewMemberRequest,
} from "@/types/crew-members";

// Query Keys
export const crewKeys = {
  all: ["crew"] as const,
  lists: () => [...crewKeys.all, "list"] as const,
  list: (projectId: string, filters?: any) =>
    [...crewKeys.lists(), { projectId, filters }] as const,
  details: () => [...crewKeys.all, "detail"] as const,
  detail: (id: string) => [...crewKeys.details(), id] as const,
};

// Fetch crew members with pagination and filters
export function useCrewMembers(
  projectId: string,
  userId: string,
  page = 1,
  filters?: any
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: crewKeys.list(projectId, filters),
    queryFn: () => getCrewMembers(projectId, userId, page, 10, filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!projectId && !!userId,
  });

  return {
    crewMembers: data?.data?.crewMembers || [],
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

// Fetch crew member details
export function useCrewMemberDetails(
  crewMemberId: string,
  projectId: string,
  userId: string
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: crewKeys.detail(crewMemberId),
    queryFn: () => getCrewMemberDetails(crewMemberId, projectId, userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!crewMemberId && !!projectId && !!userId,
  });

  return {
    crewMember: data?.data,
    isLoading,
    error: error?.message || null,
    refetch,
  };
}

import { walkieTalkieKeys } from "./use-walkies";

// ... (keep createCrewMember, deleteCrewMember imports etc)

// ...

// Create crew member mutation
export function useCreateCrewMember(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCrewMemberRequest) =>
      createCrewMember(projectId, userId, data),
    onSuccess: (data) => {
      toast.success(data.message || "Crew member created successfully");
      queryClient.invalidateQueries({
        queryKey: crewKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: walkieTalkieKeys.all,
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to create crew member";
      toast.error(errorMessage);
    },
  });
}

// Update crew member mutation
export function useUpdateCrewMember(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      crewMemberId,
      data,
    }: {
      crewMemberId: string;
      data: UpdateCrewMemberRequest;
    }) => updateCrewMember(crewMemberId, projectId, userId, data),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Crew member updated successfully");
      queryClient.setQueryData(crewKeys.detail(variables.crewMemberId), data);
      queryClient.invalidateQueries({
        queryKey: crewKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: walkieTalkieKeys.all,
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to update crew member";
      toast.error(errorMessage);
    },
  });
}

// Delete crew member mutation
export function useDeleteCrewMember(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (crewMemberId: string) =>
      deleteCrewMember(crewMemberId, projectId, userId),
    onSuccess: (data) => {
      toast.success(data.message || "Crew member deleted successfully");
      queryClient.invalidateQueries({
        queryKey: crewKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: walkieTalkieKeys.all,
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to delete crew member";
      toast.error(errorMessage);
    },
  });
}
