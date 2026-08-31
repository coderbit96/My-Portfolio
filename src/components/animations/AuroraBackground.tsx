"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import useDesktopMotion from "@/hooks/useDesktopMotion";

const PAGE_SCROLL_RANGE: [number, number] = [0, 1800];

/**
 * Page-scroll-linked ambience for the whole portfolio.
 */
export default function AuroraBackground() {
  const { scrollY } = useScroll();
  const desktopMotionEnabled = useDesktopMotion();
  const blueParallax = useTransform(scrollY, PAGE_SCROLL_RANGE, [0, -42]);
  const cyanParallax = useTransform(scrollY, PAGE_SCROLL_RANGE, [0, 30]);
  const limeParallax = useTransform(scrollY, PAGE_SCROLL_RANGE, [0, -22]);

  return (
    <div className="cosmic-aurora" aria-hidden="true">
      <motion.span
        style={{ y: desktopMotionEnabled ? blueParallax : 0 }}
        className="cosmic-aurora__orb cosmic-aurora__orb--blue"
      />
      <motion.span
        style={{ y: desktopMotionEnabled ? cyanParallax : 0 }}
        className="cosmic-aurora__orb cosmic-aurora__orb--cyan"
      />
      <motion.span
        style={{ y: desktopMotionEnabled ? limeParallax : 0 }}
        className="cosmic-aurora__orb cosmic-aurora__orb--lime"
      />
      <span className="cosmic-aurora__chakra" />
    </div>
  );
}
