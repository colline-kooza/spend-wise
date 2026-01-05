"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area"; // Added missing import
import {
  Mail,
  Phone,
  Briefcase,
  Building2,
  Radio,
  Calendar,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { CrewMember } from "@/types/crew-members";

interface CrewDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  crewMember?: CrewMember | null;
  isLoading?: boolean;
}

export function CrewDetailsModal({
  open,
  onOpenChange,
  crewMember,
  isLoading = false,
}: CrewDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col p-0 gap-0 bg-background border-border overflow-hidden outline-none">
        <DialogHeader className="p-6 pb-4 border-b border-border bg-background/50 backdrop-blur-sm z-10 shrink-0 relative">
          <div className="absolute right-4 top-4">
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full p-2 hover:bg-muted transition-colors outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close dialog"
              type="button"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
            {isLoading ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : crewMember ? (
              <>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs shrink-0">
                  {crewMember.firstName[0]}
                  {crewMember.lastName[0]}
                </div>
                {`${crewMember.firstName} ${crewMember.lastName}`}
              </>
            ) : (
              <div className="h-6 w-40 bg-muted animate-pulse rounded" />
            )}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto w-full">
          <div className="p-6 space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-40 w-full rounded-xl" />
              </div>
            ) : crewMember ? (
              <>
                {/* Department & Role Card */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-secondary/40 rounded-xl p-4 border border-border/50 space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Role
                      </span>
                    </div>
                    <p className="font-semibold text-lg text-foreground">
                      {crewMember.role || "No Role Assigned"}
                    </p>
                  </div>

                  <div className="bg-secondary/40 rounded-xl p-4 border border-border/50 space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Department
                      </span>
                    </div>
                    {crewMember.department ? (
                      <div className="flex items-center gap-2">
                        {crewMember.department.color && (
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: crewMember.department.color,
                            }}
                          />
                        )}
                        <p
                          className="font-semibold text-lg text-foreground truncate"
                          title={crewMember.department.name}
                        >
                          {crewMember.department.name}
                        </p>
                      </div>
                    ) : (
                      <p className="font-medium text-muted-foreground italic">
                        Not assigned
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Contact Details
                  </h3>
                  <div className="bg-card rounded-xl border border-border divide-y divide-border">
                    <div className="flex items-center p-3 gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {crewMember.email || "No email provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {crewMember.phone || "No phone provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equipment Assignments */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Walkie-Talkie History
                    </h3>
                    <Badge variant="outline" className="text-xs font-normal">
                      {crewMember.walkieTalkieAssignments?.length || 0} Records
                    </Badge>
                  </div>

                  {crewMember.walkieTalkieAssignments &&
                  crewMember.walkieTalkieAssignments.length > 0 ? (
                    <div className="space-y-3">
                      {crewMember.walkieTalkieAssignments.map((assignment) => {
                        const isActive = !assignment.returnDate;
                        const checkoutDate = assignment.checkoutDate
                          ? new Date(assignment.checkoutDate)
                          : null;
                        const returnDate = assignment.returnDate
                          ? new Date(assignment.returnDate)
                          : null;

                        return (
                          <div
                            key={
                              assignment.id ||
                              `${assignment.walkieTalkieId}-${assignment.checkoutDate}`
                            }
                            className={`group relative flex flex-col sm:flex-row gap-3 p-3 rounded-xl border ${
                              isActive
                                ? "bg-primary/5 border-primary/20"
                                : "bg-card border-border hover:bg-secondary/20"
                            } transition-all`}
                          >
                            {/* Icon Status */}
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              <Radio className="h-5 w-5" />
                            </div>

                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-semibold text-foreground truncate">
                                  {assignment.walkieTalkie?.serialNumber ||
                                    "Unknown Walkie"}
                                </p>
                                {isActive && (
                                  <Badge className="bg-primary text-primary-foreground text-[10px] h-5">
                                    ACTIVE
                                  </Badge>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 shrink-0" />
                                  <span>
                                    Checked out:{" "}
                                    {checkoutDate
                                      ? format(checkoutDate, "MMM d, yyyy")
                                      : "Unknown date"}
                                  </span>
                                </div>
                                {returnDate && (
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3 shrink-0" />
                                    <span>
                                      Returned:{" "}
                                      {format(returnDate, "MMM d, yyyy")}
                                    </span>
                                  </div>
                                )}
                              </div>
                              {assignment.walkieTalkie?.label && (
                                <p className="text-xs font-medium text-foreground/80 mt-1">
                                  Label: {assignment.walkieTalkie.label}
                                </p>
                              )}
                              {assignment.walkieTalkie?.innerLabel && (
                                <p className="text-xs text-muted-foreground">
                                  Internal: {assignment.walkieTalkie.innerLabel}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-secondary/20 rounded-xl border border-dashed border-border">
                      <Radio className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="text-sm text-muted-foreground">
                        No walkie-talkies assigned yet
                      </p>
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row justify-between gap-2 text-[10px] text-muted-foreground uppercase tracking-wider">
                  <span>
                    Created:{" "}
                    {crewMember.createdAt
                      ? format(new Date(crewMember.createdAt), "MMM d, yyyy")
                      : "Unknown"}
                  </span>
                  <span>
                    Updated:{" "}
                    {crewMember.updatedAt
                      ? format(new Date(crewMember.updatedAt), "MMM d, yyyy")
                      : "Unknown"}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No crew member data available</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
