import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import { getActiveProjectCookie } from "@/lib/actions/active-project"
import { AssignmentsListings } from "./components/assignment-listings"

export const metadata = {
  title: "Walkie Assignments",
  description: "Manage walkie-talkie assignments and track returns",
}

export default async function AssignmentsPage() {
  const user = await getAuthUser()
  const project = await getActiveProjectCookie()
  const projectId = project?.id || ""

  if (user === null) {
    redirect("/login")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <AssignmentsListings projectId={projectId} userId={user.id} />
        </div>
      </div>
    </div>
  )
}
