import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-instrument",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-jetbrains",
  display: "swap",
});

const themeInitScript = `(function(){try{var s=localStorage.getItem("theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t;}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Saad | Full-Stack Web Developer",
  description: "Full-stack developer specializing in Next.js, React, Node.js, and web application management systems.",
  keywords: ["Software Developer", "Full Stack Engineer", "Next.js", "React", "Node.js", "Web Developer Portfolio"],
  authors: [{ name: "Saad" }],
  openGraph: {
    title: "Saad | Full-Stack Web Developer",
    description: "Full-stack developer building web applications, POS platforms, and management systems. Explore projects, engineering case studies, and skills.",
    type: "website",
    locale: "en_US",
    siteName: "Saad Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saad | Full-Stack Web Developer",
    description: "CS student building web applications, POS platforms, and management systems. Explore projects, engineering case studies, and skills.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
