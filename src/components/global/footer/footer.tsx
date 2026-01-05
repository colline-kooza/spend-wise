import {
  ArrowUpRight,
  CreditCard,
  FolderKanban,
  Github,
  GraduationCap,
  Linkedin,
  Package,
  ShoppingCart,
  Store,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white pt-20 pb-12 font-sans">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 grid grid-cols-2 gap-20 md:grid-cols-6 lg:grid-cols-6">
          {/* Logo & Socials Column (Mobile: Full width, Desktop: 1 col) */}
          <div className="col-span-2 flex h-full flex-col justify-between md:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="z-50 flex items-center gap-1">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold tracking-tight"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm text-white">
                  D
                </span>
                Desishub
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="text-gray-400 transition-colors hover:text-black"
                >
                  <span className="sr-only">X</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 transition-colors hover:text-black"
                >
                  <Linkedin size={18} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 transition-colors hover:text-black"
                >
                  <Github size={18} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 transition-colors hover:text-black"
                >
                  <Youtube size={18} />
                </Link>
              </div>

              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[10px] transition-colors hover:bg-gray-50 sm:px-3 sm:py-1.5 sm:text-xs md:px-4 md:text-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>

                <span className="font-medium whitespace-nowrap text-gray-600">
                  All systems operational
                </span>
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1">
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="/products/pos"
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span className="flex h-4 w-4 items-center justify-center text-[8px] font-bold text-purple-600">
                    <ShoppingCart size={18} />
                  </span>{" "}
                  Point of Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/products/dschools"
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span className="flex h-4 w-4 items-center justify-center text-green-600">
                    <GraduationCap size={18} />
                  </span>{" "}
                  DSchools
                </Link>
              </li>
              <li>
                <Link
                  href="/products/lendbox"
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span className="flex h-4 w-4 items-center justify-center text-purple-600">
                    <CreditCard size={18} />
                  </span>{" "}
                  Lendbox
                </Link>
              </li>
              <li>
                <Link
                  href="/products/inventory-pro"
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span className="flex h-4 w-4 items-center justify-center text-red-500">
                    <Package size={18} />
                  </span>{" "}
                  Inventory Pro
                </Link>
              </li>
              <li>
                <Link
                  href="/products/project-pro"
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span className="flex h-4 w-4 items-center justify-center text-blue-700">
                    <FolderKanban size={18} />
                  </span>{" "}
                  Project Pro
                </Link>
              </li>
              <li>
                <Link
                  href="/products/kartify"
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span className="flex h-4 w-4 items-center justify-center text-yellow-400">
                    <Store size={18} />
                  </span>{" "}
                  Kartify
                </Link>
              </li>
            </ul>

            <h4 className="mt-8 mb-4 text-sm font-semibold text-gray-900">
              Solutions
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="/solutions/custom-software"
                  className="hover:text-black"
                >
                  Custom Software
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/ai-automation"
                  className="hover:text-black"
                >
                  AI Automation
                </Link>
              </li>
              <li>
                <Link href="/solutions/training" className="hover:text-black">
                  Training
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="#" className="hover:text-black">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 hover:text-black"
                >
                  Affiliates <ArrowUpRight size={10} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/about" className="hover:text-black">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-black">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-black">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/customers" className="hover:text-black">
                  Customers
                </Link>
              </li>
              <li>
                <Link href="/brand" className="hover:text-black">
                  Brand
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-1 hover:text-black"
                >
                  Legal <ArrowUpRight size={10} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              Compare
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-red-500 text-[8px] font-bold text-white">
                    B
                  </span>{" "}
                  Bl.ink
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-purple-500 text-[8px] font-bold text-white">
                    R
                  </span>{" "}
                  Rewardful
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-indigo-500 text-[8px] font-bold text-white">
                    P
                  </span>{" "}
                  PartnerStack
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-blue-500 text-[8px] font-bold text-white">
                    F
                  </span>{" "}
                  FirstPromoter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-purple-400 text-[8px] font-bold text-white">
                    T
                  </span>{" "}
                  Tolt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-gray-100 pt-8 md:flex-row">
          <div className="mb-4 flex items-center gap-4 md:mb-0">
            <div className="flex cursor-pointer items-center gap-2 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-black text-[8px] font-bold text-white">
                SOC2
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-bold text-gray-600">
                  SOC 2
                </span>
                <span className="text-[10px] text-gray-400">TYPE II</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 Desishub Technologies, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
