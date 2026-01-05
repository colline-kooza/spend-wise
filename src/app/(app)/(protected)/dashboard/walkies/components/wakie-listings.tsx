"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Search,
  Plus,
  Radio,
  Package,
  Zap,
  LayoutGrid,
  LayoutList,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Activity,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Wifi,
  Calendar,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type {
  WalkieTalkie,
  CreateWalkieTalkieRequest,
} from "@/types/walkie-talkie";
import type { CrewMember } from "@/types/crew-members";
import {
  useCreateWalkieTalkie,
  useDeleteWalkieTalkie,
  useDepartmentsForProject,
  useUpdateWalkieTalkie,
  useWalkieTalkies,
  useWalkieTalkieDetails,
} from "@/hooks/use-walkies";
import { WalkieCard } from "./walkie-card";
import { WalkieTable } from "./walkie-table";
import { WalkieForm } from "./wakie-form";
import { WalkieDetailsModal } from "./walkie-detailes-model";
import { cn } from "@/lib/utils";
import { UpgradeModal } from "@/components/dashboard/upgrade-modal";

interface WalkieListingProps {
  projectId: string;
  userId: string;
  initialDepartments: any[];
  initialCrewMembers: any[];
}

function SkeletonCard() {
  return (
    <Card className="border-border">
      <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <Skeleton className="h-4 w-4 sm:h-5 sm:w-5" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 sm:h-5 w-24 sm:w-32" />
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
          </div>
          <Skeleton className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>
        <Skeleton className="h-10 sm:h-12 w-full" />
        <Skeleton className="h-8 sm:h-10 w-full" />
      </CardContent>
    </Card>
  );
}

const statusConfig = {
  available: {
    bg: "bg-green-50 dark:bg-green-950",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    label: "Available",
  },
  assigned: {
    bg: "bg-blue-50 dark:bg-blue-950",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    label: "Assigned",
  },
  broken: {
    bg: "bg-red-50 dark:bg-red-950",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    label: "Broken",
  },
  maintenance: {
    bg: "bg-red-50 dark:bg-red-950",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    label: "Broken",
  },
  inactive: {
    bg: "bg-gray-50 dark:bg-gray-950",
    badge: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    label: "Inactive",
  },
};

