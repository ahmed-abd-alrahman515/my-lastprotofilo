import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar", "fr", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { native: string; english: string; flag: string }> = {
  en: { native: "English", english: "English", flag: "EN" },
  ar: { native: "العربية", english: "Arabic", flag: "AR" },
  fr: { native: "Français", english: "French", flag: "FR" },
  de: { native: "Deutsch", english: "German", flag: "DE" },
};

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
  fr: "ltr",
  de: "ltr",
};

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
});
