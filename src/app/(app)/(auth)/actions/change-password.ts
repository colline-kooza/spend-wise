"use server";

import { headers } from "next/headers";
import { auth, getAuthUser } from "@/lib/auth";

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  revokeOtherSessions: boolean;
}

interface ChangePasswordResponse {
  success: boolean;
  error?: string;
}

export async function changePasswordAction(
  input: ChangePasswordInput
): Promise<ChangePasswordResponse> {
  try {
    const user = await getAuthUser();
    if (!user) {
      return {
        success: false,
        error: "Your Not Authorized",
      };
    }
    const headersList = await headers();

    const data = await auth.api.changePassword({
      body: {
        newPassword: input.newPassword,
        currentPassword: input.currentPassword,
        revokeOtherSessions: input.revokeOtherSessions,
      },
      headers: headersList,
    });

    // Check if the response indicates success
    if (data) {
      return {
        success: true,
      };
    }

    return {
      success: false,
      error: "Failed to change password. Please try again.",
    };
  } catch (error: any) {
    console.error("Change password error:", error);

    // Handle specific error messages from Better Auth
    if (error?.message) {
      return {
        success: false,
        error: error.message,
      };
    }

    // Handle common authentication errors
    if (error?.status === 401 || error?.statusCode === 401) {
      return {
        success: false,
        error: "Current password is incorrect.",
      };
    }

    if (error?.status === 400 || error?.statusCode === 400) {
      return {
        success: false,
        error: "Invalid password format. Please check your input.",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
