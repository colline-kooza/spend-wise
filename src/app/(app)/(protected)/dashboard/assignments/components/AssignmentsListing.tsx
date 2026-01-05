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
  ClipboardList,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle2,
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
const assignments = [
  {
    id: 1,
    walkieSerial: "WT-002",
    walkieLabel: "Alpha-02",
    project: "Wonder Woman Africa",
    department: "Stunts",
    crewMember: {
      name: "Samuel Torres",
      avatar: "/avatars/samuel.png",
      initials: "ST",
    },
    assignedDate: "2024-01-20",
    returnDate: "2024-02-15",
    status: "Active",
  },
  {
    id: 2,
    walkieSerial: "WT-003",
    walkieLabel: "Alpha-03",
    project: "Wonder Woman Africa",
    department: "Makeup",
    crewMember: {
      name: "Jessica Lee",
      avatar: "/avatars/jessica.png",
      initials: "JL",
    },
    assignedDate: "2024-01-18",
    returnDate: "2024-02-10",
    status: "Active",
  },
  {
    id: 3,
    walkieSerial: "WT-006",
    walkieLabel: "Beta-02",
    project: "Black Panther: Wakanda Rising",
    department: "Camera",
    crewMember: {
      name: "Marcus Johnson",
      avatar: "/avatars/marcus.png",
      initials: "MJ",
    },
    assignedDate: "2024-01-21",
    returnDate: "2024-01-25",
    status: "Overdue",
  },
  {
    id: 4,
    walkieSerial: "WT-012",
    walkieLabel: "Gamma-01",
    project: "Black Panther: Wakanda Rising",
    department: "Lighting",
    crewMember: {
      name: "Sarah Mitchell",
      avatar: "/avatars/sarah.png",
      initials: "SM",
    },
    assignedDate: "2024-01-19",
    returnDate: "2024-02-20",
    status: "Active",
  },
  {
    id: 5,
    walkieSerial: "WT-015",
    walkieLabel: "Gamma-04",
    project: "Wonder Woman Africa",
    department: "Sound",
    crewMember: {
      name: "David Chen",
      avatar: "/avatars/david.png",
      initials: "DC",
    },
    assignedDate: "2024-01-22",
    returnDate: "2024-01-28",
    status: "Due Soon",
  },
  {
    id: 6,
    walkieSerial: "WT-018",
    walkieLabel: "Delta-02",
    project: "The Last Guardian",
    department: "Art Department",
    crewMember: {
      name: "Emma Rodriguez",
      avatar: "/avatars/emma.png",
      initials: "ER",
    },
    assignedDate: "2024-01-23",
    returnDate: "2024-03-15",
    status: "Active",
  },
  {
    id: 7,
    walkieSerial: "WT-021",
    walkieLabel: "Delta-05",
    project: "Wonder Woman Africa",
    department: "Wardrobe",
    crewMember: {
      name: "Michael Brown",
      avatar: "/avatars/michael.png",
      initials: "MB",
    },
    assignedDate: "2024-01-17",
    returnDate: "2024-01-24",
    status: "Overdue",
  },
  {
    id: 8,
    walkieSerial: "WT-025",
    walkieLabel: "Epsilon-01",
    project: "Black Panther: Wakanda Rising",
    department: "Production",
    crewMember: {
      name: "Lisa Anderson",
      avatar: "/avatars/lisa.png",
      initials: "LA",
    },
    assignedDate: "2024-01-24",
    returnDate: "2024-02-28",
    status: "Active",
  },
];

export function AssignmentsListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Calculate metrics
  const totalAssignments = assignments.length;
  const activeAssignments = assignments.filter(
    (a) => a.status === "Active"
  ).length;
  const overdueAssignments = assignments.filter(
    (a) => a.status === "Overdue"
  ).length;
  const dueSoonAssignments = assignments.filter(
    (a) => a.status === "Due Soon"
  ).length;

  // Filter assignments
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.walkieSerial
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      assignment.walkieLabel
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      assignment.crewMember.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      assignment.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 border-green-200"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "Overdue":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-700 border-red-200"
          >
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        );
      case "Due Soon":
        return (
          <Badge
            variant="outline"
            className="bg-orange-100 text-orange-700 border-orange-200"
          >
            <Clock className="h-3 w-3 mr-1" />
            Due Soon
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDaysUntilReturn = (returnDate: string) => {
    const today = new Date();
    const dueDate = new Date(returnDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Assignments
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssignments}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5
              </span>{" "}
              from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAssignments}</div>
            <p className="text-xs text-muted-foreground">Currently assigned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueAssignments}</div>
            <p className="text-xs text-muted-foreground">
              Need immediate return
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dueSoonAssignments}</div>
            <p className="text-xs text-muted-foreground">Within next 7 days</p>
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
                  placeholder="Search assignments..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Due Soon">Due Soon</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Assignment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assignments Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Walkie Talkie</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment) => {
                    const daysUntilReturn = getDaysUntilReturn(
                      assignment.returnDate
                    );
                    return (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p className="font-semibold">
                              {assignment.walkieSerial}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {assignment.walkieLabel}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{assignment.project}</TableCell>
                        <TableCell>{assignment.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={assignment.crewMember.avatar}
                                alt={assignment.crewMember.name}
                              />
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {assignment.crewMember.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">
                              {assignment.crewMember.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(
                            assignment.assignedDate
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">
                              {new Date(
                                assignment.returnDate
                              ).toLocaleDateString()}
                            </p>
                            {assignment.status === "Overdue" ? (
                              <p className="text-xs text-red-600">
                                {Math.abs(daysUntilReturn)} days overdue
                              </p>
                            ) : assignment.status === "Due Soon" ? (
                              <p className="text-xs text-orange-600">
                                {daysUntilReturn} days left
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                {daysUntilReturn} days left
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(assignment.status)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                Edit Assignment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Extend Return Date
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Mark as Returned
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Cancel Assignment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <ClipboardList className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          No assignments found
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
