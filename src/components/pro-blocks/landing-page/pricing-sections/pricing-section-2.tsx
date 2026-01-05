"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { pricingData } from "@/lib/pricing";
import { upgradeSelectedPlan } from "@/app/(auth)/actions/users";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { upgradePlan } from "@/lib/stripe/upgradePlan";

export function PricingSection2({
  smallTitle = "Pricing",
  page = "",
}: {
  smallTitle?: string;
  page?: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // async function handleUpgrade(selectedPlan: string) {
  //   setLoading(true);
  //   const res = await upgradeSelectedPlan(selectedPlan);
  //   if (res.success) {
  //     toast.success("Upgraded Plan successfully");
  //     setLoading(false);
  //     console.log(res.url);
  //   } else {
  //     toast.error(res.error);
  //     setLoading(false);
  //     console.log(res.error);
  //   }
  // }
  async function handleUpgrade(selectedPlan: string) {
    setLoading(true);
    // Step 4: Handle plan subscription
    const isPaidPlan = selectedPlan && selectedPlan !== "free-trial";

    if (isPaidPlan) {
      // PAID PLAN - Create checkout and redirect to Stripe
      toast.info("Setting up your subscription...");

      try {
        const checkoutData = await upgradePlan(selectedPlan);
        if (checkoutData?.success === true && checkoutData?.url) {
          toast.success("Redirecting to payment...");
          window.location.href = checkoutData.url;
          return;
        } else {
          throw new Error(
            checkoutData?.error || "Failed to create checkout session"
          );
        }
      } catch (checkoutError) {
        console.error("❌ Checkout error:", checkoutError);
        const isNetworkError =
          checkoutError instanceof TypeError &&
          checkoutError.message === "Failed to fetch";

        toast.error("Subscription Setup Failed", {
          description: isNetworkError
            ? "Server error creating checkout. Please contact support or try again."
            : "Could not create checkout session. Please try again.",
          duration: 5000,
        });
        setLoading(false);
        return;
      }
    } else {
      // FREE TRIAL - Create subscription and go to dashboard
      console.log("🎁 Free trial plan - setting up trial subscription");
      toast.info("Setting up your free trial...");

      try {
        const subscriptionResult = await upgradePlan("free-trial");

        if (subscriptionResult?.success) {
          console.log("✅ Free trial active, redirecting to dashboard");
          toast.success("Welcome! Your free trial is ready.");
          router.push("/check");
        } else {
          throw new Error(
            subscriptionResult?.error || "Failed to activate free trial"
          );
        }
      } catch (trialError) {
        console.error("❌ Free trial setup error:", trialError);
        toast.error("Free Trial Setup Failed", {
          description: "Could not activate your trial. Please contact support.",
          duration: 5000,
        });
        router.push("/upgrade-plan");
      } finally {
        setLoading(false);
      }
    }
  }

  // Skeleton Card Component
  const PricingCardSkeleton = ({ index }: { index: number }) => (
    <Card
      className={`
        p-6 shadow-none sm:p-8 
        
        ${
          index === 0
            ? "md:rounded-tl-xl md:rounded-bl-xl md:border-r-0"
            : index === 1
            ? "md:rounded-none md:border-r-0"
            : "md:rounded-tr-xl md:rounded-br-xl"
        }
        
        ${index < 2 ? "bg-transparent border-none shadow-none" : ""}
      `}
    >
      <CardContent className="flex flex-col gap-8 p-0">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Price */}
          <div className="flex items-end gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>

          {/* Button */}
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Features */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-32" />

          <div className="flex flex-col gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-4 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section
      className="bg-secondary section-padding-y border-b "
      aria-labelledby="pricing-section-title-3"
      id="pricing"
    >
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col items-center gap-10 md:gap-12">
          {/* Header */}
          <div className="section-title-gap-lg flex max-w-xl flex-col items-center text-center">
            <Tagline>{smallTitle}</Tagline>

            <h2
              id="pricing-section-title-3"
              className="heading-lg text-foreground"
            >
              Simple pricing for every production size
            </h2>
          </div>

          {/* Pricing Grid */}
          <div className="grid w-full grid-cols-1 gap-4 md:max-w-5xl md:grid-cols-3 md:gap-0">
            {loading ? (
              // Show skeleton loading state
              <>
                {[0, 1, 2].map((index) => (
                  <PricingCardSkeleton key={index} index={index} />
                ))}
              </>
            ) : (
              // Show actual pricing cards
              pricingData.plans.map((plan, index) => (
                <Card
                  key={plan.name}
                  className={`
                    p-6 shadow-none sm:p-8 
                    
                    /* Card spacing + corner styling */
                    ${
                      index === 0
                        ? "md:rounded-tl-xl md:rounded-bl-xl md:border-r-0"
                        : index === 1
                        ? "md:rounded-none md:border-r-0"
                        : "md:rounded-tr-xl md:rounded-br-xl"
                    }

                    /* Highlight Pro Plan */
                    ${
                      plan.highlighted
                        ? "shadow-[0px_0px_0px_6px_rgba(88,28,135,0.05)] md:rounded-xl"
                        : ""
                    }

                    /* Make first two cards background transparent */
                    ${index < 2 ? "bg-transparent border-none shadow-none" : ""}
                  `}
                >
                  <CardContent className="flex flex-col gap-8 p-0">
                    {/* Header Section */}
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-3">
                        <h3
                          className={`text-lg font-semibold ${
                            plan.highlighted ? "text-purple-600" : ""
                          }`}
                        >
                          {plan.name}
                        </h3>
                        <p className="text-muted-foreground text-sm min-h-[40px]">
                          {plan.description}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="flex items-end gap-0.5">
                        <span className="text-4xl font-semibold">
                          ${plan.price}
                        </span>
                        <span className="text-muted-foreground text-base">
                          {plan.period}
                        </span>
                      </div>

                      {/* Button */}
                      {page == "upgrade" ? (
                        <Button
                          onClick={() => handleUpgrade(plan.slug)}
                          variant={
                            plan.variant as VariantProps<
                              typeof buttonVariants
                            >["variant"]
                          }
                          className={`w-full ${
                            plan.highlighted
                              ? "bg-purple-600 hover:bg-purple-700 text-white"
                              : ""
                          }`}
                        >
                          {index === 0
                            ? "Start free trial"
                            : page === "upgrade"
                            ? "Select this Plan"
                            : "Get started"}
                        </Button>
                      ) : (
                        <Link href={plan.link}>
                          <Button
                            variant={
                              plan.variant as VariantProps<
                                typeof buttonVariants
                              >["variant"]
                            }
                            className={`w-full ${
                              plan.highlighted
                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                : ""
                            }`}
                          >
                            {index === 0
                              ? "Start free trial"
                              : page === "upgrade"
                              ? "Select this Plan"
                              : "Get started"}
                          </Button>
                        </Link>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex flex-col gap-4">
                      <p className="text-sm font-medium">
                        {index === 0
                          ? "What's included:"
                          : `Everything in ${
                              pricingData.plans[index - 1].name
                            }, plus:`}
                      </p>

                      <div className="flex flex-col gap-4">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <Check className="text-purple-600 h-5 w-5 shrink-0" />
                            <span className="text-muted-foreground flex-1 text-sm">
                              {feature.name}
                            </span>

                            {/* Tooltip */}
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
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
