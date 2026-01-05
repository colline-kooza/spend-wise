/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";

import { checkSubscriptionLimit } from "@/auth-lib/subscription";
import db from "@/lib/prisma";
import type {
  CreateProjectRequest,
  ProjectListItem,
  UpdateProjectRequest,
} from "@/types/projects";

import { setActiveProjectCookie } from "./active-project";

// Response type for consistency
type ProjectActionResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

// Get projects owned by user
export async function getUserProjects(
  userId: string
): Promise<ProjectActionResponse<ProjectListItem[]>> {
  try {
    if (!userId) {
      console.error("❌ getUserProjects: No userId provided");
      return {
        success: false,
        error: "User ID is required",
        data: [],
      };
    }

    // console.log("🔍 Fetching user projects for:", userId);

    const userProjects = await db.project.findMany({
      where: {
        ownerId: userId,
        status: "active",
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        _count: {
          select: {
            collaborators: {
              where: { status: "active" },
            },
            walkieTalkies: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const projectsWithMetadata = userProjects.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      status: p.status,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      ownerId: p.ownerId,
      isOwner: true,
      userRole: "owner" as const,
      collaboratorCount: p._count.collaborators,
      walkieTalkieCount: p._count.walkieTalkies,
    }));

    // console.log("✅ User projects found:", projectsWithMetadata.length);

    return {
      success: true,
      data: projectsWithMetadata,
    };
  } catch (error) {
    console.error("❌ Error fetching user projects:", error);
    return {
      success: false,
      error: "Failed to fetch projects",
      data: [],
    };
  }
}

// Get projects where user is a collaborator
export async function getSharedProjects(
  userId: string
): Promise<ProjectActionResponse<ProjectListItem[]>> {
  try {
    if (!userId) {
      console.error("❌ getSharedProjects: No userId provided");
      return {
        success: false,
        error: "User ID is required",
        data: [],
      };
    }

    // console.log("🔍 Fetching shared projects for userId:", userId);

    // Query projects where user is an active collaborator
    const collaborations = await db.projectCollaborator.findMany({
      where: {
        userId: userId,
        status: "active",
      },
      include: {
        project: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
            _count: {
              select: {
                collaborators: {
                  where: { status: "active" },
                },
                walkieTalkies: true,
              },
            },
          },
        },
      },
      orderBy: {
        addedAt: "desc",
      },
    });

    // console.log("🔍 Collaborations found:", {
    //   total: collaborations.length,
    //   details: collaborations.map((c) => ({
    //     projectId: c.projectId,
    //     projectName: c.project.name,
    //     status: c.status,
    //     role: c.role,
    //     addedAt: c.addedAt,
    //   })),
    // });

    const sharedProjects = collaborations.map((collab) => ({
      id: collab.project.id,
      name: collab.project.name,
      description: collab.project.description,
      status: collab.project.status,
      createdAt: collab.project.createdAt,
      updatedAt: collab.project.updatedAt,
      ownerId: collab.project.ownerId,
      owner: collab.project.owner,
      isOwner: false,
      userRole: collab.role,
      collaboratorCount: collab.project._count.collaborators,
      walkieTalkieCount: collab.project._count.walkieTalkies,
    }));

    // console.log("✅ Active shared projects:", sharedProjects.length);

    return {
      success: true,
      data: sharedProjects,
    };
  } catch (error) {
    console.error("❌ Error fetching shared projects:", error);
    return {
      success: false,
      error: "Failed to fetch shared projects",
      data: [],
    };
  }
}

// Get all projects (owned + shared) - UPDATED
export async function getAllUserProjects(
  userId: string
): Promise<ProjectActionResponse<ProjectListItem[]>> {
  try {
    if (!userId) {
      return {
        success: false,
        error: "User ID is required",
        data: [],
      };
    }

    // console.log("🔍 Fetching all projects for user:", userId);

    // Get owned projects
    const ownedResult = await getUserProjects(userId);
    const ownedProjects = ownedResult.data || [];

    // Get shared projects
    const sharedResult = await getSharedProjects(userId);
    const sharedProjects = sharedResult.data || [];

    // Combine and sort by most recent
    const allProjects = [...ownedProjects, ...sharedProjects].sort((a, b) => {
      const aTime = new Date((a as any)?.createdAt ?? 0).getTime() || 0;
      const bTime = new Date((b as any)?.createdAt ?? 0).getTime() || 0;
      return bTime - aTime;
    });

    // console.log("✅ Total projects:", {
    //   owned: ownedProjects.length,
    //   shared: sharedProjects.length,
    //   total: allProjects.length,
    // });

    return {
      success: true,
      data: allProjects,
    };
  } catch (error) {
    console.error("❌ Error fetching all user projects:", error);
    return {
      success: false,
      error: "Failed to fetch projects",
      data: [],
    };
  }
}

