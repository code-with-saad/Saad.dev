import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      <LoadingScreen />
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
