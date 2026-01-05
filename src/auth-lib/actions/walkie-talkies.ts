"use server";

import type {
  CreateWalkieTalkieRequest,
  UpdateWalkieTalkieRequest,
} from "@/types/walkie-talkie";
import db from "@/lib/prisma";
import { logActivity } from "./activity-log";
import { format } from "date-fns";
import { checkSubscriptionLimit } from "@/lib/subscription";
import { getActiveOrgId } from "@/lib/auth";


export async function getWalkieTalkies(
  projectId: string,
  userId: string,
  page = 1,
  limit = 12,
  filters?: { search?: string; status?: string; departmentId?: string },
  sort?: { field: string; order: "asc" | "desc" }
) {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    const where: any = {
      projectId: projectId,
    };

    if (filters?.search) {
      where.OR = [
        {
          serialNumber: {
            contains: filters.search,
            mode: "insensitive" as const,
          },
        },
        { label: { contains: filters.search, mode: "insensitive" as const } },
        {
          innerLabel: {
            contains: filters.search,
            mode: "insensitive" as const,
          },
        },
      ];
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.departmentId && filters.departmentId !== "all") {
      where.departmentId = filters.departmentId;
    }

    const total = await db.walkieTalkie.count({ where });

    let orderBy: any = [];
    if (sort) {
      if (sort.field === "department") {
        orderBy = [{ department: { name: sort.order } }];
      } else if (sort.field === "serialNumber") {
        orderBy = [{ serialNumber: sort.order }];
      } else if (sort.field === "label") {
        orderBy = [{ label: sort.order }];
      } else if (sort.field === "innerLabel") {
        orderBy = [{ innerLabel: sort.order }];
      } else if (sort.field === "status") {
        orderBy = [{ status: sort.order }];
      }
      orderBy.push({ createdAt: "desc" });
    } else {
      orderBy = [{ department: { name: "asc" } }, { createdAt: "desc" }];
    }

    const walkieTalkies = await db.walkieTalkie.findMany({
      where,
      include: {
        department: {
          select: { id: true, name: true, color: true, code: true },
        },
        assignments: {
          where: {
            returnDate: null, // Only get active assignments
          },
          include: {
            assignedTo: {
              select: { id: true, name: true, email: true, image: true },
            },
            crewMember: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
          orderBy: { checkoutDate: "desc" },
          take: 1,
        },
        notes: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: orderBy,
    });

    // Enhance walkies with assignedToName
    const enhancedWalkies = walkieTalkies.map((walkie) => {
      const assignment = walkie.assignments[0];
      let assignedToName = null;

      if (assignment) {
        if (assignment.crewMember) {
          assignedToName = `${assignment.crewMember.firstName} ${assignment.crewMember.lastName}`;
        } else if (assignment.assignedTo) {
          assignedToName = assignment.assignedTo.name;
        } else if (assignment.assignedToName) {
          assignedToName = assignment.assignedToName;
        }
      }

      return {
        ...walkie,
        assignments: walkie.assignments.map((a) => ({
          ...a,
          assignedToName,
        })),
      };
    });

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      walkieTalkies: enhancedWalkies,
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
    console.error("❌ Error fetching walkie talkies:", error);
    throw new Error("Failed to fetch walkie talkies");
  }
}

export async function getWalkieTalkieDetails(
  walkieTalkieId: string,
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

    const walkieTalkie = await db.walkieTalkie.findUnique({
      where: { id: walkieTalkieId },
      include: {
        department: {
          select: {
            id: true,
            name: true,
            color: true,
            code: true,
            description: true,
          },
        },
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
            crewMember: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: {
            checkoutDate: "desc",
          },
        },
        notes: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!walkieTalkie || walkieTalkie.projectId !== projectId) {
      throw new Error("Walkie talkie not found");
    }

    return {
      success: true,
      data: walkieTalkie,
    };
  } catch (error) {
    console.error("❌ Error fetching walkie talkie details:", error);
    throw error;
  }
}

export async function createWalkieTalkie(
  projectId: string,
  userId: string,
  data: CreateWalkieTalkieRequest
) {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    if (!data.serialNumber || data.serialNumber.trim().length === 0) {
      throw new Error("Serial number is required");
    }

    const existingWalkie = await db.walkieTalkie.findUnique({
      where: { serialNumber: data.serialNumber },
    });

    if (existingWalkie) {
      throw new Error("Walkie talkie with this serial number already exists");
    }

    let status = data.status || "available";
    if (
      data.departmentId &&
      data.departmentId !== "none" &&
      data.departmentId.length > 0
    ) {
      status = "assigned";
    }

    console.log("🔨 Creating walkie talkie:", {
      projectId,
      serialNumber: data.serialNumber,
    });

    // Check subscription limits
    const orgId = await getActiveOrgId();
    if (orgId) {
       const limitCheck = await checkSubscriptionLimit("walkies", orgId);
       if (!limitCheck.allowed) {
           throw new Error(limitCheck.error || "Walkie talkie limit reached for your plan.");
       }
    }

    const newWalkieTalkie = await db.walkieTalkie.create({
      data: {
        serialNumber: data.serialNumber.trim(),
        label: data.label?.trim() || null,
        innerLabel: data.innerLabel?.trim() || null,
        status: status,
        departmentId: data.departmentId || null,
        projectId: projectId,
      },
      include: {
        department: {
          select: {
            id: true,
            name: true,
            color: true,
            code: true,
          },
        },
      },
    });

    if (data.assignedToCrewId) {
      if (data.departmentId && data.departmentId !== "none") {
        const crewMember = await db.crewMember.findUnique({
          where: { id: data.assignedToCrewId },
          select: { departmentId: true },
        });

        if (crewMember && !crewMember.departmentId) {
          await db.crewMember.update({
            where: { id: data.assignedToCrewId },
            data: { departmentId: data.departmentId },
          });
        }
      }

      await db.walkieTalkieAssignment.create({
        data: {
          walkieTalkieId: newWalkieTalkie.id,
          crewMemberId: data.assignedToCrewId,
          checkoutDate: new Date(),
          expectedReturnDate: data.expectedReturnDate
            ? new Date(data.expectedReturnDate)
            : null,
          department: data.departmentId,
        },
      });

      if (newWalkieTalkie.status !== "assigned") {
        await db.walkieTalkie.update({
          where: { id: newWalkieTalkie.id },
          data: { status: "assigned" },
        });
      }
    } else if (data.departmentId && data.departmentId !== "none") {
      await db.walkieTalkieAssignment.create({
        data: {
          walkieTalkieId: newWalkieTalkie.id,
          department: data.departmentId,
          checkoutDate: new Date(),
          expectedReturnDate: data.expectedReturnDate
            ? new Date(data.expectedReturnDate)
            : null,
        },
      });
    }

    // --- Record History for Creation ---
    await recordWalkieHistory(
      newWalkieTalkie.id,
      userId,
      "CREATE",
      `You created new Walkie - ${newWalkieTalkie.serialNumber}`
    );

    if (newWalkieTalkie.department) {
      await recordWalkieHistory(
        newWalkieTalkie.id,
        userId,
        "ASSIGN_DEPARTMENT",
        `Walkie ${newWalkieTalkie.serialNumber} was assigned to department - ${newWalkieTalkie.department.name}`,
        null,
        { departmentId: newWalkieTalkie.department.id, name: newWalkieTalkie.department.name }
      );
    }

    if (data.assignedToCrewId) {
      // Fetch crew details for history
      const crewDetails = await db.crewMember.findUnique({
        where: { id: data.assignedToCrewId },
        include: { department: true }
      });
      
      const crewName = crewDetails ? `${crewDetails.firstName} ${crewDetails.lastName}` : "Unknown";
      const deptName = crewDetails?.department?.name || (newWalkieTalkie.department?.name || "Unknown");

      await recordWalkieHistory(
        newWalkieTalkie.id,
        userId,
        "ASSIGN_CREW",
        `Walkie was assigned to a Crew member - ${crewName} in ${deptName} department`,
        null,
        { crewId: data.assignedToCrewId, name: crewName }
      );
    }

    if (data.expectedReturnDate) {
      const formattedDate = format(new Date(data.expectedReturnDate), "EEE, do MMM yyyy");
      await recordWalkieHistory(
        newWalkieTalkie.id,
        userId,
        "ASSIGN_RETURN_DATE",
        `${newWalkieTalkie.serialNumber} has been assigned a return date of ${formattedDate}`,
        null,
        { returnDate: data.expectedReturnDate }
      );
    }
    // -----------------------------------

    console.log("✅ Walkie talkie created successfully:", newWalkieTalkie.id);

    await logActivity(
      projectId,
      userId,
      "CREATE",
      "WALKIE",
      newWalkieTalkie.id,
      `Created walkie talkie: ${newWalkieTalkie.serialNumber}`
    );

    return {
      success: true,
      data: newWalkieTalkie,
      message: "Walkie talkie created successfully",
    };
  } catch (error) {
    console.error("❌ Error creating walkie talkie:", error);
    if (error instanceof Error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
    throw new Error("Failed to create walkie talkie");
  }
}

export async function updateWalkieTalkie(
  walkieTalkieId: string,
  projectId: string,
  userId: string,
  data: UpdateWalkieTalkieRequest & { returnDate?: string }
) {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    const walkieTalkie = await db.walkieTalkie.findUnique({
      where: { id: walkieTalkieId },
      include: {
        assignments: {
          where: { returnDate: null },
          orderBy: { checkoutDate: "desc" },
          take: 1,
        },
      },
    });

    if (!walkieTalkie || walkieTalkie.projectId !== projectId) {
      throw new Error("Walkie talkie not found");
    }

    console.log("🔨 Updating walkie talkie:", { walkieTalkieId, data });

    const updateData: any = {};

    if (data.serialNumber !== undefined) {
      updateData.serialNumber = data.serialNumber.trim();
    }
    if (data.label !== undefined) {
      updateData.label = data.label?.trim() || null;
    }
    if (data.innerLabel !== undefined) {
      updateData.innerLabel = data.innerLabel?.trim() || null;
    }
    if (data.status !== undefined) {
      updateData.status = data.status;
    }
    if (data.departmentId !== undefined) {
      updateData.departmentId = data.departmentId || null;
      if (
        data.departmentId &&
        data.departmentId !== "none" &&
        updateData.status !== "assigned" &&
        updateData.status !== "broken" &&
        updateData.status !== "maintenance" &&
        updateData.status !== "available"
      ) {
        updateData.status = "assigned";
      }
    }

    const isReturning = !!data.returnDate;
    const activeAssignment = walkieTalkie.assignments[0];
    const isNewCrewAssignment = !!data.assignedToCrewId && (!activeAssignment || activeAssignment.crewMemberId !== data.assignedToCrewId);
    const isDeptChange =
      data.departmentId !== undefined &&
      data.departmentId !== walkieTalkie.departmentId;

    const closureDate = data.returnDate
      ? new Date(data.returnDate)
      : new Date();

    // Handle Return Date - Close active assignments
    if (isReturning) {
      console.log("🔄 Processing return date:", data.returnDate);

      const activeAssignment = walkieTalkie.assignments[0];

      if (activeAssignment) {
        await db.walkieTalkieAssignment.update({
          where: { id: activeAssignment.id },
          data: { returnDate: closureDate },
        });
        console.log(`✅ Closed assignment: ${activeAssignment.id}`);
      }

      // If just returning (no new assignment), set to available
      if (
        !isNewCrewAssignment &&
        (!isDeptChange || !data.departmentId || data.departmentId === "none") &&
        updateData.status !== "broken" &&
        updateData.status !== "maintenance"
      ) {
        updateData.status = "available";
        updateData.departmentId = null;
        console.log("📦 Setting status to available and clearing department");
      }
    } else if (isNewCrewAssignment || isDeptChange) {
      // Close existing assignments before creating new one
      const activeAssignment = walkieTalkie.assignments[0];
      if (activeAssignment) {
        await db.walkieTalkieAssignment.update({
          where: { id: activeAssignment.id },
          data: { returnDate: closureDate },
        });
      }
    }

    // Create New Assignment if needed
    if (isNewCrewAssignment && !isReturning) {
      console.log("👤 Creating new crew assignment");

      if (
        data.assignedToCrewId &&
        data.departmentId &&
        data.departmentId !== "none"
      ) {
        const crewMember = await db.crewMember.findUnique({
          where: { id: data.assignedToCrewId },
          select: { departmentId: true },
        });

        if (crewMember && !crewMember.departmentId) {
          await db.crewMember.update({
            where: { id: data.assignedToCrewId },
            data: { departmentId: data.departmentId },
          });
        }
      }

      await db.walkieTalkieAssignment.create({
        data: {
          walkieTalkieId: walkieTalkieId,
          crewMemberId: data.assignedToCrewId,
          checkoutDate: new Date(),
          expectedReturnDate: data.expectedReturnDate
            ? new Date(data.expectedReturnDate)
            : null,
          department: data.departmentId || walkieTalkie.departmentId,
        },
      });
      if (updateData.status !== "broken" && updateData.status !== "maintenance") {
        updateData.status = "assigned";
      }
    } else if (
      isDeptChange &&
      data.departmentId &&
      data.departmentId !== "none" &&
      !isReturning
    ) {
      console.log("🏢 Creating new department assignment");

      await db.walkieTalkieAssignment.create({
        data: {
          walkieTalkieId: walkieTalkieId,
          department: data.departmentId,
          checkoutDate: new Date(),
          expectedReturnDate: data.expectedReturnDate
            ? new Date(data.expectedReturnDate)
            : null,
        },
      });
      if (updateData.status !== "broken" && updateData.status !== "maintenance" && updateData.status !== "available") {
        updateData.status = "assigned";
      }
    }

    // --- Record History for Update ---
    
    // 0. Details Change (Serial, Label, Inner Label)
    if (updateData.serialNumber && updateData.serialNumber !== walkieTalkie.serialNumber) {
         await recordWalkieHistory(
             walkieTalkieId,
             userId,
             "UPDATE_SERIAL",
             `Serial number changed from ${walkieTalkie.serialNumber} to ${updateData.serialNumber}`,
             { serialNumber: walkieTalkie.serialNumber },
             { serialNumber: updateData.serialNumber }
         );
    }

    if (updateData.label !== undefined && updateData.label !== walkieTalkie.label) {
         const oldLabel = walkieTalkie.label || "None";
         const newLabel = updateData.label || "None";
         await recordWalkieHistory(
             walkieTalkieId,
             userId,
             "UPDATE_LABEL",
             `Label changed from ${oldLabel} to ${newLabel}`,
             { label: walkieTalkie.label },
             { label: updateData.label }
         );
    }

    if (updateData.innerLabel !== undefined && updateData.innerLabel !== walkieTalkie.innerLabel) {
         const oldInner = walkieTalkie.innerLabel || "None";
         const newInner = updateData.innerLabel || "None";
         await recordWalkieHistory(
             walkieTalkieId,
             userId,
             "UPDATE_INNER_LABEL",
             `Inner Label changed from ${oldInner} to ${newInner}`,
             { innerLabel: walkieTalkie.innerLabel },
             { innerLabel: updateData.innerLabel }
         );
    }

    if (updateData.status !== undefined && updateData.status !== walkieTalkie.status) {
         await recordWalkieHistory(
             walkieTalkieId,
             userId,
             "UPDATE_STATUS",
             `Status changed from ${walkieTalkie.status} to ${updateData.status}`,
             { status: walkieTalkie.status },
             { status: updateData.status }
         );
    }

    // 1. Return Date Change
    if (data.expectedReturnDate) {
        const formattedDate = format(new Date(data.expectedReturnDate), "EEE, do MMM yyyy");
        await recordWalkieHistory(
            walkieTalkieId,
            userId,
            "UPDATE_RETURN_DATE",
            `${walkieTalkie.serialNumber} has been assigned a new return date of ${formattedDate}`,
            { returnDate: walkieTalkie.assignments[0]?.expectedReturnDate },
            { returnDate: data.expectedReturnDate }
        );
    }

    // 2. Department Change
    if (isDeptChange && data.departmentId && data.departmentId !== "none") {
         const newDept = await db.walkieDepartment.findUnique({
             where: { id: data.departmentId },
             select: { name: true }
         });
         
         if (newDept) {
             await recordWalkieHistory(
                 walkieTalkieId,
                 userId,
                 "UPDATE_DEPARTMENT",
                 `Walkie ${walkieTalkie.serialNumber} was assigned to department - ${newDept.name}`,
                 { departmentId: walkieTalkie.departmentId },
                 { departmentId: data.departmentId, name: newDept.name }
             );
         }
    }

    // 3. Crew Member Change
    if (isNewCrewAssignment && data.assignedToCrewId) {
         const crewDetails = await db.crewMember.findUnique({
            where: { id: data.assignedToCrewId },
            include: { department: true }
         });
         
         const crewName = crewDetails ? `${crewDetails.firstName} ${crewDetails.lastName}` : "Unknown";
         const deptName = crewDetails?.department?.name || "their";

         await recordWalkieHistory(
            walkieTalkieId,
            userId,
            "UPDATE_CREW",
            `Walkie was assigned to a Crew member - ${crewName} in ${deptName} department`,
            null,
            { crewId: data.assignedToCrewId, name: crewName }
         );
    }

    // 4. Update Expected Return Date on Active Assignment (if not creating new one)
    if (data.expectedReturnDate && !isNewCrewAssignment && !isDeptChange && !isReturning) {
        const activeAssignment = walkieTalkie.assignments[0];
        if (activeAssignment) {
            await db.walkieTalkieAssignment.update({
                where: { id: activeAssignment.id },
                data: { expectedReturnDate: new Date(data.expectedReturnDate) }
            });
        }
    }
    // ---------------------------------

    // --- Update Notes ---
    if (data.notes !== undefined) {
      const existingNote = await db.note.findFirst({
        where: { walkieTalkieId: walkieTalkieId },
        orderBy: { createdAt: "desc" },
      });

      if (existingNote) {
        await db.note.update({
          where: { id: existingNote.id },
          data: { content: data.notes },
        });
      } else if (data.notes.trim() !== "") {
        await db.note.create({
          data: {
            content: data.notes,
            walkieTalkieId: walkieTalkieId,
            authorId: userId,
            projectId: walkieTalkie.projectId,
          },
        });
      }
    }

    const updatedWalkieTalkie = await db.walkieTalkie.update({

      where: { id: walkieTalkieId },
      data: updateData,
      include: {
        department: {
          select: {
            id: true,
            name: true,
            color: true,
            code: true,
          },
        },
        assignments: {
          include: {
            crewMember: {
              select: { id: true, firstName: true, lastName: true },
            },
            assignedTo: {
              select: { id: true, name: true },
            },
          },
          orderBy: { checkoutDate: "desc" },
          take: 5,
        },
      },
    });

    console.log("✅ Walkie talkie updated successfully:", walkieTalkieId);

    await logActivity(
      projectId,
      userId,
      "UPDATE",
      "WALKIE",
      walkieTalkieId,
      `Updated walkie talkie: ${updatedWalkieTalkie.serialNumber}${
        isReturning ? " (Returned)" : ""
      }`
    );

    return {
      success: true,
      data: updatedWalkieTalkie,
      message: isReturning
        ? "Walkie talkie returned successfully"
        : "Walkie talkie updated successfully",
    };
  } catch (error) {
    console.error("❌ Error updating walkie talkie:", error);
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

export async function deleteWalkieTalkie(
  walkieTalkieId: string,
  projectId: string,
  userId: string
) {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      return {
        success: false,
        error:
          "Unauthorized - You don't have permission to delete this walkie talkie",
      };
    }

    const walkieTalkie = await db.walkieTalkie.findUnique({
      where: { id: walkieTalkieId },
      select: {
        id: true,
        serialNumber: true,
        projectId: true,
      },
    });

    if (!walkieTalkie) {
      return {
        success: false,
        error: "Walkie talkie not found",
      };
    }

    if (walkieTalkie.projectId !== projectId) {
      return {
        success: false,
        error: "Walkie talkie does not belong to this project",
      };
    }

    console.log("🗑️ Deleting walkie talkie:", walkieTalkieId);

    await db.walkieTalkie.delete({
      where: { id: walkieTalkieId },
    });

    await logActivity(
      projectId,
      userId,
      "DELETE",
      "WALKIE",
      walkieTalkieId,
      `Deleted walkie talkie: ${walkieTalkie.serialNumber}`
    );

    console.log("✅ Walkie talkie deleted successfully:", walkieTalkieId);

    return {
      success: true,
      message: "Walkie talkie deleted successfully",
    };
  } catch (error) {
    console.error("❌ Error deleting walkie talkie:", error);

    if (error instanceof Error) {
      if (error.message.includes("Foreign key constraint")) {
        return {
          success: false,
          error:
            "Cannot delete: This walkie talkie has related records. Please remove assignments first.",
        };
      }

      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred while deleting the walkie talkie",
    };
  }
}

