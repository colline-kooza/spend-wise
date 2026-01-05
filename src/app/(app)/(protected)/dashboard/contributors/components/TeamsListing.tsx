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
  Shield,
  UserCheck,
  Crown,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Mock data - replace with actual API data
const teamMembers = [
  {
    id: 1,
    name: "Giampietro Balia",
    email: "giampietro@walkiecheck.com",
    phone: "+1 (555) 123-4567",
    role: "Owner",
    permissions: {
      canView: true,
      canEdit: true,
      canAddContributors: true,
      canChangePermissions: true,
    },
    status: "Active",
    avatar: "/avatars/giampietro.png",
    initials: "GB",
    projects: ["Wonder Woman Africa", "Black Panther: Wakanda Rising"],
    joinedDate: "2023-08-01",
    lastActive: "2024-01-25T14:30:00",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    email: "sarah.mitchell@production.com",
    phone: "+1 (555) 234-5678",
    role: "Admin",
    permissions: {
      canView: true,
      canEdit: true,
      canAddContributors: false,
      canChangePermissions: false,
    },
    status: "Active",
    avatar: "/avatars/sarah.png",
    initials: "SM",
    projects: ["Wonder Woman Africa", "The Last Guardian"],
    joinedDate: "2023-09-15",
    lastActive: "2024-01-25T12:15:00",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    email: "marcus.j@production.com",
    phone: "+1 (555) 345-6789",
    role: "Admin",
    permissions: {
      canView: true,
      canEdit: true,
      canAddContributors: false,
      canCanChangePermissions: false,
    },
    status: "Active",
    avatar: "/avatars/marcus.png",
    initials: "MJ",
    projects: ["Black Panther: Wakanda Rising"],
    joinedDate: "2023-10-20",
    lastActive: "2024-01-25T09:45:00",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    email: "emma.r@production.com",
    phone: "+1 (555) 456-7890",
    role: "Observer",
    permissions: {
      canView: true,
      canEdit: false,
      canAddContributors: false,
      canChangePermissions: false,
    },
    status: "Active",
    avatar: "/avatars/emma.png",
    initials: "ER",
    projects: ["The Last Guardian"],
    joinedDate: "2023-11-05",
    lastActive: "2024-01-24T16:20:00",
  },
  {
    id: 5,
    name: "David Chen",
    email: "david.chen@production.com",
    phone: "+1 (555) 567-8901",
    role: "Observer",
    permissions: {
      canView: true,
      canEdit: false,
      canAddContributors: false,
      canChangePermissions: false,
    },
    status: "Active",
    avatar: "/avatars/david.png",
    initials: "DC",
    projects: ["Wonder Woman Africa"],
    joinedDate: "2023-12-01",
    lastActive: "2024-01-25T11:00:00",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@production.com",
    phone: "+1 (555) 678-9012",
    role: "Admin",
    permissions: {
      canView: true,
      canEdit: true,
      canAddContributors: false,
      canChangePermissions: false,
    },
    status: "Inactive",
    avatar: "/avatars/lisa.png",
    initials: "LA",
    projects: [],
    joinedDate: "2024-01-10",
    lastActive: "2024-01-15T08:30:00",
  },
];

export function ContributorsListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState("");

  // Current user role (for permission checks)
  const currentUserRole = "Owner"; // This should come from your auth context

  // Calculate metrics
  const totalMembers = teamMembers.length;
  const activeMembers = teamMembers.filter((m) => m.status === "Active").length;
  const owners = teamMembers.filter((m) => m.role === "Owner").length;
  const admins = teamMembers.filter((m) => m.role === "Admin").length;
  const observers = teamMembers.filter((m) => m.role === "Observer").length;

  // Filter team members
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.projects.some((p) =>
        p.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Owner":
        return (
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-700 border-purple-200"
          >
            <Crown className="h-3 w-3 mr-1" />
            Owner
          </Badge>
        );
      case "Admin":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-700 border-blue-200"
          >
            <Shield className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        );
      case "Observer":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 border-green-200"
          >
            <Eye className="h-3 w-3 mr-1" />
            Observer
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge
        variant="outline"
        className="bg-green-100 text-green-700 border-green-200"
      >
        Active
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="bg-gray-100 text-gray-700 border-gray-200"
      >
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

  const canChangePermissions = currentUserRole === "Owner";

  const handleChangePermissions = (member: any) => {
    setSelectedMember(member);
    setNewRole(member.role);
    setIsPermissionDialogOpen(true);
  };

  const handleSavePermissions = () => {
    // Here you would update the member's role via API
    console.log(`Changing ${selectedMember.name}'s role to ${newRole}`);
    setIsPermissionDialogOpen(false);
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "Owner":
        return "Full access: View, Edit, Add Contributors, Change Permissions";
      case "Admin":
        return "View and Edit access, Cannot add contributors or change permissions";
      case "Observer":
        return "View only access, No editing capabilities";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Owners</CardTitle>
            <Crown className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{owners}</div>
            <p className="text-xs text-muted-foreground">Full access</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{admins}</div>
            <p className="text-xs text-muted-foreground">Edit access</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Observers</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{observers}</div>
            <p className="text-xs text-muted-foreground">View only</p>
          </CardContent>
        </Card>
      </div>

      {/* Role Permissions Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Role Permissions:</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="flex items-start gap-2">
              <Crown className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Owner</p>
                <p className="text-xs text-muted-foreground">
                  View, Edit, Add Contributors, Change Permissions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Admin</p>
                <p className="text-xs text-muted-foreground">
                  View and Edit, Cannot add contributors or change permissions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Eye className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Observer</p>
                <p className="text-xs text-muted-foreground">
                  View only, No editing capabilities
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search contributors..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Observer">Observer</SelectItem>
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
            {canChangePermissions && (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Invite Contributor
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contributors Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{member.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {member.email}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Member</DropdownMenuItem>
                      {canChangePermissions && member.role !== "Owner" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Permissions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleChangePermissions(member)}
                          >
                            Change Role
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem>Manage Projects</DropdownMenuItem>
                      {member.role !== "Owner" && canChangePermissions && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Remove Contributor
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2">
                  {getRoleBadge(member.role)}
                  {getStatusBadge(member.status)}
                </div>

                {/* Permissions Display */}
                <div className="bg-secondary rounded-lg p-3 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Permissions:
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      <span>View</span>
                    </div>
                    {member.permissions.canEdit && (
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3" />
                        <span>Edit</span>
                      </div>
                    )}
                    {member.permissions.canAddContributors && (
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        <span>Add Contributors</span>
                      </div>
                    )}
                    {member.permissions.canChangePermissions && (
                      <div className="flex items-center gap-2">
                        <Crown className="h-3 w-3" />
                        <span>Change Permissions</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Projects ({member.projects.length})
                  </p>
                  {member.projects.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {member.projects.map((project, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No projects assigned
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="pt-3 border-t text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>
                      Joined {new Date(member.joinedDate).toLocaleDateString()}
                    </span>
                    <span>Active {formatLastActive(member.lastActive)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No contributors found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("all");
                setStatusFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Change Permissions Dialog */}
      <Dialog
        open={isPermissionDialogOpen}
        onOpenChange={setIsPermissionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Permissions</DialogTitle>
            <DialogDescription>
              Update the role and permissions for {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Role</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>Admin</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Observer">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-600" />
                      <span>Observer</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm font-medium mb-2">
                Permissions for {newRole}:
              </p>
              <p className="text-xs text-muted-foreground">
                {getRoleDescription(newRole)}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPermissionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePermissions}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
