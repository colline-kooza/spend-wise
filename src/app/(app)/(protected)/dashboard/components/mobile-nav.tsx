"use client";

import {
  BarChart3,
  ClipboardList,
  CreditCard,
  Crown,
  FolderKanban,
  Home,
  LogOut,
  Menu,
  Radio,
  Settings,
  StickyNote,
  User,
  UserCircle,
  UserPlus,
  Users,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { signOut } from "@/auth-lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useActiveProject } from "@/hooks/use-active-project";
import { useSharedProjects, useUserProjects } from "@/hooks/use-projects";
import { cn } from "@/lib/utils";

import { ProjectSwitcherModal } from "../projects/components/project-switcher-modal";

// Main navigation items for hamburger menu
const mainNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Walkies", href: "/dashboard/walkies", icon: Radio },
  { title: "Departments", href: "/dashboard/departments", icon: Users },
  { title: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
  { title: "Crew Members", href: "/dashboard/crew-members", icon: UserPlus },
  { title: "Notes", href: "/dashboard/notes", icon: StickyNote },
  { title: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { title: "Contributors", href: "/dashboard/contributors", icon: UserCircle },
];

interface MobileNavProps {
  userId: string;
  userName?: string;
  userEmail?: string;
  orgName?: string;
  subscriptionData?: {
    plan?: { name: string; priceId: string };
    remainingDays: number;
  } | null;
}

export function MobileNav({
  userId,
  userName = "User",
  userEmail = "user@example.com",
  orgName = "WalkieCheck",
  subscriptionData,
}: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isProjectsPage = pathname === "/dashboard/projects";

  // Fetch BOTH owned and shared projects
  const { userProjects, isLoading: isLoadingOwned } = useUserProjects(userId);
  const { sharedProjects, isLoading: isLoadingShared } =
    useSharedProjects(userId);
  const { activeProject } = useActiveProject();

  // Combine projects and mark shared ones
  const allProjects = [
    ...userProjects.map((p) => ({ ...p, isShared: false })),
    ...sharedProjects.map((p) => ({ ...p, isShared: true })),
  ];
  const isLoadingProjects = isLoadingOwned || isLoadingShared;

  // Determine plan styling
  const isPro = subscriptionData?.plan?.name?.toLowerCase().includes("pro");
  const isFree =
    !subscriptionData?.plan ||
    subscriptionData?.plan?.name?.toLowerCase().includes("free");

  async function handleLogout() {
    await signOut();
    router.push("/login");
    toast.success("Logout successful");
  }

  return (
    <>
      {/* Top Header with Hamburger Menu */}
      <div className="fixed top-0 right-0 left-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo and Active Project */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
              {/* Logo Image */}
              <div className="flex-shrink-0">
                <Image
                  src="/logos/logo-1.png"
                  alt={`${orgName} Logo`}
                  width={50}
                  height={50}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Org Name and Active Project */}
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-xs font-semibold">
                  {orgName}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {activeProject?.name || "Select Project"}
                </span>
              </div>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 flex-shrink-0"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="/api/placeholder/32/32"
                      alt={userName}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(userName);
                      }}
                    />
                    <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {userName}
                    </p>
                    <p className="text-xs text-muted-foreground">{userEmail}</p>
                    {orgName && (
                      <p className="mt-1 border-t pt-1 text-xs text-muted-foreground">
                        {orgName}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/settings")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/billing")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Hamburger Menu Button */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 flex-shrink-0"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full animate-in p-0 duration-300 slide-in-from-right sm:w-80"
              >
                <div className="flex h-full flex-col">
                  {/* Header with Logo */}
                  <SheetHeader className="shrink-0 border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/logos/logo-1.png"
                          alt={`${orgName} Logo`}
                          width={32}
                          height={32}
                          className="object-contain"
                          priority
                        />
                        <SheetTitle>{orgName}</SheetTitle>
                      </div>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </SheetClose>
                    </div>
                  </SheetHeader>

                  {/* Navigation Content */}
                  <ScrollArea className="flex-1">
                    <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
                      {/* Active Project Display with Click to Switch */}
                      <div className="space-y-2">
                        <h3 className="mb-2 px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          Active Project
                        </h3>
                        <button
                          onClick={() => {
                            setOpen(false);
                            setIsModalOpen(true);
                          }}
                          className="w-full rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 p-3 transition-all hover:from-purple-100 hover:to-blue-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-white">
                              <FolderKanban className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                              <p className="truncate text-sm font-semibold text-purple-900">
                                {activeProject?.name || "No project selected"}
                              </p>
                              <p className="text-xs text-purple-600">
                                Click to switch
                              </p>
                            </div>
                            {activeProject && (
                              <div className="relative flex h-2 w-2 flex-shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
                              </div>
                            )}
                          </div>
                        </button>
                      </div>

                      {/* Projects Link */}
                      <div className="space-y-1">
                        <h3 className="mb-2 px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          Navigation
                        </h3>
                        <Link
                          href="/dashboard/projects"
                          onClick={() => setOpen(false)}
                        >
                          <Button
                            variant="ghost"
                            className={cn(
                              "h-11 w-full justify-start gap-3",
                              pathname === "/dashboard/projects" &&
                                "bg-accent/10 text-accent hover:bg-accent/10 hover:text-accent"
                            )}
                          >
                            <FolderKanban className="h-5 w-5 shrink-0" />
                            <span>All Projects ({allProjects.length})</span>
                          </Button>
                        </Link>
                      </div>

                      {/* Other Navigation */}
                      <div className="space-y-1">
                        <h3 className="mb-2 px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          More
                        </h3>
                        {mainNavItems.slice(1).map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpen(false)}
                            >
                              <Button
                                variant="ghost"
                                className={cn(
                                  "h-11 w-full justify-start gap-3",
                                  isActive &&
                                    "bg-accent/10 text-accent hover:bg-accent/10 hover:text-accent"
                                )}
                              >
                                <Icon className="h-5 w-5 shrink-0" />
                                <span>{item.title}</span>
                              </Button>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Subscription Card */}
                      <div
                        className={cn(
                          "relative overflow-hidden rounded-lg border p-4",
                          isPro
                            ? "bg-gradient-to-br from-purple-100 to-blue-50"
                            : "bg-gradient-to-br from-purple-50 to-blue-50"
                        )}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {isPro ? (
                              <Crown className="h-4 w-4 text-amber-600" />
                            ) : (
                              <Zap className="h-4 w-4 text-purple-600" />
                            )}
                            <span
                              className={cn(
                                "text-sm font-semibold",
                                isPro ? "text-amber-900" : "text-purple-900"
                              )}
                            >
                              {subscriptionData?.plan?.name || "Free Plan"}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-xs",
                              isPro
                                ? "bg-amber-100 text-amber-700"
                                : "bg-purple-100 text-purple-600"
                            )}
                          >
                            Active
                          </span>
                        </div>

                        <p className="mb-3 text-xs text-gray-600">
                          {subscriptionData?.remainingDays
                            ? `${subscriptionData.remainingDays} days remaining`
                            : "No active subscription"}
                        </p>

                        {isFree && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setOpen(false);
                              router.push("/dashboard/billing");
                            }}
                            className="h-9 w-full bg-purple-600 text-xs text-white hover:bg-purple-700"
                          >
                            Upgrade Plan
                          </Button>
                        )}

                        {isPro && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setOpen(false);
                              router.push("/dashboard/billing");
                            }}
                            className="h-9 w-full border-amber-200 text-xs text-amber-700 hover:bg-amber-100"
                          >
                            Manage Plan
                          </Button>
                        )}
                      </div>

                      {/* User Profile Section */}
                      <div className="border-t pt-4">
                        <div className="flex items-center gap-3 px-2">
                          <Avatar className="h-10 w-10 flex-shrink-0 rounded-lg">
                            <AvatarImage
                              src="/api/placeholder/40/40"
                              alt={userName}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://ui-avatars.com/api/?name=" +
                                  encodeURIComponent(userName);
                              }}
                            />
                            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                              {userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex min-w-0 flex-1 flex-col items-start">
                            <span className="truncate text-sm font-medium">
                              {userName}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                              {userEmail}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Project Switcher Modal */}
      <ProjectSwitcherModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        projects={allProjects}
        isLoading={isLoadingProjects}
      />
    </>
  );
}
