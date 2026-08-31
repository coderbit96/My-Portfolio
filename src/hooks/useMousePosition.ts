"use client";

import { useCallback, useRef, type PointerEvent, type RefObject } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import useDesktopMotion from "@/hooks/useDesktopMotion";

interface UseMousePositionOptions {
  /** Spring stiffness applied to the smoothed motion values. */
  stiffness?: number;
  /** Spring damping applied to the smoothed motion values. */
  damping?: number;
  /** Spring mass applied to the smoothed motion values. */
  mass?: number;
}

/**
 * Tracks pointer position relative to a target element as normalized
 * (-1 to 1) motion values, smoothed with a spring. Centralizes the
 * pointer-math that used to be duplicated by hand across Hero, TiltCard,
 * MagneticButton, and the tech-stack hover cards.
 *
 * Disabled automatically on touch devices, coarse pointers, and when the
 * visitor prefers reduced motion (see `useDesktopMotion`).
 */
export default function useMousePosition({
  stiffness = 90,
  damping = 22,
  mass = 0.35
}: UseMousePositionOptions = {}) {
  const targetRef = useRef<HTMLElement | null>(null);
  const desktopMotionEnabled = useDesktopMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping, mass });
  const y = useSpring(rawY, { stiffness, damping, mass });

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!desktopMotionEnabled) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      rawX.set(normalizedX);
      rawY.set(normalizedY);
    },
    [desktopMotionEnabled, rawX, rawY]
  );

  const onPointerLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return {
    ref: targetRef as RefObject<HTMLElement | null>,
    x,
    y,
    enabled: desktopMotionEnabled,
    onPointerMove,
    onPointerLeave
  };
}
