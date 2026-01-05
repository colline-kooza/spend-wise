"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search, Loader2, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface Department {
  id: string
  name: string
  color?: string
  code?: string
}

interface SelectDepartmentProps {
  label: string
  departments: Department[]
  value: string | undefined
  onValueChange: (value: string | undefined) => void
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  className?: string
}

export function SelectDepartment({
  label,
  departments,
  value,
  onValueChange,
  placeholder = "Select a department...",
  loading = false,
  disabled = false,
  className,
}: SelectDepartmentProps) {
  const [open, setOpen] = React.useState(false)

  const selectedDept = departments.find((d) => d.id === value)

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
            ) : selectedDept ? (
              <span className="flex items-center gap-2">
                {selectedDept.color && (
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedDept.color }} />
                )}
                <span className="font-medium text-foreground">{selectedDept.name}</span>
                {selectedDept.code && <span className="text-xs text-muted-foreground">({selectedDept.code})</span>}
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
              <CommandInput placeholder="Search departments..." className="h-9 flex-1" />
            </div>
            <CommandList>
              {loading ? (
                <CommandEmpty>
                  <div className="flex flex-col items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="mt-2 text-sm text-muted-foreground">Loading departments...</span>
                  </div>
                </CommandEmpty>
              ) : departments.length === 0 ? (
                <CommandEmpty>
                  <div className="flex flex-col items-center justify-center p-4">
                    <Building2 className="h-6 w-6 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">No departments found</span>
                  </div>
                </CommandEmpty>
              ) : (
                <CommandGroup className="max-h-[200px] overflow-y-auto">
                  {departments.map((dept) => (
                    <CommandItem
                      key={dept.id}
                      value={dept.name}
                      onSelect={() => {
                        onValueChange(value === dept.id ? undefined : dept.id)
                        setOpen(false)
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === dept.id ? "opacity-100" : "opacity-0")} />
                      <div className="flex items-center gap-2 flex-1">
                        {dept.color && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.color }} />}
                        <span className="text-foreground">{dept.name}</span>
                        {dept.code && <span className="text-xs text-muted-foreground ml-auto">{dept.code}</span>}
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
