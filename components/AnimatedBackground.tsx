export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#090d16]"
    >
      {/* Blob 1: Top-Left Teal / Emerald Gradient */}
      <div
        className="aurora-blob-1 absolute -top-40 -left-40 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-transparent blur-[120px] opacity-25"
      />

      {/* Blob 2: Middle-Right Blue / Cyan Gradient */}
      <div
        className="aurora-blob-2 absolute top-1/3 -right-40 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-bl from-cyan-500/20 via-sky-600/15 to-transparent blur-[130px] opacity-20"
      />

      {/* Blob 3: Bottom-Left Indigo / Emerald Glow */}
      <div
        className="aurora-blob-3 absolute -bottom-40 left-1/4 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-tr from-emerald-600/15 via-indigo-500/10 to-transparent blur-[140px] opacity-20"
      />

      {/* Subtle Noise / Radial Depth Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#090d16_90%)] opacity-80" />
    </div>
  );
}
