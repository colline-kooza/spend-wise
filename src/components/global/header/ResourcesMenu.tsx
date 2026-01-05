// import {
//   BookOpen,
//   Briefcase,
//   FileText,
//   HelpCircle,
//   Newspaper,
//   Users,
// } from "lucide-react";
// import React from "react";

// export default function ResourcesMenu() {
//   return (
//     <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//       {/* Learn Column */}
//       <div>
//         <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
//           Learn
//         </h3>
//         <div className="space-y-3">
//           <ResourceItem
//             icon={<BookOpen size={18} />}
//             title="Documentation"
//             description="Technical guides and API documentation"
//             href="#"
//           />
//           <ResourceItem
//             icon={<FileText size={18} />}
//             title="Case Studies"
//             description="Success stories from our clients"
//             href="#"
//           />
//           <ResourceItem
//             icon={<Newspaper size={18} />}
//             title="Blog"
//             description="Tech insights and industry trends"
//             href="#"
//           />
//         </div>
//       </div>

//       {/* Support Column */}
//       <div>
//         <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
//           Support
//         </h3>
//         <div className="space-y-3">
//           <ResourceItem
//             icon={<HelpCircle size={18} />}
//             title="Help Center"
//             description="FAQs and troubleshooting guides"
//             href="#"
//           />
//           <ResourceItem
//             icon={<Users size={18} />}
//             title="Community"
//             description="Join our developer community"
//             href="#"
//           />
//           <ResourceItem
//             icon={<Briefcase size={18} />}
//             title="Careers"
//             description="Join the Desishub team"
//             href="#"
//           />
//         </div>
//       </div>

//       {/* Featured Column */}
//       <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
//         <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
//           📚 Latest Resource
//         </div>
//         <h3 className="mb-2 text-base font-semibold text-gray-900">
//           2024 East Africa Tech Report
//         </h3>
//         <p className="mb-4 text-sm text-gray-600">
//           Insights on digital transformation trends and technology adoption
//           across the region.
//         </p>
//         <a
//           href="#"
//           className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700"
//         >
//           Download report →
//         </a>
//       </div>
//     </div>
//   );
// }

// function ResourceItem({
//   icon,
//   title,
//   description,
//   href,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   href: string;
// }) {
//   return (
//     <a
//       href={href}
//       className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
//     >
//       <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-900 transition-colors group-hover:border-gray-300">
//         {icon}
//       </div>
//       <div className="flex-1">
//         <div className="mb-1 text-sm font-semibold text-gray-900 group-hover:text-black">
//           {title}
//         </div>
//         <div className="text-xs leading-relaxed text-gray-500">
//           {description}
//         </div>
//       </div>
//     </a>
//   );
// }

import {
  ArrowRight,
  BookOpen,
  Briefcase,
  FileText,
  HelpCircle,
  Newspaper,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ResourcesMenu() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* Learn Column */}
      <div>
        <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
          Learn
        </h3>
        <div className="space-y-3">
          <ResourceItem
            icon={<BookOpen size={18} />}
            title="Documentation"
            description="Technical guides and API documentation"
            href="#"
          />
          <ResourceItem
            icon={<FileText size={18} />}
            title="Case Studies"
            description="Success stories from our clients"
            href="#"
          />
          <ResourceItem
            icon={<Newspaper size={18} />}
            title="Blog"
            description="Tech insights and industry trends"
            href="/blog"
          />
        </div>
      </div>

      {/* Support Column */}
      <div>
        <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
          Support
        </h3>
        <div className="space-y-3">
          <ResourceItem
            icon={<HelpCircle size={18} />}
            title="Help Center"
            description="FAQs and troubleshooting guides"
            href="#"
          />
          <ResourceItem
            icon={<Users size={18} />}
            title="Community"
            description="Join our developer community"
            href="#"
          />
          <ResourceItem
            icon={<Briefcase size={18} />}
            title="Careers"
            description="Join the Desishub team"
            href="/careers"
          />
        </div>
      </div>

      {/* Featured Column - Enhanced */}
      <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-teal-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative">
          {/* Enhanced badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-3.5 py-1.5 shadow-sm">
            <Sparkles size={14} className="text-green-100" />
            <span className="text-xs font-semibold tracking-wide text-white">
              Latest Resource
            </span>
          </div>

          {/* Title with better hierarchy */}
          <h3 className="mb-2.5 text-lg leading-tight font-bold text-gray-900 transition-colors group-hover:text-green-900">
            2024 East Africa Tech Report
          </h3>

          {/* Description with improved readability */}
          <p className="mb-5 text-sm leading-relaxed text-gray-700">
            Insights on digital transformation trends and technology adoption
            across the region.
          </p>

          {/* Enhanced CTA button */}
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:gap-3"
          >
            <span>Download Report</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Corner accent */}
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-400/20 blur-2xl transition-all duration-300 group-hover:scale-150" />
      </div>
    </div>
  );
}

function ResourceItem({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-900 transition-colors group-hover:border-gray-300">
        {icon}
      </div>
      <div className="flex-1">
        <div className="mb-1 text-sm font-semibold text-gray-900 group-hover:text-black">
          {title}
        </div>
        <div className="text-xs leading-relaxed text-gray-500">
          {description}
        </div>
      </div>
    </Link>
  );
}
