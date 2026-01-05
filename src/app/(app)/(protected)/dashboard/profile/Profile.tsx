"use client";
import React from "react";
import { User } from "@/lib/auth";
import { AccountInfo } from "./components/AccountInfo";
import { PersonalInfo } from "./components/PersonalInfo";
import { ProfessionalInfo } from "./components/ProfessionalInfo";
import { ProfileImage } from "./components/ProfileImage";

export default function Profile({ user }: { user: User }) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <ProfileImage user={user} />
          <AccountInfo user={user} />
        </div>
        <div className="space-y-6">
          <PersonalInfo user={user} />
          <ProfessionalInfo user={user} />
        </div>
      </div>
    </div>
  );
}
