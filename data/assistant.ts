import { FAQS } from "@/data/faqs";
import { PROJECTS, type Project } from "@/data/projects";

export type AssistantLink = {
  label: string;
  href: string;
};

export type AssistantAnswer = {
  text: string;
  links?: AssistantLink[];
};

export const EMAIL = "saadkashif770@gmail.com";
export const PHONE_DISPLAY = "+92 335 3132747";

export const GREETING =
  "Hi! I'm Saad's portfolio assistant. Ask about any project, his stack, experience or availability. Project answers come with live and GitHub links.";

export const SUGGESTIONS = [
  "What has Saad built?",
  "Tell me about Palettero",
  "What's his stack?",
  "Is he available?",
  "How do I reach him?",
];

const WHATSAPP_URL = "https://wa.me/923353132747";
const GITHUB_URL = "https://github.com/code-with-saad";
const LINKEDIN_URL = "https://www.linkedin.com/in/codewithsaad";
const RESUME_URL = "/resume.pdf";

const section = (label: string, id: string): AssistantLink => ({
  label: `${label} section`,
  href: `#${id}`,
});

type Entry = {
  keywords: string[];
  answer: AssistantAnswer;
  boost?: number;
};

const PROJECT_KEYWORDS: Record<string, string[]> = {
  palettero: ["palettero", "palette", "color tool", "theme tool"],
  dinepine: ["dinepine", "dine pine", "pos", "restaurant", "billing"],
  eventsphere: ["eventsphere", "event sphere", "event", "expo"],
  nexoria: ["nexoria", "ecommerce", "e commerce", "stripe", "store"],
  huddle: ["huddle", "websocket", "real time"],
  circl: ["circl", "circle", "social"],
  marketlink: ["marketlink", "market link", "farmers market"],
  a1uniforms: ["a1 uniforms", "a1uniforms", "a1", "uniforms"],
  covidcare: ["covid care", "covidcare", "covid", "vaccination", "vaccine"],
};

function projectEntry(project: Project): Entry {
  const links: AssistantLink[] = [];

  if (project.github) links.push({ label: "GitHub", href: project.github });
  if (project.live) links.push({ label: "Live site", href: project.live });
  links.push(section("Selected work", "work"));

  const repoNote = project.github ? "" : " The repository is not public.";

  return {
    keywords: PROJECT_KEYWORDS[project.slug] ?? [project.slug],
    boost: 6,
    answer: {
      text: `${project.name} (${project.year}) - ${project.tagline}. ${project.description} Stack: ${project.tech.join(", ")}.${repoNote}`,
      links,
    },
  };
}

