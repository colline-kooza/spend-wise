"use server";

import db from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function seedReportData(projectId: string) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const project = await db.project.findUnique({
      where: { id: projectId },
      include: { departments: true },
    });

    if (!project) {
      return { success: false, error: "Project not found" };
    }

    if (project.ownerId !== user.id) {
        // Strict ownership check for now, can relax to members if needed
        return { success: false, error: "Only project owner can seed data" }; 
    }

    const departments = project.departments;
    if (departments.length === 0) {
      return { success: false, error: "Project has no departments" };
    }

    // --- 1. Create/Check Crew Members ---
    const crewMembers = [];
    const existingCrew = await db.crewMember.findMany({ where: { projectId: project.id } });
    
    if (existingCrew.length < 20) {
      for (let i = 0; i < 20; i++) {
          const dept = departments[Math.floor(Math.random() * departments.length)];
          const firstName = `Crew${i+1}`;
          const lastName = `Member${i+1}`;
          
          const crew = await db.crewMember.create({
              data: {
                  firstName,
                  lastName,
                  projectId: project.id,
                  departmentId: dept.id,
                  email: `crew${i+1}@example.com`,
                  phone: `555-01${i.toString().padStart(2, '0')}`
              }
          });
          crewMembers.push(crew);
      }
    } else {
        crewMembers.push(...existingCrew);
    }

    // --- 2. Create 50 Walkies ---
    const statuses = ["available", "assigned", "broken", "maintenance"];
    
    for (let i = 0; i < 50; i++) {
      const dept = departments[Math.floor(Math.random() * departments.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const serialNumber = `W-RPT-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const exists = await db.walkieTalkie.findUnique({ where: { serialNumber } });
      if (exists) continue;

      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 60));

      const walkie = await db.walkieTalkie.create({
        data: {
          serialNumber,
          label: `Walkie ${i + 1}`,
          innerLabel: `IN-${i + 1}`,
          status,
          projectId: project.id,
          departmentId: dept.id,
          createdAt,
        },
      });

      // --- 3. Create Assignments ---
      if (status === "assigned" || status === "broken") {
          const crew = crewMembers[Math.floor(Math.random() * crewMembers.length)];
          const checkoutDate = new Date();
          checkoutDate.setDate(checkoutDate.getDate() - Math.floor(Math.random() * 10)); // 0-10 days ago
          
          const isOverdue = Math.random() > 0.7;
          const expectedReturnDate = new Date(checkoutDate);
          expectedReturnDate.setDate(checkoutDate.getDate() + (isOverdue ? -1 : 7)); 

          await db.walkieTalkieAssignment.create({
              data: {
                  walkieTalkieId: walkie.id,
                  crewMemberId: crew.id,
                  department: dept.name,
                  checkoutDate,
                  expectedReturnDate,
                  notes: status === "broken" ? "Reported broken during use" : undefined
              }
          });
      } else if (status === "available") {
          // Past assignment
          if (Math.random() > 0.5) {
              const crew = crewMembers[Math.floor(Math.random() * crewMembers.length)];
              const checkoutDate = new Date();
              checkoutDate.setDate(checkoutDate.getDate() - Math.floor(Math.random() * 20) - 5);
              const returnedAt = new Date(checkoutDate);
              returnedAt.setDate(checkoutDate.getDate() + 3);

              await db.walkieTalkieAssignment.create({
                  data: {
                      walkieTalkieId: walkie.id,
                      crewMemberId: crew.id,
                      department: dept.name,
                      checkoutDate,
                      expectedReturnDate: new Date(checkoutDate.getTime() + 7 * 24 * 60 * 60 * 1000),
                      returnedAt
                  }
              });
          }
      }
    }

    revalidatePath("/dashboard/reports");
    return { success: true };

  } catch (error) {
    console.error("Error seeding report data:", error);
    return { success: false, error: "Failed to seed data" };
  }
}
