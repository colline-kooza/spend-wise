"use client"

import { useState } from "react"
import { Search, Filter, Download, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export interface DataTableColumn<T> {
  id: string
  header: string
  accessor?: keyof T
  cell?: (row: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

export interface DataTableAction<T> {
  label: string
  icon: React.ReactNode
  onClick: (row: T) => void
  variant?: "default" | "destructive"
  show?: "inline" | "menu" | "both"
}

export interface DataTableFilter {
  id: string
  label: string
  options: { label: string; value: string }[]
}

export interface DataTableProps<T> {
  data: any[]
  columns: DataTableColumn<T>[]
  actions?: DataTableAction<T>[] | ((row: T) => DataTableAction<T>[])
  filters?: DataTableFilter[]
  isLoading?: boolean
  error?: string | null
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  onFilterChange?: (filterId: string, value: string) => void
  enableSelection?: boolean
  onSelectionChange?: (selectedIds: Set<string>) => void
  currentPage?: number
  totalPages?: number
  totalItems?: number
  onPageChange?: (page: number) => void
  showExport?: boolean
  onExport?: () => void
  getRowId: (row: T) => string
  emptyMessage?: string
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  filters = [],
  isLoading = false,
  error = null,
  searchPlaceholder = "Search...",
  onSearch,
  onFilterChange,
  enableSelection = true,
  onSelectionChange,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  showExport = true,
  onExport,
  getRowId,
  emptyMessage = "No data found",
  className,
}: DataTableProps<T>) {
  const [searchValue, setSearchValue] = useState("")
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    onSearch?.(value)
  }

  const handleFilterChange = (filterId: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [filterId]: value }))
    onFilterChange?.(filterId, value)
  }

  const toggleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set())
      onSelectionChange?.(new Set())
    } else {
      const allIds = new Set(data.map(row => getRowId(row)))
      setSelectedRows(allIds)
      onSelectionChange?.(allIds)
    }
  }

  const toggleSelectRow = (id: string) => {
    const newSelection = new Set(selectedRows)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedRows(newSelection)
    onSelectionChange?.(newSelection)
  }

  // Helper function to get actions for a row
  const getRowActions = (row: T): DataTableAction<T>[] => {
    if (!actions) return []
    return typeof actions === 'function' ? actions(row) : actions
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">Something went wrong</h3>
          <p className="text-gray-600 mt-1">{error}</p>
        </div>
      </div>
    )
  }

  const hasActions = actions !== undefined

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200", className)}>
      {/* Filters Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9 bg-gray-50 border-gray-200"
              />
            </div>
            {filters.map((filter) => (
              <Select
                key={filter.id}
                value={filterValues[filter.id] || "all"}
                onValueChange={(value) => handleFilterChange(filter.id, value)}
              >
                <SelectTrigger className="w-[160px] bg-gray-50 border-gray-200">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {filter.label}</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
          {showExport && selectedRows.size > 0 && (
            <Button variant="outline" size="sm" onClick={onExport} className="bg-white border-gray-200">
              <Download className="h-4 w-4 mr-2" />
              Export ({selectedRows.size})
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 border-b border-gray-200">
            <tr>
              {enableSelection && (
                <th className="w-12 px-4 py-3.5">
                  <Checkbox
                    checked={selectedRows.size === data.length && data.length > 0}
                    onCheckedChange={toggleSelectAll}
                    className="border-gray-300"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="text-left px-4 py-3.5 text-xs font-medium text-gray-600 uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
              {hasActions && (
                <th className="text-center px-4 py-3.5 text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="bg-white">
                  {enableSelection && (
                    <td className="px-4 py-4">
                      <Skeleton className="h-4 w-4" />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.id} className="px-4 py-4">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-4 py-4">
                      <Skeleton className="h-8 w-8 mx-auto" />
                    </td>
                  )}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (enableSelection ? 1 : 0) + (hasActions ? 1 : 0)}
                  className="px-4 py-12 text-center"
                >
                  <p className="text-gray-500">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const rowId = getRowId(row)
                const rowActions = getRowActions(row)
                const inlineActions = rowActions.filter(a => a.show === "inline" || a.show === "both" || !a.show)
                const menuActions = rowActions.filter(a => a.show === "menu" || a.show === "both")
                
                return (
                  <tr
                    key={rowId}
                    className={cn(
                      "transition-colors hover:bg-gray-50",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    )}
                  >
                    {enableSelection && (
                      <td className="px-4 py-4">
                        <Checkbox
                          checked={selectedRows.has(rowId)}
                          onCheckedChange={() => toggleSelectRow(rowId)}
                          className="border-gray-300"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.id} className="px-4 py-4">
                        {column.cell ? (
                          column.cell(row)
                        ) : (
                          <span className="text-sm text-gray-900">
                            {column.accessor ? String(row[column.accessor]) : "—"}
                          </span>
                        )}
                      </td>
                    ))}
                    {hasActions && (
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1">
                          {inlineActions.slice(0, 2).map((action, idx) => (
                            <Button
                              key={idx}
                              variant="ghost"
                              size="sm"
                              onClick={() => action.onClick(row)}
                              className={cn(
                                "h-8 w-8 p-0",
                                action.variant === "destructive"
                                  ? "hover:bg-red-50 hover:text-red-600"
                                  : "hover:bg-gray-100"
                              )}
                            >
                              {action.icon}
                            </Button>
                          ))}
                          {menuActions.length > 0 && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {menuActions.map((action, idx) => (
                                  <DropdownMenuItem
                                    key={idx}
                                    onClick={() => action.onClick(row)}
                                    className={action.variant === "destructive" ? "text-red-600" : ""}
                                  >
                                    {action.icon}
                                    <span className="ml-2">{action.label}</span>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{((currentPage - 1) * 10) + 1}</span> to{" "}
            <span className="font-medium">{Math.min(currentPage * 10, totalItems)}</span> of{" "}
            <span className="font-medium">{totalItems}</span> entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-white border-gray-200"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className={currentPage === pageNum ? "bg-blue-600 hover:bg-blue-700" : "bg-white border-gray-200"}
                >
                  {pageNum}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-white border-gray-200"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}