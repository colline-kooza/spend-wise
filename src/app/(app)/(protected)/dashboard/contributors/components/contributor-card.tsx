"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash2, Shield } from "lucide-react"
import { ContributorRole, ProjectCollaborator } from "@/types/contributors"
import { useRemoveCollaborator, useUpdateCollaboratorRole } from "@/hooks/use-contributor"


interface CollaboratorCardProps {
  collaborator: ProjectCollaborator
  projectId: string
  userId: string
  isOwner: boolean
}

export function CollaboratorCard({ collaborator, projectId, userId, isOwner }: CollaboratorCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const removeMutation = useRemoveCollaborator(projectId, userId)
  const updateRoleMutation = useUpdateCollaboratorRole(projectId, userId)

  const handleRemove = async () => {
    await removeMutation.mutateAsync(collaborator.userId)
    setShowDeleteDialog(false)
  }

  const handleRoleChange = async (role: ContributorRole) => {
    await updateRoleMutation.mutateAsync({
      collaboratorId: collaborator.userId,
      role,
    })
  }

  return (
    <>
      <Card className="p-4 border-border hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="h-10 w-10 mt-1">
              <AvatarImage src={collaborator.user.image || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {collaborator.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">{collaborator.user.name}</h3>
              <p className="text-xs text-muted-foreground">{collaborator.user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs border-border">
                  <Shield className="h-3 w-3 mr-1" />
                  {collaborator.role}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Added {new Date(collaborator.addedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isOwner && (
              <>
                <Select
                  value={collaborator.role}
                  onValueChange={(role) => handleRoleChange(role as ContributorRole)}
                  disabled={updateRoleMutation.isPending}
                >
                  <SelectTrigger className="w-[120px] h-9 border-border text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-background">
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={removeMutation.isPending}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Collaborator</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {collaborator.user.name} from this project? They will no longer have
              access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              disabled={removeMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
