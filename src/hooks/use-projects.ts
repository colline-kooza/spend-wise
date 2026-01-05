/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createProject,
  deleteProject,
  getAllUserProjects,
  getProjectDetails,
  getProjects,
  getSharedProjects,
  getUserProjects,
  updateProject,
} from "@/auth-lib/actions/projects";
import type {
  CreateProjectRequest,
  UpdateProjectRequest,
} from "@/types/projects";

// Query Keys
export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (userId: string, filters?: any) =>
    [...projectKeys.lists(), userId, filters] as const,
  userList: () => [...projectKeys.all, "user-list"] as const,
  userProjects: (userId: string) =>
    [...projectKeys.userList(), { userId }] as const,
  sharedList: () => [...projectKeys.all, "shared-list"] as const,
  sharedProjects: (userId: string) =>
    [...projectKeys.sharedList(), { userId }] as const,
  allUser: (userId: string) =>
    [...projectKeys.all, "all-user", userId] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

// Fetch user's owned projects
export function useUserProjects(userId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: projectKeys.userProjects(userId),
    queryFn: () => getUserProjects(userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!userId,
  });

  return {
    userProjects: data?.data || [],
    isLoading,
    error: error?.message || data?.error || null,
    refetch,
  };
}

// Fetch user's shared projects
export function useSharedProjects(userId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: projectKeys.sharedProjects(userId),
    queryFn: () => getSharedProjects(userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!userId,
  });

  return {
    sharedProjects: data?.data || [],
    isLoading,
    error: error?.message || data?.error || null,
    refetch,
  };
}

/**
 * Get all projects (owned + shared) - Simple version
 */
export function useAllUserProjects(userId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: projectKeys.allUser(userId),
    queryFn: () => getAllUserProjects(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const projects = data?.data || [];

  return {
    projects,
    ownedProjects: projects.filter((p: any) => p.isOwner),
    sharedProjects: projects.filter((p: any) => !p.isOwner),
    isLoading,
    error: error?.message || data?.error || null,
    refetch,
  };
}

// Fetch all projects with pagination
export function useProjects(
  userId: string,
  page = 1,
  filters?: {
    status?: string;
    search?: string;
    type?: "owned" | "shared" | "all";
  }
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: projectKeys.list(userId, { page, ...filters }),
    queryFn: () => getProjects(userId, page, 10, filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!userId,
  });

  return {
    projects: data?.data?.projects || [],
    pagination: data?.data?.pagination || {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
    isLoading,
    error: error?.message || data?.error || null,
    refetch,
  };
}

// Fetch project details
export function useProjectDetails(projectId: string, userId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => getProjectDetails(projectId, userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!projectId && !!userId,
  });

  return {
    project: data?.data || null,
    isLoading,
    error: error?.message || data?.error || null,
    refetch,
  };
}

export function useCreateProject(userId: string, orgId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) =>
      createProject(userId, orgId, data),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Project created successfully");
        queryClient.invalidateQueries({
          queryKey: projectKeys.userList(),
        });
        queryClient.invalidateQueries({
          queryKey: projectKeys.lists(),
        });
        queryClient.invalidateQueries({
          queryKey: projectKeys.all,
        });
      } else {
        toast.error(response.error || "Failed to create project");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to create project";
      toast.error(errorMessage);
    },
  });
}

export function useUpdateProject(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: UpdateProjectRequest;
    }) => updateProject(projectId, userId, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        toast.success(response.message || "Project updated successfully");
        queryClient.setQueryData(
          projectKeys.detail(variables.projectId),
          response
        );
        queryClient.invalidateQueries({
          queryKey: projectKeys.lists(),
        });
        queryClient.invalidateQueries({
          queryKey: projectKeys.userList(),
        });
        queryClient.invalidateQueries({
          queryKey: projectKeys.sharedList(),
        });
        queryClient.invalidateQueries({
          queryKey: projectKeys.all,
        });
      } else {
        toast.error(response.error || "Failed to update project");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to update project";
      toast.error(errorMessage);
    },
  });
}

export function useDeleteProject(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId, userId),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Project deleted successfully");
        queryClient.invalidateQueries({
          queryKey: projectKeys.lists(),
        });
        queryClient.invalidateQueries({
          queryKey: projectKeys.userList(),
        });
        queryClient.invalidateQueries({
          queryKey: projectKeys.sharedList(),
        });
        queryClient.invalidateQueries({
          queryKey: projectKeys.all,
        });
      } else {
        toast.error(response.error || "Failed to delete project");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to delete project";
      toast.error(errorMessage);
    },
  });
}
