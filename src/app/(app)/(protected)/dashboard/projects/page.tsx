import React from 'react'
import ProjectsPage from './components/ProjectsPage'
import { getActiveOrgId, getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const orgId = await getActiveOrgId();
  const user = await getAuthUser();  
  if (user === null) {
    redirect("/login");
  }
  return (
    <div>
      <ProjectsPage userId={user.id} orgId={orgId ?? ""} />
    </div>
  )
}
