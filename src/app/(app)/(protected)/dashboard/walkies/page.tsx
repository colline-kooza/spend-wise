// import { redirect } from "next/navigation";

// import { getActiveProjectCookie } from "@/lib/actions/active-project";
// import { getCrewMembers } from "@/lib/actions/crew-members";
// import { getDepartmentsForProject } from "@/lib/actions/walkie-talkies";
// import { getAuthUser } from "@/lib/auth";

// import { WalkieListings } from "./components/wakie-listings";

// export default async function WalkieTalkiesPage() {
//   const user = await getAuthUser();
//   const project = await getActiveProjectCookie();
//   const projectId = project?.id || "";

//   if (user === null) {
//     redirect("/login");
//   }

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   // Fetch initial data
//   const [departmentsResult, crewMembersResult] = await Promise.all([
//     getDepartmentsForProject(projectId, user.id),
//     getCrewMembers(projectId, user.id, 1, 1000), // Fetch all crew for selector
//   ]);

//   const departments = departmentsResult.success ? departmentsResult.data : [];
//   const crewMembers = crewMembersResult.success
//     ? (crewMembersResult.data as any).crewMembers
//     : [];

//   return (
//     <div className="flex h-screen flex-col bg-background">
//       {/* Page Content */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
//           <WalkieListings
//             projectId={projectId}
//             userId={user.id}
//             initialDepartments={departments}
//             initialCrewMembers={crewMembers}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
