"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Edit, Trash2 } from "lucide-react"
import type { Project } from "@/types/projects"
import { StatusBadge } from "./status-badge"

interface ProjectDetailDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: any
  isLoading: boolean
  onEdit: () => void
  onDelete: () => void
  isDeleting?: boolean
}

export function ProjectDetailDrawer({
  open,
  onOpenChange,
  project,
  isLoading,
  onEdit,
  onDelete,
  isDeleting = false,
}: ProjectDetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-96 bg-white p-0 flex flex-col">
        <SheetHeader className="border-b border-gray-200 px-6 py-4">
          <SheetTitle className="text-xl font-semibold text-gray-900">Project Details</SheetTitle>
          <SheetDescription className="text-gray-600">View and manage project information</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 py-4 space-y-6">
            {isLoading ? (
              <>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </>
            ) : project ? (
              <>
                {/* Project Name */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Project Name</h3>
                  <p className="text-lg font-semibold text-gray-900">{project.name}</p>
                </div>

                {/* Status */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Status</h3>
                  <StatusBadge status={project.status} variant={project.status} />
                </div>

                {/* Description */}
                {project.description && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Description</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
                  </div>
                )}

                {/* Created Date */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Created</h3>
                  <p className="text-sm text-gray-700">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* Last Updated */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Last Updated</h3>
                  <p className="text-sm text-gray-700">
                    {new Date(project.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-6 py-4 flex gap-3">
          <Button
            onClick={onEdit}
            disabled={!project || isLoading}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            disabled={!project || isLoading || isDeleting}
            variant="outline"
            className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
