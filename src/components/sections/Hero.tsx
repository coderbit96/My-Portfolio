"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type RefObject
} from "react";
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiMongodb, SiNextdotjs, SiNodedotjs, SiReact } from "react-icons/si";
import { revealItem } from "@/components/animations/Reveal";
import CinematicScroll from "@/components/animations/CinematicScroll";
import HeroBirdsBackground from "@/components/animations/HeroBirdsBackground";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import useReducedMotion from "@/hooks/useReducedMotion";
import useMousePosition from "@/hooks/useMousePosition";

const fadeUp = revealItem();

interface HeroProps {
  nextSectionRef?: RefObject<HTMLElement | null>;
}

const heroSocials = [
  { label: "GitHub", href: "https://github.com/coderbit96", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joydip-ghosh-83073033a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: FaLinkedinIn
  },
  { label: "Email", href: "mailto:joydip.work.mail@gmail.com", icon: FaEnvelope }
];

const techCards = [
  { label: "React", icon: SiReact, className: "left-0 top-[18%] -translate-x-2 sm:-translate-x-8" },
  { label: "Next.js", icon: SiNextdotjs, className: "right-0 top-[12%] translate-x-2 sm:translate-x-8" },
  { label: "Node.js", icon: SiNodedotjs, className: "bottom-[18%] left-1 translate-y-2 sm:left-4" },
  { label: "MongoDB", icon: SiMongodb, className: "bottom-[12%] right-0 translate-x-2 sm:translate-x-8" }
];

const heroRoles = ["Full Stack Developer", "AI Developer", "Creative Coder"];

function AnimatedRole({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const intervalId = window.setInterval(() => {
      setRoleIndex((currentIndex) => (currentIndex + 1) % heroRoles.length);
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

  const role = heroRoles[roleIndex];

  return (
    <div className="hero-role-intro">
      <span>I&apos;m a</span>
      <span className="hero-role-viewport" aria-hidden="true">
        {shouldReduceMotion ? (
          <span className="hero-role-word">{role}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={role}
              className="hero-role-word"
              initial={{ opacity: 0, y: "105%", filter: "blur(5px)" }}
              animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "-105%", filter: "blur(5px)" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {role}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
      <span className="sr-only">Full Stack Developer, AI Developer, and Creative Coder.</span>
    </div>
  );
}

export default function Hero({ nextSectionRef }: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const heroVisualRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { enabled: motionEnabled, onPointerMove, onPointerLeave } = useMousePosition();

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    onPointerMove(event);
    if (!motionEnabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    event.currentTarget.style.setProperty("--hero-spotlight-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--hero-spotlight-y", `${y * 100}%`);
  };

  const handlePointerLeave = () => {
    onPointerLeave();
    heroRef.current?.style.setProperty("--hero-spotlight-x", "50%");
    heroRef.current?.style.setProperty("--hero-spotlight-y", "42%");
  };

  const heroStyle = {
    "--hero-spotlight-x": "50%",
    "--hero-spotlight-y": "42%"
  } as CSSProperties;

  return (
    <section
      ref={heroRef}
      data-cinematic-hero
      className="hero-v2 cinematic-hero relative flex min-h-[100svh] w-full max-w-full items-center overflow-hidden pt-16 sm:pt-20 lg:pt-16 xl:pt-14"
      style={heroStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <HeroBirdsBackground />

      <CinematicScroll
        heroRef={heroRef}
        heroCopyRef={heroCopyRef}
        heroVisualRef={heroVisualRef}
        nextSectionRef={nextSectionRef}
      />

      <div className="hero-v2-spotlight" aria-hidden="true" />

      <div className="section-shell grid min-h-0 items-center gap-14 py-12 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 xl:gap-20">
        <motion.div
          ref={heroCopyRef}
          data-cinematic-hero-copy
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } }}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          className="relative z-10 max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <AnimatedRole shouldReduceMotion={shouldReduceMotion} />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 max-w-4xl font-display text-[clamp(2.3rem,5.25vw,4.5rem)] font-black leading-[0.95] tracking-[-0.055em] text-white"
          >
            <span className="inline-block whitespace-nowrap">I Create Modern</span>{" "}
            <GradientText className="inline-block whitespace-nowrap">Web Experiences.</GradientText>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="hero-description mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            I design and develop modern web applications with Next.js, React,
            TypeScript, Node.js, and MongoDB — focused on clean architecture,
            responsive interfaces, and reliable user experiences.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#contact" size="lg" className="group">
              Contact Me
              <FaArrowRight className="text-sm transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-5 text-sm text-slate-300 sm:flex-row sm:items-center sm:gap-7"
          >
            <div className="inline-flex items-center gap-2 font-semibold text-slate-200">
              <span className="availability-indicator h-2 w-2 rounded-full bg-success shadow-[0_0_18px_rgba(34,197,94,0.35)]" aria-hidden="true" />
              Available for opportunities
            </div>

            <div className="hero-social-links flex flex-wrap items-center gap-3">
              {heroSocials.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="hero-social-link"
                    aria-label={item.label}
                    data-cursor="link"
                  >
                    <Icon aria-hidden="true" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={heroVisualRef}
          data-cinematic-hero-visual
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto grid w-full max-w-[360px] place-items-center lg:ml-auto lg:mr-0 lg:max-w-[400px]"
        >
          <motion.div
            className="hero-orbit-stage"
          >
            {techCards.map((tech, index) => {
              const Icon = tech.icon;

              return (
                <motion.div
                  key={tech.label}
                  className={`hero-tech-card ${tech.className}`}
                  aria-label={tech.label}
                  animate={motionEnabled ? { y: [0, index % 2 === 0 ? -7 : 7, 0] } : undefined}
                  transition={
                    motionEnabled
                      ? {
                          duration: 5.8 + index * 0.45,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.18
                        }
                      : undefined
                  }
                >
                  <Icon aria-hidden="true" />
                </motion.div>
              );
            })}

            <div className="hero-photo-shell">
              <div className="hero-photo-frame">
                <Image
                  src="/images/joydip-ghosh-profile.png?v=20260901"
                  alt="Joydip Ghosh"
                  width={520}
                  height={650}
                  priority
                  quality={100}
                  unoptimized
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 78vw"
                  className="profile-image h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
