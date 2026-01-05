/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  togglePinNote,
  updateNote,
} from "@/auth-lib/actions/notes";
import type { CreateNoteRequest, Note, UpdateNoteRequest } from "@/types/notes";

export const noteKeys = {
  all: ["notes"] as const,
  lists: () => [...noteKeys.all, "list"] as const,
  list: (projectId: string) => [...noteKeys.lists(), projectId] as const,
  details: () => [...noteKeys.all, "detail"] as const,
  detail: (id: string) => [...noteKeys.details(), id] as const,
};

export function useNotes(projectId: string, userId: string, filters?: any) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [...noteKeys.list(projectId), filters],
    queryFn: async () => {
      const result = await getNotes(projectId, userId, filters);

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch notes");
      }

      return result;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!projectId && !!userId,
    retry: (failureCount, error: any) => {
      if (
        error?.message?.includes("Authentication") ||
        error?.message?.includes("permission")
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return {
    notes: (data?.data || []) as Note[],
    isLoading,
    error: error instanceof Error ? error.message : null,
    refetch,
  };
}

export function useNoteById(noteId: string, projectId: string, userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: noteKeys.detail(noteId),
    queryFn: async () => {
      const result = await getNoteById(noteId, projectId, userId);

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch note");
      }

      return result;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!noteId && !!projectId && !!userId,
    retry: (failureCount, error: any) => {
      if (
        error?.message?.includes("Authentication") ||
        error?.message?.includes("permission") ||
        error?.message?.includes("not found")
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return {
    note: data?.data as Note | undefined,
    isLoading,
    error: error instanceof Error ? error.message : null,
  };
}

export function useCreateNote(projectId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateNoteRequest) => {
      const result = await createNote(projectId, userId, data);

      if (!result.success) {
        throw new Error(result.error || "Failed to create note");
      }

      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Note created successfully");

      // Invalidate all note lists
      queryClient.invalidateQueries({
        queryKey: noteKeys.lists(),
      });

      // CRITICAL FIX: Invalidate dashboard stats to show new notes
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "stats", projectId],
      });
    },
    onError: (error: Error) => {
      console.error("Create note error:", error);
      toast.error(error.message || "Failed to create note");
    },
  });
}

export function useUpdateNote(
  projectId: string,
  userId: string,
  noteId: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateNoteRequest) => {
      const result = await updateNote(noteId, projectId, userId, data);

      if (!result.success) {
        throw new Error(result.error || "Failed to update note");
      }

      return result;
    },
    // Optimistic update
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: noteKeys.detail(noteId) });
      await queryClient.cancelQueries({ queryKey: noteKeys.lists() });

      // Snapshot previous value
      const previousNote = queryClient.getQueryData(noteKeys.detail(noteId));
      const previousNotes = queryClient.getQueryData(noteKeys.list(projectId));

      // Optimistically update detail
      if (previousNote) {
        queryClient.setQueryData(noteKeys.detail(noteId), {
          ...previousNote,
          data: { ...(previousNote as any).data, ...newData },
        });
      }

      // Optimistically update list
      if (previousNotes) {
        queryClient.setQueryData(noteKeys.list(projectId), {
          ...previousNotes,
          data: (previousNotes as any).data.map((note: Note) =>
            note.id === noteId ? { ...note, ...newData } : note
          ),
        });
      }

      return { previousNote, previousNotes };
    },
    onError: (error: Error, newData, context) => {
      // Rollback on error
      if (context?.previousNote) {
        queryClient.setQueryData(noteKeys.detail(noteId), context.previousNote);
      }
      if (context?.previousNotes) {
        queryClient.setQueryData(
          noteKeys.list(projectId),
          context.previousNotes
        );
      }

      console.error("Update note error:", error);
      toast.error(error.message || "Failed to update note");
    },
    onSuccess: (data) => {
      toast.success(data.message || "Note updated successfully");

      // Invalidate to ensure consistency
      queryClient.invalidateQueries({
        queryKey: noteKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard", "stats", projectId],
      });
    },
  });
}

export function useDeleteNote(projectId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noteId: string) => {
      const result = await deleteNote(noteId, projectId, userId);

      if (!result.success) {
        throw new Error(result.error || "Failed to delete note");
      }

      return { ...result, noteId };
    },
    // Optimistic delete
    onMutate: async (noteId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: noteKeys.lists() });

      // Snapshot previous value
      const previousNotes = queryClient.getQueryData(noteKeys.list(projectId));

      // Optimistically remove from list
      if (previousNotes) {
        queryClient.setQueryData(noteKeys.list(projectId), {
          ...previousNotes,
          data: (previousNotes as any).data.filter(
            (note: Note) => note.id !== noteId
          ),
        });
      }

      return { previousNotes };
    },
    onError: (error: Error, noteId, context) => {
      // Rollback on error
      if (context?.previousNotes) {
        queryClient.setQueryData(
          noteKeys.list(projectId),
          context.previousNotes
        );
      }

      console.error("Delete note error:", error);
      toast.error(error.message || "Failed to delete note");
    },
    onSuccess: (data) => {
      toast.success(data.message || "Note deleted successfully");

      // Invalidate to ensure consistency
      queryClient.invalidateQueries({
        queryKey: noteKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard", "stats", projectId],
      });
    },
  });
}

export function useTogglePinNote(projectId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { noteId: string; isPinned: boolean }) => {
      const result = await togglePinNote(
        data.noteId,
        projectId,
        userId,
        data.isPinned
      );

      if (!result.success) {
        throw new Error(result.error || "Failed to update note");
      }

      return result;
    },
    // Optimistic pin toggle
    onMutate: async ({ noteId, isPinned }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: noteKeys.lists() });

      // Snapshot previous value
      const previousNotes = queryClient.getQueryData(noteKeys.list(projectId));

      // Optimistically update
      if (previousNotes) {
        queryClient.setQueryData(noteKeys.list(projectId), {
          ...previousNotes,
          data: (previousNotes as any).data.map((note: Note) =>
            note.id === noteId ? { ...note, isPinned } : note
          ),
        });
      }

      return { previousNotes };
    },
    onError: (error: Error, variables, context) => {
      // Rollback on error
      if (context?.previousNotes) {
        queryClient.setQueryData(
          noteKeys.list(projectId),
          context.previousNotes
        );
      }

      console.error("Toggle pin error:", error);
      toast.error(error.message || "Failed to update note");
    },
    onSuccess: (data) => {
      toast.success(data.message || "Note updated");

      // Invalidate to refresh order (pinned notes should appear first)
      queryClient.invalidateQueries({
        queryKey: noteKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard", "stats", projectId],
      });
    },
  });
}
