"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // or use a simple className merge utility

type Variant = "default" | "ocean" | "sunset" | "forest";

type BlurIntensity =
  | "blur-sm"
  | "blur"
  | "blur-md"
  | "blur-lg"
  | "blur-xl"
  | "blur-2xl"
  | "blur-3xl";

interface VariantStyles {
  container: string;
  blob1: string;
  blob2: string;
  fadeOverlay: string;
}

interface GradientBackgroundProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  showFadeOverlay?: boolean;
  grid?: boolean;
  blurIntensity?: BlurIntensity;
}

const variants: Record<Variant, VariantStyles> = {
  default: {
    container: "bg-gradient-to-br from-slate-50 via-white to-slate-50",
    blob1: "bg-indigo-200/60 -left-40 top-10",
    blob2: "bg-purple-200/60 -right-40 top-60",
    fadeOverlay: "from-transparent to-white",
  },
  ocean: {
    container: "bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50",
    blob1: "bg-cyan-300/50 -left-32 top-20",
    blob2: "bg-blue-300/50 -right-32 bottom-20",
    fadeOverlay: "from-transparent to-cyan-50",
  },
  sunset: {
    container: "bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50",
    blob1: "bg-orange-300/40 -left-40 top-0",
    blob2: "bg-pink-300/40 -right-40 top-40",
    fadeOverlay: "from-transparent to-orange-50",
  },
  forest: {
    container: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
    blob1: "bg-emerald-300/50 -left-36 bottom-10",
    blob2: "bg-green-300/50 -right-36 top-10",
    fadeOverlay: "from-transparent to-emerald-50",
  },
};

export default function GradientBackground({
  children,
  variant = "default",
  className = "",
  showFadeOverlay = true,
  blurIntensity = "blur-3xl",
  grid = true,
}: GradientBackgroundProps) {
  const variantStyles = variants[variant];

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variantStyles.container,
        className,
        grid && "bg-grid-radial"
      )}
    >
      {/* Fade overlay at bottom */}
      {showFadeOverlay && (
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b",
            variantStyles.fadeOverlay
          )}
        ></div>
      )}

      {/* Gradient blobs */}
      <div
        className={cn(
          "pointer-events-none absolute h-96 w-96 rounded-full",
          variantStyles.blob1,
          blurIntensity
        )}
      ></div>
      <div
        className={cn(
          "pointer-events-none absolute h-96 w-96 rounded-full",
          variantStyles.blob2,
          blurIntensity
        )}
      ></div>

      {/* Content */}
      <div className="relative">{children}</div>
    </section>
  );
}

// Export types for use in other components
export type { GradientBackgroundProps, Variant, BlurIntensity };
