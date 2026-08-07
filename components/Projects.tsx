"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronRight, ChevronLeft, Maximize2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  shortDescription: string;
  overview: string;
  challengeSolution: string;
  stack: string[];
  techDecision: string;
  image: string;
  images: string[];
  liveUrl: string;
  githubUrl: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: "dinepine",
    title: "DinePine",
    subtitle: "MERN Stack Restaurant POS System",
    category: "Full Stack Development",
    shortDescription:
      "Full-stack restaurant point-of-sale system eliminating billing latency and order miscommunication during peak hours.",
    overview:
      "Engineered a full-stack POS system to eliminate billing latency and order miscommunication during peak hours. Built the interactive React order management dashboard, Node.js REST API endpoints, and MongoDB document schemas.",
    challengeSolution:
      "High-frequency concurrent order submissions from table tablets caused database state conflicts. Solved by implementing optimistic UI rendering combined with atomic MongoDB update operations ($inc and $push) to process concurrent orders with zero transactional lock latency.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
    techDecision:
      "Chosen for its flexible document schema allowing dynamic menu item modifiers and sub-second JSON response payloads.",
    image: "/projects/dinepine.png",
    images: [
      "/projects/dinepine.png",
      "/projects/dinepine_dash.png",
      "/projects/dinepine_bill.png",
    ],
    liveUrl: "https://dinepine-pos.vercel.app",
    githubUrl: "https://github.com/code-with-saad/POS",
  },
  {
    id: "a1uniforms",
    title: "A1 Uniforms",
    subtitle: "E-Commerce Catalog with Client-Side Filtering",
    category: "Frontend Development",
    shortDescription:
      "Responsive e-commerce catalog with real-time multi-attribute filtering across medical, academic, and workwear product lines.",
    overview:
      "Designed a responsive e-commerce web catalog allowing customers to filter uniforms across medical, academic, and workwear lines without page reloads. Created modern UI components and high-performance filtering logic.",
    challengeSolution:
      "Multi-attribute filter combinations (category, size, and search text) caused layout thrashing and DOM re-render delays. Solved by constructing an in-memory normalized product matrix with debounced inputs, cutting filter compute time to < 2ms.",
    stack: ["JavaScript (ES6+)", "HTML5", "CSS3 / Tailwind", "Vercel"],
    techDecision:
      "Vanilla JS eliminated framework bundle overhead, guaranteeing sub-100ms LCP on low-tier mobile hardware.",
    image: "/projects/a1uniforms.png",
    images: [
      "/projects/a1uniforms.png",
      "/projects/a1uniforms_grid.png",
      "/projects/a1uniforms_filter.png",
    ],
    liveUrl: "https://a1uniforms.vercel.app",
    githubUrl: "https://github.com/code-with-saad/E-PROJECT",
  },
  {
    id: "covidcare",
    title: "COVID Care",
    subtitle: "PHP & MySQL Vaccination Management System",
    category: "Full Stack & Database",
    shortDescription:
      "Centralized healthcare portal for citizen vaccination scheduling, hospital dose allocation, and certificate verification.",
    overview:
      "Architected a centralized healthcare management portal for citizen vaccination scheduling, hospital dose allocation, and certificate verification. Designed relational database schemas, PHP session auth, and admin dashboards.",
    challengeSolution:
      "Simultaneous patient requests for remaining vaccination slots posed a critical double-booking risk. Solved by implementing MySQL InnoDB row-level database locks (SELECT ... FOR UPDATE) inside atomic PHP database transactions.",
    stack: ["PHP 8", "MySQL", "Bootstrap", "HTML5/CSS3", "InfinityFree"],
    techDecision:
      "MySQL relational schema enforced strict foreign key constraints and ACID transactional integrity across appointment centers.",
    image: "/projects/covidcare.png",
    images: [
      "/projects/covidcare.png",
      "/projects/covidcare_form.png",
      "/projects/covidcare_admin.png",
    ],
    liveUrl: "https://covid-care.infinityfree.io",
    githubUrl: "https://github.com/code-with-saad/Covid-Care",
  },
];

const MAX_VISIBLE_PILLS = 3;

