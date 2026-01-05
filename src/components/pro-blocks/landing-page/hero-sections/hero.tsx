"use client"

import { PlayCircle, TrendingUp, ArrowUpRight, ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid-radial pt-14">
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-white"></div>

      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-indigo-200/60 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-40 top-60 h-96 w-96 rounded-full bg-purple-200/60 blur-3xl"></div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 pb-10 pt-10 lg:flex-row lg:items-start lg:px-0 lg:pb-16 lg:pt-16">

        <div className="w-full max-w-xl space-y-7 lg:w-1/2">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm shadow-slate-200">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            #1 Walkie Management Suite
          </span>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Unleash Your
            <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
              {" "}
              Walkie Control
            </span>{" "}
            With Our Tracking Tools
          </h1>

          <p className="text-lg font-normal text-slate-500">
            Track, assign, and manage every walkie-talkie in a unified dashboard built for fast-paced production teams.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="/dashboard">
            <button className="rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:from-indigo-600 hover:to-fuchsia-500">
              Start Tracking
            </button></a>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm shadow-slate-200 transition hover:border-slate-300 hover:shadow-md">
              <PlayCircle className="h-5 w-5 text-slate-700" strokeWidth={1.5} />
              <span>See Demo</span>
            </button>
          </div>
        </div>

        <div className="w-full max-w-xl lg:w-1/2">
          <div className="relative rounded-3xl bg-gradient-to-br from-sky-100 via-white to-fuchsia-100 p-1 shadow-2xl shadow-sky-200/70">
            <div className="rounded-3xl bg-white/90 p-5 backdrop-blur-sm sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-4 text-xs font-medium text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-400"></span>
                  <span className="h-2 w-2 rounded-full bg-amber-300"></span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="rounded-full bg-slate-50 px-3 py-1 text-[0.7rem] font-medium text-slate-500">
                  Inventory
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">Checked-Out Units</p>
                    <p className="flex items-center gap-1 text-xs font-medium text-emerald-500">
                      <TrendingUp className="h-4 w-4" strokeWidth={1.5} />
                      12.8%
                    </p>
                  </div>

                  <div className="h-32 rounded-2xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 p-2">
                    <div className="flex h-full items-end gap-1">
                      {[58, 90, 70, 85, 60].map((height, i) => (
                        <span
                          key={i}
                          className="flex-1 rounded-t-lg bg-gradient-to-t from-indigo-500/10 to-indigo-500/70"
                          style={{ height: `${height}%` }}
                        ></span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                      Active
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-fuchsia-500"></span>
                      Returned
                    </div>
                  </div>
                </div>

                <div className="w-full space-y-3 sm:w-40">
                  <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-3 text-white shadow-lg shadow-indigo-500/50">
                    <p className="text-xs font-medium text-indigo-100">On-Set Devices</p>
                    <p className="mt-1 text-xl font-semibold tracking-tight">284</p>
                    <p className="mt-2 flex items-center gap-1 text-[0.7rem] font-medium text-emerald-200">
                      <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                      +4.2% today
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-900 p-3 text-slate-50">
                    <p className="text-xs font-medium text-slate-400">Lost / Faulty</p>
                    <p className="mt-1 text-lg font-semibold tracking-tight">17 units</p>
                    <p className="mt-1 text-[0.7rem] font-medium text-emerald-400">+3% this week</p>
                  </div>

                  <button className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm shadow-slate-200 transition hover:border-indigo-200 hover:text-indigo-600">
                    <span>View device report</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -left-3 bottom-6 h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 opacity-70 blur-sm"></div>
            <div className="pointer-events-none absolute -right-4 top-8 h-12 w-12 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 opacity-60 blur-md"></div>
          </div>
        </div>

      </div>
    </section>
  )
}
