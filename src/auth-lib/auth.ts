/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Subscription } from "@better-auth/stripe";
import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";
import { headers } from "next/headers";
import Stripe from "stripe";

import { sendEmail } from "@/app/(app)/(auth)/actions/users";

import { pricingData } from "./pricing";
import db from "./prisma";
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});
export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        url: url,
      });
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified ?? true,
          phone: null,
          role: "USER",
          jobTitle: null,
          bio: null,
          institutionId: null,
        };
      },
    },
  },
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      phone: {
        type: "string",
        required: false,
      },
      jobTitle: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [
    nextCookies(),
    // admin(),
    organization({
      organizationHooks: {
        beforeAddMember: async ({ member, user, organization }) => {
          // Custom validation or modification
          console.log(`Adding ${user.email} to ${organization.name}`);
          console.log("MEMBER TO BE ADDED", member);
          // Optionally modify member data
        },
        // After a member is added
        afterAddMember: async ({ member }) => {
          // Send welcome email, create default resources, etc.
          console.log("MEMBER CREATED", member);
          // await sendWelcomeEmail(user.email, organization.name);
        },
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      onCustomerCreate: async ({ stripeCustomer, user }) => {
        console.log(
          `Customer ${stripeCustomer.id} created for user ${user.id}`
        );
      },
      subscription: {
        enabled: true,
        authorizeReference: async ({ user, referenceId, action }) => {
          if (action === "list-subscription") {
            const org = await db.member.findFirst({
              where: {
                organizationId: referenceId,
                userId: user.id,
              },
            });

            // Log for debugging
            console.log("Authorization check:", {
              action,
              userId: user.id,
              referenceId,
              memberFound: !!org,
              role: org?.role,
            });

            // Allow any member of the organization to view subscriptions
            return !!org; // ✅ Any member can view
          }
          return true;
        },
        plans: pricingData.plans.map((plan) => ({
          name: plan.slug, // ⚠️ CRITICAL: Use slug here, not plan.name
          priceId: plan.priceId,
          limits: plan.limits,
        })),
      },
    }),
  ],
});
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
export async function getAuthUser(): Promise<User | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user as User;
  return user;
}
export async function getActiveOrgId(): Promise<string | null | undefined> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let orgId = session?.session.activeOrganizationId;

  // If no active org, create one or find existing
  if (!orgId && session?.user) {
    console.log("No active organization found, checking for existing org...");

    try {
      const user = session.user;
      const token = session.session.token;

      // Prepare organization data
      const metadata = { someKey: "someValue" };
      const orgName: string = `${user.name.split(" ")[0]}-Org`;
      const slug: string = user.email.split("@")[0].trim().toLowerCase();

      // Check if organization already exists by slug
      let orgData = await db.organization.findUnique({
        where: {
          slug: slug,
        },
      });

      if (orgData) {
        console.log("✅ Organization found by slug:", orgData.id);
      } else {
        // Create organization directly in database
        orgData = await db.organization.create({
          data: {
            name: orgName,
            slug: slug,
            logo: "https://example.com/logo.png",
            metadata: JSON.stringify(metadata),
          },
        });

        console.log("✅ Organization created in DB:", orgData.id);

        // Create member record linking user to organization as owner
        await db.member.create({
          data: {
            userId: user.id,
            organizationId: orgData.id,
            role: "owner",
          },
        });

        console.log("✅ Member record created");
      }

      // Update session to set active organization
      await db.session.update({
        where: {
          token: token as string,
        },
        data: {
          activeOrganizationId: orgData.id,
        },
      });

      console.log("✅ Active organization set in session:", orgData.id);

      // Return the org ID (either found or newly created)
      orgId = orgData.id;
    } catch (orgError) {
      console.error("❌ Organization lookup/creation failed:", orgError);
      throw orgError;
    }
  }

  return orgId;
}
// export async function getActiveOrgId(): Promise<string | null | undefined> {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });
//   let orgId = session?.session.activeOrganizationId;
//   //create org

//   console.log("SESSION FROM CHECK PAGE", session);

