"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import useDesktopMotion from "@/hooks/useDesktopMotion";

gsap.registerPlugin(ScrollTrigger);

interface CinematicScrollProps {
  heroRef: RefObject<HTMLElement | null>;
  heroCopyRef: RefObject<HTMLElement | null>;
  heroVisualRef: RefObject<HTMLElement | null>;
  nextSectionRef?: RefObject<HTMLElement | null>;
}

export default function CinematicScroll({
  heroRef,
  heroCopyRef,
  heroVisualRef,
  nextSectionRef
}: CinematicScrollProps) {
  const lenis = useLenis(() => {
    ScrollTrigger.update();
  });
  const desktopMotionEnabled = useDesktopMotion();

  useEffect(() => {
    if (!lenis) return undefined;

    ScrollTrigger.refresh();
    return undefined;
  }, [lenis]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || !desktopMotionEnabled) return undefined;

    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const hero = heroRef.current;
      const heroCopy = heroCopyRef.current;
      const heroVisual = heroVisualRef.current;
      const nextSection = nextSectionRef?.current;

      if (!hero || !heroCopy || !heroVisual) return;

      gsap.set(hero, { "--cinematic-depth": 0 });

      const scaleTarget = window.matchMedia("(max-width: 767px)").matches ? 1.18 : 1.4;
      const liftTarget = window.matchMedia("(max-width: 767px)").matches ? -28 : -72;

      gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.85,
          invalidateOnRefresh: true
        }
      })
        .to(heroCopy, {
          opacity: 0,
          y: -56,
          ease: "none"
        }, 0)
        .to(heroVisual, {
          scale: scaleTarget,
          y: liftTarget,
          transformOrigin: "50% 48%",
          ease: "none"
        }, 0)
        .to(hero, {
          "--cinematic-depth": 1,
          ease: "none"
        }, 0);

      if (nextSection) {
        gsap.fromTo(nextSection, {
          y: 80,
          opacity: 0.82
        }, {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "55% top",
            end: "bottom top",
            scrub: 0.85,
            invalidateOnRefresh: true
          }
        });
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      context.revert();
    };
  }, [desktopMotionEnabled, heroRef, heroCopyRef, heroVisualRef, nextSectionRef]);

  return null;
}
