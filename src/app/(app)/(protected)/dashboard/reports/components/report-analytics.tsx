"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Radio, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface ReportAnalyticsProps {
  data: any[];
}

export function ReportAnalytics({ data }: ReportAnalyticsProps) {
  const total = data.length;
  const assigned = data.filter((i) => i.status === "assigned").length;
  const available = data.filter((i) => i.status === "available").length;
  const broken = data.filter((i) => i.status === "broken" || i.status === "maintenance").length;
  
  // Calculate overdue
  const overdue = data.filter((i) => {
      const activeAssignment = i.assignments?.[0];
      return activeAssignment && activeAssignment.expectedReturnDate && new Date() > new Date(activeAssignment.expectedReturnDate);
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Walkies</CardTitle>
          <Radio className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">in current view</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Assigned</CardTitle>
          <Activity className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{assigned}</div>
          <p className="text-xs text-muted-foreground">Currently in use</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Broken / Maintenance</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{broken}</div>
          <p className="text-xs text-muted-foreground">Needs attention</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue Returns</CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overdue}</div>
          <p className="text-xs text-muted-foreground">Past expected return</p>
        </CardContent>
      </Card>
    </div>
  );
}
