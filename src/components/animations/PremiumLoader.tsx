"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

const LETTER_STEPS = [
  "J",
  "JO",
  "JOY",
  "JOYD",
  "JOYDI",
  "JOYDIP",
  "JOYDIP G",
  "JOYDIP GH",
  "JOYDIP GHO",
  "JOYDIP GHOS",
  "JOYDIP GHOSH"
];

export default function PremiumLoader() {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const letterDelay = shouldReduceMotion ? 80 : 300;
    const revealDelay = shouldReduceMotion ? 100 : 700;

    if (step < LETTER_STEPS.length - 1) {
      const nextStepTimer = window.setTimeout(() => setStep((currentStep) => currentStep + 1), letterDelay);
      return () => window.clearTimeout(nextStepTimer);
    }

    const revealTimer = window.setTimeout(() => setIsVisible(false), revealDelay);
    return () => window.clearTimeout(revealTimer);
  }, [shouldReduceMotion, step]);

  const displayValue = LETTER_STEPS[step];

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="premium-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015, filter: "blur(4px)" }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <div className="premium-loader__content">
            <motion.p
              key={displayValue}
              className="premium-loader__word"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {displayValue}
              <span className="premium-loader__cursor" aria-hidden="true" />
            </motion.p>
            <span className="premium-loader__caption">Portfolio loading</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
