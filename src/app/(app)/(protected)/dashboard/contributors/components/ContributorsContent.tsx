"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Users, Clock } from "lucide-react"
import { useProjectCollaborators, useProjectInvitations } from "@/hooks/use-contributor"
import { CollaboratorCard } from "./contributor-card"
import { InvitationCard } from "./inivatation"
import { SearchUsersDialog } from "./search-user"


export default function ContributorsContent({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [filterTab, setFilterTab] = useState<"all" | "active" | "pending">("all")

  // Use both hooks separately
  const { collaborators, isLoading: isLoadingCollaborators } = useProjectCollaborators(projectId)
  const { invitations, isLoading: isLoadingInvitations } = useProjectInvitations(projectId)

  const isLoading = isLoadingCollaborators || isLoadingInvitations

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  const activeCollaborators = collaborators.filter((c) => c.status === "active")
  const pendingInvitations = invitations.filter((i) => i.status === "pending")

  return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold text-foreground">Contributors</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">Manage project collaborators and invitations</p>
        </div>
        <Button
          onClick={() => setIsSearchOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 sm:gap-2 self-start sm:self-auto text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
        >
          <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Add Contributor
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={filterTab} onValueChange={(v) => setFilterTab(v as "all" | "active" | "pending")} className="w-full">
        <TabsList className="border-b border-border bg-transparent p-0">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary text-xs sm:text-sm"
          >
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            All ({activeCollaborators.length})
          </TabsTrigger>
          <TabsTrigger 
            value="pending" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary text-xs sm:text-sm"
          >
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            Pending ({pendingInvitations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {activeCollaborators.length === 0 ? (
            <div className="text-center py-8 sm:py-10 lg:py-12 px-4">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />
              <p className="text-muted-foreground text-sm mb-3 sm:mb-4">No collaborators yet</p>
              <Button
                onClick={() => setIsSearchOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-9"
              >
                Add First Contributor
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {activeCollaborators.map((collaborator) => (
                <CollaboratorCard
                  key={collaborator.id}
                  collaborator={collaborator}
                  projectId={projectId}
                  userId={userId}
                  isOwner={true}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {pendingInvitations.length === 0 ? (
            <div className="text-center py-8 sm:py-10 lg:py-12 px-4">
              <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />
              <p className="text-muted-foreground text-sm">No pending invitations</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingInvitations.map((invitation) => (
                <InvitationCard key={invitation.id} invitation={invitation} projectId={projectId} userId={userId} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Search Dialog */}
      <SearchUsersDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} projectId={projectId} userId={userId} />
    </div>
  )
}