"use client";

import { useEffect, useState } from "react";

/**
 * Returns "⌘" on macOS/iOS and "Ctrl" everywhere else, for the command
 * palette hint label. Defaults to "Ctrl" during SSR/first paint (most
 * visitors), then corrects after mount if the platform is actually Apple —
 * avoids a hydration mismatch since `navigator` isn't available on the
 * server.
 */
export default function usePlatformModifierKey() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const platform = navigator.userAgent || "";
    setIsMac(/Mac|iPhone|iPad|iPod/.test(platform));
  }, []);

  return isMac ? "⌘" : "Ctrl";
}
