import { EbookCard } from "./ebook-card";

export interface Chapter {
  title: string;
  description: string;
}

export interface Ebook {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  bookWebsite: string;
  chapters: Chapter[];
  buyLink?: string;
  isFree: boolean;
}

const ebooks: Ebook[] = [
  {
    id: "1",
    title: "The Ultimate guide to Building Blazing Fast APIs",
    description:
      "A Developer's Guide to High-Performance API Design and Implementation. Transform your backend development with practical strategies and actionable best practices.",
    thumbnail:
      "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfZfeNuoU9C3gHFdyzTE0q7PpDnjchu6XsKk1l",
    bookWebsite: "https://api-handbook.vercel.app",
    chapters: [
      {
        title: "Chapter 1: Lean Create Payload (LCP)",
        description:
          "The Philosophy of Minimalist Creation. When initiating the creation of a new resource via an API, the temptation often arises to collect every conceivable piece of information upfront. The Lean Create Payload (LCP) principle posits that the initial Create operation should involve a minimal set of essential data, typically not exceeding five fields for optimal API performance and smoother user experience.",
      },
      {
        title: "Chapter 2: Patch-First Update (PFU)",
        description:
          "The Precision of Partial Updates. The Patch-First Update (PFU) principle advocates for using PATCH requests for updates, focusing on sending only the fields that have been explicitly changed. This approach aligns with the reality that users typically modify only one or two fields at a time, leading to optimized network usage and improved API performance.",
      },
      {
        title: "Chapter 3: Selective Get Optimization (SGO)",
        description:
          "The Art of Fetching Only What You Need. The Selective Get Optimization (SGO) principle emphasizes the critical importance of optimizing your queries to retrieve only the necessary fields. This practice significantly reduces network latency, bandwidth consumption, and improves both backend performance and frontend rendering speed.",
      },
    ],
    buyLink: "https://gmukejohnbaptist.gumroad.com/l/api-handbook",
    isFree: false,
  },
];

export function EbookList() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-balance">
          Digital Library
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-balance text-muted-foreground">
          Curated collection of technical ebooks to accelerate your development
          journey
        </p>
      </header>

      <div className="grid gap-8 md:gap-12">
        {ebooks.map((ebook) => (
          <EbookCard key={ebook.id} ebook={ebook} />
        ))}
      </div>
    </div>
  );
}
