import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuGithub,
  LuGlobe,
  LuLinkedin,
} from "react-icons/lu";
import { PROJECTS } from "@/data/projects";

export const dynamicParams = false;

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

function findProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

function hostOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) return { title: "Project not found" };

  const path = `/projects/${project.slug}`;
  const title = `${project.name} case study`;

  return {
    title,
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title,
      description: project.description,
      ...(project.image
        ? {
            images: [
              { url: project.image, alt: `${project.name} screenshot` },
            ],
          }
        : {}),
    },
    twitter: {
      card: project.image ? "summary_large_image" : "summary",
      title,
      description: project.description,
      ...(project.image ? { images: [project.image] } : {}),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((project) => project.slug === slug);

  if (index === -1) notFound();

  const project = PROJECTS[index];
  const nextProject = PROJECTS[(index + 1) % PROJECTS.length];

  const actions = [
    { key: "github", label: "GitHub", href: project.github, Icon: LuGithub },
    {
      key: "live",
      label: "Website",
      href: project.live,
      Icon: LuGlobe,
    },
    {
      key: "post",
      label: "Post",
      href: project.post ?? null,
      Icon: LuLinkedin,
    },
  ];

  return (
    <article
      data-project-slug={project.slug}
      className="py-12 min-[900px]:py-16"
    >
      <Link
        href="/#work"
        className={`inline-flex items-center gap-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink ${FOCUS_RING}`}
      >
        <LuArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        All projects
      </Link>

      <figure className="mt-8">
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-line-strong" />
              <span className="h-2 w-2 rounded-full bg-line-strong" />
              <span className="h-2 w-2 rounded-full bg-line-strong" />
            </span>
            <span className="ml-3 min-w-0 truncate rounded border border-line bg-canvas px-2 py-1 font-mono text-[10px] leading-none text-muted">
              {project.live ? hostOf(project.live) : "Preview"}
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full bg-surface-2">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                priority
                sizes="(min-width: 900px) 900px, 100vw"
                quality={82}
                className="object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {project.name}
                </span>
              </div>
            )}
          </div>
        </div>
        <figcaption className="sr-only">
          {project.name} interface preview
        </figcaption>
      </figure>

      <div
        role="group"
        aria-label="Project links"
        className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3"
      >
        {actions.map(({ key, label, href, Icon }) => {
          const content = (
            <>
              <span className="inline-flex items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {label}
              </span>
              <LuArrowUpRight
                className="h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </>
          );

          if (!href) {
            return (
              <span
                key={key}
                aria-disabled="true"
                title={`${label} not available`}
                data-action={key}
                data-disabled="true"
                className="flex cursor-not-allowed items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3.5 text-[13px] font-medium text-muted opacity-60"
              >
                {content}
                <span className="sr-only">Not available</span>
              </span>
            );
          }

          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-action={key}
              className={`group flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3.5 text-[13px] font-medium text-ink transition-[border-color,color] duration-200 hover:border-accent hover:text-accent ${FOCUS_RING}`}
            >
              {content}
            </a>
          );
        })}
      </div>

      <header className="mt-9">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <h1 className="font-display text-[clamp(2.5rem,7vw,4.25rem)] font-extrabold leading-[1.01] tracking-[-0.04em] text-ink">
            {project.name}
          </h1>
          {project.live ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              Live
            </span>
          ) : null}
        </div>

        <dl className="mt-6 flex flex-wrap items-start gap-x-10 gap-y-4 border-y border-line py-4">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Year
            </dt>
            <dd className="mt-1 text-[14px] text-ink">{project.year}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Type
            </dt>
            <dd className="mt-1 text-[14px] text-ink">
              {project.categories.join(" / ")}
            </dd>
          </div>
        </dl>

        <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.6] text-ink">
          {project.tagline}
        </p>
      </header>

      <section
        aria-labelledby="overview-title"
        className="mt-12 border-t border-line pt-8"
      >
        <h2
          id="overview-title"
          className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted"
        >
          Overview
        </h2>
        <div className="mt-4 space-y-4 text-[16px] leading-[1.7] text-muted">
          <p>{project.description}</p>
          {project.caseStudy ? <p>{project.caseStudy}</p> : null}
        </div>
      </section>

      <section
        aria-labelledby="stack-title"
        className="mt-10 border-t border-line pt-8"
      >
        <h2
          id="stack-title"
          className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted"
        >
          Stack used
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <li
              key={item}
              className="rounded border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] leading-none text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {project.hardCalls?.length ? (
        <section
          aria-labelledby="hard-calls-title"
          className="mt-10 border-t border-line pt-8"
        >
          <h2
            id="hard-calls-title"
            className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted"
          >
            The hard calls
          </h2>
          <ul className="mt-5 space-y-4">
            {project.hardCalls.map((call) => (
              <li key={call.title} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-accent"
                />
                <p className="text-[15px] leading-[1.65] text-muted">
                  <strong className="font-semibold text-ink">
                    {call.title}:
                  </strong>{" "}
                  {call.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav
        aria-label="Next project"
        className="mt-12 border-t border-line pt-6"
      >
        <Link
          href={`/projects/${nextProject.slug}`}
          className={`group flex items-center justify-between gap-4 rounded-lg ${FOCUS_RING}`}
        >
          <span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Next project
            </span>
            <span className="mt-1.5 block font-display text-[26px] font-extrabold tracking-[-0.03em] text-ink transition-colors group-hover:text-accent">
              {nextProject.name}
            </span>
          </span>
          <LuArrowRight
            className="h-5 w-5 shrink-0 text-muted transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden="true"
          />
        </Link>
      </nav>
    </article>
  );
}
