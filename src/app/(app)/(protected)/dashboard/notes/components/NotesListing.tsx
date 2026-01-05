"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  StickyNote,
  TrendingUp,
  Pin,
  Calendar as CalendarIcon,
  Tag,
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

// Mock data - replace with actual API data
const notes = [
  {
    id: 1,
    title: "Equipment Issues - Wonder Woman",
    content:
      "WT-004 and WT-008 showing battery drain issues. Need to order replacement batteries. Contacted supplier, expected delivery next week.",
    project: "Wonder Woman Africa",
    tags: ["Equipment", "Urgent"],
    isPinned: true,
    createdDate: "2024-01-24T10:30:00",
    updatedDate: "2024-01-24T14:20:00",
  },
  {
    id: 2,
    title: "Stunts Department Walkies",
    content:
      "Samuel requested 3 additional walkie talkies for new stunt coordinators joining next Monday. Assigned WT-045, WT-046, WT-047.",
    project: "Wonder Woman Africa",
    tags: ["Assignment", "Stunts"],
    isPinned: false,
    createdDate: "2024-01-23T09:15:00",
    updatedDate: "2024-01-23T09:15:00",
  },
  {
    id: 3,
    title: "Black Panther - Location Change",
    content:
      "Filming location changed to Warehouse District. Need to redistribute equipment. Camera dept needs 5 extra units for coverage.",
    project: "Black Panther: Wakanda Rising",
    tags: ["Important", "Camera"],
    isPinned: true,
    createdDate: "2024-01-22T16:45:00",
    updatedDate: "2024-01-23T08:30:00",
  },
  {
    id: 4,
    title: "Weekly Equipment Audit",
    content:
      "Completed weekly audit. All 248 walkies accounted for. 8 units marked for repair. 186 currently assigned across 3 active projects.",
    project: null,
    tags: ["Audit", "Maintenance"],
    isPinned: false,
    createdDate: "2024-01-22T11:00:00",
    updatedDate: "2024-01-22T11:00:00",
  },
  {
    id: 5,
    title: "Makeup Department Setup",
    content:
      "Jessica confirmed receiving all 10 units for makeup department. Return date set for Feb 10. Reminded about proper charging procedures.",
    project: "Wonder Woman Africa",
    tags: ["Makeup", "Assignment"],
    isPinned: false,
    createdDate: "2024-01-21T13:20:00",
    updatedDate: "2024-01-21T13:20:00",
  },
  {
    id: 6,
    title: "New Inventory Labels",
    content:
      "Received 50 new label stickers. Started labeling new batch (WT-249 to WT-298). Should be completed by end of week.",
    project: null,
    tags: ["Inventory", "Maintenance"],
    isPinned: false,
    createdDate: "2024-01-20T10:00:00",
    updatedDate: "2024-01-21T16:30:00",
  },
  {
    id: 7,
    title: "Production Meeting Notes",
    content:
      "Discussed equipment needs for upcoming night shoots. Production dept needs walkie range extenders. Ordered 10 units, arriving Friday.",
    project: "Black Panther: Wakanda Rising",
    tags: ["Production", "Meeting"],
    isPinned: false,
    createdDate: "2024-01-19T14:00:00",
    updatedDate: "2024-01-19T15:45:00",
  },
  {
    id: 8,
    title: "Lost Equipment Report",
    content:
      "WT-032 reported lost by sound department on 01/18. Filed incident report. Crew member takes responsibility. Deduction from paycheck approved.",
    project: "Wonder Woman Africa",
    tags: ["Incident", "Sound"],
    isPinned: false,
    createdDate: "2024-01-18T17:30:00",
    updatedDate: "2024-01-18T17:30:00",
  },
];

export function NotesListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");

  // Calculate metrics
  const totalNotes = notes.length;
  const pinnedNotes = notes.filter((n) => n.isPinned).length;
  const thisWeekNotes = notes.filter((n) => {
    const noteDate = new Date(n.createdDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return noteDate >= weekAgo;
  }).length;

  // Get unique projects and tags for filters
  const projects = [
    ...new Set(notes.map((n) => n.project).filter(Boolean)),
  ] as string[];
  const allTags = [...new Set(notes.flatMap((n) => n.tags))];

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesProject =
      projectFilter === "all" ||
      note.project === projectFilter ||
      (projectFilter === "general" && !note.project);
    return matchesSearch && matchesProject;
  });

  // Sort: pinned first, then by updated date
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return (
      new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime()
    );
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      if (hours < 1) return "Just now";
      return `${hours}h ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      Urgent: "bg-red-100 text-red-700 border-red-200",
      Important: "bg-orange-100 text-orange-700 border-orange-200",
      Equipment: "bg-blue-100 text-blue-700 border-blue-200",
      Assignment: "bg-green-100 text-green-700 border-green-200",
      Maintenance: "bg-purple-100 text-purple-700 border-purple-200",
      Incident: "bg-pink-100 text-pink-700 border-pink-200",
    };
    return colors[tag] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
            <StickyNote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNotes}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />+{thisWeekNotes}
              </span>{" "}
              this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pinned Notes</CardTitle>
            <Pin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pinnedNotes}</div>
            <p className="text-xs text-muted-foreground">Important reminders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">With notes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tags Used</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allTags.length}</div>
            <p className="text-xs text-muted-foreground">For organization</p>
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
                  placeholder="Search notes..."
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
                  <SelectItem value="general">General Notes</SelectItem>
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
              New Note
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedNotes.map((note) => (
          <Card
            key={note.id}
            className="hover:shadow-md transition-shadow relative"
          >
            {note.isPinned && (
              <Pin className="absolute top-4 right-4 h-4 w-4 text-primary fill-current" />
            )}
            <CardContent className="pt-6">
              <div className="flex flex-col gap-3">
                {/* Title */}
                <div className="pr-6">
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {note.title}
                  </h3>
                </div>

                {/* Content */}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {note.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`text-xs ${getTagColor(tag)}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex flex-col">
                    {note.project && (
                      <span className="font-medium">{note.project}</span>
                    )}
                    <span>{formatDate(note.updatedDate)}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Full Note</DropdownMenuItem>
                      <DropdownMenuItem>Edit Note</DropdownMenuItem>
                      <DropdownMenuItem>
                        {note.isPinned ? "Unpin" : "Pin to Top"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete Note
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedNotes.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <StickyNote className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notes found</h3>
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
    </div>
  );
}
