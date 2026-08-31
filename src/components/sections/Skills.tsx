"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type PointerEvent } from "react";
import { FaLayerGroup } from "react-icons/fa";
import Reveal, { revealItem } from "@/components/animations/Reveal";
import { skillCategories, skills } from "@/data/skills";
import type { SkillCategory } from "@/types/portfolio";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import GradientText from "@/components/ui/GradientText";
import useReducedMotion from "@/hooks/useReducedMotion";
import useDesktopMotion from "@/hooks/useDesktopMotion";

const fadeUp = revealItem();

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>(skillCategories[0]);
  const shouldReduceMotion = useReducedMotion();
  const desktopMotionEnabled = useDesktopMotion();

  const visibleSkills = useMemo(
    () => skills.filter((skill) => skill.category === activeCategory),
    [activeCategory]
  );

  const handleCardPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!desktopMotionEnabled || shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--skill-spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--skill-spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <section className="skills-v2 relative overflow-hidden">
      <div className="section-shell">
        <Reveal stagger amount={0.2} className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUp}>
            <Badge>Skills</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-balance font-display text-[clamp(2.15rem,7vw,4.75rem)] font-black leading-[1.02] tracking-[-0.055em] text-white"
          >
            <GradientText>Technologies I work with</GradientText>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            A practical full-stack toolkit grouped by how I use it across interfaces,
            APIs, databases, deployments, and day-to-day engineering workflow.
          </motion.p>
        </Reveal>

        <Reveal
          amount={0.35}
          className="skills-category-tabs mt-10"
          role="tablist"
          aria-label="Technology categories"
        >
          {skillCategories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="skills-panel"
                id={`skills-tab-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className={`skills-category-tab ${isActive ? "skills-category-tab--active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </Reveal>

        <div
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`skills-tab-${activeCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          className="mt-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {visibleSkills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <Card
                    key={skill.name}
                    as="article"
                    onPointerMove={handleCardPointerMove}
                    className="skill-card-v2 group p-4 sm:p-5"
                  >
                    <div className="skill-card-v2__icon">
                      <Icon aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-sm font-black text-white sm:text-base">{skill.name}</h3>
                    {skill.context ? (
                      <p className="mt-2 text-xs leading-5 text-slate-300 sm:text-sm">{skill.context}</p>
                    ) : null}
                  </Card>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal amount={0.35} className="skills-summary-card mt-8">
          <FaLayerGroup aria-hidden="true" />
          <span>
            Showing {visibleSkills.length} {activeCategory.toLowerCase()} technologies — no artificial percentage scores,
            just the tools Joydip actually works with.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
