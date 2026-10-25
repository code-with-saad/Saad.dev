const configured = process.env.NEXT_PUBLIC_SITE_URL;
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

function normalize(value: string) {
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

export const SITE_URL = normalize(configured || vercel || "saad-dev.vercel.app");
export const SITE_NAME = "Muhammad Saad";
export const SITE_TITLE = "Muhammad Saad | Full-Stack Developer";
export const SITE_DESCRIPTION =
  "Full-stack developer in Karachi building Next.js, React, Node.js and Python products end to end. Open to internships, full-time roles and freelance projects.";
export const GITHUB_URL = "https://github.com/code-with-saad";
export const LINKEDIN_URL = "https://www.linkedin.com/in/codewithsaad";
