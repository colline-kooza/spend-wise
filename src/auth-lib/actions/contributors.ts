"use server";

import { Resend } from "resend";
import db from "@/lib/prisma";

import crypto from "crypto";
import {
  ContributorActionResponse,
  ProjectCollaborator,
  ProjectInvitation,
  SearchUserResult,
  ContributorRole,
} from "@/types/contributors";
import {
  generateAcceptanceEmail,
  generateInvitationEmail,
} from "../email/invitation-email";
import { getAuthUser, getActiveOrgId } from "../auth";
import { checkSubscriptionLimit } from "@/lib/subscription";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@collaborators.dev";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/**
 * Search for users by name or email (minimum 3 characters)
 */
export async function searchUsers(
  searchQuery: string,
  projectId: string,
  userId: string
): Promise<ContributorActionResponse<SearchUserResult[]>> {
  try {
    if (!searchQuery) {
      return {
        success: false,
        error: "Search query is required",
        data: [],
      };
    }

    // Get existing collaborators to mark them
    const existingCollaborators = await db.projectCollaborator.findMany({
      where: {
        projectId,
        status: "active",
      },
      select: { userId: true },
    });

    const collaboratorIds = new Set(existingCollaborators.map((c) => c.userId));

    // Search users by name or email
    const users = await db.user.findMany({
      where: {
        AND: [
          { id: { not: userId } }, // Exclude current user
          {
            OR: [
              { name: { contains: searchQuery, mode: "insensitive" } },
              { email: { contains: searchQuery, mode: "insensitive" } },
            ],
          },
        ],
      },
      select: { id: true, name: true, email: true, image: true },
      take: 10,
    });

    const results: SearchUserResult[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image ?? undefined,
      isCollaborator: collaboratorIds.has(user.id),
    }));

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error("[searchUsers] error:", error);
    return {
      success: false,
      error: "Failed to search users",
      data: [],
    };
  }
}

/**
 * Send invitation to a user by email
 */

export { sendInvitation as inviteCollaborator };

