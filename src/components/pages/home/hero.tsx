"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BarChart2,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  Code,
  CreditCard,
  Database,
  Filter,
  Gift,
  Globe,
  GraduationCap,
  Layers,
  LayoutGrid,
  Link as LinkIcon,
  Megaphone,
  MoreHorizontal,
  Rocket,
  Search,
  Server,
  Settings,
  Shield,
  ShoppingCart,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState } from "react";

type Tab = "development" | "training" | "devops";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<Tab>("development");

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 selection:bg-gray-200">
      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        <div className="relative z-10 mx-auto mb-12 flex max-w-4xl flex-col items-center space-y-8 text-center">
          {/* Announcement Pill */}
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm transition-all hover:border-gray-300"
          >
            <span className="text-[13px] font-medium text-gray-600">
              Now offering AI Integration & RAG Solutions
            </span>
            <span className="text-gray-300">|</span>
            <span className="inline-flex items-center gap-1 text-[13px] font-medium text-gray-500 group-hover:text-gray-800">
              Learn more <ArrowUpRight size={12} />
            </span>
          </a>

          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-5xl leading-[1.05] font-bold tracking-tight text-gray-900 md:text-[5rem]">
              Turn ideas into digital solutions
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed font-normal text-gray-500 md:text-[1.35rem]">
              Desishub Technologies is your complete technology partner for
              custom software development, AI integration, DevOps optimization,
              and professional IT training programs.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col items-center justify-center gap-3 pt-4 sm:w-auto sm:flex-row">
            <button className="w-full rounded-full bg-black px-8 py-3 text-base font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 sm:w-auto">
              Start your project
            </button>
            <button className="w-full rounded-full border border-gray-200 bg-white px-8 py-3 text-base font-medium text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50 sm:w-auto">
              Book consultation
            </button>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex gap-2 rounded-full bg-transparent p-1">
            <TabButton
              isActive={activeTab === "development"}
              onClick={() => setActiveTab("development")}
              icon={<Code size={16} />}
              label="Custom Software Development"
              colorClass="text-blue-600 bg-blue-100"
            />
            <TabButton
              isActive={activeTab === "training"}
              onClick={() => setActiveTab("training")}
              icon={<GraduationCap size={16} />}
              label="IT Training & Internships"
              colorClass="text-green-600 bg-green-100"
            />
            <TabButton
              isActive={activeTab === "devops"}
              onClick={() => setActiveTab("devops")}
              icon={<Rocket size={16} />}
              label="AI & DevOps Solutions"
              colorClass="text-purple-600 bg-purple-100"
            />
          </div>
        </div>

        {/* Dashboard Preview Container */}
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-xl border border-gray-200 bg-[#F7F7F7] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
          {/* Render Content Based on Tab */}
          <div className="flex min-h-[600px] w-full overflow-hidden md:h-[800px]">
            {activeTab === "development" && <DevelopmentDashboard />}
            {activeTab === "training" && <TrainingDashboard />}
            {activeTab === "devops" && <DevOpsDashboard />}
          </div>

          {/* Floating Banner */}
          <div className="absolute bottom-6 left-1/2 z-20 flex w-[95%] -translate-x-1/2 items-center justify-between rounded-xl bg-[#1A1A1A] p-4 text-white shadow-2xl md:w-[600px]">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-lg bg-white/10 p-2 text-white">
                {activeTab === "development" && <Code size={20} />}
                {activeTab === "training" && <GraduationCap size={20} />}
                {activeTab === "devops" && <Rocket size={20} />}
              </div>
              <div>
                <h4 className="mb-0.5 text-base font-semibold">
                  {activeTab === "development" && "Custom Software Development"}
                  {activeTab === "training" && "IT Training & Internships"}
                  {activeTab === "devops" && "AI & DevOps Solutions"}
                </h4>
                <p className="text-sm leading-snug text-gray-400">
                  {activeTab === "development" &&
                    "Enterprise-grade web systems, e-commerce platforms, and management solutions tailored to your business needs"}
                  {activeTab === "training" &&
                    "Comprehensive programming courses in JavaScript, Go, Laravel and hands-on internship programs for aspiring developers"}
                  {activeTab === "devops" &&
                    "Advanced AI integration with RAG, DevOps automation, and cloud infrastructure optimization"}
                </p>
              </div>
            </div>
            <button className="ml-4 rounded-lg bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-black transition-colors hover:bg-gray-100">
              Learn more
            </button>
          </div>
        </div>
      </main>

      {/* Background Grid Pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:4rem_4rem]"></div>
    </div>
  );
}

// --- Components ---

function TabButton({
  isActive,
  onClick,
  icon,
  label,
  colorClass,
}: {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  colorClass: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "scale-100 bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
          : "text-gray-500 hover:bg-gray-100/50 hover:text-gray-900"
      }`}
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded ${isActive ? colorClass : "bg-transparent text-current"}`}
      >
        {icon}
      </div>
      {label}
    </button>
  );
}

// Development Dashboard
function DevelopmentDashboard() {
  return (
    <div className="flex h-full w-full bg-[#F7F7F7] text-[13px]">
      {/* Sidebar */}
      <div className="flex hidden w-[240px] flex-shrink-0 flex-col border-r border-gray-200/60 bg-[#F9FAFB] p-3 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2 text-lg font-bold">
          Desishub
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto">
          {/* Group 1 */}
          <div>
            <div className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              Projects
            </div>
            <nav className="space-y-0.5">
              <SidebarItem
                label="Active Projects"
                active
                icon={<LayoutGrid size={15} />}
              />
              <SidebarItem
                label="Completed"
                icon={<CheckCircle2 size={15} />}
              />
            </nav>
          </div>

          {/* Group 2 */}
          <div>
            <div className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              Solutions
            </div>
            <nav className="space-y-0.5">
              <SidebarItem
                label="E-commerce"
                icon={<ShoppingCart size={15} />}
              />
              <SidebarItem
                label="Management Systems"
                icon={<Database size={15} />}
              />
              <SidebarItem
                label="Web Applications"
                icon={<Globe size={15} />}
              />
              <SidebarItem label="Custom Solutions" icon={<Code size={15} />} />
            </nav>
          </div>

          {/* Group 3 */}
          <div>
            <div className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              Resources
            </div>
            <nav className="space-y-0.5">
              <SidebarItem label="Tech Stack" icon={<Layers size={15} />} />
              <SidebarItem
                label="Case Studies"
                icon={<BarChart2 size={15} />}
              />
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="m-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {/* Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6">
          <h2 className="text-base font-semibold text-gray-900">
            Active Projects
          </h2>
          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50">
            New Project
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-white p-6">
          {/* Stats Cards */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="flex h-24 flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <span className="text-xs font-medium text-gray-500">
                Active Projects
              </span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-gray-900">24</span>
                <TrendingUp size={20} className="text-blue-500" />
              </div>
            </div>
            <div className="flex h-24 flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <span className="text-xs font-medium text-gray-500">
                Completed
              </span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-gray-900">
                  156
                </span>
                <CheckCircle2 size={20} className="text-green-500" />
              </div>
            </div>
            <div className="flex h-24 flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <span className="text-xs font-medium text-gray-500">
                Technologies
              </span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-gray-900">
                  15+
                </span>
                <Code size={20} className="text-purple-500" />
              </div>
            </div>
          </div>

          {/* Project Categories */}
          <div className="mb-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Our Solutions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <ProjectCard
                icon={<ShoppingCart size={18} />}
                title="E-commerce Platforms"
                description="Full-featured online stores with payment gateways"
                color="bg-blue-100 text-blue-600"
              />
              <ProjectCard
                icon={<Database size={18} />}
                title="Management Systems"
                description="Schools, loans, inventory & POS solutions"
                color="bg-green-100 text-green-600"
              />
              <ProjectCard
                icon={<Globe size={18} />}
                title="Web Applications"
                description="Custom web apps built with modern frameworks"
                color="bg-purple-100 text-purple-600"
              />
              <ProjectCard
                icon={<CreditCard size={18} />}
                title="Payment Integration"
                description="Secure payment gateway implementations"
                color="bg-orange-100 text-orange-600"
              />
            </div>
          </div>

          {/* Recent Projects Table */}
          <div className="mb-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Recent Projects
            </h3>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left">
              <thead className="border-b border-gray-100 bg-gray-50/80">
                <tr>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Project
                  </th>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Type
                  </th>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Tech Stack
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-gray-500">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <DevelopmentTableRow
                  project="SafariCom Payment Portal"
                  type="E-commerce"
                  status="In Progress"
                  techStack="React, Laravel, MySQL"
                  progress="75%"
                  statusColor="bg-yellow-50 border-yellow-100 text-yellow-700"
                />
                <DevelopmentTableRow
                  project="University LMS"
                  type="Management System"
                  status="Testing"
                  techStack="Next.js, Go, PostgreSQL"
                  progress="90%"
                  statusColor="bg-blue-50 border-blue-100 text-blue-700"
                />
                <DevelopmentTableRow
                  project="Retail POS System"
                  type="Point of Sale"
                  status="In Progress"
                  techStack="Vue.js, Laravel, Redis"
                  progress="60%"
                  statusColor="bg-yellow-50 border-yellow-100 text-yellow-700"
                />
                <DevelopmentTableRow
                  project="Loan Management Portal"
                  type="Financial System"
                  status="Completed"
                  techStack="React, Node.js, MongoDB"
                  progress="100%"
                  statusColor="bg-green-50 border-green-100 text-green-700"
                />
                <DevelopmentTableRow
                  project="School Portal"
                  type="Management System"
                  status="In Progress"
                  techStack="Angular, Laravel, MySQL"
                  progress="45%"
                  statusColor="bg-yellow-50 border-yellow-100 text-yellow-700"
                />
              </tbody>
            </table>
          </div>
          <div className="h-20"></div>
        </div>
      </div>
    </div>
  );
}

