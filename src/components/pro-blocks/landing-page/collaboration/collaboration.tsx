"use client";

import Image from "next/image";
import { Check } from "lucide-react";

export default function Collaboration() {
  return (
    <section className="border-b border-slate-100 bg-white px-2" id="product">
      <div className="mx-auto max-w-6xl px-4 md:py-16 flex flex-col lg:flex-row lg:items-center gap-14">
        {/* Left — Chat Card */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <div className="relative max-w-sm w-full rounded-3xl bg-gradient-to-br from-indigo-200 via-white to-fuchsia-200 p-1 shadow-2xl">
            <div className="rounded-3xl bg-white/90 py-10 px-14  backdrop-blur-md">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  walkie-ops
                </span>
                <span>•••</span>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 text-sm">
                {/* User 1 */}
                <div className="flex items-start gap-3">
                  <Image
                    src="/balia.png"
                    alt="user"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="px-3 py-2 rounded-2xl bg-slate-100">
                    <p className="text-slate-700">
                      Hi Sam, any updates on unit counts?
                    </p>
                  </div>
                </div>

                {/* User 2 reply */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="px-3 py-2 rounded-2xl bg-indigo-500 text-white max-w-[75%]">
                    <p>I just logged the latest walkie movement.</p>
                  </div>
                  <Image
                    src="/balia.png"
                    alt="user"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>

                {/* User 3 */}
                <div className="flex items-start gap-3">
                  <Image
                    src="/balia.png"
                    alt="user"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="px-3 py-2 rounded-2xl bg-slate-100">
                    <p className="text-slate-700">
                      I'll verify the checkouts and note issues.
                    </p>
                  </div>
                </div>
              </div>

              {/* Meeting card */}
              <div className="mt-5 flex items-center justify-between bg-slate-900 text-white rounded-2xl px-4 py-3 text-xs">
                <div>
                  <p className="font-medium">Crew Briefing</p>
                  <p className="text-slate-400 text-[0.7rem]">
                    Today at 3:30pm
                  </p>
                </div>
                <button className="bg-white text-slate-900 px-3 py-1 rounded-full text-[0.7rem] font-semibold">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Floating profile card */}
          <div className="absolute -right-5 top-1/2 translate-y-[-50%] bg-white shadow-xl rounded-2xl px-4 py-3 flex flex-col items-center w-32">
            <Image
              src="/balia.png"
              alt="profile"
              width={60}
              height={60}
              className="rounded-full"
            />
            <h4 className="font-semibold text-sm mt-2">Crew Member</h4>
            <span className="text-[0.65rem] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full mt-1">
              Active
            </span>
          </div>
        </div>

        {/* Right — Text Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">
            Coordinate every device
          </h2>

          <p className="text-base text-slate-500 max-w-md">
            Keep your production running smoothly with real-time walkie
            tracking, instant updates, and unified communication tools built for
            fast-moving crews.
          </p>

          {/* Bullet points */}
          <ul className="space-y-4 text-base text-slate-600">
            {[
              "Live walkie updates, quick notes, and instant alerts.",
              "Shared device logs, checkout history, and synced changes.",
              "Role-based control to keep equipment fully protected.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span
                  className={`h-6 w-6 flex items-center justify-center rounded-full ${
                    i === 0
                      ? "bg-emerald-100 text-emerald-600"
                      : i === 1
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-fuchsia-100 text-fuchsia-600"
                  }`}
                >
                  <Check className="h-4 w-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <button className="mt-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition">
            Book a demo
          </button>
        </div>
      </div>
    </section>
  );
}
