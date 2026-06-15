import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ServicesExperience } from "@/components/services-experience";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: `${t("hero.heading")} — Ahmed Alaydi`,
    description: t("hero.lead"),
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesExperience />;
}
