// const ScrollTop = dynamic(() =>
//   import("@/components/scroll-top").then((mod) => mod.ScrollTop)
// );

import Footer from "@/components/pages/home/site-footer";
import { Header } from "@/components/pages/home/site-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <Header />
      <main className="max-w-screen overflow-x-hidden px-2">{children}</main>
      <Footer />
    </div>
  );
}
