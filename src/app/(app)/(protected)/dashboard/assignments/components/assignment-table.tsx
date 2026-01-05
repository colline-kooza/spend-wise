"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge, Trash2, Eye, MoreVertical, Radio, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { format, isPast } from "date-fns"
import { cn } from "@/lib/utils"
import type { WalkieAssignment } from "@/types/walkie-assignment"

interface AssignmentTableProps {
  assignments: WalkieAssignment[]
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

export function AssignmentTable({ assignments, onView, onExtend, onReturn, onCancel }: AssignmentTableProps) {
  return (
    <Card className="border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-secondary border-b border-border">
            <TableRow>
              <TableHead className="text-foreground font-semibold">Walkie Talkie</TableHead>
              <TableHead className="text-foreground font-semibold">Assigned To</TableHead>
              <TableHead className="text-foreground font-semibold">Department</TableHead>
              <TableHead className="text-foreground font-semibold">Assigned Date</TableHead>
              <TableHead className="text-foreground font-semibold">Return Date</TableHead>
              <TableHead className="text-foreground font-semibold">Status</TableHead>
              <TableHead className="text-foreground font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {assignments.map((assignment) => {
              const status = getAssignmentStatus(assignment)
              const StatusIcon = status.icon
              const assignedName =
                assignment.crewMember?.firstName && assignment.crewMember?.lastName
                  ? `${assignment.crewMember.firstName} ${assignment.crewMember.lastName}`
                  : assignment.assignedToName || assignment.assignedTo?.name || "Unknown"

              return (
                <TableRow key={assignment.id} className="hover:bg-secondary/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Radio className="h-4 w-4 text-primary" />
                      <p className="font-medium text-foreground">{assignment.walkieTalkie?.serialNumber}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{assignedName}</TableCell>
                  <TableCell>
                    {assignment.crewMember?.department ? (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: assignment.crewMember.department.color,
                          }}
                        />
                        <span className="text-foreground">{assignment.crewMember.department.name}</span>
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(assignment.checkoutDate), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell
                    className={cn("font-medium", {
                      "text-destructive":
                        assignment.returnDate && isPast(new Date(assignment.returnDate)) && !assignment.returnedAt,
                    })}
                  >
                    {assignment.returnDate ? format(new Date(assignment.returnDate), "MMM dd, yyyy") : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge className={status.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(assignment)}
                        className="hover:bg-secondary"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="hover:bg-secondary">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border-border">
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
                          <DropdownMenuItem
                            onClick={() => onCancel(assignment)}
                            className="text-destructive cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
