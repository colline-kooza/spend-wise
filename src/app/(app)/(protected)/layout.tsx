/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import {
  getActiveOrgId,
  getActiveOrgName,
  getActiveSubscriptionsByCustomerId,
  getAuthUser,
} from "@/auth-lib/auth";

import DashboardLayout from "./dashboard/components/layout";

export default async function DLayout({ children }: { children: ReactNode }) {
  const orgId = await getActiveOrgId();
  const orgName = await getActiveOrgName();
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch subscription data on the server
  const fetchedSubscriptions = await getActiveSubscriptionsByCustomerId();

  let subscriptionData: {
    plan?: { name: string; priceId: string };
    remainingDays: number;
  } | null = null;
  if (fetchedSubscriptions) {
    // If the API returns an array of plans, use the first one; otherwise use the object directly.
    const raw =
      Array.isArray(fetchedSubscriptions) && fetchedSubscriptions.length > 0
        ? (fetchedSubscriptions[0] as any)
        : (fetchedSubscriptions as any);

    subscriptionData = {
      plan: raw?.plan?.name
        ? { name: raw.plan.name, priceId: raw.plan.priceId ?? "" }
        : undefined,
      remainingDays: (raw?.remainingDays ?? raw?.daysRemaining ?? 0) as number,
    };
  }

  // console.log(subscriptionData, "subscription data before mapping");

  return (
    <DashboardLayout
      orgName={orgName || "Organization"}
      userName={`${user.firstName} ${user.lastName || ""}`}
      userEmail={user.email}
      userImage={user.image}
      userId={user.id}
      orgId={orgId || ""}
      subscriptionData={subscriptionData}
    >
      {children}
    </DashboardLayout>
  );
}
