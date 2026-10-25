import type { IconType } from "react-icons";
import {
  LuBox,
  LuCode,
  LuFlaskConical,
  LuRadio,
  LuSparkles,
} from "react-icons/lu";
import {
  SiCloudflareworkers,
  SiCss,
  SiExpress,
  SiGithubactions,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPosthog,
  SiReact,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVitest,
  SiZod,
} from "react-icons/si";

const TECH_ICONS: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Tailwind CSS v4": SiTailwindcss,
  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  "Cloudflare Workers": SiCloudflareworkers,
  PostHog: SiPosthog,
  Gemini: SiGooglegemini,
  Grok: LuSparkles,
  "Workers AI": LuSparkles,
  Zustand: LuBox,
  Zod: SiZod,
  Playwright: LuFlaskConical,
  Vitest: SiVitest,
  "GitHub Actions": SiGithubactions,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  Stripe: SiStripe,
  WebSocket: LuRadio,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  PHP: SiPhp,
  MySQL: SiMysql,
};

export default function TechIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const Icon = TECH_ICONS[name] ?? LuCode;

  return <Icon className={className} aria-hidden="true" />;
}
