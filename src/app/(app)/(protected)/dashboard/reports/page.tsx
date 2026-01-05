import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReportsListing } from "./components/ReportsListing";
import { getAuthUser } from "@/lib/auth";
import { getActiveProjectCookie } from "@/lib/actions/active-project";
import db from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ReportsPage() {
  const user = await getAuthUser();
  const project = await getActiveProjectCookie();
  
  if (!user) redirect("/login");
  
  const projectId = project?.id || "";
  
  const departments = await db.walkieDepartment.findMany({
      where: { projectId },
      orderBy: { name: "asc" },
      select: { id: true, name: true }
  });

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
            <h1 className="text-2xl font-bold tracking-tight">Data Explorer</h1>
            <p className="text-sm text-muted-foreground">
              Generate and download reports for your equipment and projects
            </p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8">
          <ReportsListing 
            projectId={projectId} 
            userId={user.id} 
            departments={departments}
          />
        </div>
      </div>
    </div>
  );
}