const CURATED: Entry[] = [
  {
    keywords: [
      "who",
      "bio",
      "background",
      "introduce",
      "yourself",
      "name",
      "about saad",
      "about him",
      "engineer",
      "student",
    ],
    answer: {
      text: "Muhammad Saad is a software engineer and full stack developer based in Karachi, Pakistan. He is studying for an Advanced Diploma in Software Engineering at Aptech and builds complete web apps, from login and database design to admin screens and deployment. He is also a Full Stack Development Intern at CodeAlpha.",
      links: [section("About", "about"), section("Contact", "contact")],
    },
  },
  {
    keywords: [
      "project",
      "projects",
      "built",
      "build",
      "shipped",
      "portfolio",
      "apps",
      "case study",
      "case studies",
      "work samples",
    ],
    answer: {
      text: "Saad has shipped nine projects. The current ones are Palettero (AI color and theme tool), DinePine (restaurant POS), EventSphere (event management), Nexoria (e-commerce with Stripe), Huddle (real-time project management) and Circl (social platform). Earlier work: MarketLink, A1 Uniforms and COVID Care. Every card in Selected work has screenshots, stack and links.",
      links: [
        section("Selected work", "work"),
        { label: "GitHub profile", href: GITHUB_URL },
      ],
    },
  },
  {
    keywords: [
      "available",
      "availability",
      "hire",
      "hiring",
      "job",
      "role",
      "roles",
      "opportunity",
      "opportunities",
      "open to",
      "freelance",
      "freelance work",
      "freelance project",
      "freelance projects",
      "contract",
      "internship",
      "full time",
      "work with",
    ],
    boost: 2,
    answer: {
      text: "He is open to internships, full-time roles and freelance projects. For freelance work, send the scope and timeline to email or WhatsApp and he will reply within a day or two.",
      links: [section("Contact", "contact"), { label: "Resume PDF", href: RESUME_URL }],
    },
  },
  {
    keywords: [
      "stack",
      "tech",
      "technologies",
      "technology",
      "tools",
      "skill",
      "skills",
      "familiar",
      "language",
      "languages",
      "framework",
      "frameworks",
      "database",
      "databases",
      "backend",
      "frontend",
      "typescript",
      "javascript",
      "dart",
      "python",
      "sql",
      "react",
      "nextjs",
      "next js",
      "flutter",
      "tailwind",
      "tailwind css",
      "node",
      "nodejs",
      "node js",
      "express",
      "fastapi",
      "rest api",
      "rest apis",
      "graphql",
      "socket io",
      "jwt",
      "mongodb",
      "postgres",
      "postgresql",
      "mysql",
      "redis",
      "supabase",
      "docker",
      "github actions",
      "cloudflare",
      "vercel",
      "postman",
    ],
    answer: {
      text: "Daily: TypeScript, JavaScript, React, Next.js, Tailwind CSS, Node.js, Express and MongoDB. Fluent: Python, Dart, SQL, Flutter and FastAPI, plus REST and GraphQL APIs, Socket.io and JWT. Data: PostgreSQL, MySQL, Redis and Supabase. Ship and ops: Vercel, Render, Cloudflare, Docker, GitHub Actions and Postman.",
      links: [section("Stack", "stack")],
    },
  },
  {
    keywords: [
      "experience",
      "worked",
      "work experience",
      "codealpha",
      "code alpha",
      "intern",
      "team",
      "history",
    ],
    answer: {
      text: "2026: Full Stack Development Intern at CodeAlpha, where he built Nexoria, Circl and Huddle. 2024 to present: Advanced Diploma in Software Engineering at Aptech Worldwide, FB Area Campus Karachi, with team projects EventSphere and MarketLink.",
      links: [section("Experience", "experience")],
    },
  },
  {
    keywords: [
      "education",
      "study",
      "studies",
      "studying",
      "degree",
      "diploma",
      "aptech",
      "coursework",
      "university",
      "college",
      "qualification",
    ],
    answer: {
      text: "He is studying for an Advanced Diploma in Software Engineering at Aptech Worldwide, FB Area Campus Karachi, from 2024 to present. Coursework includes core programming plus team projects EventSphere and MarketLink.",
      links: [section("Experience", "experience")],
    },
  },
  {
    keywords: [
      "currently",
      "current",
      "learning",
      "learning now",
      "building now",
      "working on",
      "fastapi",
      "docker",
      "palettero now",
    ],
    answer: {
      text: "He is currently building Palettero, an AI color and theme tool, and learning FastAPI, PostgreSQL and Docker.",
      links: [
        { label: "Palettero live", href: "https://app.palettero.workers.dev/" },
        section("Selected work", "work"),
      ],
    },
  },
];

const CONTACT_ENTRIES: Entry[] = [
  {
    keywords: ["github", "repos", "repo", "repository", "repositories", "source code"],
    answer: {
      text: "His code is on GitHub at github.com/code-with-saad. Public repos include DinePine, EventSphere, Nexoria, Huddle, Circl, MarketLink, A1 Uniforms and COVID Care. Palettero is live, but its repository is not public.",
      links: [
        { label: "GitHub profile", href: GITHUB_URL },
        section("Selected work", "work"),
      ],
    },
  },
  {
    keywords: ["linkedin", "linked in"],
    answer: {
      text: "His LinkedIn profile is linkedin.com/in/codewithsaad.",
      links: [{ label: "LinkedIn", href: LINKEDIN_URL }],
    },
  },
  {
    keywords: ["resume", "cv", "download"],
    answer: {
      text: "The resume PDF covers his experience, projects and stack. Download it here or from the contact card.",
      links: [{ label: "Resume PDF", href: RESUME_URL }, section("Contact", "contact")],
    },
  },
  {
    keywords: [
      "contact",
      "email",
      "e mail",
      "mail",
      "reach",
      "phone",
      "whatsapp",
      "number",
      "call",
      "message",
      "connect",
    ],
    answer: {
      text: `Email: ${EMAIL}. WhatsApp: ${PHONE_DISPLAY}. LinkedIn: linkedin.com/in/codewithsaad. GitHub: github.com/code-with-saad.`,
      links: [
        { label: "Email", href: `mailto:${EMAIL}` },
        { label: "WhatsApp", href: WHATSAPP_URL },
        { label: "LinkedIn", href: LINKEDIN_URL },
        { label: "GitHub", href: GITHUB_URL },
      ],
    },
  },
];

