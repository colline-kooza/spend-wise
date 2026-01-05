"use client";

export default function Analytics() {
  return (
    <section id="features" className="border-b border-slate-100 bg-white px-2">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 lg:flex-row lg:px-0 lg:py-16">
        {/* Left analytics cards */}
        <div className="w-full space-y-4 lg:w-1/2 grid lg:grid-cols-2 lg:gap-2 bg-gradient-to-br from-sky-100 via-white to-fuchsia-100 p-4 rounded-3xl">
          {/* Card 1 - Account Summary */}
          <div className="rounded-3xl bg-gradient-to-br from-sky-100 via-white to-fuchsia-100 p-1 shadow-lg">
            <div className="space-y-3 rounded-3xl bg-white/90 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium">Account Summary</span>
                <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[0.65rem]">
                  Monthly
                </span>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight text-slate-900">
                  $82,300
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Net revenue across all workspaces this month.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 - Workspaces & Churn */}
          <div className="rounded-3xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-5 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Active Workspaces</p>
                <p className="mt-1 text-2xl font-bold">36</p>
                <p className="mt-1 text-xs opacity-75">Across all accounts</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-90">Churn Rate</p>
                <p className="mt-1 text-2xl font-bold">1.2%</p>
                <p className="mt-1 text-xs opacity-75">Monthly average</p>
              </div>
            </div>
          </div>

          {/* Card 3 - Performance Chart */}
          <div className="rounded-3xl bg-slate-50 p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">Performance</span>
              <span className="text-slate-400">Last 12 weeks</span>
            </div>
            <div className="mt-3 h-32 rounded-xl bg-white p-3">
              <svg
                viewBox="0 0 100 40"
                className="h-full w-full text-indigo-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polyline
                  points="0,30 10,24 20,26 30,18 40,22 50,14 60,16 70,10 80,14 90,8 100,12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Steady growth trend</span>
              <span className="font-medium text-emerald-500">↑ 12.5%</span>
            </div>
          </div>
        </div>
        {/* Right copy and features */}
        <div className="w-full space-y-8 lg:w-1/2">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              The reasons to prefer choosing our platform
            </h2>
            <p className="text-base text-slate-500">
              Stay on top of every metric that matters without drowning in
              noise. See the full journey from sign-up to renewal.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-2">
            {[
              {
                title: "Real-time data",
                desc: "Connect your tools and stream events instantly for always-fresh dashboards.",
                icon: "📊",
              },
              {
                title: "Fast and Easy to use",
                desc: "Ship dashboards in minutes with templates that fit your workflows.",
                icon: "🚀",
              },
              {
                title: "Safety & Security",
                desc: "Enterprise-grade encryption, SSO, and audit logs for complete peace of mind.",
                icon: "🔒",
              },
              {
                title: "Powerful App",
                desc: "Native desktop and mobile apps keep your team connected anywhere.",
                icon: "📱",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-xl">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
