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

function isAndroidMobileDevice() {
  return /Android/i.test(navigator.userAgent);
}

export default function InstallAppButton() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAppleMobile, setIsAppleMobile] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
      "standalone" in navigator && (navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      return;
    }

    const appleMobile = isAppleMobileDevice();
    setIsAppleMobile(appleMobile);
    setIsMobile(appleMobile || isAndroidMobileDevice());

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

  if (!isMobile && !canInstall) {
    return null;
  }

  return (
    <div className="pwa-install-launcher">
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
    </div>
  );
}
