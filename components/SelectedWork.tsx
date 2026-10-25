"use client";

import {
  Fragment,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import { LuArrowUpRight, LuChevronDown } from "react-icons/lu";
import Reveal from "@/components/Reveal";
import { PROJECTS, type Project } from "@/data/projects";

type FilterId = "all" | "live" | "full-stack" | "saas" | "earlier";

const FILTERS: { id: FilterId; label: string; count: number }[] = [
  { id: "all", label: "All", count: PROJECTS.length },
  {
    id: "live",
    label: "Live",
    count: PROJECTS.filter((project) => project.live).length,
  },
  {
    id: "full-stack",
    label: "Full Stack",
    count: PROJECTS.filter((project) =>
      project.categories.includes("Full Stack")
    ).length,
  },
  {
    id: "saas",
    label: "SaaS",
    count: PROJECTS.filter((project) =>
      project.categories.includes("SaaS")
    ).length,
  },
  {
    id: "earlier",
    label: "Earlier",
    count: PROJECTS.filter((project) => project.group === "earlier").length,
  },
];

function matches(project: Project, filter: FilterId) {
  if (filter === "all") return true;
  if (filter === "live") return project.live !== null;
  if (filter === "earlier") return project.group === "earlier";
  return project.categories.includes(
    filter === "full-stack" ? "Full Stack" : "SaaS"
  );
}

function MediaContent({ project, sizes }: { project: Project; sizes: string }) {
  if (!project.image) {
    return (
      <div className="flex h-full w-full items-center justify-center px-4">
        <span className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {project.name}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={project.image}
      alt={`${project.name} screenshot`}
      fill
      sizes={sizes}
      quality={90}
      className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
    />
  );
}

function TechTags({ tech, limit }: { tech: string[]; limit?: number }) {
  const visible = limit ? tech.slice(0, limit) : tech;
  const rest = limit ? tech.length - visible.length : 0;

  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {visible.map((item, index) => (
        <li
          key={item}
          style={{ "--tag-index": index } as CSSProperties}
          className="tech-tag rounded border border-line px-2 py-1 font-mono text-[10px] leading-none text-muted transition-[color,border-color,translate] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          {item}
        </li>
      ))}
      {rest > 0 && (
        <li
          style={{ "--tag-index": visible.length } as CSSProperties}
          className="tech-tag rounded border border-line px-2 py-1 font-mono text-[10px] leading-none text-muted"
        >
          +{rest}
        </li>
      )}
    </ul>
  );
}

function CardLink({
  project,
  className,
  children,
}: {
  project: Project;
  className: string;
  children: ReactNode;
}) {
  const href = project.live ?? project.github;

  if (!href) {
    return <div className={className}>{children}</div>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name}: open ${
        project.live ? "live site" : "GitHub repository"
      }`}
      className={`${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`}
    >
      {children}
    </a>
  );
}

function FeaturedCard({
  project,
  imageRight,
}: {
  project: Project;
  imageRight: boolean;
}) {
  return (
    <CardLink
      project={project}
      className="group block h-full overflow-hidden rounded-xl border border-line transition-[border-color,translate] duration-300 ease-out hover:-translate-y-1 hover:border-accent focus-visible:border-accent min-[1180px]:grid min-[1180px]:grid-cols-2"
    >
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface min-[1180px]:aspect-auto min-[1180px]:border-b-0 ${
          imageRight
            ? "min-[1180px]:order-2 min-[1180px]:border-l"
            : "min-[1180px]:border-r"
        }`}
      >
        <MediaContent
          project={project}
          sizes="(min-width: 1180px) 450px, 100vw"
        />
      </div>

      <div className="flex flex-col justify-center p-6 min-[1180px]:p-8">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
          {project.categories[0]}
        </span>

        <h3 className="mt-4 flex items-start gap-2 font-display text-[28px] font-extrabold leading-[1.03] tracking-[-0.03em] text-accent min-[1180px]:text-[34px]">
          {project.name}
          <LuArrowUpRight
            className="mt-1 h-5 w-5 shrink-0"
            aria-hidden="true"
          />
        </h3>

        <p className="mt-3 text-[14px] leading-relaxed text-ink">
          {project.tagline}
        </p>
        <p className="mt-3 text-[15px] leading-[1.65] text-muted">
          {project.description}
        </p>

        <TechTags tech={project.tech} />
      </div>
    </CardLink>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <CardLink
      project={project}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line transition-[border-color,translate] duration-300 ease-out hover:-translate-y-1 hover:border-accent focus-visible:border-accent"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface">
        <MediaContent
          project={project}
          sizes="(min-width: 1180px) 440px, 94vw"
        />
      </div>

      <div className="flex flex-1 flex-col bg-surface p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex items-start gap-1.5 font-display text-[21px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
            {project.name}
            <LuArrowUpRight
              className="mt-1 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent"
              aria-hidden="true"
            />
          </h3>
          <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {project.categories[0]}
          </span>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-ink">
          {project.tagline}
        </p>
        <p className="mt-2 line-clamp-2 text-[15px] leading-[1.6] text-muted">
          {project.description}
        </p>

        <div className="mt-auto">
          <TechTags tech={project.tech} limit={6} />
        </div>
      </div>
    </CardLink>
  );
}

