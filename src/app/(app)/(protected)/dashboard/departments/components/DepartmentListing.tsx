"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Users,
  TrendingUp,
  Package,
  UserCheck,
  Building2,
  GripVertical,
  Eye,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Mock data - replace with actual API data
const initialDepartments = [
  {
    id: 1,
    name: "Stunts",
    project: "Wonder Woman Africa",
    crewMembers: 12,
    walkiesAssigned: 15,
    head: {
      name: "Samuel Torres",
      avatar: "/avatars/samuel.png",
      initials: "ST",
    },
    walkies: [
      {
        serialNumber: "WT-002",
        label: "Alpha-02",
        innerLabel: "A2",
        assignedTo: "Samuel Torres",
        returnDate: "2024-02-15",
      },
      {
        serialNumber: "WT-045",
        label: "Delta-10",
        innerLabel: "D10",
        assignedTo: "James Wilson",
        returnDate: "2024-02-20",
      },
      {
        serialNumber: "WT-046",
        label: "Delta-11",
        innerLabel: "D11",
        assignedTo: "Mike Stevens",
        returnDate: "2024-02-18",
      },
    ],
  },
  {
    id: 2,
    name: "Makeup",
    project: "Wonder Woman Africa",
    crewMembers: 8,
    walkiesAssigned: 10,
    head: {
      name: "Jessica Lee",
      avatar: "/avatars/jessica.png",
      initials: "JL",
    },
    walkies: [
      {
        serialNumber: "WT-003",
        label: "Alpha-03",
        innerLabel: "A3",
        assignedTo: "Jessica Lee",
        returnDate: "2024-02-10",
      },
      {
        serialNumber: "WT-012",
        label: "Beta-07",
        innerLabel: "B7",
        assignedTo: "Sarah Johnson",
        returnDate: "2024-02-12",
      },
    ],
  },
  {
    id: 3,
    name: "Camera",
    project: "Black Panther: Wakanda Rising",
    crewMembers: 15,
    walkiesAssigned: 20,
    head: {
      name: "Marcus Johnson",
      avatar: "/avatars/marcus.png",
      initials: "MJ",
    },
    walkies: [
      {
        serialNumber: "WT-006",
        label: "Beta-02",
        innerLabel: "B2",
        assignedTo: "Marcus Johnson",
        returnDate: "2024-01-30",
      },
      {
        serialNumber: "WT-018",
        label: "Gamma-03",
        innerLabel: "G3",
        assignedTo: "Sophie Martin",
        returnDate: "2024-02-05",
      },
      {
        serialNumber: "WT-025",
        label: "Gamma-10",
        innerLabel: "G10",
        assignedTo: "Tom Harris",
        returnDate: "2024-02-08",
      },
    ],
  },
  {
    id: 4,
    name: "Lighting",
    project: "Black Panther: Wakanda Rising",
    crewMembers: 10,
    walkiesAssigned: 12,
    head: {
      name: "Sarah Mitchell",
      avatar: "/avatars/sarah.png",
      initials: "SM",
    },
    walkies: [
      {
        serialNumber: "WT-032",
        label: "Epsilon-02",
        innerLabel: "E2",
        assignedTo: "Sarah Mitchell",
        returnDate: "2024-02-15",
      },
      {
        serialNumber: "WT-033",
        label: "Epsilon-03",
        innerLabel: "E3",
        assignedTo: "John Davis",
        returnDate: "2024-02-14",
      },
    ],
  },
  {
    id: 5,
    name: "Sound",
    project: "Wonder Woman Africa",
    crewMembers: 6,
    walkiesAssigned: 8,
    head: {
      name: "David Chen",
      avatar: "/avatars/david.png",
      initials: "DC",
    },
    walkies: [
      {
        serialNumber: "WT-015",
        label: "Gamma-04",
        innerLabel: "G4",
        assignedTo: "David Chen",
        returnDate: "2024-01-28",
      },
    ],
  },
  {
    id: 6,
    name: "Art Department",
    project: "The Last Guardian",
    crewMembers: 14,
    walkiesAssigned: 18,
    head: {
      name: "Emma Rodriguez",
      avatar: "/avatars/emma.png",
      initials: "ER",
    },
    walkies: [
      {
        serialNumber: "WT-018",
        label: "Delta-02",
        innerLabel: "D2",
        assignedTo: "Emma Rodriguez",
        returnDate: "2024-03-15",
      },
      {
        serialNumber: "WT-019",
        label: "Delta-03",
        innerLabel: "D3",
        assignedTo: "Alex Turner",
        returnDate: "2024-03-10",
      },
    ],
  },
  {
    id: 7,
    name: "Wardrobe",
    project: "Wonder Woman Africa",
    crewMembers: 9,
    walkiesAssigned: 11,
    head: {
      name: "Michael Brown",
      avatar: "/avatars/michael.png",
      initials: "MB",
    },
    walkies: [
      {
        serialNumber: "WT-021",
        label: "Delta-05",
        innerLabel: "D5",
        assignedTo: "Michael Brown",
        returnDate: "2024-01-24",
      },
    ],
  },
  {
    id: 8,
    name: "Production",
    project: "Black Panther: Wakanda Rising",
    crewMembers: 20,
    walkiesAssigned: 25,
    head: {
      name: "Lisa Anderson",
      avatar: "/avatars/lisa.png",
      initials: "LA",
    },
    walkies: [
      {
        serialNumber: "WT-025",
        label: "Epsilon-01",
        innerLabel: "E1",
        assignedTo: "Lisa Anderson",
        returnDate: "2024-02-28",
      },
      {
        serialNumber: "WT-026",
        label: "Epsilon-02",
        innerLabel: "E2",
        assignedTo: "Robert Lee",
        returnDate: "2024-02-25",
      },
      {
        serialNumber: "WT-027",
        label: "Epsilon-03",
        innerLabel: "E3",
        assignedTo: "Maria Garcia",
        returnDate: "2024-02-27",
      },
    ],
  },
];

