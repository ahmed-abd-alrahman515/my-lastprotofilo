import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ServicesExperience } from "@/components/services-experience";
import { getAbsoluteUrl, getLanguageAlternates, getLocalizedUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const title = `${t("hero.heading")} - Ahmed Alaydi`;
  const description = t("hero.lead");
  const url = getLocalizedUrl(locale as "en" | "ar", "/services");
  const ogImage = getAbsoluteUrl(siteConfig.ogImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates("/services"),
    },
    openGraph: {
      title,
      description,
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
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesExperience />;
}
