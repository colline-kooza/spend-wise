"use client";
import { Logo } from "@/components/global/logo";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-sm bg-white/5 border-b border-white/20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 lg:px-0">
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link
            href="#product"
            className="transition-colors hover:text-slate-900"
          >
            Product
          </Link>
          <Link href="#how" className="transition-colors hover:text-slate-900">
            How it Works
          </Link>
          <Link
            href="#pricing"
            className="transition-colors hover:text-slate-900"
          >
            Pricing
          </Link>
          <Link
            href="#features"
            className="transition-colors hover:text-slate-900"
          >
            Features
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={"/login"}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm shadow-slate-200/60 transition hover:border-slate-300 hover:shadow-md"
          >
            Log In
          </Link>
          <button className="rounded bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-slate-900/40 transition hover:bg-purple-800">
            Start Free Trial
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col px-4 py-2">
          <a
            href="#"
            className="py-3 px-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Product
          </a>
          <a
            href="/dashboard"
            className="py-3 px-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </a>
          <a
            href="#"
            className="py-3 px-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#"
            className="py-3 px-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </a>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-2 pt-4 pb-3 border-t border-slate-100 mt-2">
            <a
              href="/dashboard"
              className="w-full text-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm hover:border-slate-300 hover:shadow-md transition"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </a>
            <button
              className="w-full rounded bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/40 transition hover:bg-purple-800"
              onClick={() => setIsOpen(false)}
            >
              Start Free Trial
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
