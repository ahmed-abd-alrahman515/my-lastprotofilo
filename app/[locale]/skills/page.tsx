import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EngineeringCapabilities } from "@/components/engineering-capabilities";
import { getAbsoluteUrl, getLanguageAlternates, getLocalizedUrl, siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "skills.meta" });
  const url = getLocalizedUrl(locale as "en" | "ar", "/skills");
  const ogImage = getAbsoluteUrl(siteConfig.ogImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates("/skills"),
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

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EngineeringCapabilities />;
}
