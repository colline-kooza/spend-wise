"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface Walkie {
  id: string
  serialNumber: string
  model?: string
  status?: string
}

interface SelectWalkieProps {
  label: string
  walkies: Walkie[]
  value: string | undefined
  onValueChange: (value: string | undefined) => void
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  className?: string
}

export function SelectWalkie({
  label,
  walkies,
  value,
  onValueChange,
  placeholder = "Select a walkie...",
  loading = false,
  disabled = false,
  className,
}: SelectWalkieProps) {
  const [open, setOpen] = React.useState(false)

  const selectedWalkie = walkies.find((w) => w.id === value)

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
            ) : selectedWalkie ? (
              <span className="font-medium text-foreground">{selectedWalkie.serialNumber}</span>
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
              <CommandInput placeholder="Search walkies..." className="h-9 flex-1 text-foreground" />
            </div>
            <CommandList>
              {walkies.length === 0 ? (
                <CommandEmpty className="text-muted-foreground">No walkies found</CommandEmpty>
              ) : (
                <CommandGroup>
                  {walkies.map((walkie) => (
                    <CommandItem
                      key={walkie.id}
                      value={walkie.id}
                      onSelect={() => {
                        onValueChange(value === walkie.id ? undefined : walkie.id)
                        setOpen(false)
                      }}
                      className="cursor-pointer hover:bg-secondary"
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === walkie.id ? "opacity-100" : "opacity-0")} />
                      <div className="flex flex-col">
                        <span className="text-foreground">{walkie.serialNumber}</span>
                        {walkie.model && <span className="text-xs text-muted-foreground">{walkie.model}</span>}
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
