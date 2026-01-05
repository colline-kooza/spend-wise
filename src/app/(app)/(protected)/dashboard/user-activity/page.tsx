"use server"

import { Activity, Calendar, User } from "lucide-react"
import { format } from "date-fns"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAuthUser } from "@/lib/auth"
import { getActiveProjectCookie } from "@/lib/actions/active-project"
import { getActivityLogs } from "@/lib/actions/activity-log"

export default async function UserActivityPage() {
  const user = await getAuthUser()
  if (!user) return <div className="p-4">Unauthorized</div>

  const project = await getActiveProjectCookie()
  if (!project) return <div className="p-4">No active project</div>

  const { data: logs, error } = await getActivityLogs(project.id, 100) // Fetch last 100 logs

  if (error || !logs) {
    return <div className="p-4 text-red-500">Failed to load activity logs</div>
  }

  // Group logs by date
  const groupedLogs: Record<string, typeof logs> = {}
  logs.forEach((log) => {
    const dateKey = format(log.createdAt, "yyyy-MM-dd")
    if (!groupedLogs[dateKey]) {
      groupedLogs[dateKey] = []
    }
    groupedLogs[dateKey].push(log)
  })

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
    <div className="space-y-6 p-4 md:p-6 pb-20">
       <div className="flex items-center justify-between">
        <div>
           <h2 className="text-xl font-bold tracking-tight bg-gradient-to-br from-purple-700 via-purple-700 to-black bg-clip-text text-transparent">
              User Activity
           </h2>
           <p className="text-muted-foreground text-sm">Review full history of actions in this project</p>
        </div>
       </div>

      <div className="space-y-6">
        {Object.keys(groupedLogs).length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No activity recorded yet.
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedLogs)
            .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
            .map(([dateKey, dayLogs]) => (
              <div key={dateKey} className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-gray-50/50 p-2 rounded-md w-fit">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(dateKey), "MMMM d, yyyy")}
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {dayLogs.map((log) => (
                        <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-slate-50/50 transition-colors">
                            <Avatar className="h-9 w-9 mt-0.5">
                                <AvatarImage src={log.user.image || ""} />
                                <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                                    {log.user.name?.charAt(0) || <User className="h-4 w-4" />}
                                </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-semibold text-sm text-slate-900">
                                        {log.user.name || "Unknown User"}
                                    </span>
                                    <Badge variant="outline" className={`text-[10px] px-2 py-0.5 h-5 ${getActionColor(log.action)}`}>
                                        {log.action}
                                    </Badge>
                                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5 h-5">
                                        {log.entityType}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground ml-auto">
                                        {format(log.createdAt, "h:mm a")}
                                    </span>
                                </div>
                                
                                <p className="text-sm text-slate-600">
                                    {log.details}
                                </p>
                            </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
        )}
      </div>
    </div>
  )
}
