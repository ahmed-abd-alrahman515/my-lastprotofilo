"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { localeDirection, type Locale } from "@/i18n/routing";

/** SSR-safe media query hook. Returns false until mounted on the client. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
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

/** Reading direction for the active locale (1 = ltr, -1 = rtl). */
export function useDirSign(): 1 | -1 {
  const locale = useLocale() as Locale;
  return localeDirection[locale] === "rtl" ? -1 : 1;
}
