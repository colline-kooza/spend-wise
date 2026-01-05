"use client"

import { format } from "date-fns"
import { Calendar, User, Building2, Clock, CheckCircle2, History } from "lucide-react"

interface HistoryEvent {
  id: string
  changeType: string
  description: string
  createdAt: Date
  user: {
    name: string
    image: string | null
  }
}

interface HistoryTimelineProps {
  history: HistoryEvent[]
}

export function HistoryTimeline({ history }: HistoryTimelineProps) {
  // Group history by date
  const groupedHistory = history.reduce((acc, event) => {
    const date = format(new Date(event.createdAt), "EEE, MMM d, yyyy")
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {} as Record<string, HistoryEvent[]>)

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center bg-secondary/20 rounded-xl border border-dashed border-border">
        <History className="h-10 w-10 text-muted-foreground/50 mb-3" />
        <p className="text-sm text-muted-foreground">No history recorded yet</p>
      </div>
    )
  }

  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
      {Object.entries(groupedHistory).map(([date, events], groupIndex) => (
        <div key={date} className="relative">
          <div className="sticky top-0 z-10 mb-4 ml-12 flex items-center">
            <span className="bg-background px-2 text-xs font-medium uppercase text-muted-foreground border rounded-full shadow-sm">
              {date}
            </span>
          </div>

          <div className="space-y-6">
            {events.map((event, eventIndex) => {
              let Icon = Clock
              let colorClass = "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              let borderColor = "border-gray-200 dark:border-gray-800"

              if (event.changeType === "CREATE") {
                Icon = CheckCircle2
                colorClass = "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                borderColor = "border-green-200 dark:border-green-800"
              } else if (event.changeType.includes("CREW")) {
                Icon = User
                colorClass = "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                borderColor = "border-blue-200 dark:border-blue-800"
              } else if (event.changeType.includes("DEPARTMENT")) {
                Icon = Building2
                colorClass = "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                borderColor = "border-purple-200 dark:border-purple-800"
              } else if (event.changeType.includes("RETURN")) {
                Icon = Calendar
                colorClass = "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400"
                borderColor = "border-orange-200 dark:border-orange-800"
              }

              return (
                <div key={event.id} className="relative flex items-start group">
                  <div className={`absolute left-0 ml-5 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-background ring-1 ring-border ${colorClass.split(" ")[0]}`} />
                  
                  <div className="ml-12 w-full">
                    <div className={`relative flex flex-col gap-1 rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md ${borderColor}`}>
                      <div className="flex items-center gap-2 mb-1">
                          <div className={`p-1 rounded-md ${colorClass}`}>
                              <Icon className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs text-muted-foreground font-mono">
                            {format(new Date(event.createdAt), "HH:mm")}
                          </span>
                      </div>
                      
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        {event.description}
                      </p>

                      <div className="mt-2 flex items-center gap-2 pt-2 border-t border-border/50">
                        <div className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                            {event.user.image ? (
                                <img src={event.user.image} alt={event.user.name} className="h-full w-full object-cover" />
                            ) : (
                                <User className="h-3 w-3 text-muted-foreground" />
                            )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                            Updated by <span className="font-medium text-foreground">{event.user.name}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
