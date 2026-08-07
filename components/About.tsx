"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Code2, Rocket, CheckCircle2 } from "lucide-react";

const cardClass =
  "p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 " +
  "hover:-translate-y-1.5 hover:border-emerald-500/40 hover:bg-slate-900 " +
  "hover:shadow-[0_4px_20px_0px_rgba(16,185,129,0.08)] " +
  "transition-all duration-200 ease-out";

const principleClass =
  "p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3 " +
  "hover:-translate-y-1.5 hover:border-emerald-500/40 hover:bg-slate-900/60 " +
  "hover:shadow-[0_4px_20px_0px_rgba(16,185,129,0.08)] " +
  "transition-all duration-200 ease-out";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b101d]/70 border-y border-slate-800/60">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {/* Section Header */}
          <div className="space-y-2">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
              01. About Me
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Background &amp; Education
            </h2>
            <div className="w-12 h-1 bg-emerald-500 rounded-full" />
          </div>

          {/* Main Bio Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Bio Text */}
            <div className="md:col-span-2 space-y-4 text-slate-300 leading-relaxed text-base">
              <p>
                My passion for technology began during my Matriculation where I studied Computer Science. Following my Intermediate studies in Commerce, I pursued an intensive{" "}
                <strong className="text-emerald-400 font-semibold">Advanced Diploma in Software Engineering (ADSE) at Aptech Institute</strong>{" "}
                to bridge theory with production-level software development skills.
              </p>
              <p>
                Through rigorous coursework and hands-on full-stack development, I have mastered building modern web applications across both the MERN stack (MongoDB, Express, React, Node.js) and relational PHP/MySQL web platforms.
              </p>
              <p>
                I focus on writing clean TypeScript code, architecting efficient database models, and building high-performance responsive interfaces. I am actively seeking a Software Engineering Internship to apply my skills on production web applications.
              </p>
            </div>

            {/* Quick Cards */}
            <div className="space-y-4">
              <div className={cardClass}>
                <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm">
                  <GraduationCap className="w-5 h-5" />
                  <span>Education Track</span>
                </div>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-100 block">Aptech Institute</strong>
                  Diploma in Software Engineering (ADSE).
                </p>
                <p className="text-[11px] text-slate-400">
                  Matric: CS Background | Inter: Commerce
                </p>
              </div>

              <div className={cardClass}>
                <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm">
                  <BookOpen className="w-5 h-5" />
                  <span>Core Coursework</span>
                </div>
                <p className="text-xs text-slate-300">
                  Web Systems, Database Design, OOP, RESTful Services &amp; UI Engineering.
                </p>
              </div>

              <div className={cardClass}>
                <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm">
                  <Rocket className="w-5 h-5" />
                  <span>Actively Learning</span>
                </div>
                <p className="text-xs text-slate-300">
                  Next.js 14 App Router Server Components &amp; System Design.
                </p>
              </div>
            </div>
          </div>

          {/* Core Principles */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={principleClass}>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-slate-100">Practical Skills</h4>
                <p className="text-xs text-slate-400 mt-1">Real working projects in MERN &amp; PHP/MySQL stacks.</p>
              </div>
            </div>

            <div className={principleClass}>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-slate-100">Clean Architecture</h4>
                <p className="text-xs text-slate-400 mt-1">Modular components, clear data flow, and typed APIs.</p>
              </div>
            </div>

            <div className={principleClass}>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-slate-100">Continuous Growth</h4>
                <p className="text-xs text-slate-400 mt-1">Dedicated to continuous learning and professional growth.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
