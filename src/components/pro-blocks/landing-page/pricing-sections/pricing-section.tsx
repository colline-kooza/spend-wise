"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Check, Info, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";

const pricingData = {
  plans: [
    {
      name: "Free Trial",
      description:
        "Perfect for testing WalkieCheck on a small production or short film.",
      features: [
        {
          name: "14-day trial period",
          tooltip: "Full access for two weeks",
          available: true,
        },
        {
          name: "Up to 50 walkie talkies",
          tooltip: "Maximum 50 devices can be tracked",
          available: true,
        },
        {
          name: "1 project only",
          tooltip: "Manage one film production at a time",
          available: true,
        },
        {
          name: "No collaborators",
          tooltip: "Single user access only",
          available: true,
        },
        {
          name: "Basic tracking & history",
          tooltip: "Core tracking features included",
          available: true,
        },
        {
          name: "Unlimited walkie talkies",
          tooltip: "Available in paid plans",
          available: false,
        },
        {
          name: "Unlimited projects",
          tooltip: "Available in Pro plan",
          available: false,
        },
        {
          name: "Team collaborators",
          tooltip: "Available in Pro plan",
          available: false,
        },
        {
          name: "Advanced analytics",
          tooltip: "Available in Pro plan",
          available: false,
        },
        {
          name: "Priority support",
          tooltip: "Available in Pro plan",
          available: false,
        },
      ],
      price: 0,
      period: "/14 days",
      variant: "outline",
      link: "/dashboard",
    },
    {
      name: "Indie",
      description:
        "Ideal for independent filmmakers and small production teams.",
      features: [
        {
          name: "Unlimited walkie talkies",
          tooltip: "Track as many devices as you need",
          available: true,
        },
        {
          name: "1 project",
          tooltip: "Manage one active production",
          available: true,
        },
        {
          name: "No collaborators",
          tooltip: "Single user access",
          available: true,
        },
        {
          name: "Full tracking & history",
          tooltip: "Complete movement trails and status tracking",
          available: true,
        },
        {
          name: "Email support",
          tooltip: "Get help when you need it",
          available: true,
        },
        {
          name: "Unlimited projects",
          tooltip: "Available in Pro plan",
          available: false,
        },
        {
          name: "Team collaborators",
          tooltip: "Available in Pro plan",
          available: false,
        },
        {
          name: "Advanced analytics",
          tooltip: "Available in Pro plan",
          available: false,
        },
        {
          name: "Priority support",
          tooltip: "Available in Pro plan",
          available: false,
        },
        {
          name: "Export & reporting",
          tooltip: "Available in Pro plan",
          available: false,
        },
      ],
      price: 4.99,
      period: "/month",
      variant: "outline",
      link: "/dashboard",
    },
    {
      name: "Pro",
      description:
        "For professional assistant directors managing multiple productions.",
      features: [
        {
          name: "Unlimited walkie talkies",
          tooltip: "No limits on devices tracked",
          available: true,
        },
        {
          name: "Unlimited projects",
          tooltip: "Manage multiple film productions simultaneously",
          available: true,
        },
        {
          name: "Team collaborators",
          tooltip: "Invite team members to manage together",
          available: true,
        },
        {
          name: "Advanced analytics",
          tooltip: "Detailed insights and reports",
          available: true,
        },
        {
          name: "Priority support",
          tooltip: "Fast-track assistance when needed",
          available: true,
        },
        {
          name: "Export & reporting",
          tooltip: "Generate production reports",
          available: true,
        },
      ],
      price: 9.99,
      period: "/month",
      variant: "default",
      highlighted: true,
      link: "/dashboard",
    },
  ],
};

export function PricingSection() {
  return (
    <section
      className="bg-secondary section-padding-y border-b"
      aria-labelledby="pricing-section-title-3"
      id="pricing"
    >
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col items-center gap-10 md:gap-12">
          {/* Section Header */}
          <div className="section-title-gap-lg flex max-w-xl flex-col items-center text-center">
            {/* Category Tag */}
            <Tagline>Pricing</Tagline>
            {/* Main Title */}
            <h2
              id="pricing-section-title-3"
              className="heading-lg text-foreground"
            >
              Simple pricing for every production size
            </h2>
          </div>

          {/* Three-Column Pricing Cards */}
          <div className="grid w-full grid-cols-1 gap-4 md:max-w-5xl md:grid-cols-3 md:gap-0">
            {pricingData.plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`p-6 shadow-none sm:p-8 ${
                  index === 0
                    ? "md:rounded-tl-xl md:rounded-tr-none md:rounded-br-none md:rounded-bl-xl md:border-r-0"
                    : index === 1
                    ? "md:rounded-none md:border-r-0"
                    : "md:rounded-tr-xl md:rounded-tl-none md:rounded-bl-none md:rounded-br-xl"
                } ${
                  plan.highlighted
                    ? "shadow-[0px_0px_0px_6px_rgba(7,46,106,0.05)] md:rounded-xl md:border-r-1"
                    : ""
                }`}
              >
                {/* Card Content Container */}
                <CardContent className="flex flex-col gap-8 p-0">
                  {/* Plan Header Section */}
                  <div className="flex flex-col gap-6">
                    {/* Plan Title and Description Block */}
                    <div className="relative flex flex-col gap-3">
                      <h3
                        className={`text-lg font-semibold ${
                          plan.highlighted ? "text-primary" : ""
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p className="text-muted-foreground text-sm min-h-[40px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price Display with Currency and Period */}
                    <div className="flex items-end gap-0.5">
                      <span className="text-4xl font-semibold">
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground text-base">
                        {plan.period}
                      </span>
                    </div>

                    {/* Call-to-Action Button */}
                    <Link href={plan.link}>
                      <Button
                        variant={
                          plan.variant as VariantProps<
                            typeof buttonVariants
                          >["variant"]
                        }
                        className="w-full"
                      >
                        {index === 0 ? "Start free trial" : "Get started"}
                      </Button>
                    </Link>
                  </div>

                  {/* Features List Section */}
                  <div className="flex flex-col gap-4">
                    {/* Features Header */}
                    <p className="text-sm font-medium">
                      {index === 0
                        ? "What's included:"
                        : `Everything in ${
                            pricingData.plans[index - 1].name
                          }, plus:`}
                    </p>
                    {/* Features Grid with Tooltips */}
                    <div className="flex flex-col gap-4">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          {feature.available ? (
                            <Check className="text-primary h-5 w-5 shrink-0" />
                          ) : (
                            <X className="text-red-500 h-5 w-5 shrink-0" />
                          )}
                          <span
                            className={`flex-1 text-sm ${
                              feature.available
                                ? "text-muted-foreground"
                                : "text-muted-foreground/60 line-through"
                            }`}
                          >
                            {feature.name}
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="text-muted-foreground h-4 w-4 shrink-0 cursor-pointer opacity-70 hover:opacity-100" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
