"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaDownload, FaTimes } from "react-icons/fa";
import { navbarItems } from "@/data/navigation";
import { publicAssetUrl } from "@/lib/publicAssetUrl";
import { useScrollSpy } from "@/providers/ScrollSpyProvider";
import useMagnetic from "@/hooks/useMagnetic";

const resumeHref = publicAssetUrl("resume/Joydip-Ghosh-Resume.pdf");

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const { activeHref } = useScrollSpy();
  const { enabled: magneticEnabled, onPointerMove, onPointerLeave } = useMagnetic({ maxOffsetX: 6, maxOffsetY: 5 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      window.requestAnimationFrame(() => toggleButtonRef.current?.focus());
    };

    window.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => mobileMenuRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeMobileMenu = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 w-full px-3 pt-3 sm:px-5"
    >
      <nav
        data-scrolled={scrolled}
        className="site-navbar mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between px-3 sm:px-4"
        aria-label="Primary navigation"
      >
        <a
          href="#home"
          onClick={closeMobileMenu}
          className="group flex min-w-0 items-center gap-3 rounded-[12px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue/50"
          aria-label="Joydip Ghosh home"
        >
          <span className="brand-mark grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[10px]">
            <Image
              src="/images/logo.png"
              alt="Joydip Ghosh logo"
              width={36}
              height={36}
              priority
              className="h-full w-full object-cover"
            />
          </span>
          <span className="hidden text-[0.78rem] font-black uppercase tracking-[0.22em] text-white sm:block">
            Joydip Ghosh
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navbarItems.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`navbar-link ${isActive ? "navbar-link--active" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={resumeHref}
            download="Joydip-Ghosh-Resume.pdf"
            className="navbar-cv-link"
            aria-label="Download Joydip Ghosh CV"
            onPointerMove={magneticEnabled ? onPointerMove : undefined}
            onPointerLeave={magneticEnabled ? onPointerLeave : undefined}
          >
            <FaDownload aria-hidden="true" />
            Download CV
          </a>
        </div>

        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="navbar-menu-button grid h-10 w-10 place-items-center rounded-[10px] lg:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            tabIndex={-1}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-navbar-panel mx-auto mt-2 w-full max-w-[1180px] p-2 lg:hidden"
          >
            <div className="grid gap-1">
              {navbarItems.map((item) => {
                const isActive = activeHref === item.href;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`mobile-navbar-link ${isActive ? "mobile-navbar-link--active" : ""}`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <a
              href={resumeHref}
              download="Joydip-Ghosh-Resume.pdf"
              onClick={closeMobileMenu}
              className="mobile-navbar-cv"
              aria-label="Download Joydip Ghosh CV"
            >
              <FaDownload aria-hidden="true" />
              Download CV
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
