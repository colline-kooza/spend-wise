// import {
//   BriefcaseConveyorBelt,
//   Feather,
//   HandCoins,
//   MenuIcon,
//   Workflow,
// } from "lucide-react";
// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetFooter,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// export function Header() {
//   const navLinks = [
//     {
//       label: "Features",
//       href: "/features",
//       icon: <Feather />,
//     },
//     {
//       label: "Use cases",
//       href: "/use-cases",
//       icon: <BriefcaseConveyorBelt />,
//     },
//     {
//       label: "Pricing",
//       href: "/pricing",
//       icon: <HandCoins />,
//     },
//     {
//       label: "Integrations",
//       href: "/integrations",
//       icon: <Workflow />,
//     },
//   ];
//   return (
//     <>
//       <header className="hidden w-full border-b border-slate-100 md:block">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="flex items-center justify-between py-4">
//             {/* Brand */}
//             <div className="flex items-center">
//               <Link
//                 href="/"
//                 className="text-2xl font-bold tracking-tight text-slate-900"
//               >
//                 Spend Wise
//               </Link>
//               <span className="ml-3 text-slate-300">•</span>
//             </div>

//             {/* Navigation */}
//             <nav className="hidden items-center gap-8 md:flex">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.label}
//                   href={link.href}
//                   className="text-sm font-medium text-slate-700 hover:text-slate-900"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>

//             {/* Auth Buttons */}
//             <div className="flex items-center gap-4">
//               <Link
//                 href="/login"
//                 className="text-sm font-medium text-slate-700 hover:text-slate-900"
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/signup"
//                 className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
//               >
//                 Create an account
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/*Mobile version*/}
//       <header className="block w-full border-b border-slate-100 md:hidden">
//         <div className="mx-auto max-w-7xl px-3 md:px-6 lg:px-8">
//           <div className="container mx-auto flex items-center justify-between py-2">
//             {/* Brand */}
//             <div className="flex items-center">
//               <Link
//                 href="/"
//                 className="text-xl font-bold tracking-tight text-slate-900"
//               >
//                 Spend Wise
//               </Link>
//               <span className="ml-3 text-slate-300">•</span>
//             </div>

//             <div className="flex items-center gap-3.5">
//               <div className="flex items-center gap-4">
//                 <Link
//                   href="/login"
//                   className="text-sm font-medium text-slate-700 hover:text-slate-900"
//                 >
//                   Login
//                 </Link>
//               </div>

//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
//                   >
//                     <MenuIcon className="h-5 w-5 text-white" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="top" className="h-[12rem] bg-white">
//                   {navLinks.map((btn, i) => {
//                     return (
//                       <SheetClose key={i} asChild>
//                         <Link
//                           className={`focus-visible:ring-opacity-50 flex items-center gap-3 space-x-3 rounded-lg px-3 py-2 text-black transition duration-150 ease-in-out hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500`}
//                           href={btn.href}
//                         >
//                           {btn.icon}
//                           {btn.label}
//                         </Link>
//                       </SheetClose>
//                     );
//                   })}
//                   <SheetFooter></SheetFooter>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }

import {
  BriefcaseConveyorBelt,
  Feather,
  HandCoins,
  MenuIcon,
  Workflow,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const navLinks = [
    {
      label: "Features",
      href: "/features",
      icon: <Feather />,
    },
    {
      label: "Use cases",
      href: "/use-cases",
      icon: <BriefcaseConveyorBelt />,
    },
    {
      label: "Pricing",
      href: "/pricing",
      icon: <HandCoins />,
    },
    {
      label: "Integrations",
      href: "/integrations",
      icon: <Workflow />,
    },
  ];
  return (
    <>
      <header className="fixed top-0 z-50 hidden w-full border-b border-slate-100 bg-white md:block">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Brand */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight text-slate-900"
              >
                Spend Wise
              </Link>
              <span className="ml-3 text-slate-300">•</span>
            </div>

            {/* Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/*Mobile version*/}
      <header className="fixed top-0 z-50 block w-full border-b border-slate-100 bg-white md:hidden">
        <div className="mx-auto max-w-7xl px-3 md:px-6 lg:px-8">
          <div className="container mx-auto flex items-center justify-between py-2">
            {/* Brand */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold tracking-tight text-slate-900"
              >
                Spend Wise
              </Link>
              <span className="ml-3 text-slate-300">•</span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Login
                </Link>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
                  >
                    <MenuIcon className="h-5 w-5 text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-[12rem] bg-white">
                  {navLinks.map((btn, i) => {
                    return (
                      <SheetClose key={i} asChild>
                        <Link
                          className={`focus-visible:ring-opacity-50 flex items-center gap-3 space-x-3 rounded-lg px-3 py-2 text-black transition duration-150 ease-in-out hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500`}
                          href={btn.href}
                        >
                          {btn.icon}
                          {btn.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                  <SheetFooter></SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