// Get all projects with pagination and filters
export async function getProjects(
  userId: string,
  page = 1,
  limit = 10,
  filters?: {
    status?: string;
    search?: string;
    type?: "owned" | "shared" | "all";
  }
): Promise<ProjectActionResponse> {
  try {
    if (!userId) {
      return {
        success: false,
        error: "User ID is required",
        data: { projects: [], pagination: null },
      };
    }

    // console.log("🔍 Fetching projects:", { userId, page, limit, filters });

    // Build where clause based on type filter
    const where: any = {};

    if (filters?.type === "owned") {
      where.ownerId = userId;
    } else if (filters?.type === "shared") {
      where.collaborators = {
        some: {
          userId: userId,
          status: "active",
        },
      };
      where.ownerId = {
        not: userId,
      };
    } else {
      where.OR = [
        { ownerId: userId },
        {
          collaborators: {
            some: {
              userId: userId,
              status: "active",
            },
          },
        },
      ];
    }

    // Apply status filter
    if (filters?.status && filters.status !== "all") {
      where.status = filters.status;
    }

    // Apply search filter
    if (filters?.search) {
      const searchCondition = {
        OR: [
          {
            name: {
              contains: filters.search,
              mode: "insensitive" as const,
            },
          },
          {
            description: {
              contains: filters.search,
              mode: "insensitive" as const,
            },
          },
        ],
      };

      if (where.AND) {
        where.AND.push(searchCondition);
      } else {
        where.AND = [searchCondition];
      }
    }

    // console.log("🔍 Query where clause:", JSON.stringify(where, null, 2));

    // Get total count
    const total = await db.project.count({ where });

    // console.log("🔍 Total projects matching filters:", total);

    // Get paginated projects
    const projects = await db.project.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        collaborators: {
          where: {
            userId: userId,
          },
          select: {
            role: true,
            status: true,
          },
        },
        _count: {
          select: {
            collaborators: {
              where: { status: "active" },
            },
            walkieTalkies: true,
          },
        },
      },
    });

    // console.log("✅ Projects fetched:", projects.length);

    const totalPages = Math.ceil(total / limit);

    // Add metadata to each project
    const projectsWithMetadata = projects.map((project) => {
      const isOwner = project.ownerId === userId;
      const userCollaborator = project.collaborators.find(
        (c) => c.status === "active"
      );

      return {
        ...project,
        isOwner,
        userRole: isOwner ? "owner" : userCollaborator?.role || "viewer",
        collaboratorCount: project._count.collaborators,
        walkieTalkieCount: project._count.walkieTalkies,
      };
    });

    return {
      success: true,
      data: {
        projects: projectsWithMetadata,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    };
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return {
      success: false,
      error: "Failed to fetch projects",
      data: { projects: [], pagination: null },
    };
  }
}

