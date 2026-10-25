import About from "@/components/About";
import Experience from "@/components/Experience";
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

      <main id="main-content" className="min-[900px]:ml-80">
        <div className="min-[900px]:pl-[78px] min-[900px]:pr-10">
          <div className="mx-auto max-w-[900px] px-5 py-8 min-[900px]:mx-0 min-[900px]:px-0 min-[900px]:py-20">
            <div className="divide-y divide-line">
              {SECTIONS.map(({ id, index, label }) => {
                if (id === "intro") return <Intro key={id} />;
                if (id === "about") return <About key={id} />;
                if (id === "work") return <SelectedWork key={id} />;
                if (id === "experience") return <Experience key={id} />;
                if (id === "stack") return <Stack key={id} />;

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
          </div>
        </div>
      </main>
    </div>
  );
}
