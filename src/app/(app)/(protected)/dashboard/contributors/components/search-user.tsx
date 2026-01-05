"use client"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus } from "lucide-react"
import { ContributorRole } from "@/types/contributors"
import { useInviteCollaborator, useSearchUsers } from "@/hooks/use-contributor"
import { UpgradeModal } from "@/components/dashboard/upgrade-modal";


interface SearchUsersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  userId: string
}

export function SearchUsersDialog({ open, onOpenChange, projectId, userId }: SearchUsersDialogProps) {
  const [query, setQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<ContributorRole>("viewer")
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const { results, isLoading } = useSearchUsers(projectId, query, userId) // FIXED: correct parameter order
  const inviteMutation = useInviteCollaborator(projectId, userId)

  const handleInvite = useCallback(
    async (email: string) => {
      try {
        const result = await inviteMutation.mutateAsync({
          email,
          role: selectedRole,
        })
        
        // result is unknown if hook wraps response, but usually mutateAsync returns the data
        // If the hook returns the action response directly:
        if (result && !result.success && result.error && result.error.includes("limit")) {
             setShowUpgradeModal(true);
        }
      } catch (error: any) {
         if (error.message && error.message.includes("limit")) {
             setShowUpgradeModal(true);
         }
      }
    },
    [inviteMutation, selectedRole],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Contributors</DialogTitle>
          <DialogDescription>Search for users to add as collaborators to your project</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Search Users</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 border-border focus:border-primary"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Role</label>
            <div className="flex gap-2">
              {(["viewer", "editor", "admin"] as ContributorRole[]).map((role) => (
                <Button
                  key={role}
                  size="sm"
                  variant={selectedRole === role ? "default" : "outline"}
                  onClick={() => setSelectedRole(role)}
                  className={selectedRole === role ? "bg-primary hover:bg-primary/90" : "border-border"}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Results</label>
            <ScrollArea className="h-[300px] border border-border rounded-lg p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Spinner className="h-6 w-6" />
                </div>
              ) : query.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Start typing to search users</p>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">No users found</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={user.image || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                        {user.isCollaborator && (
                          <Badge variant="secondary" className="text-xs">
                            Already added
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant={user.isCollaborator ? "ghost" : "default"}
                          disabled={user.isCollaborator || inviteMutation.isPending}
                          onClick={() => handleInvite(user.email)}
                          className={
                            !user.isCollaborator ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""
                          }
                        >
                          {inviteMutation.isPending ? (
                            <Spinner className="h-4 w-4" />
                          ) : (
                            <UserPlus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title="Collaborator Limit Reached"
        description="You cannot add collaborators on your current plan. Upgrade to Pro to invite team members."
        planName="Pro"
      />
    </Dialog>
  )
}