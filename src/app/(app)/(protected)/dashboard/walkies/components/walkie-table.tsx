"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge, Edit, Trash2, Eye, MoreVertical, Radio, ArrowUpDown, Calendar as CalendarIcon } from "lucide-react"
import type { WalkieTalkie } from "@/types/walkie-talkie"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useUpdateWalkieAssignment } from "@/hooks/use-walkies"

interface WalkieTableProps {
  walkies: any[]
  sortConfig?: { field: string; order: "asc" | "desc" }
  onSort?: (field: string) => void
  onEdit: (walkie: WalkieTalkie) => void
  onDelete: (walkie: WalkieTalkie) => void
  onView: (walkie: WalkieTalkie) => void
}

const statusConfig = {
  available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  assigned: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  broken: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  maintenance: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
}

function ReturnDateCell({ walkie, userId, projectId }: { walkie: any, userId: string, projectId: string }) {
    const assignment = walkie.assignments?.[0];
    const updateAssignment = useUpdateWalkieAssignment(projectId, userId);

    const [date, setDate] = useState<Date | undefined>(assignment?.expectedReturnDate ? new Date(assignment.expectedReturnDate) : undefined);
    const [open, setOpen] = useState(false);

    const handleSelect = async (newDate: Date | undefined) => {
        setDate(newDate);
        setOpen(false);
        if (assignment && newDate) {
            await updateAssignment.mutateAsync({
                assignmentId: assignment.id,
                data: { expectedReturnDate: newDate }
            });
        }
    };

    const isOverdue = date && new Date() > date;

    if (walkie.status !== 'assigned' || !assignment) return <span className="text-muted-foreground">-</span>;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className={cn("h-8 w-full justify-start text-left font-normal px-2", !date && "text-muted-foreground", date && !isOverdue && "text-foreground", isOverdue && "text-red-600 dark:text-red-400 font-semibold")}>
                    <CalendarIcon className={cn("mr-2 h-3 w-3", isOverdue ? "text-red-600 dark:text-red-400" : "text-muted-foreground")} />
                    {date ? format(date, "MMM d, yyyy") : "Run of Show"}
                    {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-border bg-popover" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                    className="p-3 pointer-events-auto bg-background"
                />
            </PopoverContent>
        </Popover>
    )
}

export function WalkieTable({ walkies, sortConfig, onSort, onEdit, onDelete, onView, userId, projectId }: WalkieTableProps & { userId: string, projectId: string }) {
  return (
    <Card className="border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-secondary border-b border-border">
            <TableRow>
              <TableHead className="text-foreground font-semibold">
                  <Button variant="ghost" size="sm" onClick={() => onSort?.("serialNumber")} className="-ml-3 h-8 data-[state=open]:bg-accent">
                    Serial Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                  <Button variant="ghost" size="sm" onClick={() => onSort?.("label")} className="-ml-3 h-8 data-[state=open]:bg-accent">
                    Label
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                  <Button variant="ghost" size="sm" onClick={() => onSort?.("innerLabel")} className="-ml-3 h-8 data-[state=open]:bg-accent">
                    Inner Label
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                  <Button variant="ghost" size="sm" onClick={() => onSort?.("department")} className="-ml-3 h-8 data-[state=open]:bg-accent">
                    Department
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                  <Button variant="ghost" size="sm" onClick={() => onSort?.("status")} className="-ml-3 h-8 data-[state=open]:bg-accent">
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold">Return Date</TableHead>
              <TableHead className="text-foreground font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {walkies.map((walkie) => (
              <TableRow key={walkie.id} className="hover:bg-secondary/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-primary" />
                    <p className="font-medium text-foreground">{walkie.serialNumber}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{walkie.label || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{walkie.innerLabel || "—"}</TableCell>
                <TableCell>
                  {walkie.department ? (
                    <div className="flex items-center gap-2">
                      {walkie.department.color && (
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: walkie.department.color }} />
                      )}
                      <span className="text-foreground">{walkie.department.name}</span>
                    </div>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={statusConfig[walkie.status as keyof typeof statusConfig]}>
                    {walkie.status.charAt(0).toUpperCase() + walkie.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                    <ReturnDateCell walkie={walkie} userId={userId} projectId={projectId} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(walkie)}
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
                        <DropdownMenuItem onClick={() => onEdit(walkie)} className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(walkie)} className="text-destructive cursor-pointer">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
