"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import CommandPalette from "@/components/ui/CommandPalette";

type AppProvidersProps = {
  children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
      <CommandPalette />
    </MotionConfig>
  );
}
