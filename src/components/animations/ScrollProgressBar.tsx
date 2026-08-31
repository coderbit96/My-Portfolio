"use client";

import { motion, useScroll } from "framer-motion";

// A direct 1:1 readout of scroll position, not an autonomous animation, so it
// stays enabled even under prefers-reduced-motion (MotionConfig's
// reducedMotion="user" only disables Framer Motion's own animated
// transitions, not raw scroll-linked transforms like this scaleX).
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brandBlue via-accentCyan to-accentPurple opacity-85"
      aria-hidden="true"
    />
  );
}
