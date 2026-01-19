"use client";

import {
  BriefcaseMedical as BriefcaseConveyorBelt,
  Feather,
  HandCoins,
  Instagram,
  Linkedin,
  Workflow,
} from "lucide-react";
import Link from "next/link";

const navLinks = [
  {
    label: "Features",
    href: "/features",
    icon: Feather,
  },
  {
    label: "Use cases",
    href: "/use-cases",
    icon: BriefcaseConveyorBelt,
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: HandCoins,
  },
  {
    label: "Integrations",
    href: "/integrations",
    icon: Workflow,
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-16 pb-4 lg:pt-24">
      <div className="px-4 lg:px-4">
        {/* Top Section: Grid Layout */}
        <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col items-start space-y-6 lg:col-span-5">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              Spend Wise
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Automate and centralize the management of your expenses and
              financial tracking.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7 lg:pl-12">
            {/* Column 1: Product */}
            <div className="flex flex-col space-y-6">
              <h3 className="text-sm font-semibold text-slate-900">Product</h3>
              <ul className="space-y-4">
                {navLinks.map((link) => {
                  //   const IconComponent = link.icon;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-3 text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
                      >
                        {/* <IconComponent className="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-900" /> */}
                        <span>{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div className="flex flex-col space-y-6">
              <h3 className="text-sm font-semibold text-slate-900">
                Resources
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Connect */}
            <div className="flex flex-col space-y-6">
              <h3 className="text-sm font-semibold text-slate-900">Connect</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="group flex items-center gap-3 text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
                  >
                    <Instagram className="h-6 w-6 text-slate-400 transition-colors group-hover:text-slate-900" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex items-center gap-3 text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
                  >
                    <Linkedin className="h-6 w-6 text-slate-400 transition-colors group-hover:text-slate-900" />
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Divider & Floating Button */}
        <div className="relative flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
          {/* Legal Links */}
          <div className="flex flex-wrap gap-8">
            <a
              href="#"
              className="text-xs font-semibold tracking-widest text-slate-400 uppercase transition-colors hover:text-slate-900"
            >
              Privacy Notice
            </a>
            <a
              href="#"
              className="text-xs font-semibold tracking-widest text-slate-400 uppercase transition-colors hover:text-slate-900"
            >
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
