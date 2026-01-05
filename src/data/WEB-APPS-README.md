# Web Apps JSON Data Files

## Overview

This directory contains 6 comprehensive JSON files with data for 60 web applications across 10 different industries. Each app includes complete SEO metadata, features, pricing, FAQs, testimonials, and more.

## Files

- **web-apps-1.json** - Apps 1-10 (Healthcare: 1-6, FinTech: 7-10)
- **web-apps-2.json** - Apps 11-20 (FinTech: 11-12, EdTech: 13-18, Real Estate: 19-20)
- **web-apps-3.json** - Apps 21-30 (Real Estate: 21-24, E-Commerce: 25-30)
- **web-apps-4.json** - Apps 31-40 (HR: 31-36, Sales & Marketing: 37-40)
- **web-apps-5.json** - Apps 41-50 (Sales & Marketing: 41-42, Project Mgmt: 43-48, Manufacturing: 49-50)
- **web-apps-6.json** - Apps 51-60 (Manufacturing: 51-54, Hospitality: 55-60)

## Complete App Structure

Each app contains:

### Basic Information
- `id` - Unique identifier (1-60)
- `industryId` - Associated industry (1-10)
- `slug` - URL-friendly identifier
- `name` - Full application name
- `tagline` - Marketing tagline
- `shortDescription` - Brief summary
- `longDescription` - Detailed description

### SEO Data
- `metaTitle` - SEO title tag
- `metaDescription` - SEO meta description
- `keywords` - Array of 12 SEO keywords
- `ogTitle` - Open Graph title
- `ogDescription` - Open Graph description
- `ogImage` - Open Graph image path

### Hero Section
- `headline` - Main headline
- `subheadline` - Supporting headline
- `ctaText` - Call-to-action button text
- `ctaLink` - CTA destination URL
- `imageUrl` - Hero image path
- `videoUrl` - Demo video URL

### Statistics
- Array of 4 key metrics with values and labels

### Problem Statement
- `title` - Section title
- `description` - Overview
- `problems` - Array of 4 problems (title, description, icon)

### Features
- Array of 6 detailed features
- Each feature includes:
  - `title` - Feature name
  - `description` - Feature description
  - `icon` - Icon name
  - `benefits` - Array of 5 specific benefits

### Pricing
- `tiers` - Array of 3 pricing plans:
  - **Starter** - Entry-level plan
  - **Professional** - Mid-tier plan (highlighted)
  - **Enterprise** - Custom pricing
- Each tier includes:
  - `name`, `price`, `period`, `description`
  - `features` - Array of 10 features
  - `cta` - Call-to-action text
  - `highlighted` - Boolean for emphasis

### Target Audience
- `whoIsThisFor` - Array of 4 audience segments
- Each segment includes:
  - `title` - Audience type
  - `description` - Overview
  - `benefits` - Array of 3 specific benefits

### Integrations
- Array of 4 integration categories
- Each category includes:
  - `category` - Category name
  - `items` - Array of integration names

### FAQs
- Array of 10 comprehensive Q&A pairs
- Each FAQ includes:
  - `question` - Common question
  - `answer` - Detailed answer (150-300 words)

### Social Proof
- `testimonials` - Array of 3 customer testimonials
  - Includes: quote, author, role, organization, avatar, rating, verified status
- `caseStudies` - Array of 2 case studies
  - Includes: title, summary, metrics, link

### Comparison
- `comparison` - Competitive advantages
- Array of 5 comparison points
- Each includes: feature, us (our advantage), competitors (their limitation)

### Related Content
- `relatedApps` - Array of 3 related app IDs
- `relatedBlogs` - Array of 4 blog post URLs

### Technical Specifications
- `security` - Array of 5 security features
- `performance` - Array of 4 performance metrics
- `integrations` - Array of 4 integration capabilities
- `compliance` - Array of 4 compliance certifications

### Trust Signals
- `certifications` - Array of 3 certifications
- `awards` - Array of 3 awards/recognition
- `customers` - Customer count text
- `yearsInBusiness` - Business longevity

### Call-to-Actions
- `primary` - Main CTA (text, link)
- `secondary` - Secondary CTA (text, link)
- `tertiary` - Third CTA (text, link)

## Industry Coverage

1. **Healthcare & Medical Technology** (Apps 1-6)
   - Patient Management System
   - Telemedicine Platform
   - Medical Inventory & Supply Chain Manager
   - Electronic Health Records (EHR) System
   - Medical Billing & Claims Processing
   - Health & Wellness Tracking App

