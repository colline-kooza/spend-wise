"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Pin } from "lucide-react"

import { useNotes, useCreateNote, useUpdateNote, useDeleteNote, useTogglePinNote } from "@/hooks/use-notes"
import type { Note, CreateNoteRequest, UpdateNoteRequest } from "@/types/notes"
import { NotesSkeleton } from "./note-skeleton"
import { NoteListItem } from "./NoteListItem"
import { NoteCreateModal } from "./note-card-model"
import { NoteDeleteModal } from "./note-card-delete"

interface NotesListingProps {
  projectId: string
  userId: string
  walkies?: any[]
  departments?: any[]
  crewMembers?: any[]
}

export function NotesListing({
  projectId,
  userId,
  walkies = [],
  departments = [],
  crewMembers = [],
}: NotesListingProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  // Fetch notes
  const { notes, isLoading } = useNotes(projectId, userId, {
    search: searchTerm || undefined,
  })
//    console.log(notes , "notes");
  const createNote = useCreateNote(projectId, userId)
  const updateNote = useUpdateNote(projectId, userId, selectedNote?.id || "")
  const deleteNote = useDeleteNote(projectId, userId)
  const togglePin = useTogglePinNote(projectId, userId)

  const handleCreate = useCallback(
    async (data: CreateNoteRequest) => {
      await createNote.mutateAsync(data)
      setIsCreateOpen(false)
      setSelectedNote(null)
    },
    [createNote],
  )

  const handleUpdate = useCallback(
    async (data: UpdateNoteRequest) => {
      await updateNote.mutateAsync(data)
      setIsCreateOpen(false)
      setSelectedNote(null)
    },
    [updateNote],
  )

  const handleEdit = useCallback((note: Note) => {
    setSelectedNote(note)
    setIsCreateOpen(true)
  }, [])

  const handleDelete = useCallback(
    (noteId: string) => {
      const note = notes.find((n) => n.id === noteId)
      if (note) {
        setSelectedNote(note)
        setIsDeleteOpen(true)
      }
    },
    [notes],
  )

  const handleDeleteConfirm = useCallback(async () => {
    if (selectedNote) {
      await deleteNote.mutateAsync(selectedNote.id)
      setIsDeleteOpen(false)
      setSelectedNote(null)
    }
  }, [selectedNote, deleteNote])

  const handleTogglePin = useCallback(
    (noteId: string, isPinned: boolean) => {
      togglePin.mutate({ noteId, isPinned })
    },
    [togglePin],
  )

  const handleCreateModal = () => {
    setSelectedNote(null)
    setIsCreateOpen(true)
  }

  const pinnedNotes = notes.filter((n) => n.isPinned)
  const unpinnedNotes = notes.filter((n) => !n.isPinned)

  return (
    <div className="space-y-6">
      {/* Header with search and create button */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notes</h1>
            <p className="text-muted-foreground mt-1 text-sm">Manage and organize your project notes</p>
          </div>
          <Button onClick={handleCreateModal} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="h-4 w-4" />
            New Note
          </Button>
        </div>

        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
      </div>

      {/* Content area - list-based layout */}
      {isLoading ? (
        <NotesSkeleton />
      ) : notes.length === 0 ? (
        <div className="text-center py-12 border border-border rounded-lg bg-secondary/30">
          <p className="text-muted-foreground text-sm mb-4">No notes yet. Start by creating one!</p>
          <Button onClick={handleCreateModal} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Create Your First Note
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pinned notes section */}
          {pinnedNotes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <Pin className="h-4 w-4 text-primary fill-primary" />
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Pinned Notes</h2>
                <span className="text-xs bg-primary/20 text-primary rounded-full px-2 py-0.5">
                  {pinnedNotes.length}
                </span>
              </div>
              <div className="space-y-2 border-l-2 border-primary/30 pl-4">
                {pinnedNotes.map((note) => (
                  <NoteListItem
                    key={note.id}
                    note={note}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onTogglePin={handleTogglePin}
                    isPinning={togglePin.isPending}
                    isDeleting={deleteNote.isPending}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All notes section */}
          {unpinnedNotes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">All Notes</h2>
                <span className="text-xs bg-secondary text-muted-foreground rounded-full px-2 py-0.5">
                  {unpinnedNotes.length}
                </span>
              </div>
              <div className="space-y-2">
                {unpinnedNotes.map((note) => (
                  <NoteListItem
                    key={note.id}
                    note={note}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onTogglePin={handleTogglePin}
                    isPinning={togglePin.isPending}
                    isDeleting={deleteNote.isPending}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <NoteCreateModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        walkies={walkies}
        departments={departments}
        crewMembers={crewMembers}
        initialNote={selectedNote || undefined}
        onSubmit={selectedNote ? handleUpdate : handleCreate}
        isLoading={selectedNote ? updateNote.isPending : createNote.isPending}
      />

      <NoteDeleteModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        isLoading={deleteNote.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
