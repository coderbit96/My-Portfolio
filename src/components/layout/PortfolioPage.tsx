"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import AuroraBackground from "@/components/animations/AuroraBackground";
import PremiumLoader from "@/components/animations/PremiumLoader";
import ScrollProgressBar from "@/components/animations/ScrollProgressBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ObservedSection from "@/components/layout/ObservedSection";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import { ScrollSpyProvider } from "@/providers/ScrollSpyProvider";

const PortfolioAssistant = dynamic(() => import("@/components/assistant/PortfolioAssistant"), {
  ssr: false,
  loading: () => null
});

export default function PortfolioPage() {
  const aboutSectionRef = useRef<HTMLElement | null>(null);

  return (
    <ScrollSpyProvider>
      <PremiumLoader />
      <AuroraBackground />
      <ScrollProgressBar />
      <Navbar />
      <main>
        <ObservedSection id="home">
          <Hero nextSectionRef={aboutSectionRef} />
        </ObservedSection>
        <ObservedSection id="about" minHeight="850px" sectionRef={aboutSectionRef}>
          <About />
        </ObservedSection>
        <ObservedSection id="skills" minHeight="900px">
          <Skills />
        </ObservedSection>
        <ObservedSection id="projects" minHeight="900px">
          <Projects />
        </ObservedSection>
        <ObservedSection id="experience" minHeight="900px">
          <Experience />
        </ObservedSection>
        <ObservedSection id="education" minHeight="650px">
          <Education />
        </ObservedSection>
        <ObservedSection id="contact" minHeight="850px">
          <Contact />
        </ObservedSection>
      </main>
      <Footer />
      <PortfolioAssistant />
    </ScrollSpyProvider>
  );
}
