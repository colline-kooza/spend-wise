"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"
import { useDepartmentDetails } from "@/hooks/use-departments"
import type { Department } from "@/types/departments"

interface WalkieDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  department: Department | null
  userId: string  
}

export function WalkieDialog({ open, onOpenChange, department, userId }: WalkieDialogProps) {
  const { department: detailedDept, isLoading } = useDepartmentDetails(
    department?.id || "",
    department?.projectId || "",
    userId,  // ✅ Now passing userId correctly
  )

  const walkies = detailedDept?.walkieTalkies || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Walkie-Talkies in {department?.name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {walkies.length} device{walkies.length !== 1 ? "s" : ""} assigned to this department
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : walkies.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary border-b border-border">
                <TableRow>
                  <TableHead className="text-foreground font-semibold">Serial Number</TableHead>
                  <TableHead className="text-foreground font-semibold">Label</TableHead>
                  <TableHead className="text-foreground font-semibold">Inner Label</TableHead>
                  <TableHead className="text-foreground font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border">
                {walkies.map((walkie) => (
                  <TableRow key={walkie.id} className="hover:bg-secondary/50">
                    <TableCell className="font-medium text-foreground">{walkie.serialNumber}</TableCell>
                    <TableCell className="text-muted-foreground">{walkie.label || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{walkie.innerLabel || "—"}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          walkie.status === "available"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : walkie.status === "assigned"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : walkie.status === "maintenance"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                : walkie.status === "lost"
                                  ? "bg-red-100 text-red-700 border-red-200"
                                  : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {walkie.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <Card className="border-border bg-secondary/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Walkie-Talkies</h3>
              <p className="text-sm text-muted-foreground">No devices assigned to this department yet</p>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}