//   return orgId;
// }
export async function getActiveSubscriptionsByCustomerId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return null; // Changed from pricingData.plans[0]
  }
  try {
    const customerId = (session.user as { stripeCustomerId?: string })
      .stripeCustomerId;

    // If no customerId, return null (user hasn't subscribed yet)
    if (!customerId) {
      return null;
    }

    const subscriptions = await stripeClient.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 100,
    });

    const activeSubs = subscriptions.data;

    // If no active subscriptions, return null
    if (activeSubs.length === 0) {
      return null;
    }

    const activeSub =
      activeSubs.length > 1
        ? activeSubs.find(
            (sub) => sub.status === "active" || sub.status === "trialing"
          )
        : activeSubs[0];

    const priceId = activeSub?.items.data[0].price.id;
    const plan = pricingData.plans.find((plan) => plan.priceId === priceId);

    const subscription = subscriptions.data[0];
    const item = subscription.items.data[0];

    const now = Math.floor(Date.now() / 1000);
    const end =
      (subscription as any).current_period_end ||
      item.current_period_end ||
      (item as any).current_period_end;

    const remainingDays = Math.max(0, Math.ceil((end - now) / 86400));

    return { plan, remainingDays };
  } catch (error) {
    console.error("Error fetching active subscriptions:", error);
    return null; // Changed from returning a default plan
  }
}
export async function getActiveSubscription(): Promise<{
  status: boolean;
  message?: string;
  subscription: Subscription | null;
}> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      status: false,
      message: "You need to be logged in.",
      subscription: null,
    };
  }
  try {
    // Get the active organization ID from session
    const activeOrgId = session.session.activeOrganizationId;
    // console.log("ACTIVE ORG ID", activeOrgId);
    if (!activeOrgId) {
      console.log("No active organization found");
      return {
        status: false,
        message:
          "No active organization. Please select or create an organization.",
        subscription: null,
      };
    }
    // Pass the referenceId (organization ID) to list subscriptions
    const activeSubs = await auth.api.listActiveSubscriptions({
      headers: await headers(),
      query: {
        referenceId: activeOrgId,
      },
    });
    console.log("SUBS", activeSubs);

    const activeSub =
      activeSubs.length > 1
        ? activeSubs.find(
            (sub: any) => sub.status === "active" || sub.status === "trialing"
          )
        : activeSubs[0];

    return {
      subscription: activeSub ?? null,
      status: true,
    };
  } catch (error) {
    console.log("Error fetching subscription:", error);
    return {
      status: false,
      message: "Something went wrong.",
      subscription: null,
    };
  }
}
export async function updateExistingSubscription(
  subId: string,
  switchToPriceId: string
): Promise<{ status: boolean; message: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      status: false,
      message: "You need to be logged in.",
    };
  }
  if (!subId || !switchToPriceId) {
    return {
      status: false,
      message: "Invalid parameters.",
    };
  }
  try {
    const subscription = await stripeClient.subscriptions.retrieve(subId);
    if (!subscription.items.data.length) {
      return {
        status: false,
        message: "Invalid subscription. No subscription items found!",
      };
    }
    await stripeClient.subscriptions.update(subId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: switchToPriceId,
        },
      ],
      cancel_at_period_end: false,
      proration_behavior: "create_prorations",
    });
    return {
      status: true,
      message: "Subscription updated successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Something went wrong while updating the subcription.",
    };
  }
}

export async function getActiveOrgName(): Promise<string | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const orgId = session?.session.activeOrganizationId;

  if (!orgId) {
    return null;
  }

  try {
    // Fetch the organization from database
    const organization = await db.organization.findUnique({
      where: {
        id: orgId,
      },
      select: {
        name: true,
      },
    });

    return organization?.name ?? null;
  } catch (error) {
    console.error("Error fetching organization name:", error);
    return null;
  }
}
export async function getBillingHistory() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return [];

  const customerId = (session.user as { stripeCustomerId?: string })
    .stripeCustomerId;

  const invoices = await stripeClient.invoices.list({
    customer: customerId,
    limit: 100,
  });

  const billingHistory = invoices.data.map((inv) => ({
    id: inv.id,
    date: new Date(inv.created * 1000).toISOString().slice(0, 10), // yyyy-mm-dd
    amount: (inv.amount_paid ?? inv.total) / 100, // fallback to total
    status: inv.status ?? "unknown",
    invoiceUrl: inv.hosted_invoice_url || inv.invoice_pdf || "",
  }));

  // return billingHistory as Invoice[];
  return billingHistory as any;
}
// export async function getRemainingTrialDays() {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session) return [];

//   const customerId = session.user.stripeCustomerId;
//   console.log("CUSTOMER ID", customerId);
//   const subscriptions = await stripeClient.subscriptions.list({
//     customer: customerId,
//     status: "active", // Filter for active status
//     limit: 100, // Adjust limit as needed, or use auto-pagination for more than 100
//   });

//   const subscription = subscriptions.data[0];
//   const item = subscription.items.data[0];

//   const now = Math.floor(Date.now() / 1000);
//   const end =
//     (subscription as any).current_period_end ||
//     item.current_period_end ||
//     (item as any).current_period_end;

//   const remainingDays = Math.max(0, Math.ceil((end - now) / 86400));

//   // console.log(remainingDays);
//   return remainingDays;
// }
