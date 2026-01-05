"use server";

import { setActiveProjectCookie } from "@/lib/actions/active-project";
import { getAuthUser } from "@/lib/auth";
import db from "@/lib/prisma";

export async function checkUserProject() {
  const user = await getAuthUser();
  try {
    const existing = await db.project.findFirst({
      where: {
        ownerId: user?.id,
      },
    });
    if (!existing) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
