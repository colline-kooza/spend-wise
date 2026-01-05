// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   Code,
//   CreditCard,
//   FolderKanban,
//   GraduationCap,
//   Package,
//   ShoppingCart,
//   Store,
//   Zap,
// } from "lucide-react";
// import React from "react";

// export default function ProductMenu() {
//   return (
//     <div className="grid w-full grid-cols-12 gap-6">
//       {/* Point of Sale - Left Column */}
//       <div className="group col-span-4">
//         <a
//           href="/products/pos"
//           className="block h-full rounded-xl border border-transparent p-4 transition-colors hover:border-gray-100 hover:bg-gray-50"
//         >
//           <div className="mb-4">
//             <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
//               <ShoppingCart size={18} />
//             </div>
//             <h3 className="mb-1 text-base font-semibold text-gray-900">
//               Point of Sale
//             </h3>
//             <p className="text-sm leading-relaxed text-gray-500">
//               Desktop POS with inventory, accounting & offline-first support
//             </p>
//           </div>
//           {/* Visual Preview */}
//           <div className="mt-4 rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-shadow group-hover:shadow-md">
//             <div className="mb-2 flex items-center justify-between border-b border-gray-50 pb-2">
//               <div className="flex items-center gap-2">
//                 <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-500">
//                   <ShoppingCart size={12} className="text-white" />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-xs font-medium text-gray-800">
//                     Sale #1234
//                   </span>
//                   <span className="text-[10px] text-gray-400">Today</span>
//                 </div>
//               </div>
//               <div className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
//                 KES 12,500
//               </div>
//             </div>
//             <div className="flex items-center justify-between text-[10px] text-gray-500">
//               <span>Inventory: 1,234 items</span>
//               <span className="text-blue-600">● Offline Ready</span>
//             </div>
//           </div>
//         </a>
//       </div>

//       {/* DSchools - Middle Column */}
//       <div className="group col-span-4">
//         <a
//           href="/products/dschools"
//           className="block h-full rounded-xl border border-transparent p-4 transition-colors hover:border-gray-100 hover:bg-gray-50"
//         >
//           <div className="mb-4">
//             <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
//               <GraduationCap size={18} />
//             </div>
//             <h3 className="mb-1 text-base font-semibold text-gray-900">
//               DSchools
//             </h3>
//             <p className="text-sm leading-relaxed text-gray-500">
//               Complete multi-school management solution
//             </p>
//           </div>
//           {/* Visual Preview */}
//           <div className="mt-4 space-y-2 rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-shadow group-hover:shadow-md">
//             {[
//               { label: "Students", value: "2,847", color: "bg-green-500" },
//               { label: "Teachers", value: "142", color: "bg-blue-500" },
//               { label: "Classes", value: "48", color: "bg-purple-500" },
//             ].map((stat, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <div className={`h-1.5 w-1.5 rounded-full ${stat.color}`}></div>
//                 <span className="text-[10px] text-gray-500">{stat.label}:</span>
//                 <span className="text-xs font-semibold text-gray-900">
//                   {stat.value}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </a>
//       </div>

//       {/* Lendbox - Right Column */}
//       <div className="group col-span-4">
//         <a
//           href="/products/lendbox"
//           className="block h-full rounded-xl border border-transparent p-4 transition-colors hover:border-gray-100 hover:bg-gray-50"
//         >
//           <div className="mb-4">
//             <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
//               <CreditCard size={18} />
//             </div>
//             <h3 className="mb-1 text-base font-semibold text-gray-900">
//               Lendbox
//             </h3>
//             <p className="text-sm leading-relaxed text-gray-500">
//               Loan management with multi-branch support
//             </p>
//           </div>
//           {/* Visual Preview */}
//           <div className="mt-4 space-y-2 rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-shadow group-hover:shadow-md">
//             <div className="flex items-center justify-between border-b border-gray-50 pb-2">
//               <span className="text-[10px] text-gray-500">Active Loans</span>
//               <span className="text-xs font-bold text-purple-600">342</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-[10px] text-gray-500">Total Disbursed</span>
//               <span className="text-xs font-bold text-gray-900">KES 45.2M</span>
//             </div>
//           </div>
//         </a>
//       </div>

//       {/* Bottom Row - 3 More Products */}
//       <div className="col-span-4 mt-2">
//         <a
//           href="/products/inventory-pro"
//           className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-gray-50"
//         >
//           <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-900 transition-colors group-hover:border-gray-300">
//             <Package size={18} />
//           </div>
//           <div>
//             <h3 className="text-sm font-semibold text-gray-900">
//               Inventory Pro
//             </h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Cloud-based inventory with multi-org & API access
//             </p>
//           </div>
//         </a>
//       </div>

//       <div className="col-span-4 mt-2">
//         <a
//           href="/products/project-pro"
//           className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-gray-50"
//         >
//           <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-900 transition-colors group-hover:border-gray-300">
//             <FolderKanban size={18} />
//           </div>
//           <div>
//             <h3 className="text-sm font-semibold text-gray-900">Project Pro</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Project management with client collaboration & invoicing
//             </p>
//           </div>
//         </a>
//       </div>

