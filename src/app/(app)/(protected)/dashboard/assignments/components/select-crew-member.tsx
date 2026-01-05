"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search, Loader2, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface CrewMember {
  id: string
  firstName: string
  lastName: string
  department?: {
    id: string
    name: string
    color?: string
  }
}

interface SelectCrewMemberProps {
  label: string
  crewMembers: CrewMember[]
  value: string | undefined
  onValueChange: (value: string | undefined) => void
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  className?: string
}

export function SelectCrewMember({
  label,
  crewMembers,
  value,
  onValueChange,
  placeholder = "Select crew member...",
  loading = false,
  disabled = false,
  className,
}: SelectCrewMemberProps) {
  const [open, setOpen] = React.useState(false)

  const selectedMember = crewMembers.find((c) => c.id === value)

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left font-normal bg-background border-border hover:bg-secondary"
            disabled={disabled || loading}
          >
            {loading ? (
              <span className="flex items-center text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </span>
            ) : selectedMember ? (
              <span className="flex items-center gap-2">
                <span className="font-medium text-foreground">
                  {selectedMember.firstName} {selectedMember.lastName}
                </span>
                {selectedMember.department && (
                  <>
                    {selectedMember.department.color && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: selectedMember.department.color }}
                      />
                    )}
                    <span className="text-xs text-muted-foreground">{selectedMember.department.name}</span>
                  </>
                )}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {!loading && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <div className="flex items-center border-b border-border px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput placeholder="Search crew members..." className="h-9 flex-1" />
            </div>
            <CommandList>
              {loading ? (
                <CommandEmpty>
                  <div className="flex flex-col items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="mt-2 text-sm text-muted-foreground">Loading crew members...</span>
                  </div>
                </CommandEmpty>
              ) : crewMembers.length === 0 ? (
                <CommandEmpty>
                  <div className="flex flex-col items-center justify-center p-4">
                    <Users className="h-6 w-6 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">No crew members found</span>
                  </div>
                </CommandEmpty>
              ) : (
                <CommandGroup className="max-h-[200px] overflow-y-auto">
                  {crewMembers.map((member) => (
                    <CommandItem
                      key={member.id}
                      value={member.id}
                      onSelect={() => {
                        onValueChange(value === member.id ? undefined : member.id)
                        setOpen(false)
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === member.id ? "opacity-100" : "opacity-0")} />
                      <div className="flex items-center gap-2 flex-1">
                        {member.department?.color && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: member.department.color }} />
                        )}
                        <span className="text-foreground">
                          {member.firstName} {member.lastName}
                        </span>
                        {member.department && (
                          <span className="text-xs text-muted-foreground ml-auto">{member.department.name}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
