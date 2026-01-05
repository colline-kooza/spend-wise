"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { WalkieDetailsModal } from "../../walkies/components/walkie-detailes-model";
import { useState } from "react";

interface ReportTableProps {
  data: any[]; // WalkieTalkie with included relations
  projectId: string;
  userId: string;
}

const statusConfig = {
  available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  assigned: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  broken: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  maintenance: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

export function ReportTable({ data, projectId, userId }: ReportTableProps) {
  const [selectedWalkie, setSelectedWalkie] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border rounded-md">
        <p className="text-muted-foreground">No records found matching your filters.</p>
      </div>
    );
  }

  return (
    <>
    <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Serial Number</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Current Assignment</TableHead>
              <TableHead>Return Due</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              const activeAssignment = item.assignments?.[0]; // Assuming query includes active assignment
              const isOverdue = activeAssignment && activeAssignment.expectedReturnDate && new Date() > new Date(activeAssignment.expectedReturnDate);

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                        <span>{item.serialNumber}</span>
                        {item.label && <span className="text-xs text-muted-foreground flex gap-1">
                             {item.label} 
                             {item.innerLabel && <span className="text-secondary-foreground">{item.innerLabel}</span>}
                        </span>}
                    </div>
                  </TableCell>
                  <TableCell>{item.department?.name || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[item.status as keyof typeof statusConfig] || statusConfig.inactive}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {activeAssignment ? (
                        <div className="flex flex-col text-sm">
                            <span className="font-medium">
                                {activeAssignment.assignedToName || 
                                 (activeAssignment.crewMember ? `${activeAssignment.crewMember.firstName} ${activeAssignment.crewMember.lastName}` : "Unknown")}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Since {format(new Date(activeAssignment.checkoutDate), "MMM dd")}
                            </span>
                        </div>
                    ) : (
                        "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {activeAssignment?.expectedReturnDate ? (
                        <span className={isOverdue ? "text-red-600 font-bold" : ""}>
                            {format(new Date(activeAssignment.expectedReturnDate), "MMM dd, yyyy")}
                            {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
                        </span>
                    ) : (
                        "-"
                    )}
                  </TableCell>
                   <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                            setSelectedWalkie(item);
                            setDetailsOpen(true);
                        }}
                        title="View History"
                      >
                          <Eye className="h-4 w-4" />
                      </Button>
                   </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
    </div>
    
    <WalkieDetailsModal 
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        walkie={selectedWalkie}
        userId={userId}
        projectId={projectId}
        isLoading={false}
    />
    </>
  );
}
