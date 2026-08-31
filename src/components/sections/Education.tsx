"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGraduationCap } from "react-icons/fa";
import Reveal, { revealItem } from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import GradientText from "@/components/ui/GradientText";
import { education } from "@/data/education";

const fadeUp = revealItem();

export default function Education() {
  return (
    <section className="education-v2 relative overflow-hidden">
      <div className="section-shell">
        <Reveal stagger amount={0.24} className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUp}>
            <Badge>Education</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-balance font-display text-[clamp(2rem,6vw,4.1rem)] font-black leading-[1.05] tracking-[-0.055em] text-white"
          >
            <GradientText>Education foundation</GradientText>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Academic documents preserved from the original portfolio, kept compact
            and easy to verify.
          </motion.p>
        </Reveal>

        <Reveal stagger amount={0.18} className="education-grid mt-10">
          {education.map((item) => (
            <motion.div key={item.degree} variants={fadeUp}>
              <Card
                as="article"
                className={`education-card ${item.featured ? "education-card--featured" : ""}`}
              >
                <div className="education-card__icon" aria-hidden="true">
                  <FaGraduationCap />
                </div>

                <div className="min-w-0">
                  <p className="education-card__label">
                    {item.featured ? "Primary education" : "Academic record"}
                  </p>
                  <h3>{item.degree}</h3>

                  <dl className="education-meta">
                    {item.university ? (
                      <div>
                        <dt>University</dt>
                        <dd>{item.university}</dd>
                      </div>
                    ) : null}
                    {item.institution ? (
                      <div>
                        <dt>Institution</dt>
                        <dd>{item.institution}</dd>
                      </div>
                    ) : null}
                    {item.year ? (
                      <div>
                        <dt>Year</dt>
                        <dd>{item.year}</dd>
                      </div>
                    ) : null}
                    {item.cgpa ? (
                      <div>
                        <dt>CGPA</dt>
                        <dd>{item.cgpa}</dd>
                      </div>
                    ) : null}
                  </dl>

                  <p className="education-card__description">{item.description}</p>

                  {item.documentFileName && item.documentLabel ? (
                    <a
                      href={`/${item.documentFileName}`}
                      target="_blank"
                      rel="noreferrer"
                      className="education-card__link"
                    >
                      {item.documentLabel}
                      <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </Card>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
