"use client";

import Image from "next/image";

import { BlurFade } from "@/components/ui/blur-fade";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Highlighter } from "@/components/ui/highlighter";

import { MarqueeCards } from "./dicisions";
import FAQ from "./faqs";
import Features from "./features";
import { Hero } from "./hero-section";
import Pricing from "./pricing";
import Process from "./process";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />

      {/*dashboard section*/}
      <div className="px-0 pb-4 md:px-6">
        <ContainerScroll>
          <Image
            width={1536}
            height={1024}
            src="/images/dash2.png"
            alt="dashboard image"
            className="mx-auto h-full w-full max-w-7xl object-cover"
          />
        </ContainerScroll>

        <figcaption className="mx-auto mt-6 max-w-3xl text-center text-xs text-slate-600 md:text-sm">
          Over <span className="font-semibold text-slate-900">$600M USD</span>{" "}
          tracked across cards and accounts with automated categorization,
          budgets, and reimbursements.
        </figcaption>
      </div>

      {/*features section*/}
      <div>
        <BlurFade delay={0.25} inView>
          <Features />
        </BlurFade>
      </div>

      {/*why section*/}
      <div className="w-full bg-white py-20 lg:py-32">
        <BlurFade delay={0.25} inView>
          <div className="mx-auto mb-[5rem] max-w-3xl text-center">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:mb-8 lg:text-4xl">
              Turn Spending Data Into Smarter Decisions
            </h2>
            <p className="text-xs leading-relaxed font-normal text-slate-600 md:text-[1rem]">
              Transform everyday spending data into meaningful insights that
              help you cut waste, plan better, and{" "}
              <Highlighter action="highlight" color="#dcff79">
                stay in control of your finances.
              </Highlighter>
            </p>
          </div>
          <MarqueeCards />
        </BlurFade>
      </div>

      {/*Process section*/}
      <div>
        <BlurFade delay={0.25} inView>
          <Process />
        </BlurFade>
      </div>

      {/*FAQ section*/}
      <div>
        <BlurFade delay={0.25} inView>
          <FAQ />
        </BlurFade>
      </div>

      {/*Pricing section*/}
      <div>
        <BlurFade delay={0.25} inView>
          <Pricing />
        </BlurFade>
      </div>
    </div>
  );
}
