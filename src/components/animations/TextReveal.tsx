"use client";

import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

const SCRAMBLE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]";

interface TextRevealProps {
  text: string;
  className?: string;
  /**
   * "words" reveals each word with an upward stagger once in view (headlines,
   * paragraphs). "scramble" decodes the text into place on mount (short
   * eyebrow/badge labels).
   */
  mode?: "words" | "scramble";
  /** Scramble speed in ms per frame. Only used when mode="scramble". */
  scrambleSpeed?: number;
}

/**
 * Text-focused reveal animation. Consolidates the previous WordReveal and
 * ScrambleText components into a single primitive with a mode switch.
 */
export default function TextReveal({ text, className = "", mode = "words", scrambleSpeed = 34 }: TextRevealProps) {
  if (mode === "scramble") {
    return <ScrambleReveal text={text} className={className} speed={scrambleSpeed} />;
  }

  return <WordStaggerReveal text={text} className={className} />;
}

function WordStaggerReveal({ text, className }: { text: string; className: string }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.065 } }
      }}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {/* pb + negative mb reserve clip-box room for descenders (y, p, g, j, q)
              under tight leading, without adding visible gap between lines. */}
          <span className="inline-block overflow-hidden pb-[0.22em] align-bottom -mb-[0.22em]" aria-hidden="true">
            <motion.span
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: { y: "0%", opacity: 1, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

function ScrambleReveal({ text, className, speed }: { text: string; className: string; speed: number }) {
  const [display, setDisplay] = useState(text);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplay(text);
      return undefined;
    }

    let frame = 0;
    const intervalId = window.setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < frame) return text[index];
            return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
          })
          .join("")
      );

      frame += 1 / 2;
      if (frame >= text.length) {
        window.clearInterval(intervalId);
        setDisplay(text);
      }
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [text, speed, shouldReduceMotion]);

  return <span className={className}>{display}</span>;
}
