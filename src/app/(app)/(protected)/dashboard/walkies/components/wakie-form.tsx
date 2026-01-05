"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { SelectDepartment } from "./select-department";
import { SelectCrewMember, type CrewMember } from "./select-crew-member";
import type {
  WalkieTalkie,
  CreateWalkieTalkieRequest,
} from "@/types/walkie-talkie";

interface WalkieFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walkie?: WalkieTalkie;
  departments: any[];
  crewMembers: CrewMember[];
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

const statusOptions = [
  { value: "available", label: "Available" },
  { value: "assigned", label: "Assigned" },
  { value: "broken", label: "Broken" },
];

export function WalkieForm({
  open,
  onOpenChange,
  walkie,
  departments,
  crewMembers,
  onSubmit,
  isLoading = false,
}: WalkieFormProps) {
  const [assignToCrew, setAssignToCrew] = useState(false);

  const form = useForm<CreateWalkieTalkieRequest & { returnDate?: string }>({
    defaultValues: {
      serialNumber: "",
      label: "",
      innerLabel: "",
      status: "available",
      notes: "",
      departmentId: undefined,
      assignedToCrewId: undefined,
      expectedReturnDate: undefined,
      returnDate: undefined,
    },
  });

  const selectedDepartmentId = form.watch("departmentId");

  const filteredCrewMembers = useMemo(() => {
    if (!selectedDepartmentId) return crewMembers;
    return crewMembers.filter(
      (c) => !c.departmentId || c.departmentId === selectedDepartmentId
    );
  }, [crewMembers, selectedDepartmentId]);

  useEffect(() => {
    if (walkie) {
      // Get active assignment (no returnDate)
      const activeAssignment = walkie.assignments?.find((a) => !a.returnDate);
      const assignedCrewId =
        walkie.status === "assigned" && activeAssignment?.crewMemberId
          ? activeAssignment.crewMemberId
          : undefined;
      
      let noteContent = "";
      if (Array.isArray(walkie.notes) && walkie.notes.length > 0) {
        noteContent = (walkie.notes[0] as any).content || "";
      } else if (typeof walkie.notes === "string") {
        noteContent = walkie.notes;
      }

      form.reset({
        serialNumber: walkie.serialNumber,
        label: walkie.label || "",
        innerLabel: walkie.innerLabel || "",
        status: walkie.status as any, // Cast to any to handle old statuses
        notes: noteContent,
        departmentId: walkie.departmentId || undefined,
        assignedToCrewId: assignedCrewId,
        expectedReturnDate: activeAssignment?.expectedReturnDate
          ? new Date(activeAssignment.expectedReturnDate).toISOString()
          : undefined,
        returnDate: undefined, // Always start with no return date
      });

      setAssignToCrew(!!assignedCrewId);
    } else {
      form.reset({
        serialNumber: "",
        label: "",
        innerLabel: "",
        status: "available",
        notes: "",
        departmentId: undefined,
        assignedToCrewId: undefined,
        expectedReturnDate: undefined,
        returnDate: undefined,
      });
      setAssignToCrew(false);
    }
  }, [walkie, open, form]);

  const handleSubmit = async (
    data: CreateWalkieTalkieRequest & { returnDate?: string }
  ) => {
    // Sanitize data based on switch state
    if (!assignToCrew) {
      data.assignedToCrewId = undefined;
    }

    // If assigned to crew, ensure status is assigned
    if (data.assignedToCrewId && !data.returnDate) {
      data.status = "assigned";
    }

    // If return date is set, this will close the assignment
    if (data.returnDate) {
      console.log("Setting return date:", data.returnDate);
    }

    await onSubmit(data);
    if (!isLoading) {
      form.reset();
      setAssignToCrew(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {walkie ? "Edit Walkie Talkie" : "Create New Walkie Talkie"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {walkie
              ? "Update the walkie talkie details below"
              : "Add a new walkie talkie to your inventory"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Serial Number */}
            <FormField
              control={form.control}
              name="serialNumber"
              rules={{
                required: "Serial number is required",
                minLength: {
                  value: 2,
                  message: "Serial number must be at least 2 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Serial Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., WT-2024-001"
                      {...field}
                      disabled={isLoading}
                      className="border-border focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-destructive" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Label */}
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Label
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., A-01"
                        {...field}
                        disabled={isLoading}
                        className="border-border focus:border-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              {/* Inner Label */}
              <FormField
                control={form.control}
                name="innerLabel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Inner Label
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., #123"
                        {...field}
                        disabled={isLoading}
                        className="border-border focus:border-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            {/* Department */}
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <SelectDepartment
                    label="Assign to Department"
                    departments={departments}
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      if (val && form.getValues("status") === "available") {
                        form.setValue("status", "assigned");
                      }
                    }}
                    disabled={isLoading}
                  />
                </FormItem>
              )}
            />

            {/* Crew Assignment Switch */}
            <div className="flex items-center space-x-2 border p-3 rounded-md bg-muted/20">
              <Switch
                id="assign-crew"
                checked={assignToCrew}
                onCheckedChange={setAssignToCrew}
                disabled={!selectedDepartmentId && !walkie}
              />
              <Label
                htmlFor="assign-crew"
                className="cursor-pointer font-normal"
              >
                Assign to specific Crew Member
              </Label>
            </div>

            {/* Crew Member Select */}
            {assignToCrew && (
              <FormField
                control={form.control}
                name="assignedToCrewId"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-top-2">
                    <SelectCrewMember
                      label="Select Crew Member"
                      crewMembers={filteredCrewMembers}
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                      placeholder="Select a crew member..."
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Expected Return Date - Visible when Assigned */}
            {(!!selectedDepartmentId ||
              assignToCrew ||
              (walkie && walkie.status === "assigned")) && (
              <FormField
                control={form.control}
                name="expectedReturnDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-2">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Expected Return Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal border-border",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isLoading}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date ? date.toISOString() : undefined
                            )
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Return Date (Only when editing and assigned) */}
            {/* {walkie && walkie.status === "assigned" && (
              <div className="border border-border/50 bg-secondary/20 rounded-lg p-4 space-y-3 mt-4 animate-in fade-in">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <h4 className="text-sm font-medium">
                    Return Walkie
                  </h4>
                </div>
                <FormField
                  control={form.control}
                  name="returnDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-xs">
                        Actual Return Date (Closes Assignment)
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={isLoading}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick return date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(
                                date ? date.toISOString() : undefined
                              )
                            }
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-[10px] text-muted-foreground">
                        Setting a return date will close the current assignment and mark the walkie as Available.
                      </p>
                    </FormItem>
                  )}
                />
              </div>
            )} */}

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Status
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="border-border">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background border-border">
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    Notes (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes..."
                      {...field}
                      disabled={isLoading}
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
                    {walkie ? "Updating..." : "Creating..."}
                  </>
                ) : walkie ? (
                  "Update Walkie"
                ) : (
                  "Create Walkie"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
