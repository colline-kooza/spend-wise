"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

import { sendForgotPasswordToken } from "../actions/users";
import { siteConfig } from "../config/site";
import type { ForgotPasswordFormValues } from "../types/user.schema";
import { forgotPasswordSchema } from "../types/user.schema";
import AuthHeader from "./AuthHeader";
import GradientBackground from "./GradientBackground";
import SubmitButton from "./SubmitButton";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Initialize react-hook-form with zod validation
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form submission handler
  async function onSubmit(values: ForgotPasswordFormValues) {
    setIsLoading(true);
    console.log(values);
    try {
      const result = await sendForgotPasswordToken(values);
      if (result.success) {
        toast.success("Success!", {
          description: "Password Reset Link sent Successfully",
        });
        // Optional: redirect to login page
        router.push("/login");
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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <GradientBackground
      className="flex min-h-screen items-center justify-center p-6"
      variant="default"
    >
      <div className="m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border bg-card p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
        <div className="p-8 pb-6">
          <AuthHeader
            title={`Recover your ${siteConfig.name} Password`}
            subTitle="Enter your email to receive a reset link"
          />

          <hr className="my-4 border-dashed" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <SubmitButton
                title="Send Reset Link"
                loadingTitle="Sending"
                isLoading={isLoading}
              />
            </form>
          </Form>
        </div>

        <div className="flex items-center justify-end px-6 pb-6">
          <p className="text-center text-sm">
            Remember your password ?
            <Button asChild variant="link" className="ml-3 px-2">
              <Link href={"/login"}>Sign In</Link>
            </Button>
          </p>
        </div>
      </div>
    </GradientBackground>
  );
}
