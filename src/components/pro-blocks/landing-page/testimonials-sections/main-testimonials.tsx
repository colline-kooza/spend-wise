"use client"

import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const testimonials = [
  {
    quote:
      "An absolute game changer for our product and marketing teams. We ship faster because we finally share the same source of truth.",
    author: "Andi Shuvo",
    role: "Product Designer",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    quote:
      "The dashboards are incredibly intuitive. We were able to roll this out to the whole company in just a few days.",
    author: "Alex Johnson",
    role: "Head of Analytics",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    quote:
      "Support is fantastic and the product keeps getting better every month. We've consolidated multiple tools into one.",
    author: "Jamie Lee",
    role: "Operations Lead",
    image: "https://i.pravatar.cc/150?img=5",
  },
]

export default function MainTestimonials() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:px-0 lg:py-20">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              What Our Clients Are Saying
            </h2>
            <p className="mt-3 text-lg text-slate-500">
              Save your company an entire way to work with remarkable outcomes when you switch to our platform.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm shadow-slate-200 hover:bg-slate-50"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white shadow-md shadow-slate-900/40 hover:bg-slate-800"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`flex flex-col rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 transition-transform duration-300 ${
                i === current ? "scale-100" : "scale-95 opacity-70"
              }`}
            >
              <Quote className="h-6 w-6 text-indigo-300" strokeWidth={1.5} />
              <p className="mt-3 text-sm text-slate-600">{testimonial.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
