"use client";

import { useCallback, useRef, type PointerEvent } from "react";
import useDesktopMotion from "@/hooks/useDesktopMotion";

interface UseMagneticOptions {
  /** Maximum horizontal offset in pixels. Kept small so the button never feels hard to click. */
  maxOffsetX?: number;
  /** Maximum vertical offset in pixels. */
  maxOffsetY?: number;
  /** Fraction of the pointer's distance from center that gets applied (0-1). Lower is subtler. */
  strength?: number;
}

const DEFAULT_MAX_OFFSET_X = 8;
const DEFAULT_MAX_OFFSET_Y = 6;
const DEFAULT_STRENGTH = 0.22;

/**
 * Subtle magnetic-pull pointer tracking for buttons and links. Writes
 * `--magnetic-x`/`--magnetic-y` CSS custom properties (consumed by the
 * `.magnetic-target` class in globals.css) instead of animating React
 * state, so movement stays on the compositor thread and never lags behind
 * the cursor.
 *
 * Disabled automatically on touch devices, coarse pointers, and under
 * `prefers-reduced-motion` via `useDesktopMotion`. The offset cap keeps the
 * pull small enough that it never meaningfully shifts the clickable target.
 */
export default function useMagnetic({
  maxOffsetX = DEFAULT_MAX_OFFSET_X,
  maxOffsetY = DEFAULT_MAX_OFFSET_Y,
  strength = DEFAULT_STRENGTH
}: UseMagneticOptions = {}) {
  const enabled = useDesktopMotion();
  const frameRef = useRef<number | null>(null);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!enabled) return;

      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        target.style.setProperty("--magnetic-x", `${clamp(x * strength, maxOffsetX)}px`);
        target.style.setProperty("--magnetic-y", `${clamp(y * strength, maxOffsetY)}px`);
      });
    },
    [enabled, maxOffsetX, maxOffsetY, strength]
  );

  const onPointerLeave = useCallback((event: PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    target.style.setProperty("--magnetic-x", "0px");
    target.style.setProperty("--magnetic-y", "0px");
  }, []);

  return { enabled, onPointerMove, onPointerLeave };
}
