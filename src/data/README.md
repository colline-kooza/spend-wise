# DesisHub Data Structure

Complete SEO-optimized data for all industries and web applications.

## 📁 File Structure

### Industries (10 total, distributed across 3 files)

```
src/data/
├── industries-1.json (3 industries: Healthcare, FinTech, EdTech)
├── industries-2.json (3 industries: Real Estate, E-Commerce, HR)
└── industries-3.json (4 industries: Sales & Marketing, Project Mgmt, Manufacturing, Hospitality)
```

### Web Apps (60 total, distributed across 6 files)

```
src/data/
├── web-apps-1.json (Apps 1-10: Healthcare + FinTech)
├── web-apps-2.json (Apps 11-20: FinTech + EdTech + Real Estate)
├── web-apps-3.json (Apps 21-30: Real Estate + E-Commerce)
├── web-apps-4.json (Apps 31-40: HR + Sales & Marketing)
├── web-apps-5.json (Apps 41-50: Sales & Marketing + Project Mgmt + Manufacturing)
└── web-apps-6.json (Apps 51-60: Manufacturing + Hospitality)
```

### Aggregator

```
src/data/
└── index.ts (Combines all data files with helper functions)
```

## 🎯 Industry Data Structure

Each industry includes:

- **Core Info**: id, slug, name, tagline, descriptions
- **SEO**: metaTitle, metaDescription, keywords (10), OG tags
- **Hero**: headline, subheadline, CTA, image
- **Stats**: 4 key metrics
- **Problems**: 4 common challenges
- **Solutions**: Overview + app IDs
- **Benefits**: 6 key benefits
- **Who Is This For**: 5 target audiences
- **Features**: 4 categories with 6 items each
- **FAQs**: 8 comprehensive questions
- **Testimonials**: 3 customer stories
- **Case Studies**: 2 success stories
- **Pricing**: Model, starting price, features
- **Related Content**: 4 blog links
- **CTAs**: Primary & secondary

## 🚀 Web App Data Structure

Each web app includes:

- **Core Info**: id, industryId, slug, name, tagline, descriptions
- **SEO**: Complete metadata with 12 keywords
- **Hero**: headline, subheadline, CTA, image, video
- **Stats**: 4 key metrics
- **Problems**: 4 pain points
- **Features**: 6 detailed features (each with 5 benefits)
- **Pricing**: 3 tiers (Starter, Professional, Enterprise)
- **Who Is This For**: 4 target audiences (each with 3 benefits)
- **Integrations**: 4 categories
- **FAQs**: 10 comprehensive questions
- **Testimonials**: 3 verified reviews with ratings
- **Case Studies**: 1-2 with specific results
- **Comparison**: vs competitors (5 points)
- **Technical Specs**: Deployment, security, compatibility
- **Trust Signals**: Certifications, customers, ratings
- **CTAs**: 3 levels (primary, secondary, tertiary)
- **Related Content**: 3 apps + 4 blogs

## 💻 Usage in Next.js

### Import All Data

```typescript
import data from '@/data';

// Access all industries
const industries = data.industries; // 10 industries

// Access all web apps
const webApps = data.webApps; // 60 apps

// Get metadata
console.log(data.metadata);
// { totalIndustries: 10, totalWebApps: 60, lastUpdated: 'January 2026' }
```

### Get Specific Data

```typescript
import {
  getIndustryBySlug,
  getWebAppBySlug,
  getWebAppsByIndustryId,
  getIndustryWithApps
} from '@/data';

// Get industry by slug
const healthcare = getIndustryBySlug('healthcare-medical-technology');

// Get web app by slug
const patientMgmt = getWebAppBySlug('patient-management-system');

// Get all apps for an industry
const healthcareApps = getWebAppsByIndustryId(1); // Returns 6 apps

// Get industry with its apps
const { industry, apps } = getIndustryWithApps(1);
```

### Industry Landing Page

```typescript
// app/industries/[slug]/page.tsx
import { getIndustryBySlug, getWebAppsByIndustryId } from '@/data';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug);

  if (!industry) return {};

  return {
    title: industry.seo.metaTitle,
    description: industry.seo.metaDescription,
    keywords: industry.seo.keywords,
    openGraph: {
      title: industry.seo.ogTitle,
      description: industry.seo.ogDescription,
      images: [industry.seo.ogImage],
    },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug);
  const apps = getWebAppsByIndustryId(industry?.id || 0);

  if (!industry) notFound();

  return (
    <>
      <HeroSection data={industry.hero} />
      <StatsSection data={industry.stats} />
      <ProblemSection data={industry.problemStatement} />
      <BenefitsSection data={industry.benefits} />
      <AppsSection apps={apps} />
      <FeaturesSection data={industry.features} />
      <FAQSection data={industry.faqs} />
      <TestimonialsSection data={industry.testimonials} />
      <CTASection data={industry.cta} />
    </>
  );
}
```

### Web App Landing Page

