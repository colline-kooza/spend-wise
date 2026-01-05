import { Brain, Code, GraduationCap } from "lucide-react";
import Image from "next/image";
import React from "react";

const useCases = [
  {
    title: "Custom Software Development",
    description: "Web, mobile, and desktop applications built with modern tech",
    icon: <Code size={20} />,
    href: "/solutions/custom-software",
  },
  {
    title: "AI & Automation",
    description: "RAG systems, chatbots, and intelligent workflow automation",
    icon: <Brain size={20} />,
    href: "/solutions/ai-automation",
  },
  {
    title: "IT Training & Internships",
    description:
      "Bootcamps in JavaScript, Go, Laravel and professional development",
    icon: <GraduationCap size={20} />,
    href: "/solutions/training",
  },
];

const techStack = [
  { name: "Golang", logo: "/brands/go.svg", description: "Backend" },
  { name: "Bun", logo: "/brands/bun.png", description: "Runtime" },
  { name: "Hono", logo: "/icons/hono.png", description: "Framework" },
  {
    name: "React",
    logo: "/brands/React Native_idNPBI6-rm_1.svg",
    description: "Frontend",
  },
  {
    name: "Next.js",
    logo: "/brands/nextjs-fill.svg",
    description: "Full-stack",
  },
  {
    name: "React Native",
    logo: "/brands/react (1).svg",
    description: "Mobile",
  },
];

export default function SolutionsMenu() {
  return (
    <div className="flex w-full">
      {/* Left Section - Core Services */}
      <div className="flex-1 border-r border-gray-100 pr-8">
        <h4 className="mb-4 pl-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Core Services
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

      {/* Right Section - Tech Stack */}
      <div className="w-64 pl-8">
        <h4 className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Our Tech Stack
        </h4>
        <div className="space-y-1">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="group flex items-center justify-between rounded-lg border border-gray-100 bg-white p-2 transition-all hover:border-gray-200 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-gray-600 transition-all group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    height={300}
                    width={300}
                  />
                  {/* {tech.logo} */}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-black">
                  {tech.name}
                </span>
              </div>
              <span className="text-xs text-gray-400">{tech.description}</span>
            </div>
          ))}
        </div>
        {/* <a
          href="/tech-stack"
          className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all technologies →
        </a> */}
      </div>
    </div>
  );
}
