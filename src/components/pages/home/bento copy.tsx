"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Code2,
  Globe,
  Layers,
  Menu,
  Shield,
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
              {["Features", "Customers", "Pricing", "Enterprise"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" className="text-gray-600">
              Log in
            </Button>
            <Button>Sign up</Button>
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
          {["Features", "Customers", "Pricing", "Enterprise"].map((item) => (
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
              Log in
            </Button>
            <Button className="w-full justify-center">Sign up</Button>
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
}: any) => (
  <div
    className={`group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 transition-all hover:border-gray-300 hover:shadow-lg ${className}`}
  >
    <div className="flex h-full flex-col justify-between">
      <div className="mb-6">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-900 transition-transform group-hover:scale-110">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
        {children}
      </div>
    </div>
  </div>
);

const CodeSnippet = () => (
  <div className="h-full w-full overflow-hidden bg-gray-950 p-4 font-mono text-xs text-gray-400">
    <div className="mb-3 flex gap-1.5">
      <div className="h-2.5 w-2.5 rounded-full bg-red-500/20"></div>
      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20"></div>
      <div className="h-2.5 w-2.5 rounded-full bg-green-500/20"></div>
    </div>
    <p>
      <span className="text-purple-400">import</span> {"{ Desishub }"}{" "}
      <span className="text-purple-400">from</span>{" "}
      <span className="text-green-400">&apos;@desishub/sdk&apos;</span>;
    </p>
    <p className="mt-2">
      <span className="text-blue-400">const</span> client ={" "}
      <span className="text-blue-400">new</span> Desishub(API_KEY);
    </p>
    <p className="mt-2">
      <span className="text-blue-400">await</span> client.design.
      <span className="text-yellow-400">create</span>({"{"}
    </p>
    <p className="pl-4">
      mode: <span className="text-green-400">&apos;adaptive&apos;</span>,
    </p>
    <p className="pl-4">
      theme: <span className="text-green-400">&apos;dark&apos;</span>,
    </p>
    <p>{"}"})</p>
  </div>
);

const Hero = () => (
  <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
    {/* Grid Background */}
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <div className="absolute top-0 right-0 left-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>

    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <div className="animate-fade-in flex flex-col items-center">
        <Badge>New: Desishub AI 2.0 is now available</Badge>

        <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          Infrastructure for <br />
          <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
            Modern Design
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          The all-in-one platform for automated design workflows. Build, scale,
          and deliver pixel-perfect experiences with our powerful API.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            className="h-12 px-8 text-base shadow-xl shadow-gray-200/50"
            icon={ArrowRight}
          >
            Start Building
          </Button>
          <Button
            variant="secondary"
            className="h-12 px-8 text-base"
            icon={Code2}
          >
            View Documentation
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          Trusted by innovative teams worldwide
        </div>
        <div className="mt-6 flex justify-center gap-8 opacity-50 grayscale">
          {/* Logo Placeholders */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-8 w-24 animate-pulse rounded bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default function BentoGrid() {
  return (
    <section id="features" className="bg-gray-50/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-base font-semibold tracking-wide text-black uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to ship faster.
          </p>
          <p className="mt-4 text-gray-600">
            Powerful primitives for the next generation of design tools.
          </p>
        </div>

        <div className="grid auto-rows-[400px] grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1: Large */}
          <FeatureCard
            title="Real-time Analytics"
            description="Track every interaction and optimize your design system usage with granular insights."
            icon={BarChart3}
            className="md:col-span-2"
          >
            <div className="absolute inset-0 flex items-center justify-center p-8">
              {/* Abstract Chart UI */}
              <div className="flex h-48 w-full items-end gap-2 px-4">
                {[40, 70, 45, 90, 60, 80, 50, 95, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-gray-900 to-gray-600 transition-all duration-1000"
                    style={{ height: `${h}%`, opacity: 0.1 + i * 0.1 }}
                  ></div>
                ))}
              </div>
            </div>
          </FeatureCard>

          {/* Card 2: Vertical */}
          <FeatureCard
            title="Global Edge Network"
            description="Deliver assets with <50ms latency worldwide."
            icon={Globe}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-gray-200">
                <div className="absolute h-32 w-32 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-gray-300"></div>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <Globe size={32} />
                </div>
                <div className="absolute top-0 -right-2 h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 3: Vertical */}
          <FeatureCard
            title="Developer First API"
            description="Typed SDKs for React, Node, and Python."
            icon={Code2}
          >
            <CodeSnippet />
          </FeatureCard>

          {/* Card 4: Large */}
          <FeatureCard
            title="Collaborative Workflows"
            description="Built-in commenting, versioning, and approval flows for enterprise teams."
            icon={Layers}
            className="md:col-span-2"
          >
            <div className="absolute inset-x-0 bottom-0 z-10 h-4/5 bg-gradient-to-t from-white to-transparent"></div>
            <div className="space-y-3 p-6">
              <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-600">
                  JD
                </div>
                <div className="h-2 flex-1 rounded bg-gray-100"></div>
                <div className="h-2 w-16 rounded bg-gray-100"></div>
              </div>
              <div className="flex translate-x-4 items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                  AS
                </div>
                <div className="h-2 flex-1 rounded bg-gray-100"></div>
                <div className="h-2 w-16 rounded bg-gray-100"></div>
              </div>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
