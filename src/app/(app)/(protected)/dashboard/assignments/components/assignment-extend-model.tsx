"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import type { WalkieAssignment, ExtendAssignmentRequest } from "@/types/walkie-assignment"

interface AssignmentExtendModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assignment: WalkieAssignment | null
  onSubmit: (data: ExtendAssignmentRequest) => Promise<void>
  isLoading?: boolean
}

export function AssignmentExtendModal({
  open,
  onOpenChange,
  assignment,
  onSubmit,
  isLoading = false,
}: AssignmentExtendModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<{ newReturnDate: Date; notes?: string }>({
    defaultValues: {
      newReturnDate: assignment?.returnDate ? new Date(assignment.returnDate) : undefined,
      notes: "",
    },
  })

  const handleSubmit = async (data: {
    newReturnDate: Date
    notes?: string
  }) => {
    if (!assignment) return
    setIsSubmitting(true)
    try {
      await onSubmit({
        assignmentId: assignment.id,
        newReturnDate: data.newReturnDate,
        notes: data.notes,
      })
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
          <DialogTitle className="text-xl font-semibold text-foreground">Extend Return Date</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Extend the return date for {assignment.walkieTalkie?.serialNumber}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-auto max-h-[calc(90vh-150px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pr-4">
              {/* Current Return Date Info */}
              <div className="bg-secondary/50 p-3 rounded-lg space-y-2">
                <p className="text-xs text-muted-foreground">Current Return Date</p>
                <p className="text-sm font-semibold text-foreground">
                  {assignment.returnDate ? format(new Date(assignment.returnDate), "PPP") : "Not set"}
                </p>
              </div>

              {/* New Return Date */}
              <FormField
                control={form.control}
                name="newReturnDate"
                rules={{ required: "Please select a new return date" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">New Return Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                        onChange={(e) => {
                          field.onChange(e.target.value ? new Date(e.target.value) : null)
                        }}
                        disabled={isSubmitting}
                        className="border-border focus:border-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              {/* Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Reason for Extension (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Why is the return date being extended?"
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
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Extending...
                    </>
                  ) : (
                    "Extend Return Date"
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
