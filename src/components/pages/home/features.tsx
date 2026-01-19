// import {
//   AlertCircle,
//   BarChart3,
//   DollarSign,
//   Download,
//   LineChart,
//   Smartphone,
//   TrendingUp,
//   Upload,
//   Users,
//   Wallet,
//   Wifi,
//   Zap,
// } from "lucide-react";

// import { Highlighter } from "@/components/ui/highlighter";

// const features = [
//   {
//     icon: LineChart,
//     title: "Expense Analyzer",
//     description:
//       "Intelligent analysis of your spending patterns to help you understand where your money goes.",
//   },
//   {
//     icon: BarChart3,
//     title: "Smart Templates",
//     description:
//       "Pre-built budget templates for different expense categories to get started instantly.",
//   },
//   {
//     icon: AlertCircle,
//     title: "Alerts & Reminders",
//     description:
//       "Real-time push notifications to keep you on track with your budget goals.",
//   },
//   {
//     icon: Wallet,
//     title: "Virtual Wallets",
//     description:
//       "Create multiple customizable wallets to organize and manage different expense categories.",
//   },
//   {
//     icon: TrendingUp,
//     title: "Budget Management",
//     description:
//       "Set, monitor, and adjust budgets with real-time progress tracking and insights.",
//   },
//   {
//     icon: Zap,
//     title: "AI Receipt Scanner",
//     description:
//       "Automatically extract transaction details from receipts using AI-powered OCR technology.",
//   },
//   {
//     icon: Download,
//     title: "Export to Excel",
//     description:
//       "Generate detailed expense reports with customizable templates and breakdowns.",
//   },
//   {
//     icon: Upload,
//     title: "Import Transactions",
//     description:
//       "Seamlessly import transactions from bank statements and other data sources.",
//   },
//   {
//     icon: TrendingUp,
//     title: "AI Projections",
//     description:
//       "Get intelligent forecasts of your spending trends and future budget requirements.",
//   },
//   {
//     icon: BarChart3,
//     title: "Advanced Analytics",
//     description:
//       "Comprehensive insights and visual reports on your income and expense patterns.",
//   },
//   {
//     icon: Users,
//     title: "Team Collaboration",
//     description:
//       "Share budgets and expenses with team members, with role-based access control.",
//   },
//   {
//     icon: DollarSign,
//     title: "Income Tracker",
//     description:
//       "Track multiple income sources alongside your expenses for complete financial visibility.",
//   },
//   {
//     icon: Smartphone,
//     title: "Mobile App",
//     description:
//       "Full-featured progressive web app (PWA) optimized for iOS and Android devices.",
//   },
//   {
//     icon: Wifi,
//     title: "Offline Support",
//     description:
//       "Continue tracking expenses offline and sync automatically when back online.",
//   },
// ];

// export default function Features() {
//   return (
//     <section className="w-full bg-white py-20 lg:py-32">
//       <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="mx-auto mb-24 max-w-3xl text-center">
//           <h2 className="mb-4 text-xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:mb-8 lg:text-5xl">
//             Features
//           </h2>
//           <p className="text-xs leading-relaxed font-normal text-slate-600 md:text-[1rem]">
//             Spend Wise gives you everything you need{" "}
//             <Highlighter action="highlight" color="#dcff79">
//               to track expenses
//             </Highlighter>
//             , manage budgets, and gain financial insights. Whether you{"'"}re
//             managing personal finances or a team budget, we{"'"}ve got you
//             covered.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <div
//                 key={index}
//                 className="flex h-full flex-col items-start rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
//               >
//                 <div className="mb-4 flex items-center gap-3">
//                   <Icon className="h-6 w-6 text-slate-900" />
//                   <h3 className="text-lg font-semibold text-slate-900">
//                     {feature.title}
//                   </h3>
//                 </div>
//                 <p className="text-base leading-relaxed text-slate-600">
//                   {feature.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

import {
  AlertCircle,
  BarChart3,
  ChevronDown,
  DollarSign,
  Download,
  LineChart,
  Smartphone,
  TrendingUp,
  Upload,
  Users,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { Highlighter } from "@/components/ui/highlighter";

const features = [
  {
    icon: LineChart,
    title: "Expense Analyzer",
    description:
      "Intelligent analysis of your spending patterns to help you understand where your money goes.",
  },
  {
    icon: BarChart3,
    title: "Smart Templates",
    description:
      "Pre-built budget templates for different expense categories to get started instantly.",
  },
  {
    icon: AlertCircle,
    title: "Alerts & Reminders",
    description:
      "Real-time push notifications to keep you on track with your budget goals.",
  },
  {
    icon: Wallet,
    title: "Virtual Wallets",
    description:
      "Create multiple customizable wallets to organize and manage different expense categories.",
  },
  {
    icon: TrendingUp,
    title: "Budget Management",
    description:
      "Set, monitor, and adjust budgets with real-time progress tracking and insights.",
  },
  {
    icon: Zap,
    title: "AI Receipt Scanner",
    description:
      "Automatically extract transaction details from receipts using AI-powered OCR technology.",
  },
  {
    icon: Download,
    title: "Export to Excel",
    description:
      "Generate detailed expense reports with customizable templates and breakdowns.",
  },
  {
    icon: Upload,
    title: "Import Transactions",
    description:
      "Seamlessly import transactions from bank statements and other data sources.",
  },
  {
    icon: TrendingUp,
    title: "AI Projections",
    description:
      "Get intelligent forecasts of your spending trends and future budget requirements.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Comprehensive insights and visual reports on your income and expense patterns.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share budgets and expenses with team members, with role-based access control.",
  },
  {
    icon: DollarSign,
    title: "Income Tracker",
    description:
      "Track multiple income sources alongside your expenses for complete financial visibility.",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description:
      "Full-featured progressive web app (PWA) optimized for iOS and Android devices.",
  },
  {
    icon: Wifi,
    title: "Offline Support",
    description:
      "Continue tracking expenses offline and sync automatically when back online.",
  },
];

export default function Features() {
  const [showAll, setShowAll] = useState(false);
  const displayedFeatures = showAll ? features : features.slice(0, 9);

  return (
    <section className="w-full bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto mb-24 max-w-3xl text-center">
          <h2 className="mb-4 text-xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:mb-8 lg:text-5xl">
            Features
          </h2>
          <p className="text-xs leading-relaxed font-normal text-slate-600 md:text-[1rem]">
            Spend Wise gives you everything you need{" "}
            <Highlighter action="highlight" color="#dcff79">
              to track expenses
            </Highlighter>
            , manage budgets, and gain financial insights. Whether you{"'"}re
            managing personal finances or a team budget, we{"'"}ve got you
            covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex h-full flex-col items-start rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="h-6 w-6 text-slate-900" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* See More Button */}
        {features.length > 9 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
            >
              {showAll
                ? "Show Less"
                : `See More Features (${features.length - 9} more)`}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
