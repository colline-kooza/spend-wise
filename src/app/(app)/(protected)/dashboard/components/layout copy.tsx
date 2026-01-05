"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { MainSidebar } from "./main-sidebar";
import { ProjectSidebar } from "./project-sidebar";
import { MobileNav } from "./mobile-nav";
import { usePathname, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Settings, RefreshCw, Info, ExternalLink, User, CreditCard, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
  orgName?: string;
  userName?: string;
  userEmail?: string;
  userRole?: string;
  userImage?: string;
  pageTitle?: string;
  pageSubtitle?: string;
}

export default function DashboardLayout({
  children,
  orgName,
  userName = "Collinz Kooza",
  userEmail = "koozacollinz1@gmail.com",
  userRole = "USER",
  userImage = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1764224446~exp=1764228046~hmac=0dd33849828083eecdee2e004a8ae51ca007014137cceba757b1122ff554ebd0&w=2000",
  pageTitle,
  pageSubtitle,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const params = useParams();
  const isProjectsPage = pathname === "/dashboard/projects";

  const [isMainSidebarCollapsed, setIsMainSidebarCollapsed] = useState(true);
  const [isProjectSidebarCollapsed, setIsProjectSidebarCollapsed] =
    useState(false);

  // When main sidebar opens, close project sidebar
  useEffect(() => {
    if (!isMainSidebarCollapsed) {
      setIsProjectSidebarCollapsed(true);
    }
  }, [isMainSidebarCollapsed]);

  // Get dynamic page title based on route
  const getPageTitle = () => {
    if (pageTitle) return pageTitle;

    if (pathname?.includes("/projects/")) {
      const projectId = params?.projectId as string;
      return projectId
        ? projectId
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "Project Dashboard";
    }

    if (pathname === "/dashboard/projects") return "Projects Overview";
    if (pathname === "/dashboard/walkies") return "Walkies";
    if (pathname === "/dashboard/meetings") return "My Meetings";

    return "Project Dashboard";
  };

  const getPageSubtitle = () => {
    if (pageSubtitle) return pageSubtitle;

    if (pathname?.includes("/projects/")) {
      return "Manage and track your project";
    }

    if (pathname === "/dashboard/projects")
      return "View and manage all your projects";
    if (pathname === "/dashboard") return "No project selected";

    return "Track your progress and activities";
  };

  // Calculate left margin based on sidebar states
  const getContentLeftMargin = () => {
    if (isProjectsPage) return "ml-20";
    if (!isMainSidebarCollapsed) return "ml-72"; // Main sidebar open
    if (!isProjectSidebarCollapsed) return "ml-96"; // Project sidebar open
    return "ml-28"; // Both collapsed
  };

  // Calculate project sidebar left position
  const getProjectSidebarLeft = () => {
    if (!isMainSidebarCollapsed) return "left-72"; // Push right when main is open
    return "left-25"; // Default position
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Top Navigation Bar with Blur Background */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-3 backdrop-blur-sm bg-white/5 ">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-lg text-gray-900">WalkieCheck</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs px-4"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs px-4"
            >
              This Week
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90 rounded-full text-xs px-4 border-none"
            >
              This Month
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs px-4"
            >
              Reports
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <Info className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <Settings className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 ml-2 pl-3 border-l border-gray-200 cursor-pointer hover:opacity-80 transition-opacity">
                  <Avatar className="h-10 w-10 rounded-full">
                    <AvatarImage src={userImage} alt={userName} />
                    <AvatarFallback className="bg-orange-500 text-white rounded-full">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-medium text-gray-900">
                      {userName}
                    </span>
                    <span className="text-xs text-gray-500">{userRole}</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Sidebar */}
      <div className="fixed left-0 top-16 pt-4 pl-4 h-[calc(100vh-4rem)] z-30">
        <MainSidebar
          orgName={orgName}
          userName={userName}
          userEmail={userEmail}
          isCollapsed={isMainSidebarCollapsed}
          onToggleCollapse={() =>
            setIsMainSidebarCollapsed(!isMainSidebarCollapsed)
          }
        />
      </div>

      {/* Fixed Page Header (when not on projects page and sidebar is expanded) */}
      {!isProjectsPage && !isProjectSidebarCollapsed && (
        <div className={`fixed ${getProjectSidebarLeft()} top-16 pt-4 pl-2 z-45 bg-[#F8F9FA] transition-all duration-300`}>
          <div className="pb-4">
            <p className="text-xs text-gray-500 mb-1">{getPageSubtitle()}</p>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-br from-black via-black to-black bg-clip-text text-transparent">
              {getPageTitle()}
            </h1>
          </div>
        </div>
      )}

      {/* Fixed Project Sidebar */}
      {!isProjectsPage && (
        <div className={`fixed ${getProjectSidebarLeft()} top-36 pt-4 pl-2 h-[calc(100vh-9rem)] z-40 overflow-y-auto transition-all duration-300`}>
          <ProjectSidebar
            isCollapsed={isProjectSidebarCollapsed}
            onToggleCollapse={() =>
              setIsProjectSidebarCollapsed(!isProjectSidebarCollapsed)
            }
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-h-screen">
        <main
          className={`flex-1 overflow-y-auto bg-[#F8F9FA] transition-all duration-300 ${getContentLeftMargin()}`}
          style={{
            marginTop: isProjectSidebarCollapsed ? "60px" : "-30px",
          }}
        >
          {/* Spacer for fixed header when not on projects page and sidebar is expanded */}
          {!isProjectsPage && !isProjectSidebarCollapsed && (
            <div className="h-24"></div>
          )}

          {/* Page Content */}
          <div
            className={`px-2 pb-8 ${
              !isProjectsPage && !isProjectSidebarCollapsed ? "pt-0" : "pt-0"
            }`}
          >
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}