function HardCalls({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  if (!project.hardCalls?.length) return null;

  const panelId = `hard-calls-${project.slug}`;

  return (
    <div className="border-t border-line pt-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="group flex w-full items-center justify-between gap-4 rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-ink">
          The hard calls for {project.name}
        </span>
        <span
          aria-hidden="true"
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-[color,border-color] duration-300 group-hover:border-line-strong group-hover:text-ink"
        >
          <LuChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 ease-out ${
              open ? "rotate-0" : "-rotate-90"
            }`}
          />
        </span>
      </button>

      <div
        id={panelId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
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
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = PROJECTS.filter((project) => matches(project, filter));
  const mainProjects = visible.filter((project) => project.group === "main");
  const earlierProjects = visible.filter(
    (project) => project.group === "earlier"
  );

  const featuredPositions = new Map<string, number>();
  mainProjects
    .filter((project) => project.featured)
    .forEach((project, index) => featuredPositions.set(project.slug, index));

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-[89px] py-20 min-[900px]:scroll-mt-8 min-[900px]:py-24"
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          <p className="eyebrow text-accent">02 / Selected work</p>
        </div>

        <h2
          id="work-title"
          className="mt-6 font-display text-[clamp(2.25rem,6vw,3.75rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink"
        >
          Built it. Shipped it. Still running it.
        </h2>
      </Reveal>

      <Reveal
        delay={80}
        className="mt-8 flex flex-wrap items-center justify-between gap-4"
      >
        <div
          role="group"
          aria-label="Filter projects"
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((item) => {
            const active = filter === item.id;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.id)}
                className={`inline-flex h-9 items-center gap-2.5 rounded-full border px-3.5 font-mono text-[12px] tracking-[0.01em] transition-[background-color,border-color,color,scale] duration-200 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                  active
                    ? "border-ink bg-ink text-canvas"
                    : "border-line text-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`h-4 w-px ${
                    active ? "bg-canvas/30" : "bg-line"
                  }`}
                />
                <span
                  className={`text-[11px] ${
                    active ? "text-canvas/70" : "text-muted"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="text-[12px] text-muted">
          Showing {visible.length}{" "}
          {visible.length === 1 ? "project" : "projects"}
        </p>
      </Reveal>

      {mainProjects.length > 0 && (
        <ul
          key={filter}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 min-[1180px]:grid-cols-2"
        >
          {mainProjects.map((project, index) => (
            <Fragment key={project.slug}>
              <li className={project.featured ? "min-[1180px]:col-span-2" : ""}>
                <Reveal
                  className="reveal-card h-full"
                  delay={(index % 2) * 80}
                >
                  {project.featured ? (
                    <FeaturedCard
                      project={project}
                      imageRight={
                        (featuredPositions.get(project.slug) ?? 0) % 2 === 1
                      }
                    />
                  ) : (
                    <ProjectCard project={project} />
                  )}
                </Reveal>
              </li>

              {project.hardCalls?.length ? (
                <li className="min-[1180px]:col-span-2">
                  <Reveal className="reveal-card" delay={60}>
                    <HardCalls project={project} />
                  </Reveal>
                </li>
              ) : null}
            </Fragment>
          ))}
        </ul>
      )}

      {earlierProjects.length > 0 && (
        <div
          className={`border-t border-line pt-8 ${
            mainProjects.length > 0 ? "mt-16" : "mt-12"
          }`}
        >
          <Reveal>
            <p className="eyebrow text-muted">Earlier work</p>
          </Reveal>
          <ul
            key={filter}
            className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 min-[1180px]:grid-cols-2"
          >
            {earlierProjects.map((project, index) => (
              <li key={project.slug}>
                <Reveal
                  className="reveal-card h-full"
                  delay={(index % 2) * 80}
                >
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
