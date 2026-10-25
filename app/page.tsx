import About from "@/components/About";
import Assistant from "@/components/Assistant";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import GoToTop from "@/components/GoToTop";
import Intro from "@/components/Intro";
import ScrollProgress from "@/components/ScrollProgress";
import SectionShell from "@/components/SectionShell";
import SelectedWork from "@/components/SelectedWork";
import Sidebar from "@/components/Sidebar";
import Stack from "@/components/Stack";
import { SECTIONS } from "@/data/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ScrollProgress />
      <Sidebar />
      <Assistant />
      <GoToTop />

      <div className="min-[900px]:ml-80">
        <div className="min-[900px]:pl-[78px] min-[900px]:pr-10">
          <div className="mx-auto max-w-[900px] px-5 min-[900px]:mx-0 min-[900px]:px-0">
            <main id="main-content">
              <div className="divide-y divide-line">
                {SECTIONS.map(({ id, index, label }) => {
                  if (id === "intro") return <Intro key={id} />;
                  if (id === "about") return <About key={id} />;
                  if (id === "work") return <SelectedWork key={id} />;
                  if (id === "experience") return <Experience key={id} />;
                  if (id === "stack") return <Stack key={id} />;
                  if (id === "faq") return <Faq key={id} />;
                  if (id === "contact") return <Contact key={id} />;

                  return (
                    <SectionShell
                      key={id}
                      id={id}
                      index={index}
                      label={label}
                    />
                  );
                })}
              </div>
            </main>

            <div className="pb-28">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
