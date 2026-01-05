"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useProjectStore, Project } from "@/store/project-store";
import { toast } from "sonner";

export function ProjectSwitcher() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectStartDate, setNewProjectStartDate] = useState("");

  const { currentProject, projects, setCurrentProject, addProject } =
    useProjectStore();

  const handleProjectSelect = (project: Project) => {
    setCurrentProject(project);
    setOpen(false);
    toast.success(`Switched to ${project.name}`);
  };

  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      toast.error("Project name is required");
      return;
    }

    const newProject: Project = {
      id: `${Date.now()}`, // In production, this would come from your API
      name: newProjectName,
      description: newProjectDescription,
      status: "Active",
      walkies: 0,
      departments: 0,
      crewMembers: 0,
      startDate: newProjectStartDate || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addProject(newProject);
    setCurrentProject(newProject);

    // Reset form
    setNewProjectName("");
    setNewProjectDescription("");
    setNewProjectStartDate("");
    setDialogOpen(false);
    setOpen(false);

    toast.success(`Created and switched to ${newProject.name}`);

    // Here you would call your API to create the project on the server
    // fetch('/api/projects', { method: 'POST', body: JSON.stringify(newProject) });
  };

  const activeProjects = projects.filter((p) => p.status === "Active");
  const completedProjects = projects.filter((p) => p.status === "Completed");
  const onHoldProjects = projects.filter((p) => p.status === "On Hold");

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a project"
            className="w-[250px] justify-between"
          >
            <div className="flex items-center gap-2 truncate">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  currentProject?.status === "Active"
                    ? "bg-green-500"
                    : currentProject?.status === "On Hold"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                )}
              />
              <span className="truncate">
                {currentProject?.name || "Select project"}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search project..." />
            <CommandList>
              <CommandEmpty>No project found.</CommandEmpty>

              {activeProjects.length > 0 && (
                <CommandGroup heading="Active Projects">
                  {activeProjects.map((project) => (
                    <CommandItem
                      key={project.id}
                      onSelect={() => handleProjectSelect(project)}
                      className="text-sm"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <div className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {project.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {project.walkies} walkies • {project.departments}{" "}
                            depts
                          </div>
                        </div>
                      </div>
                      <Check
                        className={cn(
                          "ml-2 h-4 w-4 shrink-0",
                          currentProject?.id === project.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {onHoldProjects.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="On Hold">
                    {onHoldProjects.map((project) => (
                      <CommandItem
                        key={project.id}
                        onSelect={() => handleProjectSelect(project)}
                        className="text-sm"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <div className="h-2 w-2 rounded-full bg-yellow-500 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {project.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {project.walkies} walkies • {project.departments}{" "}
                              depts
                            </div>
                          </div>
                        </div>
                        <Check
                          className={cn(
                            "ml-2 h-4 w-4 shrink-0",
                            currentProject?.id === project.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {completedProjects.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Completed Projects">
                    {completedProjects.map((project) => (
                      <CommandItem
                        key={project.id}
                        onSelect={() => handleProjectSelect(project)}
                        className="text-sm"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <div className="h-2 w-2 rounded-full bg-gray-400 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {project.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Completed
                            </div>
                          </div>
                        </div>
                        <Check
                          className={cn(
                            "ml-2 h-4 w-4 shrink-0",
                            currentProject?.id === project.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    setDialogOpen(true);
                  }}
                  className="text-primary"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Project
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Create Project Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add a new film production to track your walkie talkies and crew.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                placeholder="e.g. Wonder Woman Africa"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the project..."
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={newProjectStartDate}
                onChange={(e) => setNewProjectStartDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
