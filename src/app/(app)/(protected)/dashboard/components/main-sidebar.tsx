"use client";

import {
  BarChart2,
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ClipboardList,
  CreditCard,
  Crown,
  FolderKanban,
  Home,
  Loader2,
  LogOut,
  Radio,
  Settings,
  ShieldCheck,
  StickyNote,
  User,
  UserCircle,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { signOut } from "@/auth-lib/auth-client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useActiveProject } from "@/hooks/use-active-project";
import { useSharedProjects, useUserProjects } from "@/hooks/use-projects";
import { cn } from "@/lib/utils";

import { ProjectSwitcherModal } from "../projects/components/project-switcher-modal";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Walkies", href: "/dashboard/walkies", icon: Radio },
  { title: "Departments", href: "/dashboard/departments", icon: Building2 },
  { title: "Crew Members", href: "/dashboard/crew-members", icon: Users },
  { title: "Notes", href: "/dashboard/notes", icon: StickyNote },
  { title: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { title: "Contributors", href: "/dashboard/contributors", icon: ShieldCheck },
];

interface MainSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  orgName?: string;
  userName?: string;
  userEmail?: string;
  userImage?: string | null;
  userId: string;
  orgId: string;
  subscriptionData?: {
    plan?: { name: string; priceId: string };
    remainingDays: number;
  } | null;
}

import { SidebarUser } from "./SidebarUser";

