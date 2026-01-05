import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "desishub",
    companyName: "Desishub Technologies",
    companyLogo: "/desishub.png", // You'll need to add your company logo
    positions: [
      {
        id: "founder-ceo",
        title: "Founder & CEO",
        employmentPeriod: {
          start: "01.2023",
        },
        employmentType: "Full-time",
        icon: "idea",
        description: `- Founded and lead Desishub Technologies, a tech company building enterprise-level systems and applications.
- Built and scaled multiple digital products generating $15K+ in revenue.
- Created and launched Nextjs Academy course platform with clean, job-oriented programming courses.
- Developed React UI Components library for developers.
- Built WeSendAll platform for seamless communication solutions.
- Manage technical teams and oversee product development lifecycle.
- Established company strategy, vision, and growth initiatives.
- Built strategic partnerships and managed client relationships.`,
        skills: [
          "Next.js",
          "Node.js",
          "Hono.js",
          "TypeScript",
          "React",
          "Business Strategy",
          "Product Development",
          "Team Leadership",
          "Entrepreneurship",
          "Digital Marketing",
          "Revenue Generation",
          "Client Relations",
        ],
        isExpanded: true,
      },
      {
        id: "fullstack-developer",
        title: "Fullstack Developer",
        employmentPeriod: {
          start: "01.2023",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Architect and develop enterprise-level web applications using modern tech stack.
- Specialize in Next.js, Node.js, and Hono.js for high-performance applications.
- Build scalable backend APIs and microservices architecture.
- Implement robust frontend solutions with React and TypeScript.
- Optimize application performance and ensure code quality standards.
- Design and implement database schemas and data architecture.
- Deploy and maintain applications on cloud infrastructure.`,
        skills: [
          "Next.js",
          "Node.js",
          "Hono.js",
          "TypeScript",
          "React",
          "PostgreSQL",
          "MongoDB",
          "Docker",
          "AWS",
          "Vercel",
          "Git",
          "API Development",
          "System Architecture",
          "Performance Optimization",
        ],
      },
      {
        id: "content-creator",
        title: "YouTube Content Creator",
        employmentPeriod: {
          start: "01.2023",
        },
        employmentType: "Part-time",
        icon: "design",
        description: `- Created and manage JB WEB DEVELOPER YouTube channel with 13.3K+ subscribers.
- Produce high-quality programming tutorials and educational content.
- Cover topics including Next.js, Node.js, React, and modern web development.
- Built engaged community of developers and programming enthusiasts.
- Generate revenue through course sales, digital products, and channel monetization.
- Plan, script, record, and edit educational video content.
- Engage with community through comments, live streams, and social media.`,
        skills: [
          "Content Creation",
          "Video Production",
          "Educational Design",
          "Community Building",
          "YouTube Analytics",
          "Social Media Marketing",
          "Public Speaking",
          "Teaching",
          "Script Writing",
          "Video Editing",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "freelance",
    companyName: "Freelance Developer & Digital Entrepreneur",
    positions: [
      {
        id: "fullstack-freelancer",
        title: "Fullstack Developer & Digital Product Creator",
        employmentPeriod: {
          start: "01.2020",
        },
        employmentType: "Self-employed",
        icon: "code",
        description: `- Provide fullstack development services for clients across various industries.
- Built enterprise-level web applications, e-commerce platforms, and custom software solutions.
- Created and sold digital products including source codes, templates, and development tools.
- Developed online courses and educational content for programming community.
- Generated consistent revenue through client projects and digital product sales.
- Managed complete project lifecycle from requirements gathering to deployment.
- Built long-term relationships with clients and recurring business partnerships.
- Specialized in modern web technologies including Next.js, React, and Node.js.`,
        skills: [
          "Next.js",
          "React",
          "Node.js",
          "TypeScript",
          "Express.js",
          "MongoDB",
          "PostgreSQL",
          "Tailwind CSS",
          "Docker",
          "AWS",
          "Client Relations",
          "Project Management",
          "Business Development",
          "Product Creation",
          "Digital Marketing",
        ],
        isExpanded: true,
      },
      {
        id: "programming-instructor",
        title: "Programming Instructor & Course Creator",
        employmentPeriod: {
          start: "01.2020",
        },
        employmentType: "Part-time",
        icon: "education",
        description: `- Created comprehensive programming courses focusing on job-ready skills.
- Conducted bootcamps, workshops, and meetups for developers.
- Taught modern web development technologies including Next.js, React, and Node.js.
- Mentored aspiring developers and helped them transition to tech careers.
- Developed curriculum and learning materials for various skill levels.
- Built online learning platforms and course delivery systems.
- Generated revenue through course sales and educational consulting.`,
        skills: [
          "Teaching",
          "Curriculum Development",
          "Mentoring",
          "Educational Technology",
          "Workshop Facilitation",
          "Community Building",
          "Course Creation",
          "Learning Management Systems",
          "Student Assessment",
          "Educational Content Design",
        ],
      },
      {
        id: "business-consultant",
        title: "Tech Business Consultant",
        employmentPeriod: {
          start: "01.2020",
        },
        employmentType: "Part-time",
        icon: "idea",
        description: `- Provide business and technical consulting for startups and small businesses.
- Help developers monetize their programming skills and build sustainable businesses.
- Advise on technology stack selection, architecture decisions, and scaling strategies.
- Guide clients through digital transformation and technology adoption.
- Assist with business strategy, product development, and go-to-market planning.
- Share expertise in building and scaling tech businesses through speaking engagements.`,
        skills: [
          "Business Consulting",
          "Technology Strategy",
          "Startup Advising",
          "Digital Transformation",
          "Business Development",
          "Strategic Planning",
          "Market Analysis",
          "Product Strategy",
          "Monetization Strategies",
          "Public Speaking",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
];
