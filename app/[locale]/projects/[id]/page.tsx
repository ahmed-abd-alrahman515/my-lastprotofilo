import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CaseStudyView } from "@/components/case-study-view";
import { MobileEcosystemCaseStudy } from "@/components/mobile-ecosystem-case-study";
import { getProjectCategories, localizeProject, projects } from "@/lib/projects-data";
import { getAbsoluteUrl, getLanguageAlternates, getLocalizedUrl, siteConfig } from "@/lib/site";

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
  const localizedProject = localizeProject(project, locale);

  const t = await getTranslations({ locale, namespace: "projects.caseStudy" });
  const path = `/projects/${project.id}`;
  const canonical = getLocalizedUrl(locale as "en" | "ar", path);
  const imageUrl = getAbsoluteUrl(project.image || siteConfig.ogImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${localizedProject.title} - ${t("badge")}`,
    description: localizedProject.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      title: localizedProject.title,
      description: localizedProject.description,
      url: canonical,
      siteName: siteConfig.title,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: localizedProject.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: localizedProject.title,
      description: localizedProject.description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id, locale } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();
  const localizedProject = localizeProject(project, locale);

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
    .map((r) => localizeProject(r.p, locale));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: localizedProject.title,
    description: localizedProject.description,
    image: getAbsoluteUrl(localizedProject.image || siteConfig.ogImage),
    url:
      localizedProject.liveUrl ??
      localizedProject.projectUrl ??
      getLocalizedUrl(locale as "en" | "ar", `/projects/${localizedProject.id}`),
    keywords: localizedProject.technologies.join(", "),
    inLanguage: locale,
    creator: {
      "@type": "Person",
      name: siteConfig.personName,
      url: siteConfig.url,
    },
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: localizedProject.title,
    description: localizedProject.description,
    applicationCategory: localizedProject.category ?? "BusinessApplication",
    operatingSystem: localizedProject.hasMobileApps ? "iOS, Android, Web" : "Web",
    image: getAbsoluteUrl(localizedProject.image || siteConfig.ogImage),
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: siteConfig.personName,
      url: siteConfig.url,
    },
    url: getLocalizedUrl(locale as "en" | "ar", `/projects/${localizedProject.id}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      {localizedProject.hasMobileApps ? (
        <MobileEcosystemCaseStudy project={localizedProject} related={related} />
      ) : (
        <CaseStudyView project={localizedProject} related={related} />
      )}
    </>
  );
}
