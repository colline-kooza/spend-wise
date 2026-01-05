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
  Mail,
  Phone,
  Package,
  UserCheck,
  AlertCircle,
  Clock,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - replace with actual API data
const crewMembers = [
  {
    id: 1,
    name: "Samuel Torres",
    email: "samuel.torres@production.com",
    phone: "+1 (555) 234-5678",
    avatar: "/avatars/samuel.png",
    initials: "ST",
    project: "Wonder Woman Africa",
    department: "Stunts",
    role: "Stunt Coordinator",
    walkiesAssigned: 2,
    activeAssignments: 2,
    status: "Active",
    joinedDate: "2024-01-15",
    lastActive: "2024-01-25T14:30:00",
  },
  {
    id: 2,
    name: "Jessica Lee",
    email: "jessica.lee@production.com",
    phone: "+1 (555) 345-6789",
    avatar: "/avatars/jessica.png",
    initials: "JL",
    project: "Wonder Woman Africa",
    department: "Makeup",
    role: "Makeup Department Head",
    walkiesAssigned: 1,
    activeAssignments: 1,
    status: "Active",
    joinedDate: "2024-01-18",
    lastActive: "2024-01-25T12:15:00",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    email: "marcus.j@production.com",
    phone: "+1 (555) 456-7890",
    avatar: "/avatars/marcus.png",
    initials: "MJ",
    project: "Black Panther: Wakanda Rising",
    department: "Camera",
    role: "Director of Photography",
    walkiesAssigned: 3,
    activeAssignments: 3,
    status: "Active",
    joinedDate: "2024-01-21",
    lastActive: "2024-01-25T09:45:00",
  },
  {
    id: 4,
    name: "Sarah Mitchell",
    email: "sarah.m@production.com",
    phone: "+1 (555) 567-8901",
    avatar: "/avatars/sarah.png",
    initials: "SM",
    project: "Black Panther: Wakanda Rising",
    department: "Lighting",
    role: "Gaffer",
    walkiesAssigned: 2,
    activeAssignments: 2,
    status: "Active",
    joinedDate: "2024-01-19",
    lastActive: "2024-01-25T11:00:00",
  },
  {
    id: 5,
    name: "David Chen",
    email: "david.chen@production.com",
    phone: "+1 (555) 678-9012",
    avatar: "/avatars/david.png",
    initials: "DC",
    project: "Wonder Woman Africa",
    department: "Sound",
    role: "Sound Mixer",
    walkiesAssigned: 1,
    activeAssignments: 1,
    status: "Active",
    joinedDate: "2024-01-22",
    lastActive: "2024-01-24T16:20:00",
  },
  {
    id: 6,
    name: "Emma Rodriguez",
    email: "emma.r@production.com",
    phone: "+1 (555) 789-0123",
    avatar: "/avatars/emma.png",
    initials: "ER",
    project: "The Last Guardian",
    department: "Art Department",
    role: "Production Designer",
    walkiesAssigned: 2,
    activeAssignments: 2,
    status: "Active",
    joinedDate: "2024-01-23",
    lastActive: "2024-01-25T08:30:00",
  },
  {
    id: 7,
    name: "Michael Brown",
    email: "michael.b@production.com",
    phone: "+1 (555) 890-1234",
    avatar: "/avatars/michael.png",
    initials: "MB",
    project: "Wonder Woman Africa",
    department: "Wardrobe",
    role: "Costume Designer",
    walkiesAssigned: 1,
    activeAssignments: 1,
    status: "Active",
    joinedDate: "2024-01-17",
    lastActive: "2024-01-25T10:15:00",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.a@production.com",
    phone: "+1 (555) 901-2345",
    avatar: "/avatars/lisa.png",
    initials: "LA",
    project: "Black Panther: Wakanda Rising",
    department: "Production",
    role: "Production Manager",
    walkiesAssigned: 3,
    activeAssignments: 3,
    status: "Active",
    joinedDate: "2024-01-24",
    lastActive: "2024-01-25T13:45:00",
  },
  {
    id: 9,
    name: "James Wilson",
    email: "james.w@production.com",
    phone: "+1 (555) 012-3456",
    avatar: "/avatars/james.png",
    initials: "JW",
    project: "Wonder Woman Africa",
    department: "Stunts",
    role: "Stunt Performer",
    walkiesAssigned: 0,
    activeAssignments: 0,
    status: "Inactive",
    joinedDate: "2024-01-10",
    lastActive: "2024-01-15T07:00:00",
  },
  {
    id: 10,
    name: "Sophie Martin",
    email: "sophie.m@production.com",
    phone: "+1 (555) 123-4567",
    avatar: "/avatars/sophie.png",
    initials: "SM",
    project: "The Last Guardian",
    department: "Camera",
    role: "Camera Operator",
    walkiesAssigned: 1,
    activeAssignments: 1,
    status: "Active",
    joinedDate: "2024-01-20",
    lastActive: "2024-01-25T15:00:00",
  },
];

export function CrewMembersListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Calculate metrics
  const totalCrewMembers = crewMembers.length;
  const activeCrewMembers = crewMembers.filter(
    (c) => c.status === "Active"
  ).length;
  const totalWalkiesAssigned = crewMembers.reduce(
    (sum, c) => sum + c.walkiesAssigned,
    0
  );
  const crewWithEquipment = crewMembers.filter(
    (c) => c.walkiesAssigned > 0
  ).length;

  // Get unique projects and departments
  const projects = [...new Set(crewMembers.map((c) => c.project))];
  const departments = [...new Set(crewMembers.map((c) => c.department))];

  // Filter crew members
  const filteredCrewMembers = crewMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject =
      projectFilter === "all" || member.project === projectFilter;
    const matchesDepartment =
      departmentFilter === "all" || member.department === departmentFilter;
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;
    return (
      matchesSearch && matchesProject && matchesDepartment && matchesStatus
    );
  });

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge
        variant="outline"
        className="bg-green-100 text-green-700 border-green-200"
      >
        <UserCheck className="h-3 w-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="bg-gray-100 text-gray-700 border-gray-200"
      >
        <Clock className="h-3 w-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                +4
              </span>{" "}
              from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Members
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCrewMembers}</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Equipment Assigned
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWalkiesAssigned}</div>
            <p className="text-xs text-muted-foreground">Walkies in use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              With Equipment
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crewWithEquipment}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((crewWithEquipment / totalCrewMembers) * 100)}% of
              crew
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search crew members..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={projectFilter} onValueChange={setProjectFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Project" />
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

                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Crew Member
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crew Members Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crew Member</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCrewMembers.length > 0 ? (
                  filteredCrewMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{member.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span className="truncate max-w-[150px]">
                              {member.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {member.project}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{member.department}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{member.role}</TableCell>
                      <TableCell>
                        {member.walkiesAssigned > 0 ? (
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">
                              {member.walkiesAssigned}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              walkie{member.walkiesAssigned !== 1 ? "s" : ""}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            None
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatLastActive(member.lastActive)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>
                              Assign Equipment
                            </DropdownMenuItem>
                            <DropdownMenuItem>View History</DropdownMenuItem>
                            <DropdownMenuItem>
                              Change Department
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Remove from Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          No crew members found
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
