"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Smooth progress counter over 1.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 55);

    // Hard-capped timer at 1.3 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 400); // 400ms fade-out duration
    }, 1300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      role="status"
      aria-busy="true"
      className={`fixed inset-0 z-[100] bg-[#090d16] flex flex-col items-center justify-center px-4 transition-opacity duration-400 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center space-y-6 max-w-xs w-full text-center">
        {/* Glowing Outer Ring with Orbit Element */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Ring Glow */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.25)]" />
          
          {/* Orbiting Rotating Element */}
          <div className="absolute inset-0 rounded-full border-t-2 border-emerald-400 animate-orbit" />
          
          {/* Inner Glowing Core Dot */}
          <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]" />
        </div>

        {/* Brand Text */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Saad<span className="text-emerald-400">.dev</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Software Developer Portfolio
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-2 pt-2">
          <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800/80 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Loading...</span>
            <span className="text-emerald-400 font-semibold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
