/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { format } from "date-fns";
import {
  AlertCircle,
  Building2,
  Edit2,
  FileText,
  Loader2,
  Pin,
  Radio,
  Trash2,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// Use React Query hooks instead of direct actions
import {
  useDeleteNote,
  useTogglePinNote,
  useUpdateNote,
} from "@/hooks/use-notes";
import type { Note } from "@/types/notes";

import { Badge } from "../ui/badge";

interface NotesSectionProps {
  notes: any[];
  onRefresh?: () => void;
  userId: string;
  projectId: string; // Added this prop
}

export function NotesSection({
  notes,
  onRefresh,
  userId,
  projectId,
}: NotesSectionProps) {
  const router = useRouter();

  // Sort notes to show pinned first
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });

  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  // React Query mutations
  const updateNoteMutation = useUpdateNote(
    projectId,
    userId,
    editingNote?.id || ""
  );
  const deleteNoteMutation = useDeleteNote(projectId, userId);
  const togglePinMutation = useTogglePinNote(projectId, userId);

  // Handlers
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setIsEditModalOpen(true);
  };

  const handleDelete = (noteId: string) => {
    setDeletingNoteId(noteId);
  };

  const handleTogglePin = async (noteId: string, currentPinStatus: boolean) => {
    try {
      await togglePinMutation.mutateAsync({
        noteId,
        isPinned: !currentPinStatus,
      });
      onRefresh?.();
    } catch (error) {
      // Error is already handled by the mutation
      console.error("Error toggling pin:", error);
    }
  };

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote) return;

    try {
      await updateNoteMutation.mutateAsync({
        title: editingNote.title || undefined,
        content: editingNote.content,
      });
      onRefresh?.();
      setIsEditModalOpen(false);
      setEditingNote(undefined);
    } catch (error) {
      // Error is already handled by the mutation
      console.error("Error saving note:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingNoteId) return;

    try {
      await deleteNoteMutation.mutateAsync(deletingNoteId);
      onRefresh?.();
      setDeletingNoteId(null);
    } catch (error) {
      // Error is already handled by the mutation
      console.error("Error deleting note:", error);
    }
  };

  const InternalNoteCard = ({
    note,
    onEdit,
    onDelete,
    onTogglePin,
    isPinning,
    isDeleting,
  }: any) => {
    const preview = note.content.substring(0, 80);
    const truncated = note.content.length > 80;

    return (
      <Card className="group bg-sidebar border-sidebar-border hover:border-sidebar-primary relative overflow-hidden transition-colors">
        {note.isPinned && (
          <div className="absolute top-0 right-0 left-0 h-1 bg-primary" />
        )}
        <div className="space-y-2 p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              {note.title && (
                <h3 className="text-sidebar-foreground truncate text-sm font-semibold transition-colors group-hover:text-primary">
                  {note.title}
                </h3>
              )}
              <p className="text-sidebar-accent-foreground mt-0.5 text-xs">
                {format(new Date(note.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
          <p className="text-sidebar-accent-foreground line-clamp-2 text-xs">
            {preview}
            {truncated && "..."}
          </p>
          {(note.crewMember || note.walkieTalkie || note.department) && (
            <div className="border-sidebar-border flex flex-wrap gap-1.5 border-t pt-2">
              {note.crewMember && (
                <Badge
                  variant="secondary"
                  className="h-5 gap-1 border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] font-normal text-primary"
                >
                  <User className="h-2.5 w-2.5" />
                  {note.crewMember.firstName} {note.crewMember.lastName}
                </Badge>
              )}
              {note.walkieTalkie && (
                <Badge
                  variant="secondary"
                  className="h-5 gap-1 border-orange-500/20 bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-normal text-orange-600"
                >
                  <Radio className="h-2.5 w-2.5" />
                  {note.walkieTalkie.serialNumber}
                </Badge>
              )}
              {note.department && (
                <Badge
                  variant="secondary"
                  className="h-5 gap-1 px-1.5 py-0.5 text-[10px] font-normal"
                  style={{
                    backgroundColor: note.department.color
                      ? `${note.department.color}20`
                      : undefined,
                    color: note.department.color,
                    borderColor: note.department.color
                      ? `${note.department.color}40`
                      : undefined,
                  }}
                >
                  <Building2 className="h-2.5 w-2.5" />
                  {note.department.name}
                </Badge>
              )}
            </div>
          )}
          <div className="flex gap-1.5 pt-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note);
              }}
              disabled={isDeleting}
              className="hover:bg-sidebar-accent h-7 w-7 p-0"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(note.id, note.isPinned);
              }}
              disabled={isPinning}
              className={`hover:bg-sidebar-accent h-7 w-7 p-0 ${
                note.isPinned ? "bg-sidebar-accent text-primary" : ""
              }`}
            >
              {isPinning ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Pin
                  className={`h-3 w-3 ${note.isPinned ? "fill-current" : ""}`}
                />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              disabled={isDeleting}
              className="ml-auto h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              {isDeleting ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Trash2 className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-none pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4" />
              Project Notes
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => router.push(`/dashboard/notes`)}
            >
              View All
            </Button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Recent updates and notes
          </p>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <div className="h-full space-y-2.5 overflow-y-auto pr-1">
            {notes.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No notes yet
              </p>
            ) : (
              sortedNotes.map((note) => (
                <InternalNoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onTogglePin={handleTogglePin}
                  isPinning={
                    togglePinMutation.isPending &&
                    note.id === togglePinMutation.variables?.noteId
                  }
                  isDeleting={
                    deleteNoteMutation.isPending && deletingNoteId === note.id
                  }
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogDescription>
              Make changes to your note here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveNote}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingNote?.title || ""}
                  onChange={(e) =>
                    setEditingNote((prev) =>
                      prev ? { ...prev, title: e.target.value } : undefined
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={editingNote?.content || ""}
                  onChange={(e) =>
                    setEditingNote((prev) =>
                      prev ? { ...prev, content: e.target.value } : undefined
                    )
                  }
                  className="min-h-[100px]"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingNote(undefined);
                }}
                disabled={updateNoteMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateNoteMutation.isPending}>
                {updateNoteMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deletingNoteId}
        onOpenChange={(open) => {
          if (!open && !deleteNoteMutation.isPending) {
            setDeletingNoteId(null);
          }
        }}
      >
        <DialogContent className="max-w-sm border-border bg-background">
          <DialogHeader>
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <div className="space-y-1">
                <DialogTitle className="text-foreground">
                  Delete Note
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  This action cannot be undone. Your note will be permanently
                  deleted.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeletingNoteId(null)}
              disabled={deleteNoteMutation.isPending}
              className="border-border hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={deleteNoteMutation.isPending}
              variant="destructive"
              className="gap-2"
            >
              {deleteNoteMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
