"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Mail, Loader2, Database } from "lucide-react";
import { ReportFilters } from "./report-filters";
import { ReportTable } from "./report-table";
import { getReportData, sendReportEmail } from "@/lib/actions/reports";
import { ReportAnalytics } from "./report-analytics";
import { seedReportData } from "@/lib/actions/seed";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ReportsListingProps {
  projectId: string;
  userId: string;
  departments: any[];
}

export function ReportsListing({ projectId, userId, departments }: ReportsListingProps) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Email state
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [emailFormat, setEmailFormat] = useState<"excel" | "pdf">("excel");
  const [isSending, setIsSending] = useState(false);

  // Fetch Data on Filter Change
  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      try {
        const filters = {
             projectId,
             search: searchParams.get("search") || undefined,
             status: searchParams.get("status") ? [searchParams.get("status")!] : undefined,
             departmentId: searchParams.get("departmentId") || undefined,
             dateRange: (searchParams.get("from") && searchParams.get("to")) ? {
                 from: new Date(searchParams.get("from")!),
                 to: new Date(searchParams.get("to")!)
             } : undefined,
             type: "all" as const // Default
        };

        if (filters.status && filters.status[0] === 'all') delete filters.status;
        if (filters.departmentId === 'all') delete filters.departmentId;

        const result = await getReportData(filters);
        if (result.success) {
          setData(result.data || []);
        } else {
          toast.error("Failed to fetch report data");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [searchParams, projectId]);

  const handleSeedData = async () => {
      const confirm = window.confirm("This will add 50 dummy records to your project. Continue?");
      if (!confirm) return;

      setIsLoading(true);
      try {
        const res = await seedReportData(projectId);
        if (res.success) {
            toast.success("Dummy data seeded successfully!");
            window.location.reload(); 
        } else {
            toast.error(res.error || "Failed to seed data");
        }
      } catch(e) {
          toast.error("Failed to seed data");
      } finally {
        setIsLoading(false);
      }
  };

  const formatDate = (d: any) => d ? new Date(d).toDateString() : "-";

  // Export Logic
  const handleExportExcel = async () => {
    try {
        const XLSX = (await import("xlsx"));
        const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
            "Serial Number": item.serialNumber,
            "Label": item.label || "-",
            "Inner Label": item.innerLabel || "-",
            "Department": item.department?.name || "-",
            "Status": item.status,
            "Assigned To": item.assignments?.[0]?.assignedToName || item.assignments?.[0]?.crewMember?.firstName || "-",
            "Expect Return": formatDate(item.assignments?.[0]?.expectedReturnDate)
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        XLSX.writeFile(workbook, `Report_${new Date().toISOString().split('T')[0]}.xlsx`);
        toast.success("Excel exported successfully");
    } catch (e) {
        console.error(e);
        toast.error("Failed to export Excel. Please ensure 'xlsx' is installed.");
    }
  };

  const handleExportPDF = async () => {
    try {
        const jsPDF = (await import("jspdf")).default;
        const autoTable = (await import("jspdf-autotable")).default;
        
        const doc = new jsPDF();
        doc.text("Walkie Check Report", 14, 20);
        
        const tableData = data.map(item => [
            item.serialNumber,
            item.label || "-",
            item.innerLabel || "-",
            item.department?.name || "-",
            item.status,
            item.assignments?.[0]?.assignedToName || "-",
            formatDate(item.assignments?.[0]?.expectedReturnDate)
        ]);

        autoTable(doc, {
            head: [["Serial", "Label", "Inner Label", "Dept", "Status", "Assigned To", "Return Date"]],
            body: tableData,
            startY: 30,
        });

        doc.save(`Report_${new Date().toISOString().split('T')[0]}.pdf`);
        toast.success("PDF exported successfully");
    } catch (e) {
        console.error(e);
        toast.error("Failed to export PDF. Please ensure 'jspdf' and 'jspdf-autotable' are installed.");
    }
  };

  const handleEmailReport = async () => {
      setIsSending(true);
      try {
          let base64 = "";
          let fileName = `Report_${new Date().toISOString().split('T')[0]}`;

          if (emailFormat === "excel") {
              const XLSX = (await import("xlsx"));
              const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
                  "Serial Number": item.serialNumber,
                  "Label": item.label || "-",
                  "Inner Label": item.innerLabel || "-",
                  "Department": item.department?.name || "-",
                  "Status": item.status,
                  "Assigned To": item.assignments?.[0]?.assignedToName || "-",
                  "Expect Return": formatDate(item.assignments?.[0]?.expectedReturnDate)
              })));
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
              // Generate base64
              base64 = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });
              fileName += ".xlsx";
          } else {
             const jsPDF = (await import("jspdf")).default;
             const autoTable = (await import("jspdf-autotable")).default;
             
             const doc = new jsPDF();
             doc.text("Walkie Check Report", 14, 20);
             
             const tableData = data.map(item => [
                 item.serialNumber,
                 item.label || "-",
                 item.innerLabel || "-",
                 item.department?.name || "-",
                 item.status,
                 item.assignments?.[0]?.assignedToName || "-",
                 formatDate(item.assignments?.[0]?.expectedReturnDate)
             ]);

             autoTable(doc, {
                 head: [["Serial", "Label", "Inner Label", "Dept", "Status", "Assigned To", "Return Date"]],
                 body: tableData,
                 startY: 30,
             });
             
             const dataUri = doc.output('datauristring');
             base64 = dataUri.split(',')[1];
             fileName += ".pdf";
          }
          
          const result = await sendReportEmail(
              emailAddress,
              fileName,
              base64
          );

          if (result.success) {
              toast.success("Report emailed successfully");
              setEmailOpen(false);
          } else {
              toast.error("Failed to send email");
          }
      } catch (e) {
          console.error(e);
          toast.error("Failed to process report for email");
      } finally {
          setIsSending(false);
      }
  };

  return (
    <div className="space-y-6">
      <ReportAnalytics data={data} />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Data Explorer</CardTitle>
          <Button variant="outline" size="sm" onClick={handleSeedData}>
             <Database className="mr-2 h-4 w-4" /> Seed Dummy Data
          </Button>
        </CardHeader>
        <CardContent>
          <ReportFilters departments={departments} isLoading={isLoading} />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleExportExcel}>
            <FileText className="mr-2 h-4 w-4" /> Export Excel
        </Button>
        <Button variant="outline" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
        </Button>
        <Button onClick={() => setEmailOpen(true)}>
            <Mail className="mr-2 h-4 w-4" /> Email Report
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <ReportTable data={data} projectId={projectId} userId={userId} />
      )}

      {/* Email Dialog */}
      <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Email Report</DialogTitle>
                <DialogDescription>
                    Send the current filtered report as an Excel attachment.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 pt-4">
                <Label>Email Address</Label>
                <Input 
                    placeholder="Enter email address" 
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                />
            </div>
            <div className="space-y-2 pb-4">
                <Label>Format</Label>
                <RadioGroup value={emailFormat} onValueChange={(v: "excel" | "pdf") => setEmailFormat(v)} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="excel" id="excel" />
                        <Label htmlFor="excel">Excel</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pdf" id="pdf" />
                        <Label htmlFor="pdf">PDF</Label>
                    </div>
                </RadioGroup>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setEmailOpen(false)}>Cancel</Button>
                <Button onClick={handleEmailReport} disabled={isSending}>
                    {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Report
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
