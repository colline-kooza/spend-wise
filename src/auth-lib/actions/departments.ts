"use server";
import type {
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "@/types/departments";

import db from "@/lib/prisma";
import { logActivity } from "./activity-log";

export async function getDepartments(
  projectId: string,
  userId: string,
  page = 1,
  limit = 10,
  filters?: { search?: string }
) {
  try {
    // Verify user has access to project
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    // Build where clause
    const where: any = {
      projectId: projectId,
    };

    if (filters?.search) {
      where.OR = [
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
        {
          code: {
            contains: filters.search,
            mode: "insensitive" as const,
          },
        },
      ];
    }

    // Get total count
    const total = await db.walkieDepartment.count({ where });

    // Get paginated departments
    const departments = await db.walkieDepartment.findMany({
      where,
      include: {
        walkieTalkies: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      departments,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  } catch (error) {
    console.error("❌ Error fetching departments:", error);
    throw new Error("Failed to fetch departments");
  }
}

export async function getDepartmentDetails(
  departmentId: string,
  projectId: string,
  userId: string
) {
  try {
    // Verify user has access to project
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    const department = await db.walkieDepartment.findUnique({
      where: {
        id: departmentId,
      },
      include: {
        walkieTalkies: {
          include: {
            assignments: {
              include: {
                assignedTo: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!department || department.projectId !== projectId) {
      throw new Error("Department not found");
    }

    return {
      success: true,
      data: department,
    };
  } catch (error) {
    console.error("❌ Error fetching department details:", error);
    throw error;
  }
}

export async function createDepartment(
  projectId: string,
  userId: string,
  data: CreateDepartmentRequest
) {
  try {
    // Verify user has access to project
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    if (!data.name || data.name.trim().length === 0) {
      throw new Error("Department name is required");
    }

    console.log("🔨 Creating department:", {
      projectId,
      departmentName: data.name,
    });

    const newDepartment = await db.walkieDepartment.create({
      data: {
        name: data.name.trim(),
        code: data.code?.trim() || null,
        description: data.description?.trim() || null,
        color: data.color || null,
        projectId: projectId,
      },
    });



    await logActivity(
      projectId,
      userId,
      "CREATE",
      "DEPARTMENT",
      newDepartment.id,
      `Created department: ${newDepartment.name}`
    );

    console.log("✅ Department created successfully:", newDepartment.id);
    return {
      success: true,
      data: newDepartment,
      message: "Department created successfully",
    };
  } catch (error) {
    console.error("❌ Error creating department:", error);
    if (error instanceof Error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
    throw new Error("Failed to create department");
  }
}

export async function updateDepartment(
  departmentId: string,
  projectId: string,
  userId: string,
  data: UpdateDepartmentRequest
) {
  try {
    // Verify user has access to project
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    // Verify department exists and belongs to project
    const department = await db.walkieDepartment.findUnique({
      where: { id: departmentId },
    });

    if (!department || department.projectId !== projectId) {
      throw new Error("Department not found");
    }

    console.log("🔨 Updating department:", { departmentId, ...data });

    const updateData: any = {};
    if (data.name !== undefined) {
      updateData.name = data.name.trim();
    }
    if (data.code !== undefined) {
      updateData.code = data.code?.trim() || null;
    }
    if (data.description !== undefined) {
      updateData.description = data.description?.trim() || null;
    }
    if (data.color !== undefined) {
      updateData.color = data.color;
    }

    const updatedDepartment = await db.walkieDepartment.update({
      where: { id: departmentId },
      data: updateData,
      include: {
        walkieTalkies: true,
      },
    });

    await logActivity(
      projectId,
      userId,
      "UPDATE",
      "DEPARTMENT",
      departmentId,
      `Updated department: ${updatedDepartment.name}`
    );

    console.log("✅ Department updated successfully:", departmentId);
    return {
      success: true,
      data: updatedDepartment,
      message: "Department updated successfully",
    };
  } catch (error) {
    console.error("❌ Error updating department:", error);
    if (error instanceof Error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
    throw error;
  }
}

export async function deleteDepartment(
  departmentId: string,
  projectId: string,
  userId: string
) {
  try {
    // Verify user has access to project
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    // Verify department exists and belongs to project
    const department = await db.walkieDepartment.findUnique({
      where: { id: departmentId },
    });

    if (!department || department.projectId !== projectId) {
      throw new Error("Department not found");
    }

    console.log("🔨 Deleting department:", departmentId);

    // Delete department (cascade delete walkieTalkies through Prisma)
    await db.walkieDepartment.delete({
      where: { id: departmentId },
    });



    await logActivity(
      projectId,
      userId,
      "DELETE",
      "DEPARTMENT",
      departmentId,
      `Deleted department: ${department.name}`
    );

    console.log("✅ Department deleted successfully:", departmentId);
    return {
      success: true,
      message: "Department deleted successfully",
    };
  } catch (error) {
    console.error("❌ Error deleting department:", error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    throw error;
  }
}
