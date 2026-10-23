import ScrollProgress from "@/components/ScrollProgress";
import SectionShell from "@/components/SectionShell";
import Sidebar from "@/components/Sidebar";
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
              {SECTIONS.map(({ id, index, label }) => (
                <SectionShell key={id} id={id} index={index} label={label} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
