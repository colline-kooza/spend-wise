"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Grid3x3, List } from "lucide-react"

import {
  useAssignments,
  useAvailableWalkies,
  useCreateAssignment,
  useExtendAssignment,
  useReturnAssignment,
  useCancelAssignment,
  useCrewMembers,
} from "@/hooks/use-walkie-assignments"

import type { WalkieAssignment } from "@/types/walkie-assignment"
import { AssignmentCard } from "./assignment-card"
import { AssignmentTable } from "./assignment-table"
import { AssignmentCreateModal } from "./assignment-create-model"
import { AssignmentDetailsModal } from "./assignment-detail-model"
import { AssignmentExtendModal } from "./assignment-extend-model"
import { AssignmentReturnModal } from "./assignment-return-model"

interface AssignmentsListingsProps {
  projectId: string
  userId: string
}

export function AssignmentsListings({ projectId, userId }: AssignmentsListingsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "returned" | "overdue">("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<WalkieAssignment | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isExtendOpen, setIsExtendOpen] = useState(false)
  const [isReturnOpen, setIsReturnOpen] = useState(false)

  // Fetch data
  const { assignments, isLoading: isAssignmentsLoading } = useAssignments(projectId, userId, 1, {
    search: searchTerm || undefined,
    status: statusFilter === "all" ? undefined : statusFilter,
  })

  const { walkies, isLoading: isWalkiesLoading } = useAvailableWalkies(projectId, userId)

  const { crewMembers } = useCrewMembers(projectId, userId)

  // Mutations
  const createAssignment = useCreateAssignment(projectId, userId)
  const extendAssignment = useExtendAssignment(projectId, userId)
  const returnAssignment = useReturnAssignment(projectId, userId)
  const cancelAssignment = useCancelAssignment(projectId, userId)

  // Handlers
  const handleCreate = useCallback(
    async (data: any) => {
      await createAssignment.mutateAsync(data)
    },
    [createAssignment],
  )

  const handleView = useCallback((assignment: WalkieAssignment) => {
    setSelectedAssignment(assignment)
    setIsDetailsOpen(true)
  }, [])

  const handleExtend = useCallback((assignment: WalkieAssignment) => {
    setSelectedAssignment(assignment)
    setIsExtendOpen(true)
  }, [])

  const handleReturn = useCallback((assignment: WalkieAssignment) => {
    setSelectedAssignment(assignment)
    setIsReturnOpen(true)
  }, [])

  const handleCancel = useCallback(
    (assignment: WalkieAssignment) => {
      if (window.confirm("Are you sure you want to cancel this assignment?")) {
        cancelAssignment.mutate(assignment.id)
      }
    },
    [cancelAssignment],
  )

  const handleExtendSubmit = async (data: any) => {
    await extendAssignment.mutateAsync(data)
    setIsExtendOpen(false)
  }

  const handleReturnSubmit = async (assignmentId: string, notes?: string) => {
    await returnAssignment.mutateAsync({
      assignmentId,
      notes,
    })
    setIsReturnOpen(false)
  }

  return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">Manage and track walkie-talkie assignments</p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 sm:gap-2 self-start sm:self-auto text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
        >
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Create Assignment
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        <div className="flex-1 min-w-[180px] sm:min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            <Input
              placeholder="Search by walkie, member..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 sm:pl-10 border-border focus:border-primary focus:ring-primary text-sm h-9 sm:h-10"
            />
          </div>
        </div>

        <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
          <SelectTrigger className="w-[130px] sm:w-[150px] border-border text-sm h-9 sm:h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value="all" className="text-sm">All Assignments</SelectItem>
            <SelectItem value="active" className="text-sm">Active</SelectItem>
            <SelectItem value="returned" className="text-sm">Returned</SelectItem>
            <SelectItem value="overdue" className="text-sm">Overdue</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-1 border border-border rounded-lg p-1">
          <Button
            size="sm"
            variant={viewMode === "grid" ? "default" : "ghost"}
            onClick={() => setViewMode("grid")}
            className="gap-1 h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <Grid3x3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === "table" ? "default" : "ghost"}
            onClick={() => setViewMode("table")}
            className="gap-1 h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {isAssignmentsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner className="h-8 w-8" />
        </div>
      ) : assignments.length === 0 ? (
        <div className="text-center py-8 sm:py-10 lg:py-12 px-4">
          <p className="text-muted-foreground text-sm mb-3 sm:mb-4">No assignments found</p>
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-9"
          >
            Create First Assignment
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment as any}
              onView={handleView}
              onExtend={handleExtend}
              onReturn={handleReturn}
              onCancel={handleCancel}
            />
          ))}
        </div>
      ) : (
        <AssignmentTable
          assignments={assignments as any}
          onView={handleView}
          onExtend={handleExtend}
          onReturn={handleReturn}
          onCancel={handleCancel}
        />
      )}

      {/* Modals */}
      <AssignmentCreateModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        walkies={walkies}
        crewMembers={crewMembers}
        onSubmit={handleCreate}
        isLoading={createAssignment.isPending}
      />

      <AssignmentDetailsModal
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        assignment={selectedAssignment}
        onExtend={handleExtend}
        onReturn={handleReturn}
      />

      <AssignmentExtendModal
        open={isExtendOpen}
        onOpenChange={setIsExtendOpen}
        assignment={selectedAssignment}
        onSubmit={handleExtendSubmit}
        isLoading={extendAssignment.isPending}
      />

      <AssignmentReturnModal
        open={isReturnOpen}
        onOpenChange={setIsReturnOpen}
        assignment={selectedAssignment}
        onSubmit={handleReturnSubmit}
        isLoading={returnAssignment.isPending}
      />
    </div>
  )
}