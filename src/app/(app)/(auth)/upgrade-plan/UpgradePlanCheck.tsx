"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { PricingSection2 } from "@/components/pro-blocks/landing-page/pricing-sections/pricing-section-2";

import { checkSubscriptionStatus } from "../actions/onboarding";
import { PlanSelectionSkeleton } from "../components/LoadingSkeletons";

export default function UpgradePlanCheck() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasPlan, setHasPlan] = useState(false);

  useEffect(() => {
    async function checkPlan() {
      try {
        const result = await checkSubscriptionStatus();

        if (result.success && result.hasPlan) {
          setHasPlan(true);
          router.push("/check");
        } else {
          setHasPlan(false);
        }
      } catch (error) {
        console.error("Failed to check subscription:", error);
        toast.error("Failed to verify subscription status");
      } finally {
        // Add a small delay for better UX to avoid flashing
        setTimeout(() => setLoading(false), 800);
      }
    }

    checkPlan();
  }, [router]);

  if (loading) {
    return <PlanSelectionSkeleton text="Checking subscription status..." />;
  }

  if (hasPlan) {
    // Return null while redirecting
    return <PlanSelectionSkeleton text="Checking subscription status..." />;
  }

  return <PricingSection2 page="upgrade" smallTitle="Select your Plan" />;
}
