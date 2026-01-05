"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { createProject } from "@/auth-lib/actions/projects";
import type { CreateProjectRequest } from "@/types/projects";

import { ProjectCardForm } from "../../(protected)/dashboard/projects/components/project-card-form";
import { checkUserProject } from "../actions/check";
import { getOnboardingContext } from "../actions/onboarding";
import GradientBackground from "../components/GradientBackground";
import { ProjectFormSkeleton } from "../components/LoadingSkeletons";

export default function CheckProject() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for context
  const [userId, setUserId] = useState<string>("");
  const [orgId, setOrgId] = useState<string>("");

  useEffect(() => {
    async function init() {
      try {
        // First, check project status
        const projectResult = await checkUserProject();

        if (projectResult.success) {
          // User has a project, redirect to dashboard
          router.push("/dashboard");
          return;
        }

        // If no project, fetch user context needed for creation
        const contextResult = await getOnboardingContext();

        if (!contextResult.success || !contextResult.user) {
          toast.error("Authentication required");
          router.push("/login");
          return;
        }

        setUserId(contextResult.user.id);
        setOrgId(contextResult.orgId ?? "");
        setShowForm(true);
      } catch (error) {
        console.error("Error initializing onboarding:", error);
        toast.error("Failed to check status");

        // Fallback or redirect
        router.push("/dashboard");
      } finally {
        setIsChecking(false);
      }
    }

    init();
  }, [router]);

  const handleProjectSubmit = async (data: CreateProjectRequest) => {
    if (!userId || !orgId) {
      toast.error("Missing account information");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createProject(userId, orgId, data);

      if (result.success) {
        toast.success("Project created successfully!");
        setIsSubmitting(false);
        router.push("/dashboard");
      } else {
        toast.error(result.error || "Failed to create project");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
      setIsSubmitting(false);
    }
  };

  return (
    <GradientBackground>
      {/* Use flex column to ensure proper spacing if needed, but Skeleton has min-h-screen */}
      {isChecking ? (
        <ProjectFormSkeleton text="Preparing your workspace..." />
      ) : showForm ? (
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-xl animate-in duration-500 zoom-in-95 fade-in">
            <div className="transform transition-all hover:scale-[1.01]">
              {/* The form card itself */}
              <ProjectCardForm
                onSubmit={handleProjectSubmit}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        </div>
      ) : (
        <ProjectFormSkeleton text="Preparing your workspace..." />
      )}
    </GradientBackground>
  );
}
