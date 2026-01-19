// /* eslint-disable @next/next/no-img-element */
// import { Star } from "lucide-react";

// export function Hero() {
//   const avatars = [
//     "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop",
//     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop",
//     "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop",
//   ];

//   return (
//     <section className="relative py-20">
//       <div className="mx-0 max-w-5xl px-4 md:mx-auto md:px-6">
//         {/* Social Proof */}
//         <div className="mb-4 flex items-center justify-center gap-3 md:mb-8">
//           <div className="flex -space-x-2">
//             {avatars.map((src, i) => (
//               <img
//                 key={i}
//                 src={src}
//                 alt="User avatar"
//                 className="h-9 w-9 rounded-full border-2 border-white object-cover"
//               />
//             ))}
//           </div>
//           <div className="flex flex-col">
//             <div className="flex gap-0.5">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className="h-4 w-4 fill-slate-900 text-slate-900"
//                 />
//               ))}
//             </div>
//             <p className="mt-0.5 text-sm text-slate-600">
//               Loved by{" "}
//               <span className="font-semibold text-slate-900">over 2,000</span>{" "}
//               business owners
//             </p>
//           </div>
//         </div>

//         {/* Main Headline */}
//         <h1 className="mb-6 hidden leading-[1.1] font-bold tracking-tight text-slate-900 md:block md:text-center md:text-[61px] lg:text-[61px]">
//           Make each sale invoice ,<br />
//           reconcile and collect it .
//         </h1>
//         <h1 className="mb-4 block text-start text-[35px] leading-[1.1] font-bold tracking-tight text-slate-900 md:hidden">
//           Make each sale invoice , reconcile and collect it .
//         </h1>

//         {/* Description */}
//         <p className="mx-auto mb-4 max-w-[38rem] text-start text-[15px] leading-relaxed text-slate-600 md:mb-8 md:text-center md:text-[18px]">
//           <span className="font-semibold text-slate-900">Gigstack</span> is a
//           platform in Mexico that automates invoicing, tax reconciliation, and
//           collections for businesses. It connects with Stripe, Shopify, the
//           Mexican Tax Administration Service (SAT), and more.
//         </p>

//         {/* CTA Buttons */}
//         <div className="hidden items-start justify-center gap-4 md:flex md:flex-row md:items-center">
//           <button className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50">
//             Schedule a Demo
//           </button>
//           <button className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-slate-800">
//             <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-800 text-white">
//               ✷
//             </span>
//             Free trial
//           </button>
//         </div>
//         {/*mobile CTA BUTTONS*/}
//         <div className="grid grid-cols-1 gap-4 md:hidden">
//           <button className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50">
//             Schedule a Demo
//           </button>
//           <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-slate-800">
//             <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-800 text-white">
//               ✷
//             </span>
//             Free trial
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

/* eslint-disable @next/next/no-img-element */
import { Star } from "lucide-react";

import { Highlighter } from "@/components/ui/highlighter";

export function Hero() {
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop",
  ];

  return (
    <section className="relative pt-[5rem] pb-[2rem] md:pt-[9rem]">
      <div className="mx-0 max-w-5xl px-4 md:mx-auto md:px-6">
        {/* Social Proof */}
        <div className="mb-4 flex items-center justify-center gap-3 md:mb-4">
          <div className="flex -space-x-2">
            {avatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="User avatar"
                className="h-7 w-7 rounded-full border-2 border-white object-cover md:h-9 md:w-9"
              />
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-slate-900 text-slate-900"
                />
              ))}
            </div>
            <p className="mt-0.5 text-xs text-slate-600 md:text-sm">
              Loved by{" "}
              <span className="font-semibold text-slate-900">over 2,000</span>{" "}
              smart spenders
            </p>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="mb-6 hidden leading-[1.1] font-bold tracking-tight text-slate-900 md:block md:text-center md:text-[61px] lg:text-[61px]">
          Track every expense clearly ,<br />
          control and grow your money .
        </h1>
        <h1 className="mb-4 block text-start text-[35px] leading-[1.1] font-bold tracking-tight text-slate-900 md:hidden">
          Track every expense clearly , control and grow your money .
        </h1>

        {/* Description */}
        <p className="mx-auto mb-4 max-w-[38rem] text-start text-[15px] leading-relaxed text-slate-600 md:mb-8 md:text-center md:text-[18px]">
          <span className="font-semibold text-slate-900">Spend Wise</span> is a
          smart expense tracking system that helps individuals and teams manage
          daily spending, monitor budgets, and gain clear financial insights. It
          simplifies expense logging, reporting, and control —
          <Highlighter action="highlight" color="#dcff79">
            all in one place.
          </Highlighter>
        </p>

        {/* CTA Buttons */}
        <div className="hidden items-start justify-center gap-4 md:flex md:flex-row md:items-center">
          <button className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50">
            See how it works
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-slate-800">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-800 text-white">
              ✷
            </span>
            Start free trial
          </button>
        </div>

        {/* Mobile CTA Buttons */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          <button className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50">
            See how it works
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-slate-800">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-800 text-white">
              ✷
            </span>
            Start free trial
          </button>
        </div>
      </div>
    </section>
  );
}