// ─── Image Lightbox Modal (Click to View Full Size with Next/Prev) ────────────
function ImageLightboxModal({
  images,
  initialIndex,
  projectTitle,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  projectTitle: string;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1));
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [images.length, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <div
          className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between py-3 px-4 text-white text-sm">
            <div className="font-semibold">
              {projectTitle} — Preview {currentIndex + 1} of {images.length}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
            <Image
              src={images[currentIndex]}
              alt={`${projectTitle} screenshot ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full mt-4 px-2">
            <button
              onClick={() => setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition-colors font-medium text-xs"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <div className="flex items-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? "bg-emerald-400 w-6" : "bg-slate-700 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition-colors font-medium text-xs"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Case Study Modal ─────────────────────────────────────────────────────────
function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTab = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    []
  );

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        key="dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} Case Study`}
        ref={dialogRef}
        onKeyDown={handleTab}
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0e1526] border border-slate-700/80 shadow-2xl shadow-black/60"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-800/80 bg-[#0e1526]/95 backdrop-blur-sm">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400 font-mono">
                Case Study
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-7 text-sm">
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Overview
              </h4>
              <p className="text-slate-300 leading-relaxed">{project.overview}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Challenge &amp; Solution
              </h4>
              <p className="text-slate-300 leading-relaxed">{project.challengeSolution}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Tech Stack &amp; Rationale
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-700 text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                <span className="font-semibold text-slate-300">Rationale: </span>
                {project.techDecision}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-3 flex-wrap">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onOpenModal,
  onOpenLightbox,
}: {
  project: Project;
  index: number;
  onOpenModal: (p: Project) => void;
  onOpenLightbox: (images: string[], initialIdx: number, title: string) => void;
}) {
  const visibleStack = project.stack.slice(0, MAX_VISIBLE_PILLS);
  const extraCount = project.stack.length - MAX_VISIBLE_PILLS;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={[
        "group flex flex-col rounded-2xl overflow-hidden",
        "bg-slate-900/60 backdrop-blur-md",
        "border border-slate-800/90",
        "shadow-md",
        "transition-all duration-300 ease-out",
        "hover:border-emerald-500/50",
        "hover:shadow-lg hover:shadow-emerald-500/10",
        "hover:-translate-y-1",
      ].join(" ")}
    >
      {/* ── Clear & Clean Image Preview Box with Active Tab & Lightbox ── */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex flex-col group/img">
        {/* Active Screen Display */}
        <div
          className="relative w-full h-full cursor-pointer overflow-hidden"
          onClick={() => onOpenLightbox(project.images, activeTab, project.title)}
        >
          {project.images.map((imgUrl, imgIdx) => (
            <div
              key={imgUrl}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                activeTab === imgIdx
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-95 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={imgUrl}
                alt={`${project.title} preview ${imgIdx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                priority={index === 0 && imgIdx === 0}
              />
            </div>
          ))}

          {/* Dim overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none z-20" />

          {/* Lightbox hint icon */}
          <div className="absolute top-3 right-3 z-30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg bg-slate-900/80 text-emerald-400 border border-slate-700 backdrop-blur-sm">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Category Badge */}
        <span className="absolute bottom-3 left-3 z-30 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 backdrop-blur-sm pointer-events-none">
          {project.category}
        </span>

        {/* Hover / Click Image Switcher Pills (01, 02, 03) */}
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 p-1 rounded-lg backdrop-blur-md">
          {project.images.map((_, tabIdx) => (
            <button
              key={tabIdx}
              onMouseEnter={() => setActiveTab(tabIdx)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(tabIdx);
              }}
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold transition-all ${
                activeTab === tabIdx
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
              aria-label={`Switch to image ${tabIdx + 1}`}
            >
              0{tabIdx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Title + subtitle */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-white tracking-tight leading-snug">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-slate-600 shrink-0">
              0{index + 1}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">{project.subtitle}</p>
        </div>

        {/* Short description */}
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {visibleStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 border border-slate-700/80 text-slate-300"
            >
              {tech}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 border border-slate-700/80 text-slate-400">
              +{extraCount} more
            </span>
          )}
        </div>

        {/* ── Footer actions ── */}
        <div className="mt-auto pt-3 border-t border-slate-800/80 flex items-center gap-2 flex-wrap">
          {/* View Case Study */}
          <button
            onClick={() => onOpenModal(project)}
            className={[
              "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg",
              "bg-emerald-500/10 border border-emerald-500/25 text-emerald-300",
              "font-semibold text-xs",
              "transition-all duration-200 ease-out",
              "hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-200",
              "focus:outline-none focus:ring-2 focus:ring-emerald-500",
            ].join(" ")}
            aria-label={`View case study for ${project.title}`}
          >
            <span>Case Study</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg",
              "bg-emerald-500 text-slate-950 font-bold text-xs",
              "transition-all duration-200 ease-out",
              "hover:bg-emerald-400",
              "focus:outline-none focus:ring-2 focus:ring-emerald-400",
            ].join(" ")}
            aria-label={`Live demo of ${project.title}`}
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "inline-flex items-center gap-2 px-3.5 py-2 rounded-lg",
              "bg-slate-800 border border-slate-700/80 text-slate-300 font-semibold text-xs",
              "transition-all duration-200 ease-out",
              "hover:bg-slate-700 hover:text-white",
              "focus:outline-none focus:ring-2 focus:ring-slate-500",
            ].join(" ")}
            aria-label={`GitHub repo for ${project.title}`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [lightboxData, setLightboxData] = useState<{
    images: string[];
    initialIdx: number;
    title: string;
  } | null>(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#090d16]/70">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
            02. Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Featured Projects
          </h2>
          <p className="text-slate-400 max-w-2xl text-base">
            Production-ready applications built end-to-end. Click{" "}
            <span className="text-emerald-400 font-medium">Case Study</span> on any card
            to read the full engineering breakdown.
          </p>
          <div className="w-12 h-1 bg-emerald-500 rounded-full" />
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={setActiveProject}
              onOpenLightbox={(images, initialIdx, title) =>
                setLightboxData({ images, initialIdx, title })
              }
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <CaseStudyModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxData && (
        <ImageLightboxModal
          images={lightboxData.images}
          initialIndex={lightboxData.initialIdx}
          projectTitle={lightboxData.title}
          onClose={() => setLightboxData(null)}
        />
      )}
    </section>
  );
}
