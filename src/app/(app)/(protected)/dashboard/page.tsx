import { redirect } from "next/navigation";

import { getActiveProjectCookie } from "@/auth-lib/actions/active-project";
import { getSummaryProjects } from "@/auth-lib/actions/projects";
import { getAuthUser } from "@/auth-lib/auth"; // import auth helper
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata = {
  title: "Dashboard | Walkie Checkie",
  description: "Project dashboard with walkie-talkie management and analytics",
};

export default async function DashboardPage() {
  const user = await getAuthUser();
  // console.log(user);
  if (!user) {
    redirect("/login");
  }

  const projects = await getSummaryProjects(user.id);
  const cookieProject = await getActiveProjectCookie();

  let activeProject = cookieProject;
  let shouldSync = false;

  // If no active project in cookie, but user has projects, use the most recent one
  if ((!activeProject || !activeProject.id) && projects.length > 0) {
    activeProject = { id: projects[0].id, name: projects[0].name };
    shouldSync = true;
  }

  // If still no project, user genuinely has no projects -> redirect
  if (!activeProject || !activeProject.id) {
    redirect("/check");
  }

  return (
    <DashboardContent
      projectId={activeProject.id}
      userId={user.id}
      userName={user.name || "User"}
      shouldSyncCookie={shouldSync}
      projectToSync={shouldSync ? activeProject : undefined}
    />
  );
}