export async function sendInvitation(
  email: string,
  projectId: string,
  userId: string,
  role: ContributorRole = "editor",
  message?: string
): Promise<ContributorActionResponse<ProjectInvitation>> {
    // Check subscription limits
  try {
    const orgId = await getActiveOrgId();
    if (orgId) {
       const limitCheck = await checkSubscriptionLimit("collaborators", orgId);
       if (!limitCheck.allowed) {
          return {
             success: false,
             error: limitCheck.error || "Collaborator limit reached for your plan.",
          };
       }
    }

    // Validate email
    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "Invalid email address",
      };
    }

    // Validate role
    const validRoles: ContributorRole[] = ["viewer", "editor", "admin"];
    if (!validRoles.includes(role)) {
      return {
        success: false,
        error: "Invalid role",
      };
    }

    // Check for existing invitation
    const existingInvitation = await db.projectInvitation.findFirst({
      where: {
        projectId,
        email,
        status: { in: ["pending", "accepted"] },
      },
    });

    if (existingInvitation) {
      return {
        success: false,
        error: "User already has a pending or accepted invitation",
      };
    }

    // Get inviter and project details
    const [inviter, project] = await Promise.all([
      db.user.findUnique({ where: { id: userId } }),
      db.project.findUnique({
        where: { id: projectId },
        select: { id: true, name: true, description: true },
      }),
    ]);

    if (!inviter || !project) {
      return {
        success: false,
        error: "Inviter or project not found",
      };
    }

    // Generate invitation token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Create invitation in database
    const invitation = await db.projectInvitation.create({
      data: {
        projectId,
        email,
        role,
        token,
        expiresAt,
        inviterId: userId,
        message,
        status: "pending",
      },
      include: { inviter: true },
    });

    // Generate email content
    const acceptLink = `${APP_URL}/invitations/${token}/accept`;
    const declineLink = `${APP_URL}/invitations/${token}/decline`;

    const htmlContent = generateInvitationEmail({
      inviterName: inviter.name || "A colleague",
      projectName: project.name,
      projectSlug: projectId,
      inviteeEmail: email,
      acceptLink,
      declineLink,
      invitationToken: token,
    });

    const user = await getAuthUser();

    // Send email with detailed error handling
    try {
      const result = await resend.emails.send({
        from: "WalkieTalkie Manager <info@desishub.com>",
        to: email,
        subject: `${inviter.name} invited you to collaborate on ${project.name}`,
        html: htmlContent,
      });

      //   console.log("[sendInvitation] Resend result:", result);

      // CRITICAL FIX: Check both result.error and result.data
      // Resend returns { data: null, error: {...} } on failure
      if (result.error || !result.data) {
        console.error("[sendInvitation] Email send failed:", result.error);

        // Delete invitation if email fails
        await db.projectInvitation.delete({ where: { id: invitation.id } });

        // Provide more detailed error message
        const errorMessage =
          result.error?.message || "Failed to send invitation email";
        const errorDetails =
          result.error?.statusCode === 403
            ? "Email domain is not verified. Please verify your domain in Resend settings."
            : errorMessage;

        return {
          success: false,
          error: errorDetails,
        };
      }

      // Email sent successfully
      console.log("[sendInvitation] Email sent successfully:", result.data);
    } catch (emailError) {
      console.error("[sendInvitation] Email send exception:", emailError);

      // Delete invitation if email fails
      await db.projectInvitation.delete({ where: { id: invitation.id } });

      return {
        success: false,
        error:
          "Failed to send invitation email. Please check your email configuration.",
      };
    }

    // Map to typed response
    const typedInvitation: ProjectInvitation = {
      id: invitation.id,
      projectId: invitation.projectId,
      email: invitation.email,
      role: invitation.role as ContributorRole,
      inviterId: invitation.inviterId,
      inviter: {
        id: invitation.inviter.id,
        name: invitation.inviter.name,
        email: invitation.inviter.email,
        image: invitation.inviter.image ?? undefined,
      },
      status: invitation.status as ProjectInvitation["status"],
      token: invitation.token,
      createdAt: invitation.createdAt,
      expiresAt: invitation.expiresAt,
      respondedAt: invitation.respondedAt ?? undefined,
      message: invitation.message ?? undefined,
      userId: invitation.userId ?? undefined,
    };

    return {
      success: true,
      data: typedInvitation,
      message: `Invitation sent to ${email}`,
    };
  } catch (error) {
    console.error("[sendInvitation] Unexpected error:", error);
    return {
      success: false,
      error: "Failed to send invitation. Please try again.",
    };
  }
}
/**
 * Get all collaborators for a project
 */
export async function getProjectCollaborators(
  projectId: string
): Promise<ContributorActionResponse<ProjectCollaborator[]>> {
  try {
    const collaborators = await db.projectCollaborator.findMany({
      where: { projectId, status: "active" },
      include: { user: true },
      orderBy: { addedAt: "desc" },
    });

    // Map to typed response
    const typedCollaborators: ProjectCollaborator[] = collaborators.map(
      (collab) => ({
        id: collab.id,
        projectId: collab.projectId,
        userId: collab.userId,
        user: {
          id: collab.user.id,
          name: collab.user.name,
          email: collab.user.email,
          image: collab.user.image ?? undefined,
        },
        role: collab.role as ContributorRole,
        status: collab.status as ProjectCollaborator["status"],
        addedAt: collab.addedAt,
        updatedAt: collab.updatedAt,
        invitedBy: collab.invitedBy ?? undefined,
        removedAt: collab.removedAt ?? undefined,
        removedBy: collab.removedBy ?? undefined,
      })
    );

    return {
      success: true,
      data: typedCollaborators,
    };
  } catch (error) {
    console.error("[v0] getProjectCollaborators error:", error);
    return {
      success: false,
      error: "Failed to fetch collaborators",
    };
  }
}

