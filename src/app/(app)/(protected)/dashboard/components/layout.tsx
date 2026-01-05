"use client"

import type React from "react"

import { useState } from "react"
import { MainSidebar } from "./main-sidebar"
import { MobileNav } from "./mobile-nav"
import { usePathname } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  orgName?: string
  orgId?: string
  userName?: string
  userEmail?: string
  userImage?: string | null
  userId?: string
  subscriptionData?: {
    plan?: { name: string; priceId: string };
    remainingDays: number;
  } | null
}

export default function DashboardLayout({ 
  children, 
  orgName, 
  orgId,
  userName, 
  userEmail, 
  userImage,
  userId,
  subscriptionData 
}: DashboardLayoutProps) {
  const pathname = usePathname()
  const isProjectsPage = pathname === "/dashboard/projects"
  // console.log(subscriptionData, "subscription data in layout")
  const [isMainSidebarCollapsed, setIsMainSidebarCollapsed] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Main Sidebar - Organization Level */}
      <MainSidebar
        orgName={orgName}
        orgId={orgId || ""}
        userName={userName}
        userId={userId || ""}
        userEmail={userEmail}
        userImage={userImage}
        subscriptionData={subscriptionData}
        isCollapsed={isMainSidebarCollapsed}
        onToggleCollapse={() => setIsMainSidebarCollapsed(!isMainSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Content wrapper with padding for mobile header at top and tabs at bottom */}
          <div className="pt-16 pb-20 lg:pt-0 lg:pb-0">{children}</div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
       userId={userId || ""}
       userName={userName || ""} 
       userEmail={userEmail || ""}
       subscriptionData={subscriptionData}
       orgName={orgName}
      />
    </div>
  )
}