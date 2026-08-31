"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject
} from "react";
import { useScrollSpy } from "@/providers/ScrollSpyProvider";

interface ObservedSectionProps {
  children: ReactNode;
  id: string;
  minHeight?: string;
  sectionRef?: RefObject<HTMLElement | null>;
}

export default function ObservedSection({
  children,
  id,
  minHeight,
  sectionRef
}: ObservedSectionProps) {
  const localRef = useRef<HTMLElement | null>(null);
  const [shouldRender, setShouldRender] = useState(!minHeight);
  const { setActiveHref } = useScrollSpy();

  const setSectionNode = useCallback(
    (node: HTMLElement | null) => {
      localRef.current = node;

      if (sectionRef) {
        sectionRef.current = node;
      }
    },
    [sectionRef]
  );

  useEffect(() => {
    const section = localRef.current;

    if (!section || typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: "650px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = localRef.current;

    if (!section || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveHref(`#${id}`);
        }
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.15, 0.35] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [id, setActiveHref]);

  return (
    <section
      ref={setSectionNode}
      id={id}
      style={!shouldRender && minHeight ? { minHeight } : undefined}
      aria-busy={!shouldRender || undefined}
      aria-label={!shouldRender ? `Loading ${id} section` : undefined}
    >
      {shouldRender ? children : null}
    </section>
  );
}
