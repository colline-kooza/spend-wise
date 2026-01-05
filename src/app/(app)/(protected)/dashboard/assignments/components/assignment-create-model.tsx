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
import type { CreateWalkieAssignmentRequest } from "@/types/walkie-assignment"
import { SelectWalkieTalkie } from "./select-walkie-talkie"
import { SelectCrewMember } from "./select-crew-member"


interface AssignmentCreateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  walkies: any[]
  crewMembers: any[]
  onSubmit: (data: CreateWalkieAssignmentRequest) => Promise<void>
  isLoading?: boolean
}

export function AssignmentCreateModal({
  open,
  onOpenChange,
  walkies,
  crewMembers,
  onSubmit,
  isLoading = false,
}: AssignmentCreateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateWalkieAssignmentRequest>({
    defaultValues: {
      walkieTalkieId: "",
      crewMemberId: undefined,
      returnDate: undefined,
      notes: "",
    },
  })

  const handleSubmit = async (data: CreateWalkieAssignmentRequest) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      form.reset()
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">Create Assignment</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Assign a walkie-talkie to a crew member
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-auto max-h-[calc(90vh-150px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pr-4">
              {/* Walkie Talkie Selection */}
              <SelectWalkieTalkie
                label="Walkie Talkie"
                walkies={walkies}
                value={form.watch("walkieTalkieId")}
                onValueChange={(value) => form.setValue("walkieTalkieId", value || "")}
                placeholder="Search and select a walkie-talkie..."
                showAvailableOnly={true}
              />

              {/* Crew Member Selection */}
              <SelectCrewMember
                label="Assigned To"
                crewMembers={crewMembers}
                value={form.watch("crewMemberId")}
                onValueChange={(value) => form.setValue("crewMemberId", value)}
                placeholder="Search and select crew member..."
              />

              {/* Return Date */}
              <FormField
                control={form.control}
                name="returnDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">Expected Return Date</FormLabel>
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
                    <FormLabel className="text-sm font-medium text-foreground">Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any notes about this assignment..."
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
                      Creating...
                    </>
                  ) : (
                    "Create Assignment"
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
