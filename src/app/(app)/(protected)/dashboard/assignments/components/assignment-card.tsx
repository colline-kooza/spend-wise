"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Radio, MoreVertical, Trash2, Eye, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { format, isPast } from "date-fns"
import { cn } from "@/lib/utils"
import type { WalkieAssignment } from "@/types/walkie-assignment"

interface AssignmentCardProps {
  assignment: WalkieAssignment
  onView: (assignment: WalkieAssignment) => void
  onExtend: (assignment: WalkieAssignment) => void
  onReturn: (assignment: WalkieAssignment) => void
  onCancel: (assignment: WalkieAssignment) => void
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
    return { label: "Overdue", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300", icon: AlertCircle }
  }
  return { label: "Active", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300", icon: Clock }
}

export function AssignmentCard({ assignment, onView, onExtend, onReturn, onCancel }: AssignmentCardProps) {
  const status = getAssignmentStatus(assignment)
  const StatusIcon = status.icon

  const assignedName =
    assignment.crewMember?.firstName && assignment.crewMember?.lastName
      ? `${assignment.crewMember.firstName} ${assignment.crewMember.lastName}`
      : assignment.assignedToName || assignment.assignedTo?.name || "Unknown"

  return (
    <Card className="overflow-hidden border-border hover:shadow-md transition-all">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="h-4 w-4 text-primary flex-shrink-0" />
              <h3 className="font-semibold text-foreground truncate">
                {assignment.walkieTalkie?.serialNumber || "Unknown"}
              </h3>
            </div>
            <Badge className={status.color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {status.label}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-border">
              <DropdownMenuItem onClick={() => onView(assignment)} className="cursor-pointer">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {!assignment.returnedAt && (
                <>
                  <DropdownMenuItem onClick={() => onExtend(assignment)} className="cursor-pointer">
                    <Clock className="h-4 w-4 mr-2" />
                    Extend Return Date
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onReturn(assignment)} className="cursor-pointer">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Returned
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem onClick={() => onCancel(assignment)} className="text-destructive cursor-pointer">
                <Trash2 className="h-4 w-4 mr-2" />
                Cancel Assignment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Assigned To */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Assigned To</p>
          <p className="text-sm font-medium text-foreground">{assignedName}</p>
        </div>

        {/* Department */}
        {assignment.crewMember?.department && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: assignment.crewMember.department.color }} />
            <span className="text-xs text-muted-foreground">{assignment.crewMember.department.name}</span>
          </div>
        )}

        {/* Dates Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Checkout Date</p>
            <p className="text-sm font-medium text-foreground">
              {format(new Date(assignment.checkoutDate), "MMM dd, yyyy")}
            </p>
          </div>
          {assignment.returnDate && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Return Date</p>
              <p
                className={cn("text-sm font-medium", {
                  "text-destructive": isPast(new Date(assignment.returnDate)) && !assignment.returnedAt,
                  "text-foreground": !isPast(new Date(assignment.returnDate)) || assignment.returnedAt,
                })}
              >
                {format(new Date(assignment.returnDate), "MMM dd, yyyy")}
              </p>
            </div>
          )}
        </div>

        {/* Walkie Details */}
        {assignment.walkieTalkie?.model && (
          <div className="pt-2 border-t border-border/30 space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Model</p>
                <p className="font-medium text-foreground">{assignment.walkieTalkie.model}</p>
              </div>
              {assignment.walkieTalkie.frequency && (
                <div>
                  <p className="text-muted-foreground">Frequency</p>
                  <p className="font-medium text-foreground">{assignment.walkieTalkie.frequency}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
