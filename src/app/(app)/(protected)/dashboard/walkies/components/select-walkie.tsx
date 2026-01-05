"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface Walkie {
  id: string
  serialNumber: string
  label?: string | null
  status: string
}

interface SelectWalkieProps {
  walkies: Walkie[]
  value?: string
  onValueChange: (value: string) => void
  disabled?: boolean
  label?: string
}

export function SelectWalkie({ walkies, value, onValueChange, disabled, label = "Assign Walkie" }: SelectWalkieProps) {
  const [open, setOpen] = React.useState(false)

  const selectedWalkie = walkies.find((w) => w.id === value)

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background border-border"
            disabled={disabled}
          >
            {selectedWalkie ? (
               <div className="flex items-center gap-2">
                 <span>{selectedWalkie.serialNumber}</span>
                 {selectedWalkie.label && <Badge variant="secondary" className="h-5 text-[10px]">{selectedWalkie.label}</Badge>}
               </div>
            ) : (
              "Select walkie..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-background border-border" align="start">
          <Command className="bg-background">
            <CommandInput placeholder="Search walkies..." />
            <CommandList>
              <CommandEmpty>No walkie found.</CommandEmpty>
              <CommandGroup>
                {walkies.map((walkie) => (
                  <CommandItem
                    key={walkie.id}
                    value={walkie.serialNumber}
                    onSelect={() => {
                      onValueChange(walkie.id === value ? "" : walkie.id)
                      setOpen(false)
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", value === walkie.id ? "opacity-100" : "opacity-0")}
                    />
                    <div className="flex flex-col">
                        <span className="font-medium">{walkie.serialNumber}</span>
                        {walkie.label && <span className="text-xs text-muted-foreground">{walkie.label}</span>}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
