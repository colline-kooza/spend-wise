import { sendEmail } from "@/app/(auth)/actions/users";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import db from "./prisma";
import { stripe, Subscription } from "@better-auth/stripe";
import Stripe from "stripe";
import { pricingData } from "./pricing";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
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
    },
  },
  plugins: [
    nextCookies(),
    admin(),
    organization({
      schema: {
        organization: {
          additionalFields: {},
        },
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      onCustomerCreate: async ({ stripeCustomer, user }, ctx) => {
        console.log(
          `Customer ${stripeCustomer.id} created for user ${user.id}`
        );
      },
      subscription: {
        enabled: true,
        authorizeReference: async ({ user, session, referenceId, action }) => {
          if (action === "list-subscription") {
            const org = await db.member.findFirst({
              where: {
                organizationId: referenceId,
                userId: user.id,
              },
            });
            return org?.role === "owner";
          }
          // Check if the user has permission to list subscriptions for this reference
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
  console.log(session);
  const orgId = session?.session.activeOrganizationId;
  return orgId;
}

export async function getActiveSubscription(): Promise<{
  status: boolean;
  message?: string;
  subscription: Subscription | null;
}> {
  // const session = await auth.api.getSession({ headers: await headers() });
  // if (!session) {
  //   return {
  //     status: false,
  //     message: "You need to be logged in.",
  //     subscription: null,
  //   };
  // }

  try {
    const activeSubs = await auth.api.listActiveSubscriptions({
      headers: await headers(),
    });
    console.log("SUBS", activeSubs);
    const activeSub =
      activeSubs.length > 1
        ? activeSubs.find(
            (sub) => sub.status === "active" || sub.status === "trialing"
          )
        : activeSubs[0];
    return {
      subscription: activeSub ?? null,
      status: true,
    };
  } catch (error) {
    console.log(error);
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