export async function getSummaryProjects(userId: string) {
  try {
    if (!userId) {
      return [];
    }

    // Get paginated projects
    const projects = await db.project.findMany({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return [];
  }
}

// ...

export async function getProjectDetails(
  projectId: string,
  userId: string
): Promise<ProjectActionResponse> {
  try {
    if (!projectId || !userId) {
      return {
        success: false,
        error: "Project ID and User ID are required",
      };
    }

    // console.log("🔍 Fetching project details:", { projectId, userId });

    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        collaborators: {
          where: {
            status: "active",
          },
          select: {
            id: true,
            userId: true,
            role: true,
            status: true,
            addedAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        walkieTalkies: {
          select: {
            id: true,
            serialNumber: true,
            model: true,
            status: true,
            condition: true,
          },
        },
        _count: {
          select: {
            collaborators: {
              where: { status: "active" },
            },
            walkieTalkies: true,
          },
        },
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    // Check if user has access
    const isOwner = project.ownerId === userId;
    const collaborator = project.collaborators.find((c) => c.userId === userId);

    // console.log("🔍 Access check:", {
    //   isOwner,
    //   hasCollaborator: !!collaborator,
    //   collaboratorStatus: collaborator?.status,
    //   collaboratorRole: collaborator?.role,
    // });

    if (!isOwner && !collaborator) {
      return {
        success: false,
        error: "Unauthorized: You don't have access to this project",
      };
    }

    // console.log("✅ Project details fetched successfully");

    return {
      success: true,
      data: {
        ...project,
        isOwner,
        userRole: isOwner ? "owner" : collaborator?.role || "viewer",
        collaboratorCount: project._count.collaborators,
        walkieTalkieCount: project._count.walkieTalkies,
      },
    };
  } catch (error) {
    console.error("❌ Error fetching project details:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch project details",
    };
  }
}

export async function createProject(
  userId: string,
  orgId: string,
  data: CreateProjectRequest
): Promise<ProjectActionResponse> {
  try {
    if (!userId) {
      return {
        success: false,
        error: "User ID is required",
      };
    }

    if (!data.name || data.name.trim().length === 0) {
      return {
        success: false,
        error: "Project name is required",
      };
    }

    // console.log("🔨 Creating project:", {
    //   userId,
    //   orgId,
    //   projectName: data.name,
    // });

    // Check subscription limits
    const limitCheck = await checkSubscriptionLimit("projects", orgId);
    if (!limitCheck.allowed) {
      return {
        success: false,
        error: limitCheck.error || "Project limit reached",
      };
    }

    const newProject = await db.project.create({
      data: {
        name: data.name.trim(),
        description: data.description?.trim() || null,
        status: data.status || "active",
        ownerId: userId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    // console.log("✅ Project created successfully:", newProject.id);

    // Create default departments
    const defaultDepartments = [
      "Production",
      "AD",
      "Camera",
      "Lighting",
      "Rigging LX",
      "Grips",
      "Rigging Grips",
      "Sound",
      "SPFX",
      "Make-Up",
      "MUFX",
      "Hair",
      "Costumes",
      "Set-Dec",
      "Props",
      "Construction",
      "Paint",
      "Greens",
      "Playback",
      "Transport",
      "Picture Cars",
      "Locations",
      "FACS",
      "Stunts",
      "VFX",
      "Safety",
      "Animals",
      "Spare",
    ];

    await db.walkieDepartment.createMany({
      data: defaultDepartments.map((name) => ({
        name,
        projectId: newProject.id,
        color: "#3B82F6", // Default blue color
      })),
    });

    // Set as active project
    await setActiveProjectCookie({
      id: newProject.id,
      name: newProject.name,
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: {
        ...newProject,
        isOwner: true,
        userRole: "owner",
        collaboratorCount: 0,
        walkieTalkieCount: 0,
      },
      message: "Project created successfully",
    };
  } catch (error) {
    console.error("❌ Error creating project:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create project",
    };
  }
}

export async function updateProject(
  projectId: string,
  userId: string,
  data: UpdateProjectRequest
): Promise<ProjectActionResponse> {
  try {
    if (!projectId || !userId) {
      return {
        success: false,
        error: "Project ID and User ID are required",
      };
    }

    // console.log("🔍 Checking permissions for update:", { projectId, userId });

    // Verify project exists and user has edit access
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        collaborators: {
          where: {
            userId: userId,
            status: "active",
          },
        },
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    const isOwner = project.ownerId === userId;
    const collaborator = project.collaborators[0];
    const canEdit =
      isOwner ||
      collaborator?.role === "admin" ||
      collaborator?.role === "editor";

    // console.log("🔍 Permission check:", {
    //   isOwner,
    //   collaboratorRole: collaborator?.role,
    //   canEdit,
    // });

    if (!canEdit) {
      return {
        success: false,
        error: "You don't have permission to edit this project",
      };
    }

    // console.log("🔨 Updating project:", { projectId, ...data });

    const updateData: any = {};
    if (data.name !== undefined) {
      if (!data.name.trim()) {
        return {
          success: false,
          error: "Project name cannot be empty",
        };
      }
      updateData.name = data.name.trim();
    }
    if (data.description !== undefined) {
      updateData.description = data.description?.trim() || null;
    }
    if (data.status !== undefined) {
      updateData.status = data.status;
    }

    const updatedProject = await db.project.update({
      where: {
        id: projectId,
      },
      data: updateData,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    // console.log("✅ Project updated successfully:", projectId);

    return {
      success: true,
      data: {
        ...updatedProject,
        isOwner,
        userRole: isOwner ? "owner" : collaborator?.role || "viewer",
      },
      message: "Project updated successfully",
    };
  } catch (error) {
    console.error("❌ Error updating project:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update project",
    };
  }
}

export async function deleteProject(
  projectId: string,
  userId: string
): Promise<ProjectActionResponse> {
  try {
    if (!projectId || !userId) {
      return {
        success: false,
        error: "Project ID and User ID are required",
      };
    }

    // console.log("🔍 Checking permissions for delete:", { projectId, userId });

    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        collaborators: {
          where: {
            userId: userId,
            status: "active",
          },
        },
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    const isOwner = project.ownerId === userId;
    const collaborator = project.collaborators[0];
    const canDelete = isOwner || collaborator?.role === "admin";

    // console.log("🔍 Delete permission check:", {
    //   isOwner,
    //   collaboratorRole: collaborator?.role,
    //   canDelete,
    // });

    if (!canDelete) {
      return {
        success: false,
        error: "Only project owners and admins can delete projects",
      };
    }

    // console.log("🔨 Deleting project:", projectId);

    await db.project.delete({
      where: {
        id: projectId,
      },
    });

    // console.log("✅ Project deleted successfully:", projectId);

    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    console.error("❌ Error deleting project:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete project",
    };
  }
}

export async function checkProjectCreationEligibility(
  userId: string,
  orgId: string
): Promise<{ allowed: boolean; error?: string }> {
  try {
    const limitCheck = await checkSubscriptionLimit("projects", orgId);
    if (!limitCheck.allowed) {
      return {
        allowed: false,
        error: limitCheck.error || "Project limit reached",
      };
    }
    return { allowed: true };
  } catch (error) {
    console.error("Error checking eligibility:", error);
    return { allowed: false, error: "Failed to check eligibility" };
  }
}
