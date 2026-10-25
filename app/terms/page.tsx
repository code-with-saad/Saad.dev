import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms | Muhammad Saad",
  description: "The terms for using this portfolio.",
};

const EMAIL_LINK_CLASS =
  "text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export default function TermsPage() {
  return (
    <LegalPage title="Terms">
      <p>
        This site is my personal portfolio. The project write-ups and screenshots
        are for reference. Please do not republish them as your own work.
      </p>
      <p>
        Links to live projects and external profiles lead to sites I do not
        control. I am not responsible for their content, availability, or privacy
        practices.
      </p>
      <p>
        The site is provided as is. I may change or remove content at any time,
        and I do not guarantee that every link or statement stays current.
      </p>
      <p>
        Questions about these terms can go to{" "}
        <a href="mailto:saadkashif770@gmail.com" className={EMAIL_LINK_CLASS}>
          saadkashif770@gmail.com
        </a>
        .
      </p>
    </LegalPage>
  );
}
