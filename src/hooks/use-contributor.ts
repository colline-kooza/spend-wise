import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  searchUsers,
  sendInvitation,
  getProjectCollaborators,
  getProjectInvitations,
  removeCollaborator,
  cancelInvitation,
  updateCollaboratorRole,
} from "@/lib/actions/contributors";
import { ContributorRole } from "@/types/contributors";

// Query Keys
export const contributorKeys = {
  all: ["contributors"] as const,
  lists: () => [...contributorKeys.all, "list"] as const,
  list: (projectId: string) => [...contributorKeys.lists(), projectId] as const,
  search: () => [...contributorKeys.all, "search"] as const,
  searchQuery: (projectId: string, query: string) =>
    [...contributorKeys.search(), projectId, query] as const,
};

/**
 * Search for users - FIXED: Removed 3-character minimum requirement
 */
export function useSearchUsers(
  projectId: string,
  query: string,
  userId: string
) {
  const { data, isLoading, error } = useQuery({
    queryKey: contributorKeys.searchQuery(projectId, query),
    queryFn: () => searchUsers(query, projectId, userId),
    enabled: !!projectId && !!userId && query.length > 0, // Changed from >= 3 to > 0
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return {
    results: data?.data || [],
    isLoading,
    error: error?.message || null,
  };
}

/**
 * Get all collaborators for a project
 */
export function useProjectCollaborators(projectId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: contributorKeys.list(projectId),
    queryFn: () => getProjectCollaborators(projectId),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    collaborators: data?.data || [],
    isLoading,
    error: error?.message || null,
    refetch,
  };
}

/**
 * Get pending invitations for a project
 */
export function useProjectInvitations(projectId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [...contributorKeys.list(projectId), "invitations"],
    queryFn: () => getProjectInvitations(projectId),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    invitations: data?.data || [],
    isLoading,
    error: error?.message || null,
    refetch,
  };
}

/**
 * Invite collaborator mutation
 */
export function useInviteCollaborator(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      email: string;
      role: ContributorRole;
      message?: string;
    }) =>
      sendInvitation(data.email, projectId, userId, data.role, data.message),
    onSuccess: (data) => {
      toast.success(data.message || "Invitation sent successfully");
      queryClient.invalidateQueries({
        queryKey: contributorKeys.list(projectId),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to send invitation";
      toast.error(errorMessage);
    },
  });
}

/**
 * Remove collaborator mutation
 */
export function useRemoveCollaborator(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (collaboratorId: string) =>
      removeCollaborator(collaboratorId, projectId, userId),
    onSuccess: (data) => {
      toast.success(data.message || "Collaborator removed successfully");
      queryClient.invalidateQueries({
        queryKey: contributorKeys.list(projectId),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to remove collaborator";
      toast.error(errorMessage);
    },
  });
}

/**
 * Cancel invitation mutation
 */
export function useCancelInvitation(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invitationId: string) =>
      cancelInvitation(invitationId, projectId, userId),
    onSuccess: (data) => {
      toast.success(data.message || "Invitation cancelled successfully");
      queryClient.invalidateQueries({
        queryKey: contributorKeys.list(projectId),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to cancel invitation";
      toast.error(errorMessage);
    },
  });
}

/**
 * Update collaborator role mutation
 */
export function useUpdateCollaboratorRole(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      collaboratorId,
      role,
    }: {
      collaboratorId: string;
      role: ContributorRole;
    }) => updateCollaboratorRole(collaboratorId, projectId, role, userId),
    onSuccess: (data) => {
      toast.success(data.message || "Role updated successfully");
      queryClient.invalidateQueries({
        queryKey: contributorKeys.list(projectId),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to update role";
      toast.error(errorMessage);
    },
  });
}
