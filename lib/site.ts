import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";

export const siteConfig = {
  name: "Ahmed Alaydi Portfolio",
  personName: "Ahmed Alaydi",
  title: "Ahmed Alaydi | Full Stack Developer",
  titleSuffix: "Ahmed Alaydi",
  description:
    "Ahmed Alaydi is a Full Stack Developer specializing in Laravel, React, Next.js, React Native, SaaS platforms, admin dashboards, and scalable API-driven systems.",
  url: "https://ahmed-alaydi.com",
  ogImage: "/image/ahmedimage.png",
  icon: "/image/ahmedimage.png",
  email: "ahmedalayde86@gmail.com",
  phoneE164: "+201006082709",
  github: "https://github.com/ahmed-alaydee",
  linkedin: "https://www.linkedin.com/in/ahmed-alayadi-3a3bb3291/",
  whatsapp: "https://wa.me/201006082709",
} as const;

function normalizePath(pathname = "") {
  if (!pathname || pathname === "/") return "";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getLocalizedPath(locale: Locale, pathname = "") {
  const normalized = normalizePath(pathname);
  return `/${locale}${normalized}`;
}

export function getLocalizedUrl(locale: Locale, pathname = "") {
  return `${siteConfig.url}${getLocalizedPath(locale, pathname)}`;
}

export function getAbsoluteUrl(pathname = "") {
  if (!pathname) return siteConfig.url;
  if (/^https?:\/\//i.test(pathname)) return pathname;
  return `${siteConfig.url}${normalizePath(pathname)}`;
}

export function getLanguageAlternates(pathname = "") {
  return Object.fromEntries(
    [
      ...locales.map((locale) => [locale, getLocalizedUrl(locale, pathname)]),
      ["x-default", getLocalizedUrl("en", pathname)],
    ],
  );
}

export function getLocaleTag(locale: Locale) {
  return locale === "ar" ? "ar_AR" : "en_US";
}
