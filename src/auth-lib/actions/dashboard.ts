"use server";

import db from "@/lib/prisma";
import type {
  WalkieTalkie,
  WalkieTalkieAssignment,
  Note,
  ActivityLog,
} from "@prisma/client";

export type DashboardStatsResponse = {
  success: boolean;
  data?: {
    projectName: string;
    totalWalkies: number;
    assignedWalkies: number;
    availableWalkies: number;
    maintenanceWalkies: number;
    chargingWalkies: number;
    issuesCount: number;
    utilizationRate: number;
    recentAssignments: (WalkieTalkieAssignment & {
      walkieTalkie: WalkieTalkie;
      assignedTo?: { name: string; email: string } | null;
      crewMember?: { firstName: string; lastName: string } | null;
    })[];
    departmentDistribution: {
      name: string;
      count: number;
      color: string;
    }[];
    statusDistribution: {
      name: string;
      value: number;
      color: string;
    }[];
    batteryHealth: {
      name: string;
      value: number;
      color: string;
    }[];
    usageTrend: {
      date: string;
      assigned: number;
      available: number;
    }[];
    recentNotes: (Note & { 
      author: { name: string };
      walkieTalkie?: { serialNumber: string } | null;
      crewMember?: { firstName: string; lastName: string } | null;
      department?: { name: string; color: string | null } | null;
    })[];
    recentActivityLogs: (ActivityLog & {
      user: { name: string | null; image: string | null; email: string | null };
    })[];
  };
  error?: string;
};

