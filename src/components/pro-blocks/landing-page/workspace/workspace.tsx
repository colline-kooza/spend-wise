export default function Workspace() {
  return (
    <div
      id="how"
      className="py-20 bg-gradient-to-br from-slate-100/45 via-slate-200/5 to-purple-200/5 px-2"
    >
      <div className="mx-auto max-w-6xl px-6 ">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-2/5 space-y-4">
            <h2 className="text-4xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Build your
              <br />
              own workspace.
            </h2>
            <p className="text-slate-500 text-base ">
              It only takes a couple of clicks, but will cover your company
              needs in the long run.
            </p>

            <div className="space-y-6 pt-4">
              <div className="space-y-1">
                <p className="font-semibold text-slate-900">1. Create</p>
                <p className="text-slate-500 text-sm">
                  Enter layouts, apps, for each teams with no code
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-slate-900">2. Organize</p>
                <p className="text-slate-500 text-sm">
                  Sync the charts, dashboards, notes, and settings
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-slate-900">3. Visualize</p>
                <p className="text-slate-500 text-sm">
                  Go further with Trends, Reports, Forecasts, Charts & more
                </p>
              </div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="w-full lg:w-3/5 relative h-[380px] sm:h-[400px] lg:h-[420px]">
            {/* Decorative circles */}
            <div className="absolute -top-4 right-8 sm:right-12 w-12 h-12 sm:w-16 sm:h-16">
              <div className="w-full h-full rounded-full border-4 border-cyan-300 opacity-60 transform rotate-45"></div>
            </div>
            <div className="absolute bottom-12 sm:bottom-16 right-2 sm:right-4 w-10 h-10 sm:w-12 sm:h-12">
              <div className="w-full h-full rounded-full border-4 border-indigo-300 opacity-60 transform -rotate-12"></div>
            </div>

            {/* Task Progress Card */}
            <div
              className="shake-card absolute top-0 left-4 sm:left-12 lg:left-16 w-44 sm:w-48 lg:w-52 bg-white rounded-2xl p-3 sm:p-4 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              style={{ "--rotate": "-2deg" } as React.CSSProperties}
            >
              <p className="text-xs text-slate-400 font-medium">
                Successfully Task
              </p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                130 Task
              </p>
              <p className="text-xs text-slate-400">Per month</p>

              <div className="mt-3 flex items-end gap-1 h-8 sm:h-10">
                {[40, 60, 45, 70, 55, 80, 65].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-violet-400 to-pink-300 rounded-t-sm"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>

              <div className="flex justify-between text-[10px] text-slate-300 mt-1">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Trello Card */}
            <div
              className="shake-card absolute top-2 right-8 sm:right-12 lg:right-16 w-36 sm:w-40 lg:w-44 bg-white rounded-2xl p-3 sm:p-4 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              style={
                {
                  "--rotate": "3deg",
                  animationDelay: "0.5s",
                } as React.CSSProperties
              }
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="4" y="4" width="6" height="14" rx="1" />
                    <rect x="14" y="4" width="6" height="9" rx="1" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    Trello
                  </p>
                  <p className="text-xs text-slate-400">Tasks</p>
                </div>
              </div>
            </div>

            {/* Slack Card */}
            <div
              className="shake-card absolute top-24 sm:top-28 left-0 w-40 sm:w-44 lg:w-48 bg-white rounded-2xl p-3 sm:p-4 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              style={
                {
                  "--rotate": "1deg",
                  animationDelay: "1s",
                } as React.CSSProperties
              }
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center">
                  {/* Slack Icon */}
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24">
                    <path
                      fill="#E01E5A"
                      d="M6 15a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2h2v2z"
                    />
                    <path
                      fill="#E01E5A"
                      d="M7 15a2 2 0 0 1 2-2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2a2 2 0 0 1-2-2v-5z"
                    />
                    <path
                      fill="#36C5F0"
                      d="M9 6a2 2 0 0 1-2-2a2 2 0 0 1 2-2a2 2 0 0 1 2 2v2H9z"
                    />
                    <path
                      fill="#36C5F0"
                      d="M9 7a2 2 0 0 1 2 2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2a2 2 0 0 1 2-2h5z"
                    />
                    <path
                      fill="#2EB67D"
                      d="M18 9a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-2V9z"
                    />
                    <path
                      fill="#2EB67D"
                      d="M17 9a2 2 0 0 1-2 2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v5z"
                    />
                    <path
                      fill="#ECB22E"
                      d="M15 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2v-2h2z"
                    />
                    <path
                      fill="#ECB22E"
                      d="M15 17a2 2 0 0 1-2-2a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    Slack
                  </p>
                  <p className="text-xs text-slate-400">Slack</p>
                </div>
              </div>

              <div className="h-2 w-full rounded-full bg-gradient-to-r from-pink-300 via-purple-300 via-blue-300 via-green-300 to-yellow-300 opacity-70"></div>
            </div>

            {/* Chat Card */}
            <div
              className="shake-card absolute bottom-6 sm:bottom-10 right-8 sm:right-16 lg:right-24 w-52 sm:w-56 lg:w-60 bg-white rounded-2xl p-3 sm:p-4 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              style={
                {
                  "--rotate": "-2deg",
                  animationDelay: "1.5s",
                } as React.CSSProperties
              }
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Margie</p>
                  <p className="text-[10px] text-slate-400">Product Designer</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl p-2.5 sm:p-3 text-white text-xs mb-2">
                Teamfields, <br />
                Let's go forward and <br />
                let's get started
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-400 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">P</span>
                  </div>
                  <div className="bg-slate-100 rounded-lg px-2.5 py-1.5 sm:px-3 text-xs text-slate-600">
                    Let's go forward here
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-400 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">S</span>
                  </div>
                  <div className="bg-slate-100 rounded-lg px-2.5 py-1.5 sm:px-3 text-xs text-slate-600">
                    Thanks, I'm fine
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute top-1/2 right-1/3 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-pink-400 opacity-60"></div>
            <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-400 opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
