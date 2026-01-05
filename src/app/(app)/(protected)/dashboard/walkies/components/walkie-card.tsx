"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge, Radio, Wifi, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import type { WalkieTalkie } from "@/types/walkie-talkie"
import { cn } from "@/lib/utils"

interface WalkieCardProps {
  walkie: any
  onEdit: (walkie: WalkieTalkie) => void
  onDelete: (walkie: WalkieTalkie) => void
  onView: (walkie: WalkieTalkie) => void
}

const statusConfig = {
  available: {
    bg: "bg-green-50 dark:bg-green-950",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    label: "Available",
  },
  assigned: {
    bg: "bg-blue-50 dark:bg-blue-950",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    label: "Assigned",
  },
  maintenance: {
    bg: "bg-yellow-50 dark:bg-yellow-950",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    label: "Maintenance",
  },
  inactive: {
    bg: "bg-gray-50 dark:bg-gray-950",
    badge: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    label: "Inactive",
  },
}

export function WalkieCard({ walkie, onEdit, onDelete, onView }: WalkieCardProps) {
  const config = statusConfig[(walkie?.status ?? "inactive") as keyof typeof statusConfig]

  return (
    <Card
      className={cn("overflow-hidden border-border transition-all hover:shadow-md hover:border-primary/50", config.bg)}
    >
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="h-4 w-4 text-primary flex-shrink-0" />
              <h3 className="font-semibold text-foreground truncate">{walkie.serialNumber}</h3>
            </div>
            <Badge className={config.badge}>{config.label}</Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-border">
              <DropdownMenuItem onClick={() => onView(walkie)} className="cursor-pointer">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
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

        {/* Department */}
        {walkie.department && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: walkie.department.color }} />
            <span className="text-sm font-medium text-foreground">{walkie.department.name}</span>
            {walkie.department.code && (
              <span className="text-xs text-muted-foreground">({walkie.department.code})</span>
            )}
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          {walkie.model && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Model</p>
              <p className="text-sm font-medium text-foreground">{walkie.model}</p>
            </div>
          )}
          {walkie.frequency && (
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Frequency</p>
              </div>
              <p className="text-sm font-medium text-foreground">{walkie.frequency}</p>
            </div>
          )}
        </div>

        {/* Condition */}
        {walkie.condition && (
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-muted-foreground mb-1">Condition</p>
            <p className="text-sm font-medium text-foreground">{walkie.condition}</p>
          </div>
        )}

        {/* Current Assignment */}
        {walkie.assignments && walkie.assignments.length > 0 && (
          <div className="pt-2 border-t border-border/30 bg-background/50 -mx-4 -mb-4 px-4 py-3 rounded-b">
            <p className="text-xs text-muted-foreground mb-1">Currently With</p>
            <p className="text-sm font-medium text-foreground">
              {walkie.assignments[0].assignedToName || walkie.assignments[0].assignedTo?.name || "Unknown"}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
