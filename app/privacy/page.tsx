import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this portfolio collects, and what it does not.",
};

const EMAIL_LINK_CLASS =
  "text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        This site does not use analytics, advertising, or tracking cookies. No
        analytics tool is installed, and no personal data is collected as you
        browse.
      </p>
      <p>
        The only things stored in your browser are your theme preference, a
        short-lived visit count in session storage, and a small local flag so
        repeat visits from the same browser are not counted twice. The visitor
        counter adds to a shared visit total that does not identify you, and
        none of it is shared with advertisers.
      </p>
      <p>
        There is no contact form on this site. The contact section links to
        email, WhatsApp and LinkedIn. If you email me, your email address and
        the contents of your message are handled by your email provider and
        mine. I use them only to reply.
      </p>
      <p>
        This site is hosted on Vercel. Vercel may keep standard server logs, such
        as IP address and browser details, to deliver and secure the site. I do
        not use those logs to identify visitors.
      </p>
      <p>
        I do not sell or share personal data. Questions about this page can go to{" "}
        <a href="mailto:saadkashif770@gmail.com" className={EMAIL_LINK_CLASS}>
          saadkashif770@gmail.com
        </a>
        .
      </p>
    </LegalPage>
  );
}
