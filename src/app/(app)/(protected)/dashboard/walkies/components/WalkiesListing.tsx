"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Package,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Radio,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Clock,
  ChevronDown,
  ChevronRight,
  History,
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
const inventory = [
  {
    id: 1,
    serialNumber: "WT-001",
    previousSerialNumbers: [],
    label: "Alpha-01",
    innerLabel: "A1",
    status: "Home",
    project: null,
    department: null,
    assignedTo: null,
    assignedDate: null,
    returnDate: null,
    lastUpdated: "2024-01-15",
    history: [
      {
        date: "2024-01-15",
        action: "Added to inventory",
        department: null,
        assignedTo: null,
      },
    ],
  },
  {
    id: 2,
    serialNumber: "WT-002",
    previousSerialNumbers: [],
    label: "Alpha-02",
    innerLabel: "A2",
    status: "Away",
    project: "Wonder Woman Africa",
    department: "Stunts",
    assignedTo: "Samuel Torres",
    assignedDate: "2024-01-20",
    returnDate: "2024-02-15",
    lastUpdated: "2024-01-20",
    history: [
      {
        date: "2024-01-15",
        action: "Added to inventory",
        department: null,
        assignedTo: null,
      },
      {
        date: "2024-01-20",
        action: "Assigned",
        department: "Stunts",
        assignedTo: "Samuel Torres",
      },
    ],
  },
  {
    id: 3,
    serialNumber: "WT-003-V2",
    previousSerialNumbers: ["WT-003"],
    label: "Alpha-03",
    innerLabel: "A3",
    status: "Away",
    project: "Wonder Woman Africa",
    department: "Makeup",
    assignedTo: "Jessica Lee",
    assignedDate: "2024-01-18",
    returnDate: "2024-02-10",
    lastUpdated: "2024-01-22",
    history: [
      {
        date: "2024-01-15",
        action: "Added to inventory",
        department: null,
        assignedTo: null,
      },
      {
        date: "2024-01-18",
        action: "Assigned",
        department: "Makeup",
        assignedTo: "Jessica Lee",
      },
      {
        date: "2024-01-22",
        action: "Serial number changed from WT-003 to WT-003-V2",
        department: "Makeup",
        assignedTo: "Jessica Lee",
      },
    ],
  },
  {
    id: 4,
    serialNumber: "WT-004",
    previousSerialNumbers: [],
    label: "Alpha-04",
    innerLabel: "A4",
    status: "Broken",
    project: null,
    department: null,
    assignedTo: null,
    assignedDate: null,
    returnDate: null,
    lastUpdated: "2024-01-22",
    history: [
      {
        date: "2024-01-15",
        action: "Added to inventory",
        department: null,
        assignedTo: null,
      },
      {
        date: "2024-01-20",
        action: "Assigned",
        department: "Sound",
        assignedTo: "David Chen",
      },
      {
        date: "2024-01-22",
        action: "Marked as broken",
        department: null,
        assignedTo: null,
      },
    ],
  },
  {
    id: 5,
    serialNumber: "WT-005",
    previousSerialNumbers: [],
    label: "Beta-01",
    innerLabel: "B1",
    status: "Home",
    project: null,
    department: null,
    assignedTo: null,
    assignedDate: null,
    returnDate: null,
    lastUpdated: "2024-01-10",
    history: [
      {
        date: "2024-01-10",
        action: "Added to inventory",
        department: null,
        assignedTo: null,
      },
    ],
  },
  {
    id: 6,
    serialNumber: "WT-006",
    previousSerialNumbers: [],
    label: "Beta-02",
    innerLabel: "B2",
    status: "Away",
    project: "Black Panther: Wakanda Rising",
    department: "Camera",
    assignedTo: "Marcus Johnson",
    assignedDate: "2024-01-21",
    returnDate: "2024-01-30",
    lastUpdated: "2024-01-21",
    history: [
      {
        date: "2024-01-10",
        action: "Added to inventory",
        department: null,
        assignedTo: null,
      },
      {
        date: "2024-01-21",
        action: "Assigned",
        department: "Camera",
        assignedTo: "Marcus Johnson",
      },
    ],
  },
  {
    id: 7,
    serialNumber: "WT-007",
    previousSerialNumbers: [],
    label: "Beta-03",
    innerLabel: "B3",
    status: "Lost",
    project: null,
    department: null,
    assignedTo: null,
    assignedDate: null,
    returnDate: null,
    lastUpdated: "2024-01-19",
    history: [
      {
        date: "2024-01-10",
        action: "Added to inventory",
        department: null,
        assignedTo: null,
      },
      {
        date: "2024-01-15",
        action: "Assigned",
        department: "Stunts",
        assignedTo: "James Wilson",
      },
      {
        date: "2024-01-19",
        action: "Reported lost",
        department: null,
        assignedTo: null,
      },
    ],
  },
  {
    id: 8,
    serialNumber: "WT-008",
    previousSerialNumbers: [],
    label: "Beta-04",
    innerLabel: "B4",
    status: "Returned",
    project: null,
    department: null,
    assignedTo: null,
    assignedDate: null,
    returnDate: null,
    lastUpdated: "2024-01-23",
    history: [
      {
        date: "2024-01-10",
        action: "Added to inventory",
        department: null,
        assignedTo: null,
      },
      {
        date: "2024-01-18",
        action: "Assigned",
        department: "Production",
        assignedTo: "Lisa Anderson",
      },
      {
        date: "2024-01-23",
        action: "Returned to production",
        department: null,
        assignedTo: null,
      },
    ],
  },
];