export async function getDashboardStats(
  projectId: string
): Promise<DashboardStatsResponse> {
  try {
    if (!projectId) {
      return {
        success: false,
        error: "Project ID is required",
      };
    }

    // Get project with all relations
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: {
        walkieTalkies: {
          include: {
            department: true,
            assignments: {
              where: {
                returnedAt: null,
              },
              include: {
                assignedTo: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
                crewMember: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
              orderBy: {
                checkoutDate: "desc",
              },
              take: 6,
            },
          },
        },
        departments: true,
        notes: {
          include: {
            author: {
              select: {
                name: true,
              },
            },
            crewMember: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            walkieTalkie: {
              select: {
                serialNumber: true,
              },
            },
            department: {
              select: {
                name: true,
                color: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
        // @ts-ignore: Stale Prisma Client
        activityLogs: {
           include: {
               user: {
                   select: {
                       name: true,
                       email: true,
                       image: true
                   }
               }
           },
           orderBy: {
               createdAt: "desc"
           },
           take: 5
        }
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    // Calculate stats
    const walkieTalkies = project.walkieTalkies;
    const totalWalkies = walkieTalkies.length;
    const assignedWalkies = walkieTalkies.filter(
      (w) => w.status === "assigned" || w.status === "active"
    ).length;
    const availableWalkies = walkieTalkies.filter(
      (w) => w.status === "available"
    ).length;
    const maintenanceWalkies = walkieTalkies.filter(
      (w) => w.status === "maintenance"
    ).length;
    const chargingWalkies = walkieTalkies.filter(
      (w) => w.status === "charging"
    ).length;
    const issuesCount = walkieTalkies.filter(
      (w) => w.condition === "broken" || w.condition === "lost"
    ).length;

    const utilizationRate =
      totalWalkies > 0 ? Math.round((assignedWalkies / totalWalkies) * 100) : 0;

    // Department distribution
    const departmentMap = new Map<
      string,
      { name: string; count: number; color: string }
    >();
    const colors = [
      "#F95E16",
      "#3B82F6",
      "#EC4899",
      "#8B5CF6",
      "#10B981",
      "#F59E0B",
    ];
    let colorIndex = 0;

    walkieTalkies.forEach((walkie) => {
      const deptName = walkie.department?.name || "Unassigned";
      if (!departmentMap.has(deptName)) {
        departmentMap.set(deptName, {
          name: deptName,
          count: 0,
          color: colors[colorIndex % colors.length],
        });
        colorIndex++;
      }
      const dept = departmentMap.get(deptName)!;
      dept.count++;
    });

    const departmentDistribution = Array.from(departmentMap.values());

    // Status distribution
    const statusDistribution = [
      {
        name: "Active",
        value: assignedWalkies,
        color: "#3B82F6",
      },
      {
        name: "Available",
        value: availableWalkies,
        color: "#10B981",
      },
      {
        name: "Charging",
        value: chargingWalkies,
        color: "#F59E0B",
      },
      {
        name: "Maintenance",
        value: maintenanceWalkies,
        color: "#EF4444",
      },
    ].filter((s) => s.value > 0);

    // Battery health (mock based on available walkies)
    const batteryHealth = [
      {
        name: "100%",
        value: Math.ceil(availableWalkies * 0.4),
        color: "#10B981",
      },
      {
        name: "75-99%",
        value: Math.ceil(availableWalkies * 0.3),
        color: "#84CC16",
      },
      {
        name: "50-74%",
        value: Math.ceil(availableWalkies * 0.2),
        color: "#F59E0B",
      },
      {
        name: "<50%",
        value: Math.ceil(availableWalkies * 0.1),
        color: "#EF4444",
      },
    ].filter((b) => b.value > 0);

    // Usage trend (last 7 days - calculated from actual data)
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0); // Start of 7 days ago

    // Fetch assignments relevant to the last 7 days
    const relevantAssignments = await db.walkieTalkieAssignment.findMany({
      where: {
        walkieTalkie: {
          projectId: projectId,
        },
        checkoutDate: {
          lte: today,
        },
        OR: [
          { returnedAt: null },
          { returnedAt: { gte: sevenDaysAgo } },
        ],
      },
      select: {
        checkoutDate: true,
        returnedAt: true,
      },
    });

    const usageTrend = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      // Set to end of day for comparison
      date.setHours(23, 59, 59, 999);

      const assignedCount = relevantAssignments.filter((a) => {
        const checkedOutBeforeEndOfDay = new Date(a.checkoutDate) <= date;
        const returnedAfterEndOfDay =
          !a.returnedAt || new Date(a.returnedAt) > date;
        return checkedOutBeforeEndOfDay && returnedAfterEndOfDay;
      }).length;

      // Ensure assigned count doesn't exceed total walkies (sanity check)
      const safeAssignedCount = Math.min(assignedCount, totalWalkies);
      const safeAvailableCount = Math.max(0, totalWalkies - safeAssignedCount - maintenanceWalkies); // roughly assuming maintenance is constant/current

      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        assigned: safeAssignedCount,
        available: safeAvailableCount,
      };
    });

    type DashboardData = NonNullable<DashboardStatsResponse["data"]>;

    const recentAssignments: DashboardData["recentAssignments"] = [];

    walkieTalkies.forEach((walkie) => {
      walkie.assignments.forEach((assignment) => {
        recentAssignments.push({
          ...assignment,
          walkieTalkie: walkie,
          assignedTo: assignment.assignedTo,
          crewMember: assignment.crewMember,
        });
      });
    });

    return {
      success: true,
      data: {
        projectName: project.name,
        totalWalkies,
        assignedWalkies,
        availableWalkies,
        maintenanceWalkies,
        chargingWalkies,
        issuesCount,
        utilizationRate,
        recentAssignments: recentAssignments.slice(0, 6),
        departmentDistribution,
        statusDistribution,
        batteryHealth,
        usageTrend,
        recentNotes: project.notes,
        // @ts-ignore: Stale Prisma Client
        recentActivityLogs: project.activityLogs || [],
      },
    };
  } catch (error) {
    console.error("❌ Error fetching dashboard stats:", error);
    return {
      success: false,
      error: "Failed to fetch dashboard stats",
    };
  }
}
