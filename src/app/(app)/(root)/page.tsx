import dayjs from "dayjs";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import Footer from "@/components/global/footer/footer";
import FeaturesSection from "@/components/global/header/Features";
import AddOnServicesSection from "@/components/global/header/Features";
import BentoGrid from "@/components/pages/home/bento";
import CTABanner from "@/components/pages/home/cta-banner";
import Hero from "@/components/pages/home/hero";
import { USER } from "@/data/user";
// import { About } from "@/features/profile/components/about";
// import { Awards } from "@/features/profile/components/awards";
// import { Blog } from "@/features/profile/components/blog";
// import { Brand } from "@/features/profile/components/brand";
// import { Certifications } from "@/features/profile/components/certifications";
// import { Experiences } from "@/features/profile/components/experiences";
// import { Overview } from "@/features/profile/components/overview";
// import { ProfileCover } from "@/features/profile/components/profile-cover";
// import { ProfileHeader } from "@/features/profile/components/profile-header";
// import { Projects } from "@/features/profile/components/projects";
// import { SocialLinks } from "@/features/profile/components/social-links";
// import { TeckStack } from "@/features/profile/components/teck-stack";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-7xl">
        <Hero />
        <BentoGrid />
        {/* <Separator /> */}
        {/* <ProfileHeader /> */}
        {/* <FeaturesSection /> */}
        <AddOnServicesSection />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:4rem_4rem]"></div>

        {/* Bottom CTA and Footer */}
        {/* <Separator /> */}
      </div>
      <div className="">
        {/* <Overview /> */}

        {/* <SocialLinks /> */}

        {/* <About /> */}
        {/* <Separator /> */}

        {/* <TeckStack /> */}
        {/* <Separator /> */}

        {/* <Blog /> */}
        {/* <Separator /> */}

        {/* <Experiences /> */}
        {/* <Separator /> */}

        {/* <Projects /> */}
        {/* <Separator /> */}

        {/* <Awards />
        <Separator /> */}

        {/* <Certifications />
        <Separator /> */}

        {/* <Brand />
        <Separator /> */}
      </div>
    </>
  );
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: dayjs(USER.dateCreated).toISOString(),
    dateModified: dayjs().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  };
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}
