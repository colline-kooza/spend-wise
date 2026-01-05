import { ArrowUpRight, Mic, Share2, Users } from "lucide-react";
import React from "react";

const useCases = [
  {
    title: "Marketing Attribution",
    description: "Easily track and measure marketing impact",
    icon: <Share2 size={20} />,
    href: "#",
  },
  {
    title: "Content Creators",
    description: "Intelligent audience insights and link tracking",
    icon: <Mic size={20} />,
    href: "#",
  },
  {
    title: "Affiliate Management",
    description: "Manage affiliates and automate payouts",
    icon: <Users size={20} />,
    href: "#",
  },
];

const sdks = [
  { name: "TypeScript", icon: "TS" },
  { name: "Python", icon: "Py" },
  { name: "Go", icon: "Go" },
  { name: "Ruby", icon: "Rb" },
  { name: "PHP", icon: "php" },
];

export default function SolutionsMenu() {
  return (
    <div className="flex w-full">
      {/* Left Section - Use Cases */}
      <div className="flex-1 border-r border-gray-100 pr-8">
        <h4 className="mb-4 pl-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Use Case
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {useCases.map((useCase) => (
            <a
              key={useCase.title}
              href={useCase.href}
              className="group flex h-48 flex-col justify-between rounded-lg p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-600 shadow-sm transition-transform group-hover:scale-105">
                {useCase.icon}
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900">
                  {useCase.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-500">
                  {useCase.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Right Section - SDKs */}
      <div className="w-64 pl-8">
        <h4 className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          SDKs
        </h4>
        <div className="space-y-1">
          {sdks.map((sdk) => (
            <a
              key={sdk.name}
              href="#"
              className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-600 transition-all group-hover:bg-white group-hover:shadow-sm">
                {sdk.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-black">
                {sdk.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
