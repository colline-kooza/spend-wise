"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  Users,
  Calendar,
  Package,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  StickyNote,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Logo } from "@/components/pro-blocks/logo";
import { Progress } from "@/components/ui/progress";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  // {
  //   title: "Projects",
  //   href: "/dashboard/projects",
  //   icon: FolderKanban,
  // },
  {
    title: "Walkies",
    href: "/dashboard/walkies",
    icon: Package,
  },
  {
    title: "Departments",
    href: "/dashboard/departments",
    icon: Users,
  },
  {
    title: "Assignments",
    href: "/dashboard/assignments",
    icon: ClipboardList,
  },
  {
    title: "Crew Members",
    href: "/dashboard/crew-members",
    icon: UserPlus,
  },
  {
    title: "Notes",
    href: "/dashboard/notes",
    icon: StickyNote,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Contributors",
    href: "/dashboard/contributors",
    icon: Users,
  },
];

const bottomNavItems: NavItem[] = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
];

interface DashboardSidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function DashboardSidebar({
  collapsed = false,
  onCollapsedChange,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Free trial data - replace with actual data from your backend
  const freeTrialDaysRemaining = 7;
  const freeTrialDaysTotal = 14;
  const progressPercentage =
    ((freeTrialDaysTotal - freeTrialDaysRemaining) / freeTrialDaysTotal) * 100;

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo and Collapse Toggle */}
      <div className="flex h-16 items-center justify-between px-3 border-b">
        {!collapsed && (
          <div className="flex-1">
            <Logo />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapsedChange?.(!collapsed)}
          className="h-8 w-8 shrink-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto scroll-smooth">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 transition-all duration-200 ease-in-out",
                        collapsed ? "px-2" : "px-3",
                        isActive && "bg-secondary font-medium"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {!collapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{item.title}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      {/* Free Trial Banner */}
      {!collapsed && !bannerDismissed && (
        <div className="mx-3 mb-3 rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 p-4 text-white relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-6 w-6 text-white hover:bg-white/20"
            onClick={() => setBannerDismissed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-start gap-2 mb-3">
            <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">Free Trial</h4>
              <p className="text-xs opacity-90 mb-3">
                {freeTrialDaysRemaining} days remaining out of{" "}
                {freeTrialDaysTotal}
              </p>
              <Progress
                value={progressPercentage}
                className="h-1.5 bg-white/30 mb-3"
              />
            </div>
          </div>
          <Button
            size="sm"
            className="w-full bg-white text-orange-600 hover:bg-white/90 font-semibold"
          >
            Upgrade Now
          </Button>
        </div>
      )}

      {/* Collapsed Free Trial Indicator */}
      {collapsed && !bannerDismissed && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="mx-2 mb-3">
              <Button
                variant="ghost"
                size="icon"
                className="w-full h-10 bg-gradient-to-br from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700"
              >
                <Sparkles className="h-5 w-5" />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="font-semibold">Free Trial</p>
            <p className="text-xs">{freeTrialDaysRemaining} days remaining</p>
          </TooltipContent>
        </Tooltip>
      )}

      {/* Bottom Navigation */}
      <div className="border-t p-3 space-y-1">
        <TooltipProvider delayDuration={0}>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 transition-all duration-200 ease-in-out",
                        collapsed ? "px-2" : "px-3",
                        isActive && "bg-secondary font-medium"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {!collapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{item.title}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </aside>
  );
}
