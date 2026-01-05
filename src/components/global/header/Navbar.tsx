"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import MobileMenu from "./MobileMenu";
import ProductMenu from "./ProductMenu";
import ResourcesMenu from "./ResourcesMenu";
import SolutionsMenu from "./SolutionsMenu";

type Tab = "Product" | "Solutions" | "Resources" | null;

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<Tab>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleMouseLeave = () => {
    setActiveTab(null);
  };

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled || activeTab || isMobileMenuOpen
            ? "border-b border-gray-200 bg-white/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
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

          {/* Desktop Menu */}
          <div className="hidden h-full items-center gap-8 lg:flex">
            <MenuTrigger
              label="Product"
              tab="Product"
              activeTab={activeTab}
              onMouseEnter={handleMouseEnter}
            />
            <MenuTrigger
              label="Solutions"
              tab="Solutions"
              activeTab={activeTab}
              onMouseEnter={handleMouseEnter}
            />
            <MenuTrigger
              label="Resources"
              tab="Resources"
              activeTab={activeTab}
              onMouseEnter={handleMouseEnter}
            />
            <Link
              href="/industries"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              Industries
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              Pricing
            </Link>
            <Link
              href="/solutions/training"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              Contact
            </Link>
          </div>

          {/* Actions - Visible on Desktop AND Mobile now */}
          <div className="flex items-center gap-3">
            <Link
              href="/get-quote"
              className="hidden px-2 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-black sm:block lg:block"
            >
              Get a quote
            </Link>
            <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-sm transition-colors hover:bg-gray-800">
              Start project
            </button>
            {/* Mobile Toggle */}
            <button
              className="ml-1 p-2 text-gray-600 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown (Desktop) */}
        <AnimatePresence>
          {activeTab && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 left-0 overflow-hidden border-b border-gray-200 bg-white shadow-xl"
            >
              <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="w-full">
                  {activeTab === "Product" && <ProductMenu />}
                  {activeTab === "Solutions" && <SolutionsMenu />}
                  {activeTab === "Resources" && <ResourcesMenu />}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

function MenuTrigger({
  label,
  tab,
  activeTab,
  onMouseEnter,
}: {
  label: string;
  tab: Tab;
  activeTab: Tab;
  onMouseEnter: (tab: Tab) => void;
}) {
  return (
    <button
      onMouseEnter={() => onMouseEnter(tab)}
      className={`flex h-full items-center gap-1 border-b-2 text-sm font-medium transition-colors ${
        activeTab === tab
          ? "border-black text-black"
          : "border-transparent text-gray-600 hover:text-black"
      }`}
    >
      {label}
      <ChevronDown
        size={14}
        className={`transition-transform duration-200 ${
          activeTab === tab ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}
