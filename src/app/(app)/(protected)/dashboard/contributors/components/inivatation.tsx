"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Clock, X, Mail } from "lucide-react"
import { ProjectInvitation } from "@/types/contributors"
import { useCancelInvitation } from "@/hooks/use-contributor"


interface InvitationCardProps {
  invitation: ProjectInvitation
  projectId: string
  userId: string
}

export function InvitationCard({ invitation, projectId, userId }: InvitationCardProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const cancelMutation = useCancelInvitation(projectId, userId)

  const handleCancel = async () => {
    await cancelMutation.mutateAsync(invitation.id)
    setShowCancelDialog(false)
  }

  const isExpired = new Date(invitation.expiresAt) < new Date()
  const daysUntilExpiry = Math.ceil(
    (new Date(invitation.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <>
      <Card className="p-4 border-border bg-secondary/30 hover:bg-secondary/50 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">{invitation.email}</h3>
              <p className="text-xs text-muted-foreground mt-1">Invited by {invitation.inviter.name}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="outline" className="text-xs border-border">
                  {invitation.role}
                </Badge>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    isExpired ? "text-destructive" : daysUntilExpiry <= 1 ? "text-amber-600" : "text-muted-foreground"
                  }`}
                >
                  <Clock className="h-3 w-3" />
                  {isExpired ? "Expired" : `Expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? "s" : ""}`}
                </div>
              </div>
            </div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowCancelDialog(true)}
            disabled={cancelMutation.isPending || isExpired}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Invitation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel the invitation to {invitation.email}? They will not be able to accept it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel className="border-border">Keep It</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              disabled={cancelMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Invitation
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
