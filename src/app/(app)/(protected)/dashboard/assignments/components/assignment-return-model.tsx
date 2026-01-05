"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { WalkieAssignment } from "@/types/walkie-assignment"

interface AssignmentReturnModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assignment: WalkieAssignment | null
  onSubmit: (assignmentId: string, notes?: string) => Promise<void>
  isLoading?: boolean
}

export function AssignmentReturnModal({
  open,
  onOpenChange,
  assignment,
  onSubmit,
  isLoading = false,
}: AssignmentReturnModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<{ notes?: string }>({
    defaultValues: { notes: "" },
  })

  const handleSubmit = async (data: { notes?: string }) => {
    if (!assignment) return
    setIsSubmitting(true)
    try {
      await onSubmit(assignment.id, data.notes)
      onOpenChange(false)
      form.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!assignment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">Mark as Returned</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Confirm the return of {assignment.walkieTalkie?.serialNumber}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-auto max-h-[calc(90vh-150px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pr-4">
              {/* Assignment Info */}
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Walkie-Talkie</p>
                  <p className="font-semibold text-foreground">{assignment.walkieTalkie?.serialNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Assigned To</p>
                  <p className="font-semibold text-foreground">
                    {assignment.crewMember?.firstName} {assignment.crewMember?.lastName}
                  </p>
                </div>
              </div>

              {/* Return Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">Return Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any notes about the return (e.g., condition, issues)..."
                        {...field}
                        disabled={isSubmitting}
                        className="min-h-[100px] border-border focus:border-primary focus:ring-primary resize-none"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                  className="border-border text-foreground hover:bg-secondary"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white">
                  {isSubmitting ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Marking...
                    </>
                  ) : (
                    "Confirm Return"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
