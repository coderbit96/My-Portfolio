"use client";

import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { FaExternalLinkAlt, FaGraduationCap } from "react-icons/fa";
import Reveal, { revealItem } from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";
import { education } from "@/data/education";
import type { EducationItem } from "@/types/portfolio";
import useDesktopMotion from "@/hooks/useDesktopMotion";
import useReducedMotion from "@/hooks/useReducedMotion";

const fadeUp = revealItem();

interface EducationCardProps {
  item: EducationItem;
  shouldReduceMotion: boolean;
  desktopMotionEnabled: boolean;
  onPointerMove: (_event: PointerEvent<HTMLElement>) => void;
}

function EducationCard({
  item,
  shouldReduceMotion,
  desktopMotionEnabled,
  onPointerMove
}: EducationCardProps) {
  const shellControls = useAnimationControls();
  const rotationY = useMotionValue(0);
  const contentRotationY = useTransform(rotationY, (latestRotation) => -latestRotation);
  const isRotatingRef = useRef(false);
  const rotationAnimationRef = useRef<ReturnType<typeof animate> | null>(null);

  const handleHoverStart = async () => {
    if (!desktopMotionEnabled || shouldReduceMotion || isRotatingRef.current) return;

    isRotatingRef.current = true;

    try {
      shellControls.set({ scale: 1, y: 0, rotateZ: 0 });
      rotationY.set(0);

      const rotationAnimation = animate(rotationY, [0, 180, 360], {
        duration: 0.48,
        ease: [0.16, 1, 0.3, 1],
        times: [0, 0.55, 1]
      });

      rotationAnimationRef.current = rotationAnimation;

      await Promise.all([
        rotationAnimation,
        shellControls.start({
          scale: [1, 0.985, 1],
          y: [0, -6, 0],
          rotateZ: [0, 0.45, 0],
          transition: {
            duration: 0.48,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.55, 1]
          }
        })
      ]);

      rotationY.set(0);
      shellControls.set({ scale: 1, y: 0, rotateZ: 0 });
    } finally {
      rotationAnimationRef.current?.stop();
      rotationAnimationRef.current = null;
      isRotatingRef.current = false;
    }
  };

  return (
    <motion.article
      className="education-card-shell"
      initial={false}
      animate={shellControls}
      onHoverStart={handleHoverStart}
    >
      <motion.div
        onPointerMove={onPointerMove}
        className={`card-v2 education-card ${item.featured ? "education-card--featured" : ""}`}
        style={{ rotateY: rotationY }}
      >
        <motion.div className="education-card__content" style={{ rotateY: contentRotationY }}>
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
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export default function Education() {
  const shouldReduceMotion = useReducedMotion();
  const desktopMotionEnabled = useDesktopMotion();

  const handleCardPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!desktopMotionEnabled || shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--edu-spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--edu-spotlight-y", `${event.clientY - rect.top}px`);
  };

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
              <EducationCard
                item={item}
                shouldReduceMotion={shouldReduceMotion}
                desktopMotionEnabled={desktopMotionEnabled}
                onPointerMove={handleCardPointerMove}
              />
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
