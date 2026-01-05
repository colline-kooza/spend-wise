"use client"
import { useState } from "react"
import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Plus, Building2, Package, BarChart3, Zap, LayoutGrid, LayoutList } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useDepartments, useCreateDepartment, useUpdateDepartment, useDeleteDepartment } from "@/hooks/use-departments"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Department, CreateDepartmentRequest } from "@/types/departments"
import { DepartmentCard } from "./departments-card"
import { DepartmentsTable } from "./departments-table"
import { DepartmentForm } from "./department-form"
import { WalkieDialog } from "./wakie-dialog"

interface DepartmentsListingProps {
  projectId: string
  userId: string
}

function SortableDepartmentCard({ department, onEdit, onDelete, onViewWalkies }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: department.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <DepartmentCard
      department={department}
      onEdit={onEdit}
      onDelete={onDelete}
      onViewWalkies={onViewWalkies}
      isDragging={isDragging}
      dragAttributes={attributes}
      dragListeners={listeners}
      setNodeRef={setNodeRef}
      style={style}
    />
  )
}

function SkeletonCard() {
  return (
    <Card className="border-border">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-5 w-5" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-8 w-8" />
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

export function DepartmentsListing({ projectId, userId }: DepartmentsListingProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [localDepartments, setLocalDepartments] = useState<Department[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [createFormOpen, setCreateFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [walkieDialogOpen, setWalkieDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const { departments, isLoading, pagination } = useDepartments(
    projectId,
    userId,
    currentPage,
    searchQuery ? { search: searchQuery } : undefined,
  )

  const createDept = useCreateDepartment(projectId, userId)
  const updateDept = useUpdateDepartment(projectId, userId)
  const deleteDept = useDeleteDepartment(projectId, userId)

  // Update local departments when fetched
  React.useEffect(() => {
    if (departments) {
      setLocalDepartments(departments as any)
    }
  }, [departments])

  // Reset to page 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setLocalDepartments((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleCreateSubmit = async (data: CreateDepartmentRequest) => {
    await createDept.mutateAsync(data)
    setCreateFormOpen(false)
  }

  const handleEditSubmit = async (data: CreateDepartmentRequest) => {
    if (selectedDepartment) {
      await updateDept.mutateAsync({
        departmentId: selectedDepartment.id,
        data,
      })
      setEditFormOpen(false)
      setSelectedDepartment(null)
    }
  }

  const handleDeleteSubmit = async () => {
    if (selectedDepartment) {
      await deleteDept.mutateAsync(selectedDepartment.id)
      setLocalDepartments((prev) => prev.filter((d) => d.id !== selectedDepartment.id))
      setDeleteDialogOpen(false)
      setSelectedDepartment(null)
    }
  }

  const stats = [
    {
      label: "Total Departments",
      value: pagination.total,
      icon: Building2,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Total Walkies",
      value: localDepartments.reduce((sum, d) => sum + (d.walkieTalkies?.length || 0), 0),
      icon: Package,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Avg Walkies/Dept",
      value:
        pagination.total > 0
          ? Math.round(localDepartments.reduce((sum, d) => sum + (d.walkieTalkies?.length || 0), 0) / pagination.total)
          : 0,
      icon: BarChart3,
      color: "bg-green-100 text-green-700",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <div className="border-border bg-card">
        <div className="pt-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search departments..."
                className="pl-9 bg-secondary border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 bg-secondary p-1 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  className={viewMode === "grid" ? "bg-primary" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  className={viewMode === "table" ? "bg-primary" : ""}
                  onClick={() => setViewMode("table")}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={() => setCreateFormOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Department
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> In grid view, drag departments to reorder them. Click on any department to view its
            assigned walkie-talkies. Showing {localDepartments.length} of {pagination.total} departments.
          </p>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className={`${viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : ""}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : viewMode === "grid" ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={localDepartments.map((d) => d.id)} strategy={rectSortingStrategy}>
            {localDepartments.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {localDepartments.map((dept) => (
                  <SortableDepartmentCard
                    key={dept.id}
                    department={dept}
                    onEdit={(d: Department) => {
                      setSelectedDepartment(d)
                      setEditFormOpen(true)
                    }}
                    onDelete={(d: Department) => {
                      setSelectedDepartment(d)
                      setDeleteDialogOpen(true)
                    }}
                    onViewWalkies={(d: Department) => {
                      setSelectedDepartment(d)
                      setWalkieDialogOpen(true)
                    }}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-border">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No departments found</h3>
                  <p className="text-sm text-muted-foreground mb-4">Create your first department to get started</p>
                  <Button onClick={() => setCreateFormOpen(true)} className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Department
                  </Button>
                </CardContent>
              </Card>
            )}
          </SortableContext>
        </DndContext>
      ) : localDepartments.length > 0 ? (
        <DepartmentsTable
          departments={localDepartments}
          onEdit={(d: Department) => {
            setSelectedDepartment(d)
            setEditFormOpen(true)
          }}
          onDelete={(d: Department) => {
            setSelectedDepartment(d)
            setDeleteDialogOpen(true)
          }}
          onViewWalkies={(d: Department) => {
            setSelectedDepartment(d)
            setWalkieDialogOpen(true)
          }}
        />
      ) : (
        <Card className="border-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No departments found</h3>
            <p className="text-sm text-muted-foreground mb-4">Create your first department to get started</p>
            <Button onClick={() => setCreateFormOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Department
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modals and Dialogs */}
      <DepartmentForm
        open={createFormOpen}
        onOpenChange={setCreateFormOpen}
        onSubmit={handleCreateSubmit}
        isLoading={createDept.isPending}
      />

      <DepartmentForm
        open={editFormOpen}
        onOpenChange={setEditFormOpen}
        department={selectedDepartment || undefined}
        onSubmit={handleEditSubmit}
        isLoading={updateDept.isPending}
      />

      <WalkieDialog open={walkieDialogOpen} onOpenChange={setWalkieDialogOpen} department={selectedDepartment} userId={userId} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-background border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete Department</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete "{selectedDepartment?.name}"? This action cannot be undone. All associated
              data will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel className="border-border hover:bg-secondary">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSubmit}
              disabled={deleteDept.isPending}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              {deleteDept.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}