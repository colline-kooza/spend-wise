"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Globe,
  GraduationCap,
  Layers,
  Lock,
  Menu,
  Package,
  Rocket,
  Server,
  Shield,
  ShoppingCart,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";

// --- Components ---

const Button = ({
  children,
  variant = "primary",
  className = "",
  icon: Icon,
  ...props
}: any) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-800 border border-transparent focus:ring-black",
    secondary:
      "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-200",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    link: "text-gray-600 hover:text-black p-0 h-auto",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant as keyof typeof variants] || variants.primary} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="ml-2 h-4 w-4" />}
    </button>
  );
};

const Badge = ({ children }: any) => (
  <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-800 shadow-sm">
    <span className="relative mr-1.5 flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
    </span>
    {children}
  </span>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "glass border-b border-gray-200/50" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-xl font-bold text-white">
                D
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Desishub
              </span>
            </a>
            <div className="hidden gap-6 md:flex">
              {["Services", "Solutions", "Training", "About"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" className="text-gray-600">
              Contact Us
            </Button>
            <Button>Get Started</Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="animate-fade-in absolute w-full space-y-4 border-b border-gray-200 bg-white p-4 shadow-lg md:hidden">
          {["Services", "Solutions", "Training", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="block py-2 text-sm font-medium text-gray-600"
            >
              {item}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Button variant="secondary" className="w-full justify-center">
              Contact Us
            </Button>
            <Button className="w-full justify-center">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  children,
  className = "",
  tags = [],
}: any) => (
  <div
    className={`group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 transition-all hover:border-gray-300 hover:shadow-xl ${className}`}
  >
    <div className="flex h-full flex-col justify-between">
      <div className="mb-6">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 transition-all group-hover:scale-110 group-hover:border-gray-300">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
        {children}
      </div>
    </div>
  </div>
);

const EcommercePreview = () => (
  <div className="h-full w-full overflow-hidden bg-white p-4">
    <div className="space-y-3">
      {/* Product Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-gray-200 bg-white p-2">
          <div className="mb-2 h-20 rounded bg-gradient-to-br from-blue-100 to-blue-200"></div>
          <div className="h-2 w-16 rounded bg-gray-200"></div>
          <div className="mt-1 h-2 w-12 rounded bg-gray-300"></div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-2">
          <div className="mb-2 h-20 rounded bg-gradient-to-br from-purple-100 to-purple-200"></div>
          <div className="h-2 w-16 rounded bg-gray-200"></div>
          <div className="mt-1 h-2 w-12 rounded bg-gray-300"></div>
        </div>
      </div>
      {/* Payment Icons */}
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2">
        <Lock size={12} className="text-green-600" />
        <div className="h-2 flex-1 rounded bg-gray-200"></div>
        <ShoppingCart size={12} className="text-gray-400" />
      </div>
    </div>
  </div>
);

const ManagementSystemPreview = () => (
  <div className="h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-xs">
    <div className="space-y-2">
      {/* Dashboard Header */}
      <div className="flex items-center gap-2 rounded-md border border-gray-700 bg-gray-800/50 p-2">
        <div className="h-2 w-2 rounded-full bg-green-400"></div>
        <div className="h-2 flex-1 rounded bg-gray-700"></div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-md border border-gray-700 bg-gray-800/50 p-2"
          >
            <div className="mb-1 h-2 w-8 rounded bg-gray-700"></div>
            <div className="h-3 w-12 rounded bg-gray-600"></div>
          </div>
        ))}
      </div>
      {/* Table Rows */}
      <div className="space-y-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-md border border-gray-700 bg-gray-800/30 p-2"
          >
            <div className="h-2 flex-1 rounded bg-gray-700"></div>
            <div className="h-2 w-8 rounded bg-gray-600"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TrainingPortal = () => (
  <div className="h-full w-full overflow-hidden bg-white p-4">
    <div className="space-y-3">
      {/* Course Progress */}
      <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50 p-3">
        <div className="mb-2 flex items-center gap-2">
          <BookOpen size={14} className="text-green-600" />
          <div className="h-2 w-20 rounded bg-green-200"></div>
        </div>
        <div className="h-2 w-full rounded-full bg-green-100">
          <div className="h-2 w-3/4 rounded-full bg-green-500"></div>
        </div>
      </div>
      {/* Student Cards */}
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-2"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
            <div className="flex-1 space-y-1">
              <div className="h-2 w-20 rounded bg-gray-200"></div>
              <div className="h-1.5 w-16 rounded bg-gray-100"></div>
            </div>
            <GraduationCap size={14} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AIIntegrationPreview = () => (
  <div className="h-full w-full overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4 font-mono text-xs text-purple-100">
    <div className="space-y-2">
      {/* AI Response Bubbles */}
      <div className="flex items-start gap-2">
        <Brain size={14} className="mt-1 text-purple-300" />
        <div className="flex-1 space-y-1">
          <div className="h-2 w-full rounded bg-purple-700/50"></div>
          <div className="h-2 w-3/4 rounded bg-purple-700/50"></div>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Sparkles size={14} className="mt-1 text-purple-300" />
        <div className="flex-1 space-y-1">
          <div className="h-2 w-full rounded bg-purple-700/50"></div>
          <div className="h-2 w-2/3 rounded bg-purple-700/50"></div>
        </div>
      </div>
      {/* Vector DB Visualization */}
      <div className="mt-3 rounded-lg border border-purple-700/50 bg-purple-800/30 p-2">
        <div className="mb-2 flex items-center gap-1">
          <Database size={10} className="text-purple-300" />
          <div className="h-1.5 w-16 rounded bg-purple-700/50"></div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-4 rounded bg-purple-700/30"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DevOpsInfra = () => (
  <div className="h-full w-full overflow-hidden bg-gray-950 p-4 font-mono text-xs">
    <div className="space-y-2">
      {/* Pipeline Stages */}
      <div className="flex items-center justify-between">
        {["Build", "Test", "Deploy"].map((stage, i) => (
          <React.Fragment key={stage}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full ${i < 2 ? "bg-green-500" : "bg-blue-500"} text-white`}
              >
                <Check size={12} />
              </div>
              <span className="text-[9px] text-gray-500">{stage}</span>
            </div>
            {i < 2 && <ChevronRight size={12} className="text-gray-700" />}
          </React.Fragment>
        ))}
      </div>
      {/* Container Status */}
      <div className="mt-3 space-y-1.5">
        {[
          { name: "api-prod", status: "running", color: "green" },
          { name: "worker-1", status: "running", color: "green" },
          { name: "db-backup", status: "pending", color: "yellow" },
        ].map((container) => (
          <div
            key={container.name}
            className="flex items-center gap-2 rounded border border-gray-800 bg-gray-900/50 p-1.5"
          >
            <Server size={10} className="text-gray-500" />
            <div className="h-1.5 flex-1 rounded bg-gray-800"></div>
            <div
              className={`h-1.5 w-1.5 rounded-full bg-${container.color}-500`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CodeEditor = () => (
  <div className="h-full w-full overflow-hidden bg-gray-950 p-4 font-mono text-xs text-gray-400">
    <div className="mb-3 flex gap-1.5">
      <div className="h-2.5 w-2.5 rounded-full bg-red-500/20"></div>
      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20"></div>
      <div className="h-2.5 w-2.5 rounded-full bg-green-500/20"></div>
    </div>
    <p>
      <span className="text-purple-400">const</span>{" "}
      <span className="text-blue-400">checkout</span> ={" "}
      <span className="text-purple-400">async</span> () ={">"} {"{"}
    </p>
    <p className="pl-4">
      <span className="text-purple-400">const</span> payment ={" "}
      <span className="text-purple-400">await</span>
    </p>
    <p className="pl-8">
      mpesa.<span className="text-yellow-400">stkPush</span>({"{"}
    </p>
    <p className="pl-12">
      amount: <span className="text-orange-400">1000</span>,
    </p>
    <p className="pl-12">
      phone: <span className="text-green-400">&apos;254700000000&apos;</span>
    </p>
    <p className="pl-8">{"}"})</p>
    <p className="pl-4">
      <span className="text-purple-400">return</span> payment
    </p>
    <p>{"}"}</p>
  </div>
);

const Hero = () => (
  <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
    {/* Grid Background */}
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <div className="absolute top-0 right-0 left-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>

    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <div className="animate-fade-in flex flex-col items-center">
        <Badge>Trusted by 150+ businesses across East Africa</Badge>

        <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          Complete Technology <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Solutions Partner
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          From custom software development to AI integration and professional
          training. We build, teach, and optimize technology solutions that
          drive your business forward.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            className="h-12 px-8 text-base shadow-xl shadow-gray-200/50"
            icon={ArrowRight}
          >
            Start Your Project
          </Button>
          <Button
            variant="secondary"
            className="h-12 px-8 text-base"
            icon={Users}
          >
            Book Consultation
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          Empowering businesses with enterprise-grade solutions
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs font-medium text-gray-400">
          <div className="flex items-center gap-1.5">
            <Check size={14} className="text-green-500" />
            <span>150+ Projects Delivered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check size={14} className="text-green-500" />
            <span>400+ Students Trained</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check size={14} className="text-green-500" />
            <span>15+ Technologies</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function ServicesSection() {
  return (
    <section id="services" className="bg-gray-50/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-base font-semibold tracking-wide text-black uppercase">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            End-to-end technology solutions for modern businesses
          </p>
          <p className="mt-4 text-gray-600">
            From ideation to deployment, we provide comprehensive services that
            cover every aspect of your digital transformation journey.
          </p>
        </div>

        <div className="grid auto-rows-[420px] grid-cols-1 gap-6 md:grid-cols-3">
          {/* E-commerce Solutions */}
          <FeatureCard
            title="E-commerce Platforms"
            description="Full-featured online stores with integrated payment gateways (M-Pesa, Stripe, PayPal), inventory management, order tracking, and multi-vendor support. Built for scale with responsive design and SEO optimization."
            icon={ShoppingCart}
            className="md:col-span-2"
            tags={["Payment Integration", "Multi-vendor", "Mobile-first"]}
          >
            <EcommercePreview />
          </FeatureCard>

          {/* Management Systems */}
          <FeatureCard
            title="Management Systems"
            description="Custom school management, loan tracking, inventory control, and HR systems. Real-time dashboards, automated reporting, and role-based access control."
            icon={Database}
            tags={["Real-time", "Custom workflows"]}
          >
            <ManagementSystemPreview />
          </FeatureCard>

          {/* IT Training Programs */}
          <FeatureCard
            title="IT Training & Bootcamps"
            description="Comprehensive programming courses in JavaScript, Go, Laravel, React, and Node.js. Hands-on curriculum with real-world projects, mentorship, and job placement support."
            icon={GraduationCap}
            tags={["Frontend", "Backend", "Full-stack"]}
          >
            <TrainingPortal />
          </FeatureCard>

          {/* AI Integration */}
          <FeatureCard
            title="AI Integration & RAG"
            description="Retrieval-Augmented Generation systems, custom chatbots, document analysis, and intelligent automation. Integration with OpenAI, Claude, and open-source LLMs."
            icon={Brain}
            className="md:col-span-2"
            tags={["RAG", "LLMs", "Vector DBs", "Automation"]}
          >
            <AIIntegrationPreview />
          </FeatureCard>

          {/* Point of Sale */}
          <FeatureCard
            title="Point of Sale Systems"
            description="Modern POS solutions with offline support, receipt printing, inventory sync, and sales analytics. Perfect for retail and hospitality businesses."
            icon={Package}
            tags={["Offline-first", "Analytics"]}
          >
            <div className="h-full w-full overflow-hidden bg-white p-4">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-2"
                    >
                      <div className="mb-1 h-8 rounded bg-gray-200"></div>
                      <div className="h-1.5 w-12 rounded bg-gray-300"></div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-gray-200 bg-black p-3 text-white">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs">Total:</span>
                    <span className="text-lg font-bold">KES 4,850</span>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* DevOps & Cloud */}
          <FeatureCard
            title="DevOps & Cloud Infrastructure"
            description="CI/CD pipelines, containerization with Docker & Kubernetes, cloud deployment (AWS, GCP, Azure), monitoring, and automated scaling. 99.9% uptime guaranteed."
            icon={Server}
            className="md:col-span-2"
            tags={["CI/CD", "Kubernetes", "AWS", "Monitoring"]}
          >
            <DevOpsInfra />
          </FeatureCard>

          {/* Internship Program */}
          <FeatureCard
            title="Internship Programs"
            description="3-6 month hands-on internship for university students. Work on real client projects, learn industry best practices, and build your portfolio with mentorship from senior developers."
            icon={Users}
            tags={["Real projects", "Mentorship", "Portfolio"]}
          >
            <div className="h-full w-full overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
              <div className="space-y-3">
                <div className="rounded-lg border border-indigo-200 bg-white p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Terminal size={14} className="text-indigo-600" />
                    <div className="h-2 w-24 rounded bg-indigo-100"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-full rounded bg-gray-200"></div>
                    <div className="h-1.5 w-3/4 rounded bg-gray-200"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-purple-200 bg-white p-2">
                    <Code2 size={12} className="mb-1 text-purple-600" />
                    <div className="h-1.5 w-16 rounded bg-purple-100"></div>
                  </div>
                  <div className="rounded-lg border border-purple-200 bg-white p-2">
                    <Workflow size={12} className="mb-1 text-purple-600" />
                    <div className="h-1.5 w-16 rounded bg-purple-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Custom Web Development */}
          <FeatureCard
            title="Custom Web Applications"
            description="Tailored web solutions built with modern frameworks: React, Next.js, Vue, Angular, Laravel, Node.js, and Go. API development, database design, and third-party integrations."
            icon={Code2}
            tags={["React", "Laravel", "Go", "APIs"]}
          >
            <CodeEditor />
          </FeatureCard>

          {/* Consulting Services */}
          <FeatureCard
            title="IT Consulting & Strategy"
            description="Technology roadmap planning, architecture design, code reviews, performance optimization, and digital transformation consulting. Get expert guidance for your tech decisions."
            icon={TrendingUp}
            className="md:col-span-2"
            tags={["Architecture", "Strategy", "Optimization"]}
          >
            <div className="h-full w-full overflow-hidden bg-white p-4">
              <div className="space-y-3">
                {/* Roadmap Timeline */}
                <div className="relative space-y-4">
                  {[
                    {
                      phase: "Discovery",
                      status: "complete",
                      color: "green",
                    },
                    { phase: "Planning", status: "complete", color: "green" },
                    { phase: "Development", status: "active", color: "blue" },
                    { phase: "Deployment", status: "pending", color: "gray" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                          item.status === "complete"
                            ? "border-green-500 bg-green-50"
                            : item.status === "active"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 bg-gray-50"
                        }`}
                      >
                        {item.status === "complete" && (
                          <Check size={14} className="text-green-600" />
                        )}
                        {item.status === "active" && (
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`h-2 w-24 rounded ${
                            item.status === "complete"
                              ? "bg-green-200"
                              : item.status === "active"
                                ? "bg-blue-200"
                                : "bg-gray-200"
                          }`}
                        ></div>
                        <div className="mt-1 text-xs text-gray-500">
                          {item.phase}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FeatureCard>
        </div>

        {/* CTA Section */}
        <div className="mt-20 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-800 p-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Ready to transform your business with technology?
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Let&apos;s discuss your project requirements and create a custom
            solution that fits your needs and budget. From MVP to
            enterprise-scale applications, we&apos;ve got you covered.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="h-12">Schedule Free Consultation</Button>
            <Button variant="secondary" className="h-12 px-8">
              View Portfolio
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span>✓ Free project assessment</span>
            <span>✓ Flexible payment plans</span>
            <span>✓ 6 months support included</span>
          </div>
        </div>
      </div>
    </section>
  );
}
