import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
    <html lang="en" className={`${inter.className} scroll-smooth dark`}>
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
