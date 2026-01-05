"use client"

import { Package, Radio, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface KPICardsProps {
  totalWalkies: number
  assignedWalkies: number
  availableWalkies: number
  issuesCount: number
  utilizationRate: number
}

export function KPICards({
  totalWalkies,
  assignedWalkies,
  availableWalkies,
  issuesCount,
  utilizationRate,
}: KPICardsProps) {
  return (
    <div className="grid gap-4 md:gap-4 lg:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Walkies</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalWalkies}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="text-green-600">All devices</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Assigned</CardTitle>
          <Radio className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{assignedWalkies}</div>
          <p className="text-xs text-muted-foreground mt-1">{utilizationRate}% utilization</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{availableWalkies}</div>
          <p className="text-xs text-muted-foreground mt-1">Ready to assign</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Issues</CardTitle>
          <AlertCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{issuesCount}</div>
          <p className="text-xs text-muted-foreground mt-1">{issuesCount > 0 ? "Requires attention" : "All good"}</p>
        </CardContent>
      </Card>
    </div>
  )
}