export async function getDepartmentsForProject(
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

    const departments = await db.walkieDepartment.findMany({
      where: { projectId },
      select: {
        id: true,
        name: true,
        code: true,
        color: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      success: true,
      data: departments,
    };
  } catch (error) {
    console.error("❌ Error fetching departments:", error);
    throw error;
  }
}

export async function updateWalkieAssignment(
  assignmentId: string,
  projectId: string,
  userId: string,
  data: { returnDate?: Date | null; expectedReturnDate?: Date | null }
) {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    const updateData: any = {};
    if (data.returnDate !== undefined) updateData.returnDate = data.returnDate;
    if (data.expectedReturnDate !== undefined) updateData.expectedReturnDate = data.expectedReturnDate;

    // Check if we are updating expected return date to log it
    if (data.expectedReturnDate) {
         // We might want to record history here too, but for now just update.
         // Since history recording helper needs walkieId, and we only have assignmentId, we'd need to fetch it first.
         const assignment = await db.walkieTalkieAssignment.findUnique({
             where: { id: assignmentId },
             select: { walkieTalkieId: true, walkieTalkie: { select: { serialNumber: true } } } 
         });
         
         if (assignment) {
             const formattedDate = format(new Date(data.expectedReturnDate), "EEE, do MMM yyyy");
             await recordWalkieHistory(
                 assignment.walkieTalkieId,
                 userId,
                 "UPDATE_RETURN_DATE",
                 `${assignment.walkieTalkie.serialNumber} has been assigned a new return date of ${formattedDate}`,
                 null,
                 { returnDate: data.expectedReturnDate }
             );
         }
    }

    const updatedAssignment = await db.walkieTalkieAssignment.update({
      where: { id: assignmentId },
      data: updateData,
    });

    return {
      success: true,
      data: updatedAssignment,
    };
  } catch (error) {
    console.error("❌ Error updating assignment:", error);
    throw error;
  }
}

export async function recordWalkieHistory(
  walkieTalkieId: string,
  editorId: string,
  changeType: string,
  description: string,
  previousValue?: any,
  newValue?: any
) {
  try {
    await db.walkie_talkie_edit_history.create({
      data: {
        walkieTalkieId,
        editorId,
        changeType,
        description,
        previousValue: previousValue ? (JSON.stringify(previousValue) as any) : undefined,
        newValue: newValue ? (JSON.stringify(newValue) as any) : undefined,
      },
    });
  } catch (error) {
    console.error("❌ Error recording walkie history:", error);
    // Don't throw, just log. History recording shouldn't block main action.
  }
}

export async function getWalkieHistory(
  walkieTalkieId: string,
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

    const history = await db.walkie_talkie_edit_history.findMany({
      where: { walkieTalkieId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    });

    return {
      success: true,
      data: history
    };

  } catch (error) {
    console.error("❌ Error fetching walkie history:", error);
    return { success: false, error: "Failed to fetch history" };
  }
}
