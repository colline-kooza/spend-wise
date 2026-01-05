import { getActiveSubscriptionsByCustomerId } from "@/auth-lib/auth";
import db from "@/lib/prisma";

export type LimitType = "projects" | "walkies" | "collaborators";

interface LimitCheckResult {
  allowed: boolean;
  limit: number;
  currentCount: number;
  error?: string;
}

export async function checkSubscriptionLimit(
  limitType: LimitType,
  orgId: string,
  projectId?: string
): Promise<LimitCheckResult> {
  try {
    let maxProjects = 1;
    let maxWalkies = 50;
    let maxCollaborators = 0;

    // 1. Try to get active subscription from Stripe (via reliable auth helper)
    // This helper returns the full Plan object from pricingData if a subscription exists
    const activeSubData = await getActiveSubscriptionsByCustomerId();

    if (activeSubData && activeSubData.plan) {
      const limits = activeSubData.plan.limits;
      maxProjects = limits.projects === "unlimited" ? -1 : limits.projects;
      maxWalkies = limits.walkies === "unlimited" ? -1 : limits.walkies;
      maxCollaborators =
        limits.collaborators === "unlimited" ? -1 : limits.collaborators;
    } else {
      // 2. If no valid subscription from Stripe, check DB overrides
      const orgSubscription = await db.organizationSubscription.findUnique({
        where: { organizationId: orgId },
      });

      if (orgSubscription) {
        maxProjects = orgSubscription.maxProjects;
        maxWalkies = orgSubscription.maxWalkieTalkies;
        maxCollaborators = orgSubscription.maxCollaborators;
      }
    }

    let currentCount = 0;
    let limit = 0;
    let errorMessage = "";

    switch (limitType) {
      case "projects":
        // Count active projects for this org/owner
        // Note: Project ownership is tied to User, but if we are in Org context, we might filter by ownerId
        // or if we move to Org-based projects. Currently projects are owned by User (ownerId).
        // BUT the prompt implies restrictions are per User/Org subscription.
        // Let's assume the limits apply to the Organization's set of projects or the User's owned projects.
        // Given `organizationId` is passed, let's look for projects owned by users in that org OR
        // if projects are just owned by the user.
        // The `createProject` action uses `userId`.
        // Let's count projects owned by the user for now as a proxy, or check if Project has orgId (it doesn't seem to).
        // Wait, schema has `Project` owned by `User`. `Organization` has `members`.
        // If the subscription is on the Organization, we should count projects created under that Org context?
        // Current Schema: Project -> ownerId (User).

        // Let's assume the limit applies to the current User's owned projects if they are the owner of the Org.
        // Or simplified: Count projects owned by the user associated with this Org.

        // Actually, let's just count projects owned by the user for simplicity
        // since `createProject` takes `userId`.

        // BUT wait, `checkSubscriptionLimit` takes `orgId`.
        // If the subscription makes sense for the User (UserSubscription), we use that.
        // The schema has `UserSubscription` AND `OrganizationSubscription`.
        // The prompt mentions "Free Trial", "Indie", "Pro" which seem to be SaaS tiers.
        // Usually these are Org level in B2B or User level in B2C.
        // `lib/auth.ts` uses `OrganizationSubscription` in `getActiveSubscription`.

        limit = maxProjects;
        if (limit === -1) {
          return { allowed: true, limit: -1, currentCount: 0 };
        }

        // We need to fetch the count of projects owned by the user who owns this Org?
        // Or just the count of projects linked to the Org?
        // Schema: Project doesn't have organizationId. It has ownerId.
        // Let's fetch the Org to find the owner, then count their projects.
        const org = await db.organization.findUnique({
          where: { id: orgId },
          include: { members: { where: { role: "owner" } } },
        });

        const ownerId = org?.members[0]?.userId;
        if (!ownerId) {
          // Fallback
          return {
            allowed: false,
            limit,
            currentCount: 0,
            error: "Organization owner not found",
          };
        }

        currentCount = await db.project.count({
          where: {
            ownerId: ownerId,
            status: "active",
          },
        });

        errorMessage = `You have reached the limit of ${limit} project${limit === 1 ? "" : "s"} for your current plan.`;
        break;

      case "walkies":
        // Limit is total walkies or per project?
        // Free Trial: "Up to 50 walkie talkies".
        // This usually implies total across the account or per project. Since they only get 1 project, it's the same.
        // Let's check TOTAL walkies owned by this Org/User.
        limit = maxWalkies;
        if (limit === -1) {
          return { allowed: true, limit: -1, currentCount: 0 };
        }

        // Count all walkies in all projects owned by the Org owner
        // First get all project IDs
        const org2 = await db.organization.findUnique({
          where: { id: orgId },
          include: { members: { where: { role: "owner" } } },
        });
        const ownerId2 = org2?.members[0]?.userId;

        if (!ownerId2)
          return {
            allowed: false,
            limit,
            currentCount: 0,
            error: "Owner not found",
          };

        currentCount = await db.walkieTalkie.count({
          where: {
            project: {
              ownerId: ownerId2,
            },
          },
        });

        errorMessage = `You have reached the limit of ${limit} walkie talkies for your current plan.`;
        break;

      case "collaborators":
        limit = maxCollaborators;
        // -1 = Unlimited
        if (limit === -1) {
          return { allowed: true, limit: -1, currentCount: 0 };
        }

        // Count collaborators across all projects? Or just check if allowed (0 vs >0)?
        // "No collaborators" = 0.
        // "Team collaborators" = Unlimited (-1).

        if (limit === 0) {
          return {
            allowed: false,
            limit: 0,
            currentCount: 0,
            error: "Collaborators are not available on your current plan.",
          };
        }

        // If there is a number limit (e.g. 5), we would count.
        // But specific requirement is "No collaborators" or "Unlimited".
        // So if limit > 0, we assume allowed.

        return { allowed: true, limit, currentCount: 0 };
    }

    if (currentCount >= limit) {
      return {
        allowed: false,
        limit,
        currentCount,
        error: errorMessage,
      };
    }

    return {
      allowed: true,
      limit,
      currentCount,
    };
  } catch (error) {
    console.error("Error checking subscription limit:", error);
    // Fail safe: block action if we can't verify
    return {
      allowed: false,
      limit: 0,
      currentCount: 0,
      error: "Failed to verify subscription limits.",
    };
  }
}
