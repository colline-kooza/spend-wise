import { cn } from "@/lib/utils"

interface StatCard {
  label: string
  value: number
  color: "blue" | "orange" | "green" | "red"
}

interface StatsCardsProps {
  stats: StatCard[]
}

export function StatsCards({ stats }: StatsCardsProps) {
  const colorMap = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
    red: "bg-red-500",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={cn("w-3 h-3 rounded-full", colorMap[stat.color])}></div>
          </div>
        </div>
      ))}
    </div>
  )
}