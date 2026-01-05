# Web Apps Data - Example Usage in Next.js

This document provides examples of how to use the web apps data in your Next.js application.

## 1. App List Page

```typescript
// app/solutions/page.tsx
import { allWebApps, getPaginatedWebApps } from '@/lib/webApps';
import Link from 'next/link';

export const metadata = {
  title: 'All Solutions | DesisHub',
  description: 'Browse our complete catalog of 60+ business software solutions',
};

export default function SolutionsPage() {
  const { apps, total } = getPaginatedWebApps(1, 60);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Solutions</h1>
      <p className="text-xl text-gray-600 mb-12">
        Explore our {total} comprehensive software solutions
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apps.map((app) => (
          <Link
            key={app.id}
            href={`/solutions/${app.slug}`}
            className="border rounded-lg p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{app.name}</h3>
            <p className="text-gray-600 mb-4">{app.tagline}</p>
            <p className="text-sm text-gray-500">{app.shortDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

## 2. Individual App Page

```typescript
// app/solutions/[slug]/page.tsx
import { getWebAppBySlug, generateWebAppPaths, getRelatedApps } from '@/lib/webApps';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return generateWebAppPaths();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const app = getWebAppBySlug(params.slug);

  if (!app) return {};

  return {
    title: app.seo.metaTitle,
    description: app.seo.metaDescription,
    keywords: app.seo.keywords,
    openGraph: {
      title: app.seo.ogTitle,
      description: app.seo.ogDescription,
      images: [app.seo.ogImage],
    },
  };
}

export default function AppPage({ params }: { params: { slug: string } }) {
  const app = getWebAppBySlug(params.slug);

  if (!app) {
    notFound();
  }

  const relatedApps = getRelatedApps(app.id);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{app.hero.headline}</h1>
          <p className="text-xl mb-8">{app.hero.subheadline}</p>
          <a
            href={app.hero.ctaLink}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            {app.hero.ctaText}
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {app.stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            {app.problemStatement.title}
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            {app.problemStatement.description}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {app.problemStatement.problems.map((problem, index) => (
              <div key={index} className="border rounded-lg p-6">
                <h3 className="font-semibold mb-2">{problem.title}</h3>
                <p className="text-gray-600 text-sm">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {app.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {app.pricing.tiers.map((tier, index) => (
              <div
                key={index}
                className={`border rounded-lg p-8 ${
                  tier.highlighted
                    ? 'border-blue-600 shadow-xl scale-105'
                    : 'border-gray-200'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== 'Custom' && (
                    <span className="text-gray-600">/{tier.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold ${
                    tier.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {app.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.organization}
                    </div>
                  </div>
                  {testimonial.verified && (
                    <span className="ml-auto text-green-500 text-sm">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {app.faqs.map((faq, index) => (
              <details
                key={index}
                className="border rounded-lg p-6 cursor-pointer"
              >
                <summary className="font-semibold text-lg">
                  {faq.question}
                </summary>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of businesses already using {app.name}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={app.cta.primary.link}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              {app.cta.primary.text}
            </a>
            <a
              href={app.cta.secondary.link}
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600"
            >
              {app.cta.secondary.text}
            </a>
          </div>
        </div>
      </section>

      {/* Related Apps */}
      {relatedApps.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Related Solutions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedApps.map((relatedApp) => (
                <Link
                  key={relatedApp.id}
                  href={`/solutions/${relatedApp.slug}`}
                  className="border rounded-lg p-6 hover:shadow-lg transition"
                >
                  <h3 className="font-semibold mb-2">{relatedApp.name}</h3>
                  <p className="text-sm text-gray-600">
                    {relatedApp.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
```

## 3. Industry Page

```typescript
// app/industries/[industryId]/page.tsx
import { getWebAppsByIndustry, getAllIndustryIds } from '@/lib/webApps';
import industries from '@/data/industries.json';
import Link from 'next/link';

export async function generateStaticParams() {
  return getAllIndustryIds().map((id) => ({
    industryId: id.toString(),
  }));
}

export default function IndustryPage({
  params,
}: {
  params: { industryId: string };
}) {
  const industryId = parseInt(params.industryId);
  const apps = getWebAppsByIndustry(industryId);
  const industry = industries.industries.find((i) => i.id === industryId);

  if (!industry) {
    return <div>Industry not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{industry.name}</h1>
      <p className="text-xl text-gray-600 mb-12">{industry.longDescription}</p>

      <h2 className="text-2xl font-bold mb-6">
        Solutions for {industry.name} ({apps.length})
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <Link
            key={app.id}
            href={`/solutions/${app.slug}`}
            className="border rounded-lg p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{app.name}</h3>
            <p className="text-gray-600 mb-4">{app.tagline}</p>
            <p className="text-sm text-gray-500">{app.shortDescription}</p>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Starting at</span>
                <span className="font-semibold text-blue-600">
                  {app.pricing.tiers[0].price}/{app.pricing.tiers[0].period}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

## 4. Search Functionality

```typescript
// app/search/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { searchWebApps, type WebApp } from '@/lib/webApps';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WebApp[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      const searchResults = searchWebApps(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Search Solutions</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for solutions..."
        className="w-full max-w-2xl px-4 py-3 border rounded-lg mb-8"
      />

      {results.length > 0 && (
        <>
          <p className="text-gray-600 mb-6">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((app) => (
              <Link
                key={app.id}
                href={`/solutions/${app.slug}`}
                className="border rounded-lg p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{app.name}</h3>
                <p className="text-gray-600 mb-4">{app.tagline}</p>
                <p className="text-sm text-gray-500">{app.shortDescription}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      {query.length > 2 && results.length === 0 && (
        <p className="text-gray-600">No results found for "{query}"</p>
      )}
    </div>
  );
}
```

## 5. Featured Apps Component

```typescript
// components/FeaturedApps.tsx
import { getFeaturedWebApps } from '@/lib/webApps';
import Link from 'next/link';

export function FeaturedApps() {
  const featuredApps = getFeaturedWebApps(6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Featured Solutions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredApps.map((app) => (
            <Link
              key={app.id}
              href={`/solutions/${app.slug}`}
              className="bg-white rounded-lg p-6 shadow hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{app.name}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="font-semibold">
                    {(
                      app.testimonials.reduce((sum, t) => sum + t.rating, 0) /
                      app.testimonials.length
                    ).toFixed(1)}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{app.shortDescription}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-600 font-semibold">Learn More →</span>
                <span className="text-gray-500">
                  From {app.pricing.tiers[0].price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## 6. API Route Example

```typescript
// app/api/apps/route.ts
import { NextResponse } from 'next/server';
import { allWebApps, searchWebApps } from '@/lib/webApps';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const industryId = searchParams.get('industryId');

  let apps = allWebApps;

  // Filter by search query
  if (query) {
    apps = searchWebApps(query);
  }

  // Filter by industry
  if (industryId) {
    const id = parseInt(industryId);
    apps = apps.filter((app) => app.industryId === id);
  }

  return NextResponse.json({
    apps,
    total: apps.length,
  });
}
```

---

These examples demonstrate various ways to integrate and use the web apps data in your Next.js application. You can customize and extend these examples based on your specific needs.
