import { redirect } from "next/navigation"

import { 
  getActiveWalkieTalkies, 
  getAllProjectWalkiesIncludingInactive, 
  getCrewMembers,
} from "@/lib/actions/walkie-assignment"
import db from "@/lib/prisma"
import { getAuthUser } from "@/lib/auth"
import { getActiveProjectCookie } from "@/lib/actions/active-project"
import { NotesListing } from "./components/note-card-listing"

export default async function NotesPage() {
  const user = await getAuthUser()
  const project = await getActiveProjectCookie()
  const projectId = project?.id || ""

  if (user === null) {
    redirect("/login")
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen text-foreground">Loading...</div>
  }

  // Fetch related data
  const [walkies, crewMembers, departments] = await Promise.all([
    getAllProjectWalkiesIncludingInactive(projectId, user.id), // Changed this line
    getCrewMembers(projectId, user.id),
    db.walkieDepartment.findMany({
      where: { projectId },
      orderBy: { name: "asc" },
    }),
  ])

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <NotesListing
          projectId={projectId}
          userId={user.id}
          walkies={walkies.data || []}
          crewMembers={crewMembers.data || []}
          departments={departments || []}
        />
      </div>
    </main>
  )
}