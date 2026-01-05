// Data aggregator for all industries and web apps
// This file provides easy access to all distributed data files

import industries1 from "./industries-1.json";
import industries2 from "./industries-2.json";
import industries3 from "./industries-3.json";
import webApps1 from "./web-apps-1.json";
import webApps2 from "./web-apps-2.json";
import webApps3 from "./web-apps-3.json";
import webApps4 from "./web-apps-4.json";
import webApps5 from "./web-apps-5.json";
import webApps6 from "./web-apps-6.json";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// SEO Metadata Types
export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

// Hero Section Types
export interface HeroSection {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  videoUrl?: string;
}

// Stat/Metric Types
export interface Stat {
  value: string;
  label: string;
}

// Problem Statement Types
export interface Problem {
  title: string;
  description: string;
  icon: string;
}

export interface ProblemStatement {
  title: string;
  description: string;
  problems: Problem[];
}

// Solutions Types
export interface Solutions {
  title: string;
  description: string;
  totalApps: number;
  appIds: number[];
}

// Benefit Types
export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

// Who Is This For Types
export interface TargetAudience {
  title: string;
  description: string;
  icon: string;
  benefits?: string[];
}

// Feature Category Types
export interface FeatureCategory {
  category: string;
  items: string[];
}

// FAQ Types
export interface FAQ {
  question: string;
  answer: string;
}

// Testimonial Types
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  avatar: string;
  rating?: number;
  verified?: boolean;
}

// Case Study Types
export interface CaseStudy {
  title: string;
  summary: string;
  link: string;
  image?: string;
  results?: Record<string, string>;
}

// Pricing Types
export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface Pricing {
  model: string;
  startingPrice?: string;
  description: string;
  features: string[];
  plans?: PricingPlan[];
  moneyBackGuarantee?: string;
  freeTrial?: string;
}

// CTA Types
export interface CTA {
  text: string;
  link: string;
}

export interface CTASection {
  primary: CTA;
  secondary: CTA;
  tertiary?: CTA;
}

// ============================================================================
// INDUSTRY TYPE
// ============================================================================

