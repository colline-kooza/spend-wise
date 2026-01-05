import {
  ArrowRight,
  Award,
  BarChart2,
  CheckSquare,
  CreditCard,
  Globe,
  Layout,
  LineChart,
  Link as LinkIcon,
  QrCode,
  Search,
  Sliders,
  Users,
} from "lucide-react";
import React from "react";

import {
  AnalyticsChartMockup,
  IntegrationsGridMockup,
  LinksDashboardMockup,
  PartnersDashboardMockup,
} from "./CaseStudies";

export default function FeaturesSection() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* --- Section 1: Short Links --- */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-orange-100 text-orange-600">
                <LinkIcon size={14} />
              </div>
              <span className="text-sm font-semibold text-gray-600">
                Dub Links
              </span>
            </div>
            <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl">
              It starts with a link
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-500">
              Create branded short links with superpowers: built-in QR codes,
              device/geo-targeting, A/B testing, deep links, and more.
            </p>
            <button className="mb-12 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
              Explore Links
            </button>

            {/* Feature Columns */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <FeatureColumn
                icon={<Globe size={18} />}
                title="Custom domains"
                desc="Boost click-through rates by 30% with custom domains that match your brand."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Sliders size={18} />}
                title="Advanced link features"
                desc="Custom link previews, device/geo-targeting, A/B testing, deep links, and more."
                link="Learn more"
              />
              <FeatureColumn
                icon={<QrCode size={18} />}
                title="QR codes"
                desc="Create QR codes that match your brand, automatically generated with each short link."
                link="Learn more"
              />
            </div>
          </div>

          <div className="w-full">
            <LinksDashboardMockup />
          </div>
        </div>
      </section>

      {/* Testimonial 1 */}
      <Testimonial
        quote="What you all have built is fantastic. I've used platforms like Bitly for years, and Dub is hands down the best."
        author="Ian Mackey"
        role="Vice President at Scicomm Media"
        logo={
          <div className="border border-blue-500 px-1 text-[10px] font-bold text-blue-500">
            HUBERMAN LAB
          </div>
        }
        avatar="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
      />

      {/* --- Section 2: Analytics --- */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div className="order-2 w-full lg:order-1">
            <AnalyticsChartMockup />

            {/* Feature Columns for Analytics (Below chart on mobile, or grid) */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <FeatureColumn
                icon={<CheckSquare size={18} />}
                title="Conversion tracking"
                desc="Track your customer journey from first click to final sale."
                link="Learn more"
              />
              <FeatureColumn
                icon={<LineChart size={18} />}
                title="Real-time analytics"
                desc="See clicks, leads, and sales in real-time with full detail."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Search size={18} />}
                title="Customer insights"
                desc="Understand customer journey, LTV, and retention rates."
                link="Learn more"
              />
            </div>
          </div>

          <div className="order-1 max-w-xl lg:order-2">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-600">
                <BarChart2 size={14} />
              </div>
              <span className="text-sm font-semibold text-gray-600">
                Dub Analytics
              </span>
            </div>
            <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl">
              Measure what matters
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-500">
              From first click to conversion, understand exactly how your
              marketing drives revenue with Dub&apos;s powerful attribution
              engine.
            </p>
            <button className="rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
              Explore Analytics
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial 2 */}
      <Testimonial
        quote="Dub has been a game-changer for our marketing campaigns. Our links get tens of millions of clicks monthly – with Dub, we are able to easily design our link previews, attribute clicks, and visualize our data."
        author="Johnny Ho"
        role="Co-founder at Perplexity"
        logo={
          <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
            <span className="text-lg text-cyan-500">✱</span> perplexity
          </div>
        }
        avatar="https://pbs.twimg.com/profile_images/1613606775676354560/tX8X1y7d_400x400.jpg"
      />

      {/* --- Section 3: Integrations --- */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl">
              Connect with your favorite tools
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-500">
              Extend Dub, streamline workflows, and connect your favorite tools,
              with new integrations added constantly.
            </p>
            <button className="rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
              Explore integrations
            </button>
          </div>
          <div className="w-full">
            <IntegrationsGridMockup />
          </div>
        </div>
      </section>

      {/* --- Section 4: Partnerships --- */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-purple-100 text-purple-600">
                <Users size={14} />
              </div>
              <span className="text-sm font-semibold text-gray-600">
                Dub Partners
              </span>
            </div>
            <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl">
              Grow with partnerships
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-500">
              Build powerful, embedded referral/affiliate programs to boost
              product-led growth and increase revenue.
            </p>
            <button className="mb-12 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
              Explore Partners
            </button>

            {/* Feature Columns */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <FeatureColumn
                icon={<CreditCard size={18} />}
                title="1-click global payouts"
                desc="Effortlessly send payouts to partners globally, with tax compliance built in."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Award size={18} />}
                title="Advanced reward structure"
                desc="Customizable commission logic by partner, product, customer country, and more."
                link="Learn more"
              />
              <FeatureColumn
                icon={<Layout size={18} />}
                title="Embedded referral dashboard"
                desc="Seamlessly enroll your users in your referral program directly inside your app."
                link="Learn more"
              />
            </div>
          </div>

          <div className="w-full pt-10">
            <PartnersDashboardMockup />
          </div>
        </div>
      </section>

      {/* Testimonial 3 */}
      <Testimonial
        quote="Dub is the ultimate partner infrastructure for every startup. If you're looking to 10x your community / product-led growth – I cannot recommend building a partner program with Dub enough."
        author="Koen Bok"
        role="CEO at Framer"
        logo={
          <div className="flex items-center gap-1 text-sm font-bold text-black">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 0L0 12h12v12l12-12H12z" />
            </svg>{" "}
            Framer
          </div>
        }
        avatar="https://pbs.twimg.com/profile_images/1460677402011340808/5E1h4_88_400x400.jpg"
        readStory
      />
    </div>
  );
}

function FeatureColumn({
  icon,
  title,
  desc,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  link: string;
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="mb-3 text-gray-900">{icon}</div>
      <h3 className="mb-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mb-3 text-xs leading-relaxed text-gray-500">{desc}</p>
      <a
        href="#"
        className="group flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
      >
        {link}{" "}
        <ArrowRight
          size={10}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </a>
    </div>
  );
}

function Testimonial({
  quote,
  author,
  role,
  logo,
  avatar,
  readStory,
}: {
  quote: string;
  author: string;
  role: string;
  logo: React.ReactNode;
  avatar: string;
  readStory?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl border-t border-b border-gray-100/50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50/50 via-transparent to-transparent px-6 py-20">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <blockquote className="text-xl leading-relaxed font-medium text-gray-800 md:text-2xl">
            “{quote}”
          </blockquote>
          {readStory && (
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-1 rounded-full border border-purple-100 bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              <div className="h-3 w-3">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                </svg>
              </div>{" "}
              Read the story
            </a>
          )}
        </div>
        <div className="flex flex-col items-start gap-4 md:col-span-4 md:items-end">
          <div className="mb-2">{logo}</div>
          <div className="flex items-center gap-3 text-right">
            <div className="flex flex-col items-start md:items-end">
              <span className="text-sm font-semibold text-gray-900">
                {author}
              </span>
              <span className="text-xs text-gray-500">{role}</span>
            </div>
            <img
              src={avatar}
              alt={author}
              className="h-10 w-10 rounded-full border border-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
