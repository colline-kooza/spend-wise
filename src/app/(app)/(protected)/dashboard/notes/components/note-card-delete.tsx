"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AlertCircle, Loader2 } from "lucide-react"

interface NoteDeleteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isLoading?: boolean
  onConfirm: () => void
}

export function NoteDeleteModal({ open, onOpenChange, isLoading, onConfirm }: NoteDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-background border-border">
        <DialogHeader>
          <div className="flex gap-2 items-start">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
            <div className="space-y-1">
              <DialogTitle className="text-foreground">Delete Note</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                This action cannot be undone. Your note will be permanently deleted.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex gap-2 justify-end pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="border-border hover:bg-secondary"
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading} variant="destructive" className="gap-2">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
