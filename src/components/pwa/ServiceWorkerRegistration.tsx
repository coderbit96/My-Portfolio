"use client";

import { useEffect } from "react";

/** Registers the offline cache only for deployed builds, never during local development. */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker.register("/sw.js", { scope: "/" }).then((registration) => {
      void registration.update();
    }).catch((error: unknown) => {
        console.warn("Service worker registration failed.", error);
    });
  }, []);

  return null;
}
