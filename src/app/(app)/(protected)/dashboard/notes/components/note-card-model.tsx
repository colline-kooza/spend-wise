"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { useForm } from "react-hook-form"
import type { Note, CreateNoteRequest, UpdateNoteRequest } from "@/types/notes"
import { SelectWalkie } from "./select-wakie"
import { SelectCrewMember } from "./select-member"
import { SelectDepartment } from "../../walkies/components/select-department"

interface NoteCreateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  walkies?: any[]
  departments?: any[]
  crewMembers?: any[]
  initialNote?: Note
  isLoading?: boolean
  onSubmit:any
}

export function NoteCreateModal({
  open,
  onOpenChange,
  walkies = [],
  departments = [],
  crewMembers = [],
  initialNote,
  isLoading,
  onSubmit,
}: NoteCreateModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<CreateNoteRequest>({
    defaultValues: {
      title: initialNote?.title || "",
      content: initialNote?.content || "",
      walkieTalkieId: initialNote?.walkieTalkieId || undefined,
      departmentId: initialNote?.departmentId || undefined,
      crewMemberId: initialNote?.crewMemberId || undefined,
    },
  })

  const selectedDepartmentId = form.watch("departmentId")

  const filteredWalkies = React.useMemo(() => {
    if (!selectedDepartmentId || selectedDepartmentId === "none") return walkies
    return walkies.filter((w: any) => w.departmentId === selectedDepartmentId)
  }, [walkies, selectedDepartmentId])

  const filteredCrewMembers = React.useMemo(() => {
    if (!selectedDepartmentId || selectedDepartmentId === "none") return crewMembers
    return crewMembers.filter((c: any) => c.departmentId === selectedDepartmentId)
  }, [crewMembers, selectedDepartmentId])

  React.useEffect(() => {
    if (initialNote) {
      form.reset({
        title: initialNote.title || "",
        content: initialNote.content,
        walkieTalkieId: initialNote.walkieTalkieId || undefined,
        departmentId: initialNote.departmentId || undefined,
        crewMemberId: initialNote.crewMemberId || undefined,
      })
    } else {
      form.reset({
        title: "",
        content: "",
        walkieTalkieId: undefined,
        departmentId: undefined,
        crewMemberId: undefined,
      })
    }
  }, [initialNote, open, form])

  const handleSubmit = async (data: CreateNoteRequest) => {
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
          <DialogTitle className="text-xl font-semibold text-foreground">
            {initialNote ? "Edit Note" : "Create Note"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {initialNote ? "Update your note details" : "Add a new note to your project"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-auto max-h-[calc(90vh-150px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pr-4">
              {/* Title field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">Title (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Give your note a title..."
                        {...field}
                        disabled={isSubmitting}
                        className="border-border focus:border-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content field */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">Content *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your note..."
                        {...field}
                        disabled={isSubmitting}
                        className="min-h-[120px] border-border focus:border-primary focus:ring-primary resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Associations section */}
              <div className="space-y-4 border-t border-border pt-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Link to Project Items (Optional)
                </p>

                <FormField
                  control={form.control}
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Department</FormLabel>
                      <FormControl>
                        <SelectDepartment
                          label="Select Department"
                          departments={departments}
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isSubmitting}
                          placeholder="Select a department..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="walkieTalkieId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Walkie-Talkie</FormLabel>
                      <FormControl>
                        <SelectWalkie
                        label="Select Walkie-Talkie"
                          walkies={filteredWalkies}
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isSubmitting}
                          placeholder="Select a walkie-talkie..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="crewMemberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Crew Member</FormLabel>
                      <FormControl>
                        <SelectCrewMember
                        label="Select Crew Member"
                          crewMembers={filteredCrewMembers}
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isSubmitting}
                          placeholder="Select a crew member..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
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
                  disabled={isSubmitting || !form.watch("content").trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      {initialNote ? "Updating..." : "Creating..."}
                    </>
                  ) : initialNote ? (
                    "Update Note"
                  ) : (
                    "Create Note"
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