export function MainSidebar({
  isCollapsed = false,
  onToggleCollapse,
  userName = "John Smith",
  userEmail = "john@example.com",
  userImage,
  orgName = "WalkieCheck",
  userId,
  orgId,
  subscriptionData,
}: MainSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { activeProject, setActiveProject } = useActiveProject();

  // Fetch BOTH owned and shared projects
  const { userProjects, isLoading: isLoadingOwned } = useUserProjects(userId);
  const { sharedProjects, isLoading: isLoadingShared } =
    useSharedProjects(userId);

  const [switchingId, setSwitchingId] = useState<string | null>(null);

  // Combine owned and shared projects
  const allProjects = useMemo(() => {
    return [...userProjects, ...sharedProjects];
  }, [userProjects, sharedProjects]);

  const isLoadingProjects = isLoadingOwned || isLoadingShared;

  async function handleLogout() {
    await signOut();
    router.push("/login");
    toast.success("Logout successful");
  }

  const handleQuickSwitch = async (project: { id: string; name: string }) => {
    setSwitchingId(project.id);
    await setActiveProject(project);
    setSwitchingId(null);
    window.location.reload();
  };

  // Sort projects: active first, then by most recent
  // Show both owned and shared projects
  const sortedRecentProjects = useMemo(() => {
    const projects = [...allProjects];
    return projects
      .sort((a, b) => {
        if (a.id === activeProject?.id) return -1;
        if (b.id === activeProject?.id) return 1;
        return 0;
      })
      .slice(0, 5);
  }, [allProjects, activeProject?.id]);

  // Determine plan styling
  const isPro = subscriptionData?.plan?.name?.toLowerCase().includes("pro");
  const isFree =
    !subscriptionData?.plan ||
    subscriptionData?.plan?.name?.toLowerCase().includes("free");

  return (
    <>
      <aside
        className={cn(
          "bg-sidebar hidden h-screen flex-col border-r transition-all duration-300 ease-in-out lg:flex",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <TooltipProvider delayDuration={0}>
          {/* FIXED TOP SECTION */}
          <div className="flex shrink-0 flex-col border-b">
            {/* Logo and Org Name */}
            <div className={cn("px-4 pt-4 pb-5", isCollapsed && "px-3")}>
              <Link href="/dashboard">
                <div
                  className={cn(
                    "flex items-center gap-3",
                    isCollapsed && "justify-center"
                  )}
                >
                  {isCollapsed ? (
                    // Collapsed: Show icon logo
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative flex-shrink-0 cursor-pointer">
                          <Image
                            src="/logos/logo-1.png"
                            alt="WalkieCheck Logo"
                            width={40}
                            height={40}
                            className="rounded-lg object-contain"
                            priority
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold">Walkie Checkie</p>
                          <p className="text-xs text-muted-foreground">
                            Welcome {userName}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    // Expanded: Show full logo
                    <div className="relative flex-shrink-0">
                      <Image
                        src="/logos/logo-3.png"
                        alt="WalkieCheck Logo"
                        width={160}
                        height={40}
                        className="h-10 w-40 object-cover"
                        priority
                      />
                    </div>
                  )}
                </div>
              </Link>
            </div>
            {/* <div className={cn("px-4 pb-5 pt-4", isCollapsed && "px-3")}>
              <Link href="/dashboard">
                <div
                  className={cn(
                    "flex items-center gap-3",
                    isCollapsed && "justify-center"
                  )}
                >
                  {isCollapsed ? (
                    // Collapsed: Show compact logo/icon
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative flex-shrink-0 cursor-pointer">
                          <Image
                            src="/logos/logo-1.png"
                            alt={`${orgName} Logo`}
                            width={40}
                            height={40}
                            className="object-contain rounded-lg"
                            priority
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold">{orgName}</p>
                          <p className="text-xs text-muted-foreground">
                            Welcome {userName}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    // Expanded: Show logo + org name + welcome
                    <>
                      <div className="relative flex-shrink-0">
                        <Image
                          src="/logos/logo-1.png"
                          alt={`${orgName} Logo`}
                          width={50}
                          height={50}
                          className="object-contain"
                          priority
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-base truncate">
                          {orgName}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          Welcome {userName}{" "}
                          <span className="text-purple-600">⚡</span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Link>
            </div> */}

            {/* Project Switcher */}
            {!isCollapsed && (
              <div className="mb-4 px-5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm transition-all hover:border-gray-300"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
                          <FolderKanban className="h-3.5 w-3.5" />
                        </div>
                        <span className="truncate text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                          {activeProject?.name || "Select Project"}
                        </span>
                      </div>
                      <ChevronsUpDown className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Click to switch projects
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>

          {/* SCROLLABLE MIDDLE SECTION */}
          <div className="min-h-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              {/* Projects Link - Only show if active project is selected */}
              {activeProject && (
                <nav
                  className={cn(
                    "flex flex-col gap-1 p-3",
                    isCollapsed && "items-center"
                  )}
                >
                  {mainNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                          <Link href={item.href} className="w-full">
                            <Button
                              variant="ghost"
                              className={cn(
                                "h-11 rounded-lg",
                                isCollapsed
                                  ? "w-11 px-0"
                                  : "w-full justify-start gap-3 px-3",
                                isActive
                                  ? "bg-accent text-accent-foreground"
                                  : "hover:bg-sidebar-accent text-muted-foreground"
                              )}
                            >
                              <Icon className="h-5 w-5" />
                              {!isCollapsed && <span>{item.title}</span>}
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side="right">
                            {item.title}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    );
                  })}
                </nav>
              )}

              {/* Recent Projects */}
              <div className="border-t px-3 py-2">
                {!isCollapsed && (
                  <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase">
                    Recent Projects ({allProjects.length})
                  </h3>
                )}

                <div
                  className={cn(
                    "flex flex-col gap-1",
                    isCollapsed && "items-center"
                  )}
                >
                  {isLoadingProjects ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : sortedRecentProjects.length === 0 ? (
                    !isCollapsed && (
                      <div className="px-3 py-4 text-center">
                        <p className="text-xs text-muted-foreground">
                          No projects yet
                        </p>
                      </div>
                    )
                  ) : (
                    sortedRecentProjects.map((project) => {
                      const isActive = activeProject?.id === project.id;
                      const isSwitching = switchingId === project.id;
                      const isShared = sharedProjects.some(
                        (p) => p.id === project.id
                      );

                      return (
                        <Tooltip key={project.id}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() => handleQuickSwitch(project)}
                              disabled={isSwitching}
                              className={cn(
                                "h-11 rounded-lg text-sm transition-all",
                                isCollapsed
                                  ? "w-11 px-0"
                                  : "w-full justify-start gap-3 px-3",
                                isActive
                                  ? "border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 font-medium text-purple-900 shadow-sm hover:from-purple-100 hover:to-blue-100"
                                  : "hover:bg-sidebar-accent text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {isSwitching ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : isShared ? (
                                <Users
                                  className={cn(
                                    "h-5 w-5 transition-colors",
                                    isActive && "text-purple-600"
                                  )}
                                />
                              ) : (
                                <FolderKanban
                                  className={cn(
                                    "h-5 w-5 transition-colors",
                                    isActive && "text-purple-600"
                                  )}
                                />
                              )}
                              {!isCollapsed && (
                                <div className="flex min-w-0 flex-1 items-center gap-2">
                                  <span className="truncate">
                                    {project.name}
                                  </span>
                                  {isActive && (
                                    <div className="relative flex h-2 w-2 flex-shrink-0">
                                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                                      <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
                                    </div>
                                  )}
                                  {isShared && !isActive && (
                                    <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                                      Shared
                                    </span>
                                  )}
                                </div>
                              )}
                            </Button>
                          </TooltipTrigger>
                          {isCollapsed && (
                            <TooltipContent side="right">
                              <div className="flex items-center gap-2">
                                {project.name}
                                {isShared && (
                                  <span className="text-xs text-blue-500">
                                    (Shared)
                                  </span>
                                )}
                                {isActive && (
                                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                                )}
                              </div>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      );
                    })
                  )}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => setIsModalOpen(true)}
                        className={cn(
                          "h-11 rounded-lg border border-dashed",
                          isCollapsed
                            ? "w-11 px-0"
                            : "w-full justify-start gap-3 px-3",
                          "hover:bg-sidebar-accent text-muted-foreground"
                        )}
                      >
                        <BarChart2 className="h-5 w-5" />
                        {!isCollapsed && <span>View all projects</span>}
                      </Button>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        View all projects
                      </TooltipContent>
                    )}
                  </Tooltip>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* FIXED BOTTOM SECTION */}
          <div
            className={cn(
              "flex shrink-0 flex-col gap-3 border-t p-3",
              isCollapsed && "px-2"
            )}
          >
            {/* Subscription Badge - Only show for free/trial users */}
            {isFree && !isCollapsed && (
              <div className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-purple-50 to-blue-50 p-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 shrink-0 text-purple-600" />
                    <span className="truncate text-xs font-medium text-purple-900">
                      Free Plan
                    </span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => router.push("/dashboard/billing")}
                    className="h-6 w-6 rounded-full text-purple-600 hover:bg-purple-100 hover:text-purple-700"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Collapse Button - Compact */}
            {onToggleCollapse && (
              <div
                className={cn(
                  "flex",
                  isCollapsed ? "justify-center" : "justify-end"
                )}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onToggleCollapse}
                      className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                    >
                      {isCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronLeft className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            {/* Profile */}
            <SidebarUser
              isCollapsed={isCollapsed}
              userName={userName}
              userEmail={userEmail}
              userImage={userImage}
              activeTier={subscriptionData?.plan?.name}
            />
          </div>
        </TooltipProvider>
      </aside>

      <ProjectSwitcherModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        projects={allProjects}
        isLoading={isLoadingProjects}
        userId={userId}
        orgId={orgId}
        activeTier={subscriptionData?.plan?.name}
      />
    </>
  );
}
