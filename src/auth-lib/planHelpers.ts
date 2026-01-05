import { pricingData } from "@/lib/pricing";

/**
 * Map Stripe price ID to plan slug
 * Better Auth Stripe plugin returns priceId, we need to map it to our plan slug
 */
export function getPlanSlugFromPriceId(priceId: string): string | undefined {
  const plan = pricingData.plans.find((p) => p.priceId === priceId);
  return plan?.slug;
}

/**
 * Map plan slug to Stripe price ID
 */
export function getPriceIdFromPlanSlug(slug: string): string | undefined {
  const plan = pricingData.plans.find((p) => p.slug === slug);
  return plan?.priceId;
}

/**
 * Get plan details by either slug or priceId
 */
export function getPlanDetails(identifier: string) {
  // Try to find by slug first
  let plan = pricingData.plans.find((p) => p.slug === identifier);

  // If not found, try by priceId
  if (!plan) {
    plan = pricingData.plans.find((p) => p.priceId === identifier);
  }

  return plan;
}
