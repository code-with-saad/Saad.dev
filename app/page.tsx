import About from "@/components/About";
import Assistant from "@/components/Assistant";
import Contact from "@/components/Contact";
import CursorCompanion from "@/components/CursorCompanion";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import GoToTop from "@/components/GoToTop";
import Intro from "@/components/Intro";
import MobileNav from "@/components/MobileNav";
import ScrollProgress from "@/components/ScrollProgress";
import SectionShell from "@/components/SectionShell";
import SelectedWork from "@/components/SelectedWork";
import Sidebar from "@/components/Sidebar";
import Stack from "@/components/Stack";
import { SECTIONS } from "@/data/sections";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/data/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/saad.jpg`,
      jobTitle: "Full-Stack Developer",
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karachi",
        addressCountry: "PK",
      },
      sameAs: [GITHUB_URL, LINKEDIN_URL],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "Python",
        "FastAPI",
        "Flutter",
        "MongoDB",
        "PostgreSQL",
        "Docker",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${SITE_NAME} Portfolio`,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ScrollProgress />
      <Sidebar />
      <MobileNav />
      <Assistant />
      <CursorCompanion />
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
