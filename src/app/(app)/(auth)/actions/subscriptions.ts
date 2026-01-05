"use server";

import { auth, getActiveSubscription } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
// import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

/**
 * Create a billing portal session
 * Redirects user to Stripe's customer portal where they can:
 * - Update payment methods
 * - View invoices
 * - Cancel subscription
 * - Manage billing details
 */
const BASE_URL = process.env.BETTER_AUTH_URL;
export async function createBillingPortalSession() {
  try {
    const res = await getActiveSubscription();
    const refId = res.subscription?.referenceId || "";
    const data = await auth.api.createBillingPortal({
      body: {
        locale: "auto",
        referenceId: refId,
        returnUrl: `${BASE_URL}/dashboard`,
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });

    if (!data?.url) {
      return {
        success: false,
        error: "No portal URL returned",
      };
    }

    return {
      success: true,
      url: data.url,
    };
  } catch (error) {
    console.error("Error in createBillingPortalSession:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Get billing history for the current user
 * Returns list of invoices from Stripe
 */
export async function getBillingHistory() {
  try {
    const { data: session } = await authClient.getSession();

    if (!session?.user) {
      return {
        success: false,
        error: "Not authenticated",
        invoices: [],
      };
    }

    // Get subscription data which includes billing history
    const { data: subscriptionData, error } =
      await authClient.subscription.getSubscription();

    if (error) {
      console.error("Error fetching subscription data:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch billing history",
        invoices: [],
      };
    }

    // Extract invoices from subscription data
    // Better Auth Stripe plugin stores invoice history in the subscription object
    const invoices = subscriptionData?.invoices || [];

    // Transform invoices to our Invoice interface format
    const formattedInvoices = invoices.map((invoice: any) => ({
      id: invoice.id,
      date: invoice.created
        ? new Date(invoice.created * 1000).toISOString()
        : new Date().toISOString(),
      amount: invoice.amount_paid ? invoice.amount_paid / 100 : 0, // Stripe amounts are in cents
      status:
        invoice.status === "paid"
          ? "paid"
          : invoice.status === "open"
          ? "pending"
          : "failed",
      invoiceUrl: invoice.hosted_invoice_url || invoice.invoice_pdf,
    }));

    return {
      success: true,
      invoices: formattedInvoices,
    };
  } catch (error) {
    console.error("Error in getBillingHistory:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      invoices: [],
    };
  }
}
