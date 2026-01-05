"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Info, ExternalLink, Download } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { PricingPlan } from "@/lib/pricing";
import { BillingPortalButton } from "./BillingPortalButton";
import { upgradeSelectedPlan } from "@/app/(auth)/actions/users";
import React from "react";
import { toast } from "sonner";

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  invoiceUrl?: string;
}

interface SubscriptionPageProps {
  plans: PricingPlan[];
  activePlan?: string;
  billingHistory?: Invoice[];
  remainingTrialDays?: number;
}

export default function SubscriptionPage({
  plans,
  activePlan,
  billingHistory = [],
  remainingTrialDays,
}: SubscriptionPageProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const currentPlan = plans.find((plan) => plan.slug === activePlan);

  // Check if trial is active (has remaining days)
  const isTrialActive =
    remainingTrialDays !== undefined && remainingTrialDays > 0;

  const getStatusBadge = (status: Invoice["status"]) => {
    const styles = {
      paid: "bg-green-100 text-green-700 border-green-200",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      failed: "bg-red-100 text-red-700 border-red-200",
    };
    return styles[status];
  };

  async function handleUpgradeClick(slug: string) {
    setIsLoading(true);
    try {
      const result = await upgradeSelectedPlan(slug);
      if (result.success && result.url) {
        toast.success("Upgrade initiated! Redirecting to checkout...");
        window.location.href = result.url;
      } else {
        toast.error(result.error || "Failed to initiate upgrade");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Page Header */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4 md:p-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">Subscription</h1>
            <p className="text-sm text-muted-foreground">
              Manage your plan and billing
            </p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          {/* Current Plan Overview */}
          {currentPlan && (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      You are currently on the {currentPlan.name} plan
                    </CardDescription>
                  </div>
                  <BillingPortalButton />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-semibold text-lg">{currentPlan.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ${currentPlan.price}
                      {currentPlan.period}
                    </p>
                    {remainingTrialDays !== undefined &&
                      remainingTrialDays > 0 && (
                        <p className="text-sm font-medium text-purple-600 mt-2">
                          {remainingTrialDays}{" "}
                          {remainingTrialDays === 1 ? "day" : "days"} remaining
                        </p>
                      )}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-green-700 bg-green-100 border-green-200"
                  >
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Available Plans */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Available Plans</h2>
              <p className="text-sm text-muted-foreground">
                Choose the plan that best fits your production needs
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-0">
              {plans.map((plan, index) => {
                const isActive = activePlan === plan.slug;
                // Allow upgrading/downgrading at any time
                const isPlanDisabled = false;

                const isUpgrade = currentPlan
                  ? plan.price > currentPlan.price
                  : index > 0;

                return (
                  <Card
                    key={plan.slug}
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
                      ${
                        index < 2
                          ? "bg-transparent border-none shadow-none"
                          : ""
                      }

                      /* Active plan styling */
                      ${isActive ? "ring-2 ring-green-500 ring-offset-2" : ""}
                      
                      /* Disabled plan styling */
                      ${isPlanDisabled ? "opacity-60" : ""}
                    `}
                  >
                    <CardContent className="flex flex-col gap-8 p-0">
                      {/* Header Section */}
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <h3
                              className={`text-lg font-semibold ${
                                plan.highlighted ? "text-purple-600" : ""
                              }`}
                            >
                              {plan.name}
                            </h3>
                            {isActive && (
                              <Badge
                                variant="secondary"
                                className="text-green-700 bg-green-100 border-green-200"
                              >
                                Current
                              </Badge>
                            )}
                          </div>
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
                        {isActive ? (
                          <Button variant="outline" className="w-full" disabled>
                            Current Plan
                          </Button>
                        ) : (
                          <Button
                            variant={plan.variant}
                            className={`w-full ${
                              plan.highlighted
                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                : ""
                            }`}
                            onClick={() =>
                              !isPlanDisabled && handleUpgradeClick(plan.slug)
                            }
                            disabled={isPlanDisabled || isLoading}
                          >
                            {isLoading
                              ? "Processing..."
                              : isPlanDisabled
                              ? "Trial in progress"
                              : index === 0
                              ? "Start free trial"
                              : isUpgrade
                              ? "Upgrade"
                              : "Downgrade"}
                          </Button>
                        )}
                      </div>

                      {/* Features */}
                      <div className="flex flex-col gap-4">
                        <p className="text-sm font-medium">
                          {index === 0
                            ? "What's included:"
                            : `Everything in ${plans[index - 1].name}, plus:`}
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
                );
              })}
            </div>
          </div>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View and download your past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              {billingHistory.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    No billing history yet. Your invoices will appear here once
                    you upgrade.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {billingHistory.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium">
                          ${invoice.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(invoice.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={getStatusBadge(invoice.status)}
                        >
                          {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                        </Badge>

                        {invoice.invoiceUrl && invoice.status === "paid" && (
                          <Link href={invoice.invoiceUrl} target="_blank">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
