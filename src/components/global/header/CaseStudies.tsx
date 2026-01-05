import {
  BarChart2,
  CheckCircle2,
  ChevronDown,
  Copy,
  CreditCard,
  Filter,
  Gift,
  Globe,
  LayoutGrid,
  Megaphone,
  MoreHorizontal,
  Play,
  QrCode,
  Settings,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import React from "react";

// --- Section 1: Links UI ---
export function LinksDashboardMockup() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white font-sans shadow-sm">
      <div className="space-y-3 p-4">
        {/* Link Item 1 */}
        <div className="group flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-colors hover:border-gray-300">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black">
              <img
                src="https://www.google.com/s2/favicons?domain=vercel.com&sz=64"
                alt="Acme"
                className="h-5 w-5 invert"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-gray-900">
                  acme.link
                </span>
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                  Primary
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span className="text-gray-400">↳</span> acme.com/homepage
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <BarChart2 size={14} /> 15.6K clicks
            </div>
            <div className="flex items-center gap-1.5 rounded border border-green-100 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              <CheckCircle2 size={12} /> Verified
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Link Item 2 */}
        <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-colors hover:border-gray-300">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <img
                src="https://www.google.com/s2/favicons?domain=raycast.com&sz=64"
                alt="Refer"
                className="h-5 w-5 grayscale"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-gray-900">
                  refer.acme.com
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span className="text-gray-400">↳</span> acme.com/partners
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <BarChart2 size={14} /> 3.7K clicks
            </div>
            <div className="flex items-center gap-1.5 rounded border border-green-100 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              <CheckCircle2 size={12} /> Verified
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Link Item 3 */}
        <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 opacity-60 shadow-sm transition-colors hover:border-gray-300">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <img
                src="https://www.google.com/s2/favicons?domain=linear.app&sz=64"
                alt="Try"
                className="h-5 w-5 grayscale"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-gray-900">
                  try.acme.com
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span className="text-gray-400">↳</span> acme.com/enterprise
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <BarChart2 size={14} /> 0 clicks
            </div>
            <div className="flex items-center gap-1.5 rounded border border-yellow-100 bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500"></div>{" "}
              Pending
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="mt-6 border-t border-gray-100 px-2 pt-6">
          <p className="mb-4 text-xs text-gray-500">
            To use{" "}
            <span className="font-medium text-gray-900">try.acme.com</span> for
            your short link domain, ensure the records below are configured.
          </p>
          <div className="mb-2 flex gap-4 border-b border-gray-100 pb-2 text-xs font-medium text-gray-400">
            <span className="-mb-2.5 border-b-2 border-black pb-2 text-gray-900">
              A Record
            </span>
            <span>CNAME Record</span>
          </div>
          <div className="mt-4 mb-2 grid grid-cols-4 gap-4 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
            <div>Type</div>
            <div>Name</div>
            <div>Value</div>
            <div>TTL</div>
          </div>
          <div className="grid grid-cols-4 gap-4 rounded border border-gray-100 bg-gray-50 p-2 font-mono text-xs text-gray-600">
            <div>A</div>
            <div>@</div>
            <div>76.76.21.21</div>
            <div>86400</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Section 2: Analytics UI ---
