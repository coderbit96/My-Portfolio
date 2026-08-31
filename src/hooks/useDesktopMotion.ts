"use client";

import { useEffect, useState } from "react";

export default function useDesktopMotion() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktopPointer = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setEnabled(desktopPointer.matches && !reducedMotion.matches);

    updatePreference();
    desktopPointer.addEventListener("change", updatePreference);
    reducedMotion.addEventListener("change", updatePreference);

    return () => {
      desktopPointer.removeEventListener("change", updatePreference);
      reducedMotion.removeEventListener("change", updatePreference);
    };
  }, []);

  return enabled;
}