export interface Industry {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  seo: SEOMetadata;
  hero: HeroSection;
  stats: Stat[];
  problemStatement: ProblemStatement;
  solutions: Solutions;
  benefits: Benefit[];
  whoIsThisFor: TargetAudience[];
  features: FeatureCategory[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  caseStudies: CaseStudy[];
  pricing: Pricing;
  relatedBlogs: string[];
  cta: CTASection;
}

// ============================================================================
// WEB APP TYPES
// ============================================================================

// Integration Types
export interface Integration {
  name: string;
  providers: string[];
  icon: string;
}

// Feature Types (for Web Apps - more detailed than Industry features)
export interface WebAppFeature {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

// Comparison Types
export interface ComparisonPoint {
  feature: string;
  us: string;
  them: string;
}

export interface Comparison {
  title: string;
  competitors: string[];
  advantages: ComparisonPoint[];
}

// Technical Specs Types
export interface TechnicalSpecs {
  deployment: string[];
  security: string[];
  uptime?: string;
  dataBackup?: string;
  browsers?: string[];
  mobileApps?: string[];
  videoQuality?: string;
  minimumBandwidth?: string;
}

// Trust Signals Types
export interface TrustSignals {
  certifications: string[];
  customers: string;
  yearsInBusiness?: string;
  customerSatisfaction: string;
  consultations?: string;
}

// Video Testimonial Types
export interface VideoTestimonial {
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
}

// Web App Main Interface
export interface WebApp {
  id: number;
  industryId: number;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  seo: SEOMetadata;
  hero: HeroSection;
  stats: Stat[];
  problemStatement: ProblemStatement;
  features: WebAppFeature[];
  pricing: Pricing;
  whoIsThisFor: TargetAudience[];
  integrations: Integration[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  caseStudies: CaseStudy[];
  comparison: Comparison;
  relatedApps: number[];
  relatedBlogs: string[];
  videoTestimonials?: VideoTestimonial[];
  technicalSpecs: TechnicalSpecs;
  cta: CTASection;
  trustSignals: TrustSignals;
}

// ============================================================================
// HELPER RETURN TYPES
// ============================================================================

export interface IndustryWithApps {
  industry: Industry | undefined;
  apps: WebApp[];
}

// ============================================================================
// DATA AGGREGATION
// ============================================================================

// Aggregate all industries
export const allIndustries: Industry[] = [
  ...industries1.industries,
  ...industries2.industries,
  ...industries3.industries,
] as Industry[];

// Aggregate all web apps
export const allWebApps: WebApp[] = [
  ...webApps1.apps,
  ...webApps2.apps,
  ...webApps3.apps,
  ...webApps4.apps,
  ...webApps5.apps,
  ...webApps6.apps,
] as WebApp[];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get an industry by its slug
 * @param slug - The URL-friendly slug (e.g., "healthcare-medical-technology")
 * @returns The industry object or undefined if not found
 */
export const getIndustryBySlug = (slug: string): Industry | undefined => {
  return allIndustries.find((industry) => industry.slug === slug);
};

/**
 * Get an industry by its ID
 * @param id - The industry ID (1-10)
 * @returns The industry object or undefined if not found
 */
export const getIndustryById = (id: number): Industry | undefined => {
  return allIndustries.find((industry) => industry.id === id);
};

/**
 * Get a web app by its slug
 * @param slug - The URL-friendly slug (e.g., "patient-management-system")
 * @returns The web app object or undefined if not found
 */
export const getWebAppBySlug = (slug: string): WebApp | undefined => {
  return allWebApps.find((app) => app.slug === slug);
};

/**
 * Get a web app by its ID
 * @param id - The web app ID (1-60)
 * @returns The web app object or undefined if not found
 */
export const getWebAppById = (id: number): WebApp | undefined => {
  return allWebApps.find((app) => app.id === id);
};

/**
 * Get all web apps for a specific industry
 * @param industryId - The industry ID (1-10)
 * @returns Array of web apps belonging to the industry
 */
export const getWebAppsByIndustryId = (industryId: number): WebApp[] => {
  return allWebApps.filter((app) => app.industryId === industryId);
};

/**
 * Get an industry along with all its web apps
 * @param industryId - The industry ID (1-10)
 * @returns Object containing the industry and its apps
 */
export const getIndustryWithApps = (industryId: number): IndustryWithApps => {
  const industry = getIndustryById(industryId);
  const apps = getWebAppsByIndustryId(industryId);
  return { industry, apps };
};

/**
 * Get related web apps for a given app (excluding the app itself)
 * @param appId - The web app ID
 * @param limit - Maximum number of related apps to return (default: 3)
 * @returns Array of related web apps
 */
export const getRelatedApps = (appId: number, limit: number = 3): WebApp[] => {
  const app = getWebAppById(appId);
  if (!app) return [];

  // First try to get apps from the same industry
  const sameIndustryApps = getWebAppsByIndustryId(app.industryId)
    .filter((a) => a.id !== appId)
    .slice(0, limit);

  return sameIndustryApps;
};

/**
 * Search industries and web apps by keyword
 * @param query - Search query
 * @returns Object containing matching industries and web apps
 */
export const search = (
  query: string
): { industries: Industry[]; webApps: WebApp[] } => {
  const lowerQuery = query.toLowerCase();

  const matchingIndustries = allIndustries.filter(
    (industry) =>
      industry.name.toLowerCase().includes(lowerQuery) ||
      industry.shortDescription.toLowerCase().includes(lowerQuery) ||
      industry.seo.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowerQuery)
      )
  );

  const matchingWebApps = allWebApps.filter(
    (app) =>
      app.name.toLowerCase().includes(lowerQuery) ||
      app.shortDescription.toLowerCase().includes(lowerQuery) ||
      app.seo.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowerQuery)
      )
  );

  return { industries: matchingIndustries, webApps: matchingWebApps };
};

// Export metadata
export const metadata = {
  totalIndustries: allIndustries.length,
  totalWebApps: allWebApps.length,
  lastUpdated: "January 2026",
  version: "2.0",
};

// Default export for convenience
export default {
  industries: allIndustries,
  webApps: allWebApps,
  getIndustryBySlug,
  getIndustryById,
  getWebAppBySlug,
  getWebAppById,
  getWebAppsByIndustryId,
  getIndustryWithApps,
  metadata,
};
