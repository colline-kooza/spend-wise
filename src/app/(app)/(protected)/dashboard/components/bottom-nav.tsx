"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  Users,
  Menu,
  Layers,
  Check,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ClipboardList,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  StickyNote,
  UserPlus,
} from "lucide-react";
import { ProjectSwitcher } from "./project-switcher";
import { useProjectStore } from "@/store/project-store";
import { Badge } from "@/components/ui/badge";

interface TabItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabItems: TabItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
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
];

const allNavItems: TabItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
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

export function BottomTabNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectSheetOpen, setIsProjectSheetOpen] = useState(false);
  const { currentProject } = useProjectStore();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-around px-2">
        {/* Main Tab Items */}
        {tabItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <button
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
                <span className="text-xs font-medium">{item.title}</span>
              </button>
            </Link>
          );
        })}

        {/* Project Switcher Button with Clear Label */}
        <Sheet open={isProjectSheetOpen} onOpenChange={setIsProjectSheetOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-1 flex-col items-center justify-center h-full gap-1 text-muted-foreground hover:text-foreground transition-colors relative">
              <div className="relative">
                <Layers className="h-5 w-5" />
                {currentProject && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-xs font-medium">Projects</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto max-h-[85vh]">
            <SheetHeader className="mb-4">
              <SheetTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Switch Project
              </SheetTitle>
            </SheetHeader>

            {/* Current Project Indicator */}
            {currentProject && (
              <div className="mb-4 p-3 rounded-lg bg-secondary border">
                <p className="text-xs text-muted-foreground mb-1">
                  Currently viewing
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      currentProject.status === "Active"
                        ? "bg-green-500"
                        : currentProject.status === "On Hold"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    )}
                  />
                  <p className="font-semibold">{currentProject.name}</p>
                  <Check className="h-4 w-4 text-primary ml-auto" />
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>{currentProject.walkies} walkies</span>
                  <span>•</span>
                  <span>{currentProject.departments} departments</span>
                </div>
              </div>
            )}

            <div className="pb-4">
              <ProjectSwitcher />
            </div>
          </SheetContent>
        </Sheet>

        {/* More Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-1 flex-col items-center justify-center h-full gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Menu className="h-5 w-5" />
              <span className="text-xs font-medium">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-full mt-6 pb-20">
              <div className="space-y-1 px-2">
                {allNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                    >
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3",
                          isActive && "bg-secondary font-medium"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span>{item.title}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
