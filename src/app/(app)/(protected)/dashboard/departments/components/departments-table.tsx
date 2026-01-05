"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, Eye, MoreVertical, Package, ArrowUpDown } from "lucide-react"
import type { Department } from "@/types/departments"
import { useState, useMemo } from "react"

interface DepartmentsTableProps {
  departments: Department[]
  onEdit: (dept: Department) => void
  onDelete: (dept: Department) => void
  onViewWalkies: (dept: Department) => void
}

export function DepartmentsTable({ departments, onEdit, onDelete, onViewWalkies }: DepartmentsTableProps) {
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

  const sortedDepartments = useMemo(() => {
    if (!sortConfig) return departments

    const sorted = [...departments].sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortConfig.field) {
        case "name":
          aValue = a.name?.toLowerCase() || ""
          bValue = b.name?.toLowerCase() || ""
          break
        case "code":
          aValue = a.code?.toLowerCase() || ""
          bValue = b.code?.toLowerCase() || ""
          break
        case "description":
          aValue = a.description?.toLowerCase() || ""
          bValue = b.description?.toLowerCase() || ""
          break
        case "walkies":
          aValue = a.walkieTalkies?.length || 0
          bValue = b.walkieTalkies?.length || 0
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
  }, [departments, sortConfig])

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
                  Department
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("code")} 
                  className="-ml-3 h-8 data-[state=open]:bg-accent"
                >
                  Code
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("description")} 
                  className="-ml-3 h-8 data-[state=open]:bg-accent"
                >
                  Description
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort("walkies")} 
                  className="-mr-3 h-8 data-[state=open]:bg-accent"
                >
                  Walkies
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-foreground font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {sortedDepartments.map((dept) => (
              <TableRow key={dept.id} className="hover:bg-secondary/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color || "#8B5CF6" }} />
                    <div>
                      <p className="font-medium text-foreground">{dept.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{dept.code || "—"}</TableCell>
                <TableCell className="text-muted-foreground max-w-xs truncate">{dept.description || "—"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{dept.walkieTalkies?.length || 0}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewWalkies(dept)}
                      className="hover:bg-secondary"
                      title="View Walkies"
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
                        <DropdownMenuItem onClick={() => onEdit(dept)} className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(dept)} className="text-destructive cursor-pointer">
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