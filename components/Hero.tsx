"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Terminal } from "lucide-react";

// ─── Typewriter hook ───────────────────────────────────────────────────────────
const ROLES = [
  "Full-Stack Developer",
  "Software Engineering Student",
  "Problem Solver",
];

function useTypewriterCycle(interval = 2400) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), interval);
    return () => clearInterval(id);
  }, [interval]);
  return ROLES[index];
}

// ─── Terminal card data ────────────────────────────────────────────────────────
const CODE_LINES = [
  { indent: 0, text: "const developer = {", color: "text-slate-200" },
  { indent: 1, text: 'name:   "Saad Kashif",', color: "text-slate-300" },
  { indent: 1, text: 'role:   "Software Engineer",', color: "text-slate-300" },
  { indent: 1, text: "stack:  [", color: "text-slate-300" },
  { indent: 2, text: '"React", "Next.js",', color: "text-emerald-400" },
  { indent: 2, text: '"Node.js", "MongoDB",', color: "text-emerald-400" },
  { indent: 2, text: '"PHP", "MySQL",', color: "text-emerald-400" },
  { indent: 1, text: "],", color: "text-slate-300" },
  { indent: 1, text: 'status: "Open to internships",', color: "text-teal-300" },
  { indent: 0, text: "};", color: "text-slate-200" },
];

// ─── Framer variants ───────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Hero() {
  const currentRole = useTypewriterCycle();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#090d16]/80 via-[#0b1220]/70 to-[#090d16]/80"
    >
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Two-column layout: text left, terminal card right */}
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 text-center sm:text-left"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Seeking Software Engineering Internship</span>
              </div>
            </motion.div>

            {/* Name Heading */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
                Hi, I&apos;m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Saad
                </span>
              </h1>

              {/* Cycling role subtitle */}
              <div className="h-9 flex items-center justify-center sm:justify-start overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentRole}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="text-xl sm:text-2xl font-semibold text-emerald-300"
                  >
                    {currentRole}
                    <span className="ml-0.5 inline-block w-0.5 h-5 bg-emerald-400 align-middle animate-[blink_1s_step-end_infinite]" />
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              Combining a solid CS foundation with a Software Engineering diploma at Aptech. Building production-ready web apps, POS systems, and database platforms.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-col sm:flex-row items-center gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-colors duration-200 shadow-lg shadow-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold border border-slate-700/60 hover:border-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Contact Me</span>
              </motion.a>

              {/* Social Icons */}
              <div className="flex items-center gap-2 sm:ml-2 sm:pl-4 sm:border-l border-slate-800">
                <motion.a
                  href="https://github.com/code-with-saad"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/codewithsaad"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-xs text-slate-400 justify-center sm:justify-start"
            >
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Key Stack:
              </span>
              {["React / Next.js", "TypeScript", "Node.js & MongoDB", "PHP & MySQL"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Glassmorphism Terminal Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:flex flex-col"
            aria-hidden="true"
          >
            <div className="relative rounded-2xl border border-slate-700/60 bg-slate-900/70 backdrop-blur-md shadow-2xl shadow-black/40 overflow-hidden">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/80 bg-slate-950/60">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-slate-400">saad.config.ts</span>
              </div>

              {/* Code block */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.07 }}
                    className={`${line.color}`}
                    style={{ paddingLeft: `${line.indent * 1.5}rem` }}
                  >
                    {line.text}
                  </motion.div>
                ))}
                {/* Blinking cursor */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="mt-2 flex items-center gap-1 text-emerald-400"
                >
                  <span>$</span>
                  <span className="w-2 h-4 bg-emerald-400 animate-[blink_1s_step-end_infinite]" />
                </motion.div>
              </div>

              {/* Subtle glow */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-emerald-500/10 pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