function ResponsiveWalkieCard({ walkie, onEdit, onDelete, onView }: any) {
  const config =
    statusConfig[(walkie?.status ?? "inactive") as keyof typeof statusConfig] || statusConfig.inactive;

  const activeAssignment = walkie.assignments?.find((a: any) => !a.returnDate);
  const expectedReturnDate = activeAssignment?.expectedReturnDate;
  const isOverdue =
    expectedReturnDate && new Date() > new Date(expectedReturnDate);

  return (
    <Card
      className={cn(
        "overflow-hidden border-border transition-all hover:shadow-md hover:border-primary/50",
        config.bg,
        isOverdue &&
          "bg-red-100 dark:bg-red-900/40 border-red-300 dark:border-red-700 ring-1 ring-red-300 dark:ring-red-700"
      )}
    >
      <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <Radio className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">
                {walkie.serialNumber}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1 mb-1">
              {walkie.label && (
                <Badge variant="outline" className="text-[10px] h-5">
                  {walkie.label}
                </Badge>
              )}
              {walkie.innerLabel && (
                <Badge
                  variant="outline"
                  className="text-[10px] h-5 bg-secondary/50"
                >
                  {walkie.innerLabel}
                </Badge>
              )}
            </div>
            <Badge className={cn(config.badge, "text-xs")}>
              {config.label}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 sm:h-8 sm:w-8 p-0"
              >
                <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background border-border"
            >
              <DropdownMenuItem
                onClick={() => onView(walkie)}
                className="cursor-pointer text-sm"
              >
                <Eye className="h-3.5 w-3.5 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onEdit(walkie)}
                className="cursor-pointer text-sm"
              >
                <Edit className="h-3.5 w-3.5 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(walkie)}
                className="text-destructive cursor-pointer text-sm"
              >
                <Trash2 className="h-3.5 w-3.5 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Department */}
        {walkie.department && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: walkie.department.color }}
            />
            <span className="text-xs sm:text-sm font-medium text-foreground truncate">
              {walkie.department.name}
            </span>
            {walkie.department.code && (
              <span className="text-xs text-muted-foreground flex-shrink-0">
                ({walkie.department.code})
              </span>
            )}
          </div>
        )}

        {/* Current Assignment / Return Date */}
        {(activeAssignment || expectedReturnDate) && (
          <div className="pt-2 border-t border-border/30 bg-background/50 -mx-3 sm:-mx-4 -mb-3 sm:-mb-4 px-3 sm:px-4 py-2 sm:py-3 rounded-b">
            {activeAssignment && (
                <>
                <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1">
                Currently With
                </p>
                <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                {activeAssignment.assignedToName ||
                    (activeAssignment.crewMember
                    ? `${activeAssignment.crewMember.firstName} ${activeAssignment.crewMember.lastName}`
                    : "Unknown")}
                </p>
                </>
            )}
            
            {expectedReturnDate && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                    <Calendar className={cn("h-3 w-3 flex-shrink-0", isOverdue ? "text-red-600 dark:text-red-400" : "text-muted-foreground")} />
                    <span className={cn(isOverdue ? "text-red-600 dark:text-red-400 font-bold" : "text-muted-foreground")}>
                      Return date: {format(new Date(expectedReturnDate), "MMM d, yyyy")}
                      {isOverdue && <span className="ml-1">(Overdue)</span>}
                    </span>
                 </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

export function WalkieListings({
  projectId,
  userId,
  initialDepartments,
  initialCrewMembers,
}: WalkieListingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showMetrics, setShowMetrics] = useState(false);
  const [selectedWalkie, setSelectedWalkie] = useState<WalkieTalkie | null>(
    null
  );
  const [sortConfig, setSortConfig] = useState<{
    field: string;
    order: "asc" | "desc";
  }>({ field: "department", order: "asc" });
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { walkieTalkies, isLoading, pagination } = useWalkieTalkies(
    projectId,
    userId,
    1,
    searchQuery ||
      (statusFilter && statusFilter !== "all") ||
      (departmentFilter && departmentFilter !== "all")
      ? {
          search: searchQuery,
          status:
            statusFilter && statusFilter !== "all" ? statusFilter : undefined,
          departmentId:
            departmentFilter && departmentFilter !== "all"
              ? departmentFilter
              : undefined,
        }
      : undefined,
    sortConfig
  );

  const { walkieTalkie: fullWalkieDetails, isLoading: detailsLoading } =
    useWalkieTalkieDetails(selectedWalkie?.id || "", projectId, userId);

  const { departments, isLoading: deptLoading } = useDepartmentsForProject(
    projectId,
    userId
  );

  // Use initialDepartments if departments from hook is empty/loading, or just prefer hook if available.
  const effectiveDepartments =
    departments && departments.length > 0 ? departments : initialDepartments;

  const createWalkie = useCreateWalkieTalkie(projectId, userId);
  const updateWalkie = useUpdateWalkieTalkie(projectId, userId);
  const deleteWalkie = useDeleteWalkieTalkie(projectId, userId);

  const handleSort = (field: string) => {
    setSortConfig((current) => ({
      field,
      order:
        current.field === field && current.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleCreateSubmit = async (data: CreateWalkieTalkieRequest) => {
    try {
      await createWalkie.mutateAsync(data);
      setCreateFormOpen(false);
    } catch (error: any) {
      if (error.message && error.message.includes("limit")) {
        setShowUpgradeModal(true);
      }
    }
  };

  const handleEditSubmit = async (data: CreateWalkieTalkieRequest) => {
    if (selectedWalkie) {
      await updateWalkie.mutateAsync({
        walkieTalkieId: selectedWalkie.id,
        data,
      });
      setEditFormOpen(false);
      setSelectedWalkie(null);
    }
  };

  const handleDeleteSubmit = async () => {
    if (selectedWalkie) {
      await deleteWalkie.mutateAsync(selectedWalkie.id);
      setDeleteDialogOpen(false);
      setSelectedWalkie(null);
    }
  };

  const stats = [
    {
      label: "Total Walkies",
      value: pagination.total,
      icon: Radio,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      darkBg: "dark:bg-purple-950/50",
      iconColor: "text-white",
    },
    {
      label: "Available",
      value: walkieTalkies.filter((w) => w.status === "available").length,
      icon: Package,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      lightBg: "bg-emerald-50",
      darkBg: "dark:bg-emerald-950/50",
      iconColor: "text-white",
    },
    {
      label: "Assigned",
      value: walkieTalkies.filter((w) => w.status === "assigned").length,
      icon: Activity,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      darkBg: "dark:bg-blue-950/50",
      iconColor: "text-white",
    },
    {
      label: "Maintenance",
      value: walkieTalkies.filter((w) => w.status === "maintenance").length,
      icon: Zap,
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      lightBg: "bg-amber-50",
      darkBg: "dark:bg-amber-950/50",
      iconColor: "text-white",
    },
  ];

  return (
    <div className="space-y-2 sm:space-y-3 lg:space-y-4">
      {/* Header with Metrics */}
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl border border-border bg-gradient-to-br from-background via-background to-secondary/20 shadow-sm">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />

        <div className="relative p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div className="space-y-0.5 sm:space-y-1">
              <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold tracking-tight bg-gradient-to-br from-purple-700 via-purple-700 to-black bg-clip-text text-transparent">
                Walkie Talkie Inventory
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage and track your communication equipment
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMetrics(!showMetrics)}
              className="hover:bg-secondary/80 transition-all duration-200 self-start sm:self-auto text-xs sm:text-sm h-8 sm:h-9"
            >
              <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              {showMetrics ? "Hide" : "Show"} Stats
              {showMetrics ? (
                <ChevronUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1" />
              )}
            </Button>
          </div>

          {/* Metrics Grid */}
          {showMetrics && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className={`relative overflow-hidden rounded-md sm:rounded-lg border border-border ${stat.lightBg} ${stat.darkBg} p-3 sm:p-4 transition-all duration-200 hover:shadow-md hover:scale-105`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5 sm:space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {stat.label}
                        </p>
                        <p className="text-2xl sm:text-3xl font-semibold text-foreground">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`p-1.5 sm:p-2.5 rounded-md sm:rounded-lg ${stat.color} shadow-lg transition-transform hover:scale-110 duration-200`}
                      >
                        <Icon
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.iconColor}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Filters and Controls */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="pt-4 sm:pt-5 lg:pt-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-full md:max-w-sm">
                <Search className="absolute left-2.5 sm:left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search walkies..."
                  className="pl-8 sm:pl-9 text-sm h-9 sm:h-10 bg-secondary border-border focus-visible:ring-2 focus-visible:ring-primary transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 bg-secondary p-1 rounded-lg border border-border">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    className={`transition-all duration-200 h-7 w-7 sm:h-8 sm:w-8 p-0 ${
                      viewMode === "grid"
                        ? "bg-primary shadow-sm"
                        : "hover:bg-secondary-foreground/10"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    className={`transition-all duration-200 h-7 w-7 sm:h-8 sm:w-8 p-0 ${
                      viewMode === "table"
                        ? "bg-primary shadow-sm"
                        : "hover:bg-secondary-foreground/10"
                    }`}
                    onClick={() => setViewMode("table")}
                  >
                    <LayoutList className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => setCreateFormOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200 text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
                >
                  <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  New Walkie
                </Button>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:items-end">
              <div className="flex-1 max-w-full md:max-w-xs">
                <label className="text-xs text-muted-foreground font-medium block mb-1.5 sm:mb-2">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-border bg-secondary hover:bg-secondary/80 transition-colors text-sm h-9 sm:h-10">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all" className="text-sm">
                      All statuses
                    </SelectItem>
                    <SelectItem value="available" className="text-sm">
                      Available
                    </SelectItem>
                    <SelectItem value="assigned" className="text-sm">
                      Assigned
                    </SelectItem>
                    <SelectItem value="maintenance" className="text-sm">
                      Maintenance
                    </SelectItem>
                    <SelectItem value="inactive" className="text-sm">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 max-w-full md:max-w-xs">
                <label className="text-xs text-muted-foreground font-medium block mb-1.5 sm:mb-2">
                  Department
                </label>
                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="border-border bg-secondary hover:bg-secondary/80 transition-colors text-sm h-9 sm:h-10">
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all" className="text-sm">
                      All departments
                    </SelectItem>
                    {departments.map((dept) => (
                      <SelectItem
                        key={dept.id}
                        value={dept.id}
                        className="text-sm"
                      >
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md sm:rounded-lg p-3 sm:p-4 shadow-sm">
        <div className="flex items-start gap-2 sm:gap-3">
          <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 mt-0.5 sm:mt-1 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> Click on any walkie to view full details
            including assignment history. Use filters to organize by department
            or status.
          </p>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div
          className={`${
            viewMode === "grid"
              ? "grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : ""
          }`}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : viewMode === "grid" ? (
        walkieTalkies.length > 0 ? (
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {walkieTalkies.map((walkie) => (
              <ResponsiveWalkieCard
                key={walkie.id}
                walkie={walkie}
                onEdit={(w: any) => {
                  setSelectedWalkie(w);
                  setEditFormOpen(true);
                }}
                onDelete={(w: any) => {
                  setSelectedWalkie(w);
                  setDeleteDialogOpen(true);
                }}
                onView={(w: any) => {
                  setSelectedWalkie(w);
                  setDetailsModalOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <Card className="border-border shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-10 lg:py-12 px-4">
              <div className="bg-secondary/50 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                <Radio className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">
                No walkies found
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 text-center max-w-sm px-4">
                {searchQuery ||
                statusFilter !== "all" ||
                departmentFilter !== "all"
                  ? "No walkies match your current filters. Try adjusting your search criteria."
                  : "Create your first walkie talkie to get started with your inventory management"}
              </p>
              <Button
                onClick={() => setCreateFormOpen(true)}
                className="bg-primary hover:bg-primary/90 shadow-sm text-sm h-9"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Walkie
              </Button>
            </CardContent>
          </Card>
        )
      ) : walkieTalkies.length > 0 ? (
        <WalkieTable
          walkies={walkieTalkies}
          sortConfig={sortConfig}
          onSort={handleSort}
          onEdit={(w) => {
            setSelectedWalkie(w);
            setEditFormOpen(true);
          }}
          onDelete={(w) => {
            setSelectedWalkie(w);
            setDeleteDialogOpen(true);
          }}
          onView={(w) => {
            setSelectedWalkie(w);
            setDetailsModalOpen(true);
          }}
          userId={userId}
          projectId={projectId}
        />
      ) : (
        <Card className="border-border shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-10 lg:py-12 px-4">
            <div className="bg-secondary/50 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
              <Radio className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">
              No walkies found
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 text-center max-w-sm px-4">
              {searchQuery ||
              statusFilter !== "all" ||
              departmentFilter !== "all"
                ? "No walkies match your current filters. Try adjusting your search criteria."
                : "Create your first walkie talkie to get started with your inventory management"}
            </p>
            <Button
              onClick={() => setCreateFormOpen(true)}
              className="bg-primary hover:bg-primary/90 shadow-sm text-sm h-9"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Walkie
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modals and Dialogs */}
      <WalkieForm
        open={createFormOpen}
        onOpenChange={setCreateFormOpen}
        departments={effectiveDepartments}
        crewMembers={initialCrewMembers}
        onSubmit={handleCreateSubmit}
        isLoading={createWalkie.isPending}
      />

      <WalkieForm
        open={editFormOpen}
        onOpenChange={setEditFormOpen}
        walkie={fullWalkieDetails || selectedWalkie || undefined}
        departments={effectiveDepartments}
        crewMembers={initialCrewMembers}
        onSubmit={handleEditSubmit}
        isLoading={updateWalkie.isPending}
      />

      <WalkieDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        walkie={fullWalkieDetails || selectedWalkie || undefined}
        isLoading={detailsLoading}
        userId={userId}
        projectId={projectId}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-background border-border max-w-[calc(100%-2rem)] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground text-base sm:text-lg">
              Delete Walkie Talkie
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              Are you sure you want to delete "{selectedWalkie?.serialNumber}"?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel className="border-border hover:bg-secondary text-sm h-9">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSubmit}
              disabled={deleteWalkie.isPending}
              className="bg-destructive hover:bg-destructive/90 text-white text-sm h-9"
            >
              {deleteWalkie.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title="Walkie Talkie Limit Reached"
        description="You have reached the maximum number of walkie talkies for your current plan. Upgrade to Indie or Pro for unlimited walkie talkies."
        planName="Indie"
      />
    </div>
  );
}
