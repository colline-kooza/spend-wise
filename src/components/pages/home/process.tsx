// "use client";

// import {
//   AlertCircle,
//   AtSign,
//   Database,
//   FileSpreadsheet,
//   FileText,
//   Globe,
//   Loader2,
// } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function Process() {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const steps = [
//     {
//       number: 1,
//       title: "Collect & Connect",
//       subtitle: "Link all your expense sources",
//       items: [
//         { icon: Database, label: "Databases" },
//         { icon: Globe, label: "APIs & Integrations" },
//         { icon: FileSpreadsheet, label: "CSV Imports" },
//       ],
//     },
//     {
//       number: 2,
//       title: "Process Expenses",
//       subtitle: "Intelligent categorization",
//     },
//     {
//       number: 3,
//       title: "Automate & Analyze",
//       subtitle: "Real-time insights & reports",
//       items: [
//         { icon: FileText, label: "Budget Reports" },
//         { icon: AlertCircle, label: "Spending Alerts" },
//         { icon: AtSign, label: "Team Collaboration" },
//       ],
//     },
//   ];

//   return (
//     <section className="w-full bg-white">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         {/* Header */}
//         <div className="mx-auto mb-20 hidden max-w-4xl text-center md:block">
//           <h1 className="mb-6 text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl">
//             Track expenses <span className="text-slate-400">.</span>
//             Automatically
//             <br className="hidden sm:block" />
//             categorized <span className="text-slate-400">.</span>
//             <span className="font-bold tracking-[0.2em]">Always</span>
//             <span className="text-slate-400">.</span>
//           </h1>
//           <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-500">
//             Spend Wise automates your expense tracking, categorization, and
//             analysis.
//             <br className="hidden lg:block" /> You just spend wisely.
//           </p>
//         </div>

//         {/* mobile view */}
//         <div className="mx-auto mb-20 block max-w-4xl text-start md:hidden">
//           <h1 className="mb-6 text-2xl leading-tight font-semibold tracking-tight text-slate-900">
//             Track expenses. Automatically categorized{" "}
//             <span className="text-slate-400">.</span>
//             <span className="font-bold tracking-[0.2em]">Always</span>
//             <span className="text-slate-400">.</span>
//           </h1>
//           <p className="text-sm leading-relaxed text-slate-500">
//             Spend Wise automates your expense tracking, categorization, and
//             analysis. You just spend wisely.
//           </p>
//         </div>

//         {/* Process Steps */}
//         <div className="relative mx-auto w-full max-w-7xl">
//           {/* SVG Connector - Desktop (Horizontal) */}
//           {isMounted && (
//             <svg
//               className="pointer-events-none absolute top-1/2 left-0 hidden h-[63%] w-full -translate-y-1/2 text-slate-300 lg:block"
//               viewBox="0 0 1200 250"
//               preserveAspectRatio="none"
//             >
//               <path
//                 d="M50,250 L50,50 Q50,25 100,25 L350,25 Q400,25 400,50 L400,175 Q400,225 500,225 L700,225 Q800,225 800,175 L800,50 Q800,25 850,25 L1100,25 Q1150,25 1150,50 L1150,250"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 vectorEffect="non-scaling-stroke"
//               />
//             </svg>
//           )}

//           {/* SVG Connector - Mobile (Vertical) */}
//           {isMounted && (
//             <svg
//               className="pointer-events-none absolute top-0 left-1/2 h-full w-[200px] -translate-x-1/2 text-slate-300 lg:hidden"
//               viewBox="0 0 200 1200"
//               preserveAspectRatio="none"
//             >
//               <path
//                 d="M100,50 L100,350 Q100,400 125,400 L175,400 Q200,400 200,425 L200,775 Q200,800 175,800 L125,800 Q100,800 100,825 L100,1150"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 vectorEffect="non-scaling-stroke"
//               />
//             </svg>
//           )}

//           <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-0">
//             {/* Step 1 */}
//             <div className="relative flex flex-col items-center rounded-3xl bg-white p-6 lg:h-[480px] lg:bg-transparent lg:pt-32">
//               <StepNumber number={1} position="top" />

//               <div className="mt-10 text-center">
//                 <h3 className="mb-2 text-xl font-semibold text-slate-900">
//                   {steps[0].title}
//                 </h3>
//                 <p className="mb-6 text-sm text-slate-500">
//                   {steps[0].subtitle}
//                 </p>

