"use client"

import { Pin, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { format } from "date-fns"
import type { Note } from "@/types/notes"

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (noteId: string) => void
  onTogglePin: (noteId: string, isPinned: boolean) => void
  isPinning?: boolean
  isDeleting?: boolean
}

export function NoteCard({ note, onEdit, onDelete, onTogglePin, isPinning, isDeleting }: NoteCardProps) {
  const preview = note.content.substring(0, 100)
  const truncated = note.content.length > 100

  return (
    <Card className="group relative overflow-hidden bg-sidebar border-sidebar-border hover:border-sidebar-primary transition-colors">
      {/* Pin indicator */}
      {note.isPinned && <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />}

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {note.title && (
              <h3 className="font-semibold text-sidebar-foreground truncate text-sm group-hover:text-primary transition-colors">
                {note.title}
              </h3>
            )}
            <p className="text-xs text-sidebar-accent-foreground mt-1">
              {format(new Date(note.createdAt), "MMM dd, yyyy HH:mm")}
            </p>
          </div>
        </div>

        {/* Content preview */}
        <p className="text-sm text-sidebar-accent-foreground line-clamp-2">
          {preview}
          {truncated && "..."}
        </p>

        {/* Related items */}
        {(note.crewMember || note.walkieTalkie || note.department) && (
          <div className="text-xs space-y-1 pt-2 border-t border-sidebar-border">
            {note.crewMember && (
              <p className="text-primary">
                👤 {note.crewMember.firstName} {note.crewMember.lastName}
              </p>
            )}
            {note.walkieTalkie && <p className="text-primary">📡 {note.walkieTalkie.serialNumber}</p>}
            {note.department && <p className="text-primary">🏢 {note.department.name}</p>}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(note)}
            className="h-8 w-8 p-0 hover:bg-sidebar-accent"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onTogglePin(note.id, !note.isPinned)}
            disabled={isPinning}
            className={`h-8 w-8 p-0 hover:bg-sidebar-accent ${note.isPinned ? "text-primary bg-sidebar-accent" : ""}`}
          >
            <Pin className="h-3.5 w-3.5 fill-current" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(note.id)}
            disabled={isDeleting}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive ml-auto"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
