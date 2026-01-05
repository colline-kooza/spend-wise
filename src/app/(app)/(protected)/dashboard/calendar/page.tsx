import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CalendarListing } from "./components/CalendarListing";

export default function CalendarPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4 md:p-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
            <p className="text-sm text-muted-foreground">
              Schedule and track equipment-related events
            </p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8">
          <CalendarListing />
        </div>
      </div>
    </div>
  );
}
