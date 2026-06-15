import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CaseStudyView } from "@/components/case-study-view";
import { MobileEcosystemCaseStudy } from "@/components/mobile-ecosystem-case-study";
import { getProjectCategories, projects } from "@/lib/projects-data";

interface ProjectPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "projects.caseStudy" });
  return {
    title: `${project.title} — ${t("badge")}`,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image, alt: project.title }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  const projectCats = getProjectCategories(project);
  const related = projects
    .filter((p) => p.id !== project.id)
    .map((p) => {
      const overlap = getProjectCategories(p).filter((c) => projectCats.includes(c)).length;
      const groupBonus = p.group && p.group === project.group ? 5 : 0;
      return { p, score: overlap + groupBonus };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((r) => r.p);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image,
    url: project.liveUrl ?? project.projectUrl,
    keywords: project.technologies.join(", "),
    creator: {
      "@type": "Person",
      name: "Ahmed Alaydi",
      url: "https://ahmed-alaydi.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {project.hasMobileApps ? (
        <MobileEcosystemCaseStudy project={project} related={related} />
      ) : (
        <CaseStudyView project={project} related={related} />
      )}
    </>
  );
}
