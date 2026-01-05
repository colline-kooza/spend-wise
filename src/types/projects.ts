// Project types and schemas
export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: "active" | "completed" | "archived";
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  isOwner?: boolean;
  userRole?: "owner" | "admin" | "editor" | "viewer";
}

export interface ProjectWithOwner extends Project {
  owner: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

export interface ProjectListItem {
  id: string;
  name: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  status?: "active" | "completed" | "archived";
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: "active" | "completed" | "archived";
}

export interface ProjectFilters {
  status?: string;
  search?: string;
  type?: "owned" | "shared" | "all";
}

export interface ProjectResponse {
  success: boolean;
  data?: Project;
  message?: string;
}

export interface ProjectListResponse {
  success: boolean;
  projects: ProjectListItem[];
  message?: string;
}
