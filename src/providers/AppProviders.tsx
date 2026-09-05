"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import ServiceWorkerRegistration from "@/components/pwa/ServiceWorkerRegistration";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <ServiceWorkerRegistration />
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionConfig>
  );
}
