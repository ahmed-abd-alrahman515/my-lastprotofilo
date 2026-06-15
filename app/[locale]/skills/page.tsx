import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { EngineeringCapabilities } from "@/components/engineering-capabilities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "skills.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/skills" },
  };
}

export default function SkillsPage() {
  return <EngineeringCapabilities />;
}
