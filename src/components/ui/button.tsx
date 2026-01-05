import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-lg bg-primary text-primary-foreground shadow-[inset_0px_0px_0px_1px_rgba(0,0,0,0.2)] hover:bg-primary/90",
        destructive:
          "rounded-lg bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "rounded-lg border bg-background hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "rounded-lg hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",

        // New gradient variant (Variant One)
        gradient:
          "rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-indigo-500/40 hover:from-indigo-600 hover:to-fuchsia-500",

        // New outline-pill variant (Variant Two)
        "outline-pill":
          "rounded-full border border-slate-200 bg-white px-5 py-2.5 text-slate-800 shadow-sm shadow-slate-200 hover:border-slate-300 hover:shadow-md",

        // New dark variant (Variant Three)
        dark: "rounded bg-slate-900 px-5 py-2 font-medium text-white shadow-lg shadow-slate-900/40 hover:bg-purple-800",

        // New light-pill variant (Variant Four)
        "light-pill":
          "rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm shadow-slate-200/60 hover:border-slate-300 hover:shadow-md",

        // Themed gradient variants
        ocean:
          "rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-cyan-500/40 hover:from-cyan-600 hover:to-blue-600",

        sunset:
          "rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-orange-500/40 hover:from-orange-600 hover:to-pink-600",

        forest:
          "rounded-full bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-emerald-500/40 hover:from-emerald-600 hover:to-green-600",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
