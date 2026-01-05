"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, Loader2 } from "lucide-react";
import { CalendarDateRangePicker } from "./date-range-picker";
import type { DateRange } from "react-day-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addDays, subDays, startOfDay, endOfDay } from "date-fns";

interface ReportFiltersProps {
  departments: { id: string; name: string }[];
  isLoading?: boolean;
}

export function ReportFilters({ departments, isLoading }: ReportFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [departmentId, setDepartmentId] = useState(
    searchParams.get("departmentId") || "all"
  );
  
  // Date range state
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  
  const [date, setDate] = useState<DateRange | undefined>(
    fromParam && toParam
      ? { from: new Date(fromParam), to: new Date(toParam) }
      : {
          from: startOfDay(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
          to: endOfDay(new Date())
        }
  );

  // Constants
  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "available", label: "Available" },
    { value: "assigned", label: "Assigned" },
    { value: "broken", label: "Broken" },
    { value: "maintenance", label: "Maintenance" },
    { value: "inactive", label: "Inactive" },
  ];

  // Update URL when filters change
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (search) params.set("search", search);
    else params.delete("search");

    if (status && status !== "all") params.set("status", status);
    else params.delete("status");

    if (departmentId && departmentId !== "all") params.set("departmentId", departmentId);
    else params.delete("departmentId");

    if (date?.from) params.set("from", date.from.toISOString());
    else params.delete("from");

    if (date?.to) params.set("to", date.to.toISOString());
    else params.delete("to");

    // Reset pagination
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Quick Date Presets
  const setPreset = (days: number) => {
    const to = endOfDay(new Date());
    const from = startOfDay(subDays(new Date(), days));
    setDate({ from, to });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search serial, label..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>

        {/* Department Filter */}
        <Select value={departmentId} onValueChange={setDepartmentId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range Picker */}
        <CalendarDateRangePicker date={date} setDate={setDate} />

        {/* Apply & Reset */}
        <Button onClick={applyFilters} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Apply Filter
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setSearch("");
            setStatus("all");
            setDepartmentId("all");
            setDate(undefined);
            router.replace(pathname);
          }}
          title="Reset Filters"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Date Presets */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Quick Date:</span>
        <Button variant="link" size="sm" className="h-auto p-0" onClick={() => setPreset(0)}>Today</Button>
        <Button variant="link" size="sm" className="h-auto p-0" onClick={() => setPreset(7)}>Last 7 Days</Button>
        <Button variant="link" size="sm" className="h-auto p-0" onClick={() => setPreset(30)}>Last 30 Days</Button>
      </div>
    </div>
  );
}
