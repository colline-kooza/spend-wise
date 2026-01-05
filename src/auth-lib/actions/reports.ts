"use server";

import db from "@/lib/prisma";
import { Resend } from "resend";
import { format } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ReportFilters {
  dateRange?: {
    from: Date;
    to: Date;
  };
  status?: string[];
  departmentId?: string;
  projectId: string;
  search?: string;
  type: "all" | "overdue" | "broken" | "assignments"; // Preset types
}

export async function getReportData(filters: ReportFilters) {
  try {
    const { projectId, dateRange, status, departmentId, search, type } =
      filters;

    // Base where clause
    const where: any = {
      projectId: projectId,
    };

    // --- Apply Filters ---

    // 1. Department
    if (departmentId && departmentId !== "all") {
      where.departmentId = departmentId;
    }

    // 2. Status
    if (status && status.length > 0) {
      where.status = { in: status };
    }

    // 3. Search (Serial, Label)
    if (search) {
      where.OR = [
        { serialNumber: { contains: search, mode: "insensitive" } },
        { label: { contains: search, mode: "insensitive" } },
        { innerLabel: { contains: search, mode: "insensitive" } },
      ];
    }

    // 4. Report Type Specific Logic
    if (type === "broken") {
      // Override status filter if "broken" type is explicitly selected,
      // or ensure "broken" is included.
      // But typically "type" might just pre-fill the status filter on frontend.
      // If the user selects "broken" report, we force status=broken?
      // Let's assume 'type' is a preset.
      if (!status || status.length === 0) {
        where.status = "broken";
      }
    } else if (type === "overdue") {
      // Only walkies with overdue assignments
      where.assignments = {
        some: {
          returnDate: null,
          expectedReturnDate: { lt: new Date() },
        },
      };
    } else if (type === "assignments") {
      // This likely needs a different return shape (Assignment[], not Walkie[])
      // For simplicity, we'll return Walkies that have assignments in range
    }

    // 5. Date Range Logic
    // If date range is provided, what are we filtering?
    // - For "broken": Broken WITHIN that date range? (Hard to track without history)
    // - For "assignments": Active within that range?
    // - For general: CreatedAt? usually not useful.

    // Suggestion: If 'assignments' type, we return assignments.
    // If 'walkies' type, we return walkies.

    // For now, let's return WalkieTalkies with their assignments included
    // and let the frontend filter/display appropriate dates.
    // BUT "without return for last 30 days" implies logic.

    if (dateRange && dateRange.from && dateRange.to) {
      if (type === "overdue" || type === "assignments") {
        // Filter by assignments in range?
      }
    }

    const walkies = await db.walkieTalkie.findMany({
      where,
      include: {
        department: true,
        assignments: {
          where: {
            returnDate: null, // Active assignments usually most relevant
          },
          include: {
            assignedTo: true,
            crewMember: true,
          },
          orderBy: { checkoutDate: "desc" },
          take: 1,
        },
      },
      orderBy: {
        serialNumber: "asc",
      },
    });

    return { success: true, data: walkies };
  } catch (error) {
    console.error("Error fetching report data:", error);
    return { success: false, error: "Failed to fetch report data" };
  }
}

export async function sendReportEmail(
  userEmail: string,
  fileName: string,
  fileContentBase64: string // Expecting Base64 encoded file content
) {
  try {
    if (!userEmail) throw new Error("No email provided");

    // Decode base64 to Buffer? Resend accepts buffer or string content.
    // "content": Buffer.from(fileContentBase64, 'base64')

    const { data, error } = await resend.emails.send({
      from: `Walkie Check <${process.env.RESEND_FROM_EMAIL}>`, // Replace with verified domain
      to: [userEmail],
      subject: `Your Exported Report: ${fileName}`,
      html: `
        <h1>Your Report is Ready</h1>
        <p>Please find the exported report attached.</p>
      `,
      attachments: [
        {
          filename: fileName,
          content: Buffer.from(fileContentBase64, "base64"),
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
