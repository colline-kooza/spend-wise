import {
  ArrowRight,
  Award,
  BarChart2,
  Box,
  Brain,
  CheckSquare,
  Cloud,
  Code2,
  Cpu,
  CreditCard,
  Database,
  GitBranch,
  Globe,
  Layers,
  Layout,
  LineChart,
  Link as LinkIcon,
  Lock,
  MessageSquare,
  QrCode,
  Search,
  Server,
  Settings,
  ShoppingCart,
  Sliders,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import React from "react";

// Animated SVG Mockups
const SEODashboardMockup = () => (
  <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      {/* SEO Score Circle */}
      <div className="relative mb-6 flex items-center justify-center">
        <svg className="h-48 w-48 -rotate-90 transform">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - 0.85)}
            className="animate-[draw_2s_ease-out]"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-gray-900">85</span>
          <span className="text-sm font-medium text-gray-500">SEO Score</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Organic Traffic",
            value: "+142%",
            icon: TrendingUp,
            color: "green",
          },
          {
            label: "Keywords Ranked",
            value: "1,284",
            icon: Search,
            color: "blue",
          },
          { label: "Backlinks", value: "856", icon: LinkIcon, color: "purple" },
        ].map((metric, i) => (
          <div
            key={i}
            className="animate-fade-in rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <metric.icon
              className={`mx-auto mb-2 text-${metric.color}-600`}
              size={20}
            />
            <div className="text-2xl font-bold text-gray-900">
              {metric.value}
            </div>
            <div className="text-xs text-gray-500">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Google My Business Preview */}
      <div className="animate-slide-up mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
            <Globe size={16} className="text-red-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">
              Desishub Technologies
            </div>
            <div className="text-xs text-gray-500">
              Software Company • 4.9 ⭐
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-gray-100">
            <div className="h-2 w-4/5 animate-pulse rounded bg-blue-500"></div>
          </div>
          <div className="h-2 w-3/4 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  </div>
);

const IntegrationFlowMockup = () => (
  <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-8 shadow-2xl">
    {/* Integration Nodes */}
    <div className="relative">
      {/* Center Hub */}
      <div className="absolute top-1/2 left-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-gray-900 to-gray-700 shadow-xl">
        <Zap size={32} className="text-white" />
      </div>

      {/* Orbiting Integration Icons */}
      {[
        {
          icon: ShoppingCart,
          label: "M-Pesa",
          color: "from-green-400 to-green-600",
          angle: 0,
        },
        {
          icon: CreditCard,
          label: "Stripe",
          color: "from-blue-400 to-blue-600",
          angle: 60,
        },
        {
          icon: Database,
          label: "CRM",
          color: "from-purple-400 to-purple-600",
          angle: 120,
        },
        {
          icon: MessageSquare,
          label: "WhatsApp",
          color: "from-emerald-400 to-emerald-600",
          angle: 180,
        },
        {
          icon: Workflow,
          label: "Zapier",
          color: "from-orange-400 to-orange-600",
          angle: 240,
        },
        {
          icon: Code2,
          label: "API",
          color: "from-indigo-400 to-indigo-600",
          angle: 300,
        },
      ].map((item, i) => {
        const radius = 140;
        const x = Math.cos((item.angle * Math.PI) / 180) * radius;
        const y = Math.sin((item.angle * Math.PI) / 180) * radius;

        return (
          <div
            key={i}
            className="animate-float absolute top-1/2 left-1/2"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}
            >
              <item.icon size={24} className="text-white" />
            </div>
            <div className="mt-2 text-center text-xs font-semibold text-gray-700">
              {item.label}
            </div>
            {/* Connection Line */}
            <svg
              className="absolute top-8 left-8 -z-10"
              style={{
                width: Math.abs(x) + 48,
                height: Math.abs(y) + 48,
                transform: `translate(-50%, -50%)`,
              }}
            >
              <line
                x1="0"
                y1="0"
                x2={-x}
                y2={-y}
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            </svg>
          </div>
        );
      })}
    </div>

    {/* Status Indicator */}
    <div className="animate-slide-up absolute right-6 bottom-6 left-6 rounded-lg border border-white/50 bg-white/80 p-3 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          <span className="text-xs font-medium text-gray-700">
            All integrations active
          </span>
        </div>
        <span className="text-xs text-gray-500">6 connected services</span>
      </div>
    </div>
  </div>
);

