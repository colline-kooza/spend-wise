"use client";

import { ChevronDown, MessageCircle, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      className="group border-b border-slate-200"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between py-5">
        <span className="text-base font-medium text-slate-900">{question}</span>
        <ChevronDown
          strokeWidth={1.5}
          className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </summary>
      <div className="pr-2 pb-5 text-base text-slate-600">{answer}</div>
    </details>
  );
};

export default function FAQ() {
  const faqs = [
    {
      question: "How do I track expenses in Spend Wise?",
      answer:
        "Simply log your expenses manually or connect your bank and credit card accounts. Spend Wise automatically categorizes transactions and syncs them in real-time to your dashboard.",
    },
    {
      question: "Can I set budget limits for different categories?",
      answer:
        "Yes. Create budgets for each spending category and get alerts when you're approaching or exceed your limits. Track your spending habits monthly or annually.",
    },
    {
      question: "Does Spend Wise support multiple currencies?",
      answer:
        "Absolutely. Track expenses in different currencies and Spend Wise will automatically convert them using live exchange rates for accurate reporting.",
    },
    {
      question: "How do I export my expense reports?",
      answer:
        "Generate detailed expense reports in PDF, CSV, or Excel format. Customize date ranges, categories, and filters to get the insights you need.",
    },
    {
      question: "Can I share budgets with my team or family?",
      answer:
        "Yes. Create shared accounts and set permissions for team members or family. Everyone can view spending in real-time and collaborate on budget management.",
    },
    {
      question: "How secure is my financial data on Spend Wise?",
      answer:
        "Your data is encrypted end-to-end and stored on secure servers. We never store your banking credentials and comply with industry standards for financial data protection.",
    },
  ];

  return (
    <section className="relative pt-0 md:pt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 md:py-20 lg:px-8">
        <div className="grid gap-4 md:gap-20 lg:grid-cols-12">
          {/* Left: Heading & Contact */}
          <div className="lg:col-span-5">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 uppercase md:text-3xl">
              Frequently Asked Questions{" "}
              <span className="inline-block align-baseline">*</span>
            </h2>
            <p className="mt-6 text-sm text-slate-600 md:text-lg">
              Still have questions? Contact us directly!
            </p>

            <div className="mt-6 hidden flex-wrap gap-3 md:flex">
              <Link
                href="https://wa.me"
                className="inline-flex items-center gap-2 rounded-[0.5rem] border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
              >
                <MessageCircle strokeWidth={1.5} className="h-4 w-4" />
                Contact via WhatsApp
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-[0.5rem] bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                <UserPlus strokeWidth={1.5} className="h-4 w-4" />
                Create an account
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 md:hidden">
              <Link
                href="https://wa.me"
                className="inline-flex items-center justify-center gap-2 rounded-[0.5rem] border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
              >
                <MessageCircle strokeWidth={1.5} className="h-4 w-4" />
                Contact via WhatsApp
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-[0.5rem] bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                <UserPlus strokeWidth={1.5} className="h-4 w-4" />
                Create an account
              </Link>
            </div>
          </div>

          {/* Right: FAQs */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-slate-200">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
