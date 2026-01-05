"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Mail,
  HelpCircle,
  Settings,
  Search,
  X,
  ArrowLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProjectSwitcher } from "./project-switcher";
import { useProjectStore } from "@/store/project-store";
import { cn } from "@/lib/utils";

// Mock search results - replace with actual API data
const searchWalkies = (query: string, projectId?: string) => {
  const allWalkies = [
    {
      id: 1,
      serialNumber: "WT-001",
      label: "Alpha-01",
      innerLabel: "A1",
      status: "Home",
      department: null,
      projectId: "1",
    },
    {
      id: 2,
      serialNumber: "WT-002",
      label: "Alpha-02",
      innerLabel: "A2",
      status: "Away",
      department: "Stunts",
      assignedTo: "Samuel Torres",
      projectId: "1",
    },
    {
      id: 3,
      serialNumber: "WT-003",
      label: "Alpha-03",
      innerLabel: "A3",
      status: "Away",
      department: "Makeup",
      assignedTo: "Jessica Lee",
      projectId: "1",
    },
    {
      id: 6,
      serialNumber: "WT-006",
      label: "Beta-02",
      innerLabel: "B2",
      status: "Away",
      department: "Camera",
      assignedTo: "Marcus Johnson",
      projectId: "2",
    },
  ];

  if (!query) return [];

  let filteredWalkies = allWalkies;

  // Filter by current project
  if (projectId) {
    filteredWalkies = allWalkies.filter((w) => w.projectId === projectId);
  }

  return filteredWalkies.filter(
    (walkie) =>
      walkie.serialNumber.toLowerCase().includes(query.toLowerCase()) ||
      walkie.label.toLowerCase().includes(query.toLowerCase()) ||
      walkie.innerLabel.toLowerCase().includes(query.toLowerCase()) ||
      walkie.department?.toLowerCase().includes(query.toLowerCase()) ||
      walkie.assignedTo?.toLowerCase().includes(query.toLowerCase())
  );
};

export function DashboardHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);
  const [isProjectSheetOpen, setIsProjectSheetOpen] = useState(false);

  const { currentProject } = useProjectStore();

  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = searchWalkies(searchQuery, currentProject?.id);
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery, currentProject?.id]);

  const handleSelectWalkie = (walkieId: number) => {
    router.push(
      `/dashboard/walkies?search=${searchQuery}&highlight=${walkieId}`
    );
    setSearchQuery("");
    setIsSearchOpen(false);
    setIsMobileSearchExpanded(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Home":
        return "bg-green-100 text-green-700 border-green-200";
      case "Away":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Broken":
        return "bg-red-100 text-red-700 border-red-200";
      case "Lost":
        return "bg-red-100 text-red-700 border-red-200";
      case "Returned":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMobileSearchExpanded(false);
    }
  };

  const handleCloseMobileSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
    setIsMobileSearchExpanded(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-2 px-4 md:px-6">
        {/* Mobile Search Expanded State */}
        {isMobileSearchExpanded ? (
          <div className="flex items-center gap-2 flex-1 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseMobileSearch}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={
                  currentProject
                    ? `Search in ${currentProject.name}...`
                    : "Search walkies..."
                }
                className="w-full pl-9 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Logo Icon Only - Mobile */}
            <div className="flex items-center lg:hidden">
              <Link href="/dashboard">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    W
                  </span>
                </div>
              </Link>
            </div>

            {/* Project Switcher - Mobile (Sheet) */}
            <div className="lg:hidden">
              <Sheet
                open={isProjectSheetOpen}
                onOpenChange={setIsProjectSheetOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full mr-2",
                        currentProject?.status === "Active"
                          ? "bg-green-500"
                          : currentProject?.status === "On Hold"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      )}
                    />
                    <span className="truncate max-w-[120px]">
                      {currentProject?.name || "Select"}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto max-h-[85vh]">
                  <SheetHeader className="mb-4">
                    <SheetTitle>Switch Project</SheetTitle>
                  </SheetHeader>
                  <div className="pb-4">
                    <ProjectSwitcher />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Project Switcher - Desktop */}
            <div className="hidden lg:block">
              <ProjectSwitcher />
            </div>

            {/* Search Icon - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden ml-auto"
              onClick={() => setIsMobileSearchExpanded(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 relative max-w-2xl mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={
                    currentProject
                      ? `Search in ${currentProject.name}...`
                      : "Search walkies..."
                  }
                  className="w-full pl-9 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Actions - Right */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </Button>

              {/* Help */}
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <HelpCircle className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/avatar-placeholder.png" alt="User" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        JS
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        John Smith
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Project Manager
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile - Notification & User Menu */}
            <div className="flex lg:hidden items-center gap-1">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full p-0"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatar-placeholder.png" alt="User" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        JS
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        John Smith
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Project Manager
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>

      {/* Search Results Dropdown - Works for both mobile and desktop */}
      {isSearchOpen && searchResults.length > 0 && (
        <div
          className={cn(
            "absolute bg-background border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50",
            isMobileSearchExpanded
              ? "top-full left-4 right-4 mt-2"
              : "top-full left-4 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:max-w-2xl mt-2"
          )}
        >
          <div className="p-2">
            <p className="text-xs text-muted-foreground mb-2 px-2">
              Found {searchResults.length} walkie
              {searchResults.length !== 1 ? "s" : ""}
              {currentProject && ` in ${currentProject.name}`}
            </p>
            <div className="space-y-1">
              {searchResults.map((walkie) => (
                <button
                  key={walkie.id}
                  className="w-full text-left p-3 hover:bg-secondary rounded-md transition-colors"
                  onClick={() => handleSelectWalkie(walkie.id)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {walkie.serialNumber}
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm">{walkie.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {walkie.innerLabel}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {walkie.department && (
                          <>
                            <span>{walkie.department}</span>
                            {walkie.assignedTo && (
                              <>
                                <span>•</span>
                                <span>{walkie.assignedTo}</span>
                              </>
                            )}
                          </>
                        )}
                        {!walkie.department && <span>Not assigned</span>}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={getStatusColor(walkie.status)}
                    >
                      {walkie.status}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => {
                  router.push(`/dashboard/walkies?search=${searchQuery}`);
                  setSearchQuery("");
                  setIsSearchOpen(false);
                  setIsMobileSearchExpanded(false);
                }}
              >
                View all results in Walkies page →
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {isSearchOpen && searchQuery && searchResults.length === 0 && (
        <div
          className={cn(
            "absolute bg-background border rounded-lg shadow-lg p-4 z-50",
            isMobileSearchExpanded
              ? "top-full left-4 right-4 mt-2"
              : "top-full left-4 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:max-w-2xl mt-2"
          )}
        >
          <p className="text-sm text-muted-foreground text-center">
            No walkies found matching "{searchQuery}"
            {currentProject && ` in ${currentProject.name}`}
          </p>
        </div>
      )}
    </header>
  );
}
