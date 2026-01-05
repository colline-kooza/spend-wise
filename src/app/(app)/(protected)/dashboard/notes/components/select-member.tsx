"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface CrewMember {
  id: string
  firstName: string
  lastName: string
  role?: string
  department?: { name: string }
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
  placeholder = "Select a crew member...",
  loading = false,
  disabled = false,
  className,
}: SelectCrewMemberProps) {
  const [open, setOpen] = React.useState(false)

  const selectedMember = crewMembers.find((m) => m.id === value)

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left font-normal bg-secondary border-border hover:bg-secondary/80"
            disabled={disabled || loading}
          >
            {loading ? (
              <span className="flex items-center text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </span>
            ) : selectedMember ? (
              <span className="font-medium text-foreground">
                {selectedMember.firstName} {selectedMember.lastName}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {!loading && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-background border-border">
          <Command>
            <div className="flex items-center border-b border-border px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput placeholder="Search crew members..." className="h-9 flex-1 text-foreground" />
            </div>
            <CommandList>
              {crewMembers.length === 0 ? (
                <CommandEmpty className="text-muted-foreground">No crew members found</CommandEmpty>
              ) : (
                <CommandGroup>
                  {crewMembers.map((member) => (
                    <CommandItem
                      key={member.id}
                      value={member.id}
                      onSelect={() => {
                        onValueChange(value === member.id ? undefined : member.id)
                        setOpen(false)
                      }}
                      className="cursor-pointer hover:bg-secondary"
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === member.id ? "opacity-100" : "opacity-0")} />
                      <div className="flex flex-col flex-1">
                        <span className="text-foreground">
                          {member.firstName} {member.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {member.role || member.department?.name || "Crew"}
                        </span>
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
