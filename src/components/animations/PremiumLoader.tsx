"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

const GREETINGS = [
  { word: "Hello", language: "English" },
  { word: "নমস্কার", language: "বাংলা" },
  { word: "नमस्ते", language: "हिन्दी" },
  { word: "Hola", language: "Español" },
  { word: "Bonjour", language: "Français" },
  { word: "Ciao", language: "Italiano" },
  { word: "Hallo", language: "Deutsch" },
  { word: "こんにちは", language: "日本語" },
  { word: "안녕하세요", language: "한국어" },
  { word: "مرحبا", language: "العربية" },
  { word: "你好", language: "中文" }
];

const LETTER_STEPS = ["J", "JO", "JOY", "JOYD", "JOYDI", "JOYDIP", "JOYDIP G", "JOYDIP GH", "JOYDIP GHO", "JOYDIP GHOS", "JOYDIP GHOSH"];

export default function PremiumLoader() {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [nameStep, setNameStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const greetingDelay = shouldReduceMotion ? 90 : 265;

    if (step < GREETINGS.length - 1) {
      const nextStepTimer = window.setTimeout(() => setStep((currentStep) => currentStep + 1), greetingDelay);
      return () => window.clearTimeout(nextStepTimer);
    }
  }, [shouldReduceMotion, step]);

  useEffect(() => {
    const nameDelay = shouldReduceMotion ? 80 : 300;

    if (nameStep < LETTER_STEPS.length - 1) {
      const nextNameTimer = window.setTimeout(() => setNameStep((currentStep) => currentStep + 1), nameDelay);
      return () => window.clearTimeout(nextNameTimer);
    }
  }, [nameStep, shouldReduceMotion]);

  useEffect(() => {
    const revealDelay = shouldReduceMotion ? 120 : 620;

    if (step !== GREETINGS.length - 1 || nameStep !== LETTER_STEPS.length - 1) {
      return;
    }

    const revealTimer = window.setTimeout(() => setIsVisible(false), revealDelay);
    return () => window.clearTimeout(revealTimer);
  }, [nameStep, shouldReduceMotion, step]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  const greeting = GREETINGS[step];
  const displayName = LETTER_STEPS[nameStep];

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="premium-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015, filter: "blur(4px)" }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label={`Welcome. ${greeting.word}`}
        >
          <div className="premium-loader__content">
            <motion.p
              key={greeting.word}
              className="premium-loader__hello"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.96, filter: "blur(7px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              {greeting.word}
            </motion.p>
            <motion.p
              key={displayName}
              className="premium-loader__word"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {displayName}
              <span className="premium-loader__cursor" aria-hidden="true" />
            </motion.p>
            <span className="premium-loader__hint">Welcome to my portfolio</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
