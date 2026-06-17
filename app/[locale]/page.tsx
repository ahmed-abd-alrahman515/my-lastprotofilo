import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/home/hero";
import { TechMarquee } from "@/components/home/tech-marquee";
import { FeaturedSystems } from "@/components/home/featured-systems";
import { FeaturedOrbital } from "@/components/home/featured-orbital";
import { AboutIntro } from "@/components/home/about-intro";
import { JourneyTimeline } from "@/components/home/journey-timeline";
import { Closer } from "@/components/home/closer";
import { projects } from "@/lib/projects-data";
import {
  getAbsoluteUrl,
  getLanguageAlternates,
  getLocaleTag,
  getLocalizedUrl,
  siteConfig,
} from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const url = getLocalizedUrl(locale as "en" | "ar");
  const ogImage = getAbsoluteUrl(siteConfig.ogImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.title,
    description: siteConfig.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(),
    },
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url,
      siteName: siteConfig.title,
      locale: getLocaleTag(locale as "en" | "ar"),
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
      title: siteConfig.title,
      description: siteConfig.description,
      images: [ogImage],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Featured projects — a tight, signature selection shown in the orbital showcase.
  const featuredIds = [
    "awlad-ragab-wholesale-platform",
    "project_1",
    "spids-dashboard-cms",
    "portfolio-cms-dashboard",
    "project_car_pos",
    "first-avenue-real-estate",
  ];
  const featuredProjects = featuredIds
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean) as typeof projects;

  return (
    <>
      <Hero />
      <TechMarquee />
      <FeaturedSystems />
      <FeaturedOrbital projects={featuredProjects} />
      <AboutIntro />
      <JourneyTimeline />
      <Closer />
    </>
  );
}
