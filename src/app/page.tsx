"use client";

import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { Marquee } from "@/components/portfolio/marquee";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Projects } from "@/components/portfolio/projects";
import { Experience } from "@/components/portfolio/experience";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { MatrixRain } from "@/components/portfolio/matrix-rain";
import { CustomCursor } from "@/components/portfolio/custom-cursor";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      {/* Global ambience */}
      <MatrixRain />
      <CustomCursor />
      <div
        aria-hidden
        className="scanlines pointer-events-none fixed inset-0 z-[90] opacity-25"
      />

      <Navbar />

      <main className="grow">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