const AIAutomationMockup = () => (
  <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-8 shadow-2xl">
    {/* Workflow Canvas */}
    <div className="space-y-4">
      {/* Trigger Node */}
      <div className="animate-slide-right flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600 shadow-lg">
          <Zap size={24} className="text-white" />
        </div>
        <div className="flex-1 rounded-lg border border-purple-700/50 bg-purple-800/30 p-3 backdrop-blur">
          <div className="mb-1 text-xs font-medium text-purple-300">
            Trigger
          </div>
          <div className="text-sm font-semibold text-white">
            New Order Received
          </div>
        </div>
        <ArrowRight className="text-purple-400" size={20} />
      </div>

      {/* AI Processing Node */}
      <div
        className="animate-slide-right flex items-center gap-3"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg">
          <Brain size={24} className="text-white" />
        </div>
        <div className="flex-1 rounded-lg border border-purple-700/50 bg-purple-800/30 p-3 backdrop-blur">
          <div className="mb-1 text-xs font-medium text-purple-300">
            AI Processing
          </div>
          <div className="text-sm font-semibold text-white">
            Categorize & Extract Data
          </div>
        </div>
        <ArrowRight className="text-purple-400" size={20} />
      </div>

      {/* Multi-Action Node */}
      <div
        className="animate-slide-right flex items-center gap-3"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
          <Settings size={24} className="text-white" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="rounded-lg border border-blue-700/50 bg-blue-800/30 p-2 backdrop-blur">
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <MessageSquare size={12} /> Send WhatsApp notification
            </div>
          </div>
          <div className="rounded-lg border border-blue-700/50 bg-blue-800/30 p-2 backdrop-blur">
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <Database size={12} /> Update CRM records
            </div>
          </div>
          <div className="rounded-lg border border-blue-700/50 bg-blue-800/30 p-2 backdrop-blur">
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <BarChart2 size={12} /> Log analytics event
            </div>
          </div>
        </div>
      </div>

      {/* Success Indicator */}
      <div className="animate-slide-up rounded-lg border border-green-500/30 bg-green-500/10 p-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare size={16} className="text-green-400" />
            <span className="text-sm font-medium text-green-300">
              Workflow executed successfully
            </span>
          </div>
          <span className="text-xs text-green-400">2.3s</span>
        </div>
      </div>
    </div>

    {/* Stats Bar */}
    <div className="mt-6 flex items-center justify-around rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="text-center">
        <div className="text-2xl font-bold text-white">1,284</div>
        <div className="text-xs text-gray-400">Tasks Automated</div>
      </div>
      <div className="h-8 w-px bg-white/10"></div>
      <div className="text-center">
        <div className="text-2xl font-bold text-white">847hrs</div>
        <div className="text-xs text-gray-400">Time Saved</div>
      </div>
      <div className="h-8 w-px bg-white/10"></div>
      <div className="text-center">
        <div className="text-2xl font-bold text-white">99.8%</div>
        <div className="text-xs text-gray-400">Success Rate</div>
      </div>
    </div>
  </div>
);

