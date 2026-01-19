// "use client";

// import { Check, ChevronRight } from "lucide-react";
// import { useState } from "react";

// const PricingCard = ({
//   tier,
//   price,
//   description,
//   features,
//   ctaText,
//   accentColor,
//   isYearly,
// }: {
//   tier: string;
//   price: number;
//   description: string;
//   features: (string | { text: string; included: boolean })[];
//   ctaText: string;
//   accentColor: string;
//   isYearly: boolean;
// }) => {
//   const displayPrice = isYearly ? Math.floor(price * 12 * 0.9) : price;

//   return (
//     <div className="relative w-full overflow-hidden rounded-3xl bg-white shadow-xl">
//       {/* Decoration shapes */}
//       <div className="relative flex h-40 w-full justify-center pt-8">
//         <div
//           className={`h-20 w-20 rounded-full ${accentColor} opacity-20`}
//         ></div>
//       </div>

//       <div className="flex flex-col items-center px-8 pb-32 text-center">
//         <h3 className="mb-3 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
//           {tier}
//         </h3>
//         <div className={`mb-6 h-1 w-8 rounded-full ${accentColor}`}></div>

//         <div className="mb-2 flex items-baseline gap-1">
//           <span className="text-5xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
//             ${displayPrice}
//           </span>
//         </div>
//         <div className="mb-2 text-sm font-medium text-slate-400">
//           {isYearly ? "per year" : "per month"}
//         </div>
//         {isYearly && (
//           <div className="mb-6 text-xs font-semibold text-red-800">
//             Save 10% with yearly billing
//           </div>
//         )}

//         <p className="mb-8 text-sm text-slate-600">{description}</p>

//         <div className="mb-8 w-full space-y-4 text-left">
//           {features.map((feature, idx) => {
//             const isIncluded =
//               typeof feature === "string" ? true : feature.included;
//             const text = typeof feature === "string" ? feature : feature.text;

//             return (
//               <div
//                 key={idx}
//                 className={`flex items-center gap-3 text-sm ${isIncluded ? "text-slate-600" : "text-slate-400"}`}
//               >
//                 {isIncluded ? (
//                   <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
//                 ) : (
//                   <div className="h-4 w-4 flex-shrink-0 rounded border border-slate-300"></div>
//                 )}
//                 {text}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Wave Bottom */}
//       <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-28">
//         <svg
//           className="h-full w-full"
//           preserveAspectRatio="none"
//           viewBox="0 0 1440 320"
//         >
//           <path
//             fill={accentColor}
//             fillOpacity="0.6"
//             d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//           ></path>
//           <path
//             fill={accentColor}
//             fillOpacity="0.9"
//             d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//           ></path>
//         </svg>
//       </div>

//       {/* Button */}
//       <button
//         className={`absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-8 py-3 text-xs font-bold tracking-wider whitespace-nowrap text-slate-400 uppercase shadow-lg transition-all hover:scale-105 hover:bg-[#dcff79] hover:text-slate-900`}
//       >
//         {ctaText} <ChevronRight className="h-3 w-3" />
//       </button>
//     </div>
//   );
// };

// export default function Pricing() {
//   const [isYearly, setIsYearly] = useState(false);

//   const plans = [
//     {
//       tier: "Starter",
//       monthlyPrice: 29,
//       description: "Perfect for personal budgeting",
//       accentColor: "bg-pink-300",
//       features: [
//         "Track up to 50 transactions",
//         "Basic expense categories",
//         "Monthly reports",
//         { text: "Team collaboration", included: false },
//         { text: "Advanced analytics", included: false },
//       ],
//       ctaText: "Get Started",
//     },
//     {
//       tier: "Pro",
//       monthlyPrice: 79,
//       description: "For growing businesses",
//       accentColor: "bg-[#dcff79]",
//       features: [
//         "Unlimited transactions",
//         "Advanced categorization",
//         "Real-time analytics",
//         "Team collaboration (up to 5)",
//         "CSV export",
//       ],
//       ctaText: "Choose Plan",
//     },
//     {
//       tier: "Enterprise",
//       monthlyPrice: 199,
//       description: "For large organizations",
//       accentColor: "bg-cyan-300",
//       features: [
//         "Everything in Pro",
//         "Unlimited team members",
//         "API access",
//         "Custom integrations",
//         "Priority support",
//       ],
//       ctaText: "Contact Sales",
//     },
//   ];

//   return (
//     <section className="relative w-full overflow-hidden py-24 lg:py-32">
//       <div className="relative z-10 mx-0 max-w-7xl px-2 md:mx-auto md:px-6">
//         {/* Header */}
//         <div className="mb-16 text-start md:text-center lg:mb-24">
//           <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
//             Simple, Transparent Pricing.
//           </h2>
//           <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed font-normal text-slate-600">
//             Choose the perfect plan for your expense management needs. Scale as
//             you grow.
//           </p>

