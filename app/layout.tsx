import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GameNova - Play Free Browser Games",
  description:
    "Discover and play the best free browser games. Racing, Action, Sports, Puzzle, Arcade, Adventure, Strategy games all in one place.",
  openGraph: {
    title: "GameNova - Play Free Browser Games",
    description: "Discover and play the best free browser games.",
    type: "website",
    siteName: "GameNova",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameNova - Play Free Browser Games",
    description: "Discover and play the best free browser games.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-dark text-gray-200 min-h-screen flex flex-col`}
      >
        <ParticlesBackground />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
