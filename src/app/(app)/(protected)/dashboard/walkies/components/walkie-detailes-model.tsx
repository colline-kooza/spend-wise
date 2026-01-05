"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Radio, Building2, Calendar, User, X } from "lucide-react";
import type { WalkieTalkie } from "@/types/walkie-talkie";
import { format } from "date-fns";
import { HistoryTimeline } from "./history-timeline";
import { getWalkieHistory } from "@/lib/actions/walkie-talkies";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WalkieDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walkie?: WalkieTalkie;
  isLoading?: boolean;
  userId: string;
  projectId: string;
}

const statusConfig = {
  available: {
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    label: "Available",
  },
  assigned: {
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    label: "Assigned",
  },
  broken: {
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    label: "Broken",
  },
  maintenance: {
    badge:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    label: "Broken",
  },
  inactive: {
    badge: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    label: "Inactive",
  },
};

const conditionConfig = {
  excellent: "text-green-600 dark:text-green-400",
  good: "text-blue-600 dark:text-blue-400",
  fair: "text-yellow-600 dark:text-yellow-400",
  poor: "text-red-600 dark:text-red-400",
};

export function WalkieDetailsModal({
  open,
  onOpenChange,
  walkie,
  isLoading,
  userId,
  projectId,
}: WalkieDetailsModalProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    async function fetchHistory() {
      if (open && walkie?.id && projectId && userId) {
        setHistoryLoading(true);
        try {
          const result = await getWalkieHistory(walkie.id, projectId, userId);
          if (result.success && result.data) {
            setHistory(result.data);
          } else {
            console.error("Failed to fetch history:", result.error);
          }
        } catch (error) {
          console.error("Failed to fetch history", error);
        } finally {
          setHistoryLoading(false);
        }
      }
    }
    fetchHistory();
  }, [open, walkie?.id, projectId, userId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0 gap-0 bg-background border-border outline-none">
        <DialogHeader className="p-6 pb-4 border-b border-border bg-background/50 backdrop-blur-sm z-10 shrink-0 relative">
          <div className="absolute right-4 top-4">
             <button
               onClick={() => onOpenChange(false)}
               className="rounded-full p-2 hover:bg-muted transition-colors"
             >
               <X className="h-4 w-4 text-muted-foreground" />
             </button>
          </div>
          <div className="flex items-center justify-between pr-8">
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Radio className="h-5 w-5" />
              </div>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : (
                walkie?.serialNumber
              )}
            </DialogTitle>
            {walkie && (
              <Badge
                variant="outline"
                className={cn(
                  "capitalize",
                  statusConfig[walkie.status as keyof typeof statusConfig]
                    ?.badge
                )}
              >
                {
                  statusConfig[walkie.status as keyof typeof statusConfig]
                    ?.label
                }
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-6 space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-40 w-full rounded-xl" />
              </div>
            ) : walkie ? (
              <>
                {/* Info Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Department */}
                  <div className="bg-secondary/40 rounded-xl p-4 border border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Building2 className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Department
                      </span>
                    </div>
                    {walkie.department ? (
                      <div className="flex items-center gap-2">
                        {walkie.department.color && (
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: walkie.department.color }}
                          />
                        )}
                        <p className="font-semibold text-lg text-foreground truncate">
                          {walkie.department.name}
                        </p>
                      </div>
                    ) : (
                      <p className="font-medium text-muted-foreground italic">
                        Not assigned
                      </p>
                    )}
                  </div>

                  {/* Currently With */}
                  <div className="bg-secondary/40 rounded-xl p-4 border border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <User className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Currently With
                      </span>
                    </div>
                    {walkie.assignments &&
                    walkie.assignments.length > 0 &&
                    !walkie.assignments[0].returnDate &&
                    walkie.assignments[0].crewMember ? (
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                          {walkie.assignments[0].crewMember.firstName[0]}
                          {walkie.assignments[0].crewMember.lastName[0]}
                        </div>
                        <p className="font-semibold text-lg text-foreground truncate">
                          {walkie.assignments[0].crewMember.firstName}{" "}
                          {walkie.assignments[0].crewMember.lastName}
                        </p>
                      </div>
                    ) : walkie.assignments &&
                      walkie.assignments.length > 0 &&
                      !walkie.assignments[0].returnDate &&
                      walkie.assignments[0].assignedTo ? (
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-lg text-foreground truncate">
                          {walkie.assignments[0].assignedTo.name}
                        </p>
                      </div>
                    ) : (
                      <p className="font-medium text-muted-foreground italic">
                        Not assigned
                      </p>
                    )}
                  </div>

                  {/* Return Date */}
                  <div className="bg-secondary/40 rounded-xl p-4 border border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Return Date
                      </span>
                    </div>
                    {walkie.assignments &&
                    walkie.assignments.length > 0 &&
                    !walkie.assignments[0].returnDate ? (
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-lg text-foreground truncate">
                          {walkie.assignments[0].expectedReturnDate
                            ? format(
                                new Date(
                                  walkie.assignments[0].expectedReturnDate
                                ),
                                "MMM d, yyyy"
                              )
                            : "Run of Show"}
                        </p>
                      </div>
                    ) : (
                      <p className="font-medium text-muted-foreground italic">
                        Not assigned
                      </p>
                    )}
                  </div>
                </div>

                {/* Labels Card */}
                {(walkie.label || walkie.innerLabel) && (
                  <div className="bg-card rounded-xl border border-border p-4 flex gap-6">
                    {walkie.label && (
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase">
                          Label
                        </span>
                        <p className="font-mono font-medium">{walkie.label}</p>
                      </div>
                    )}
                    {walkie.innerLabel && (
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase">
                          Internal
                        </span>
                        <p className="font-mono font-medium">
                          {walkie.innerLabel}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Assignment History / Timeline */}
                <div className="space-y-4 pb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      History Timeline
                    </h3>
                    <Badge variant="secondary" className="text-xs font-normal">
                      {history.length} Events
                    </Badge>
                  </div>

                  {historyLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-16 w-full rounded-lg" />
                      <Skeleton className="h-16 w-full rounded-lg" />
                      <Skeleton className="h-16 w-full rounded-lg" />
                    </div>
                  ) : (
                    <HistoryTimeline history={history} />
                  )}
                </div>

                {/* Metadata */}
                <div className="pt-4 border-t border-border flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider">
                  <span>
                    Created: {format(new Date(walkie.createdAt), "MMM d, yyyy")}
                  </span>
                  <span>
                    Updated: {format(new Date(walkie.updatedAt), "MMM d, yyyy")}
                  </span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
