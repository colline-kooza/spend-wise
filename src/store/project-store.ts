// store/project-store.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Project {
  id: string;
  name: string;
  status: "Active" | "Completed" | "On Hold";
  walkies: number;
  departments: number;
  crewMembers: number;
  description?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectState {
  currentProject: Project | null;
  projects: Project[];
  isLoading: boolean;
  setCurrentProject: (project: Project | null) => void;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
  clearCurrentProject: () => void;
  setLoading: (loading: boolean) => void;
}

// Mock initial projects - replace with API call
const initialProjects: Project[] = [
  {
    id: "1",
    name: "Wonder Woman Africa",
    status: "Active",
    walkies: 45,
    departments: 8,
    crewMembers: 67,
    description: "Action-adventure superhero film",
    startDate: "2024-01-15",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Black Panther: Wakanda Rising",
    status: "Active",
    walkies: 38,
    departments: 7,
    crewMembers: 54,
    description: "Marvel superhero sequel",
    startDate: "2024-02-01",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z",
  },
  {
    id: "3",
    name: "The Last Guardian",
    status: "Active",
    walkies: 29,
    departments: 6,
    crewMembers: 42,
    description: "Fantasy adventure film",
    startDate: "2024-03-01",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "4",
    name: "Mission: Impossible 8",
    status: "Completed",
    walkies: 0,
    departments: 0,
    crewMembers: 0,
    description: "Action thriller",
    startDate: "2023-06-01",
    endDate: "2023-12-15",
    createdAt: "2023-05-01T10:00:00Z",
    updatedAt: "2023-12-15T10:00:00Z",
  },
];

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      currentProject: initialProjects[0], // Set first project as default
      projects: initialProjects,
      isLoading: false,

      setCurrentProject: (project) => {
        set({ currentProject: project });
        // Here you would also call your API to update the session on the server
        // fetch('/api/session/project', { method: 'POST', body: JSON.stringify({ projectId: project?.id }) });
      },

      setProjects: (projects) => set({ projects }),

      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),

      updateProject: (id, updatedProject) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? {
                  ...project,
                  ...updatedProject,
                  updatedAt: new Date().toISOString(),
                }
              : project
          ),
          // Update current project if it's the one being updated
          currentProject:
            state.currentProject?.id === id
              ? {
                  ...state.currentProject,
                  ...updatedProject,
                  updatedAt: new Date().toISOString(),
                }
              : state.currentProject,
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          // Clear current project if it's the one being deleted
          currentProject:
            state.currentProject?.id === id ? null : state.currentProject,
        })),

      getProjectById: (id) => {
        return get().projects.find((project) => project.id === id);
      },

      clearCurrentProject: () => set({ currentProject: null }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "walkiecheck-project-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist currentProject and projects
      partialize: (state) => ({
        currentProject: state.currentProject,
        projects: state.projects,
      }),
    }
  )
);
