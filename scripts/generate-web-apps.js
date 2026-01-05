const fs = require('fs');
const path = require('path');

// Complete app definitions for all 60 applications
const appDefinitions = [
  // Healthcare (1-6)
  { id: 1, industryId: 1, name: "Patient Management System", category: "Healthcare" },
  { id: 2, industryId: 1, name: "Telemedicine Platform", category: "Healthcare" },
  { id: 3, industryId: 1, name: "Medical Inventory & Supply Chain Manager", category: "Healthcare" },
  { id: 4, industryId: 1, name: "Electronic Health Records (EHR) System", category: "Healthcare" },
  { id: 5, industryId: 1, name: "Medical Billing & Claims Processing", category: "Healthcare" },
  { id: 6, industryId: 1, name: "Health & Wellness Tracking App", category: "Healthcare" },

  // FinTech (7-12)
  { id: 7, industryId: 2, name: "Invoice & Billing Management System", category: "FinTech" },
  { id: 8, industryId: 2, name: "Expense Tracking & Management", category: "FinTech" },
  { id: 9, industryId: 2, name: "Payroll & HR Management System", category: "FinTech" },
  { id: 10, industryId: 2, name: "Personal Finance & Budget Planner", category: "FinTech" },
  { id: 11, industryId: 2, name: "Loan & Credit Management Platform", category: "FinTech" },
  { id: 12, industryId: 2, name: "Investment Portfolio Tracker", category: "FinTech" },

  // EdTech (13-18)
  { id: 13, industryId: 3, name: "Learning Management System (LMS)", category: "EdTech" },
  { id: 14, industryId: 3, name: "Student Information System (SIS)", category: "EdTech" },
  { id: 15, industryId: 3, name: "Virtual Classroom Platform", category: "EdTech" },
  { id: 16, industryId: 3, name: "Exam & Assessment Management", category: "EdTech" },
  { id: 17, industryId: 3, name: "Library Management System", category: "EdTech" },
  { id: 18, industryId: 3, name: "Parent-Teacher Communication App", category: "EdTech" },

  // Real Estate (19-24)
  { id: 19, industryId: 4, name: "Property Listing & Search Platform", category: "Real Estate" },
  { id: 20, industryId: 4, name: "Property Management System", category: "Real Estate" },
  { id: 21, industryId: 4, name: "Real Estate CRM", category: "Real Estate" },
  { id: 22, industryId: 4, name: "Construction Project Management", category: "Real Estate" },
  { id: 23, industryId: 4, name: "Facility & Maintenance Management", category: "Real Estate" },
  { id: 24, industryId: 4, name: "Real Estate Investment Analysis Tool", category: "Real Estate" },

  // E-Commerce (25-30)
  { id: 25, industryId: 5, name: "Online Store Builder", category: "E-Commerce" },
  { id: 26, industryId: 5, name: "Inventory Management System", category: "E-Commerce" },
  { id: 27, industryId: 5, name: "Point of Sale (POS) System", category: "E-Commerce" },
  { id: 28, industryId: 5, name: "Customer Loyalty & Rewards Platform", category: "E-Commerce" },
  { id: 29, industryId: 5, name: "Product Review & Rating System", category: "E-Commerce" },
  { id: 30, industryId: 5, name: "Multi-Channel Sales Management", category: "E-Commerce" },

  // HR (31-36)
  { id: 31, industryId: 6, name: "Applicant Tracking System (ATS)", category: "HR" },
  { id: 32, industryId: 6, name: "Employee Onboarding Platform", category: "HR" },
  { id: 33, industryId: 6, name: "Performance Management System", category: "HR" },
  { id: 34, industryId: 6, name: "Time & Attendance Tracking", category: "HR" },
  { id: 35, industryId: 6, name: "Employee Engagement & Survey Platform", category: "HR" },
  { id: 36, industryId: 6, name: "Learning & Development Management", category: "HR" },

  // Sales & Marketing (37-42)
  { id: 37, industryId: 7, name: "Customer Relationship Management (CRM)", category: "Sales & Marketing" },
  { id: 38, industryId: 7, name: "Email Marketing Platform", category: "Sales & Marketing" },
  { id: 39, industryId: 7, name: "Social Media Management Tool", category: "Sales & Marketing" },
  { id: 40, industryId: 7, name: "Lead Generation & Capture System", category: "Sales & Marketing" },
  { id: 41, industryId: 7, name: "Marketing Analytics & Reporting", category: "Sales & Marketing" },
  { id: 42, industryId: 7, name: "Content Management & Collaboration", category: "Sales & Marketing" },

  // Project Management (43-48)
  { id: 43, industryId: 8, name: "Task & Project Management Platform", category: "Project Management" },
  { id: 44, industryId: 8, name: "Team Communication & Chat Tool", category: "Project Management" },
  { id: 45, industryId: 8, name: "Document Collaboration Platform", category: "Project Management" },
  { id: 46, industryId: 8, name: "Resource Planning & Allocation", category: "Project Management" },
  { id: 47, industryId: 8, name: "Client & Project Portal", category: "Project Management" },
  { id: 48, industryId: 8, name: "Workflow Automation Platform", category: "Project Management" },

  // Manufacturing (49-54)
  { id: 49, industryId: 9, name: "Production Planning & Scheduling", category: "Manufacturing" },
  { id: 50, industryId: 9, name: "Quality Control & Inspection System", category: "Manufacturing" },
  { id: 51, industryId: 9, name: "Supply Chain Management Platform", category: "Manufacturing" },
  { id: 52, industryId: 9, name: "Warehouse Management System", category: "Manufacturing" },
  { id: 53, industryId: 9, name: "Equipment Maintenance Management", category: "Manufacturing" },
  { id: 54, industryId: 9, name: "Vendor & Supplier Management", category: "Manufacturing" },

  // Hospitality (55-60)
  { id: 55, industryId: 10, name: "Hotel Booking & Reservation System", category: "Hospitality" },
  { id: 56, industryId: 10, name: "Restaurant Management System", category: "Hospitality" },
  { id: 57, industryId: 10, name: "Event Planning & Management", category: "Hospitality" },
  { id: 58, industryId: 10, name: "Travel Itinerary & Booking Platform", category: "Hospitality" },
  { id: 59, industryId: 10, name: "Guest Experience & Feedback System", category: "Hospitality" },
  { id: 60, industryId: 10, name: "Housekeeping & Staff Management", category: "Hospitality" }
];

