"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { createBillingPortalSession } from "@/app/(auth)/actions/subscriptions";

interface BillingPortalButtonProps {
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function BillingPortalButton({
  variant = "outline",
  size = "sm",
  className,
}: BillingPortalButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const result = await createBillingPortalSession();
      console.log(result);

      if (!result.success || !result.url) {
        toast({
          title: "Error",
          description: result.error || "Failed to open billing portal",
          variant: "destructive",
        });
        return;
      }

      // Redirect to the billing portal
      window.location.href = result.url;
    } catch (error) {
      console.error("Error opening billing portal:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <ExternalLink className="mr-2 h-4 w-4" />
          {size === "sm" ? "Manage Subscription" : "Open Customer Portal"}
        </>
      )}
    </Button>
  );
}