const TechStackMockup = () => (
  <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Stack Comparison Cards */}
      <div className="space-y-4">
        {/* BHVR Stack */}
        <div className="animate-slide-right overflow-hidden rounded-xl border-2 border-blue-500 bg-white shadow-lg">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-white" />
                <span className="font-bold text-white">BHVR Stack</span>
              </div>
              <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white">
                Recommended
              </span>
            </div>
          </div>
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
              <Cloud size={14} /> Serverless • Cloudflare
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { name: "Bun", color: "from-orange-400 to-orange-600" },
                { name: "Hono", color: "from-red-400 to-red-600" },
                { name: "Vite", color: "from-purple-400 to-purple-600" },
                { name: "React", color: "from-blue-400 to-blue-600" },
              ].map((tech, i) => (
                <div
                  key={i}
                  className={`animate-fade-in rounded-lg bg-gradient-to-br ${tech.color} p-3 text-center shadow-sm`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-xs font-bold text-white">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gray-500">Cost: 90% lower</span>
              <span className="font-medium text-green-600">⚡ Ultra-fast</span>
            </div>
          </div>
        </div>

        {/* Next.js Stack */}
        <div
          className="animate-slide-right overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="bg-gray-800 p-3">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-white" />
              <span className="font-bold text-white">Next.js Fullstack</span>
            </div>
          </div>
          <div className="p-4">
            <div className="mb-2 text-sm text-gray-600">
              For startups & company websites
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded bg-gray-900 px-3 py-2 text-xs font-medium text-white">
                Next.js
              </div>
              <div className="flex-1 rounded bg-gray-700 px-3 py-2 text-xs font-medium text-white">
                Vercel
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Stack */}
        <div
          className="animate-slide-right overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3">
            <div className="flex items-center gap-2">
              <Server size={18} className="text-white" />
              <span className="font-bold text-white">Enterprise Stack</span>
            </div>
          </div>
          <div className="p-4">
            <div className="mb-2 text-sm text-gray-600">
              Golang + React microservices
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded bg-blue-500 px-3 py-2 text-center text-xs font-medium text-white">
                Go
              </div>
              <div className="flex-1 rounded bg-blue-400 px-3 py-2 text-center text-xs font-medium text-white">
                React
              </div>
              <div className="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-xs font-medium text-white">
                AWS
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stack */}
        <div
          className="animate-slide-right overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3">
            <div className="flex items-center gap-2">
              <Smartphone size={18} className="text-white" />
              <span className="font-bold text-white">Mobile Development</span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded bg-blue-400 px-3 py-2 text-center text-xs font-medium text-white">
                React Native
              </div>
              <div className="flex-1 rounded bg-purple-500 px-3 py-2 text-center text-xs font-medium text-white">
                Kotlin
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Badge */}
      <div className="animate-slide-up mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="font-semibold text-green-900">
              Modern Tech = Better Results
            </span>
          </div>
          <span className="text-sm text-green-700">3x faster builds</span>
        </div>
      </div>
    </div>
  </div>
);

