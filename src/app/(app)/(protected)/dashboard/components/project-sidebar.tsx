"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  UserPlus,
  StickyNote,
  Calendar,
  BarChart3,
  UserCircle,
  Radio,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const projectNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Walkies",
    href: "/dashboard/walkies",
    icon: Radio,
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
  // {
  //   title: "Calendar",
  //   href: "/dashboard/calendar",
  //   icon: Calendar,
  // },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Contributors",
    href: "/dashboard/contributors",
    icon: UserCircle,
  },
];

interface ProjectSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  currentProjectName?: string;
}

export function ProjectSidebar({
  isCollapsed = false,
  onToggleCollapse,
  currentProjectName = "WalkieCheck",
}: ProjectSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden lg:flex border-r bg-sidebar flex-col transition-all duration-300 ease-in-out ",
        isCollapsed ? "w-12" : "w-72"
      )}
    >
      {isCollapsed ? (
        <div className="flex flex-col items-center py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8 rounded-lg"
            title="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="p-2 border-b flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold truncate">
              {currentProjectName}
            </h2>
            {onToggleCollapse && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="h-8 w-8 rounded-lg shrink-0"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {projectNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-10 rounded-lg font-normal",
                      isActive &&
                        "bg-primary/10 text-primary font-medium hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-accent" : "text-muted-foreground"
                      )}
                    />
                    <span className="truncate flex-1 text-left">
                      {item.title}
                    </span>
                    {item.badge !== undefined && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          "h-5 min-w-5 px-1.5 text-xs font-medium rounded-md",
                          isActive && "bg-accent/20 text-accent"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </aside>
  );
}
