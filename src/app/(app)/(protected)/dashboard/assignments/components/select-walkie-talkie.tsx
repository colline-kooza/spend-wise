"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search, Loader2, Radio } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface WalkieTalkie {
  id: string
  serialNumber: string
  model?: string
  status?: "available" | "assigned" | "maintenance"
}

interface SelectWalkieTalkieProps {
  label: string
  walkies: WalkieTalkie[]
  value: string | undefined
  onValueChange: (value: string | undefined) => void
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  className?: string
  showAvailableOnly?: boolean
}

const statusColors = {
  available: "bg-green-100 text-green-800",
  assigned: "bg-yellow-100 text-yellow-800",
  maintenance: "bg-red-100 text-red-800",
}

export function SelectWalkieTalkie({
  label,
  walkies,
  value,
  onValueChange,
  placeholder = "Select walkie-talkie...",
  loading = false,
  disabled = false,
  className,
  showAvailableOnly = true,
}: SelectWalkieTalkieProps) {
  const [open, setOpen] = React.useState(false)

  const filteredWalkies = showAvailableOnly ? walkies.filter((w) => w.status === "available") : walkies
  const selectedWalkie = filteredWalkies.find((w) => w.id === value)

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
            ) : selectedWalkie ? (
              <span className="flex items-center gap-2">
                <Radio className="h-3 w-3 text-primary" />
                <span className="font-medium text-foreground">{selectedWalkie.serialNumber}</span>
                {selectedWalkie.model && <span className="text-xs text-muted-foreground">{selectedWalkie.model}</span>}
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
              <CommandInput placeholder="Search by serial number..." className="h-9 flex-1" />
            </div>
            <CommandList>
              {loading ? (
                <CommandEmpty>
                  <div className="flex flex-col items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="mt-2 text-sm text-muted-foreground">Loading walkies...</span>
                  </div>
                </CommandEmpty>
              ) : filteredWalkies.length === 0 ? (
                <CommandEmpty>
                  <div className="flex flex-col items-center justify-center p-4">
                    <Radio className="h-6 w-6 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">No walkies available</span>
                  </div>
                </CommandEmpty>
              ) : (
                <CommandGroup className="max-h-[200px] overflow-y-auto">
                  {filteredWalkies.map((walkie) => (
                    <CommandItem
                      key={walkie.id}
                      value={walkie.id}
                      onSelect={() => {
                        onValueChange(value === walkie.id ? undefined : walkie.id)
                        setOpen(false)
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === walkie.id ? "opacity-100" : "opacity-0")} />
                      <div className="flex items-center gap-2 flex-1">
                        <Radio className="h-3 w-3 text-muted-foreground" />
                        <span className="text-foreground font-medium">{walkie.serialNumber}</span>
                        {walkie.model && <span className="text-xs text-muted-foreground">{walkie.model}</span>}
                        {walkie.status && (
                          <Badge className={cn("ml-auto text-xs", statusColors[walkie.status])}>{walkie.status}</Badge>
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
