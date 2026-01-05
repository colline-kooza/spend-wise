"use server";

import db from "@/lib/prisma";
import type {
  CreateWalkieAssignmentRequest,
  ExtendAssignmentRequest,
  ReturnAssignmentRequest,
} from "@/types/walkie-assignment";

export async function createWalkieAssignment(
  projectId: string,
  userId: string,
  data: CreateWalkieAssignmentRequest
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

    // Verify walkie-talkie exists and belongs to project
    const walkie = await db.walkieTalkie.findUnique({
      where: { id: data.walkieTalkieId },
    });

    if (!walkie || walkie.projectId !== projectId) {
      throw new Error("Walkie-talkie not found");
    }

    // Create assignment
    const assignment = await db.walkieTalkieAssignment.create({
      data: {
        walkieTalkieId: data.walkieTalkieId,
        crewMemberId: data.crewMemberId || null,
        assignedToId: data.assignedToId || null,
        assignedToName: data.assignedToName || null,
        returnDate: data.returnDate || null,
        notes: data.notes || null,
        checkoutDate: new Date(),
      },
      include: {
        walkieTalkie: {
          include: {
            project: true,
            department: true,
          },
        },
        crewMember: {
          include: {
            department: true,
          },
        },
        assignedTo: true,
      },
    });

    // Update walkie-talkie status to assigned
    await db.walkieTalkie.update({
      where: { id: data.walkieTalkieId },
      data: { status: "assigned" },
    });

    console.log("✅ Assignment created:", assignment.id);
    return {
      success: true,
      data: assignment,
      message: "Assignment created successfully",
    };
  } catch (error) {
    console.error("❌ Error creating assignment:", error);
    if (error instanceof Error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
    throw new Error("Failed to create assignment");
  }
}

