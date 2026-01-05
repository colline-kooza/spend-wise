"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { PricingPlan } from "../pricing";

export async function upgradePlan(plan: PricingPlan) {
  try {
    // Calculate seats safely
    let seats = 1; // Default to 1 seat
    if (typeof plan.limits.collaborators === "number") {
      seats = plan.limits.collaborators + 1; // User + collaborators
    } else if (plan.limits.collaborators === "unlimited") {
      seats = 10; // Set a reasonable default for unlimited
    }

    const data = await auth.api.upgradeSubscription({
      body: {
        plan: plan.slug,
        annual: plan.period.includes("year"),
        // Remove subscriptionId - let Better-Auth/Stripe generate it
        seats,
        successUrl: `${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        }/dashboard?success=true`,
        cancelUrl: `${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        }/#pricing`,
      },
      headers: await headers(),
    });

    return data;
  } catch (error) {
    console.error("Upgrade plan error:", error);
    throw error; // Throw instead of returning null so you can handle the error in your UI
  }
}
