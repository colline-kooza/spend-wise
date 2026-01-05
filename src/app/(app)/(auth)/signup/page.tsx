import { redirect } from "next/navigation";
import React, { Suspense } from "react";

import { getAuthUser } from "@/auth-lib/auth";

import AuthLoadingSkeleton from "../components/AuthLoading";
import GradientBackground from "../components/GradientBackground";
import Signup from "../components/signup";

export default async function page() {
  const user = await getAuthUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <Suspense fallback={<AuthLoadingSkeleton />}>
      <GradientBackground variant="default">
        <Signup />
      </GradientBackground>
    </Suspense>
  );
}
