"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, Eye, MoreVertical, Users } from "lucide-react"
import { CrewMember } from "@/types/crew-members"

interface CrewCardProps {
  crewMember: CrewMember
  onEdit: (member: CrewMember) => void
  onDelete: (member: CrewMember) => void
  onView: (member: CrewMember) => void
}

export function CrewCard({ crewMember, onEdit, onDelete, onView }: CrewCardProps) {
  const initials = `${crewMember.firstName[0]}${crewMember.lastName[0]}`.toUpperCase()

  return (
    <Card className="border-border bg-card overflow-hidden hover:shadow-md transition-all duration-300 group relative">
      {/* Background icon with low opacity */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <Users className="h-32 w-32 text-primary" />
      </div>

      <div className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-lg">
              {crewMember.firstName} {crewMember.lastName}
            </h3>
            {crewMember.role && <p className="text-sm text-muted-foreground">{crewMember.role}</p>}
          </div>

          {/* Avatar Circle */}
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-primary">{initials}</span>
          </div>
        </div>

        {/* Department Badge */}
        {crewMember.department && (
          <div className="flex items-center gap-2">
            {crewMember.department.color && (
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: crewMember.department.color }} />
            )}
            <Badge variant="secondary" className="bg-secondary/80 text-secondary-foreground hover:bg-secondary">
              {crewMember.department.name}
            </Badge>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-1 text-xs text-muted-foreground">
          {crewMember.email && (
            <p className="truncate hover:text-foreground transition-colors cursor-pointer" title={crewMember.email}>
              📧 {crewMember.email}
            </p>
          )}
          {crewMember.phone && (
            <p className="truncate hover:text-foreground transition-colors cursor-pointer" title={crewMember.phone}>
              📱 {crewMember.phone}
            </p>
          )}
        </div>

        {/* Walkie Assignment Count */}
        {crewMember.walkieTalkieAssignments && crewMember.walkieTalkieAssignments.length > 0 && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs font-medium text-primary">
              {crewMember.walkieTalkieAssignments.length} walkie-talkie
              {crewMember.walkieTalkieAssignments.length !== 1 ? "s" : ""} assigned
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(crewMember)}
            className="hover:bg-secondary flex-1"
            title="View Details"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-secondary">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-border">
              <DropdownMenuItem onClick={() => onEdit(crewMember)} className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(crewMember)} className="text-destructive cursor-pointer">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  )
}
