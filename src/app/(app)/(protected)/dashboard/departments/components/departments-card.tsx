"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GripVertical, MoreVertical, Package, Edit, Trash2, Eye } from "lucide-react"
import type { Department } from "@/types/departments"

interface DepartmentCardProps {
  department: Department
  onEdit: (dept: Department) => void
  onDelete: (dept: Department) => void
  onViewWalkies: (dept: Department) => void
  isDragging?: boolean
  dragAttributes?: any
  dragListeners?: any
  setNodeRef?: any
  style?: any
}

export function DepartmentCard({
  department,
  onEdit,
  onDelete,
  onViewWalkies,
  isDragging,
  dragAttributes,
  dragListeners,
  setNodeRef,
  style,
}: DepartmentCardProps) {
  const walkieCount = department.walkieTalkies?.length || 0
  const colorValue = department.color || "#8B5CF6"

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`hover:shadow-lg transition-all duration-200 cursor-pointer border-border ${
        isDragging ? "z-50 opacity-50 shadow-xl" : ""
      }`}
    >
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header with Drag Handle */}
          <div className="flex items-start gap-3">
            <div
              {...dragAttributes}
              {...dragListeners}
              className="cursor-grab active:cursor-grabbing touch-none mt-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <GripVertical className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colorValue }} />
                <h3 className="text-lg font-semibold text-foreground truncate">{department.name}</h3>
              </div>
              {department.code && <p className="text-xs text-muted-foreground">Code: {department.code}</p>}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="hover:bg-secondary">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border-border">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewWalkies(department)
                  }}
                  className="cursor-pointer"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Walkies
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(department)
                  }}
                  className="cursor-pointer"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(department)
                  }}
                  className="text-destructive cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Description */}
          {department.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{department.description}</p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: colorValue + "20",
                color: colorValue,
              }}
            >
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{walkieCount}</p>
              <p className="text-xs text-muted-foreground">Walkie Talkies</p>
            </div>
          </div>

          {/* View Walkies Button */}
          <Button
            variant="outline"
            className="w-full border-border hover:bg-secondary bg-transparent"
            onClick={(e) => {
              e.stopPropagation()
              onViewWalkies(department)
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            View All Walkies
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
