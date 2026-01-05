"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-6xl border-t border-slate-100 px-4 py-10 lg:px-0">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4 md:w-1/3">
            <div className="mb-1 mt-1">
           <Link href="/">
             <Image
              src="/logos/logo-3.png"
              alt={` Logo`}
              width={180}
              height={150}
              className="object-contain"
              priority
            />
           </Link>
          </div>
            <p className="text-sm text-slate-500">
              A modern workspace for teams who care about craft, speed, and
              delightful collaboration.
            </p>
          </div>

          <div className="grid flex-1 gap-8 text-sm text-slate-500 sm:grid-cols-3">
            {[
              {
                title: "Product",
                links: ["Overview", "Features", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "News"],
              },
              {
                title: "Resources",
                links: ["Blog", "Help Center", "Contact"],
              },
            ].map((col, i) => (
              <div key={i} className="space-y-3">
                <p className="text-sm font-semibold text-slate-900">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="hover:text-slate-900">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-slate-100 px-4 pt-6 text-xs text-slate-400 lg:px-0">
          <p>© 2025 UXDSHUVO. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-slate-600">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-slate-600">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
