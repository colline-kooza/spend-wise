"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";

export function StatsSection() {
  return (
    <section className="bg-background section-padding-y border-b">
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col gap-10 md:gap-12">
          <div className="section-title-gap-lg mx-auto flex max-w-xl flex-col items-center text-center">
            <Tagline>Impact</Tagline>
            <h2 className="heading-lg text-foreground">
              Trusted by film productions worldwide
            </h2>
            <p className="text-muted-foreground">
              From independent films to major studio productions, assistant
              directors rely on WalkieCheck to keep their equipment organized
              and accounted for.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-6 lg:flex-row">
            <Card className="bg-secondary rounded-xl border-none p-6 shadow-none">
              <CardContent className="flex flex-col gap-2 p-0 md:gap-3">
                <h3 className="text-primary font-semibold">
                  Walkie talkies tracked
                </h3>
                <span className="text-foreground text-3xl font-semibold md:text-4xl">
                  50K+
                </span>

                <p className="text-muted-foreground text-base">
                  Devices successfully managed across hundreds of film and TV
                  productions globally.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-secondary rounded-xl border-none p-6 shadow-none">
              <CardContent className="flex flex-col gap-2 p-0 md:gap-3">
                <h3 className="text-primary font-semibold">
                  Time saved per production
                </h3>
                <span className="text-foreground text-3xl font-semibold md:text-4xl">
                  15+ hrs
                </span>
                <p className="text-muted-foreground text-base">
                  Average time saved per week eliminating manual tracking and
                  equipment searches on set.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-secondary rounded-xl border-none p-6 shadow-none">
              <CardContent className="flex flex-col gap-2 p-0 md:gap-3">
                <h3 className="text-primary font-semibold">
                  Equipment recovery rate
                </h3>
                <span className="text-foreground text-3xl font-semibold md:text-4xl">
                  98%
                </span>
                <p className="text-muted-foreground text-base">
                  Of walkie talkies returned on time with complete
                  accountability and tracking history.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
