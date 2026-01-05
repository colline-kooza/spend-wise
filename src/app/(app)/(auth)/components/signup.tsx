"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter as useNextRouter } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signIn } from "@/auth-lib/auth-client";
import { upgradePlan } from "@/auth-lib/stripe/upgradePlan";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Config and utilities
import { registerUser } from "../actions/users";
import { siteConfig } from "../config/site";
// Actions and types
import type { RegisterFormValues } from "../types/user.schema";
import { RegisterUserSchema } from "../types/user.schema";
import AuthHeader from "./AuthHeader";
// Local imports
import SocialButtons from "./SocialButtons";
import SubmitButton from "./SubmitButton";

export default function Signup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const nextRouter = useNextRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const plan = searchParams.get("plan") || "free-trial";

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);

    try {
      // Step 1: Register user
      const result = await registerUser(data, plan);

      if (!result?.success) {
        console.error("❌ Registration failed:", result);
        if (result?.status === "UNPROCESSABLE_ENTITY") {
          toast.error("Account Registration Failed", {
            description: result.error,
          });
        } else {
          toast.error("Error", {
            description: result?.error || "Registration failed",
          });
        }
        setIsSubmitting(false);
        return;
      }

      toast.success("Success!", {
        description: "Your account has been created successfully",
      });

      // Step 2: Sign in the user to establish session cookies
      const signInResult = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (signInResult.error) {
        console.error("❌ Sign in failed:", signInResult.error);
        toast.error(
          "Account created but auto-login failed. Please login manually."
        );
        router.push("/login");
        setIsSubmitting(false);
        return;
      }

      // Step 3: Wait for session cookies to be fully set
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 4: Handle plan subscription
      const isPaidPlan = plan && plan !== "free-trial";

      if (isPaidPlan) {
        // PAID PLAN - Create checkout and redirect to Stripe
        toast.info("Setting up your subscription...");

        try {
          const checkoutData = await upgradePlan(plan);

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
          setIsSubmitting(false);
          return;
        }
      } else {
        router.push("upgrade-plan");
      }
    } catch (error) {
      console.error("❌ Registration error:", error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative grid min-h-screen place-content-center p-4 sm:p-6">
      {/* Back Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => nextRouter.back()}
        className="absolute top-4 left-4 flex items-center gap-2 border-purple-200 bg-white/80 text-purple-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-900 hover:shadow-md sm:top-6 sm:left-6 dark:border-purple-900 dark:bg-zinc-900/80 dark:text-purple-400 dark:hover:border-purple-700 dark:hover:bg-purple-950 dark:hover:text-purple-300"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden font-medium sm:inline">Back</span>
      </Button>

      <div className="m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border bg-card p-0.5 shadow-lg dark:[--color-muted:var(--color-zinc-900)]">
        {/* Logo Section */}
        <div className="mt-1 mb-1 flex justify-center">
          <Link href="/">
            <Image
              src="/logos/logo-1.png"
              alt={`${siteConfig.name} Logo`}
              width={80}
              height={50}
              className="object-contain"
              priority
            />
          </Link>
        </div>
        <div className="px-5 py-4 sm:px-6 sm:py-5">
          <AuthHeader
            title={`Create a ${siteConfig.name} Account`}
            subTitle="Welcome! Create an account to get started"
          />
          <SocialButtons />

          <hr className="my-4 border-dashed" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input isPassword type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton
                title="Create Account"
                loadingTitle="Creating Account..."
                isLoading={isSubmitting}
              />
            </form>
          </Form>
        </div>

        <div className="flex items-center justify-end px-5 pb-4 sm:px-6">
          <p className="text-center text-sm text-muted-foreground">
            Have an account?
            <Button
              asChild
              variant="link"
              className="ml-2 px-2 text-purple-700 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
            >
              <Link href={"/login"}>Sign In</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