//       <div className="col-span-4 mt-2">
//         <a
//           href="/products/kartify"
//           className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-gray-50"
//         >
//           <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-900 transition-colors group-hover:border-gray-300">
//             <Store size={18} />
//           </div>
//           <div>
//             <h3 className="text-sm font-semibold text-gray-900">Kartify</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Multi-vendor marketplace with vendor management
//             </p>
//           </div>
//         </a>
//       </div>
//     </div>
//   );
// }

import {
  ArrowRight,
  CreditCard,
  FolderKanban,
  GraduationCap,
  Package,
  ShoppingCart,
  Sparkles,
  Store,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProductMenu() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-6">
        {/* Point of Sale - Left Column */}
        <div className="group col-span-4">
          <Link
            href="/products/pos"
            className="block rounded-2xl border border-gray-100 bg-white p-6 hover:border-blue-200"
          >
            <div className="mb-5">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <ShoppingCart size={22} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Point of Sale
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Desktop POS with inventory, accounting & offline-first support
              </p>
            </div>

            {/* Enhanced Visual Preview */}
            <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm transition-all duration-300 group-hover:shadow-md">
              {/* Decorative corner accent */}
              <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-blue-500/5 blur-2xl" />

              <div className="relative">
                <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                      <ShoppingCart size={14} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">
                        Sale #1234
                      </span>
                      <span className="text-xs text-gray-500">
                        Today, 2:30 PM
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    KES 12,500
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-600">
                      Inventory:
                    </span>
                    <span className="font-bold text-gray-900">1,234 items</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                    <span className="font-semibold text-blue-600">
                      Offline Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* DSchools - Middle Column */}
        <div className="group col-span-4">
          <Link
            href="/products/dschools"
            className="block rounded-2xl border border-gray-100 bg-white p-6 hover:border-green-200"
          >
            <div className="mb-5">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <GraduationCap size={22} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">DSchools</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Complete multi-school management solution
              </p>
            </div>

            {/* Enhanced Visual Preview */}
            <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm transition-all duration-300 group-hover:shadow-md">
              <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-green-500/5 blur-2xl" />

              <div className="relative space-y-3">
                {[
                  {
                    label: "Students",
                    value: "2,847",
                    color: "from-green-500 to-emerald-600",
                    dotColor: "bg-green-500",
                  },
                  {
                    label: "Teachers",
                    value: "142",
                    color: "from-blue-500 to-blue-600",
                    dotColor: "bg-blue-500",
                  },
                  {
                    label: "Classes",
                    value: "48",
                    color: "from-purple-500 to-purple-600",
                    dotColor: "bg-purple-500",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-gray-50 bg-white p-2 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-2 w-2 rounded-full ${stat.dotColor}`}
                      />
                      <span className="text-xs font-medium text-gray-600">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </div>

        {/* Lendbox - Right Column */}
        <div className="group col-span-4">
          <Link
            href="/products/lendbox"
            className="block rounded-2xl border border-gray-100 bg-white p-6 hover:border-purple-200"
          >
            <div className="mb-5">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CreditCard size={22} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Lendbox</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Loan management with multi-branch support
              </p>
            </div>

            {/* Enhanced Visual Preview */}
            <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm transition-all duration-300 group-hover:shadow-md">
              <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-purple-500/5 blur-2xl" />

              <div className="relative space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-gray-50 bg-white p-2.5 shadow-sm">
                  <span className="text-xs font-medium text-gray-600">
                    Active Loans
                  </span>
                  <span className="text-sm font-bold text-purple-600">342</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-50 bg-white p-2.5 shadow-sm">
                  <span className="text-xs font-medium text-gray-600">
                    Total Disbursed
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    USD 4500
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Row - 3 More Products */}
        <div className="col-span-4">
          <Link
            href="/products/inventory-pro"
            className="group flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-all group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-600">
              <Package size={20} />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-sm font-bold text-gray-900 group-hover:text-gray-900">
                Inventory Pro
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Cloud-based inventory with multi-org & API access
              </p>
            </div>
          </Link>
        </div>

        <div className="col-span-4">
          <Link
            href="/products/project-pro"
            className="group flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-all group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
              <FolderKanban size={20} />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-sm font-bold text-gray-900 group-hover:text-gray-900">
                Project Pro
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Project management with client collaboration & invoicing
              </p>
            </div>
          </Link>
        </div>

        <div className="col-span-4">
          <Link
            href="/products/kartify"
            className="group flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-all group-hover:border-pink-200 group-hover:bg-pink-50 group-hover:text-pink-600">
              <Store size={20} />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-sm font-bold text-gray-900 group-hover:text-gray-900">
                Kartify
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Multi-vendor marketplace with vendor management
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* View All Products Link */}
      <div className="mt-8 flex items-center justify-center border-t border-gray-100 pt-6">
        <Link
          href="/products"
          className="flex items-center justify-around rounded-lg bg-black px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-sm transition-colors hover:bg-gray-800"
        >
          <span>View All Products</span>
        </Link>
      </div>
    </div>
  );
}
