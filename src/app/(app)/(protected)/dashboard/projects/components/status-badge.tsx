import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "active" | "completed" | "archived"
  variant?: "active" | "completed" | "archived"
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    },
    completed: {
      label: "Completed",
      className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    },
    archived: {
      label: "Archived",
      className: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200",
    },
  }

  const config = statusConfig[variant || status]

  return (
    <Badge variant="outline" className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  )
}
