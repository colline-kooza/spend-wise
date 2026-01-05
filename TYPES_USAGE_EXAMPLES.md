# TypeScript Types Usage Examples

Complete guide to using the DesisHub TypeScript types in your Next.js application.

## 📚 Table of Contents

- [Importing Types](#importing-types)
- [Industry Types](#industry-types)
- [Web App Types](#web-app-types)
- [Component Props](#component-props)
- [Page Examples](#page-examples)
- [API Routes](#api-routes)

---

## Importing Types

```typescript
// Import main types
import type { Industry, WebApp } from '@/data';

// Import specific section types
import type {
  SEOMetadata,
  HeroSection,
  FAQ,
  Testimonial,
  Pricing,
  PricingPlan,
  WebAppFeature,
  Integration,
  Comparison,
  TechnicalSpecs,
  TrustSignals
} from '@/data';

// Import helper functions with types
import {
  allIndustries,
  allWebApps,
  getIndustryBySlug,
  getWebAppBySlug,
  getWebAppsByIndustryId,
  search
} from '@/data';
```

---

## Industry Types

### Basic Industry Usage

```typescript
import type { Industry } from '@/data';
import { getIndustryBySlug } from '@/data';

// Get a typed industry
const industry: Industry | undefined = getIndustryBySlug('healthcare-medical-technology');

if (industry) {
  console.log(industry.name); // "Healthcare & Medical Technology"
  console.log(industry.stats); // Array of 4 stats
  console.log(industry.faqs); // Array of 8 FAQs
}
```

### Using Industry Sections

```typescript
import type { Industry, ProblemStatement, Benefit } from '@/data';

function IndustryOverview({ industry }: { industry: Industry }) {
  // Access typed sections
  const problems: ProblemStatement = industry.problemStatement;
  const benefits: Benefit[] = industry.benefits;

  return (
    <div>
      <h2>{problems.title}</h2>
      {problems.problems.map((problem) => (
        <div key={problem.title}>
          <h3>{problem.title}</h3>
          <p>{problem.description}</p>
          <span>{problem.icon}</span>
        </div>
      ))}
    </div>
  );
}
```

---

## Web App Types

### Basic Web App Usage

```typescript
import type { WebApp } from '@/data';
import { getWebAppBySlug } from '@/data';

const app: WebApp | undefined = getWebAppBySlug('patient-management-system');

if (app) {
  console.log(app.name); // "Patient Management System"
  console.log(app.industryId); // 1
  console.log(app.pricing.plans); // Array of 3 pricing plans
  console.log(app.features); // Array of 6 detailed features
}
```

### Using Web App Features

```typescript
import type { WebApp, WebAppFeature } from '@/data';

function FeaturesSection({ app }: { app: WebApp }) {
  return (
    <div>
      {app.features.map((feature: WebAppFeature) => (
        <div key={feature.title}>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
          <span>{feature.icon}</span>
          <ul>
            {feature.benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

---

## Component Props

### Hero Component

```typescript
import type { HeroSection } from '@/data';

interface HeroProps {
  data: HeroSection;
  variant?: 'industry' | 'app';
}

export function Hero({ data, variant = 'industry' }: HeroProps) {
  return (
    <section className="hero">
      <h1>{data.headline}</h1>
      <p>{data.subheadline}</p>
      <a href={data.ctaLink}>{data.ctaText}</a>
      <img src={data.imageUrl} alt={data.headline} />
      {data.videoUrl && (
        <video src={data.videoUrl} controls />
      )}
    </section>
  );
}
```

### Stats Component

```typescript
import type { Stat } from '@/data';

interface StatsProps {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

export function Stats({ stats, columns = 4 }: StatsProps) {
  return (
    <div className={`grid-cols-${columns}`}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
```

### FAQ Component

```typescript
import type { FAQ } from '@/data';

interface FAQProps {
  faqs: FAQ[];
  showAll?: boolean;
}

export function FAQSection({ faqs, showAll = false }: FAQProps) {
  const displayFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <div className="faq-section">
      {displayFaqs.map((faq, idx) => (
        <details key={idx}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
```

### Pricing Component

```typescript
import type { Pricing, PricingPlan } from '@/data';

interface PricingProps {
  pricing: Pricing;
  onSelectPlan?: (planName: string) => void;
}

export function PricingSection({ pricing, onSelectPlan }: PricingProps) {
  return (
    <div>
      <h2>{pricing.model}</h2>
      <p>{pricing.description}</p>

      {pricing.plans && (
        <div className="pricing-grid">
          {pricing.plans.map((plan: PricingPlan) => (
            <div
              key={plan.name}
              className={plan.popular ? 'popular' : ''}
            >
              <h3>{plan.name}</h3>
              <div className="price">{plan.price}</div>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button onClick={() => onSelectPlan?.(plan.name)}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Testimonials Component

```typescript
import type { Testimonial } from '@/data';

interface TestimonialsProps {
  testimonials: Testimonial[];
  layout?: 'grid' | 'carousel';
}

export function Testimonials({ testimonials, layout = 'grid' }: TestimonialsProps) {
  return (
    <div className={`testimonials-${layout}`}>
      {testimonials.map((testimonial, idx) => (
        <div key={idx} className="testimonial-card">
          <p className="quote">{testimonial.quote}</p>
          <div className="author">
            <img src={testimonial.avatar} alt={testimonial.author} />
            <div>
              <div className="name">{testimonial.author}</div>
              <div className="role">{testimonial.role}</div>
              <div className="org">{testimonial.organization}</div>
            </div>
          </div>
          {testimonial.rating && (
            <div className="rating">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
          )}
          {testimonial.verified && (
            <span className="verified">✓ Verified</span>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Comparison Table Component

```typescript
import type { Comparison } from '@/data';

interface ComparisonProps {
  data: Comparison;
}

export function ComparisonTable({ data }: ComparisonProps) {
  return (
    <div>
      <h2>{data.title}</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>DesisHub</th>
            <th>{data.competitors.join(' / ')}</th>
          </tr>
        </thead>
        <tbody>
          {data.advantages.map((point, idx) => (
            <tr key={idx}>
              <td>{point.feature}</td>
              <td className="us">{point.us}</td>
              <td className="them">{point.them}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Page Examples

### Industry Landing Page

```typescript
// app/industries/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Industry } from '@/data';
import {
  allIndustries,
  getIndustryBySlug,
  getWebAppsByIndustryId
} from '@/data';

interface PageProps {
  params: { slug: string };
}

// Generate static paths
export async function generateStaticParams() {
  return allIndustries.map((industry) => ({
    slug: industry.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const industry = getIndustryBySlug(params.slug);

  if (!industry) {
    return {
      title: 'Industry Not Found',
    };
  }

  return {
    title: industry.seo.metaTitle,
    description: industry.seo.metaDescription,
    keywords: industry.seo.keywords,
    openGraph: {
      title: industry.seo.ogTitle,
      description: industry.seo.ogDescription,
      images: [{ url: industry.seo.ogImage }],
    },
  };
}

// Page component
export default function IndustryPage({ params }: PageProps) {
  const industry: Industry | undefined = getIndustryBySlug(params.slug);

  if (!industry) {
    notFound();
  }

  const apps = getWebAppsByIndustryId(industry.id);

  return (
    <main>
      <HeroSection data={industry.hero} />
      <StatsSection stats={industry.stats} />
      <ProblemSection data={industry.problemStatement} />
      <BenefitsSection benefits={industry.benefits} />
      <SolutionsSection apps={apps} />
      <FeaturesSection features={industry.features} />
      <WhoIsThisForSection audiences={industry.whoIsThisFor} />
      <FAQSection faqs={industry.faqs} />
      <TestimonialsSection testimonials={industry.testimonials} />
      <CaseStudiesSection caseStudies={industry.caseStudies} />
      <PricingSection pricing={industry.pricing} />
      <CTASection cta={industry.cta} />
    </main>
  );
}
```

### Web App Landing Page

```typescript
// app/solutions/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { WebApp, Industry } from '@/data';
import {
  allWebApps,
  getWebAppBySlug,
  getIndustryById,
  getRelatedApps
} from '@/data';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allWebApps.map((app) => ({
    slug: app.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const app = getWebAppBySlug(params.slug);

  if (!app) {
    return {
      title: 'App Not Found',
    };
  }

  return {
    title: app.seo.metaTitle,
    description: app.seo.metaDescription,
    keywords: app.seo.keywords,
    openGraph: {
      title: app.seo.ogTitle,
      description: app.seo.ogDescription,
      images: [{ url: app.seo.ogImage }],
    },
  };
}

export default function WebAppPage({ params }: PageProps) {
  const app: WebApp | undefined = getWebAppBySlug(params.slug);

  if (!app) {
    notFound();
  }

  const industry: Industry | undefined = getIndustryById(app.industryId);
  const relatedApps = getRelatedApps(app.id);

  return (
    <main>
      {/* Breadcrumb */}
      {industry && (
        <nav>
          <a href={`/industries/${industry.slug}`}>{industry.name}</a>
          <span>/</span>
          <span>{app.name}</span>
        </nav>
      )}

      <HeroSection data={app.hero} variant="app" />
      <StatsSection stats={app.stats} />
      <ProblemSection data={app.problemStatement} />
      <FeaturesSection features={app.features} />
      <PricingSection pricing={app.pricing} />
      <WhoIsThisForSection audiences={app.whoIsThisFor} />
      <IntegrationsSection integrations={app.integrations} />
      <FAQSection faqs={app.faqs} showAll />
      <TestimonialsSection testimonials={app.testimonials} />
      <CaseStudiesSection caseStudies={app.caseStudies} />
      <ComparisonTable data={app.comparison} />
      <TechnicalSpecsSection specs={app.technicalSpecs} />
      <TrustSignalsSection signals={app.trustSignals} />
      <RelatedAppsSection apps={relatedApps} />
      <CTASection cta={app.cta} />
    </main>
  );
}
```

---

## API Routes

### Search API

```typescript
// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { search } from '@/data';
import type { Industry, WebApp } from '@/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  const results: { industries: Industry[]; webApps: WebApp[] } = search(query);

  return NextResponse.json({
    query,
    results: {
      industries: results.industries.map((i) => ({
        id: i.id,
        name: i.name,
        slug: i.slug,
        description: i.shortDescription,
      })),
      webApps: results.webApps.map((a) => ({
        id: a.id,
        name: a.name,
        slug: a.slug,
        description: a.shortDescription,
        industryId: a.industryId,
      })),
    },
    total: results.industries.length + results.webApps.length,
  });
}
```

### Industry API

```typescript
// app/api/industries/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getIndustryById, getWebAppsByIndustryId } from '@/data';
import type { Industry, WebApp } from '@/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const industry: Industry | undefined = getIndustryById(id);

  if (!industry) {
    return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
  }

  const apps: WebApp[] = getWebAppsByIndustryId(id);

  return NextResponse.json({
    industry,
    apps: apps.map((app) => ({
      id: app.id,
      name: app.name,
      slug: app.slug,
      tagline: app.tagline,
    })),
  });
}
```

---

## Type Guards

```typescript
import type { Industry, WebApp } from '@/data';

// Type guard for Industry
export function isIndustry(obj: unknown): obj is Industry {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'slug' in obj &&
    'name' in obj &&
    'seo' in obj
  );
}

// Type guard for WebApp
export function isWebApp(obj: unknown): obj is WebApp {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'industryId' in obj &&
    'slug' in obj &&
    'name' in obj &&
    'seo' in obj
  );
}

// Usage
const data = getIndustryBySlug('some-slug');

if (isIndustry(data)) {
  // TypeScript knows data is Industry
  console.log(data.benefits);
}
```

---

## Utility Types

```typescript
// Extract only SEO data
type IndustrySEO = Pick<Industry, 'id' | 'slug' | 'name' | 'seo'>;

// Make all fields optional for partial updates
type PartialIndustry = Partial<Industry>;

// Omit sensitive or large fields
type IndustryPreview = Omit<Industry, 'faqs' | 'testimonials' | 'caseStudies'>;

// Create a union type of all slugs
type IndustrySlug = Industry['slug'];
type WebAppSlug = WebApp['slug'];
```

---

## Best Practices

1. **Always use type imports** when only importing types:
   ```typescript
   import type { Industry, WebApp } from '@/data';
   ```

2. **Provide default values** for optional fields:
   ```typescript
   const videoUrl = app.hero.videoUrl ?? '/default-video.mp4';
   ```

3. **Use type guards** when data might be undefined:
   ```typescript
   const industry = getIndustryBySlug(slug);
   if (!industry) return notFound();
   // Now TypeScript knows industry is defined
   ```

4. **Leverage TypeScript's type inference**:
   ```typescript
   // Type is inferred automatically
   const apps = getWebAppsByIndustryId(1); // WebApp[]
   ```

5. **Use satisfies for validation**:
   ```typescript
   const config = {
     industryId: 1,
     showApps: true,
   } satisfies { industryId: number; showApps: boolean };
   ```

---

## Common Patterns

### Loading State with Types

```typescript
import type { Industry } from '@/data';

function IndustryLoader({ slug }: { slug: string }) {
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getIndustryBySlug(slug);
    setIndustry(data ?? null);
    setLoading(false);
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!industry) return <div>Not found</div>;

  return <IndustryDetail industry={industry} />;
}
```

### Generic Component with Types

```typescript
type SectionData = FAQ | Testimonial | Benefit;

interface GenericSectionProps<T extends SectionData> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function GenericSection<T extends SectionData>({
  title,
  items,
  renderItem
}: GenericSectionProps<T>) {
  return (
    <section>
      <h2>{title}</h2>
      {items.map((item, idx) => (
        <div key={idx}>{renderItem(item)}</div>
      ))}
    </section>
  );
}
```

---

**All types are fully documented with JSDoc comments for better IDE support!**
