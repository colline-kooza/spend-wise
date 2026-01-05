import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import { getActiveProjectCookie } from "@/lib/actions/active-project";
import ContributorsContent from "./components/ContributorsContent";

export default async function Page() {
   const user = await getAuthUser();  
      const  project =await getActiveProjectCookie();
      const projectId = project?.id || "";
      if (user === null) {
        redirect("/login");
      }
  
    if (!user) {
      return <div>Loading...</div>
    }
  
    return <div className="p-6">
      <ContributorsContent projectId={projectId} userId={user.id} />
    </div>
}