type SortField =
  | "serialNumber"
  | "label"
  | "innerLabel"
  | "department"
  | "assignedDate"
  | "status";
type SortOrder = "asc" | "desc";

export function WalkiesListing() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const highlightId = searchParams.get("highlight");

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [sortField, setSortField] = useState<SortField>("serialNumber");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);

  // Handle URL parameters on mount and when they change
  useEffect(() => {
    const urlSearchParam = searchParams.get("search");
    const urlHighlightParam = searchParams.get("highlight");

    if (urlSearchParam) {
      setSearchQuery(urlSearchParam);
    }

    if (urlHighlightParam) {
      const highlightIdNum = Number.parseInt(urlHighlightParam);
      setHighlightedRow(highlightIdNum);

      // Auto-expand the highlighted row if it has history
      const highlightedItem = inventory.find(
        (item) => item.id === highlightIdNum
      );
      if (
        highlightedItem &&
        (highlightedItem.previousSerialNumbers.length > 0 ||
          highlightedItem.history.length > 1)
      ) {
        setExpandedRows([highlightIdNum]);
      }

      // Scroll to highlighted row after a short delay
      setTimeout(() => {
        const element = document.getElementById(`walkie-row-${highlightIdNum}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);

      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedRow(null);
      }, 3000);
    }
  }, [searchParams]);

  // Calculate metrics
  const totalWalkies = inventory.length;
  const homeWalkies = inventory.filter((w) => w.status === "Home").length;
  const awayWalkies = inventory.filter((w) => w.status === "Away").length;
  const brokenWalkies = inventory.filter((w) => w.status === "Broken").length;
  const lostWalkies = inventory.filter((w) => w.status === "Lost").length;
  const returnedWalkies = inventory.filter(
    (w) => w.status === "Returned"
  ).length;

  // Toggle row expansion
  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Sort icon component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-2 text-muted-foreground" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-2 text-primary" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-2 text-primary" />
    );
  };

  // Filter inventory
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.innerLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignedTo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.previousSerialNumbers.some((sn) =>
        sn.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort inventory
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    // Handle null values
    if (aValue === null) aValue = "";
    if (bValue === null) bValue = "";

    // Convert to lowercase for string comparison
    if (typeof aValue === "string") aValue = aValue.toLowerCase();
    if (typeof bValue === "string") bValue = bValue.toLowerCase();

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Home":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 border-green-200"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Home
          </Badge>
        );
      case "Away":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-700 border-blue-200"
          >
            <Radio className="h-3 w-3 mr-1" />
            Away
          </Badge>
        );
      case "Broken":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-700 border-red-200"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Broken
          </Badge>
        );
      case "Lost":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-700 border-red-200"
          >
            <AlertCircle className="h-3 w-3 mr-1" />
            Lost
          </Badge>
        );
      case "Returned":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-700 border-red-200"
          >
            <Package className="h-3 w-3 mr-1" />
            Returned
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const hasReturnDate = (returnDate: string | null) => {
    if (!returnDate) return false;
    const today = new Date();
    const dueDate = new Date(returnDate);
    return dueDate >= today;
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
      {/* Search from URL notice */}
      {urlSearch && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-800">
              <strong>Showing results for:</strong> "{urlSearch}"
              {highlightId && " • Selected walkie is highlighted below"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWalkies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Home</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{homeWalkies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Away</CardTitle>
            <Radio className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{awayWalkies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Broken</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{brokenWalkies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lost</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lostWalkies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Returned</CardTitle>
            <Package className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{returnedWalkies}</div>
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
                  placeholder="Search by serial, label, inner label, person, or department..."
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
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Away">Away</SelectItem>
                  <SelectItem value="Broken">Broken</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Walkie Talkie
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Walkies Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("serialNumber")}
                      className="flex items-center p-0 hover:bg-transparent"
                    >
                      Serial Number
                      <SortIcon field="serialNumber" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("label")}
                      className="flex items-center p-0 hover:bg-transparent"
                    >
                      Label
                      <SortIcon field="label" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("innerLabel")}
                      className="flex items-center p-0 hover:bg-transparent"
                    >
                      Inner Label
                      <SortIcon field="innerLabel" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("status")}
                      className="flex items-center p-0 hover:bg-transparent"
                    >
                      Status
                      <SortIcon field="status" />
                    </Button>
                  </TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("department")}
                      className="flex items-center p-0 hover:bg-transparent"
                    >
                      Department
                      <SortIcon field="department" />
                    </Button>
                  </TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("assignedDate")}
                      className="flex items-center p-0 hover:bg-transparent"
                    >
                      Date Assigned
                      <SortIcon field="assignedDate" />
                    </Button>
                  </TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedInventory.length > 0 ? (
                  sortedInventory.map((item) => {
                    const isExpanded = expandedRows.includes(item.id);
                    const hasHistory =
                      item.previousSerialNumbers.length > 0 ||
                      item.history.length > 1;
                    const isHighlighted = highlightedRow === item.id;

                    return (
                      <>
                        <TableRow
                          key={item.id}
                          id={`walkie-row-${item.id}`}
                          className={
                            isHighlighted ? "bg-yellow-100 animate-pulse" : ""
                          }
                        >
                          <TableCell>
                            {hasHistory && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => toggleRow(item.id)}
                              >
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {item.serialNumber}
                              {item.previousSerialNumbers.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  <History className="h-3 w-3 mr-1" />
                                  Modified
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{item.label}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{item.innerLabel}</Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>
                            {item.project || (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.department || (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.assignedTo || (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {item.assignedDate
                              ? new Date(item.assignedDate).toLocaleDateString()
                              : "—"}
                          </TableCell>
                          <TableCell>
                            {item.returnDate ? (
                              <div className="flex items-center gap-2">
                                {hasReturnDate(item.returnDate) && (
                                  <Clock className="h-4 w-4 text-orange-600" />
                                )}
                                <div>
                                  <p className="text-sm">
                                    {new Date(
                                      item.returnDate
                                    ).toLocaleDateString()}
                                  </p>
                                  {hasReturnDate(item.returnDate) && (
                                    <p className="text-xs text-orange-600">
                                      {getDaysUntilReturn(item.returnDate)} days
                                      left
                                    </p>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  View History
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {item.status === "Away"
                                    ? "Mark as Returned"
                                    : "Assign"}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Change Serial Number
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Mark as{" "}
                                  {item.status === "Broken"
                                    ? "Working"
                                    : "Broken"}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        {isExpanded && (
                          <TableRow>
                            <TableCell colSpan={11} className="bg-secondary/50">
                              <div className="p-4 space-y-4">
                                {/* Previous Serial Numbers */}
                                {item.previousSerialNumbers.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-sm mb-2">
                                      Previous Serial Numbers:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {item.previousSerialNumbers.map(
                                        (sn, index) => (
                                          <Badge key={index} variant="outline">
                                            {sn}
                                          </Badge>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* History Timeline */}
                                <div>
                                  <h4 className="font-semibold text-sm mb-3">
                                    Activity History:
                                  </h4>
                                  <div className="space-y-3">
                                    {item.history.map((entry, index) => (
                                      <div key={index} className="flex gap-3">
                                        <div className="flex flex-col items-center">
                                          <div className="h-2 w-2 rounded-full bg-primary" />
                                          {index < item.history.length - 1 && (
                                            <div className="w-0.5 flex-1 bg-border my-1" />
                                          )}
                                        </div>
                                        <div className="flex-1 pb-3">
                                          <p className="text-sm font-medium">
                                            {entry.action}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {new Date(
                                              entry.date
                                            ).toLocaleDateString()}{" "}
                                            •
                                            {entry.department &&
                                              ` ${entry.department}`}
                                            {entry.assignedTo &&
                                              ` • ${entry.assignedTo}`}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          No walkie talkies found
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
