// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { adminClient, organizationClient } from "better-auth/client/plugins";
import { stripeClient } from "@better-auth/stripe/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    adminClient(),
    stripeClient({
      subscription: true,
    }),
    organizationClient(),
  ],
});

// Export individual methods
export const { signIn, signUp, useSession, signOut } = authClient;

// ✅ Export organization methods from authClient
export const organization = authClient.organization;
