import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { projects } from "@/lib/projects-data";
import { getLocalizedUrl } from "@/lib/site";

const staticRoutes = ["", "/about", "/services", "/skills", "/projects", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = locales.flatMap((locale) =>
    staticRoutes.map((path) => ({
      url: getLocalizedUrl(locale, path),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((altLocale) => [altLocale, getLocalizedUrl(altLocale, path)]),
        ),
      },
    })),
  );

  const projectPages = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: getLocalizedUrl(locale, `/projects/${project.id}`),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((altLocale) => [
            altLocale,
            getLocalizedUrl(altLocale, `/projects/${project.id}`),
          ]),
        ),
      },
    })),
  );

  return [...pages, ...projectPages];
}
