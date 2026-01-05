// Helper utilities for working with web apps data

import webApps1 from '@/data/web-apps-1.json';
import webApps2 from '@/data/web-apps-2.json';
import webApps3 from '@/data/web-apps-3.json';
import webApps4 from '@/data/web-apps-4.json';
import webApps5 from '@/data/web-apps-5.json';
import webApps6 from '@/data/web-apps-6.json';

// Combine all apps into a single array
export const allWebApps = [
  ...webApps1.apps,
  ...webApps2.apps,
  ...webApps3.apps,
  ...webApps4.apps,
  ...webApps5.apps,
  ...webApps6.apps,
];

// Type definitions
export interface WebApp {
  id: number;
  industryId: number;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    imageUrl: string;
    videoUrl?: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  problemStatement: {
    title: string;
    description: string;
    problems: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  features: Array<{
    title: string;
    description: string;
    icon: string;
    benefits: string[];
  }>;
  pricing: {
    tiers: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      cta: string;
      highlighted: boolean;
    }>;
  };
  whoIsThisFor: Array<{
    title: string;
    description: string;
    benefits: string[];
  }>;
  integrations: Array<{
    category: string;
    items: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    organization: string;
    avatar: string;
    rating: number;
    verified: boolean;
  }>;
  caseStudies: Array<{
    title: string;
    summary: string;
    metrics: Record<string, string>;
    link: string;
  }>;
  comparison: {
    title: string;
    advantages: Array<{
      feature: string;
      us: string;
      competitors: string;
    }>;
  };
  relatedApps: number[];
  relatedBlogs: string[];
  technicalSpecs: {
    security: string[];
    performance: string[];
    integrations: string[];
    compliance: string[];
  };
  trustSignals: {
    certifications: string[];
    awards: string[];
    customers: string;
    yearsInBusiness: string;
  };
  cta: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
    tertiary: {
      text: string;
      link: string;
    };
  };
}

/**
 * Get a single web app by ID
 */
export function getWebAppById(id: number): WebApp | undefined {
  return allWebApps.find((app) => app.id === id);
}

/**
 * Get a single web app by slug
 */
export function getWebAppBySlug(slug: string): WebApp | undefined {
  return allWebApps.find((app) => app.slug === slug);
}

/**
 * Get all web apps for a specific industry
 */
export function getWebAppsByIndustry(industryId: number): WebApp[] {
  return allWebApps.filter((app) => app.industryId === industryId);
}

/**
 * Get related apps for a specific app
 */
export function getRelatedApps(appId: number): WebApp[] {
  const app = getWebAppById(appId);
  if (!app) return [];

  return app.relatedApps
    .map((id) => getWebAppById(id))
    .filter((app): app is WebApp => app !== undefined);
}

/**
 * Search web apps by keyword
 */
export function searchWebApps(query: string): WebApp[] {
  const lowercaseQuery = query.toLowerCase();

  return allWebApps.filter(
    (app) =>
      app.name.toLowerCase().includes(lowercaseQuery) ||
      app.shortDescription.toLowerCase().includes(lowercaseQuery) ||
      app.longDescription.toLowerCase().includes(lowercaseQuery) ||
      app.seo.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowercaseQuery)
      )
  );
}

/**
 * Get all unique industry IDs
 */
export function getAllIndustryIds(): number[] {
  const industryIds = allWebApps.map((app) => app.industryId);
  return Array.from(new Set(industryIds)).sort((a, b) => a - b);
}

/**
 * Get total count of web apps
 */
export function getTotalWebApps(): number {
  return allWebApps.length;
}

/**
 * Get paginated web apps
 */
export function getPaginatedWebApps(
  page: number = 1,
  perPage: number = 12
): {
  apps: WebApp[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
} {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const apps = allWebApps.slice(start, end);

  return {
    apps,
    total: allWebApps.length,
    page,
    perPage,
    totalPages: Math.ceil(allWebApps.length / perPage),
  };
}

/**
 * Get featured web apps (apps with highest ratings in testimonials)
 */
export function getFeaturedWebApps(limit: number = 6): WebApp[] {
  return allWebApps
    .sort((a, b) => {
      const avgRatingA =
        a.testimonials.reduce((sum, t) => sum + t.rating, 0) /
        a.testimonials.length;
      const avgRatingB =
        b.testimonials.reduce((sum, t) => sum + t.rating, 0) /
        b.testimonials.length;
      return avgRatingB - avgRatingA;
    })
    .slice(0, limit);
}

/**
 * Generate static paths for all web apps (for Next.js SSG)
 */
export function generateWebAppPaths() {
  return allWebApps.map((app) => ({
    params: {
      slug: app.slug,
    },
  }));
}

/**
 * Get web apps grouped by industry
 */
export function getWebAppsGroupedByIndustry(): Record<number, WebApp[]> {
  return allWebApps.reduce((acc, app) => {
    if (!acc[app.industryId]) {
      acc[app.industryId] = [];
    }
    acc[app.industryId].push(app);
    return acc;
  }, {} as Record<number, WebApp[]>);
}

/**
 * Get pricing range across all apps
 */
export function getPricingStats() {
  const allPrices = allWebApps.flatMap((app) =>
    app.pricing.tiers
      .map((tier) => tier.price)
      .filter((price) => price !== 'Custom')
      .map((price) => parseInt(price.replace(/\D/g, '')))
  );

  return {
    min: Math.min(...allPrices),
    max: Math.max(...allPrices),
    avg: Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length),
  };
}

// Export the raw data objects as well
export { webApps1, webApps2, webApps3, webApps4, webApps5, webApps6 };
