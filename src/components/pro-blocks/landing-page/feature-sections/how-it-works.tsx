"use client";

import { FolderPlus, Users, Radio, LineChart } from "lucide-react";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";

export function HowItWorksSection() {
  return (
    <section
      className="bg-secondary section-padding-y border-b"
      id="how-it-works"
    >
      <div className="container-padding-x container mx-auto flex flex-col gap-10 md:gap-12">
        <div className="section-title-gap-lg mx-auto flex max-w-xl flex-col items-center text-center">
          <Tagline>How it works</Tagline>
          <h2 className="heading-lg text-foreground">
            Get started in 2 minutes
          </h2>
          <p className="text-muted-foreground text-base">
            From adding inventory to tracking every device on set, WalkieCheck
            keeps your walkie talkies organized and accounted for throughout
            production.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="bg-background flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-[0px_0px_0px_4px_rgba(7,46,106,0.05)]">
              <FolderPlus className="text-primary h-5 w-5" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                1. Setup Project
              </h3>
              <p className="text-muted-foreground">
                Create your film project and add walkie talkies with serial
                numbers and labels
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="bg-background flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-[0px_0px_0px_4px_rgba(7,46,106,0.05)]">
              <Users className="text-primary h-5 w-5" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                2. Add Departments
              </h3>
              <p className="text-muted-foreground">
                Organize departments and crew members who will receive equipment
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="bg-background flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-[0px_0px_0px_4px_rgba(7,46,106,0.05)]">
              <Radio className="text-primary h-5 w-5" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">3. Distribute</h3>
              <p className="text-muted-foreground">
                Assign walkie talkies to crew members and set return dates
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="bg-background flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-[0px_0px_0px_4px_rgba(7,46,106,0.05)]">
              <LineChart className="text-primary h-5 w-5" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">4. Track</h3>
              <p className="text-muted-foreground">
                Monitor location, status, and complete movement history in
                real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
