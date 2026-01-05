"use client"

import { Pin, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import type { Note } from "@/types/notes"

interface NoteListItemProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (noteId: string) => void
  onTogglePin: (noteId: string, isPinned: boolean) => void
  isPinning?: boolean
  isDeleting?: boolean
}

export function NoteListItem({ note, onEdit, onDelete, onTogglePin, isPinning, isDeleting }: NoteListItemProps) {
  const preview = note.content.substring(0, 120)
  const truncated = note.content.length > 120

  return (
    <div className="group flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all">
      {/* Pin indicator and date */}
      <div className="flex flex-col items-center gap-2 pt-1">
        {note.isPinned && <Pin className="h-4 w-4 text-primary fill-primary" />}
        <span className="text-xs text-muted-foreground font-medium">{format(new Date(note.createdAt), "MMM dd")}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {note.title && (
              <h3 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
                {note.title}
              </h3>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {preview}
              {truncated && "..."}
            </p>
          </div>
        </div>

        {/* Related items - show inline */}
        {(note.crewMember || note.walkieTalkie || note.department) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {note.crewMember && (
              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                👤 {note.crewMember.firstName} {note.crewMember.lastName}
              </span>
            )}
            {note.walkieTalkie && (
              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                📡 {note.walkieTalkie.serialNumber}
              </span>
            )}
            {note.department && (
              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                🏢 {note.department.name}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Actions - visible on hover */}
      <div className="flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit(note)}
          disabled={isDeleting}
          className="h-8 w-8 p-0 hover:bg-secondary"
          title="Edit"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onTogglePin(note.id, !note.isPinned)}
          disabled={isPinning}
          className={`h-8 w-8 p-0 hover:bg-secondary ${note.isPinned ? "text-primary" : "text-muted-foreground"}`}
          title={note.isPinned ? "Unpin" : "Pin"}
        >
          <Pin className="h-4 w-4 fill-current" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(note.id)}
          disabled={isDeleting}
          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
