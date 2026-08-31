"use client";

import { motion, type Variants } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

export type RevealEffect = "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale";

const EASE = [0.22, 1, 0.36, 1] as const;
const DEFAULT_DURATION = 0.6;
const SLIDE_DISTANCE = 28;

function buildVariants(effect: RevealEffect, duration: number, distance: number): Variants {
  const base = { opacity: 0 };
  const hiddenByEffect: Record<RevealEffect, Record<string, number>> = {
    fade: base,
    "slide-up": { ...base, y: distance },
    "slide-down": { ...base, y: -distance },
    "slide-left": { ...base, x: distance },
    "slide-right": { ...base, x: -distance },
    scale: { ...base, scale: 0.94 }
  };

  return {
    hidden: hiddenByEffect[effect],
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, ease: EASE }
    }
  };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Motion effect to animate in with. Defaults to "slide-up". */
  effect?: RevealEffect;
  /** Animation duration in seconds. Kept within the app's 0.4s-0.8s rule by default. */
  duration?: number;
  /** Distance in pixels for slide effects. */
  distance?: number;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Fraction of the element that must be visible before it triggers. */
  amount?: number;
  /** Replay the animation every time the element re-enters the viewport. */
  repeat?: boolean;
  /** Stagger child `<Reveal>`/`motion` elements instead of animating this node directly. */
  stagger?: boolean;
  /** Seconds between each staggered child's animation start. */
  staggerDelay?: number;
  as?: ElementType;
  [key: `aria-${string}`]: unknown;
  [key: `data-${string}`]: unknown;
  role?: ComponentPropsWithoutRef<"div">["role"];
  id?: string;
}

/**
 * Viewport-triggered fade/slide/scale reveal. This is the default building
 * block for section and card entrances so animation stays declarative and
 * consistent instead of ad-hoc `motion.div` + variants per section.
 *
 * Pass `stagger` to animate direct `motion.*` children in sequence (each
 * child should use the `revealItem` export, or its own variants with
 * `hidden`/`visible` keys) instead of animating this wrapper's own opacity.
 */
export default function Reveal({
  children,
  className,
  effect = "slide-up",
  duration = DEFAULT_DURATION,
  distance = SLIDE_DISTANCE,
  delay = 0,
  amount = 0.25,
  repeat = false,
  stagger = false,
  staggerDelay = 0.09,
  as = "div",
  ...rest
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[as as "div"] ?? motion.div;

  const variants: Variants = stagger
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } }
      }
    : buildVariants(effect, duration, distance);

  return (
    <MotionComponent
      className={className}
      variants={variants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: !repeat, amount }}
      transition={stagger ? undefined : { delay }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}

/** Variants for a direct child of a `stagger` Reveal. Use with `motion.div variants={revealItem(...)}`. */
export function revealItem(effect: RevealEffect = "slide-up", duration = DEFAULT_DURATION, distance = SLIDE_DISTANCE): Variants {
  return buildVariants(effect, duration, distance);
}
