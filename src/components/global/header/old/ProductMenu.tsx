import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart2,
  Box,
  Link as LinkIcon,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import React from "react";

export default function ProductMenu() {
  return (
    <div className="grid w-full grid-cols-12 gap-6">
      {/* Dub Links - Left Column */}
      <div className="group col-span-4">
        <a
          href="#"
          className="block h-full rounded-xl border border-transparent p-4 transition-colors hover:border-gray-100 hover:bg-gray-50"
        >
          <div className="mb-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
              <LinkIcon size={18} />
            </div>
            <h3 className="mb-1 text-base font-semibold text-gray-900">
              Dub Links
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              Short links with superpowers for modern marketing teams.
            </p>
          </div>
          {/* Visual Preview */}
          <div className="mt-4 rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-shadow group-hover:shadow-md">
            <div className="mb-2 flex items-center justify-between border-b border-gray-50 pb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900">
                  <span className="text-[10px] font-bold text-white">d</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-800">
                    d.to
                  </span>
                  <span className="text-[10px] text-gray-400">dub.co</span>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded bg-gray-50 px-1.5 py-0.5 text-[10px] text-gray-500">
                <Zap size={10} /> 151.8K clicks
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900">
                  <span className="text-[10px] font-bold text-white">d</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-800">
                    d.to/register
                  </span>
                  <span className="text-[10px] text-gray-400">
                    app.dub.co/reg...
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded bg-gray-50 px-1.5 py-0.5 text-[10px] text-gray-500">
                <Zap size={10} /> 100K clicks
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Dub Analytics - Middle Column */}
      <div className="group col-span-4">
        <a
          href="#"
          className="block h-full rounded-xl border border-transparent p-4 transition-colors hover:border-gray-100 hover:bg-gray-50"
        >
          <div className="mb-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <BarChart2 size={18} />
            </div>
            <h3 className="mb-1 text-base font-semibold text-gray-900">
              Dub Analytics
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              Powerful analytics delivered instantly.
            </p>
          </div>
          {/* Visual Preview - Simple Line Chart Mockup */}
          <div className="relative mt-4 h-32 overflow-hidden rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow group-hover:shadow-md">
            <div className="absolute inset-0 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                  d.to/try
                </span>
                <span className="text-[10px] text-gray-400">Apr 2025</span>
              </div>
              <div className="mt-4 flex h-12 w-full items-end space-x-1">
                <div className="h-[30%] w-full rounded-t bg-green-50"></div>
                <div className="h-[50%] w-full rounded-t bg-green-100"></div>
                <div className="h-[40%] w-full rounded-t bg-green-200"></div>
                <div className="h-[70%] w-full rounded-t bg-green-300"></div>
                <div className="h-[50%] w-full rounded-t bg-green-400"></div>
                <div className="h-[90%] w-full rounded-t bg-green-500"></div>
              </div>
            </div>
            {/* Stats Overlay */}
            <div className="absolute right-2 bottom-2 left-2 flex justify-between rounded bg-white/90 p-1 text-[10px] text-gray-500 backdrop-blur-sm">
              <span>
                Clicks{" "}
                <span className="font-semibold text-gray-900">12.5K</span>
              </span>
              <span>
                Sales <span className="font-semibold text-gray-900">$$$</span>
              </span>
            </div>
          </div>
        </a>
      </div>

      {/* Dub Partners - Right Column */}
      <div className="group col-span-4">
        <a
          href="#"
          className="block h-full rounded-xl border border-transparent p-4 transition-colors hover:border-gray-100 hover:bg-gray-50"
        >
          <div className="mb-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <Users size={18} />
            </div>
            <h3 className="mb-1 text-base font-semibold text-gray-900">
              Dub Partners
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              Grow your revenue on auto-pilot with partnerships.
            </p>
          </div>
          {/* Visual Preview - User List */}
          <div className="mt-4 space-y-2 rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-shadow group-hover:shadow-md">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-gray-50 pb-2 last:border-0 last:pb-0"
              >
                <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                  <img
                    src={`https://picsum.photos/32/32?random=${i}`}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-1 h-2 w-16 rounded bg-gray-100"></div>
                  <div className="h-1.5 w-10 rounded bg-gray-50"></div>
                </div>
                <div className="text-right">
                  <div className="mb-1 ml-auto h-2 w-8 rounded bg-gray-100"></div>
                </div>
              </div>
            ))}
          </div>
        </a>
      </div>

      {/* Bottom Row */}
      <div className="col-span-6 mt-2">
        <a
          href="#"
          className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-gray-50"
        >
          <div className="mt-1">
            <h3 className="text-sm font-semibold text-gray-900">
              Dub Integrations
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Enhance your short links with Slack, Zapier, Raycast, and more.
            </p>
            <div className="mt-3 flex gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#4A154B] text-[10px] font-bold text-white">
                S
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#FF4F00] text-[10px] font-bold text-white">
                Z
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#FF6363] text-[10px] font-bold text-white">
                R
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="col-span-6 mt-2">
        <a
          href="#"
          className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-gray-50"
        >
          <div className="w-full">
            <h3 className="text-sm font-semibold text-gray-900">Dub API</h3>
            <p className="mt-1 mb-3 text-sm text-gray-500">
              Unlock further capabilities.
            </p>
            <div className="w-full rounded-lg bg-gray-900 p-3">
              <div className="font-mono text-[10px] text-gray-300">
                <span className="text-blue-400">import</span> {"{"} Dub {"}"}{" "}
                <span className="text-blue-400">from</span>{" "}
                <span className="text-green-400">&quot;dub&quot;</span>;
                <br />
                <span className="text-blue-400">const</span> dub ={" "}
                <span className="text-blue-400">new</span> Dub();
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
