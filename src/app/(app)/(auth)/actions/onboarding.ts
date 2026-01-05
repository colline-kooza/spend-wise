"use server";

import { getActiveSubscriptionsByCustomerId, getAuthUser, getActiveOrgId } from "@/lib/auth";

export async function checkSubscriptionStatus() {
  try {
    const plan = await getActiveSubscriptionsByCustomerId();
    return {
      success: true,
      hasPlan: !!plan,
      plan: plan,
    };
  } catch (error) {
    console.error("Error checking subscription:", error);
    return {
      success: false,
      hasPlan: false,
      error: "Failed to check subscription status",
    };
  }
}

export async function getOnboardingContext() {
  try {
    const user = await getAuthUser();
    const orgId = await getActiveOrgId();

    if (!user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    return {
      success: true,
      user,
      orgId,
    };
  } catch (error) {
    console.error("Error fetching onboarding context:", error);
    return {
      success: false,
      error: "Failed to fetch context",
    };
  }
}
