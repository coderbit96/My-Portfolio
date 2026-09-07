"use client";

import { useEffect, useRef, useState } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isAppleMobileDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function isAndroidMobileDevice() {
  return /Android/i.test(navigator.userAgent);
}

export default function InstallAppButton() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAppleMobile, setIsAppleMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
      "standalone" in navigator && (navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      return;
    }

    const appleMobile = isAppleMobileDevice();
    setIsAppleMobile(appleMobile);
    setIsMobile(appleMobile || isAndroidMobileDevice());
    setDismissed(window.sessionStorage.getItem("pwa-install-dismissed") === "true");

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferredPrompt.current = event as BeforeInstallPromptEvent;
      setCanInstall(true);
    };
    const onAppInstalled = () => {
      deferredPrompt.current = null;
      setCanInstall(false);
      setShowInstructions(false);
    };

    if (appleMobile) {
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

    setShowInstructions(true);
  };

  const dismiss = () => {
    window.sessionStorage.setItem("pwa-install-dismissed", "true");
    setDismissed(true);
  };

  if (dismissed || (!isMobile && !canInstall)) {
    return null;
  }

  return (
    <aside className="pwa-install-launcher" aria-label="Install this website as an app">
      <button type="button" className="pwa-install-close" onClick={dismiss} aria-label="Dismiss install prompt">
        <FaTimes aria-hidden="true" />
      </button>
      <p className="pwa-install-title">Install this app</p>
      <p className="pwa-install-copy">Save this portfolio to your home screen for faster access.</p>
      <button
        type="button"
        onClick={installApp}
        className="pwa-install-button"
        aria-expanded={showInstructions}
      >
        <FaDownload aria-hidden="true" />
        Install app
      </button>
      {showInstructions ? (
        <p className="pwa-install-instructions">
          {isAppleMobile ? (
            <>In Safari, tap Share, then choose <strong>Add to Home Screen</strong>.</>
          ) : (
            <>If this page opened inside another app, tap <strong>⋮</strong> and choose <strong>Open in Chrome</strong> first. Then use Chrome&apos;s <strong>Install app</strong> or <strong>Add to Home screen</strong> option.</>
          )}
        </p>
      ) : null}
    </aside>
  );
}
