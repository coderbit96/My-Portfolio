"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaBriefcase } from "react-icons/fa";
import Reveal, { revealItem } from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";
import { experience } from "@/data/experience";
import useReducedMotion from "@/hooks/useReducedMotion";

const fadeUp = revealItem();

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 55%"]
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="experience-v2 relative overflow-hidden">
      <div className="section-shell">
        <Reveal stagger amount={0.22} className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUp}>
            <Badge>Experience</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-balance font-display text-[clamp(2.2rem,7vw,5rem)] font-black leading-[1.02] tracking-[-0.06em] text-white"
          >
            <GradientText>My Professional Journey</GradientText>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            A concise timeline of Joydip&apos;s current software development role
            and internship experience.
          </motion.p>
        </Reveal>

        <div ref={timelineRef} className="experience-timeline">
          <div className="experience-timeline__rail" aria-hidden="true">
            <motion.span style={{ scaleY: shouldReduceMotion ? 1 : lineScale }} />
          </div>

          {experience.map((item, index) => {
            return (
              <motion.article
                key={`${item.role}-${item.period}`}
                className="experience-timeline-item"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="experience-timeline-item__point"
                  initial={shouldReduceMotion ? false : { scale: 0.78, opacity: 0.45 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  aria-hidden="true"
                >
                  <FaBriefcase />
                </motion.span>

                <div className="experience-timeline-card">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="experience-timeline-card__index">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3>{item.role}</h3>
                      <p className="experience-timeline-card__company">{item.company}</p>
                    </div>
                    <span className="experience-timeline-card__period">{item.period}</span>
                  </div>

                  <p className="experience-timeline-card__description">{item.description}</p>

                  <ul className="experience-responsibility-list">
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>

                  <div className="experience-timeline-card__footer">
                    <div className="experience-tag-list">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
