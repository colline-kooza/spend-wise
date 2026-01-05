
import { CrewListings } from "./components/crew-listings";
import { getAuthUser } from "@/lib/auth";
import { getActiveProjectCookie } from "@/lib/actions/active-project";
import { redirect } from "next/navigation";

export default async function CrewMembersPage() {
   const user = await getAuthUser();  
      const  project =await getActiveProjectCookie();
      const projectId = project?.id || "";
      if (user === null) {
        redirect("/login");
      }
  
    if (!user) {
      return <div>Loading...</div>
    }
  
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <CrewListings projectId={projectId} userId={user.id} />
      </div>
    </main>
  );
}
