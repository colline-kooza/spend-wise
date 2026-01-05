import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  ChevronDown,
  LayoutGrid,
  Link as LinkIcon,
  Terminal,
  ToggleRight,
  Users,
} from "lucide-react";
import React, { useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "Product"
  );

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const productItems = [
    {
      label: "Dub Links",
      desc: "Short links with superpowers",
      icon: <LinkIcon size={18} />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Dub Partners",
      desc: "Grow your revenue with partnerships",
      icon: <LayoutGrid size={18} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Dub Analytics",
      desc: "Powerful real-time analytics",
      icon: <BarChart2 size={18} />,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Dub API",
      desc: "Programmatic link creation at scale",
      icon: <Terminal size={18} />,
      color: "bg-gray-100 text-gray-600",
    },
    {
      label: "Dub Integrations",
      desc: "Connect Dub with your favorite tools",
      icon: <ToggleRight size={18} />,
      color: "bg-gray-100 text-gray-600",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black lg:hidden"
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 left-0 z-40 max-h-[90vh] overflow-y-auto bg-white pt-20 shadow-xl lg:hidden"
          >
            <div className="flex flex-col px-6 pb-8">
              {/* Product Section */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection("Product")}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    Product
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 transition-transform duration-200 ${expandedSection === "Product" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {expandedSection === "Product" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 pb-4">
                        {productItems.map((item) => (
                          <a
                            key={item.label}
                            href="#"
                            className="group flex items-start gap-3"
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}
                            >
                              {item.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600">
                                {item.label}
                              </span>
                              <span className="text-sm leading-tight text-gray-500">
                                {item.desc}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Section */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection("Solutions")}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    Solutions
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 transition-transform duration-200 ${expandedSection === "Solutions" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {expandedSection === "Solutions" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 pb-4 pl-2">
                        <a
                          href="#"
                          className="block text-sm text-gray-600 hover:text-black"
                        >
                          Marketing Attribution
                        </a>
                        <a
                          href="#"
                          className="block text-sm text-gray-600 hover:text-black"
                        >
                          Content Creators
                        </a>
                        <a
                          href="#"
                          className="block text-sm text-gray-600 hover:text-black"
                        >
                          Affiliate Management
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources Section */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection("Resources")}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    Resources
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 transition-transform duration-200 ${expandedSection === "Resources" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {expandedSection === "Resources" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 pb-4 pl-2">
                        <a
                          href="#"
                          className="block text-sm text-gray-600 hover:text-black"
                        >
                          Help Center
                        </a>
                        <a
                          href="#"
                          className="block text-sm text-gray-600 hover:text-black"
                        >
                          Blog
                        </a>
                        <a
                          href="#"
                          className="block text-sm text-gray-600 hover:text-black"
                        >
                          Changelog
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Simple Links */}
              <a
                href="#"
                className="block border-b border-gray-100 py-4 text-lg font-semibold text-gray-900"
              >
                Enterprise
              </a>
              <a
                href="#"
                className="block border-b border-gray-100 py-4 text-lg font-semibold text-gray-900"
              >
                Customers
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