const DETAIL_ENTRIES: Entry[] = [
  {
    keywords: [
      "located",
      "location",
      "based",
      "karachi",
      "pakistan",
      "city",
      "country",
      "relocate",
      "remote",
    ],
    answer: {
      text: "He is based in Karachi, Pakistan. The contact card lists the same location.",
      links: [section("Contact", "contact")],
    },
  },
  {
    keywords: ["reply", "respond", "response", "how long", "quickly", "hear back"],
    answer: {
      text: "He usually replies within a day or two. Email and WhatsApp are the fastest.",
      links: [section("Contact", "contact")],
    },
  },
  {
    keywords: ["rate", "rates", "price", "pricing", "cost", "charge", "budget", "salary"],
    answer: {
      text: "Rates are not listed on the site. Send the scope and timeline by email or WhatsApp and he will reply with details.",
      links: [section("Contact", "contact")],
    },
  },
  {
    keywords: ["stats", "numbers", "how many", "team submissions", "years of experience"],
    answer: {
      text: "The intro lists 9+ projects shipped, 1+ year of working experience and 2+ team submissions.",
      links: [section("Intro", "intro"), section("Selected work", "work")],
    },
  },
  {
    keywords: ["help", "what can you do", "questions", "ask", "guide"],
    answer: {
      text: "Ask about any of the nine projects, his stack, experience, education, availability, rates or contact details. Every project answer includes live, GitHub and section links.",
      links: [section("Selected work", "work"), section("Contact", "contact")],
    },
  },
];

const ENTRIES: Entry[] = [
  ...CURATED,
  ...PROJECTS.map(projectEntry),
  ...CONTACT_ENTRIES,
  ...DETAIL_ENTRIES,
  ...FAQS.map((item) => ({
    keywords: item.keywords,
    answer: {
      text: item.answer,
      links: [section("FAQ", "faq")],
    },
  })),
];

const FALLBACK: AssistantAnswer = {
  text: `I only know what is on this site. Try a project name like Palettero or DinePine, or ask about stack, experience, availability or contact details. For anything else, email ${EMAIL}.`,
  links: [section("Selected work", "work"), section("Contact", "contact")],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function singular(word: string) {
  return word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word;
}

function score(entry: Entry, text: string, words: Set<string>) {
  let hits = 0;

  for (const keyword of entry.keywords) {
    const normalized = normalize(keyword);
    if (!normalized) continue;

    if (normalized.includes(" ")) {
      if (` ${text} `.includes(` ${normalized} `)) hits += 3;
      continue;
    }

    if (words.has(normalized) || words.has(singular(normalized))) hits += 1;
  }

  return hits === 0 ? 0 : hits + (entry.boost ?? 0);
}

export function answerFor(input: string): AssistantAnswer {
  const text = normalize(input);

  if (/(^| )(hi|hello|hey|salam|assalam|aoa|hola)( |$)/.test(text)) {
    return {
      text: "Hey! Ask me about any project, his stack, experience or availability. Project answers come with live and GitHub links.",
      links: [section("Selected work", "work")],
    };
  }

  if (!text) return FALLBACK;

  const words = new Set<string>();
  for (const word of text.split(" ")) {
    words.add(word);
    words.add(singular(word));
  }

  let best: AssistantAnswer | null = null;
  let bestScore = 0;

  for (const entry of ENTRIES) {
    const current = score(entry, text, words);
    if (current > bestScore) {
      best = entry.answer;
      bestScore = current;
    }
  }

  return best ?? FALLBACK;
}