//                 <div className="flex flex-wrap justify-center gap-3 pl-0 md:pl-4">
//                   {steps[0].items!.map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
//                     >
//                       <item.icon className="h-4 w-4 text-slate-900" />
//                       {item.label}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Step 2 */}
//             <div className="relative flex flex-col items-center justify-center rounded-3xl bg-white p-6 lg:mt-12 lg:h-[480px] lg:bg-transparent lg:p-0 lg:pb-12">
//               <div className="z-20 mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
//                 <Loader2 className="h-3 w-3 animate-spin text-slate-900" />
//                 <span className="text-xs font-medium text-slate-700">
//                   Processing
//                 </span>
//               </div>

//               <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
//                 <div className="absolute inset-0 scale-150 rounded-full border border-slate-100" />
//                 <div className="absolute inset-0 scale-[1.8] rounded-full border border-slate-100" />
//                 <span className="text-xl font-black tracking-tighter text-slate-900">
//                   AI
//                 </span>
//               </div>

//               <h3 className="mt-[1rem] mb-1 text-xl font-semibold text-slate-900">
//                 {steps[1].title}
//               </h3>
//               <p className="text-sm text-slate-500">{steps[1].subtitle}</p>

//               <StepNumber number={2} position="bottom" />
//             </div>

//             {/* Step 3 */}
//             <div className="relative flex flex-col items-center rounded-3xl bg-white p-6 lg:h-[460px] lg:bg-transparent lg:pt-32">
//               <StepNumber number={3} position="top" />

//               <div className="mt-10 text-center">
//                 <h3 className="mb-2 text-xl font-semibold text-slate-900">
//                   {steps[2].title}
//                 </h3>
//                 <p className="mb-6 text-sm text-slate-500">
//                   {steps[2].subtitle}
//                 </p>

//                 <div className="mx-auto flex max-w-[240px] flex-col gap-3">
//                   {steps[2].items!.map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
//                     >
//                       <div className="rounded-md bg-slate-100 p-1">
//                         <item.icon className="h-4 w-4 text-slate-900" />
//                       </div>
//                       {item.label}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* Step Number Component */
// function StepNumber({
//   number,
//   position = "top",
// }: {
//   number: number;
//   position?: "top" | "bottom" | "right";
// }) {
//   const positionClasses = {
//     top: "-top-4 lg:top-[8rem] lg:-translate-y-1/2",
//     bottom: "bottom-[18rem] lg:bottom-[8rem] lg:translate-y-1/2",
//     right:
//       "-bottom-4 lg:right-0 lg:top-1/2 lg:bottom-auto lg:translate-x-1/2 lg:-translate-y-1/2 lg:left-auto",
//   };

//   return (
//     <div
//       className={`absolute left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white ring-4 ring-white lg:left-1/2 ${positionClasses[position]}`}
//     >
//       {number}
//     </div>
//   );
// }

"use client";

