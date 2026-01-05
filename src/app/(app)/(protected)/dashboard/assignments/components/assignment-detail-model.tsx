"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format, isPast } from "date-fns"
import { cn } from "@/lib/utils"
import { CheckCircle2, AlertCircle, Clock, Radio, Wifi, User, Calendar, FileText } from "lucide-react"
import type { WalkieAssignment } from "@/types/walkie-assignment"

interface AssignmentDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assignment: WalkieAssignment | null
  onExtend: (assignment: WalkieAssignment) => void
  onReturn: (assignment: WalkieAssignment) => void
}

function getAssignmentStatus(assignment: WalkieAssignment) {
  if (assignment.returnedAt) {
    return {
      label: "Returned",
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      icon: CheckCircle2,
    }
  }
  if (assignment.returnDate && isPast(new Date(assignment.returnDate))) {
    return {
      label: "Overdue",
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      icon: AlertCircle,
    }
  }
  return {
    label: "Active",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    icon: Clock,
  }
}

export function AssignmentDetailsModal({
  open,
  onOpenChange,
  assignment,
  onExtend,
  onReturn,
}: AssignmentDetailsModalProps) {
  if (!assignment) return null

  const status = getAssignmentStatus(assignment)
  const StatusIcon = status.icon

  const assignedName =
    assignment.crewMember?.firstName && assignment.crewMember?.lastName
      ? `${assignment.crewMember.firstName} ${assignment.crewMember.lastName}`
      : assignment.assignedToName || assignment.assignedTo?.name || "Unknown"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background border-border max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">Assignment Details</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Complete information about this assignment
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-auto max-h-[calc(90vh-150px)]">
          <div className="space-y-6 pr-4">
            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <Badge className={status.color}>
                <StatusIcon className="h-4 w-4 mr-1" />
                {status.label}
              </Badge>
            </div>

            {/* Walkie-Talkie Information */}
            <div className="space-y-3 border-t border-border pt-4">
              <h3 className="font-semibold text-foreground text-sm">Walkie-Talkie</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Radio className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Serial Number</p>
                    <p className="font-medium text-foreground">{assignment.walkieTalkie?.serialNumber}</p>
                  </div>
                </div>
                {assignment.walkieTalkie?.model && (
                  <div className="flex items-start gap-2">
                    <div className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Model</p>
                      <p className="font-medium text-foreground">{assignment.walkieTalkie.model}</p>
                    </div>
                  </div>
                )}
                {assignment.walkieTalkie?.frequency && (
                  <div className="flex items-start gap-2">
                    <Wifi className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Frequency</p>
                      <p className="font-medium text-foreground">{assignment.walkieTalkie.frequency}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Assignment Information */}
            <div className="space-y-3 border-t border-border pt-4">
              <h3 className="font-semibold text-foreground text-sm">Assignment</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    <p className="font-medium text-foreground">{assignedName}</p>
                  </div>
                </div>
                {assignment.crewMember?.department && (
                  <div className="flex items-start gap-2 ml-6">
                    <div
                      className="h-2 w-2 rounded-full mt-1 flex-shrink-0"
                      style={{
                        backgroundColor: assignment.crewMember.department.color,
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Department</p>
                      <p className="font-medium text-foreground">{assignment.crewMember.department.name}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dates Information */}
            <div className="space-y-3 border-t border-border pt-4">
              <h3 className="font-semibold text-foreground text-sm">Dates</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Checkout Date</p>
                    <p className="font-medium text-foreground">
                      {format(new Date(assignment.checkoutDate), "PPP HH:mm")}
                    </p>
                  </div>
                </div>
                {assignment.returnDate && (
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Return Date</p>
                      <p
                        className={cn("font-medium", {
                          "text-destructive": isPast(new Date(assignment.returnDate)) && !assignment.returnedAt,
                          "text-foreground": true,
                        })}
                      >
                        {format(new Date(assignment.returnDate), "PPP")}
                      </p>
                    </div>
                  </div>
                )}
                {assignment.returnedAt && (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Returned At</p>
                      <p className="font-medium text-foreground">
                        {format(new Date(assignment.returnedAt), "PPP HH:mm")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {assignment.notes && (
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Notes</p>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{assignment.notes}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            {!assignment.returnedAt && (
              <div className="flex gap-2 border-t border-border pt-4">
                <Button
                  onClick={() => onExtend(assignment)}
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-secondary"
                >
                  Extend Return Date
                </Button>
                <Button
                  onClick={() => onReturn(assignment)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Mark as Returned
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
