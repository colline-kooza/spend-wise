"use server";

import { cookies } from "next/headers";

const ACTIVE_PROJECT_COOKIE = "active-project";

interface ActiveProject {
  id: string;
  name: string;
}

export async function setActiveProjectCookie(project: ActiveProject) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(ACTIVE_PROJECT_COOKIE, JSON.stringify(project), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Error setting active project cookie:", error);
    return { success: false, error: "Failed to set active project" };
  }
}

export async function getActiveProjectCookie(): Promise<ActiveProject | null> {
  try {
    const cookieStore = await cookies();
    const projectCookie = cookieStore.get(ACTIVE_PROJECT_COOKIE);

    if (!projectCookie?.value) {
      return null;
    }

    return JSON.parse(projectCookie.value);
  } catch (error) {
    console.error("❌ Error getting active project cookie:", error);
    return null;
  }
}

export async function clearActiveProjectCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ACTIVE_PROJECT_COOKIE);

    return { success: true };
  } catch (error) {
    console.error("❌ Error clearing active project cookie:", error);
    return { success: false, error: "Failed to clear active project" };
  }
}
