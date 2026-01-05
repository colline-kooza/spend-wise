"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Clock, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ActivityLog {
  id: string
  action: string
  entityType: string
  details: string | null
  createdAt: Date
  user: {
    name: string | null
    image: string | null
    email: string | null
  }
}

interface RecentActivityProps {
  logs: ActivityLog[]
}

export function RecentActivitySection({ logs }: RecentActivityProps) {
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return "just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "CREATE":
        return "bg-green-100 text-green-700 border-green-200"
      case "UPDATE":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "DELETE":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Recent Activity
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Latest system actions</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          ) : (
            logs.map((log, idx) => (
              <div
                key={log.id}
                className={`flex items-start gap-3 pb-4 ${idx !== logs.length - 1 ? "border-b" : ""}`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={log.user.image || ""} />
                  <AvatarFallback className="text-xs">
                    {log.user.name?.charAt(0) || <User className="h-3 w-3" />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-sm max-w-[150px] truncate" title={log.user.name || "Unknown"}>
                        {log.user.name || "Unknown User"}
                    </span>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getActionColor(log.action)}`}>
                      {log.action}
                    </Badge>
                     <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {log.entityType}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {log.details || "No details provided"}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(log.createdAt)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