/**
 * Get pending invitations for a project
 */
export async function getProjectInvitations(
  projectId: string
): Promise<ContributorActionResponse<ProjectInvitation[]>> {
  try {
    const invitations = await db.projectInvitation.findMany({
      where: { projectId },
      include: { inviter: true, user: true },
      orderBy: { createdAt: "desc" },
    });

    // Map to typed response
    const typedInvitations: ProjectInvitation[] = invitations.map((inv) => ({
      id: inv.id,
      projectId: inv.projectId,
      email: inv.email,
      role: inv.role as ContributorRole,
      inviterId: inv.inviterId,
      inviter: {
        id: inv.inviter.id,
        name: inv.inviter.name,
        email: inv.inviter.email,
        image: inv.inviter.image ?? undefined,
      },
      status: inv.status as ProjectInvitation["status"],
      token: inv.token,
      createdAt: inv.createdAt,
      expiresAt: inv.expiresAt,
      respondedAt: inv.respondedAt ?? undefined,
      message: inv.message ?? undefined,
      user: inv.user
        ? {
            id: inv.user.id,
            name: inv.user.name,
            email: inv.user.email,
            image: inv.user.image ?? undefined,
          }
        : undefined,
      userId: inv.userId ?? undefined,
    }));

    return {
      success: true,
      data: typedInvitations,
    };
  } catch (error) {
    console.error("[v0] getProjectInvitations error:", error);
    return {
      success: false,
      error: "Failed to fetch invitations",
    };
  }
}

/**
 * Cancel an invitation
 */
