"use client";

import { motion } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaCode,
  FaDatabase,
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

const codeLines = [
  "const developer = {",
  "  focus: 'Full-stack web apps',",
  "  stack: ['Next.js', 'React', 'Node'],",
  "  mindset: 'clean, scalable, useful'",
  "};"
];

export default function About() {
  return (
    <section className="about-v2 relative overflow-hidden">
      <div className="section-shell">
        <Reveal amount={0.28} className="relative z-10 mb-8 flex justify-center">
          <Badge>ABOUT ME</Badge>
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <Reveal stagger amount={0.28} className="relative z-10">
          <motion.h2
            variants={fadeUp}
            className="max-w-4xl font-display text-[clamp(2.1rem,4.05vw,3.25rem)] font-black leading-[1.02] tracking-[-0.045em] text-white xl:text-[clamp(2.5rem,4.45vw,4rem)]"
          >
            <span className="inline-block whitespace-nowrap">Passionate about building</span>
            <br />
            <GradientText>innovative solutions.</GradientText>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            I&apos;m Joydip Ghosh, a full-stack developer focused on turning clear
            ideas into responsive, maintainable web applications. My work
            blends frontend polish with practical backend thinking across
            React, Next.js, TypeScript, Node.js, MongoDB, WordPress, and SEO-aware
            delivery.
          </motion.p>

          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {capabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <motion.div key={capability.title} variants={fadeUp}>
                  <Card className="about-capability-card h-full p-4 sm:p-5">
                    <div className="flex gap-4">
                      <span className="about-capability-icon">
                        <Icon aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-sm font-black text-white">{capability.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{capability.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
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

        <Reveal amount={0.32} className="relative z-10">
          <div className="about-workspace">
            <div className="about-workspace__halo" aria-hidden="true" />

            <div className="about-workspace__window">
              <div className="about-workspace__topbar">
                <span />
                <span />
                <span />
              </div>

              <div className="about-workspace__body">
                <div className="about-workspace__sidebar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="about-workspace__editor">
                  {codeLines.map((line, index) => (
                    <div key={line} className="about-code-line">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <code>{line}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-workspace__panel about-workspace__panel--api">
              <FaServer aria-hidden="true" />
              <div>
                <span>API</span>
                <strong>REST ready</strong>
              </div>
            </div>

            <div className="about-workspace__panel about-workspace__panel--db">
              <FaDatabase aria-hidden="true" />
              <div>
                <span>Database</span>
                <strong>MongoDB</strong>
              </div>
            </div>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
