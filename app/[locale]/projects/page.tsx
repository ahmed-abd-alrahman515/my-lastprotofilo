import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProjectsArchive } from "@/components/projects-archive";
import { projects } from "@/lib/projects-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/projects" },
  };
}

export default function ProjectsPage() {
  return <ProjectsArchive projects={projects} />;
}