export async function cancelInvitation(
  invitationId: string,
  projectId: string,
  userId: string
): Promise<ContributorActionResponse> {
  try {
    const invitation = await db.projectInvitation.findUnique({
      where: { id: invitationId },
      include: { inviter: true },
    });

    if (!invitation) {
      return {
        success: false,
        error: "Invitation not found",
      };
    }

    if (invitation.projectId !== projectId || invitation.inviterId !== userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await db.projectInvitation.update({
      where: { id: invitationId },
      data: { status: "cancelled" },
    });

    return {
      success: true,
      message: "Invitation cancelled",
    };
  } catch (error) {
    console.error("[v0] cancelInvitation error:", error);
    return {
      success: false,
      error: "Failed to cancel invitation",
    };
  }
}

/**
 * Remove a collaborator from a project
 */
export async function removeCollaborator(
  collaboratorId: string,
  projectId: string,
  userId: string
): Promise<ContributorActionResponse> {
  try {
    const collaborator = await db.projectCollaborator.findUnique({
      where: { id: collaboratorId },
    });

    if (!collaborator || collaborator.projectId !== projectId) {
      return {
        success: false,
        error: "Collaborator not found",
      };
    }

    // Check if user has permission to remove (must be admin)
    const requesterRole = await db.projectCollaborator.findFirst({
      where: { projectId, userId },
    });

    if (!requesterRole || requesterRole.role !== "admin") {
      return {
        success: false,
        error: "Unauthorized - only admins can remove collaborators",
      };
    }

    await db.projectCollaborator.update({
      where: { id: collaboratorId },
      data: {
        status: "removed",
        removedAt: new Date(),
        removedBy: userId,
      },
    });

    return {
      success: true,
      message: "Collaborator removed",
    };
  } catch (error) {
    console.error("[v0] removeCollaborator error:", error);
    return {
      success: false,
      error: "Failed to remove collaborator",
    };
  }
}

/**
 * Update collaborator role
 */
export async function updateCollaboratorRole(
  collaboratorId: string,
  projectId: string,
  newRole: ContributorRole,
  userId: string
): Promise<ContributorActionResponse<ProjectCollaborator>> {
  try {
    const collaborator = await db.projectCollaborator.findUnique({
      where: { id: collaboratorId },
    });

    if (!collaborator || collaborator.projectId !== projectId) {
      return {
        success: false,
        error: "Collaborator not found",
      };
    }

    // Check if user has permission to update (must be admin)
    const requesterRole = await db.projectCollaborator.findFirst({
      where: { projectId, userId },
    });

    if (!requesterRole || requesterRole.role !== "admin") {
      return {
        success: false,
        error: "Unauthorized - only admins can update roles",
      };
    }

    const updated = await db.projectCollaborator.update({
      where: { id: collaboratorId },
      data: { role: newRole },
      include: { user: true },
    });

    // Map to typed response
    const typedCollaborator: ProjectCollaborator = {
      id: updated.id,
      projectId: updated.projectId,
      userId: updated.userId,
      user: {
        id: updated.user.id,
        name: updated.user.name,
        email: updated.user.email,
        image: updated.user.image ?? undefined,
      },
      role: updated.role as ContributorRole,
      status: updated.status as ProjectCollaborator["status"],
      addedAt: updated.addedAt,
      updatedAt: updated.updatedAt,
      invitedBy: updated.invitedBy ?? undefined,
      removedAt: updated.removedAt ?? undefined,
      removedBy: updated.removedBy ?? undefined,
    };

    return {
      success: true,
      data: typedCollaborator,
      message: "Role updated successfully",
    };
  } catch (error) {
    console.error("[v0] updateCollaboratorRole error:", error);
    return {
      success: false,
      error: "Failed to update role",
    };
  }
}

/**
 * Accept an invitation (to be called from invitation page)
 */
export async function acceptInvitation(
  token: string,
  userId: string
): Promise<ContributorActionResponse> {
  try {
    const invitation = await db.projectInvitation.findUnique({
      where: { token },
      include: { inviter: true },
    });

    if (!invitation) {
      return {
        success: false,
        error: "Invitation not found",
      };
    }

    if (invitation.status !== "pending" || invitation.expiresAt < new Date()) {
      return {
        success: false,
        error: "Invitation is no longer valid",
      };
    }

    // Create collaborator record
    await db.projectCollaborator.create({
      data: {
        projectId: invitation.projectId,
        userId,
        role: invitation.role,
        status: "active",
      },
    });

    // Update invitation status
    await db.projectInvitation.update({
      where: { id: invitation.id },
      data: {
        status: "accepted",
        respondedAt: new Date(),
        userId,
      },
    });

    // Send acceptance notification to inviter
    const [acceptingUser, project] = await Promise.all([
      db.user.findUnique({ where: { id: userId } }),
      db.project.findUnique({
        where: { id: invitation.projectId },
        select: { id: true, name: true },
      }),
    ]);

    if (acceptingUser && project && invitation.inviter.email) {
      const acceptanceEmail = generateAcceptanceEmail({
        userName: acceptingUser.name || "A user",
        projectName: project.name,
      });
      const user = await getAuthUser();
      await resend.emails.send({
        from: user?.email || FROM_EMAIL,
        to: invitation.inviter.email,
        subject: `${acceptingUser.name} accepted your invitation to ${project.name}`,
        html: acceptanceEmail,
      });
    }

    return {
      success: true,
      message: "Invitation accepted successfully",
    };
  } catch (error) {
    console.error("[v0] acceptInvitation error:", error);
    return {
      success: false,
      error: "Failed to accept invitation",
    };
  }
}

/**
 * Decline an invitation
 */
export async function declineInvitation(
  token: string
): Promise<ContributorActionResponse> {
  try {
    const invitation = await db.projectInvitation.findUnique({
      where: { token },
    });

    if (!invitation) {
      return {
        success: false,
        error: "Invitation not found",
      };
    }

    await db.projectInvitation.update({
      where: { id: invitation.id },
      data: {
        status: "declined",
        respondedAt: new Date(),
      },
    });

    return {
      success: true,
      message: "Invitation declined",
    };
  } catch (error) {
    console.error("[v0] declineInvitation error:", error);
    return {
      success: false,
      error: "Failed to decline invitation",
    };
  }
}