2. **Financial Technology (FinTech)** (Apps 7-12)
   - Invoice & Billing Management System
   - Expense Tracking & Management
   - Payroll & HR Management System
   - Personal Finance & Budget Planner
   - Loan & Credit Management Platform
   - Investment Portfolio Tracker

3. **Education Technology (EdTech)** (Apps 13-18)
   - Learning Management System (LMS)
   - Student Information System (SIS)
   - Virtual Classroom Platform
   - Exam & Assessment Management
   - Library Management System
   - Parent-Teacher Communication App

4. **Real Estate & Property Technology** (Apps 19-24)
   - Property Listing & Search Platform
   - Property Management System
   - Real Estate CRM
   - Construction Project Management
   - Facility & Maintenance Management
   - Real Estate Investment Analysis Tool

5. **E-Commerce & Retail** (Apps 25-30)
   - Online Store Builder
   - Inventory Management System
   - Point of Sale (POS) System
   - Customer Loyalty & Rewards Platform
   - Product Review & Rating System
   - Multi-Channel Sales Management

6. **Human Resources** (Apps 31-36)
   - Applicant Tracking System (ATS)
   - Employee Onboarding Platform
   - Performance Management System
   - Time & Attendance Tracking
   - Employee Engagement & Survey Platform
   - Learning & Development Management

7. **Sales & Marketing** (Apps 37-42)
   - Customer Relationship Management (CRM)
   - Email Marketing Platform
   - Social Media Management Tool
   - Lead Generation & Capture System
   - Marketing Analytics & Reporting
   - Content Management & Collaboration

8. **Project Management** (Apps 43-48)
   - Task & Project Management Platform
   - Team Communication & Chat Tool
   - Document Collaboration Platform
   - Resource Planning & Allocation
   - Client & Project Portal
   - Workflow Automation Platform

9. **Manufacturing** (Apps 49-54)
   - Production Planning & Scheduling
   - Quality Control & Inspection System
   - Supply Chain Management Platform
   - Warehouse Management System
   - Equipment Maintenance Management
   - Vendor & Supplier Management

10. **Hospitality & Travel** (Apps 55-60)
    - Hotel Booking & Reservation System
    - Restaurant Management System
    - Event Planning & Management
    - Travel Itinerary & Booking Platform
    - Guest Experience & Feedback System
    - Housekeeping & Staff Management

## Usage in Next.js

### Import a single file:
```typescript
import webApps1 from '@/data/web-apps-1.json';
const apps = webApps1.apps;
```

### Import all files:
```typescript
import webApps1 from '@/data/web-apps-1.json';
import webApps2 from '@/data/web-apps-2.json';
import webApps3 from '@/data/web-apps-3.json';
import webApps4 from '@/data/web-apps-4.json';
import webApps5 from '@/data/web-apps-5.json';
import webApps6 from '@/data/web-apps-6.json';

const allApps = [
  ...webApps1.apps,
  ...webApps2.apps,
  ...webApps3.apps,
  ...webApps4.apps,
  ...webApps5.apps,
  ...webApps6.apps
];
```

### Get app by ID:
```typescript
const getAppById = (id: number) => {
  const fileNumber = Math.ceil(id / 10);
  const data = require(`@/data/web-apps-${fileNumber}.json`);
  return data.apps.find(app => app.id === id);
};
```

### Get apps by industry:
```typescript
const getAppsByIndustry = (industryId: number) => {
  return allApps.filter(app => app.industryId === industryId);
};
```

### Generate dynamic routes:
```typescript
export async function generateStaticParams() {
  return allApps.map((app) => ({
    slug: app.slug,
  }));
}
```

## File Statistics

- **Total Files**: 6
- **Total Apps**: 60
- **Total Size**: ~1.14 MB
- **Average File Size**: 190 KB
- **Apps per File**: 10
- **Industries Covered**: 10

## Generation

These files were generated using the Node.js script located at:
```
/scripts/generate-web-apps.js
```

To regenerate the files:
```bash
node scripts/generate-web-apps.js
```

## Notes

- All image paths use placeholder paths (e.g., `/images/apps/app-name-og.jpg`)
- All video URLs use placeholder YouTube embed URLs
- Blog URLs use placeholder paths (e.g., `/blog/article-name`)
- Case study URLs use placeholder paths (e.g., `/case-studies/study-name`)
- Testimonial avatars use placeholder paths

Remember to replace these with actual asset paths in your production application.

## SEO Optimization

Each app is optimized for search engines with:
- Unique meta titles and descriptions
- 12 targeted keywords per app
- Open Graph tags for social sharing
- Structured data ready for schema markup
- SEO-friendly slugs

## Updates

Last Updated: January 2026
Version: 1.0

---

For questions or issues, please contact the development team.
