"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import Image from "next/image";
import Link from "next/link";
import PremiumButtonShowcase from "./Showcase";

export function HeroSection() {
  return (
    <section
      className=" bg-grid-radial section-padding-y"
      aria-labelledby="hero-heading"
    >
      <div className="container-padding-x container mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left Column */}
        <div className="flex flex-1 flex-col gap-6 lg:gap-8">
          {/* Section Title */}
          <div className="section-title-gap-xl flex flex-col">
            {/* Tagline */}
            <Tagline>WalkieCheck</Tagline>
            {/* Main Heading */}
            <h1 id="hero-heading" className="heading-xl">
              Know where every walkie talkie is, at every moment
            </h1>
            {/* Description */}
            <p className="text-muted-foreground text-base lg:text-lg">
              The complete inventory management solution for assistant directors
              managing walkie talkies across film productions
            </p>
          </div>

          {/* Feature List */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex items-start gap-3">
              <div className="pt-0.5">
                <Check className="text-primary h-5 w-5" />
              </div>
              <span className="text-card-foreground text-base leading-6 font-medium">
                Real-time location tracking by department and crew member
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="pt-0.5">
                <Check className="text-primary h-5 w-5" />
              </div>
              <span className="text-card-foreground text-base leading-6 font-medium">
                Complete movement history for every device
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="pt-0.5">
                <Check className="text-primary h-5 w-5" />
              </div>
              <span className="text-card-foreground text-base leading-6 font-medium">
                Instant status updates: available, in use, or faulty
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant={"premium"} asChild>
              <Link href={"/dashboard"}>Start tracking free</Link>
            </Button>
            <Button variant="glass">
              See how it works
              <ArrowRight />
            </Button>
            {/* <Button variant="ghost">
              See how it works
              <ArrowRight />
            </Button> */}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full flex-1">
          <AspectRatio ratio={1 / 1}>
            <Image
              src="/Hero.png"
              alt="Assistant director managing walkie talkie inventory on set"
              fill
              priority
              className="h-full w-full rounded-xl object-cover"
            />
          </AspectRatio>
        </div>
      </div>
      {/* <PremiumButtonShowcase /> */}
    </section>
  );
}
