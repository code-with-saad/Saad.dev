import Sidebar from "@/components/Sidebar";
import SectionShell from "@/components/SectionShell";

const SECTIONS = [
  { id: "intro", index: "00", label: "INTRO", title: "Intro" },
  { id: "about", index: "01", label: "ABOUT", title: "About" },
  {
    id: "work",
    index: "02",
    label: "SELECTED WORK",
    title: "Selected work",
  },
  {
    id: "experience",
    index: "03",
    label: "EXPERIENCE",
    title: "Experience",
  },
  { id: "stack", index: "04", label: "STACK", title: "Stack" },
  { id: "contact", index: "05", label: "CONTACT", title: "Contact" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Sidebar />

      <main id="main-content" className="min-[900px]:ml-80">
        <div className="min-[900px]:pl-[78px] min-[900px]:pr-10">
          <div className="mx-auto max-w-[900px] px-5 py-8 min-[900px]:mx-0 min-[900px]:px-0 min-[900px]:py-20">
            <div className="divide-y divide-line">
              {SECTIONS.map((section) => (
                <SectionShell
                  key={section.id}
                  id={section.id}
                  index={section.index}
                  label={section.label}
                  title={section.title}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
