"use server";

import db from "@/lib/prisma";

export async function logActivity(
  projectId: string,
  userId: string,
  action: "CREATE" | "UPDATE" | "DELETE",
  entityType: "WALKIE" | "DEPARTMENT" | "CREW_MEMBER" | "NOTE",
  entityId: string,
  details: string
) {
  try {
    if (!projectId || !userId) return;

    // @ts-ignore: Stale Prisma Client
    await db.activityLog.create({
      data: {
        projectId,
        userId,
        action,
        entityType,
        entityId,
        details,
      },
    });
  } catch (error) {
    console.error("Failed to create activity log", error);
  }
}

export async function getActivityLogs(
    projectId: string,
    limit: number = 50
) {
     try {
        // @ts-ignore: Stale Prisma Client
        const logs = await db.activityLog.findMany({
            where: { projectId },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                        email: true
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            take: limit
        });
        
        return { success: true, data: logs };
     } catch (error) {
        console.error("Failed to fetch activity logs", error);
        return { success: false, error: "Failed to fetch logs" };
     }
}
