import dynamic from "next/dynamic";

import Footer from "@/components/global/footer/footer";
import Navbar from "@/components/global/header/Navbar";
import CTABanner from "@/components/pages/home/cta-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const ScrollTop = dynamic(() =>
  import("@/components/scroll-top").then((mod) => mod.ScrollTop)
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <SiteHeader /> */}
      <Navbar />
      <main className="max-w-screen overflow-x-hidden px-2">{children}</main>
      <CTABanner />
      <Footer />
      <ScrollTop />
    </>
  );
}
