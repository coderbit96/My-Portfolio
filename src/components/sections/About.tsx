"use client";

import { motion } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaCode,
  FaDownload,
  FaLayerGroup,
  FaServer
} from "react-icons/fa";
import Reveal, { revealItem } from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import GradientText from "@/components/ui/GradientText";
import { publicAssetUrl } from "@/lib/publicAssetUrl";

const fadeUp = revealItem();
const resumeHref = publicAssetUrl("resume/Joydip-Ghosh-Resume.pdf");

const capabilities = [
  {
    title: "MERN Stack Development",
    description: "Full-stack application flows with MongoDB, Express, React, and Node.js.",
    icon: FaLayerGroup
  },
  {
    title: "Next.js & TypeScript",
    description: "Typed, component-led interfaces with scalable frontend architecture.",
    icon: FaCode
  },
  {
    title: "REST API Development",
    description: "Clean backend endpoints for practical product and dashboard needs.",
    icon: FaServer
  },
  {
    title: "Deployment & Optimization",
    description: "Responsive delivery, performance awareness, and production-ready polish.",
    icon: FaCloudUploadAlt
  }
];

export default function About() {
  return (
    <section className="about-v2 relative overflow-hidden">
      <div className="section-shell">
        <Reveal amount={0.28} className="relative z-10 mb-8 flex justify-center">
          <Badge>ABOUT ME</Badge>
        </Reveal>

        <div className="grid items-center">
        <Reveal stagger amount={0.28} className="relative z-10">
          <motion.h2
            variants={fadeUp}
            className="mx-auto text-center font-display text-[clamp(1.65rem,7vw,3.1rem)] font-black leading-[1.05] tracking-[-0.045em] text-white sm:whitespace-nowrap sm:text-[clamp(0.9rem,3.15vw,3.1rem)] sm:leading-[1.02]"
          >
            <span>Passionate about building </span>
            <GradientText>Innovative Solutions.</GradientText>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-center text-base leading-8 text-slate-300 sm:text-lg"
          >
            I&apos;m Joydip Ghosh, an AI Full Stack Developer focused on turning clear
            ideas into responsive, maintainable web applications. My work
            blends frontend polish with practical backend thinking across
            React, Next.js, TypeScript, Node.js, MongoDB, WordPress, and SEO-aware
            delivery.
          </motion.p>

          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
            className="mt-8"
          >
            <Card className="about-capability-card">
              <ul className="about-capability-list">
                {capabilities.map((capability) => {
                  const Icon = capability.icon;

                  return (
                    <li key={capability.title} className="about-capability-item">
                      <span className="about-capability-icon">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="about-capability-copy">
                        <strong>{capability.title}</strong>
                        <small>{capability.description}</small>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={resumeHref}
              download="Joydip-Ghosh-Resume.pdf"
              className="about-resume-link"
              aria-label="Download Joydip Ghosh CV as a PDF"
              data-cursor="link"
            >
              <FaDownload aria-hidden="true" />
              Download CV
            </a>
            <a
              href="/resume"
              className="about-resume-link about-resume-link--secondary"
              aria-label="Preview Joydip Ghosh resume in the browser"
              data-cursor="link"
            >
              Preview resume
            </a>
          </motion.div>
        </Reveal>

        </div>
      </div>
    </section>
  );
}