```typescript
// app/solutions/[slug]/page.tsx
import { getWebAppBySlug, getIndustryById } from '@/data';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
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

export default function WebAppPage({ params }: { params: { slug: string } }) {
  const app = getWebAppBySlug(params.slug);
  const industry = getIndustryById(app?.industryId || 0);

  if (!app) notFound();

  return (
    <>
      <HeroSection data={app.hero} />
      <StatsSection data={app.stats} />
      <ProblemSection data={app.problemStatement} />
      <FeaturesSection data={app.features} />
      <PricingSection data={app.pricing} />
      <IntegrationsSection data={app.integrations} />
      <FAQSection data={app.faqs} />
      <TestimonialsSection data={app.testimonials} />
      <ComparisonSection data={app.comparison} />
      <CTASection data={app.cta} />
    </>
  );
}
```

### Generate Static Params

```typescript
// app/industries/[slug]/page.tsx
import { allIndustries } from '@/data';

export async function generateStaticParams() {
  return allIndustries.map((industry) => ({
    slug: industry.slug,
  }));
}
```

```typescript
// app/solutions/[slug]/page.tsx
import { allWebApps } from '@/data';

export async function generateStaticParams() {
  return allWebApps.map((app) => ({
    slug: app.slug,
  }));
}
```

## 🔗 Industry to Apps Mapping

| Industry ID | Industry Name | App IDs |
|-------------|---------------|---------|
| 1 | Healthcare & Medical Technology | 1-6 |
| 2 | Financial Technology (FinTech) | 7-12 |
| 3 | Education Technology (EdTech) | 13-18 |
| 4 | Real Estate & Property Technology | 19-24 |
| 5 | E-Commerce & Retail | 25-30 |
| 6 | Human Resources & Recruitment | 31-36 |
| 7 | Sales & Marketing | 37-42 |
| 8 | Project Management & Collaboration | 43-48 |
| 9 | Manufacturing & Supply Chain | 49-54 |
| 10 | Hospitality & Travel | 55-60 |

## 📊 SEO Benefits

### Complete Metadata
- Every page has optimized titles, descriptions, and keywords
- Open Graph tags for social media sharing
- Structured data ready for schema markup

### Rich Content
- FAQs for featured snippets
- Testimonials for social proof
- Case studies with specific results
- Problem-solution framework

### Internal Linking
- Related apps cross-link
- Related blogs for content marketing
- Industry-to-app navigation

### Conversion Optimization
- Multiple CTAs (primary, secondary, tertiary)
- Trust signals (certifications, customer counts)
- Social proof (testimonials, ratings)
- Clear pricing and features

## 🎨 Component Examples

Create reusable components for each section:

```typescript
// components/HeroSection.tsx
interface HeroProps {
  data: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    imageUrl: string;
    videoUrl?: string;
  };
}

export function HeroSection({ data }: HeroProps) {
  return (
    <section className="hero">
      <h1>{data.headline}</h1>
      <p>{data.subheadline}</p>
      <a href={data.ctaLink}>{data.ctaText}</a>
      <img src={data.imageUrl} alt={data.headline} />
    </section>
  );
}
```

## 📈 Analytics & Tracking

Track user interactions on landing pages:

```typescript
// Track CTA clicks
<button onClick={() => trackEvent('cta_click', {
  page: 'industry',
  industry: industry.slug,
  cta: 'primary'
})}>
  {industry.cta.primary.text}
</button>

// Track app views
useEffect(() => {
  trackPageView({
    page: 'web_app',
    app: app.slug,
    industry: industry.slug
  });
}, []);
```

## 🚀 Deployment Checklist

- [ ] All 10 industries have landing pages
- [ ] All 60 apps have landing pages
- [ ] SEO metadata is properly rendered
- [ ] Open Graph images are uploaded
- [ ] Internal links are working
- [ ] CTAs are tracked
- [ ] Mobile responsive
- [ ] Page speed optimized
- [ ] Sitemap includes all pages
- [ ] Schema markup added

## 📝 Maintenance

### Adding New Industries
1. Add to appropriate industries-{n}.json file
2. Ensure unique id and slug
3. Update index.ts if needed

### Adding New Apps
1. Add to appropriate web-apps-{n}.json file
2. Ensure unique id, industryId, and slug
3. Update related apps references

### Updating Content
- Edit JSON files directly
- Run validation (if available)
- Test locally before deploying

## 🔍 File Sizes

- **industries-1.json**: 37KB
- **industries-2.json**: 30KB
- **industries-3.json**: 38KB
- **web-apps-1.json**: 190KB
- **web-apps-2.json**: 190KB
- **web-apps-3.json**: 190KB
- **web-apps-4.json**: 190KB
- **web-apps-5.json**: 192KB
- **web-apps-6.json**: 190KB

**Total**: ~1.2MB of SEO-optimized content data

## 🎯 Success Metrics

Track these metrics for landing page success:

- **SEO**: Organic traffic, keyword rankings, featured snippets
- **Engagement**: Time on page, scroll depth, video views
- **Conversion**: CTA clicks, trial signups, demo requests
- **Social**: Social shares, backlinks
- **User Feedback**: Bounce rate, exit pages

---

Built with ❤️ for DesisHub | Last Updated: January 2026
