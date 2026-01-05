import { Star } from "lucide-react";
import React from "react";

export default function CTABanner() {
  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a] pt-32 pb-24 text-white">
      {/* Curved Top Decoration */}
      <div className="absolute top-0 left-0 z-10 h-[100px] w-full overflow-hidden">
        {/* This path draws a white shape at the top that curves down into the black */}
        <div className="absolute -top-[60px] left-1/2 h-[120px] w-[120%] -translate-x-1/2 rounded-[50%] bg-white"></div>
      </div>

      <div className="relative z-20 mx-auto mt-12 max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          Transform your business <br /> with modern technology
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed font-light text-gray-400">
          See why Desishub is the technology partner of choice for innovative
          businesses across East Africa.
        </p>

        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="w-full rounded-full bg-white px-8 py-3 text-base font-medium text-black transition-colors hover:bg-gray-100 sm:w-auto">
            Start your project
          </button>
          <button className="w-full rounded-full border border-[#404040] bg-[#262626] px-8 py-3 text-base font-medium text-white transition-colors hover:bg-[#333] sm:w-auto">
            Book consultation
          </button>
        </div>

        {/* Social Proof Badges */}
        <div className="flex flex-wrap justify-center gap-8 opacity-90 md:gap-12">
          {/* Projects Badge */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
              D
            </div>
            <div className="flex flex-col items-start">
              <div className="flex text-blue-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={10} fill="currentColor" />
                ))}
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                150+ Projects
              </span>
            </div>
          </div>

          {/* Students Badge */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
              T
            </div>
            <div className="flex flex-col items-start">
              <div className="flex text-green-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={10} fill="currentColor" />
                ))}
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                400+ Students
              </span>
            </div>
          </div>

          {/* Uptime Badge */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600 text-xs font-bold text-white">
              <Star size={14} fill="white" />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex text-purple-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={10} fill="currentColor" />
                ))}
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                99.9% Uptime
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Grid Pattern for Dark Mode */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:4rem_4rem] opacity-20"></div>
    </div>
  );
}
