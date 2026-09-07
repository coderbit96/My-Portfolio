"use client";

import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isAppleMobileDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export default function InstallAppButton() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
      "standalone" in navigator && (navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      return;
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferredPrompt.current = event as BeforeInstallPromptEvent;
      setCanInstall(true);
    };
    const onAppInstalled = () => {
      deferredPrompt.current = null;
      setCanInstall(false);
      setShowIosInstructions(false);
    };

    if (isAppleMobileDevice()) {
      setCanInstall(true);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (deferredPrompt.current) {
      await deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      if (outcome === "accepted") {
        deferredPrompt.current = null;
        setCanInstall(false);
      }
      return;
    }

    setShowIosInstructions(true);
  };

  if (!canInstall) {
    return null;
  }

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={installApp}
        className="mobile-navbar-cv"
        aria-expanded={showIosInstructions}
      >
        <FaDownload aria-hidden="true" />
        Install app
      </button>
      {showIosInstructions ? (
        <p className="rounded-[8px] border border-brandBlue/35 bg-brandBlue/10 px-3 py-2 text-xs leading-5 text-slate-300">
          In Safari, tap Share, then choose <strong>Add to Home Screen</strong>.
        </p>
      ) : null}
    </div>
  );
}
