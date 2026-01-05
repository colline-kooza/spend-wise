/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { APIError } from "better-auth";
import { headers } from "next/headers";
import { Resend } from "resend";

import { setActiveProjectCookie } from "@/auth-lib/actions/active-project";
import { auth, getAuthUser } from "@/auth-lib/auth";
import { pricingData } from "@/auth-lib/pricing";
import PasswordResetEmail from "@/emails/password-reset-email";
import db from "@/lib/prisma";
import type { CreateProjectRequest } from "@/types/projects";

import type {
  ForgotPasswordFormValues,
  LoginFormValues,
  RegisterFormValues,
} from "../types/user.schema";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.BETTER_AUTH_URL || "";

export async function registerUser(data: RegisterFormValues, plan: string) {
  try {
    // Call the register api
    const result = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      },
    });

    const { user, token } = result;
    console.log("✅ CREATED USER:", user.id);

    // Create the Organisation directly in database
    const metadata = { someKey: "someValue" };
    const orgName: string = `${user.name.split(" ")[0]}-Org`;
    const slug: string = user.email.split("@")[0].trim().toLowerCase();

    let orgData;
    try {
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

      // Update session to set active organization
      await db.session.update({
        where: {
          token: token as string,
        },
        data: {
          activeOrganizationId: orgData.id,
        },
      });

      // const project = await db.project.create({
      //   data: {
      //     name: "Default Project",
      //     description: "This is a default project",
      //     status: "active",
      //     ownerId: user.id,
      //   },
      // });
      // await setActiveProjectCookie(project);

      console.log("✅ Active organization set in session:", orgData.id);
    } catch (orgError) {
      console.error("❌ Organization creation failed:", orgError);
      throw orgError;
    }

    // Return organization ID for client-side upgrade
    return {
      success: true,
      data: data,
      error: null,
      organizationId: orgData.id,
      plan: plan,
    };
  } catch (error) {
    console.error("❌ Signup error:", error);
    if (error instanceof APIError) {
      if (error.status === "UNPROCESSABLE_ENTITY") {
        const errorMsg =
          error.message === "Failed to create user"
            ? "Phone Number is Already Taken"
            : "Email is Already Taken";
        return {
          success: false,
          data: null,
          error: errorMsg,
          status: error.status,
        };
      }
      return {
        success: false,
        data: null,
        error: error.message || "Authentication error occurred",
        status: error.status,
      };
    }
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  }
}
export async function createPortal() {
  await auth.api.createBillingPortal({
    body: {
      locale: "en",
      referenceId: "123",
      returnUrl: `${baseUrl}/dashboard`,
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
}
export async function loginUser(data: LoginFormValues) {
  try {
    console.log("🔐 Attempting login for:", data.email);
    // Call the register api
    const result = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    console.log("✅ Login successful:", result);
    return {
      success: true,
      data: data,
      error: null,
    };
  } catch (error) {
    // Log the full error object to see what we're dealing with
    console.error("❌ Login error:", error);
    console.error("Error type:", error?.constructor?.name);
    console.error("Error keys:", Object.keys(error || {}));
    if (error instanceof APIError) {
      console.log("📛 APIError details:", {
        message: error.message,
        status: error.status,
        body: (error as any).body,
      });
      if (error.status === "UNAUTHORIZED") {
        return {
          success: false,
          data: null,
          error: error.message,
          status: error.status,
        };
      }
      // Handle other API errors
      return {
        success: false,
        data: null,
        error: error.message || "Authentication failed",
        status: error.status,
      };
    }
    // Log non-APIError errors with more detail
    console.error("🔍 Non-APIError caught:", {
      message: (error as any)?.message,
      stack: (error as any)?.stack,
      error: error,
    });
    return {
      success: false,
      data: null,
      error: (error as any)?.message || "Something went wrong",
    };
  }
}
type SendMailData = {
  to: string;
  subject: string;
  url: string;
};
export async function sendEmail(data: SendMailData) {
  try {
    const { data: resData, error } = await resend.emails.send({
      from: "Ads Market Pro <info@desishub.com>",
      to: data.to,
      subject: data.subject,
      react: PasswordResetEmail({
        userEmail: data.to,
        resetLink: data.url,
        expirationTime: "10 Mins",
      }),
    });
    if (error) {
      console.log("ERROR", error);
      return {
        success: false,
        error: error,
        data: null,
      };
    }
    console.log("SUCCESS DATA", data);
    return {
      success: false,
      error: null,
      data: resData,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      data: null,
    };
  }
}
export async function sendForgotPasswordToken(
  formData: ForgotPasswordFormValues
) {
  try {
    // console.log(data);
    // Call the register api
    // const data = await auth.api.forgetPassword({
    //   body: {
    //     email: formData.email, // required
    //     redirectTo: `${baseUrl}/reset-password`,
    //   },
    // });
    // Others
    return {
      success: true,
      // data: data,
      error: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
      if (error.status === "UNAUTHORIZED") {
        return {
          success: false,
          data: null,
          error: error.message,
          status: error.status,
        };
      }
    }
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  }
}
export async function resetPassword(formData: {
  newPassword: string;
  token: string;
}) {
  try {
    // console.log(data);
    // Call the register api
    const data = await auth.api.resetPassword({
      body: {
        newPassword: formData.newPassword, // required
        token: formData.token, // required
      },
    });
    // Others
    return {
      success: true,
      data: data,
      error: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
      if (error.status === "UNAUTHORIZED") {
        return {
          success: false,
          data: null,
          error: error.message,
          status: error.status,
        };
      }
    }
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  }
}

export async function upgradeSelectedPlan(selectedPlan: string) {
  const plan = pricingData.plans.find((p) => p.slug === selectedPlan);
  console.log(plan);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session?.session);
  if (!plan || !session) {
    return {
      success: false,
      url: null,
      error: "Failed to create valid checkout session",
    };
  }
  const referenceId = session.session.activeOrganizationId;
  if (!referenceId) {
    return {
      success: false,
      url: null,
      error: "Failed to create valid checkout session",
    };
  }
  try {
    const data = await auth.api.upgradeSubscription({
      body: {
        plan: plan.slug,
        annual: plan.period.includes("year"),
        referenceId,
        seats: 1,
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
    return {
      success: true,
      url: null,
      error: null,
    };
  }
}

export async function createProject(data: CreateProjectRequest) {
  const user = await getAuthUser();
  if (!user) {
    return {
      success: false,
    };
  }
  const project = await db.project.create({
    data: {
      name: data.name,
      description: data.description,
      status: data.status || "active",
      ownerId: user.id,
    },
  });
  if (!project) {
    return {
      success: false,
    };
  }
  await setActiveProjectCookie(project);
  return {
    success: true,
  };
}
