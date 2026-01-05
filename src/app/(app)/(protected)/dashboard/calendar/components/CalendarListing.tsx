"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Package,
  Plus,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - replace with actual API data
const events = [
  {
    id: 1,
    title: "Wonder Woman - Equipment Distribution",
    type: "Distribution",
    date: "2024-01-26",
    time: "09:00 AM",
    location: "Main Studio - Warehouse A",
    project: "Wonder Woman Africa",
    department: "All Departments",
    attendees: [
      { name: "Samuel Torres", initials: "ST" },
      { name: "Jessica Lee", initials: "JL" },
      { name: "David Chen", initials: "DC" },
    ],
    walkiesNeeded: 45,
    status: "Scheduled",
  },
  {
    id: 2,
    title: "Equipment Return - Stunts Dept",
    type: "Return",
    date: "2024-01-26",
    time: "02:00 PM",
    location: "Equipment Storage",
    project: "Wonder Woman Africa",
    department: "Stunts",
    attendees: [{ name: "Samuel Torres", initials: "ST" }],
    walkiesNeeded: 15,
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Black Panther - New Equipment Setup",
    type: "Setup",
    date: "2024-01-27",
    time: "08:00 AM",
    location: "Location Site - Downtown",
    project: "Black Panther: Wakanda Rising",
    department: "Camera, Lighting",
    attendees: [
      { name: "Marcus Johnson", initials: "MJ" },
      { name: "Sarah Mitchell", initials: "SM" },
    ],
    walkiesNeeded: 32,
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Weekly Equipment Audit",
    type: "Maintenance",
    date: "2024-01-28",
    time: "10:00 AM",
    location: "Equipment Room",
    project: null,
    department: "All",
    attendees: [],
    walkiesNeeded: 0,
    status: "Scheduled",
  },
  {
    id: 5,
    title: "Production Meeting - Equipment Needs",
    type: "Meeting",
    date: "2024-01-29",
    time: "03:00 PM",
    location: "Conference Room B",
    project: "Black Panther: Wakanda Rising",
    department: "Production",
    attendees: [
      { name: "Lisa Anderson", initials: "LA" },
      { name: "Marcus Johnson", initials: "MJ" },
    ],
    walkiesNeeded: 0,
    status: "Scheduled",
  },
  {
    id: 6,
    title: "Equipment Distribution - Art Dept",
    type: "Distribution",
    date: "2024-01-30",
    time: "11:00 AM",
    location: "Art Department Office",
    project: "The Last Guardian",
    department: "Art Department",
    attendees: [{ name: "Emma Rodriguez", initials: "ER" }],
    walkiesNeeded: 18,
    status: "Scheduled",
  },
];

export function CalendarListing() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDate = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const getEventsForSelectedDate = () => {
    const dateStr = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Distribution":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Return":
        return "bg-green-100 text-green-700 border-green-200";
      case "Setup":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Maintenance":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Meeting":
        return "bg-pink-100 text-pink-700 border-pink-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Calculate metrics
  const upcomingEvents = events.filter(
    (e) => new Date(e.date) >= new Date()
  ).length;
  const thisWeekEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    const today = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(today.getDate() + 7);
    return eventDate >= today && eventDate <= weekFromNow;
  }).length;
  const totalWalkiesScheduled = events.reduce(
    (sum, e) => sum + e.walkiesNeeded,
    0
  );

  const selectedDateEvents = getEventsForSelectedDate();

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">Total scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisWeekEvents}</div>
            <p className="text-xs text-muted-foreground">
              Events in next 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Equipment Scheduled
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWalkiesScheduled}</div>
            <p className="text-xs text-muted-foreground">Walkies for events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Events
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getEventsForDate(new Date().getDate()).length}
            </div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    setCurrentDate(today);
                    setSelectedDate(today);
                  }}
                >
                  Today
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Calendar days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dayEvents = getEventsForDate(day);

                return (
                  <button
                    key={day}
                    onClick={() =>
                      setSelectedDate(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day
                        )
                      )
                    }
                    className={`
                      aspect-square p-2 rounded-lg text-sm transition-colors
                      ${
                        isToday(day)
                          ? "bg-primary text-primary-foreground font-semibold"
                          : ""
                      }
                      ${
                        isSelectedDate(day) && !isToday(day)
                          ? "bg-secondary font-medium"
                          : ""
                      }
                      ${
                        !isToday(day) && !isSelectedDate(day)
                          ? "hover:bg-secondary"
                          : ""
                      }
                    `}
                  >
                    <div className="flex flex-col items-center">
                      <span>{day}</span>
                      {dayEvents.length > 0 && (
                        <div className="flex gap-0.5 mt-1">
                          {dayEvents.slice(0, 3).map((_, i) => (
                            <div
                              key={i}
                              className="h-1 w-1 rounded-full bg-primary"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-semibold">
              {selectedDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg border hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">
                          {event.title}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getEventTypeColor(event.type)}`}
                        >
                          {event.type}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Event</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Cancel Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      {event.project && (
                        <div className="text-xs font-medium text-foreground mt-1">
                          {event.project}
                        </div>
                      )}
                      {event.walkiesNeeded > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          <Package className="h-3 w-3" />
                          <span>{event.walkiesNeeded} walkies needed</span>
                        </div>
                      )}
                      {event.attendees.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <div className="flex -space-x-2">
                            {event.attendees.slice(0, 3).map((attendee, i) => (
                              <Avatar
                                key={i}
                                className="h-6 w-6 border-2 border-background"
                              >
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                  {attendee.initials}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          {event.attendees.length > 3 && (
                            <span className="text-xs">
                              +{event.attendees.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No events scheduled</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
