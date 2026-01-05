"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  ChevronDown,
  Code,
  CreditCard,
  FolderKanban,
  GraduationCap,
  HelpCircle,
  Package,
  ShoppingCart,
  Store,
} from "lucide-react";
import React, { useState } from "react";

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 top-16 z-40 overflow-y-auto bg-white lg:hidden"
        >
          <div className="px-6 py-8">
            {/* Products Section */}
            <MobileMenuSection
              title="Products"
              isExpanded={expandedSection === "products"}
              onToggle={() => toggleSection("products")}
            >
              <MobileMenuItem
                icon={<ShoppingCart size={18} />}
                title="Point of Sale"
                href="/products/pos"
              />
              <MobileMenuItem
                icon={<GraduationCap size={18} />}
                title="DSchools"
                href="/products/dschools"
              />
              <MobileMenuItem
                icon={<CreditCard size={18} />}
                title="Lendbox"
                href="/products/lendbox"
              />
              <MobileMenuItem
                icon={<Package size={18} />}
                title="Inventory Pro"
                href="/products/inventory-pro"
              />
              <MobileMenuItem
                icon={<FolderKanban size={18} />}
                title="Project Pro"
                href="/products/project-pro"
              />
              <MobileMenuItem
                icon={<Store size={18} />}
                title="Kartify"
                href="/products/kartify"
              />
            </MobileMenuSection>

            {/* Solutions Section */}
            <MobileMenuSection
              title="Solutions"
              isExpanded={expandedSection === "solutions"}
              onToggle={() => toggleSection("solutions")}
            >
              <MobileMenuItem
                icon={<Code size={18} />}
                title="Custom Software Development"
                href="#"
              />
              <MobileMenuItem
                icon={<Brain size={18} />}
                title="AI & Automation"
                href="#"
              />
              <MobileMenuItem
                icon={<GraduationCap size={18} />}
                title="IT Training & Internships"
                href="#"
              />
            </MobileMenuSection>

            {/* Resources Section */}
            <MobileMenuSection
              title="Resources"
              isExpanded={expandedSection === "resources"}
              onToggle={() => toggleSection("resources")}
            >
              <MobileMenuItem
                icon={<BookOpen size={18} />}
                title="Documentation"
                href="#"
              />
              <MobileMenuItem
                icon={<HelpCircle size={18} />}
                title="Help Center"
                href="#"
              />
              <MobileMenuLink title="Blog" href="#" />
              <MobileMenuLink title="Case Studies" href="#" />
            </MobileMenuSection>

            {/* Direct Links */}
            <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
              <a
                href="/industries"
                className="block text-base font-medium text-gray-900 hover:text-black"
              >
                Industries
              </a>
              <a
                href="/training"
                className="block text-base font-medium text-gray-900 hover:text-black"
              >
                Training
              </a>
              <a
                href="/about"
                className="block text-base font-medium text-gray-900 hover:text-black"
              >
                About
              </a>
              <a
                href="/contact"
                className="block text-base font-medium text-gray-900 hover:text-black"
              >
                Contact
              </a>
            </div>

            {/* CTA Section */}
            <div className="mt-8 space-y-3 border-t border-gray-200 pt-6">
              <a
                href="/contact"
                className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Get a quote
              </a>
              <button className="w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800">
                Start project
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileMenuSection({
  title,
  isExpanded,
  onToggle,
  children,
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-base font-semibold text-gray-900"
      >
        {title}
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 space-y-2 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenuItem({
  icon,
  title,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50"
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-900">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </a>
  );
}

function MobileMenuLink({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      className="block rounded-lg p-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      {title}
    </a>
  );
}
