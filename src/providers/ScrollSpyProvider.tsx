"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from "react";

interface ScrollSpyContextValue {
  activeHref: `#${string}`;
  setActiveHref: Dispatch<SetStateAction<`#${string}`>>;
}

const ScrollSpyContext = createContext<ScrollSpyContextValue | null>(null);

export function ScrollSpyProvider({ children }: { children: ReactNode }) {
  const [activeHref, setActiveHref] = useState<`#${string}`>("#home");

  const value = useMemo(
    () => ({ activeHref, setActiveHref }),
    [activeHref]
  );

  return (
    <ScrollSpyContext.Provider value={value}>
      {children}
    </ScrollSpyContext.Provider>
  );
}

export function useScrollSpy() {
  const context = useContext(ScrollSpyContext);

  if (!context) {
    throw new Error("useScrollSpy must be used inside ScrollSpyProvider");
  }

  return context;
}
