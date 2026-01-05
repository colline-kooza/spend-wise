interface Feature {
  name: string;
  tooltip: string;
}

interface PlanLimits {
  walkies: number | "unlimited";
  projects: number | "unlimited";
  collaborators: number | "unlimited";
  analytics?: boolean;
  prioritySupport?: boolean;
  export?: boolean;
}

export interface PricingPlan {
  name: string;
  slug: string;
  description: string;
  features: Feature[];
  price: number;
  limits: PlanLimits;
  priceId: string;
  period: string;
  variant:
    | "outline"
    | "default"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  highlighted?: boolean; // Add optional highlighted property
  link: string;
}

export const pricingData = {
  plans: [
    {
      name: "Free Trial",
      slug: "free-trial",
      description:
        "Perfect for testing WalkieCheck on a small production or short film.",
      features: [
        { name: "14-day trial period", tooltip: "Full access for two weeks" },
        {
          name: "Up to 50 walkie talkies",
          tooltip: "Maximum 50 devices can be tracked",
        },
        {
          name: "1 project only",
          tooltip: "Manage one film production at a time",
        },
        { name: "No collaborators", tooltip: "Single user access only" },
        {
          name: "Basic tracking & history",
          tooltip: "Core tracking features included",
        },
      ],
      price: 0,
      limits: {
        walkies: 50,
        projects: 1,
        collaborators: 0,
      },
      priceId: "price_1SY0DD0748fNmgXYLLioJIzK",
      period: "/14 days",
      variant: "outline" as const,
      link: "/signup?plan=free-trial",
    },
    {
      name: "Indie",
      slug: "indie",
      description:
        "Ideal for independent filmmakers and small production teams.",
      features: [
        {
          name: "Unlimited walkie talkies",
          tooltip: "Track as many devices as you need",
        },
        { name: "1 project", tooltip: "Manage one active production" },
        { name: "No collaborators", tooltip: "Single user access" },
        {
          name: "Full tracking & history",
          tooltip: "Complete movement trails and status tracking",
        },
        { name: "Email support", tooltip: "Get help when you need it" },
      ],
      limits: {
        walkies: "unlimited" as const,
        projects: 1,
        collaborators: 0,
      },
      price: 4.99,
      priceId: "price_1SY0TF0748fNmgXYQjSwk6VQ",
      period: "/month",
      variant: "outline" as const,
      link: "/signup?plan=indie",
    },
    {
      name: "Pro",
      slug: "pro",
      description:
        "For professional assistant directors managing multiple productions.",
      features: [
        {
          name: "Unlimited walkie talkies",
          tooltip: "No limits on devices tracked",
        },
        {
          name: "Unlimited projects",
          tooltip: "Manage multiple film productions simultaneously",
        },
        {
          name: "Team collaborators",
          tooltip: "Invite team members to manage together",
        },
        {
          name: "Advanced analytics",
          tooltip: "Detailed insights and reports",
        },
        {
          name: "Priority support",
          tooltip: "Fast-track assistance when needed",
        },
        { name: "Export & reporting", tooltip: "Generate production reports" },
      ],
      limits: {
        walkies: "unlimited" as const,
        projects: "unlimited" as const,
        collaborators: "unlimited" as const,
        analytics: true,
        prioritySupport: true,
        export: true,
      },
      price: 9.99,
      priceId: "price_1SY0Uq0748fNmgXYNj77tEGc",
      period: "/month",
      variant: "default" as const,
      highlighted: true,
      link: "/signup?plan=pro",
    },
  ] satisfies PricingPlan[], // Changed from 'as const satisfies readonly PricingPlan[]'
};
