"use client"

import { DottedMap } from "@/components/ui/dotted-map"


const markers = [
  { lat: 40.7128, lng: -74.006, size: 0.3 }, // New York
  { lat: 34.0522, lng: -118.2437, size: 0.3 }, // Los Angeles
  { lat: 51.5074, lng: -0.1278, size: 0.3 }, // London
  { lat: -33.8688, lng: 151.2093, size: 0.3 }, // Sydney
  { lat: 48.8566, lng: 2.3522, size: 0.3 }, // Paris
  { lat: 35.6762, lng: 139.6503, size: 0.3 }, // Tokyo
  { lat: 55.7558, lng: 37.6176, size: 0.3 }, // Moscow
  { lat: 39.9042, lng: 116.4074, size: 0.3 }, // Beijing
  { lat: 28.6139, lng: 77.209, size: 0.3 }, // New Delhi
  { lat: -23.5505, lng: -46.6333, size: 0.3 }, // São Paulo
  { lat: 1.3521, lng: 103.8198, size: 0.3 }, // Singapore
  { lat: 25.2048, lng: 55.2708, size: 0.3 }, // Dubai
  { lat: 52.52, lng: 13.405, size: 0.3 }, // Berlin
  { lat: 19.4326, lng: -99.1332, size: 0.3 }, // Mexico City
  { lat: -26.2041, lng: 28.0473, size: 0.3 }, // Johannesburg
]

export default function Stats() {
  const stats = [
    { number: "350+", label: "Over 500+ business powered with us powered with us" },
    { number: "750k", label: "Users used our platform in around the world in around the world" },
    { number: "4.8", label: "Rating on google play and app store google play and app store" },
    { number: "24+", label: "More than 30 countries trust our platform countries trust our " },
  ]

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
            Trusted by company around<br />the world
          </h2>
        </div>

        {/* Map */}
        <div className="md:mt-12 mt-2 md:mb-12 mb-2">
          <div className="relative mx-auto h-[350px] w-full max-w-6xl overflow-hidden rounded-lg b">
            <style>{`
              .dotted-map-dot {
                fill: #8b5cf6 !important;
              }
              .dotted-map-marker {
                fill: #7c3aed !important;
              }
            `}</style>
            <DottedMap markers={markers} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
             <div key={index} className="flex flex-col items-center text-center">
  <div className="flex items-center gap-3">
    <div className="h-6 w-1 rounded-full bg-gradient-to-b from-purple-500 to-purple-300"></div>
    <div className="text-2xl font-bold text-gray-900 lg:text-3xl">
      {stat.number}
    </div>
  </div>

  <div className="mt-2 text-sm max-w-3xl text-gray-600 lg:text-base">
    {stat.label}
  </div>

  {/* Divider on mobile */}
  {index < stats.length - 1 && (
    <div className="mx-auto mt-6 h-px w-12 bg-gray-200 sm:hidden" />
  )}
</div>

            ))}
          </div>
        </div>
      </div>
    </section>
  )
}