export function AnalyticsChartMockup() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center rounded-xl bg-gray-50/30">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:2rem_2rem]"></div>

      {/* Demo Button */}
      <div className="absolute top-6 left-6 flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm hover:bg-gray-50">
        <Play size={10} className="fill-current" /> Play demo
      </div>

      {/* Chart Container */}
      <div className="relative z-10 flex w-full max-w-2xl items-center justify-between px-4">
        {/* Node 1: Clicks */}
        <div className="relative flex w-32 flex-col gap-2">
          <div className="z-10 rounded-lg border border-gray-200 bg-white p-3 text-center shadow-sm">
            <div className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
              Clicks
            </div>
            <div className="text-2xl font-bold text-gray-900">7.2K</div>
          </div>
          {/* Flow Line 1 */}
          <div className="pointer-events-none absolute top-1/2 -right-[110px] z-0 -mt-[30px] h-[60px] w-[110px]">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 C50,50 50,80 100,80"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="24"
                strokeLinecap="round"
                className="opacity-20"
              />
              <path
                d="M0,50 C50,50 50,80 100,80"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="1"
                className="opacity-50"
              />
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            {/* Percentage Pill */}
            <div className="absolute top-[65%] left-1/2 z-20 -translate-x-1/2 rounded-full bg-blue-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
              100%
            </div>
          </div>
        </div>

        {/* Checkout Button (Action) */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-full">
          <div className="rounded-md bg-black px-6 py-2 text-[10px] font-bold text-white shadow-lg">
            Checkout
          </div>
          <div className="mx-auto h-8 w-0.5 bg-gray-200"></div>
        </div>

        {/* Node 2: Leads */}
        <div className="relative mt-16 flex w-32 flex-col gap-2">
          <div className="z-10 rounded-lg border border-gray-200 bg-white p-3 text-center shadow-sm">
            <div className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
              Leads
            </div>
            <div className="text-2xl font-bold text-gray-900">165</div>
          </div>
          {/* Flow Line 2 */}
          <div className="pointer-events-none absolute top-1/2 -right-[110px] z-0 -mt-[30px] h-[60px] w-[110px]">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 C50,50 50,20 100,20"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="12"
                strokeLinecap="round"
                className="opacity-20"
              />
              <path
                d="M0,50 C50,50 50,20 100,20"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="1"
                className="opacity-50"
              />
              <defs>
                <linearGradient
                  id="gradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            {/* Percentage Pill */}
            <div className="absolute top-[35%] left-1/2 z-20 -translate-x-1/2 rounded-full bg-purple-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
              30%
            </div>
          </div>
        </div>

        {/* Node 3: Sales */}
        <div className="relative -mt-10 flex w-32 flex-col gap-2">
          <div className="z-10 rounded-lg border border-gray-200 bg-white p-3 text-center shadow-sm">
            <div className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
              Sales
            </div>
            <div className="text-2xl font-bold text-gray-900">$506</div>
          </div>
          {/* Percentage Pill */}
          <div className="absolute top-1/2 -left-[40px] z-20 -translate-y-1/2 rounded-full bg-teal-400 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
            1.3%
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Section 3: Integrations UI ---
export function IntegrationsGridMockup() {
  const icons = [
    {
      bg: "bg-white",
      icon: (
        <img
          src="https://cdn.simpleicons.org/slack"
          className="h-6 w-6"
          alt="Slack"
        />
      ),
    },
    {
      bg: "bg-white",
      icon: (
        <img
          src="https://cdn.simpleicons.org/shopify/95BF47"
          className="h-6 w-6"
          alt="Shopify"
        />
      ),
    }, // Shopify green
    {
      bg: "bg-white",
      icon: (
        <img
          src="https://cdn.simpleicons.org/wordpress/21759B"
          className="h-6 w-6"
          alt="WordPress"
        />
      ),
    },
    {
      bg: "bg-white",
      icon: (
        <img
          src="https://cdn.simpleicons.org/airtable"
          className="h-6 w-6"
          alt="Airtable"
        />
      ),
    },
    {
      bg: "bg-white",
      icon: (
        <img
          src="https://cdn.simpleicons.org/zapier/FF4F00"
          className="h-6 w-6"
          alt="Zapier"
        />
      ),
    },
    {
      bg: "bg-white",
      icon: (
        <img
          src="https://cdn.simpleicons.org/linear/5E6AD2"
          className="h-6 w-6"
          alt="Linear"
        />
      ),
    },
    {
      bg: "bg-white",
      icon: (
        <img
          src="https://cdn.simpleicons.org/raycast/FF6363"
          className="h-6 w-6"
          alt="Raycast"
        />
      ),
    },
    {
      bg: "bg-white",
      icon: (
        <img
          src="https://cdn.simpleicons.org/notion"
          className="h-6 w-6"
          alt="Notion"
        />
      ),
    },
    {
      bg: "bg-white",
      icon: (
        <img
          src="https://cdn.simpleicons.org/figma"
          className="h-6 w-6"
          alt="Figma"
        />
      ),
    },
    {
      bg: "bg-white",
      icon: (
        <img
          src="https://cdn.simpleicons.org/googlechrome"
          className="h-6 w-6"
          alt="Chrome"
        />
      ),
    },
  ];

  return (
    <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50/50">
      {/* Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:4rem_4rem] opacity-50"></div>

      {/* Floating Icons */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="grid grid-cols-4 gap-6 md:gap-8">
          {icons.map((item, i) => (
            <div
              key={i}
              className={`h-16 w-16 rounded-2xl ${item.bg} flex items-center justify-center border border-gray-100 shadow-md transition-transform hover:scale-110 hover:shadow-lg`}
              style={{
                transform: `translateY(${i % 2 === 0 ? "-10px" : "10px"})`,
              }}
            >
              {item.icon}
            </div>
          ))}
          {/* Add a few empty placeholders for effect */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 opacity-50"></div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 opacity-50"></div>
        </div>
      </div>
    </div>
  );
}

// --- Section 4: Partners Dashboard UI (Condensed) ---
export function PartnersDashboardMockup() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white font-sans text-[12px] shadow-sm">
      <div className="flex h-[380px]">
        {/* Mini Sidebar */}
        <div className="flex w-12 flex-col items-center gap-4 border-r border-gray-100 bg-gray-50 py-4">
          <div className="text-lg font-bold">d</div>
          <div className="h-6 w-6 rounded bg-gray-200"></div>
          <div className="h-6 w-6 rounded bg-gray-200"></div>
          <div className="mt-auto h-6 w-6 rounded bg-gray-200"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col bg-white">
          {/* Header */}
          <div className="flex h-12 items-center justify-between border-b border-gray-100 px-4">
            <div className="font-semibold text-gray-900">Payouts</div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 rounded bg-black px-2 py-1 text-[10px] font-medium text-white">
                <Play size={8} className="fill-current" /> Play demo
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 p-4">
            <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <div className="mb-1 text-[10px] text-gray-500">Revenue</div>
              <div className="text-lg font-semibold">$0</div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <div className="mb-1 text-[10px] text-gray-500">Payouts</div>
              <div className="text-lg font-semibold">$0</div>
            </div>
          </div>

          {/* Action */}
          <div className="mb-4 px-4">
            <div className="flex items-center justify-between rounded-lg bg-black p-2 text-white shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-white/20">
                  <CreditCard size={12} />
                </div>
                <span className="text-xs font-medium">Payout $10.00</span>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-hidden px-4">
            <div className="space-y-2">
              {[
                {
                  name: "Mia Taylor",
                  amount: "$1.13",
                  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
                },
                {
                  name: "Sophie Laurent",
                  amount: "$0.18",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
                },
                {
                  name: "Hiroshi Tanaka",
                  amount: "$0.46",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi",
                },
                {
                  name: "Elias Weber",
                  amount: "$0.08",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Elias",
                },
                {
                  name: "Liam Carter",
                  amount: "$0.84",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
                },
                {
                  name: "Lucia Gonzalez",
                  amount: "$0.10",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia",
                },
              ].map((user, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-gray-50 py-1.5 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-5 w-5 rounded-full bg-gray-100"
                    />
                    <span className="font-medium text-gray-600">
                      {user.name}
                    </span>
                  </div>
                  <span className="text-gray-500">{user.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
