"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// import AuthHeader from "@/app/(auth)/components/AuthHeader";
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

import { loginUser } from "../actions/users";
import { siteConfig } from "../config/site";
import type { LoginFormValues } from "../types/user.schema";
import { loginSchema } from "../types/user.schema";
import AuthHeader from "./AuthHeader";
import GradientBackground from "./GradientBackground";
import SocialButtons from "./SocialButtons";
import SubmitButton from "./SubmitButton";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const signupHref = "/signup";
  console.log(redirectTo);

  // Initialize react-hook-form with zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler
  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      const result = await loginUser(values);
      console.log(result, "oooooooooo");

      if (result.success) {
        toast.success("Success!", {
          description: "Login Successfully",
        });

        // ✅ Conditional redirect
        if (values.email === "super@superadmin.com") {
          router.push("/dashboard/admin");
        } else {
          router.push(redirectTo);
        }
      } else {
        if (result.status === "UNAUTHORIZED") {
          toast.error("Wrong Credentials", {
            description: result.error,
          });
        } else {
          toast.error("Error", {
            description: result.error,
          });
        }
      }
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
      console.log(error, "the errr");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <GradientBackground
      className="grid min-h-screen place-content-center md:p-6"
      variant="default"
    >
      <div className="m-auto h-fit w-full rounded-[calc(var(--radius)+.125rem)] border bg-card p-0.5 shadow-md md:min-w-md dark:[--color-muted:var(--color-zinc-900)]">
        <div className="px-8 py-3">
          {/* Logo Section */}
          <div className="mt-4 mb-1 flex justify-center">
            <Link href="/">
              <Image
                src="/logos/logo-1.png"
                alt={`${siteConfig.name} Logo`}
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          <AuthHeader
            title={`Sign In to ${siteConfig.name}`}
            subTitle="Welcome back! Sign in to continue"
          />

          <SocialButtons />

          <hr className="my-4 border-dashed" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="block text-sm">Email</FormLabel>
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
                  <FormItem className="space-y-0">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-title text-sm">
                        Password
                      </FormLabel>
                      <Button asChild variant="link" size="sm">
                        <Link
                          href="/forgot-password"
                          className="intent-info variant-ghost text-sm link"
                        >
                          Forgot your Password?
                        </Link>
                      </Button>
                    </div>
                    <FormControl>
                      <Input isPassword type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton
                title="Sign In"
                loadingTitle="Signing in..."
                isLoading={isLoading}
              />
            </form>
          </Form>
        </div>

        <div className="flex items-center justify-end px-6 pb-6">
          <p className="text-center text-sm">
            Don&apos;t have an account?
            <Button asChild variant="link" className="ml-3 px-2">
              <Link href={signupHref}>Create account</Link>
            </Button>
          </p>
        </div>
      </div>
    </GradientBackground>
  );
}
