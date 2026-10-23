export type ProjectGroup = "main" | "earlier";

export interface Project {
  slug: string;
  name: string;
  categories: string[];
  year: string;
  tagline: string;
  description: string;
  tech: string[];
  image: string | null;
  live: string | null;
  github: string | null;
  caseStudy?: string;
  featured: boolean;
  group: ProjectGroup;
}

export const PROJECTS: Project[] = [
  {
    slug: "palettero",
    name: "Palettero",
    categories: ["SaaS", "Full Stack"],
    year: "TODO",
    tagline: "Launched color and theme tool with AI palette suggestions",
    description:
      "A launched product for editing color themes, with AI palette suggestions and shareable links. Built for search and AI answer engines (AEO and GEO). Tested with Playwright and Vitest, shipped through GitHub Actions CI.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS v4",
      "Supabase",
      "PostgreSQL",
      "Cloudflare Workers",
      "PostHog",
      "Gemini",
      "Grok",
      "Workers AI",
      "Zustand",
      "Zod",
      "Playwright",
      "Vitest",
      "GitHub Actions",
    ],
    image: null,
    live: "https://app.palettero.workers.dev/",
    github: null,
    featured: true,
    group: "main",
  },
  {
    slug: "dinepine",
    name: "DinePine",
    categories: ["SaaS", "Full Stack"],
    year: "TODO",
    tagline: "Restaurant POS SaaS",
    description:
      "Restaurant POS with cashier, kitchen and admin screens, from table orders to billing.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "/projects/dinepine.png",
    live: "https://dinepine-pos.vercel.app",
    github: "https://github.com/code-with-saad/POS",
    featured: true,
    group: "main",
  },
  {
    slug: "eventsphere",
    name: "EventSphere",
    categories: ["SaaS", "Full Stack"],
    year: "TODO",
    tagline: "Event and expo management SaaS",
    description:
      "Multi-role event and expo management SaaS, built with React, Node, Express and MongoDB.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: null,
    live: null,
    github: "https://github.com/code-with-saad/eventsphere",
    featured: true,
    group: "main",
  },
  {
    slug: "nexoria",
    name: "Nexoria",
    categories: ["Full Stack", "Internship"],
    year: "TODO",
    tagline: "E-commerce with Stripe checkout",
    description:
      "E-commerce store with Stripe checkout and admin analytics. Built during the CodeAlpha internship.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    image: null,
    live: null,
    github: "https://github.com/code-with-saad/CodeAlpha_Nexoria",
    featured: false,
    group: "main",
  },
  {
    slug: "huddle",
    name: "Huddle",
    categories: ["Full Stack", "Internship"],
    year: "TODO",
    tagline: "Project management with real-time updates",
    description:
      "Project management tool with real-time updates over WebSocket. Built during the CodeAlpha internship.",
    tech: ["React", "Node.js", "Express", "MongoDB", "WebSocket"],
    image: null,
    live: null,
    github: "https://github.com/code-with-saad/CodeAlpha_Huddle",
    featured: false,
    group: "main",
  },
  {
    slug: "circl",
    name: "Circl",
    categories: ["Full Stack", "Internship"],
    year: "TODO",
    tagline: "Social platform",
    description:
      "Social platform with profiles, posts, comments, likes and follows. Built during the CodeAlpha internship.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: null,
    live: null,
    github: "https://github.com/code-with-saad/CodeAlpha_Circl",
    featured: false,
    group: "main",
  },
  {
    slug: "marketlink",
    name: "MarketLink",
    categories: ["Full Stack"],
    year: "TODO",
    tagline: "Farmers market platform",
    description: "Farmers market platform built for TechWiz 7.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: null,
    live: null,
    github: "https://github.com/code-with-saad/FBA_Omniverse",
    featured: false,
    group: "main",
  },
  {
    slug: "a1uniforms",
    name: "A1 Uniforms",
    categories: ["Frontend"],
    year: "TODO",
    tagline: "Uniform catalog",
    description:
      "Responsive uniform catalog with client-side filtering across medical, school and workwear lines.",
    tech: ["JavaScript", "HTML", "CSS", "Tailwind CSS"],
    image: "/projects/a1uniforms.png",
    live: "https://a1uniforms.vercel.app",
    github: "https://github.com/code-with-saad/E-PROJECT",
    featured: false,
    group: "earlier",
  },
  {
    slug: "covidcare",
    name: "COVID Care",
    categories: ["Full Stack"],
    year: "TODO",
    tagline: "Vaccination management",
    description:
      "Vaccination management system for citizen scheduling, hospital dose allocation and certificate verification.",
    tech: ["PHP", "MySQL"],
    image: "/projects/covidcare.png",
    live: null,
    github: "https://github.com/code-with-saad/Covid-Care",
    featured: false,
    group: "earlier",
  },
];
