"use client";

import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { setActiveProjectCookie } from "@/auth-lib/actions/active-project";
import { Button } from "@/components/ui/button";
import { useDashboardStats } from "@/hooks/use-dashboard";

import { RecentActivitySection } from "./activity-section";
import { DepartmentChart, StatusPieChart, UsageTrendChart } from "./charts";
import { KPICards } from "./kpi-cards";
import { NotesSection } from "./notes-section";
import { DashboardGridSkeleton } from "./skeleton-loaders";

interface DashboardContentProps {
  projectId: string;
  userId: string;
  userName: string;
  shouldSyncCookie?: boolean;
  projectToSync?: { id: string; name: string };
}

export function DashboardContent({
  projectId,
  userId,
  userName,
  shouldSyncCookie,
  projectToSync,
}: DashboardContentProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { stats, isLoading, error, refetch } = useDashboardStats(projectId);

  // Sync cookie if needed (fallback happened on server)
  useEffect(() => {
    if (shouldSyncCookie && projectToSync) {
      setActiveProjectCookie(projectToSync).catch((err) =>
        console.error("Failed to sync active project cookie", err)
      );
    }
  }, [shouldSyncCookie, projectToSync]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  if (isLoading) {
    return <DashboardGridSkeleton />;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <Button onClick={handleRefresh}>Retry</Button>
      </div>
    );
  }

  if (!stats) {
    return <div className="p-4 text-center">No data available</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header with Refresh */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="bg-gradient-to-br from-purple-700 via-purple-700 to-black bg-clip-text text-xl font-bold tracking-tight text-transparent">
              {stats.projectName}
            </h2>
            <p className="text-sm text-muted-foreground">
              Welcome back, {userName}
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {/* KPI Cards */}
        <KPICards
          totalWalkies={stats.totalWalkies}
          assignedWalkies={stats.assignedWalkies}
          availableWalkies={stats.availableWalkies}
          issuesCount={stats.issuesCount}
          utilizationRate={stats.utilizationRate}
        />

        {/* Row 1: Notes & Recent Activity */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NotesSection
            notes={stats.recentNotes}
            onRefresh={handleRefresh}
            userId={userId}
            projectId={projectId}
          />
          <RecentActivitySection logs={stats.recentActivityLogs || []} />
        </div>

        {/* Row 2: Charts */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <UsageTrendChart data={stats.usageTrend} />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <DepartmentChart data={stats.departmentDistribution} />
          </div>
        </div>

        {/* Row 3: Pie Chart */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatusPieChart data={stats.statusDistribution} />
        </div>
      </div>
    </div>
  );
}
