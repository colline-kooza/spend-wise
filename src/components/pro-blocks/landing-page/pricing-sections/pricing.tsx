"use client"

import { Check, X } from "lucide-react"

export default function Pricing() {
  const features = [
    "Manage your existing talent",
    "Expert support",
    "Fast & custom hiring flows",
    "Access to the Worksome Marketplace",
    "Secure payments & finance controls",
    "Recruiter Management",
  ]

  const plans = [
    {
      price: "$50",
      period: "/Month",
      includes: [true, true, true, false, false, false],
      button: "Subscribe Now",
      highlight: true,
    },
    {
      price: "$220",
      period: "/Month",
      includes: [true, true, true, true, true, true],
      button: "Premium Package",
      highlight: false,
    },
  ]

  return (
    <section className="bg-white w-full py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900">Pricing made simple</h2>
          <p className="text-slate-500 mt-1 text-sm">
            No monthly cost – no hidden fees. Unlimited users for free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* LEFT FEATURE LIST */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-700 text-[15px]">
                <Check className="h-4 w-4 text-emerald-500" />
                {f}
              </div>
            ))}
          </div>

          {/* PRICING CARDS */}
          {plans.map((plan, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center"
            >
              {/* Price */}
              <p className="text-4xl font-semibold text-slate-900">
                {plan.price}
                <span className="text-sm font-normal text-slate-500">{plan.period}</span>
              </p>

              {/* Features */}
              <div className="flex flex-col gap-4 mt-8">
                {plan.includes.map((included, idx) => (
                  <div key={idx} className="flex items-center justify-center gap-3">
                    {included ? (
                      <Check className="h-5 w-5 text-emerald-500" strokeWidth={2.5} />
                    ) : (
                      <X className="h-5 w-5 text-red-400" strokeWidth={2.5} />
                    )}
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                className={`mt-10 w-full rounded-xl py-3 font-medium text-[15px] transition-all ${
                  i === 0
                    ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md hover:opacity-90"
                    : "border border-slate-300 text-slate-900 hover:bg-slate-50"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