const CustomAPIMockup = () => (
  <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-950 shadow-2xl">
    <div className="p-8">
      {/* API Endpoints List */}
      <div className="space-y-3">
        {[
          {
            method: "POST",
            endpoint: "/api/payments/mpesa",
            status: "200",
            color: "green",
          },
          {
            method: "GET",
            endpoint: "/api/products",
            status: "200",
            color: "blue",
          },
          {
            method: "PUT",
            endpoint: "/api/orders/:id",
            status: "200",
            color: "yellow",
          },
          {
            method: "POST",
            endpoint: "/api/webhooks/stripe",
            status: "200",
            color: "purple",
          },
        ].map((api, i) => (
          <div
            key={i}
            className="animate-slide-right flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/50 p-4 backdrop-blur transition-all hover:border-gray-700"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <span
              className={`rounded px-2 py-1 text-xs font-bold ${
                api.method === "POST"
                  ? "bg-green-500/20 text-green-400"
                  : api.method === "GET"
                    ? "bg-blue-500/20 text-blue-400"
                    : api.method === "PUT"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-purple-500/20 text-purple-400"
              }`}
            >
              {api.method}
            </span>
            <span className="flex-1 font-mono text-sm text-gray-300">
              {api.endpoint}
            </span>
            <span className="flex items-center gap-1 text-xs text-green-400">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              {api.status}
            </span>
          </div>
        ))}
      </div>

      {/* Code Preview */}
      <div className="animate-slide-up mt-6 rounded-lg border border-gray-800 bg-gray-900 p-4 font-mono text-xs">
        <div className="mb-2 flex items-center gap-2 text-gray-500">
          <Code2 size={12} />
          <span>Custom API Response</span>
        </div>
        <div className="space-y-1 text-gray-400">
          <div>
            {"{"} <span className="text-blue-400">&quot;success&quot;</span>:{" "}
            <span className="text-green-400">true</span>,
          </div>
          <div className="pl-4">
            <span className="text-blue-400">&quot;data&quot;</span>: {"{"}
          </div>
          <div className="pl-8">
            <span className="text-blue-400">&quot;transaction_id&quot;</span>:{" "}
            <span className="text-orange-400">&quot;MPX8472...&quot;</span>,
          </div>
          <div className="pl-8">
            <span className="text-blue-400">&quot;amount&quot;</span>:{" "}
            <span className="text-purple-400">5000</span>,
          </div>
          <div className="pl-8">
            <span className="text-blue-400">&quot;status&quot;</span>:{" "}
            <span className="text-green-400">&quot;completed&quot;</span>
          </div>
          <div className="pl-4">{"}"}</div>
          <div>{"}"}</div>
        </div>
      </div>

      {/* API Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { label: "Requests/day", value: "1.2M", icon: Zap },
          { label: "Avg Response", value: "45ms", icon: TrendingUp },
          { label: "Uptime", value: "99.9%", icon: CheckSquare },
        ].map((stat, i) => (
          <div
            key={i}
            className="animate-fade-in rounded-lg border border-gray-800 bg-gray-900/30 p-3 text-center backdrop-blur"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <stat.icon className="mx-auto mb-2 text-blue-400" size={16} />
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function AddOnServicesSection() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* --- Section 1: SEO & AEO --- */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-blue-600">
                <Search size={14} />
              </div>
              <span className="text-sm font-semibold text-gray-600">
                Search Optimization
              </span>
            </div>
            <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl">
              Get found by your customers
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-500">
              Dominate search results with our comprehensive SEO & AEO services.
              Rank higher on Google, get cited in AI answers (ChatGPT, Google
              AI), and optimize your Google My Business presence for local
              dominance.
            </p>
            <button className="mb-12 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
              Get SEO Audit
            </button>

            {/* Feature Columns */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FeatureColumn
                icon={<Search size={18} />}
                title="Search Engine Optimization"
                desc="Drive organic traffic with keyword research, on-page SEO, technical optimization, and link building strategies."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Sparkles size={18} />}
                title="Answer Engine Optimization"
                desc="Get your content cited in AI-powered answers from ChatGPT, Google AI Overviews, and voice assistants."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Globe size={18} />}
                title="Google My Business"
                desc="Dominate local search with optimized GMB listings, reviews management, and location-based targeting."
                link="Learn more"
              />
              <FeatureColumn
                icon={<BarChart2 size={18} />}
                title="Performance Tracking"
                desc="Real-time analytics, ranking reports, and traffic insights to measure your SEO success."
                link="Learn more"
              />
            </div>
          </div>

          <div className="w-full">
            <SEODashboardMockup />
          </div>
        </div>
      </section>

      {/* Testimonial 1 */}
      <Testimonial
        quote="After implementing Desishub's SEO strategy, our organic traffic increased by 340% in just 6 months. We now rank #1 for our top 20 keywords and our Google My Business profile generates 50+ leads monthly."
        author="James Kamau"
        role="Marketing Director at TechHub Kenya"
        logo={
          <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
            <div className="h-4 w-4 rounded-full bg-blue-500"></div> TechHub
          </div>
        }
      />

      {/* --- Section 2: Third-Party Integrations --- */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div className="order-2 w-full lg:order-1">
            <IntegrationFlowMockup />

            {/* Feature Columns for Integrations */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <FeatureColumn
                icon={<ShoppingCart size={18} />}
                title="Payment Gateways"
                desc="M-Pesa, MTN, Airtel Money, Stripe, PayPal - seamless integration with secure webhooks and real-time reconciliation."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Database size={18} />}
                title="CRM Integration"
                desc="Connect with Salesforce, HubSpot, Zoho, or custom CRMs. Sync contacts, leads, and deals automatically."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Code2 size={18} />}
                title="Custom APIs"
                desc="RESTful or GraphQL APIs tailored to your needs. Complete documentation and SDK support included."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Lock size={18} />}
                title="Secure & Compliant"
                desc="Bank-level encryption, PCI DSS compliance, and secure authentication for all integrations."
                link="Learn more"
              />
            </div>
          </div>

          <div className="order-1 max-w-xl lg:order-2">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-purple-100 text-purple-600">
                <Zap size={14} />
              </div>
              <span className="text-sm font-semibold text-gray-600">
                System Integration
              </span>
            </div>
            <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl">
              Connect everything seamlessly
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-500">
              Integrate payment gateways, CRMs, ERPs, and third-party services
              with custom APIs built for reliability. From M-Pesa to Salesforce,
              we connect your entire tech ecosystem.
            </p>
            <button className="rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
              View Integrations
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial 2 */}
      <Testimonial
        quote="Desishub integrated our entire payment stack - M-Pesa, card payments, and our accounting system - in just 3 weeks. The system handles 10K+ transactions daily with zero downtime. Exceptional work!"
        author="Grace Wanjiru"
        role="CTO at PayFast Africa"
        logo={
          <div className="flex items-center gap-1 text-sm font-bold text-green-600">
            <CreditCard size={14} /> PayFast
          </div>
        }
      />

      {/* --- Section 3: AI & Automation --- */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-100 text-indigo-600">
                <Brain size={14} />
              </div>
              <span className="text-sm font-semibold text-gray-600">
                Intelligent Automation
              </span>
            </div>
            <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl">
              Automate the boring stuff
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-500">
              Stop wasting time on repetitive tasks. Our AI-powered automation
              solutions integrate with Zapier, n8n, WhatsApp, and custom
              workflows to handle everything from customer support to data
              processing.
            </p>
            <button className="mb-12 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
              Hire AI Team
            </button>

            {/* Feature Columns */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FeatureColumn
                icon={<Workflow size={18} />}
                title="Workflow Automation"
                desc="Zapier, n8n, Make integration. Automate data entry, notifications, approvals, and business processes."
                link="Learn more"
              />
              <FeatureColumn
                icon={<MessageSquare size={18} />}
                title="WhatsApp Business AI"
                desc="AI-powered chatbots for WhatsApp. Handle customer queries, bookings, and support 24/7."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Brain size={18} />}
                title="Custom AI Solutions"
                desc="Document processing, data extraction, predictive analytics, and intelligent decision-making systems."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Settings size={18} />}
                title="Task Automation"
                desc="Email automation, report generation, inventory updates, and recurring task scheduling."
                link="Learn more"
              />
            </div>
          </div>
          <div className="w-full">
            <AIAutomationMockup />
          </div>
        </div>
      </section>

      {/* Testimonial 3 */}
      <Testimonial
        quote="The AI automation saved our team 40 hours per week. Customer support is handled 24/7 via WhatsApp bot, data entry is automatic, and reports generate themselves. Best ROI we've had on any tech investment."
        author="David Omondi"
        role="Operations Manager at LogiTrack"
        logo={
          <div className="flex items-center gap-1 text-sm font-bold text-indigo-600">
            <Zap size={14} /> LogiTrack
          </div>
        }
      />

      {/* --- Section 4: Modern Tech Stack --- */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-orange-100 text-orange-600">
                <Cpu size={14} />
              </div>
              <span className="text-sm font-semibold text-gray-600">
                Technology Excellence
              </span>
            </div>
            <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl">
              Built with superior technology
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-500">
              We use the most modern, battle-tested tech stacks to build faster,
              more scalable, and more cost-effective solutions. From serverless
              BHVR stack to enterprise microservices, we choose the right
              technology for your business needs.
            </p>
            <button className="mb-12 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
              View Tech Stack
            </button>

            {/* Feature Columns */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FeatureColumn
                icon={<Zap size={18} />}
                title="BHVR Stack (Recommended)"
                desc="Bun + Hono + Vite + React on Cloudflare. Serverless, ultra-fast, 90% lower costs. Perfect for modern apps."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Layers size={18} />}
                title="Next.js Fullstack"
                desc="Best for startups and company websites. Fast development, SEO-friendly, and budget-conscious."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Server size={18} />}
                title="Golang + React"
                desc="Enterprise-grade microservices. Built for massive scale, high performance, and complex business logic."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Smartphone size={18} />}
                title="Mobile Apps"
                desc="React Native for cross-platform, Kotlin for native Android. Beautiful, performant mobile experiences."
                link="Learn more"
              />
            </div>
          </div>

          <div className="w-full">
            <TechStackMockup />
          </div>
        </div>
      </section>

      {/* --- Section 5: Custom API & WordPress --- */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div className="order-2 w-full lg:order-1">
            <CustomAPIMockup />
          </div>

          <div className="order-1 max-w-xl lg:order-2">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-600">
                <Code2 size={14} />
              </div>
              <span className="text-sm font-semibold text-gray-600">
                Custom Development
              </span>
            </div>
            <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl">
              APIs, themes & plugins
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-500">
              Need a custom API for your mobile app? Custom WordPress theme for
              your brand? Unique plugin functionality? We build custom solutions
              that extend your platform&apos;s capabilities and integrate
              perfectly with your existing systems.
            </p>
            <button className="mb-12 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
              Request Custom Build
            </button>

            {/* Feature Columns */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FeatureColumn
                icon={<Code2 size={18} />}
                title="Custom API Development"
                desc="RESTful or GraphQL APIs with comprehensive documentation, authentication, rate limiting, and monitoring."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Layout size={18} />}
                title="WordPress Themes"
                desc="Custom-designed, responsive WordPress themes optimized for speed, SEO, and conversions."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Box size={18} />}
                title="WordPress Plugins"
                desc="Custom plugins for unique functionality - payment gateways, booking systems, custom post types, and more."
                link="Learn more"
              />
              <FeatureColumn
                icon={<GitBranch size={18} />}
                title="Headless CMS"
                desc="WordPress as a headless CMS with Next.js or React frontend. Best of both worlds."
                link="Learn more"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-12 text-center">
          <div className="mx-auto max-w-3xl">
            <h3 className="text-4xl font-bold text-white">
              Ready to scale your business with modern technology?
            </h3>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
              From SEO to AI automation, payment integrations to custom APIs -
              we provide the complete technology stack your business needs to
              compete and win in the digital age.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button className="flex h-14 items-center justify-center gap-2 rounded-full border-2 border-white bg-white px-10 text-base font-medium text-gray-900 transition-all hover:bg-gray-100">
                <span>Schedule Free Strategy Call</span>
                <ArrowRight size={18} />
              </button>
              <button className="h-14 rounded-full border-2 border-white/30 bg-transparent px-10 text-base font-medium text-white transition-all hover:border-white hover:bg-white/10">
                View Case Studies
              </button>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckSquare size={16} className="text-green-400" />
                <span>Free technical consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare size={16} className="text-green-400" />
                <span>Custom pricing for startups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare size={16} className="text-green-400" />
                <span>Ongoing support included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureColumn({
  icon,
  title,
  desc,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  link: string;
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="mb-3 text-gray-900">{icon}</div>
      <h3 className="mb-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mb-3 text-xs leading-relaxed text-gray-500">{desc}</p>
      <a
        href="#"
        className="group flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
      >
        {link}{" "}
        <ArrowRight
          size={10}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </a>
    </div>
  );
}

function Testimonial({
  quote,
  author,
  role,
  logo,
}: {
  quote: string;
  author: string;
  role: string;
  logo: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl border-t border-b border-gray-100/50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50/50 via-transparent to-transparent px-6 py-20">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <blockquote className="text-xl leading-relaxed font-medium text-gray-800 md:text-2xl">
            &quot;{quote}&quot;
          </blockquote>
        </div>
        <div className="flex flex-col items-start gap-4 md:col-span-4 md:items-end">
          <div className="mb-2">{logo}</div>
          <div className="flex items-center gap-3 text-right">
            <div className="flex flex-col items-start md:items-end">
              <span className="text-sm font-semibold text-gray-900">
                {author}
              </span>
              <span className="text-xs text-gray-500">{role}</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white">
              {author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these animations to your global CSS
const styles = `
@keyframes draw {
  from {
    stroke-dashoffset: 552.92;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-right {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-draw {
  animation: draw 2s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-right {
  animation: slide-right 0.8s ease-out forwards;
  opacity: 0;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
`;
