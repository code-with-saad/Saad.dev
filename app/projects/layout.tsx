import type { ReactNode } from "react";
import Assistant from "@/components/Assistant";
import CursorCompanion from "@/components/CursorCompanion";
import Footer from "@/components/Footer";
import GoToTop from "@/components/GoToTop";
import MobileNav from "@/components/MobileNav";
import ScrollProgress from "@/components/ScrollProgress";
import Sidebar from "@/components/Sidebar";

export default function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
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
            <main id="main-content">{children}</main>

            <div className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] min-[900px]:pb-0">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
