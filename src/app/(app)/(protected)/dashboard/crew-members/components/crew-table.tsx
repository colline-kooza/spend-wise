"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, Eye, MoreVertical, ArrowUpDown } from "lucide-react"
import { CrewMember } from "@/types/crew-members"

interface CrewTableProps {
  crewMembers: CrewMember[]
  onEdit: (member: CrewMember) => void
  onDelete: (member: CrewMember) => void
  onView: (member: CrewMember) => void
}

export function CrewTable({ crewMembers, onEdit, onDelete, onView }: CrewTableProps) {
  const [sortConfig, setSortConfig] = useState<{ field: string; order: "asc" | "desc" } | null>(null)

  const handleSort = (field: string) => {
    setSortConfig((current) => {
      if (current?.field === field) {
        // Toggle order or reset
        if (current.order === "asc") {
          return { field, order: "desc" }
        } else {
          return null // Reset sorting
        }
      }
      return { field, order: "asc" }
    })
  }

  const sortedCrewMembers = useMemo(() => {
    if (!sortConfig) return crewMembers

    const sorted = [...crewMembers].sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortConfig.field) {
        case "name":
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase()
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase()
          break
        case "email":
          aValue = a.email?.toLowerCase() || ""
          bValue = b.email?.toLowerCase() || ""
          break
        case "phone":
          aValue = a.phone?.toLowerCase() || ""
          bValue = b.phone?.toLowerCase() || ""
          break
        case "department":
          aValue = a.department?.name?.toLowerCase() || ""
          bValue = b.department?.name?.toLowerCase() || ""
          break
        case "role":
          aValue = a.role?.toLowerCase() || ""
          bValue = b.role?.toLowerCase() || ""
          break
        case "equipment":
          aValue = a.walkieTalkieAssignments?.length || 0
          bValue = b.walkieTalkieAssignments?.length || 0
          break
        default:
          return 0
      }

      if (aValue < bValue) {
        return sortConfig.order === "asc" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.order === "asc" ? 1 : -1
      }
      return 0
    })

    return sorted
  }, [crewMembers, sortConfig])

  return (
    <Card className="border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-secondary border-b border-border">
            <TableRow>
              <TableHead className="text-foreground font-semibold">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("name")} 
                  className="-ml-3 h-8 data-[state=open]:bg-accent"
                >
                  Crew Member
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("email")} 
                  className="-ml-3 h-8 data-[state=open]:bg-accent"
                >
                  Contact
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("department")} 
                  className="-ml-3 h-8 data-[state=open]:bg-accent"
                >
                  Department
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("role")} 
                  className="-ml-3 h-8 data-[state=open]:bg-accent"
                >
                  Role
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("equipment")} 
                  className="-ml-3 h-8 data-[state=open]:bg-accent"
                >
                  Equipment
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {sortedCrewMembers.map((member) => (
              <TableRow key={member.id} className="hover:bg-secondary/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {member.firstName} {member.lastName}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {member.email && (
                      <p className="truncate" title={member.email}>
                        {member.email}
                      </p>
                    )}
                    {member.phone && (
                      <p className="truncate" title={member.phone}>
                        {member.phone}
                      </p>
                    )}
                    {!member.email && !member.phone && <p>—</p>}
                  </div>
                </TableCell>
                <TableCell>
                  {member.department ? (
                    <div className="flex items-center gap-2">
                      {member.department.color && (
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: member.department.color }} />
                      )}
                      <span className="text-foreground">{member.department.name}</span>
                    </div>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{member.role || "—"}</TableCell>
                <TableCell>
                  {member.walkieTalkieAssignments && member.walkieTalkieAssignments.length > 0 ? (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {member.walkieTalkieAssignments.length} walkie
                      {member.walkieTalkieAssignments.length !== 1 ? "s" : ""}
                    </Badge>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(member)}
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
                        <DropdownMenuItem onClick={() => onEdit(member)} className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(member)} className="text-destructive cursor-pointer">
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