export async function getAssignments(
  projectId: string,
  userId: string,
  page = 1,
  limit = 10,
  filters?: any
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
      walkieTalkie: {
        projectId: projectId,
      },
    };

    // Apply filters
    if (filters?.search) {
      where.OR = [
        {
          walkieTalkie: {
            serialNumber: {
              contains: filters.search,
              mode: "insensitive" as const,
            },
          },
        },
        {
          crewMember: {
            firstName: {
              contains: filters.search,
              mode: "insensitive" as const,
            },
          },
        },
        {
          crewMember: {
            lastName: {
              contains: filters.search,
              mode: "insensitive" as const,
            },
          },
        },
        {
          assignedToName: {
            contains: filters.search,
            mode: "insensitive" as const,
          },
        },
      ];
    }

    if (filters?.crewMemberId) {
      where.crewMemberId = filters.crewMemberId;
    }

    if (filters?.walkieTalkieId) {
      where.walkieTalkieId = filters.walkieTalkieId;
    }

    if (filters?.status) {
      if (filters.status === "active") {
        where.returnDate = { gte: new Date() };
      } else if (filters.status === "returned") {
        where.returnedAt = { not: null };
      } else if (filters.status === "overdue") {
        where.AND = [{ returnDate: { lt: new Date() } }, { returnedAt: null }];
      }
    }

    // Get total count
    const total = await db.walkieTalkieAssignment.count({ where });

    // Get paginated assignments
    const assignments = await db.walkieTalkieAssignment.findMany({
      where,
      include: {
        walkieTalkie: {
          include: {
            project: true,
            department: true,
          },
        },
        crewMember: {
          include: {
            department: true,
          },
        },
        assignedTo: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        checkoutDate: "desc",
      },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        assignments,
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
    console.error("❌ Error fetching assignments:", error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
    throw new Error("Failed to fetch assignments");
  }
}

export async function getAssignmentDetails(
  assignmentId: string,
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

    const assignment = await db.walkieTalkieAssignment.findUnique({
      where: { id: assignmentId },
      include: {
        walkieTalkie: {
          include: {
            project: true,
            department: true,
          },
        },
        crewMember: {
          include: {
            department: true,
          },
        },
        assignedTo: true,
      },
    });

    if (!assignment || assignment.walkieTalkie.projectId !== projectId) {
      throw new Error("Assignment not found");
    }

    return {
      success: true,
      data: assignment,
    };
  } catch (error) {
    console.error("❌ Error fetching assignment details:", error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
    throw error;
  }
}

export async function extendAssignmentReturnDate(
  projectId: string,
  userId: string,
  data: ExtendAssignmentRequest
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

    const assignment = await db.walkieTalkieAssignment.findUnique({
      where: { id: data.assignmentId },
      include: {
        walkieTalkie: true,
      },
    });

    if (!assignment || assignment.walkieTalkie.projectId !== projectId) {
      throw new Error("Assignment not found");
    }

    const updated = await db.walkieTalkieAssignment.update({
      where: { id: data.assignmentId },
      data: {
        returnDate: data.newReturnDate,
        notes: data.notes || assignment.notes,
      },
      include: {
        walkieTalkie: {
          include: {
            project: true,
            department: true,
          },
        },
        crewMember: {
          include: {
            department: true,
          },
        },
        assignedTo: true,
      },
    });

    console.log("✅ Assignment extended:", data.assignmentId);
    return {
      success: true,
      data: updated,
      message: "Return date extended successfully",
    };
  } catch (error) {
    console.error("❌ Error extending assignment:", error);
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

export async function returnWalkieTalkie(
  projectId: string,
  userId: string,
  data: ReturnAssignmentRequest
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

    const assignment = await db.walkieTalkieAssignment.findUnique({
      where: { id: data.assignmentId },
      include: {
        walkieTalkie: true,
      },
    });

    if (!assignment || assignment.walkieTalkie.projectId !== projectId) {
      throw new Error("Assignment not found");
    }

    const updated = await db.walkieTalkieAssignment.update({
      where: { id: data.assignmentId },
      data: {
        returnedAt: new Date(),
        notes: data.notes || assignment.notes,
      },
      include: {
        walkieTalkie: {
          include: {
            project: true,
            department: true,
          },
        },
        crewMember: {
          include: {
            department: true,
          },
        },
        assignedTo: true,
      },
    });

    // Update walkie-talkie status to available
    await db.walkieTalkie.update({
      where: { id: assignment.walkieTalkieId },
      data: { status: "available" },
    });

    console.log("✅ Assignment returned:", data.assignmentId);
    return {
      success: true,
      data: updated,
      message: "Walkie-talkie returned successfully",
    };
  } catch (error) {
    console.error("❌ Error returning walkie-talkie:", error);
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

export async function cancelAssignment(
  projectId: string,
  userId: string,
  assignmentId: string,
  notes?: string
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

    const assignment = await db.walkieTalkieAssignment.findUnique({
      where: { id: assignmentId },
      include: {
        walkieTalkie: true,
      },
    });

    if (!assignment || assignment.walkieTalkie.projectId !== projectId) {
      throw new Error("Assignment not found");
    }

    // Delete the assignment
    await db.walkieTalkieAssignment.delete({
      where: { id: assignmentId },
    });

    // Update walkie-talkie status to available if no other active assignments
    const activeAssignments = await db.walkieTalkieAssignment.count({
      where: {
        walkieTalkieId: assignment.walkieTalkieId,
        returnedAt: null,
      },
    });

    if (activeAssignments === 0) {
      await db.walkieTalkie.update({
        where: { id: assignment.walkieTalkieId },
        data: { status: "available" },
      });
    }

    console.log("✅ Assignment cancelled:", assignmentId);
    return {
      success: true,
      message: "Assignment cancelled successfully",
    };
  } catch (error) {
    console.error("❌ Error cancelling assignment:", error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    throw error;
  }
}

export async function getActiveWalkieTalkies(
  projectId: string,
  userId: string
) {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    const walkies = await db.walkieTalkie.findMany({
      where: {
        projectId: projectId,
        status: "available",
      },
      include: {
        department: true,
      },
      orderBy: {
        serialNumber: "asc",
      },
    });

    return {
      success: true,
      data: walkies,
    };
  } catch (error) {
    console.error("❌ Error fetching active walkies:", error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
    throw error;
  }
}
export async function getAllProjectWalkiesIncludingInactive(
  projectId: string,
  userId: string
) {
  try {
    const project = await db.project.findFirst({
      where: {
        id: projectId,
        OR: [
          { ownerId: userId },
          {
            collaborators: {
              some: {
                userId: userId,
                status: "active",
              },
            },
          },
        ],
      },
    });

    if (!project) {
      throw new Error("Unauthorized or project not found");
    }

    const walkies = await db.walkieTalkie.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        department: true,
      },
      orderBy: {
        serialNumber: "asc",
      },
    });

    return {
      success: true,
      data: walkies,
    };
  } catch (error) {
    console.error("❌ Error fetching all project walkies:", error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
    throw error;
  }
}
// You need a function to fetch crew members
export async function getCrewMembers(projectId: string, userId: string) {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    const crewMembers = await db.crewMember.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        department: true,
      },
      orderBy: {
        firstName: "asc",
      },
    });

    return {
      success: true,
      data: crewMembers,
    };
  } catch (error) {
    console.error("❌ Error fetching crew members:", error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
    throw error;
  }
}
