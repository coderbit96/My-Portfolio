"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PreloaderParticles from "@/components/animations/PreloaderParticles";
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
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);

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
    setProgress(Math.round((nameStep / (LETTER_STEPS.length - 1)) * 80));
  }, [nameStep]);

  useEffect(() => {
    if (step !== GREETINGS.length - 1 || nameStep !== LETTER_STEPS.length - 1 || progress >= 100) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setProgress((currentProgress) => Math.min(100, currentProgress + (shouldReduceMotion ? 10 : 2)));
    }, shouldReduceMotion ? 35 : 45);

    return () => window.clearInterval(intervalId);
  }, [nameStep, progress, shouldReduceMotion, step]);

  useEffect(() => {
    const revealDelay = shouldReduceMotion ? 80 : 150;
    const portalDuration = shouldReduceMotion ? 240 : 2600;

    if (progress !== 100) {
      return;
    }

    const revealTimer = window.setTimeout(() => setIsRevealing(true), revealDelay);
    const closeTimer = window.setTimeout(() => setIsVisible(false), revealDelay + portalDuration);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(closeTimer);
    };
  }, [progress, shouldReduceMotion]);

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

  useEffect(() => {
    document.documentElement.dataset.portalEntry = "loading";
    return () => {
      delete document.documentElement.dataset.portalEntry;
    };
  }, []);

  useEffect(() => {
    if (!isRevealing) return undefined;

    document.documentElement.dataset.portalEntry = "reveal";
    const birdsTimer = window.setTimeout(() => {
      window.dispatchEvent(new Event("portfolio:hero-ready"));
    }, shouldReduceMotion ? 260 : 2500);
    const clearEntryState = window.setTimeout(() => {
      delete document.documentElement.dataset.portalEntry;
    }, shouldReduceMotion ? 420 : 3400);

    return () => {
      window.clearTimeout(birdsTimer);
      window.clearTimeout(clearEntryState);
    };
  }, [isRevealing, shouldReduceMotion]);

  const greeting = GREETINGS[step];
  const displayName = LETTER_STEPS[nameStep];

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="premium-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label={`Welcome. ${greeting.word}`}
        >
          <motion.div
            className="premium-loader__backdrop"
            initial={false}
            animate={{ opacity: isRevealing ? 0 : 1 }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
          {!shouldReduceMotion ? <PreloaderParticles progress={progress} visible={!isRevealing} /> : null}
          <motion.div
            className="premium-loader__portal"
            initial={false}
            animate={isRevealing ? { opacity: [0, 1, 1, 0], scale: [0.08, 1, 1, 22] } : { opacity: 0, scale: 0.08 }}
            transition={{ duration: shouldReduceMotion ? 0.24 : 2.6, times: [0, 0.22, 0.55, 1], ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
          <motion.div
            className="premium-loader__content"
            initial={false}
            animate={isRevealing ? { opacity: 0, y: 0, scale: 0.08 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              key={greeting.word}
              className="premium-loader__hello"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              {greeting.word}
            </motion.p>
            <motion.p
              key={displayName}
              className="premium-loader__word"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {displayName}
              <span className="premium-loader__cursor" aria-hidden="true" />
            </motion.p>
            <span className="premium-loader__hint">Loading {progress}%</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