interface SortableDepartmentCardProps {
  dept: any;
  onViewWalkies: (dept: any) => void;
}

function SortableDepartmentCard({
  dept,
  onViewWalkies,
}: SortableDepartmentCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dept.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`hover:shadow-md transition-shadow cursor-pointer ${
        isDragging ? "z-50" : ""
      }`}
    >
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          {/* Header with Drag Handle */}
          <div className="flex items-start gap-3">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing touch-none mt-1"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-1">{dept.name}</h3>
              <p className="text-sm text-muted-foreground">{dept.project}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewWalkies(dept);
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Walkies
                </DropdownMenuItem>
                <DropdownMenuItem>Edit Department</DropdownMenuItem>
                <DropdownMenuItem>Manage Equipment</DropdownMenuItem>
                <DropdownMenuItem>View Crew Members</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete Department
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Department Head */}
          <div
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary"
            onClick={() => onViewWalkies(dept)}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={dept.head.avatar} alt={dept.head.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {dept.head.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{dept.head.name}</p>
              <p className="text-xs text-muted-foreground">Department Head</p>
            </div>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 gap-4"
            onClick={() => onViewWalkies(dept)}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold">{dept.crewMembers}</p>
                <p className="text-xs text-muted-foreground">Crew Members</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                <Package className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xl font-bold">{dept.walkiesAssigned}</p>
                <p className="text-xs text-muted-foreground">Walkies</p>
              </div>
            </div>
          </div>

          {/* View Walkies Button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onViewWalkies(dept);
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            View All Walkies
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function DepartmentsListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [departments, setDepartments] = useState(initialDepartments);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Calculate metrics
  const totalDepartments = departments.length;
  const totalCrewMembers = departments.reduce(
    (sum, d) => sum + d.crewMembers,
    0
  );
  const totalWalkiesAssigned = departments.reduce(
    (sum, d) => sum + d.walkiesAssigned,
    0
  );
  const uniqueProjects = [...new Set(departments.map((d) => d.project))].length;

  // Get unique projects for filter
  const projects = [...new Set(departments.map((d) => d.project))];

  // Filter departments
  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.head.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject =
      projectFilter === "all" || dept.project === projectFilter;
    return matchesSearch && matchesProject;
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setDepartments((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleViewWalkies = (dept: any) => {
    setSelectedDepartment(dept);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Departments
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDepartments}</div>
            <p className="text-xs text-muted-foreground">
              Across {uniqueProjects} projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Crew Members
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCrewMembers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8
              </span>{" "}
              from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Equipment Assigned
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWalkiesAssigned}</div>
            <p className="text-xs text-muted-foreground">
              Walkie talkies in use
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Team Size
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(totalCrewMembers / totalDepartments)}
            </div>
            <p className="text-xs text-muted-foreground">
              Members per department
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search departments..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Department
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Drag and drop the grip icon (
          <GripVertical className="h-4 w-4 inline mx-1" />) to reorder
          departments. Click on any department card to view its walkies.
        </p>
      </div>

      {/* Departments Grid with Drag and Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredDepartments.map((d) => d.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDepartments.map((dept) => (
              <SortableDepartmentCard
                key={dept.id}
                dept={dept}
                onViewWalkies={handleViewWalkies}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Empty State */}
      {filteredDepartments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No departments found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setProjectFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Walkies Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Walkies in {selectedDepartment?.name}</DialogTitle>
            <DialogDescription>
              {selectedDepartment?.project} •{" "}
              {selectedDepartment?.walkiesAssigned} walkies assigned
            </DialogDescription>
          </DialogHeader>

          {selectedDepartment && (
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Inner Label</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Return Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedDepartment.walkies.length > 0 ? (
                    selectedDepartment.walkies.map(
                      (walkie: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {walkie.serialNumber}
                          </TableCell>
                          <TableCell>{walkie.label}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {walkie.innerLabel}
                            </Badge>
                          </TableCell>
                          <TableCell>{walkie.assignedTo}</TableCell>
                          <TableCell>
                            {new Date(walkie.returnDate).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground"
                      >
                        No walkies assigned to this department
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
