"use client"
import { useState } from "react"
import { Plus, RefreshCw, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/sonner"
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useProjectDetails,
} from "@/hooks/use-projects"
import type { Project, CreateProjectRequest, UpdateProjectRequest } from "@/types/projects"
import { ProjectForm } from "./project-form"
import { ProjectDetailDrawer } from "./project-detail-drawer"
import { StatsCards } from "./StatsCards"
import { DataTable } from "./projects-table"
import type { DataTableAction } from "./projects-table"

interface ProjectsPageProps {
  userId: string
  orgId: string
}

export default function ProjectsPage({ userId, orgId }: ProjectsPageProps) {
  const [activeTab, setActiveTab] = useState<"owned" | "shared">("owned")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set())

  // State for modals/drawers
  const [createFormOpen, setCreateFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Build filters based on active tab
  const filters = {
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchValue || undefined,
    type: activeTab,
  }

  // Queries and mutations
  const { projects, pagination, isLoading, error, refetch } = useProjects(userId, currentPage, filters)
  const { project: detailProject, isLoading: isLoadingDetails } = useProjectDetails(selectedProject?.id || "", userId)
  const createProject = useCreateProject(userId, orgId)
  const updateProject = useUpdateProject(userId)
  const deleteProject = useDeleteProject(userId)

// Calculate stats for owned projects only
const ownedProjects = projects.filter((p: any) => p.isOwner)
const stats = [
  { label: "Your Projects", value: ownedProjects.length, color: "blue" as const },
  { label: "Active", value: ownedProjects.filter((p: any) => p.status === "active").length, color: "orange" as const },
  { label: "Completed", value: ownedProjects.filter((p: any) => p.status === "completed").length, color: "green" as const },
  { label: "Shared with You", value: projects.filter((p: any) => !p.isOwner).length, color: "red" as const },
]

  // Reset page when changing tabs or filters
  const handleTabChange = (value: string) => {
    setActiveTab(value as "owned" | "shared")
    setCurrentPage(1)
    setSearchValue("")
    setStatusFilter("all")
  }

  // Handlers
  const handleCreateSubmit = async (data: CreateProjectRequest) => {
    await createProject.mutateAsync(data)
    setCreateFormOpen(false)
  }

  const handleEditSubmit = async (data: UpdateProjectRequest) => {
    if (selectedProject) {
      await updateProject.mutateAsync({ projectId: selectedProject.id, data })
      setEditFormOpen(false)
      setDetailsOpen(false)
      setSelectedProject(null)
    }
  }

  const handleDeleteSubmit = async () => {
    if (selectedProject) {
      await deleteProject.mutateAsync(selectedProject.id)
      setDetailsOpen(false)
      setSelectedProject(null)
    }
  }

  const handleViewProject = (project: Project) => {
    setSelectedProject(project)
    setDetailsOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setSelectedProject(project)
    setEditFormOpen(true)
  }

  const handleDeleteProject = (project: Project) => {
    setSelectedProject(project)
    deleteProject.mutate(project.id)
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-blue-50 text-blue-700 border-blue-200",
      completed: "bg-green-50 text-green-700 border-green-200",
      archived: "bg-gray-50 text-gray-700 border-gray-200",
    }
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getRoleBadge = (role?: string) => {
    if (!role || role === "owner") return null
    
    const variants = {
      admin: "bg-purple-50 text-purple-700 border-purple-200",
      editor: "bg-blue-50 text-blue-700 border-blue-200",
      viewer: "bg-gray-50 text-gray-700 border-gray-200",
    }
    return (
      <Badge variant="outline" className={variants[role as keyof typeof variants]}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    )
  }

  // DataTable configuration
  const columns = [
    {
      id: "name",
      header: "Project Name",
      cell: (project: Project) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            {project.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 text-sm">{project.name}</span>
            {!project.isOwner && (
              <span className="text-xs text-gray-500">
                Shared by {(project as any).owner?.name || "Unknown"}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      id: "description",
      header: "Description",
      cell: (project: Project) => (
        <span className="text-sm text-gray-600 line-clamp-1">
          {project.description || "—"}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: (project: Project) => (
        <div className="flex items-center gap-2">
          {getStatusBadge(project.status)}
          {getRoleBadge(project.userRole)}
        </div>
      ),
    },
    {
      id: "createdAt",
      header: "Created Date",
      cell: (project: Project) => (
        <span className="text-sm text-gray-600">
          {new Date(project.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
      ),
    },
  ]

  // Dynamic actions based on user role - returns function that takes project and returns actions
  const getActions = (project: Project): DataTableAction<Project>[] => {
    const canEdit = project.isOwner || 
      project.userRole === "admin" || 
      project.userRole === "editor"
    
    const canDelete = project.isOwner || project.userRole === "admin"

    return [
      {
        label: "View",
        icon: <Eye className="h-4 w-4" />,
        onClick: handleViewProject,
        show: "inline" as const,
      },
      ...(canEdit ? [{
        label: "Edit",
        icon: <Edit className="h-4 w-4" />,
        onClick: handleEditProject,
        show: "inline" as const,
      }] : []),
      {
        label: "View Details",
        icon: <Eye className="h-4 w-4" />,
        onClick: handleViewProject,
        show: "menu" as const,
      },
      ...(canEdit ? [{
        label: "Edit Project",
        icon: <Edit className="h-4 w-4" />,
        onClick: handleEditProject,
        show: "menu" as const,
      }] : []),
      ...(canDelete ? [{
        label: "Delete",
        icon: <Trash2 className="h-4 w-4" />,
        onClick: handleDeleteProject,
        variant: "destructive" as const,
        show: "menu" as const,
      }] : []),
    ]
  }

  const tableFilters = [
    {
      id: "status",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Completed", value: "completed" },
        { label: "Archived", value: "archived" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and organize your projects</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={()=>refetch()}
              disabled={isLoading}
              className="bg-white border-gray-200 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={() => setCreateFormOpen(true)}
              className="bg-primary hover:bg-primary/95 text-white shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>

        {/* Stats */}
        <StatsCards stats={stats} />

        {/* Tabs for Owned vs Shared */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="owned" className="data-[state=active]:bg-gray-100">
              Your Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="data-[state=active]:bg-gray-100">
              Shared with You
            </TabsTrigger>
          </TabsList>

          <TabsContent value="owned" className="mt-6">
            <DataTable
              data={projects}
              columns={columns}
              actions={getActions}
              filters={tableFilters}
              isLoading={isLoading}
              error={error}
              searchPlaceholder="Search your projects..."
              onSearch={setSearchValue}
              onFilterChange={(filterId, value) => {
                if (filterId === "status") {
                  setStatusFilter(value)
                }
              }}
              enableSelection={true}
              onSelectionChange={setSelectedProjects}
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.total}
              onPageChange={setCurrentPage}
              showExport={true}
              onExport={() => console.log("Export", selectedProjects)}
              getRowId={(project) => project.id}
              emptyMessage="No projects found. Create a new project to get started."
            />
          </TabsContent>

          <TabsContent value="shared" className="mt-6">
            <DataTable
              data={projects}
              columns={columns}
              actions={getActions}
              filters={tableFilters}
              isLoading={isLoading}
              error={error}
              searchPlaceholder="Search shared projects..."
              onSearch={setSearchValue}
              onFilterChange={(filterId, value) => {
                if (filterId === "status") {
                  setStatusFilter(value)
                }
              }}
              enableSelection={true}
              onSelectionChange={setSelectedProjects}
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.total}
              onPageChange={setCurrentPage}
              showExport={true}
              onExport={() => console.log("Export", selectedProjects)}
              getRowId={(project) => project.id}
              emptyMessage="No shared projects yet. You'll see projects here when others share them with you."
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <ProjectForm
        open={createFormOpen}
        onOpenChange={setCreateFormOpen}
        onSubmit={handleCreateSubmit}
        isLoading={createProject.isPending}
      />

      <ProjectForm
        open={editFormOpen}
        onOpenChange={setEditFormOpen}
        project={selectedProject || undefined}
        onSubmit={handleEditSubmit}
        isLoading={updateProject.isPending}
      />

      <ProjectDetailDrawer
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        project={detailProject}
        isLoading={isLoadingDetails}
        isDeleting={deleteProject.isPending}
        onEdit={() => {
          setDetailsOpen(false)
          setEditFormOpen(true)
        }}
        onDelete={handleDeleteSubmit}
      />

      <Toaster position="bottom-right" />
    </div>
  )
}