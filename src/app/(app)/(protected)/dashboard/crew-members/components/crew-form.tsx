"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { CreateCrewMemberRequest, CrewMember } from "@/types/crew-members"
import { SelectDepartment } from "../../walkies/components/select-department"
import { SelectWalkie } from "../../walkies/components/select-walkie"

interface CrewFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  crewMember?: CrewMember
  departments: any[]
  walkies: any[]
  onSubmit: (data: CreateCrewMemberRequest) => Promise<void>
  isLoading?: boolean
}

export function CrewForm({ open, onOpenChange, crewMember, departments, walkies, onSubmit, isLoading = false }: CrewFormProps) {
  const form = useForm<CreateCrewMemberRequest>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      departmentId: undefined,
      walkieId: undefined,
    },
  })

  useEffect(() => {
    if (crewMember) {
      const activeAssignment = crewMember.walkieTalkieAssignments?.find((a: any) => !a.returnDate)
      form.reset({
        firstName: crewMember.firstName,
        lastName: crewMember.lastName,
        email: crewMember.email || "",
        phone: crewMember.phone || "",
        role: crewMember.role || "",
        departmentId: crewMember.departmentId || undefined,
        walkieId: activeAssignment?.walkieTalkieId || undefined,
      })
    } else {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        departmentId: undefined,
        walkieId: undefined,
      })
    }
  }, [crewMember, open, form])

  const handleSubmit = async (data: CreateCrewMemberRequest) => {
    await onSubmit(data)
    if (!isLoading) {
      form.reset()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {crewMember ? "Edit Crew Member" : "Add Crew Member"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {crewMember
              ? "Update the crew member details below"
              : "Create a new crew member and assign to a department"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <div className="space-y-6">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              rules={{
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., John"
                      {...field}
                      disabled={isLoading}
                      className="border-border focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-destructive" />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              rules={{
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Doe"
                      {...field}
                      disabled={isLoading}
                      className="border-border focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-destructive" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">Email (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="e.g., john@example.com"
                      {...field}
                      disabled={isLoading}
                      className="border-border focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-destructive" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="e.g., +1 (555) 000-0000"
                      {...field}
                      disabled={isLoading}
                      className="border-border focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-destructive" />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">Role (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Sound Tech, Camera Operator"
                      {...field}
                      disabled={isLoading}
                      className="border-border focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-destructive" />
                </FormItem>
              )}
            />

            {/* Department */}
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <SelectDepartment
                    label="Assign to Department (Optional)"
                    departments={departments}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormItem>
              )}
            />

            {/* Walkie Assignment */}
            <FormField
              control={form.control}
              name="walkieId"
              render={({ field }) => (
                <FormItem>
                  <SelectWalkie
                    label="Assign Walkie (Optional)"
                    walkies={walkies}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                className="border-border text-foreground hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={form.handleSubmit(handleSubmit)}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    {crewMember ? "Updating..." : "Creating..."}
                  </>
                ) : crewMember ? (
                  "Update Member"
                ) : (
                  "Create Member"
                )}
              </Button>
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}