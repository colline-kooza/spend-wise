"use server";
import db from "@/lib/prisma";
import { CrewMember } from "@/types/crew-members";
import { logActivity } from "./activity-log";

export async function getCrewMembers(
  projectId: string,
  userId: string,
  page = 1,
  limit = 10,
  filters?: {
    search?: string;
    departmentId?: string;
    role?: string;
  }
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
          email: {
            contains: filters.search,
            mode: "insensitive" as const,
          },
        },
        {
          phone: {
            contains: filters.search,
            mode: "insensitive" as const,
          },
        },
      ];
    }

    if (filters?.departmentId) {
      where.departmentId = filters.departmentId;
    }

    if (filters?.role) {
      where.role = filters.role;
    }

    // Get total count
    const total = await db.crewMember.count({ where });

    // Get paginated crew members
    const crewMembers = await db.crewMember.findMany({
      where,
      include: {
        department: true,
        walkieTalkieAssignments: {
          include: {
            walkieTalkie: true,
          },
        },
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
      data: {
        crewMembers, // ← Changed: wrapped in object
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
    console.error("❌ Error fetching crew members:", error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
    throw new Error("Failed to fetch crew members");
  }
}

export async function getCrewMemberDetails(
  crewMemberId: string,
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

    const crewMember = await db.crewMember.findUnique({
      where: {
        id: crewMemberId,
      },
      include: {
        department: true,
        walkieTalkieAssignments: {
          include: {
            walkieTalkie: true,
          },
        },
      },
    });

    if (!crewMember || crewMember.projectId !== projectId) {
      throw new Error("Crew member not found");
    }

    return {
      success: true,
      data: crewMember,
    };
  } catch (error) {
    console.error("❌ Error fetching crew member details:", error);
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

import { recordWalkieHistory } from "./walkie-talkies";

// ... (keep creating imports if any, but I'll assume they are at top)

export async function createCrewMember(
  projectId: string,
  userId: string,
  data: Partial<CrewMember>
) {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    if (!data.lastName || data.lastName.trim().length === 0) {
      throw new Error("Crew member name is required");
    }

    const newCrewMember = await db.crewMember.create({
      data: {
        firstName: data.firstName?.trim() ?? "",
        lastName: data.lastName?.trim() ?? "",
        email: data.email?.trim() || null,
        phone: data.phone?.trim() || null,
        role: data.role || "Member",
        departmentId: data.departmentId || null,
        projectId: projectId,
      },
      include: { department: true } // Include dept for history logging
    });

    // Handle Walkie Assignment if provided
    const requestData = data as any;
    if (requestData.walkieId) {
       console.log("📻 Assigning walkie:", requestData.walkieId);
       
       // 1. End any active assignment for this walkie
       await db.walkieTalkieAssignment.updateMany({
         where: {
           walkieTalkieId: requestData.walkieId,
           returnDate: null,
         },
         data: {
           returnDate: new Date(),
         },
       });

       await db.walkieTalkieAssignment.create({
         data: {
            walkieTalkieId: requestData.walkieId,
            crewMemberId: newCrewMember.id,
            checkoutDate: new Date(),
         }
       });

       // 3. Update Walkie status and Sync Department
       const walkieUpdateData: any = { status: "assigned" };
       if (newCrewMember.departmentId) {
           walkieUpdateData.departmentId = newCrewMember.departmentId;
       }

       const updatedWalkie = await db.walkieTalkie.update({
         where: { id: requestData.walkieId },
         data: walkieUpdateData,
         select: { serialNumber: true } 
       });

       // Record History
       const crewName = `${newCrewMember.firstName} ${newCrewMember.lastName}`;
       const deptName = newCrewMember.department?.name || "Unknown";
       
       await recordWalkieHistory(
         requestData.walkieId,
         userId,
         "ASSIGN_CREW",
         `Walkie assigned to new Crew Member - ${crewName} (${deptName})`,
         null,
         { crewId: newCrewMember.id, name: crewName }
       );
    }

    await logActivity(
      projectId,
      userId,
      "CREATE",
      "CREW_MEMBER",
      newCrewMember.id,
      `Created crew member: ${newCrewMember.firstName} ${newCrewMember.lastName}`
    );

    console.log("✅ Crew member created successfully:", newCrewMember.id);
    return {
      success: true,
      data: newCrewMember,
      message: "Crew member created successfully",
    };
  } catch (error) {
    console.error("❌ Error creating crew member:", error);
    if (error instanceof Error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
    throw new Error("Failed to create crew member");
  }
}

export async function updateCrewMember(
  crewMemberId: string,
  projectId: string,
  userId: string,
  data: Partial<CrewMember>
) {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project || project.ownerId !== userId) {
      throw new Error("Unauthorized");
    }

    const crewMember = await db.crewMember.findUnique({
      where: { id: crewMemberId },
      include: { department: true } // Need old department for comparison if needed
    });

    if (!crewMember || crewMember.projectId !== projectId) {
      throw new Error("Crew member not found");
    }

    console.log("🔨 Updating crew member:", { crewMemberId, ...data });

    const updateData: any = {};
    if (data.firstName !== undefined) updateData.firstName = data.firstName.trim();
    if (data.lastName !== undefined) updateData.lastName = data.lastName.trim();
    if (data.email !== undefined) updateData.email = data.email?.trim() || null;
    if (data.phone !== undefined) updateData.phone = data.phone?.trim() || null;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.departmentId !== undefined) updateData.departmentId = data.departmentId;

    const updatedCrewMember = await db.crewMember.update({
      where: { id: crewMemberId },
      data: updateData,
      include: {
        department: true,
      },
    });

    // Handle Walkie Sync (If Department Changed)
    if (data.departmentId !== undefined && data.departmentId !== crewMember.departmentId) {
        // Find active walkie for this crew member
        const activeAssignment = await db.walkieTalkieAssignment.findFirst({
            where: {
                crewMemberId: crewMemberId,
                returnDate: null
            },
            include: { walkieTalkie: true }
        });

        if (activeAssignment) {
            // Update Walkie Department to match Crew
             if (data.departmentId) {
                 const newDept = await db.walkieDepartment.findUnique({
                     where: { id: data.departmentId },
                     select: { name: true }
                 });

                 if (newDept) {
                    await db.walkieTalkie.update({
                        where: { id: activeAssignment.walkieTalkieId },
                        data: { departmentId: data.departmentId }
                    });

                    await recordWalkieHistory(
                        activeAssignment.walkieTalkieId,
                        userId,
                        "UPDATE_DEPARTMENT",
                        `Crew member ${updatedCrewMember.firstName} moved to ${newDept.name} department`,
                        { departmentId: crewMember.departmentId },
                        { departmentId: data.departmentId, name: newDept.name }
                    );
                 }
             }
        }
    }

    // Handle Walkie Assignment Change (Explicit assignment from form)
    const requestData = data as any;
    if (requestData.walkieId !== undefined) {
        console.log("📻 Updating walkie assignment:", requestData.walkieId);
        
        // 1. End user's current active assignments
        const userActiveAssignments = await db.walkieTalkieAssignment.findMany({
            where: {
                crewMemberId: crewMemberId, 
                returnDate: null
            },
            include: { walkieTalkie: true }
        });

        for (const assignment of userActiveAssignments) {
            await db.walkieTalkieAssignment.update({
                where: { id: assignment.id },
                data: { returnDate: new Date() }
            });
            // Set old walkie to available
            await db.walkieTalkie.update({
                where: { id: assignment.walkieTalkieId },
                data: { status: "available" }
            });
            
            // Record unassignment history
             await recordWalkieHistory(
                assignment.walkieTalkieId,
                userId,
                "UNASSIGN_CREW",
                `Walkie unassigned from ${updatedCrewMember.firstName} ${updatedCrewMember.lastName}`,
                { crewId: crewMemberId },
                null
            );
        }

        // 2. If new walkie provided, assign it
        if (requestData.walkieId) {
             // End any active assignment for the TARGET walkie
             await db.walkieTalkieAssignment.updateMany({
                where: {
                    walkieTalkieId: requestData.walkieId,
                    returnDate: null
                },
                data: { returnDate: new Date() }
            });

             // Create new assignment
             await db.walkieTalkieAssignment.create({
                 data: {
                     walkieTalkieId: requestData.walkieId,
                     crewMemberId: crewMemberId,
                     checkoutDate: new Date(),
                 }
             });

             // Update Walkie Status and Sync Department
             const targetDeptId = data.departmentId !== undefined ? data.departmentId : crewMember.departmentId;
             const walkieUpdateData: any = { status: "assigned" };
             if (targetDeptId) {
                 walkieUpdateData.departmentId = targetDeptId;
             }

             await db.walkieTalkie.update({
                 where: { id: requestData.walkieId },
                 data: walkieUpdateData
             });

             // Record Assignment History
            const deptName = updatedCrewMember.department?.name || "Unknown";
            await recordWalkieHistory(
                requestData.walkieId,
                userId,
                "ASSIGN_CREW",
                `Walkie assigned to ${updatedCrewMember.firstName} ${updatedCrewMember.lastName} (${deptName})`,
                null,
                { crewId: crewMemberId }
            );
        }
    }

    await logActivity(
      projectId,
      userId,
      "UPDATE",
      "CREW_MEMBER",
      crewMemberId,
      `Updated crew member: ${updatedCrewMember.firstName} ${updatedCrewMember.lastName}`
    );

    console.log("✅ Crew member updated successfully:", crewMemberId);
    return {
      success: true,
      data: updatedCrewMember,
      message: "Crew member updated successfully",
    };
  } catch (error) {
    console.error("❌ Error updating crew member:", error);
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

export async function deleteCrewMember(
  crewMemberId: string,
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

    // Verify crew member exists and belongs to project
    const crewMember = await db.crewMember.findUnique({
      where: { id: crewMemberId },
    });

    if (!crewMember || crewMember.projectId !== projectId) {
      throw new Error("Crew member not found");
    }

    console.log("🔨 Deleting crew member:", crewMemberId);

    await db.crewMember.delete({
      where: { id: crewMemberId },
    });

    await db.crewMember.delete({
      where: { id: crewMemberId },
    });

    await logActivity(
      projectId,
      userId,
      "DELETE",
      "CREW_MEMBER",
      crewMemberId,
      `Deleted crew member: ${crewMember.firstName} ${crewMember.lastName}`
    );

    console.log("✅ Crew member deleted successfully:", crewMemberId);
    return {
      success: true,
      message: "Crew member deleted successfully",
    };
  } catch (error) {
    console.error("❌ Error deleting crew member:", error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    throw error;
  }
}
