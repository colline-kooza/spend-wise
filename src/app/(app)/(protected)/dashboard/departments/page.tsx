// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { DepartmentsListing } from "./components/DepartmentListing";

// export default function DepartmentsPage() {
//   return (
//     <div className="flex flex-col h-full">
//       {/* Page Header */}
//       <div className="border-b bg-background sticky top-0 z-10">
//         <div className="flex items-center gap-4 p-4 md:p-6">
//           <Link href="/dashboard">
//             <Button variant="ghost" size="icon">
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//           </Link>
//           <div className="flex-1">
//             <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
//             <p className="text-sm text-muted-foreground">
//               Manage departments and crew members across projects
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Page Content */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-4 md:p-6 lg:p-8">
//           <DepartmentsListing />
//         </div>
//       </div>
//     </div>
//   );
// }

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { DepartmentsListing } from "./components/departments-listings";
import { getActiveProjectCookie } from "@/lib/actions/active-project";

export default async function DepartmentsPage() {
  const user = await getAuthUser();
  const project = await getActiveProjectCookie();
  const projectId = project?.id || "";
  if (user === null) {
    redirect("/login");
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Page Header */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 border-b bg-background sticky top-0 z-10">
        <div>
          <h2 className="text-xl font-bold tracking-tight bg-gradient-to-br from-purple-700 via-purple-700 to-black bg-clip-text text-transparent">
            Departments
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage departments and organize walkie-talkie assignments
          </p>
        </div>
      </div>
      {/* Page Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <DepartmentsListing projectId={projectId} userId={user.id} />
        </div>
      </div>
    </div>
  );
}
