import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type {
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "@/types/departments";
import {
  createDepartment,
  deleteDepartment,
  getDepartmentDetails,
  getDepartments,
  updateDepartment,
} from "@/lib/actions/departments";

// Query Keys
export const departmentKeys = {
  all: ["departments"] as const,
  lists: () => [...departmentKeys.all, "list"] as const,
  list: (projectId: string, page: number, filters?: any) =>
    [...departmentKeys.lists(), { projectId, page, filters }] as const,
  details: () => [...departmentKeys.all, "detail"] as const,
  detail: (id: string) => [...departmentKeys.details(), id] as const,
};

// Fetch departments with pagination
export function useDepartments(
  projectId: string,
  userId: string,
  page = 1,
  filters?: any
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: departmentKeys.list(projectId, page, filters),
    queryFn: () => getDepartments(projectId, userId, page, 100, filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!projectId && !!userId,
  });

  return {
    departments: data?.departments || [],
    pagination: data?.pagination || {
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

// Fetch department details
export function useDepartmentDetails(
  departmentId: string,
  projectId: string,
  userId: string
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: departmentKeys.detail(departmentId),
    queryFn: () => getDepartmentDetails(departmentId, projectId, userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!departmentId && !!projectId && !!userId,
  });

  return {
    department: data?.data,
    isLoading,
    error: error?.message || null,
    refetch,
  };
}

// Create department mutation
export function useCreateDepartment(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDepartmentRequest) =>
      createDepartment(projectId, userId, data),
    onSuccess: (data) => {
      toast.success(data.message || "Department created successfully");
      queryClient.invalidateQueries({
        queryKey: departmentKeys.lists(),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to create department";
      toast.error(errorMessage);
    },
  });
}

// Update department mutation
export function useUpdateDepartment(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      departmentId,
      data,
    }: {
      departmentId: string;
      data: UpdateDepartmentRequest;
    }) => updateDepartment(departmentId, projectId, userId, data),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Department updated successfully");
      queryClient.setQueryData(
        departmentKeys.detail(variables.departmentId),
        data
      );
      queryClient.invalidateQueries({
        queryKey: departmentKeys.lists(),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to update department";
      toast.error(errorMessage);
    },
  });
}

// Delete department mutation
export function useDeleteDepartment(projectId: string, userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (departmentId: string) =>
      deleteDepartment(departmentId, projectId, userId),
    onSuccess: (data) => {
      toast.success(data.message || "Department deleted successfully");
      queryClient.invalidateQueries({
        queryKey: departmentKeys.lists(),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || "Failed to delete department";
      toast.error(errorMessage);
    },
  });
}
