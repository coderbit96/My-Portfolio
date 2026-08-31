"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { LenisOptions } from "lenis";

interface ScrollPreferences {
  mounted: boolean;
  isCompactViewport: boolean;
  prefersReducedMotion: boolean;
}

const initialScrollPreferences: ScrollPreferences = {
  mounted: false,
  isCompactViewport: true,
  prefersReducedMotion: true
};

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<ScrollPreferences>(initialScrollPreferences);

  useEffect(() => {
    const compactViewportQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreferences = () => {
      setPreferences({
        mounted: true,
        isCompactViewport: compactViewportQuery.matches,
        prefersReducedMotion: reducedMotionQuery.matches
      });
    };

    updatePreferences();
    compactViewportQuery.addEventListener("change", updatePreferences);
    reducedMotionQuery.addEventListener("change", updatePreferences);

    return () => {
      compactViewportQuery.removeEventListener("change", updatePreferences);
      reducedMotionQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  const shouldUseNativeScroll =
    !preferences.mounted ||
    preferences.isCompactViewport ||
    preferences.prefersReducedMotion;

  useEffect(() => {
    if (!preferences.mounted) return undefined;

    document.documentElement.dataset.smoothScroll = shouldUseNativeScroll ? "native" : "lenis";

    return () => {
      delete document.documentElement.dataset.smoothScroll;
    };
  }, [preferences.mounted, shouldUseNativeScroll]);

  const lenisOptions = useMemo<LenisOptions>(
    () => ({
      anchors: { offset: -88 },
      autoRaf: true,
      duration: 1.2,
      easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      gestureOrientation: "vertical",
      lerp: 0.075,
      orientation: "vertical",
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.92,
      allowNestedScroll: false,
      prevent: (node) =>
        Boolean(
          node.closest("[data-lenis-prevent]") ||
            node.closest("[role='dialog']") ||
            ["INPUT", "TEXTAREA", "SELECT"].includes(node.tagName) ||
            node.isContentEditable
        )
    }),
    []
  );

  if (shouldUseNativeScroll) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root key="desktop-lenis-scroll" options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