//           <div className="flex items-center justify-center gap-4">
//             <span
//               className={`text-sm font-medium ${!isYearly ? "text-slate-900" : "text-slate-500"}`}
//             >
//               Monthly
//             </span>
//             <button
//               onClick={() => setIsYearly(!isYearly)}
//               className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
//                 isYearly ? "bg-[#dcff79]" : "bg-slate-300"
//               }`}
//             >
//               <span
//                 className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
//                   isYearly ? "translate-x-7" : "translate-x-1"
//                 }`}
//               />
//             </button>
//             <span
//               className={`text-sm font-medium ${isYearly ? "text-slate-900" : "text-slate-500"}`}
//             >
//               Yearly
//             </span>
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <div className="flex w-full flex-col items-start justify-start gap-8 pt-10 md:items-center md:justify-center lg:flex-row lg:items-center lg:gap-0">
//           {plans.map((plan, idx) => (
//             <div key={idx} className={idx === 1 ? "lg:z-10 lg:-mt-16" : ""}>
//               <PricingCard
//                 tier={plan.tier}
//                 price={plan.monthlyPrice}
//                 description={plan.description}
//                 features={plan.features}
//                 ctaText={plan.ctaText}
//                 accentColor={plan.accentColor}
//                 isYearly={isYearly}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { Check, ChevronRight } from "lucide-react";
import { useState } from "react";

import { ShineBorder } from "@/components/ui/shine-border";

const PricingCard = ({
  tier,
  price,
  description,
  features,
  ctaText,
  accentColor,
  isYearly,
}: {
  tier: string;
  price: number;
  description: string;
  features: (string | { text: string; included: boolean })[];
  ctaText: string;
  accentColor: string;
  isYearly: boolean;
}) => {
  const displayPrice = isYearly ? Math.floor(price * 12 * 0.9) : price;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border-[1px] border-solid border-gray-200 bg-white">
      <ShineBorder shineColor={["#A07CFE", "#dcff79", "#dcff79"]} />
      {/* Decoration shapes */}
      <div className="relative flex h-40 w-full justify-center pt-8">
        <div
          className={`h-20 w-20 rounded-full ${accentColor} opacity-20`}
        ></div>
      </div>

      <div className="flex flex-col items-center px-8 pb-32 text-center">
        <h3 className="mb-3 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
          {tier}
        </h3>
        <div className={`mb-6 h-1 w-8 rounded-full ${accentColor}`}></div>

        <div className="mb-2 flex items-baseline gap-1">
          <span className="text-5xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
            ${displayPrice}
          </span>
        </div>
        <div className="mb-2 text-sm font-medium text-slate-400">
          {isYearly ? "per year" : "per month"}
        </div>
        {isYearly && (
          <div className="mb-6 text-xs font-semibold text-red-800">
            Save 10% with yearly billing
          </div>
        )}

        <p className="mb-8 text-sm text-slate-600">{description}</p>

        <div className="mb-8 w-full space-y-4 text-left">
          {features.map((feature, idx) => {
            const isIncluded =
              typeof feature === "string" ? true : feature.included;
            const text = typeof feature === "string" ? feature : feature.text;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 text-sm ${isIncluded ? "text-slate-600" : "text-slate-400"}`}
              >
                {isIncluded ? (
                  <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                ) : (
                  <div className="h-4 w-4 flex-shrink-0 rounded border border-slate-300"></div>
                )}
                {text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-28">
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            fill={accentColor}
            fillOpacity="0.6"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill={accentColor}
            fillOpacity="0.9"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Button */}
      <button
        className={`absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-8 py-3 text-xs font-bold tracking-wider whitespace-nowrap text-slate-400 uppercase shadow-lg transition-all hover:scale-105 hover:bg-[#dcff79] hover:text-slate-900`}
      >
        {ctaText} <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
};

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      tier: "Starter",
      monthlyPrice: 29,
      description: "Perfect for personal budgeting",
      accentColor: "bg-pink-300",
      features: [
        "Track up to 50 transactions",
        "Basic expense categories",
        "Monthly reports",
        { text: "Team collaboration", included: false },
        { text: "Advanced analytics", included: false },
      ],
      ctaText: "Get Started",
    },
    {
      tier: "Pro",
      monthlyPrice: 79,
      description: "For growing businesses",
      accentColor: "bg-[#dcff79]",
      features: [
        "Unlimited transactions",
        "Advanced categorization",
        "Real-time analytics",
        "Team collaboration (up to 5)",
        "CSV export",
      ],
      ctaText: "Choose Plan",
    },
    {
      tier: "Enterprise",
      monthlyPrice: 199,
      description: "For large organizations",
      accentColor: "bg-cyan-300",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "API access",
        "Custom integrations",
        "Priority support",
      ],
      ctaText: "Contact Sales",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-24 lg:py-32">
      <div className="relative z-10 mx-0 max-w-7xl px-0 md:mx-auto md:px-6">
        {/* Header */}
        <div className="mb-16 px-4 text-start md:px-0 md:text-center lg:mb-24">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
            Simple, Transparent Pricing.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed font-normal text-slate-600">
            Choose the perfect plan for your expense management needs. Scale as
            you grow.
          </p>

          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${!isYearly ? "text-slate-900" : "text-slate-500"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                isYearly ? "bg-[#dcff79]" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${isYearly ? "text-slate-900" : "text-slate-500"}`}
            >
              Yearly
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex w-full flex-col justify-center gap-8 pt-10 md:px-4 lg:flex-row lg:gap-0 lg:px-0">
          {plans.map((plan, idx) => (
            <div key={idx} className={idx === 1 ? "lg:z-10 lg:-mt-16" : ""}>
              <PricingCard
                tier={plan.tier}
                price={plan.monthlyPrice}
                description={plan.description}
                features={plan.features}
                ctaText={plan.ctaText}
                accentColor={plan.accentColor}
                isYearly={isYearly}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
