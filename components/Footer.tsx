import { Github, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-[#070a11] border-t border-slate-800/80 text-xs text-slate-400">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left copyright */}
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>
            © {new Date().getFullYear()} Saad. Built with Next.js 14, TypeScript & Tailwind CSS.
          </span>
        </div>

        {/* Right GitHub Repo link */}
        <a
          href="https://github.com/Saad-Software-Engineer/Personal-Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>Source Code on GitHub</span>
        </a>
      </div>
    </footer>
  );
}
