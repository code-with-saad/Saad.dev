"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#090d16] via-[#0b1220] to-[#090d16]"
    >
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Seeking Software Engineering Internship</span>
          </div>

          {/* Heading & Intro */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
              Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Saad</span>
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-slate-300 max-w-2xl leading-relaxed">
              Software Engineering Student & Full-Stack Developer building web apps and management systems.
            </p>
          </div>

          {/* Detailed Context */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Combining a solid Computer Science foundation with specialized Software Engineering diploma training at Aptech. Focused on building production-ready web applications, POS systems, and database platforms.
          </p>

          {/* Actions & Links */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold border border-slate-700/60 hover:border-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Contact Me</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:ml-4 border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Metrics / Tech Pills */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Key Stack:
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">React / Next.js</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">TypeScript</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">Node.js & MongoDB</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">PHP & MySQL</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
