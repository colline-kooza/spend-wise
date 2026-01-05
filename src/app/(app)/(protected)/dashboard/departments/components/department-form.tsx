"use client"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import type { Department, CreateDepartmentRequest, UpdateDepartmentRequest } from "@/types/departments"

const DEPARTMENT_COLORS = [
  { name: "Purple", value: "#8B5CF6" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Pink", value: "#EC4899" },
  { name: "Indigo", value: "#4F46E5" },
]

interface DepartmentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  department?: Department
  onSubmit: any
  isLoading?: boolean
}

export function DepartmentForm({ open, onOpenChange, department, onSubmit, isLoading = false }: DepartmentFormProps) {
  const form = useForm<CreateDepartmentRequest>({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      color: "#8B5CF6",
    },
  })

  useEffect(() => {
    if (department) {
      form.reset({
        name: department.name,
        code: department.code || "",
        description: department.description || "",
        color: department.color || "#8B5CF6",
      })
    } else {
      form.reset({
        name: "",
        code: "",
        description: "",
        color: "#8B5CF6",
      })
    }
  }, [department, open, form])

  const handleSubmit = async (data: CreateDepartmentRequest) => {
    await onSubmit(data)
    if (!isLoading) {
      form.reset()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {department ? "Edit Department" : "Create New Department"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {department ? "Update the department details below" : "Add a new department to get started"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Department Name */}
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Department name is required",
                minLength: {
                  value: 2,
                  message: "Department name must be at least 2 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">Department Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Stunts, Camera, Makeup"
                      {...field}
                      disabled={isLoading}
                      className="border-border focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-destructive" />
                </FormItem>
              )}
            />

            {/* Department Code */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">Code (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., STU, CAM, MAK"
                      {...field}
                      disabled={isLoading}
                      className="border-border focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    Short code for quick identification
                  </FormDescription>
                  <FormMessage className="text-sm text-destructive" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe this department..."
                      {...field}
                      disabled={isLoading}
                      className="min-h-[100px] border-border focus:border-primary focus:ring-primary resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-destructive" />
                </FormItem>
              )}
            />

            {/* Color Picker */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">Color</FormLabel>
                  <div className="flex gap-2 flex-wrap">
                    {DEPARTMENT_COLORS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => field.onChange(color.value)}
                        className={`w-8 h-8 rounded-full transition-all border-2 ${
                          field.value === color.value
                            ? "border-foreground scale-110"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
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
                disabled={isLoading}
                className="border-border text-foreground hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    {department ? "Updating..." : "Creating..."}
                  </>
                ) : department ? (
                  "Update Department"
                ) : (
                  "Create Department"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