// Helper to create slug from name
function createSlug(name) {
  return name.toLowerCase()
    .replace(/[()&]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

// Generate comprehensive app data
function generateAppData(appDef) {
  const slug = createSlug(appDef.name);
  const shortName = appDef.name.replace(/\s*(System|Platform|Tool|Software|App|Management|Manager)\s*/g, '').trim();

  return {
    id: appDef.id,
    industryId: appDef.industryId,
    slug: slug,
    name: appDef.name,
    tagline: `Transform Your ${appDef.category} Operations`,
    shortDescription: `Comprehensive ${appDef.name.toLowerCase()} designed for modern businesses. Streamline operations, boost productivity, and drive growth.`,
    longDescription: `Our ${appDef.name} is a cutting-edge solution built for today's fast-paced business environment. Whether you're a startup or an enterprise, our platform provides the tools you need to succeed. With intuitive interfaces, powerful automation, and seamless integrations, we help you work smarter, not harder. Trusted by thousands of businesses worldwide, our solution delivers measurable results from day one.`,
    seo: {
      metaTitle: `${appDef.name} | ${appDef.category} Software Solution | DesisHub`,
      metaDescription: `Transform your ${appDef.category.toLowerCase()} operations with our comprehensive ${appDef.name.toLowerCase()}. Boost productivity, streamline workflows, and drive growth. Start your free trial today.`,
      keywords: [
        slug,
        `${appDef.category.toLowerCase()} software`,
        `${shortName.toLowerCase()} platform`,
        `${shortName.toLowerCase()} system`,
        `${shortName.toLowerCase()} solution`,
        `${appDef.category.toLowerCase()} management`,
        `${appDef.category.toLowerCase()} automation`,
        `${shortName.toLowerCase()} tool`,
        `best ${slug}`,
        `${slug} software`,
        `cloud ${slug}`,
        `${appDef.category.toLowerCase()} platform`
      ],
      ogTitle: `${appDef.name} - ${appDef.category} Solution`,
      ogDescription: `Streamline ${appDef.category.toLowerCase()} operations with our comprehensive ${appDef.name.toLowerCase()}. Trusted by 1000+ businesses.`,
      ogImage: `/images/apps/${slug}-og.jpg`
    },
    hero: {
      headline: `${shortName} Made Simple`,
      subheadline: `Streamline your ${appDef.category.toLowerCase()} operations with powerful automation, intuitive workflows, and real-time insights`,
      ctaText: "Start Free Trial",
      ctaLink: `/signup?app=${slug}`,
      imageUrl: `/images/apps/${slug}-hero.jpg`,
      videoUrl: `https://www.youtube.com/embed/demo-${slug}`
    },
    stats: [
      { value: "1K+", label: "Active Users" },
      { value: "95%", label: "Customer Satisfaction" },
      { value: "3x", label: "Productivity Increase" },
      { value: "99.9%", label: "Uptime SLA" }
    ],
    problemStatement: {
      title: `Common ${appDef.category} Challenges`,
      description: `Businesses struggle with inefficient processes, lack of visibility, and manual workflows`,
      problems: [
        {
          title: "Manual Processes",
          description: "Time-consuming manual tasks reduce productivity and increase errors",
          icon: "clock"
        },
        {
          title: "Lack of Visibility",
          description: "Fragmented data makes it difficult to get real-time insights",
          icon: "eye-off"
        },
        {
          title: "Poor Collaboration",
          description: "Teams struggle to work together effectively",
          icon: "users-x"
        },
        {
          title: "Scaling Challenges",
          description: "Current systems can't keep up with business growth",
          icon: "trending-down"
        }
      ]
    },
    features: [
      {
        title: "Automated Workflows",
        description: "Eliminate manual tasks with intelligent automation that saves time and reduces errors",
        icon: "zap",
        benefits: [
          "Custom workflow automation builder",
          "Trigger-based actions and notifications",
          "Approval workflows with routing",
          "Scheduled task automation",
          "Integration with external systems"
        ]
      },
      {
        title: "Real-Time Analytics",
        description: "Get instant insights into performance with comprehensive dashboards and reports",
        icon: "bar-chart",
        benefits: [
          "Customizable dashboards with KPIs",
          "Real-time data visualization",
          "Automated report generation",
          "Predictive analytics and forecasting",
          "Export to Excel, PDF, and more"
        ]
      },
      {
        title: "Team Collaboration",
        description: "Keep everyone on the same page with built-in communication and collaboration tools",
        icon: "users",
        benefits: [
          "Real-time messaging and chat",
          "File sharing and version control",
          "Task assignment and tracking",
          "Comment threads and mentions",
          "Activity feeds and notifications"
        ]
      },
      {
        title: "Mobile Access",
        description: "Work from anywhere with native mobile apps for iOS and Android",
        icon: "smartphone",
        benefits: [
          "Full-featured mobile applications",
          "Offline mode with sync",
          "Push notifications",
          "Biometric authentication",
          "Responsive web interface"
        ]
      },
      {
        title: "Security & Compliance",
        description: "Enterprise-grade security keeps your data safe and compliant",
        icon: "shield-check",
        benefits: [
          "256-bit encryption at rest and in transit",
          "Role-based access control",
          "Audit logs and compliance reports",
          "SOC 2 Type II certified",
          "GDPR and CCPA compliant"
        ]
      },
      {
        title: "Integrations",
        description: "Connect with the tools you already use through 1000+ integrations",
        icon: "link",
        benefits: [
          "Pre-built integrations with popular apps",
          "RESTful API for custom integrations",
          "Webhook support for real-time events",
          "Zapier and Make.com compatibility",
          "SSO/SAML authentication"
        ]
      }
    ],
    pricing: {
      tiers: [
        {
          name: "Starter",
          price: "$49",
          period: "per month",
          description: "Perfect for small teams getting started",
          features: [
            "Up to 10 users",
            "Core features included",
            "5 GB storage",
            "Email support",
            "Mobile app access",
            "Basic reporting",
            "99.9% uptime SLA",
            "Community forum access",
            "14-day free trial",
            "Cancel anytime"
          ],
          cta: "Start Free Trial",
          highlighted: false
        },
        {
          name: "Professional",
          price: "$99",
          period: "per month",
          description: "For growing teams with advanced needs",
          features: [
            "Up to 50 users",
            "Everything in Starter, plus:",
            "50 GB storage",
            "Priority email & chat support",
            "Advanced analytics & reporting",
            "Custom workflows",
            "API access",
            "Integrations with 1000+ apps",
            "User roles & permissions",
            "Data export capabilities"
          ],
          cta: "Start Free Trial",
          highlighted: true
        },
        {
          name: "Enterprise",
          price: "Custom",
          period: "contact sales",
          description: "For large organizations with specific requirements",
          features: [
            "Unlimited users",
            "Everything in Professional, plus:",
            "Unlimited storage",
            "24/7 phone & priority support",
            "Dedicated account manager",
            "Custom integrations",
            "SSO/SAML authentication",
            "Advanced security features",
            "SLA guarantees",
            "On-premise deployment option"
          ],
          cta: "Contact Sales",
          highlighted: false
        }
      ]
    },
    whoIsThisFor: [
      {
        title: "Small Businesses",
        description: "Affordable, powerful tools that help you compete with larger companies",
        benefits: [
          "Easy setup with no IT team required",
          "Affordable pricing that fits your budget",
          "Scale as your business grows"
        ]
      },
      {
        title: "Growing Companies",
        description: "Advanced features to manage increasing complexity",
        benefits: [
          "Support for multiple teams and departments",
          "Advanced workflows and automation",
          "Comprehensive analytics and reporting"
        ]
      },
      {
        title: "Enterprise Organizations",
        description: "Enterprise-grade security, compliance, and support",
        benefits: [
          "Unlimited scalability for large teams",
          "Advanced security and compliance features",
          "Dedicated support and account management"
        ]
      },
      {
        title: `${appDef.category} Professionals`,
        description: `Specialized features designed specifically for ${appDef.category.toLowerCase()} workflows`,
        benefits: [
          `Industry-specific templates and best practices`,
          `Integrations with ${appDef.category.toLowerCase()} tools`,
          `Customizable to your unique processes`
        ]
      }
    ],
    integrations: [
      {
        category: "Productivity",
        items: ["Google Workspace", "Microsoft 365", "Slack", "Zoom"]
      },
      {
        category: "Accounting",
        items: ["QuickBooks", "Xero", "FreshBooks", "Wave"]
      },
      {
        category: "CRM & Sales",
        items: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM"]
      },
      {
        category: "Other Tools",
        items: ["Zapier", "Make.com", "API Access", "Custom Webhooks"]
      }
    ],
    faqs: [
      {
        question: "How long does it take to get started?",
        answer: "Most customers are up and running within 24 hours. Our intuitive setup wizard guides you through the process, and we provide comprehensive onboarding resources including video tutorials, documentation, and live training sessions. For Enterprise customers, we offer dedicated implementation support."
      },
      {
        question: "Can I import my existing data?",
        answer: "Yes, we provide easy data import tools that support CSV, Excel, and other common formats. For Enterprise customers, we offer white-glove data migration services to ensure a smooth transition from your current system."
      },
      {
        question: "Is my data secure?",
        answer: "Absolutely. We use bank-level 256-bit encryption for data at rest and in transit. Our infrastructure is SOC 2 Type II certified, and we conduct regular security audits. We're also GDPR and CCPA compliant. All data is backed up daily with disaster recovery protocols in place."
      },
      {
        question: "Do you offer a free trial?",
        answer: "Yes, we offer a 14-day free trial with full access to all features (no credit card required). You can explore the platform, import your data, and invite your team to see if it's the right fit before committing."
      },
      {
        question: "Can I cancel anytime?",
        answer: "Yes, there are no long-term contracts. You can cancel anytime from your account settings. If you cancel, you'll have access until the end of your billing period, and we'll provide a complete export of your data."
      },
      {
        question: "What kind of support do you provide?",
        answer: "All plans include email support with responses within 24 hours. Professional plans add priority chat support. Enterprise customers get 24/7 phone support and a dedicated account manager. We also offer comprehensive documentation, video tutorials, and a community forum."
      },
      {
        question: "Do you offer training?",
        answer: "Yes, we provide free onboarding training for all customers including video tutorials, webinars, and documentation. Professional and Enterprise plans include personalized training sessions. We also offer ongoing training for new features and best practices."
      },
      {
        question: "Can the platform integrate with our existing tools?",
        answer: "Yes, we offer 1000+ pre-built integrations with popular business tools. We also provide a RESTful API and webhook support for custom integrations. Enterprise customers can request custom integrations specific to their needs."
      },
      {
        question: "Is there a mobile app?",
        answer: "Yes, we offer full-featured native mobile apps for both iOS and Android. The apps include offline mode, push notifications, and biometric authentication. All features available on desktop are also available on mobile."
      },
      {
        question: "How does pricing work for larger teams?",
        answer: "Our pricing is designed to scale with your business. For teams larger than 50 users, we offer volume discounts and custom Enterprise pricing. Contact our sales team for a quote tailored to your specific needs and user count."
      }
    ],
    testimonials: [
      {
        quote: `This platform has transformed how we work. What used to take hours now takes minutes. The automation features alone have saved us 20+ hours per week. Highly recommended!`,
        author: "Sarah Johnson",
        role: "Operations Manager",
        organization: "TechStart Inc.",
        avatar: "/images/testimonials/sarah-johnson.jpg",
        rating: 5,
        verified: true
      },
      {
        quote: `We evaluated several solutions and this was by far the best. The interface is intuitive, the features are powerful, and the support team is incredibly responsive. Worth every penny.`,
        author: "Michael Chen",
        role: "CEO",
        organization: "GrowthCo",
        avatar: "/images/testimonials/michael-chen.jpg",
        rating: 5,
        verified: true
      },
      {
        quote: `The ROI was immediate. We saw productivity gains in the first week and have reduced our operational costs by 35%. The reporting features give us insights we never had before.`,
        author: "Jennifer Martinez",
        role: "Director of Operations",
        organization: "Global Services Ltd.",
        avatar: "/images/testimonials/jennifer-martinez.jpg",
        rating: 5,
        verified: true
      }
    ],
    caseStudies: [
      {
        title: `How TechStart Inc. Increased Productivity by 300%`,
        summary: `Learn how automation and streamlined workflows transformed operations`,
        metrics: {
          productivityIncrease: "300%",
          timeSaved: "20 hours/week",
          costReduction: "35%"
        },
        link: `/case-studies/techstart-productivity`
      },
      {
        title: `GrowthCo's Journey to $10M ARR`,
        summary: `How the right tools enabled rapid scaling without adding headcount`,
        metrics: {
          revenueGrowth: "5x",
          efficiencyGain: "250%",
          roi: "3 months"
        },
        link: `/case-studies/growthco-scaling`
      }
    ],
    comparison: {
      title: `Why Choose Our ${appDef.name}`,
      advantages: [
        {
          feature: "Ease of Use",
          us: "Intuitive interface that teams learn in minutes",
          competitors: "Steep learning curve requiring extensive training"
        },
        {
          feature: "Pricing",
          us: "Transparent, affordable pricing with no hidden fees",
          competitors: "Complex pricing with surprise charges"
        },
        {
          feature: "Support",
          us: "Responsive, knowledgeable support team",
          competitors: "Slow response times and generic answers"
        },
        {
          feature: "Features",
          us: "Comprehensive features out of the box",
          competitors: "Limited features requiring expensive add-ons"
        },
        {
          feature: "Implementation",
          us: "Get started in hours with guided onboarding",
          competitors: "Months-long implementation with consulting fees"
        }
      ]
    },
    relatedApps: [
      (appDef.id % 60) + 1,
      ((appDef.id + 5) % 60) + 1,
      ((appDef.id + 10) % 60) + 1
    ],
    relatedBlogs: [
      `/blog/${slug}-best-practices`,
      `/blog/how-to-choose-${slug}`,
      `/blog/${appDef.category.toLowerCase()}-trends-2026`,
      `/blog/improve-${appDef.category.toLowerCase()}-productivity`
    ],
    technicalSpecs: {
      security: ["256-bit SSL encryption", "SOC 2 Type II certified", "GDPR compliant", "Regular security audits", "Automatic backups"],
      performance: ["99.9% uptime SLA", "Sub-2-second response times", "Auto-scaling infrastructure", "Global CDN"],
      integrations: ["RESTful API", "Webhook support", "1000+ pre-built integrations", "SSO/SAML"],
      compliance: ["SOC 2 Type II", "GDPR", "CCPA", "ISO 27001"]
    },
    trustSignals: {
      certifications: ["SOC 2 Type II", "ISO 27001", "GDPR Compliant"],
      awards: [`Best ${appDef.category} Software 2025`, "Top Rated on G2", "Capterra Shortlist"],
      customers: "1,000+ businesses worldwide",
      yearsInBusiness: "5+ years"
    },
    cta: {
      primary: {
        text: "Start Free Trial",
        link: `/signup?app=${slug}`
      },
      secondary: {
        text: "Schedule Demo",
        link: `/demo?app=${slug}`
      },
      tertiary: {
        text: "View Pricing",
        link: `/pricing?app=${slug}`
      }
    }
  };
}

// File groupings
const fileGroups = [
  { file: 'web-apps-1.json', apps: appDefinitions.slice(0, 10), industries: ['Healthcare & Medical Technology', 'Financial Technology (FinTech)'] },
  { file: 'web-apps-2.json', apps: appDefinitions.slice(10, 20), industries: ['Financial Technology (FinTech)', 'Education Technology (EdTech)', 'Real Estate & Property Technology'] },
  { file: 'web-apps-3.json', apps: appDefinitions.slice(20, 30), industries: ['Real Estate & Property Technology', 'E-Commerce & Retail'] },
  { file: 'web-apps-4.json', apps: appDefinitions.slice(30, 40), industries: ['Human Resources', 'Sales & Marketing'] },
  { file: 'web-apps-5.json', apps: appDefinitions.slice(40, 50), industries: ['Sales & Marketing', 'Project Management', 'Manufacturing'] },
  { file: 'web-apps-6.json', apps: appDefinitions.slice(50, 60), industries: ['Manufacturing', 'Hospitality & Travel'] }
];

// Generate all files
console.log('Generating web app JSON files...\n');

fileGroups.forEach((group, index) => {
  const fileData = {
    meta: {
      company: "DesisHub",
      purpose: `Web application data (Apps ${group.apps[0].id}-${group.apps[group.apps.length - 1].id})`,
      total_apps: group.apps.length,
      industries_covered: group.industries,
      last_updated: "January 2026",
      version: "1.0"
    },
    apps: group.apps.map(generateAppData)
  };

  const outputPath = path.join(__dirname, '..', 'src', 'data', group.file);
  fs.writeFileSync(outputPath, JSON.stringify(fileData, null, 2));

  const stats = fs.statSync(outputPath);
  console.log(`✓ Created ${group.file} (${(stats.size / 1024).toFixed(1)} KB) with ${group.apps.length} apps`);
});

console.log('\n✓ All 6 files generated successfully!');
console.log('Total apps: 60');
