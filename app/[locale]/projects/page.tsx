import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProjectsArchive } from "@/components/projects-archive";
import { projects } from "@/lib/projects-data";
import { getAbsoluteUrl, getLanguageAlternates, getLocalizedUrl, siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects.meta" });
  const url = getLocalizedUrl(locale as "en" | "ar", "/projects");
  const ogImage = getAbsoluteUrl(siteConfig.ogImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates("/projects"),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: siteConfig.title,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Ahmed Alaydi - Full Stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImage],
    },
  };
}

export default function ProjectsPage() {
  return <ProjectsArchive projects={projects} />;
}
