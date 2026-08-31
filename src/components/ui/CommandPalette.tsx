"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { commandItems, type CommandItem } from "@/data/commands";
import useReducedMotion from "@/hooks/useReducedMotion";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function filterItems(query: string): CommandItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return commandItems;

  return commandItems.filter((item) => {
    const haystack = [item.label, item.description, ...(item.keywords ?? [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const results = useMemo(() => filterItems(query), [query]);

  useEffect(() => setMounted(true), []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    triggerRef.current?.focus();
  }, []);

  const toggle = useCallback(() => {
    setOpen((current) => {
      if (current) {
        setQuery("");
        setActiveIndex(0);
        triggerRef.current?.focus();
        return false;
      }

      triggerRef.current = (document.activeElement as HTMLElement) ?? null;
      setQuery("");
      setActiveIndex(0);
      return true;
    });
  }, []);

  // Global Ctrl+K / Cmd+K shortcut, plus a "command-palette:toggle" custom
  // event so other components (e.g. the navbar hint button) can open it
  // without prop-drilling shared state.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isCombo = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (!isCombo) return;

      event.preventDefault();
      toggle();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("command-palette:toggle", toggle);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("command-palette:toggle", toggle);
    };
  }, [toggle]);

  // Focus the search input on open, lock scroll, and restore focus on close.
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const activeEl = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const runCommand = useCallback(
    (item: CommandItem) => {
      closePalette();

      if (item.download) {
        const link = document.createElement("a");
        link.href = item.href;
        link.download = item.download;
        link.rel = "noreferrer";
        document.body.appendChild(link);
        link.click();
        link.remove();
        return;
      }

      if (item.external) {
        window.open(item.href, "_blank", "noreferrer");
        return;
      }

      window.location.hash = item.href.replace(/^#/, "#");
      document.querySelector(item.href)?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    },
    [closePalette, shouldReduceMotion]
  );

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selected = results[activeIndex];
      if (selected) runCommand(selected);
      return;
    }

    if (event.key === "Tab") {
      // Focus trap: keep Tab/Shift+Tab cycling within the dialog.
      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute("disabled")
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="command-palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePalette();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="command-palette"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={handleKeyDown}
          >
            <div className="command-palette__search">
              <FaSearch aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search About, Skills, Experience, Contact..."
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-list"
                aria-activedescendant={results[activeIndex] ? `command-item-${results[activeIndex].id}` : undefined}
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="command-palette__esc">Esc</kbd>
            </div>

            <div
              id="command-palette-list"
              ref={listRef}
              role="listbox"
              aria-label="Commands"
              className="command-palette__list"
            >
              {results.length === 0 ? (
                <p className="command-palette__empty">No commands match &ldquo;{query}&rdquo;.</p>
              ) : (
                results.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={item.id}
                      id={`command-item-${item.id}`}
                      data-index={index}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      className={`command-palette__item ${isActive ? "command-palette__item--active" : ""}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => runCommand(item)}
                    >
                      <span className="command-palette__item-icon">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="command-palette__item-text">
                        <span className="command-palette__item-label">{item.label}</span>
                        {item.description ? (
                          <span className="command-palette__item-description">{item.description}</span>
                        ) : null}
                      </span>
                      <FaArrowRight className="command-palette__item-arrow" aria-hidden="true" />
                    </button>
                  );
                })
              )}
            </div>

            <div className="command-palette__footer">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> Navigate
              </span>
              <span>
                <kbd>Enter</kbd> Select
              </span>
              <span>
                <kbd>Esc</kbd> Close
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
