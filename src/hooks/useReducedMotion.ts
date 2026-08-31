"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Canonical reduced-motion check for the app. Re-exported from a local hook
 * (rather than importing `useReducedMotion` from framer-motion directly
 * everywhere) so every animation primitive shares one import path and any
 * future override (e.g. a manual in-app "reduce motion" toggle) only needs
 * to change here.
 */
export default function useReducedMotion() {
  return Boolean(useFramerReducedMotion());
}
