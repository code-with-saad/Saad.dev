"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  overview: string;
  challengeSolution: string;
  stack: string[];
  techDecision: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: "dinepine",
    title: "DinePine",
    subtitle: "MERN Stack Restaurant Point of Sale (POS) System",
    category: "Full Stack Development",
    overview:
      "Engineered a full-stack POS system to eliminate billing latency and order miscommunication during peak hours. Built the interactive React order management dashboard, Node.js REST API endpoints, and MongoDB document schemas.",
    challengeSolution:
      "High-frequency concurrent order submissions from table tablets caused database state conflicts. Solved by implementing optimistic UI rendering combined with atomic MongoDB update operations ($inc and $push) to process concurrent orders with zero transactional lock latency.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
    techDecision:
      "Chosen for its flexible document schema allowing dynamic menu item modifiers and sub-second JSON response payloads.",
    image: "/projects/dinepine.png",
    liveUrl: "https://dinepine-pos.vercel.app",
    githubUrl: "https://github.com/code-with-saad/POS",
  },
  {
    id: "a1uniforms",
    title: "A1 Uniforms",
    subtitle: "E-Commerce Catalog Site with Dynamic Client-Side Filtering",
    category: "Frontend Development",
    overview:
      "Designed a responsive e-commerce web catalog allowing customers to filter uniforms across medical, academic, and workwear lines without page reloads. Created modern UI components and high-performance filtering logic.",
    challengeSolution:
      "Multi-attribute filter combinations (category, size, and search text) caused layout thrashing and DOM re-render delays. Solved by constructing an in-memory normalized product matrix with debounced inputs, cutting filter compute time to < 2ms.",
    stack: ["JavaScript (ES6+)", "HTML5", "CSS3 / Tailwind", "Vercel"],
    techDecision:
      "Vanilla JS eliminated framework bundle overhead, guaranteeing sub-100ms LCP on low-tier mobile hardware.",
    image: "/projects/a1uniforms.png",
    liveUrl: "https://a1uniforms.vercel.app",
    githubUrl: "https://github.com/code-with-saad/E-PROJECT",
  },
  {
    id: "covidcare",
    title: "COVID Care",
    subtitle: "PHP & MySQL Vaccination Booking & Inventory Management System",
    category: "Full Stack & Database",
    overview:
      "Architected a centralized healthcare management portal for citizen vaccination scheduling, hospital dose allocation, and certificate verification. Designed relational database schemas, PHP session auth, and admin dashboards.",
    challengeSolution:
      "Simultaneous patient requests for remaining vaccination slots posed a critical double-booking risk. Solved by implementing MySQL InnoDB row-level database locks (SELECT ... FOR UPDATE) inside atomic PHP database transactions.",
    stack: ["PHP 8", "MySQL", "Bootstrap", "HTML5/CSS3", "InfinityFree"],
    techDecision:
      "MySQL relational schema enforced strict foreign key constraints and ACID transactional integrity across appointment centers.",
    image: "/projects/covidcare.png",
    liveUrl: "https://covid-care.infinityfree.io",
    githubUrl: "https://github.com/code-with-saad/Covid-Care",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#090d16]/70">
      <div className="max-w-6xl mx-auto space-y-16">
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
            Detailed breakdown of production-ready applications, highlighting specific roles, technical choices, and engineering solutions.
          </p>
          <div className="w-12 h-1 bg-emerald-500 rounded-full" />
        </motion.div>

        {/* Project List */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#0e1526] border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/5 flex flex-col lg:flex-row gap-0 group hover:border-slate-700/80 transition-all duration-300"
            >
              {/* Image Column (54% width) */}
              <div className="lg:w-[54%] relative min-h-[280px] sm:min-h-[340px] bg-slate-950 flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-800/80">
                <div className="relative w-full h-full min-h-[250px] sm:min-h-[300px] rounded-xl overflow-hidden shadow-lg border border-slate-800">
                  <Image
                    src={project.image}
                    alt={`${project.title} Working UI Screenshot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 54vw"
                    className="object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1526]/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Text Column (46% width) */}
              <div className="lg:w-[46%] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                {/* Header & Meta */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight pt-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400">
                    {project.subtitle}
                  </p>
                </div>

                {/* 3 Main Content Blocks */}
                <div className="space-y-5 text-xs sm:text-sm text-slate-300">
                  {/* Block 1: Overview */}
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Overview
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {project.overview}
                    </p>
                  </div>

                  {/* Block 2: Challenge & Solution */}
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Challenge &amp; Solution
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {project.challengeSolution}
                    </p>
                  </div>

                  {/* Block 3: Tech Stack & Decision */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Tech Stack &amp; Rationale
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 leading-normal pt-0.5">
                      <span className="font-semibold text-slate-300">Rationale:</span> {project.techDecision}
                    </p>
                  </div>
                </div>

                {/* External Action Links with Hover / Tap Scale */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    aria-label={`Live Demo of ${project.title}`}
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>

                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
                    aria-label={`GitHub Repository for ${project.title}`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
