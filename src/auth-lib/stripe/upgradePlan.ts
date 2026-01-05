"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { pricingData } from "../pricing";
import db from "../prisma";

type UpgradePlanResult = {
  success: boolean;
  url: string | null;
  error: string | null;
};

export async function upgradePlan(
  planSlug: string
): Promise<UpgradePlanResult> {
  // console.log("🚀 upgradePlan called with planSlug:", planSlug);

  try {
    // Get current session with retry
    // console.log("📝 Fetching session...");
    let session = null;
    let attempts = 0;
    const maxAttempts = 3;

    while (!session && attempts < maxAttempts) {
      try {
        session = await auth.api.getSession({
          headers: await headers(),
        });
        if (session) break;
      } catch (err) {
        console.log(
          `⏳ Session fetch attempt ${attempts + 1} failed, retrying...`
        );
      }
      attempts++;
      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    // console.log("✅ Session fetched:", session?.user?.id);

    if (!session) {
      console.error("❌ No session found after", maxAttempts, "attempts");
      return {
        success: false,
        url: null,
        error: "User not authenticated. Please try again.",
      };
    }

    // Find the plan
    // console.log("🔍 Looking for plan:", planSlug);
    const plan = pricingData.plans.find((p) => p.slug === planSlug);
    // console.log("📦 Plan found:", plan?.name);

    if (!plan) {
      console.error("❌ Plan not found for slug:", planSlug);
      return {
        success: false,
        url: null,
        error: "Plan not found",
      };
    }

    // Ensure user has an organization - CREATE IF NEEDED
    let referenceId = session.session.activeOrganizationId;
    // console.log("🏢 Active organization ID:", referenceId);

    if (!referenceId) {
      // console.log("🔍 No active org, checking for existing organizations...");
      const member = await db.member.findFirst({
        where: {
          userId: session.user.id,
        },
        include: {
          organization: true,
        },
      });
      // console.log("👥 Member found:", member?.organizationId);

      if (member) {
        referenceId = member.organizationId;
        // console.log("✅ Using existing org:", referenceId);

        // Set this as the active organization
        await auth.api.setActiveOrganization({
          headers: await headers(),
          body: {
            organizationId: referenceId,
          },
        });
      } else {
        console.log("🆕 Creating new organization...");
        const defaultOrg = await db.organization.create({
          data: {
            name: `${session.user.firstName}'s Organization`,
            slug: `${session.user.firstName.toLowerCase()}-${Date.now()}`,
            members: {
              create: {
                userId: session.user.id,
                role: "owner",
              },
            },
          },
        });
        // console.log("✅ New org created:", defaultOrg.id);

        referenceId = defaultOrg.id;

        // Set as active organization
        await auth.api.setActiveOrganization({
          headers: await headers(),
          body: {
            organizationId: referenceId,
          },
        });
      }
    }

    // FREE TRIAL PLAN - Create subscription but DON'T redirect to Stripe
    if (planSlug === "free-trial") {
      // console.log("🎁 Free trial plan - creating subscription without payment");

      try {
        // Create the subscription in your system (not Stripe)
        await auth.api.upgradeSubscription({
          body: {
            plan: planSlug,
            annual: false,
            referenceId,
            seats: 1,
            // No successUrl or cancelUrl needed for free trial
          },
          headers: await headers(),
        });

        // console.log("✅ Free trial subscription created successfully");

        return {
          success: true,
          url: null, // No Stripe URL for free trial
          error: null,
        };
      } catch (error) {
        console.error("❌ Free trial subscription error:", error);
        return {
          success: false,
          url: null,
          error: "Failed to create free trial subscription",
        };
      }
    }

    // PAID PLANS - Create Stripe checkout session
    let seats = 1;
    if (typeof plan.limits.collaborators === "number") {
      seats = plan.limits.collaborators + 1;
    } else if (plan.limits.collaborators === "unlimited") {
      seats = 1;
    }
    console.log("💺 Calculated seats:", seats);

    console.log("💳 Creating Stripe subscription with:", {
      plan: plan.slug,
      annual: plan.period.includes("year"),
      referenceId,
      seats,
    });

    const data = await auth.api.upgradeSubscription({
      body: {
        plan: plan.slug,
        annual: plan.period.includes("year"),
        referenceId,
        seats,
        successUrl: `${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        }/check?success=true`,
        cancelUrl: `${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        }/#pricing`,
      },
      headers: await headers(),
    });

    const checkoutUrl = data?.url;

    if (
      !checkoutUrl ||
      typeof checkoutUrl !== "string" ||
      !checkoutUrl.startsWith("http")
    ) {
      console.error("❌ Invalid checkout URL:", checkoutUrl);
      return {
        success: false,
        url: null,
        error: "Failed to create valid checkout session",
      };
    }

    console.log("✅ Valid checkout URL confirmed:", checkoutUrl);

    return {
      success: true,
      url: checkoutUrl,
      error: null,
    };
  } catch (error) {
    console.error("❌ Upgrade plan error:", error);
    return {
      success: false,
      url: null,
      error: error instanceof Error ? error.message : "Upgrade failed",
    };
  }
}
