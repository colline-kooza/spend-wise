"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Users, Briefcase, LayoutGrid, LayoutList, ChevronDown, ChevronUp, BarChart3, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useCreateCrewMember, useDeleteCrewMember, useUpdateCrewMember, useCrewMembers } from "@/hooks/use-crew-members"
import { CrewCard } from "./crew-card"
import { CrewForm } from "./crew-form"
import { CreateCrewMemberRequest, CrewMember } from "@/types/crew-members"
import { useDepartmentsForProject, useWalkieTalkies } from "@/hooks/use-walkies"
import { CrewTable } from "./crew-table"
import { CrewDetailsModal } from "./crew-member-details"
import { cn } from "@/lib/utils"

interface CrewListingsProps {
  projectId: string
  userId: string
}

function SkeletonCard() {
  return (
    <Card className="border-border">
      <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 sm:h-5 w-24 sm:w-32" />
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
          </div>
          <Skeleton className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>
        <Skeleton className="h-5 sm:h-6 w-20 sm:w-24" />
        <Skeleton className="h-8 sm:h-10 w-full" />
      </CardContent>
    </Card>
  )
}

function ResponsiveCrewCard({ crewMember, onEdit, onDelete, onView }: any) {
  const initials = `${crewMember.firstName[0]}${crewMember.lastName[0]}`.toUpperCase()

  return (
    <Card className="border-border bg-card overflow-hidden hover:shadow-md transition-all duration-300 group relative">
      {/* Background icon with low opacity */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <Users className="h-24 w-24 sm:h-32 sm:w-32 text-primary" />
      </div>

      <div className="relative p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg truncate">
              {crewMember.firstName} {crewMember.lastName}
            </h3>
            {crewMember.role && <p className="text-xs sm:text-sm text-muted-foreground truncate">{crewMember.role}</p>}
          </div>

          {/* Avatar Circle */}
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-primary">{initials}</span>
          </div>
        </div>

        {/* Department Badge */}
        {crewMember.department && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {crewMember.department.color && (
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: crewMember.department.color }} />
            )}
            <Badge variant="secondary" className="bg-secondary/80 text-secondary-foreground hover:bg-secondary text-xs truncate">
              {crewMember.department.name}
            </Badge>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-0.5 sm:space-y-1 text-xs text-muted-foreground">
          {crewMember.email && (
            <p className="truncate hover:text-foreground transition-colors cursor-pointer" title={crewMember.email}>
              📧 {crewMember.email}
            </p>
          )}
          {crewMember.phone && (
            <p className="truncate hover:text-foreground transition-colors cursor-pointer" title={crewMember.phone}>
              📱 {crewMember.phone}
            </p>
          )}
        </div>

        {/* Walkie Assignment Count */}
        {crewMember.walkieTalkieAssignments && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs font-medium text-primary">
               {crewMember.walkieTalkieAssignments.filter((a: any) => !a.returnDate).length} walkie-talkie
               {crewMember.walkieTalkieAssignments.filter((a: any) => !a.returnDate).length !== 1 ? "s" : ""} assigned
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(crewMember)}
            className="hover:bg-secondary flex-1 text-xs sm:text-sm h-8 sm:h-9"
            title="View Details"
          >
            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
            View
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-secondary h-8 w-8 sm:h-9 sm:w-9 p-0">
                <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-border">
              <DropdownMenuItem onClick={() => onEdit(crewMember)} className="cursor-pointer text-sm">
                <Edit className="h-3.5 w-3.5 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(crewMember)} className="text-destructive cursor-pointer text-sm">
                <Trash2 className="h-3.5 w-3.5 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  )
}

export function CrewListings({ projectId, userId }: CrewListingsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [showMetrics, setShowMetrics] = useState(false)
  const [selectedCrew, setSelectedCrew] = useState<CrewMember | null>(null)
  const [createFormOpen, setCreateFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const { crewMembers, isLoading, pagination } = useCrewMembers(
    projectId,
    userId,
    1,
    searchQuery || (departmentFilter && departmentFilter !== "all") || (roleFilter && roleFilter !== "all")
      ? {
          search: searchQuery,
          departmentId: departmentFilter && departmentFilter !== "all" ? departmentFilter : undefined,
          role: roleFilter && roleFilter !== "all" ? roleFilter : undefined,
        }
      : undefined,
  )

  const { departments, isLoading: deptLoading } = useDepartmentsForProject(projectId, userId)
  const { walkieTalkies } = useWalkieTalkies(projectId, userId, 1, { limit: 100 }) // Fetch up to 100 for dropdown

  const createCrew = useCreateCrewMember(projectId, userId)
  const updateCrew = useUpdateCrewMember(projectId, userId)
  const deleteCrew = useDeleteCrewMember(projectId, userId)

  const handleCreateSubmit = async (data: CreateCrewMemberRequest) => {
    await createCrew.mutateAsync(data)
    setCreateFormOpen(false)
  }

  const handleEditSubmit = async (data: CreateCrewMemberRequest) => {
    if (selectedCrew) {
      await updateCrew.mutateAsync({
        crewMemberId: selectedCrew.id,
        data,
      })
      setEditFormOpen(false)
      setSelectedCrew(null)
    }
  }

  const handleDeleteSubmit = async () => {
    if (selectedCrew) {
      await deleteCrew.mutateAsync(selectedCrew.id)
      setDeleteDialogOpen(false)
      setSelectedCrew(null)
    }
  }

  const uniqueRoles = [...new Set(crewMembers.map((c) => c.role).filter(Boolean))]

  const stats = [
    {
      label: "Total Crew",
      value: pagination.total,
      icon: Users,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      darkBg: "dark:bg-blue-950/50",
      iconColor: "text-white",
    },
    {
      label: "Departments",
      value: departments.length,
      icon: Briefcase,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      darkBg: "dark:bg-purple-950/50",
      iconColor: "text-white",
    },
  ]

  return (
    <div className="space-y-2 sm:space-y-3 lg:space-y-6">
      {/* Header with Metrics */}
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl border border-border bg-gradient-to-br from-background via-background to-secondary/20 shadow-sm">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />

        <div className="relative p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div className="space-y-0.5 sm:space-y-1">
              <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold tracking-tight bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                Crew Management
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Manage your crew members and assign to departments</p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMetrics(!showMetrics)}
              className="hover:bg-secondary/80 transition-all duration-200 self-start sm:self-auto text-xs sm:text-sm h-8 sm:h-9"
            >
              <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              {showMetrics ? "Hide" : "Show"} Stats
              {showMetrics ? <ChevronUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1" /> : <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1" />}
            </Button>
          </div>

          {/* Metrics Grid */}
          {showMetrics && (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {stats.map((stat, idx) => {
                const Icon = stat.icon
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
                        <p className="text-2xl sm:text-3xl font-semibold text-foreground">{stat.value}</p>
                      </div>
                      <div
                        className={`p-1.5 sm:p-2.5 rounded-md sm:rounded-lg ${stat.color} shadow-lg transition-transform hover:scale-110 duration-200`}
                      >
                        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.iconColor}`} />
                      </div>
                    </div>
                  </div>
                )
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
                  placeholder="Search crew members..."
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
                      viewMode === "grid" ? "bg-primary shadow-sm" : "hover:bg-secondary-foreground/10"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    className={`transition-all duration-200 h-7 w-7 sm:h-8 sm:w-8 p-0 ${
                      viewMode === "table" ? "bg-primary shadow-sm" : "hover:bg-secondary-foreground/10"
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
                  Add Member
                </Button>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:items-end">
              <div className="flex-1 max-w-full md:max-w-xs">
                <label className="text-xs text-muted-foreground font-medium block mb-1.5 sm:mb-2">Department</label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="border-border bg-secondary hover:bg-secondary/80 transition-colors text-sm h-9 sm:h-10">
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all" className="text-sm">All departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id} className="text-sm">
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 max-w-full md:max-w-xs">
                <label className="text-xs text-muted-foreground font-medium block mb-1.5 sm:mb-2">Role</label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="border-border bg-secondary hover:bg-secondary/80 transition-colors text-sm h-9 sm:h-10">
                    <SelectValue placeholder="All roles" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all" className="text-sm">All roles</SelectItem>
                    {uniqueRoles.map((role) => (
                      <SelectItem key={role} value={role!} className="text-sm">
                        {role}
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
          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 mt-0.5 sm:mt-1 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> Click on any crew member to view full details including walkie-talkie assignments. Use
            filters to organize by department or role.
          </p>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className={`${viewMode === "grid" ? "grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : viewMode === "grid" ? (
        crewMembers.length > 0 ? (
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {crewMembers.map((crew) => (
              <ResponsiveCrewCard
                key={crew.id}
                crewMember={crew}
                onEdit={(c:any) => {
                  setSelectedCrew(c)
                  setEditFormOpen(true)
                }}
                onDelete={(c:any) => {
                  setSelectedCrew(c)
                  setDeleteDialogOpen(true)
                }}
                onView={(c:any) => {
                  setSelectedCrew(c)
                  setDetailsModalOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <Card className="border-border shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-10 lg:py-12 px-4">
              <div className="bg-secondary/50 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">No crew members yet</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 text-center max-w-sm px-4">
                {searchQuery || departmentFilter !== "all" || roleFilter !== "all"
                  ? "No crew members match your current filters. Try adjusting your search criteria."
                  : "Create your first crew member to get started with crew management"}
              </p>
              <Button onClick={() => setCreateFormOpen(true)} className="bg-primary hover:bg-primary/90 shadow-sm text-sm h-9">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </CardContent>
          </Card>
        )
      ) : crewMembers.length > 0 ? (
        <CrewTable
          crewMembers={crewMembers as any}
          onEdit={(c) => {
            setSelectedCrew(c)
            setEditFormOpen(true)
          }}
          onDelete={(c) => {
            setSelectedCrew(c)
            setDeleteDialogOpen(true)
          }}
          onView={(c) => {
            setSelectedCrew(c)
            setDetailsModalOpen(true)
          }}
        />
      ) : (
        <Card className="border-border shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-10 lg:py-12 px-4">
            <div className="bg-secondary/50 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">No crew members yet</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 text-center max-w-sm px-4">
              {searchQuery || departmentFilter !== "all" || roleFilter !== "all"
                ? "No crew members match your current filters. Try adjusting your search criteria."
                : "Create your first crew member to get started with crew management"}
            </p>
            <Button onClick={() => setCreateFormOpen(true)} className="bg-primary hover:bg-primary/90 shadow-sm text-sm h-9">
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </CardContent>
        </Card>
      )}

      <CrewForm
        open={createFormOpen}
        onOpenChange={setCreateFormOpen}
        departments={departments}
        walkies={walkieTalkies} 
        onSubmit={handleCreateSubmit}
        isLoading={createCrew.isPending}
      />

      <CrewForm
        open={editFormOpen}
        onOpenChange={setEditFormOpen}
        crewMember={selectedCrew || undefined}
        departments={departments}
        walkies={walkieTalkies}
        onSubmit={handleEditSubmit}
        isLoading={updateCrew.isPending}
      />

      <CrewDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        crewMember={selectedCrew || undefined}
        isLoading={false}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-background border-border max-w-[calc(100%-2rem)] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground text-base sm:text-lg">Delete Crew Member</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              Are you sure you want to delete "{selectedCrew?.firstName} {selectedCrew?.lastName}"? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel className="border-border hover:bg-secondary text-sm h-9">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSubmit}
              disabled={deleteCrew.isPending}
              className="bg-destructive hover:bg-destructive/90 text-white text-sm h-9"
            >
              {deleteCrew.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}