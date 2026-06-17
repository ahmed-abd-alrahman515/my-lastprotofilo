import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { EngineeringHero } from "@/components/about/engineering-hero";
import { EngineeringStats } from "@/components/about/engineering-stats";
import { EngineeringJourney } from "@/components/about/engineering-journey";
import { TechUniverse } from "@/components/about/tech-universe";
import { SystemsArchitecture } from "@/components/about/systems-architecture";
import { SelectedSystems } from "@/components/about/selected-systems";
import { EngineeringPrinciples } from "@/components/about/engineering-principles";
import { Workspace } from "@/components/about/workspace";
import { PremiumCta } from "@/components/about/premium-cta";
import { getAbsoluteUrl, getLanguageAlternates, getLocalizedUrl, siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  const url = getLocalizedUrl(locale as "en" | "ar", "/about");
  const ogImage = getAbsoluteUrl(siteConfig.ogImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates("/about"),
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative overflow-x-clip">
      <EngineeringHero />
      <EngineeringStats />
      <EngineeringJourney />
      <TechUniverse />
      <SystemsArchitecture />
      <SelectedSystems />
      <EngineeringPrinciples />
      <Workspace />
      <PremiumCta />
    </div>
  );
}