import {
  AlertCircle,
  AtSign,
  Database,
  FileSpreadsheet,
  FileText,
  Globe,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Process() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const steps = [
    {
      number: 1,
      title: "Collect & Connect",
      subtitle: "Link all your expense sources",
      items: [
        { icon: Database, label: "Databases" },
        { icon: Globe, label: "APIs & Integrations" },
        { icon: FileSpreadsheet, label: "CSV Imports" },
      ],
    },
    {
      number: 2,
      title: "Process Expenses",
      subtitle: "Intelligent categorization",
    },
    {
      number: 3,
      title: "Automate & Analyze",
      subtitle: "Real-time insights & reports",
      items: [
        { icon: FileText, label: "Budget Reports" },
        { icon: AlertCircle, label: "Spending Alerts" },
        { icon: AtSign, label: "Team Collaboration" },
      ],
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="mx-0 max-w-7xl px-6 md:mx-auto lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-20 hidden max-w-4xl text-center md:block lg:mb-12">
          <h1 className="mb-6 text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl">
            Track expenses <span className="text-slate-400">.</span>
            Automatically
            <br className="hidden sm:block" />
            categorized <span className="text-slate-400">.</span>
            <span className="font-bold tracking-[0.2em]">Always</span>
            <span className="text-slate-400">.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-500">
            Spend Wise automates your expense tracking, categorization, and
            analysis.
            <br className="hidden lg:block" /> You just spend wisely.
          </p>
        </div>

        {/* mobile view */}
        <div className="mx-auto mb-20 block max-w-4xl text-start md:hidden">
          <h1 className="mb-6 text-xl leading-tight font-semibold tracking-tight text-slate-900">
            Track expenses. Automatically categorized{" "}
            <span className="text-slate-400">.</span>
            <span className="font-bold tracking-[0.2em]">Always</span>
            <span className="text-slate-400">.</span>
          </h1>
          <p className="text-sm leading-relaxed text-slate-500">
            Spend Wise automates your expense tracking, categorization, and
            analysis. You just spend wisely.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative mx-0 w-full max-w-7xl md:mx-auto">
          {/* SVG Connector - Desktop (Horizontal) */}
          {isMounted && (
            <svg
              className="pointer-events-none absolute top-1/2 left-0 hidden h-[63%] w-full -translate-y-1/2 text-slate-300 lg:block"
              viewBox="0 0 1200 250"
              preserveAspectRatio="none"
            >
              <path
                d="M50,250 L50,50 Q50,25 100,25 L350,25 Q400,25 400,50 L400,175 Q400,225 500,225 L700,225 Q800,225 800,175 L800,50 Q800,25 850,25 L1100,25 Q1150,25 1150,50 L1150,250"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}

          {/* SVG Connector - Mobile (Vertical) */}
          {isMounted && (
            <svg
              className="pointer-events-none absolute top-0 left-1/2 h-full w-[200px] -translate-x-1/2 text-slate-300 lg:hidden"
              viewBox="0 0 200 1200"
              preserveAspectRatio="none"
            >
              <path
                d="M100,50 L100,350 Q100,400 125,400 L175,400 Q200,400 200,425 L200,775 Q200,800 175,800 L125,800 Q100,800 100,825 L100,1150"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}

          <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-0">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center rounded-3xl bg-white p-6 lg:h-[480px] lg:bg-transparent lg:pt-32">
              <StepNumber number={1} position="top" />

              <div className="mt-10 text-center">
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  {steps[0].title}
                </h3>
                <p className="mb-6 text-sm text-slate-500">
                  {steps[0].subtitle}
                </p>

                <div className="flex flex-wrap justify-center gap-3 pl-0 md:pl-4">
                  {steps[0].items!.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
                    >
                      <item.icon className="h-4 w-4 text-slate-900" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center justify-center rounded-3xl bg-white p-6 lg:mt-12 lg:h-[480px] lg:bg-transparent lg:p-0 lg:pb-12">
              <div className="z-20 mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                <Loader2 className="h-3 w-3 animate-spin text-slate-900" />
                <span className="text-xs font-medium text-slate-700">
                  Processing
                </span>
              </div>

              <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 scale-150 rounded-full border border-slate-100" />
                <div className="absolute inset-0 scale-[1.8] rounded-full border border-slate-100" />
                <span className="text-xl font-black tracking-tighter text-slate-900">
                  AI
                </span>
              </div>

              <h3 className="mt-[1rem] mb-1 text-xl font-semibold text-slate-900">
                {steps[1].title}
              </h3>
              <p className="text-sm text-slate-500">{steps[1].subtitle}</p>

              <StepNumber number={2} position="bottom" />
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center rounded-3xl bg-white p-6 lg:h-[460px] lg:bg-transparent lg:pt-32">
              <StepNumber number={3} position="top" />

              <div className="mt-10 text-center">
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  {steps[2].title}
                </h3>
                <p className="mb-6 text-sm text-slate-500">
                  {steps[2].subtitle}
                </p>

                <div className="mx-auto flex max-w-[240px] flex-col gap-3">
                  {steps[2].items!.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                    >
                      <div className="rounded-md bg-slate-100 p-1">
                        <item.icon className="h-4 w-4 text-slate-900" />
                      </div>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Step Number Component */
function StepNumber({
  number,
  position = "top",
}: {
  number: number;
  position?: "top" | "bottom" | "right";
}) {
  const positionClasses = {
    top: "-top-4 lg:top-[8rem] lg:-translate-y-1/2",
    bottom: "bottom-[18rem] lg:bottom-[8rem] lg:translate-y-1/2",
    right:
      "-bottom-4 lg:right-0 lg:top-1/2 lg:bottom-auto lg:translate-x-1/2 lg:-translate-y-1/2 lg:left-auto",
  };

  return (
    <div
      className={`absolute left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white ring-4 ring-white lg:left-1/2 ${positionClasses[position]}`}
    >
      {number}
    </div>
  );
}
