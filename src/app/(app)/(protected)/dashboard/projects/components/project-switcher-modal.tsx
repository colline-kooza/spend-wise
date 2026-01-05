/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Check,
  ChevronLeft,
  FolderKanban,
  Loader2,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  checkProjectCreationEligibility,
  createProject,
} from "@/auth-lib/actions/projects";
import { UpgradeModal } from "@/components/dashboard/upgrade-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActiveProject } from "@/hooks/use-active-project";
import { cn } from "@/lib/utils";

import { ProjectCardForm } from "./project-card-form";

interface ProjectListItem {
  id: string;
  name: string;
  isShared?: boolean; // Add this to identify shared projects
}

interface ProjectSwitcherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: ProjectListItem[];
  isLoading?: boolean;
  userId: string;
  orgId: string;
  activeTier?: string;
}

export function ProjectSwitcherModal({
  open,
  onOpenChange,
  projects,
  isLoading = false,
  userId,
  orgId,
  activeTier,
}: ProjectSwitcherModalProps) {
  const [search, setSearch] = useState("");
  const { activeProject, setActiveProject } = useActiveProject();
  const [switchingId, setSwitchingId] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProjects = useMemo(() => {
    if (!search.trim()) return projects;

    const searchLower = search.toLowerCase();
    return projects.filter((project) =>
      project.name.toLowerCase().includes(searchLower)
    );
  }, [projects, search]);

  const handleSelectProject = async (project: ProjectListItem) => {
    setSwitchingId(project.id);
    await setActiveProject(project);
    setSwitchingId(null);
    onOpenChange(false);
    setSearch("");

    // CRITICAL: Reload the page to update all components with new project context
    window.location.reload();
  };

  const handleCreateProject = async (data: any) => {
    setIsSubmitting(true);
    try {
      const result = await createProject(userId, orgId, data);
      if (result.success) {
        toast.success("Project created successfully");
        await setActiveProject({ id: result.data.id, name: result.data.name });
        window.location.reload();
      } else {
        if (result.error && result.error.includes("limit")) {
          setShowUpgradeModal(true);
        } else {
          toast.error(result.error || "Failed to create project");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) setIsCreating(false);
      }}
    >
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={() => onOpenChange(false)}
        title="Limit Reached"
        description="You have reached the limit of projects for your current plan. Upgrade to create more projects."
        activeTier={activeTier}
      />

      <DialogContent className="p-0 sm:max-w-[550px]">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            {isCreating ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-2 h-6 w-6"
                  onClick={() => setIsCreating(false)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                Create New Project
              </div>
            ) : (
              <div className="flex w-full items-center justify-between pr-8">
                <div className="flex items-center gap-2">
                  Switch Project
                  <span className="text-sm font-normal text-muted-foreground">
                    ({projects.length})
                  </span>
                </div>
                {activeTier && (
                  <span className="rounded-full border border-purple-200 bg-purple-100 px-2 py-1 text-[10px] font-bold tracking-tight text-purple-700 uppercase">
                    {activeTier} Plan
                  </span>
                )}
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        {isCreating ? (
          <div className="px-6 pb-6">
            <ProjectCardForm
              onSubmit={handleCreateProject}
              isLoading={isSubmitting}
              onCancel={() => setIsCreating(false)}
            />
          </div>
        ) : (
          <>
            <div className="px-6">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 pl-9"
                  autoFocus
                />
              </div>
            </div>

            <ScrollArea className="max-h-[400px] px-6 pt-2 pb-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FolderKanban className="mb-3 h-12 w-12 text-muted-foreground/50" />
                  <p className="text-sm font-medium text-muted-foreground">
                    {search.trim()
                      ? "No projects found"
                      : "No projects available"}
                  </p>
                  {search.trim() && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Try a different search term
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-2 space-y-1">
                  {filteredProjects.map((project) => {
                    const isActive = activeProject?.id === project.id;
                    const isSwitching = switchingId === project.id;
                    const isShared = project.isShared;

                    return (
                      <Button
                        key={project.id}
                        variant="ghost"
                        className={cn(
                          "h-auto w-full justify-start rounded-lg px-4 py-3 transition-all",
                          isActive &&
                            "border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100"
                        )}
                        onClick={() => handleSelectProject(project)}
                        disabled={isSwitching}
                      >
                        <div className="flex w-full items-center gap-3">
                          <div
                            className={cn(
                              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
                              isActive ? "bg-purple-600 text-white" : "bg-muted"
                            )}
                          >
                            {isSwitching ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : isShared ? (
                              <Users className="h-5 w-5" />
                            ) : (
                              <FolderKanban className="h-5 w-5" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <p
                                className={cn(
                                  "truncate text-sm font-medium",
                                  isActive && "text-purple-900"
                                )}
                              >
                                {project.name}
                              </p>
                              {isShared && (
                                <span className="flex-shrink-0 rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                                  Shared
                                </span>
                              )}
                            </div>
                            <p className="truncate text-xs text-muted-foreground">
                              {isShared ? "Shared with you" : "Your project"} •
                              ID: {project.id.slice(0, 8)}...
                            </p>
                          </div>

                          {isActive && (
                            <div className="flex flex-shrink-0 items-center gap-2">
                              <Check className="h-5 w-5 text-purple-600" />
                              <div className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
                              </div>
                            </div>
                          )}
                        </div>
                      </Button>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
            <div className="border-t bg-gray-50/50 p-4">
              <Button
                variant="outline"
                className="w-full border-2 border-dashed hover:border-purple-500 hover:bg-purple-50 hover:text-purple-600"
                onClick={async () => {
                  // Pre-check eligibility
                  setIsSubmitting(true);
                  try {
                    const check = await checkProjectCreationEligibility(
                      userId,
                      orgId
                    );
                    if (check.allowed) {
                      setIsCreating(true);
                    } else {
                      setShowUpgradeModal(true);
                    }
                  } catch (err) {
                    toast.error("Failed to check eligibility");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Create New Project
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
