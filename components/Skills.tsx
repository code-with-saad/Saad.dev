"use client";

import { motion } from "framer-motion";
import { Layout, Server, Database, Terminal, CheckCircle2 } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: any;
  skills: { name: string; description: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: Layout,
    skills: [
      { name: "React.js", description: "Hooks, state management, component architecture" },
      { name: "Next.js 14", description: "App router, SSR, static page optimization" },
      { name: "TypeScript", description: "Strong typing, interface definitions, API contracts" },
      { name: "JavaScript (ES6+)", description: "Async/await, DOM manipulation, ES modules" },
      { name: "Tailwind CSS", description: "Responsive layouts, custom themes, utility classes" },
      { name: "HTML5 & CSS3", description: "Semantic markup, flexbox, grid, accessibility" },
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    skills: [
      { name: "Node.js", description: "Async runtime, event loops, filesystem operations" },
      { name: "Express.js", description: "RESTful routing, middleware, error handling" },
      { name: "PHP 8", description: "Server-side scripts, session management, forms" },
      { name: "REST API Design", description: "CRUD endpoints, status codes, JSON formatting" },
      { name: "Auth & Security", description: "JWT tokens, password hashing, input sanitization" },
    ],
  },
  {
    title: "Database Management",
    icon: Database,
    skills: [
      { name: "MongoDB", description: "NoSQL document collections, aggregation pipelines" },
      { name: "MySQL", description: "Relational tables, foreign keys, InnoDB transactions" },
      { name: "Mongoose ODM", description: "Schema validation, population, document methods" },
      { name: "SQL Queries", description: "JOIN statements, indexing, relational normalization" },
    ],
  },
  {
    title: "Tools & Workflows",
    icon: Terminal,
    skills: [
      { name: "Git & GitHub", description: "Version control, branching, PR reviews, commits" },
      { name: "Postman", description: "API testing, payload inspection, header validation" },
      { name: "Vercel & Hosting", description: "Deployment pipelines, environment variables" },
      { name: "Chrome DevTools", description: "Performance auditing, network debugging, LCP" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b101d]/70 border-t border-slate-800/60">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
            03. Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Technical Skills
          </h2>
          <p className="text-slate-400 max-w-2xl text-base">
            Categorized technical stack that I actively use in full-stack projects and coursework.
          </p>
          <div className="w-12 h-1 bg-emerald-500 rounded-full" />
        </motion.div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-2xl p-[1px] transition-all duration-300 hover:shadow-[0_0_28px_2px_rgba(16,185,129,0.12)]"
              >
                {/* Animated conic-gradient border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 180deg, #10b981 0%, #0d9488 25%, #1e293b 50%, #0d9488 75%, #10b981 100%)",
                  }}
                />
                {/* Inner card */}
                <div className="relative rounded-2xl bg-[#0e1526] border border-slate-800 group-hover:border-transparent p-6 space-y-5 transition-colors duration-300 h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/30 hover:scale-[1.05] hover:shadow-[0_0_10px_0px_rgba(16,185,129,0.15)] transition-all duration-200 space-y-1"
                      >
                        <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{skill.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight pl-5">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
