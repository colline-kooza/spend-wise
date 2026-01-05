import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import { getActiveProjectCookie } from "@/lib/actions/active-project"
import { getDepartmentsForProject } from "@/lib/actions/walkie-talkies"
import { getCrewMembers } from "@/lib/actions/crew-members"
import { WalkieListings } from "./components/wakie-listings"

export default async function WalkieTalkiesPage() {
  const user = await getAuthUser()
  const project = await getActiveProjectCookie()
  const projectId = project?.id || ""

  if (user === null) {
    redirect("/login")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  // Fetch initial data
  const [departmentsResult, crewMembersResult] = await Promise.all([
    getDepartmentsForProject(projectId, user.id),
    getCrewMembers(projectId, user.id, 1, 1000), // Fetch all crew for selector
  ]);

  const departments = departmentsResult.success ? departmentsResult.data : [];
  const crewMembers = crewMembersResult.success ? (crewMembersResult.data as any).crewMembers : [];

  return (
    <div className="flex flex-col h-screen bg-background">
     
      {/* Page Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <WalkieListings 
            projectId={projectId} 
            userId={user.id} 
            initialDepartments={departments}
            initialCrewMembers={crewMembers}
          />
        </div>
      </div>
    </div>
  )
}
