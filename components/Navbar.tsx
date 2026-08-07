"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Code2 } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 shadow-md py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 text-slate-100 font-bold text-lg hover:text-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg px-1.5 py-1"
          aria-label="Saad Portfolio Home"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Code2 className="w-4 h-4" />
          </div>
          <span>Saad<span className="text-emerald-400">.dev</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 rounded-lg transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Social Icons & Action */}
        <div className="hidden md:flex items-center space-x-3 border-l border-slate-800 pl-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d1424] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-800/80 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-800/80 flex items-center space-x-4 px-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white py-1.5"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white py-1.5"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
