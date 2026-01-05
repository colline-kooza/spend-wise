import { redirect } from "next/navigation";
import React from "react";

import { getAuthUser } from "@/auth-lib/auth";

import DashboardPageHeader from "../components/page-header";
import Profile from "./Profile";

export default async function page() {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <DashboardPageHeader
        title="Profile Information"
        subtitle="Update your personal information and profile picture"
      />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <Profile user={user} />
      </div>
    </div>
  );
}
