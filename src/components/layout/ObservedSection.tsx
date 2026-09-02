"use client";

import {
  useCallback,
  useEffect,
  useRef,
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
  sectionRef
}: ObservedSectionProps) {
  const localRef = useRef<HTMLElement | null>(null);
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
    >
      {children}
    </section>
  );
}
