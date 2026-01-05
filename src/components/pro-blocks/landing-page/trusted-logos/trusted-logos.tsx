"use client"

import { useState, useEffect } from "react"

const logos = [
  { name: "Spotify", color: "bg-emerald-400" },
  { name: "coinbase", color: "bg-sky-400" },
  { name: "slack", color: "bg-rose-400" },
  { name: "Dropbox", color: "bg-indigo-400" },
  { name: "webflow", color: "bg-violet-400" },
  { name: "Zoom", color: "bg-blue-400" },
]

export default function TrustedLogos() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay || hoveredIndex !== null) return

    const interval = setInterval(() => {
      setHoveredIndex((prev) => (prev === null ? 0 : (prev + 1) % logos.length))
    }, 1500)

    return () => clearInterval(interval)
  }, [isAutoPlay, hoveredIndex])

  const handleHover = (index: number) => {
    setHoveredIndex(index)
    setIsAutoPlay(false)
  }

  const handleLeave = () => {
    setIsAutoPlay(true)
  }

  return (
    <div className="mt-6 space-y-3">
      <p className="text-sm font-medium text-slate-500">Trusted by forward-thinking teams</p>
      <div className="flex flex-wrap items-center gap-6">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center gap-1 transition-all duration-300 cursor-pointer"
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handleLeave}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${logo.color} transition-transform duration-300 ${hoveredIndex === index ? "scale-125" : "scale-100"}`}
            ></span>
            <span
              className={`text-base font-medium transition-all duration-300 ${hoveredIndex === index ? "text-slate-900" : "text-slate-500"}`}
            >
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
