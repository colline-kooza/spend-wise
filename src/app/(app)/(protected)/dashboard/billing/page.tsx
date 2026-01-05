import React from "react";
import SubscriptionPage from "./components/BillingPage";
import { pricingData } from "@/lib/pricing";
import {
  getActiveSubscription,
  getActiveSubscriptionsByCustomerId,
  getBillingHistory,
  // getRemainingTrialDays,
} from "@/lib/auth";

export default async function page() {
  // const remainingDays = await getRemainingTrialDays();
  const billingHistory = await getBillingHistory();
  // console.log(billingHistory , "BILLING DATA");
  // console.log(remainingDays , "Days......");
  const plan = await getActiveSubscriptionsByCustomerId();
  // console.log(plan.remainingDays , "Active Plan");
  // const billingHistory = [
  //   {
  //     id: "inv_123",
  //     date: "2024-10-01",
  //     amount: 4.99,
  //     status: "paid" as const,
  //     invoiceUrl: "https://stripe.com/invoice/123",
  //   },
  //   // ... more invoices
  // ];
  return (
    <SubscriptionPage
      plans={pricingData.plans}
      activePlan={plan.plan.slug}  
      billingHistory={billingHistory}
      remainingTrialDays={plan.remainingDays}
    />
  );
}
