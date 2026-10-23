"use client";

import { useState } from "react";
import Image from "next/image";
import { PROJECTS, type Project } from "@/data/projects";

const FILTERS = ["All", "Full Stack", "SaaS", "Internship", "Earlier"] as const;

type Filter = (typeof FILTERS)[number];

const LINK_CLASS =
  "font-mono text-[11px] uppercase tracking-[0.14em] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

function matches(project: Project, filter: Filter) {
  if (filter === "All") return true;
  if (filter === "Earlier") return project.group === "earlier";
  return project.categories.includes(filter);
}

function metaText(project: Project) {
  const category = project.categories[0];

  return project.year === "TODO" ? category : `${category} · ${project.year}`;
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
      className="object-cover object-top"
    />
  );
}

function TechTags({ tech, limit }: { tech: string[]; limit?: number }) {
  const visible = limit ? tech.slice(0, limit) : tech;
  const rest = limit ? tech.length - visible.length : 0;

  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {visible.map((item) => (
        <li
          key={item}
          className="rounded border border-line px-2 py-1 font-mono text-[10px] leading-none text-muted"
        >
          {item}
        </li>
      ))}
      {rest > 0 && (
        <li className="rounded border border-line px-2 py-1 font-mono text-[10px] leading-none text-muted">
          +{rest}
        </li>
      )}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Live site for ${project.name}`}
          className={LINK_CLASS}
        >
          Live
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Code for ${project.name}`}
          className={LINK_CLASS}
        >
          Code
        </a>
      )}
      {project.caseStudy && (
        <a
          href={project.caseStudy}
          aria-label={`Case study for ${project.name}`}
          className={LINK_CLASS}
        >
          Case study
        </a>
      )}
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-line transition-colors hover:border-accent focus-within:border-accent min-[1180px]:grid min-[1180px]:grid-cols-2">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface min-[1180px]:aspect-auto min-[1180px]:border-b-0 min-[1180px]:border-r">
        <MediaContent
          project={project}
          sizes="(min-width: 1180px) 450px, 100vw"
        />
      </div>

      <div className="flex flex-col justify-center p-6 min-[1180px]:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          {metaText(project)}
        </p>
        <h3 className="mt-2 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink min-[1180px]:text-[32px]">
          {project.name}
        </h3>
        <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-accent">
          {project.tagline}
        </p>
        <p className="mt-4 text-[16px] leading-[1.65] text-muted">
          {project.description}
        </p>
        <TechTags tech={project.tech} />
        <div className="mt-6">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-surface transition-colors group-hover:border-accent group-focus-within:border-accent">
        <MediaContent
          project={project}
          sizes="(min-width: 1180px) 440px, 94vw"
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          {metaText(project)}
        </p>
        <h3 className="mt-2 font-display text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-[1.6] text-muted">
          {project.description}
        </p>
        <TechTags tech={project.tech} limit={6} />
        <div className="mt-auto pt-5">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

function EarlierCard({ project }: { project: Project }) {
  return (
    <article className="group grid grid-cols-[112px_1fr] items-start gap-4 min-[640px]:grid-cols-[168px_1fr] min-[640px]:items-center min-[640px]:gap-6">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-surface transition-colors group-hover:border-accent group-focus-within:border-accent">
        <MediaContent
          project={project}
          sizes="(min-width: 640px) 168px, 112px"
        />
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          {metaText(project)}
        </p>
        <h3 className="mt-1 font-display text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
          {project.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-[14px] leading-[1.55] text-muted">
          {project.description}
        </p>
        <TechTags tech={project.tech} limit={6} />
        <div className="mt-3">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export default function SelectedWork() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = PROJECTS.filter((project) => matches(project, filter));
  const mainProjects = visible.filter((project) => project.group === "main");
  const earlierProjects = visible.filter(
    (project) => project.group === "earlier"
  );

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-[89px] py-20 min-[900px]:scroll-mt-8 min-[900px]:py-24"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        <p className="eyebrow text-accent">02 / Selected work</p>
      </div>

      <h2 id="work-title" className="section-title mt-6">
        Built it. Shipped it.
      </h2>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filter projects"
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((item) => {
            const active = filter === item;

            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                  active
                    ? "border-ink bg-ink text-canvas"
                    : "border-line text-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
        >
          Showing {visible.length}{" "}
          {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {mainProjects.length > 0 && (
        <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 min-[1180px]:grid-cols-2">
          {mainProjects.map((project) => (
            <li
              key={project.slug}
              className={project.featured ? "min-[1180px]:col-span-2" : ""}
            >
              {project.featured ? (
                <FeaturedCard project={project} />
              ) : (
                <ProjectCard project={project} />
              )}
            </li>
          ))}
        </ul>
      )}

      {earlierProjects.length > 0 && (
        <div
          className={`border-t border-line pt-8 ${
            mainProjects.length > 0 ? "mt-16" : "mt-12"
          }`}
        >
          <p className="eyebrow text-muted">Earlier work</p>
          <ul className="mt-6 space-y-6">
            {earlierProjects.map((project) => (
              <li key={project.slug}>
                <EarlierCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
