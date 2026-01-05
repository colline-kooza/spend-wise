import { toast } from "sonner";

import {
  clearActiveProjectCookie,
  setActiveProjectCookie,
} from "@/auth-lib/actions/active-project";
import { useActiveProjectStore } from "@/store/use-active-project";

interface ActiveProject {
  id: string;
  name: string;
}

export function useActiveProject() {
  const { activeProject, setActiveProject, clearActiveProject } =
    useActiveProjectStore();

  const setActive = async (project: ActiveProject) => {
    try {
      // Set in Zustand store (client)
      setActiveProject(project);

      // Set in cookies (server)
      const result = await setActiveProjectCookie(project);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success(`Switched to ${project.name}`);
    } catch (error) {
      console.error("Failed to set active project:", error);
      toast.error("Failed to switch project");
      // Rollback on error
      clearActiveProject();
    }
  };

  const clearActive = async () => {
    try {
      // Clear from Zustand store
      clearActiveProject();

      // Clear from cookies
      await clearActiveProjectCookie();

      toast.info("Project cleared");
    } catch (error) {
      console.error("Failed to clear active project:", error);
    }
  };

  return {
    activeProject,
    setActiveProject: setActive,
    clearActiveProject: clearActive,
  };
}
