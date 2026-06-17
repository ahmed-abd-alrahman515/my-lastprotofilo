"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { localeDirection, type Locale } from "@/i18n/routing";

/** SSR-safe media query hook. Returns false until mounted on the client. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True on viewports we treat as "mobile" for simplified experiences. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

export function usePerformanceProfile() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [isLowPower, setIsLowPower] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };

    const hardwareConcurrency = nav.hardwareConcurrency ?? 8;
    const deviceMemory = nav.deviceMemory ?? 8;
    const saveData = nav.connection?.saveData ?? false;

    setIsLowPower(saveData || hardwareConcurrency <= 4 || deviceMemory <= 4);
  }, []);

  return {
    isMobile,
    prefersReducedMotion,
    isLowPower,
    shouldReduceEffects: prefersReducedMotion || isMobile || isLowPower,
  };
}

/** Reading direction for the active locale (1 = ltr, -1 = rtl). */
export function useDirSign(): 1 | -1 {
  const locale = useLocale() as Locale;
  return localeDirection[locale] === "rtl" ? -1 : 1;
}
