import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ActiveProject {
  id: string;
  name: string;
}

interface ActiveProjectState {
  activeProject: ActiveProject | null;
  setActiveProject: (project: ActiveProject | null) => void;
  clearActiveProject: () => void;
}

export const useActiveProjectStore = create<ActiveProjectState>()(
  persist(
    (set) => ({
      activeProject: null,
      setActiveProject: (project) => set({ activeProject: project }),
      clearActiveProject: () => set({ activeProject: null }),
    }),
    {
      name: "active-project-storage",
    }
  )
);
