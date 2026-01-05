"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Radio,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Clock,
  Zap,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";

// Mock data functions
const getWalkiesByDepartment = () => [
  { name: "Stunts", walkies: 15, color: "#F95E16" },
  { name: "Camera", walkies: 12, color: "#3B82F6" },
  { name: "Makeup", walkies: 8, color: "#EC4899" },
  { name: "Sound", walkies: 10, color: "#8B5CF6" },
  { name: "Production", walkies: 14, color: "#10B981" },
];

const getWalkieUsageOverTime = () => [
  { date: "Jan 15", assigned: 45, available: 15 },
  { date: "Jan 16", assigned: 48, available: 12 },
  { date: "Jan 17", assigned: 42, available: 18 },
  { date: "Jan 18", assigned: 50, available: 10 },
  { date: "Jan 19", assigned: 47, available: 13 },
  { date: "Jan 20", assigned: 52, available: 8 },
  { date: "Jan 21", assigned: 49, available: 11 },
];

const getStatusDistribution = () => [
  { name: "Active", value: 45, color: "#3B82F6" },
  { name: "Idle", value: 15, color: "#10B981" },
  { name: "Charging", value: 3, color: "#F59E0B" },
  { name: "Maintenance", value: 2, color: "#EF4444" },
];

const getRecentAssignments = () => [
  {
    id: 1,
    walkie: "WT-045",
    label: "Delta-10",
    assignedTo: "Sarah Mitchell",
    department: "Lighting",
    time: "2 hours ago",
    status: "Active",
  },
  {
    id: 2,
    walkie: "WT-032",
    label: "Epsilon-02",
    assignedTo: "Marcus Johnson",
    department: "Camera",
    time: "4 hours ago",
    status: "Active",
  },
  {
    id: 3,
    walkie: "WT-018",
    label: "Gamma-03",
    assignedTo: "Emma Rodriguez",
    department: "Art Department",
    time: "5 hours ago",
    status: "Idle",
  },
];

const getBatteryHealth = () => [
  { name: "100%", value: 22, color: "#10B981" },
  { name: "75-99%", value: 18, color: "#84CC16" },
  { name: "50-74%", value: 12, color: "#F59E0B" },
  { name: "<50%", value: 13, color: "#EF4444" },
];

const getInvoiceOverview = () => [
  {
    status: "Overdue",
    count: 5,
    amount: "USD 183,00$",
    color: "#8B5CF6",
  },
  {
    status: "Not Paid",
    count: 5,
    amount: "USD 183,00$",
    color: "#EF4444",
  },
  {
    status: "Partially Paid",
    count: 5,
    amount: "USD 183,00$",
    color: "#3B82F6",
  },
  {
    status: "Fully Paid",
    count: 5,
    amount: "USD 183,00$",
    color: "#10B981",
  },
  {
    status: "Draft",
    count: 5,
    amount: "USD 183,00$",
    color: "#F59E0B",
  },
];

export default function DashboardOverview() {
  const [dateRange, setDateRange] = useState("7days");
  const currentProject = { name: "Winter Production 2024" };

  const statusDistribution = getStatusDistribution();
  const totalWalkies = statusDistribution.reduce((sum, item) => sum + item.value, 0);
  const assignedWalkies = statusDistribution.find((s) => s.name === "Active")?.value || 0;
  const availableWalkies = statusDistribution.find((s) => s.name === "Idle")?.value || 0;
  const issuesCount =
    (statusDistribution.find((s) => s.name === "Broken")?.value || 0) +
    (statusDistribution.find((s) => s.name === "Lost")?.value || 0);

  return (
    <div className="space-y-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-br from-purple-700 via-purple-700 to-black bg-clip-text text-transparent">
              Project Management
            </h2>
            <p className="text-muted-foreground text-sm">
              {currentProject?.name || "No project selected"}
            </p>
          </div>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-lg border bg-white shadow-sm"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:gap-4 lg:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Walkies</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWalkies}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+2</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned</CardTitle>
              <Radio className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignedWalkies}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((assignedWalkies / totalWalkies) * 100)}% utilization
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableWalkies}</div>
              <p className="text-xs text-muted-foreground mt-1">Ready to assign</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{issuesCount}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {issuesCount > 0 ? (
                  <>
                    <span className="text-red-600">Requires attention</span>
                  </>
                ) : (
                  "All good"
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {/* Distribution by Department */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Distribution by Department
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Allocation across teams
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getWalkiesByDepartment()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="walkies" fill="#b84bfe" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Invoice Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Invoice Overview</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Payment status summary
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getInvoiceOverview().map((invoice) => (
                  <div key={invoice.status} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{invoice.status}</span>
                        <Badge variant="secondary" className="text-xs">
                          {invoice.count}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {invoice.amount}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: "70%",
                          backgroundColor: invoice.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {/* Status Overview */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Status Overview</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Current distribution
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {statusDistribution.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Usage Trend */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Usage Trend</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Last 7 days performance
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={getWalkieUsageOverTime()}>
                  <defs>
                    <linearGradient
                      id="colorAssigned"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorAvailable"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="assigned"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorAssigned)"
                    name="Assigned"
                  />
                  <Area
                    type="monotone"
                    dataKey="available"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorAvailable)"
                    name="Available"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Recent Activity
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Latest device assignments
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getRecentAssignments().map((assignment, idx) => (
                  <div
                    key={assignment.id}
                    className={`flex items-start gap-3 pb-4 ${
                      idx !== getRecentAssignments().length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="mt-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {assignment.walkie}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {assignment.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {assignment.assignedTo} • {assignment.department}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                        <Clock className="h-3 w-3" />
                        {assignment.time}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                      {assignment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Battery Health */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Battery Health
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Device charge levels
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getBatteryHealth().map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.value} devices
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(item.value / 30) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}