// Training Dashboard
function TrainingDashboard() {
  return (
    <div className="flex h-full w-full bg-[#F7F7F7] text-[13px]">
      {/* Sidebar */}
      <div className="flex hidden w-[240px] flex-shrink-0 flex-col border-r border-gray-200/60 bg-[#F9FAFB] p-3 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2 text-lg font-bold">
          Desishub
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto">
          <div>
            <div className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              Programs
            </div>
            <nav className="space-y-0.5">
              <SidebarItem
                label="All Courses"
                active
                icon={<BookOpen size={15} />}
              />
              <SidebarItem label="Internships" icon={<Award size={15} />} />
            </nav>
          </div>

          <div>
            <div className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              Technologies
            </div>
            <nav className="space-y-0.5">
              <SidebarItem label="JavaScript" icon={<Code size={15} />} />
              <SidebarItem label="Go (Golang)" icon={<Terminal size={15} />} />
              <SidebarItem label="Laravel" icon={<Layers size={15} />} />
              <SidebarItem label="Frontend Dev" icon={<Globe size={15} />} />
              <SidebarItem label="Backend Dev" icon={<Server size={15} />} />
            </nav>
          </div>

          <div>
            <div className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              Students
            </div>
            <nav className="space-y-0.5">
              <SidebarItem label="Active Students" icon={<Users size={15} />} />
              <SidebarItem
                label="Graduates"
                icon={<GraduationCap size={15} />}
              />
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="m-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6">
          <h2 className="text-base font-semibold text-gray-900">
            Training Programs
          </h2>
          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50">
            Enroll Now
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white p-6">
          {/* Stats */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="flex h-24 flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <span className="text-xs font-medium text-gray-500">
                Active Students
              </span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-gray-900">
                  143
                </span>
                <Users size={20} className="text-blue-500" />
              </div>
            </div>
            <div className="flex h-24 flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <span className="text-xs font-medium text-gray-500">
                Graduates
              </span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-gray-900">
                  387
                </span>
                <GraduationCap size={20} className="text-green-500" />
              </div>
            </div>
            <div className="flex h-24 flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <span className="text-xs font-medium text-gray-500">Courses</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-gray-900">12</span>
                <BookOpen size={20} className="text-purple-500" />
              </div>
            </div>
          </div>

          {/* Course Cards */}
          <div className="mb-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Available Courses
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <CourseCard
                icon={<Code size={18} />}
                title="JavaScript Mastery"
                description="Frontend & Backend with React, Node.js"
                students="48 students"
                color="bg-yellow-100 text-yellow-600"
              />
              <CourseCard
                icon={<Terminal size={18} />}
                title="Go Programming"
                description="Build scalable backend systems"
                students="32 students"
                color="bg-blue-100 text-blue-600"
              />
              <CourseCard
                icon={<Layers size={18} />}
                title="Laravel Development"
                description="PHP framework for web applications"
                students="56 students"
                color="bg-red-100 text-red-600"
              />
              <CourseCard
                icon={<Award size={18} />}
                title="Internship Program"
                description="Hands-on experience with real projects"
                students="24 interns"
                color="bg-green-100 text-green-600"
              />
            </div>
          </div>

          {/* Students Table */}
          <div className="mb-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Recent Enrollments
            </h3>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left">
              <thead className="border-b border-gray-100 bg-gray-50/80">
                <tr>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Student
                  </th>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Course
                  </th>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Type
                  </th>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Enrolled
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-gray-500">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <TrainingTableRow
                  student="Alex Kimani"
                  course="JavaScript Mastery"
                  type="Full Course"
                  enrolled="Dec 15, 2024"
                  progress="28%"
                  avatarColor="bg-blue-100 text-blue-600"
                />
                <TrainingTableRow
                  student="Sarah Wanjiku"
                  course="Laravel Development"
                  type="Full Course"
                  enrolled="Dec 12, 2024"
                  progress="45%"
                  avatarColor="bg-purple-100 text-purple-600"
                />
                <TrainingTableRow
                  student="David Omondi"
                  course="Go Programming"
                  type="Full Course"
                  enrolled="Dec 10, 2024"
                  progress="62%"
                  avatarColor="bg-green-100 text-green-600"
                />
                <TrainingTableRow
                  student="Grace Mutua"
                  course="Internship Program"
                  type="Internship"
                  enrolled="Dec 8, 2024"
                  progress="15%"
                  avatarColor="bg-orange-100 text-orange-600"
                />
                <TrainingTableRow
                  student="Brian Otieno"
                  course="JavaScript Mastery"
                  type="Full Course"
                  enrolled="Dec 5, 2024"
                  progress="71%"
                  avatarColor="bg-teal-100 text-teal-600"
                />
              </tbody>
            </table>
          </div>
          <div className="h-20"></div>
        </div>
      </div>
    </div>
  );
}

// DevOps Dashboard
function DevOpsDashboard() {
  return (
    <div className="flex h-full w-full bg-[#F7F7F7] text-[13px]">
      {/* Sidebar */}
      <div className="flex hidden w-[240px] flex-shrink-0 flex-col border-r border-gray-200/60 bg-[#F9FAFB] p-3 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2 text-lg font-bold">
          Desishub
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto">
          <div>
            <div className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              Services
            </div>
            <nav className="space-y-0.5">
              <SidebarItem
                label="AI Integration"
                active
                icon={<Brain size={15} />}
              />
              <SidebarItem label="DevOps" icon={<Server size={15} />} />
            </nav>
          </div>

          <div>
            <div className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              AI Solutions
            </div>
            <nav className="space-y-0.5">
              <SidebarItem label="RAG Systems" icon={<Sparkles size={15} />} />
              <SidebarItem label="LLM Integration" icon={<Brain size={15} />} />
              <SidebarItem label="Custom AI" icon={<Code size={15} />} />
            </nav>
          </div>

          <div>
            <div className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              Infrastructure
            </div>
            <nav className="space-y-0.5">
              <SidebarItem label="Cloud Setup" icon={<Globe size={15} />} />
              <SidebarItem label="CI/CD Pipeline" icon={<Rocket size={15} />} />
              <SidebarItem label="Monitoring" icon={<BarChart2 size={15} />} />
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="m-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6">
          <h2 className="text-base font-semibold text-gray-900">
            AI & DevOps Solutions
          </h2>
          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50">
            Request Quote
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white p-6">
          {/* Stats */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="flex h-24 flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <span className="text-xs font-medium text-gray-500">
                AI Integrations
              </span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-gray-900">38</span>
                <Brain size={20} className="text-purple-500" />
              </div>
            </div>
            <div className="flex h-24 flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <span className="text-xs font-medium text-gray-500">
                DevOps Projects
              </span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-gray-900">52</span>
                <Server size={20} className="text-blue-500" />
              </div>
            </div>
            <div className="flex h-24 flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <span className="text-xs font-medium text-gray-500">Uptime</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-gray-900">
                  99.9%
                </span>
                <CheckCircle2 size={20} className="text-green-500" />
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="mb-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Our Services
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <ServiceCard
                icon={<Brain size={18} />}
                title="RAG Implementation"
                description="Retrieval-Augmented Generation systems"
                color="bg-purple-100 text-purple-600"
              />
              <ServiceCard
                icon={<Sparkles size={18} />}
                title="AI Integration"
                description="LLM APIs, chatbots, and automation"
                color="bg-pink-100 text-pink-600"
              />
              <ServiceCard
                icon={<Server size={18} />}
                title="DevOps Setup"
                description="CI/CD, containerization, orchestration"
                color="bg-blue-100 text-blue-600"
              />
              <ServiceCard
                icon={<Rocket size={18} />}
                title="Cloud Infrastructure"
                description="AWS, Azure, GCP deployment & scaling"
                color="bg-orange-100 text-orange-600"
              />
            </div>
          </div>

          {/* Projects Table */}
          <div className="mb-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Recent Implementations
            </h3>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left">
              <thead className="border-b border-gray-100 bg-gray-50/80">
                <tr>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Project
                  </th>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Service
                  </th>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-2.5 font-medium text-gray-500">
                    Platform
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-gray-500">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <DevOpsTableRow
                  project="Customer Support AI"
                  service="RAG System"
                  status="Live"
                  platform="OpenAI + Pinecone"
                  progress="100%"
                  statusColor="bg-green-50 border-green-100 text-green-700"
                />
                <DevOpsTableRow
                  project="E-commerce Pipeline"
                  service="CI/CD Setup"
                  status="Active"
                  platform="GitHub Actions + AWS"
                  progress="100%"
                  statusColor="bg-green-50 border-green-100 text-green-700"
                />
                <DevOpsTableRow
                  project="Document Analyzer"
                  service="AI Integration"
                  status="Testing"
                  platform="Claude API + RAG"
                  progress="85%"
                  statusColor="bg-blue-50 border-blue-100 text-blue-700"
                />
                <DevOpsTableRow
                  project="Multi-tenant SaaS"
                  service="DevOps"
                  status="In Progress"
                  platform="Kubernetes + GCP"
                  progress="70%"
                  statusColor="bg-yellow-50 border-yellow-100 text-yellow-700"
                />
                <DevOpsTableRow
                  project="Chatbot Platform"
                  service="AI Integration"
                  status="In Progress"
                  platform="GPT-4 + Vector DB"
                  progress="55%"
                  statusColor="bg-yellow-50 border-yellow-100 text-yellow-700"
                />
              </tbody>
            </table>
          </div>
          <div className="h-20"></div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
function SidebarItem({
  label,
  active = false,
  badge,
  icon,
}: {
  label: string;
  active?: boolean;
  badge?: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`group flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 transition-colors ${active ? "bg-gray-200/50 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}`}
    >
      <div className="flex items-center gap-2">
        <span
          className={
            active ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
          }
        >
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </div>
      {badge && (
        <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">
          {badge}
        </span>
      )}
    </div>
  );
}

function ProjectCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
      <div className={`mb-3 inline-flex rounded-lg p-2 ${color}`}>{icon}</div>
      <h4 className="mb-1 text-sm font-semibold text-gray-900">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

function CourseCard({
  icon,
  title,
  description,
  students,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  students: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
      <div className={`mb-3 inline-flex rounded-lg p-2 ${color}`}>{icon}</div>
      <h4 className="mb-1 text-sm font-semibold text-gray-900">{title}</h4>
      <p className="mb-2 text-xs text-gray-500">{description}</p>
      <span className="text-xs font-medium text-gray-400">{students}</span>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
      <div className={`mb-3 inline-flex rounded-lg p-2 ${color}`}>{icon}</div>
      <h4 className="mb-1 text-sm font-semibold text-gray-900">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

function DevelopmentTableRow({
  project,
  type,
  status,
  techStack,
  progress,
  statusColor,
}: {
  project: string;
  type: string;
  status: string;
  techStack: string;
  progress: string;
  statusColor: string;
}) {
  return (
    <tr className="transition-colors hover:bg-gray-50/50">
      <td className="px-4 py-2.5 font-medium text-gray-700">{project}</td>
      <td className="px-4 py-2.5 text-gray-500">{type}</td>
      <td className="px-4 py-2.5">
        <div
          className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-medium ${statusColor}`}
        >
          {status}
        </div>
      </td>
      <td className="px-4 py-2.5 text-gray-500">{techStack}</td>
      <td className="px-4 py-2.5 text-right font-medium text-gray-600">
        {progress}
      </td>
    </tr>
  );
}

function TrainingTableRow({
  student,
  course,
  type,
  enrolled,
  progress,
  avatarColor,
}: {
  student: string;
  course: string;
  type: string;
  enrolled: string;
  progress: string;
  avatarColor: string;
}) {
  return (
    <tr className="transition-colors hover:bg-gray-50/50">
      <td className="px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ${avatarColor}`}
          >
            {student.charAt(0)}
          </div>
          <span className="font-medium text-gray-700">{student}</span>
        </div>
      </td>
      <td className="px-4 py-2.5 text-gray-500">{course}</td>
      <td className="px-4 py-2.5 text-gray-500">{type}</td>
      <td className="px-4 py-2.5 text-gray-500">{enrolled}</td>
      <td className="px-4 py-2.5 text-right font-medium text-gray-600">
        {progress}
      </td>
    </tr>
  );
}

function DevOpsTableRow({
  project,
  service,
  status,
  platform,
  progress,
  statusColor,
}: {
  project: string;
  service: string;
  status: string;
  platform: string;
  progress: string;
  statusColor: string;
}) {
  return (
    <tr className="transition-colors hover:bg-gray-50/50">
      <td className="px-4 py-2.5 font-medium text-gray-700">{project}</td>
      <td className="px-4 py-2.5 text-gray-500">{service}</td>
      <td className="px-4 py-2.5">
        <div
          className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-medium ${statusColor}`}
        >
          {status}
        </div>
      </td>
      <td className="px-4 py-2.5 text-gray-500">{platform}</td>
      <td className="px-4 py-2.5 text-right font-medium text-gray-600">
        {progress}
      </td>
    </tr>
  );
}
