"use client";

import { useEffect, useRef } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Vanta.js BIRDS background for the Hero section only. Renders a plain div
 * that Vanta mounts a Three.js canvas into; both are dynamically imported
 * inside this effect so nothing WebGL/Three-related ever runs during SSR
 * or bloats the initial bundle for the rest of the site.
 *
 * The canvas is purely decorative: `aria-hidden`, `pointer-events-none`,
 * and layered at z-index 0 so it never intercepts clicks/hover/scroll and
 * never sits above Hero text, images, or buttons (all of which already use
 * z-index 1+ via `.hero-v2 .section-shell`).
 */
export default function HeroBirdsBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<{ destroy: () => void } | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;

    const initializeVanta = async () => {
      const [THREE, { default: BIRDS }] = await Promise.all([
        import("three"),
        import("vanta/dist/vanta.birds.min")
      ]);

      // Guards against React Strict Mode's dev-only double-invoke and any
      // race where the component unmounted before the dynamic import
      // resolved: never create a second instance, never mount into a
      // detached container.
      if (cancelled || !containerRef.current || effectRef.current) return;

      // Vanta's bundled code expects a plain, writable THREE namespace
      // object (its historical UMD/CDN-global usage pattern) rather than a
      // live ES module namespace object, so pass a shallow copy.
      const THREE_NAMESPACE = { ...THREE };

      effectRef.current = BIRDS({
        el: containerRef.current,
        THREE: THREE_NAMESPACE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        backgroundColor: 0x080b10,
        backgroundAlpha: 1,
        color1: 0x3b82f6,
        color2: 0x22d3ee,
        colorMode: "lerp",
        quantity: 5,
        birdSize: 0.8,
        wingSpan: 25,
        speedLimit: 3,
        separation: 35,
        alignment: 25,
        cohesion: 20,
        scaleMobile: 0.75
      });
    };

    void initializeVanta();

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={containerRef}
      className="hero-birds-canvas"
      aria-hidden="true"
    />
  );
}
