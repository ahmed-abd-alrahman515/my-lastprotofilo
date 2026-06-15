"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Boxes,
  Layers3,
  Smartphone,
  ServerCog,
  Plug,
  LayoutDashboard,
  ShieldCheck,
  Gauge,
  Sparkles,
  Wand2,
  CheckCircle2,
  GitBranch,
  Target,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IPhoneMockup } from "@/components/system";
import {
  categoryMeta,
  getProjectCategories,
  resolveCaseStudy,
  type Project,
} from "@/lib/projects-data";
import {
  Reveal,
  Stagger,
  StaggerItem,
  CaseStudyNav,
  SectionShell,
  Panel,
  BrowserFrame,
  ScreenshotShowcase,
  ArchitectureFlow,
  ProblemSolution,
  TechStackGroups,
  ChallengeCards,
  ResultMetrics,
  RelatedSlider,
  type NavItem,
  type Shot,
} from "@/components/case-study/ui";
import { cn } from "@/lib/utils";

export function CaseStudyView({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const t = useTranslations("projects.caseStudy");
  const cs = resolveCaseStudy(project);
  const liveHref = project.liveUrl ?? project.projectUrl;
  const categories = getProjectCategories(project);
  const isMobile = project.category === "mobile";

  // Only consider sibling mobile apps when THIS project explicitly ships one.
  const ecosystemApps = project.hasMobileApp
    ? related.filter(
        (r) => r.group && r.group === project.group && r.category === "mobile",
      )
    : [];

  const stackGroups = React.useMemo(() => {
    if (!cs.techStack) return [];
    return (
      [
        [t("stackFrontend"), cs.techStack.frontend],
        [t("stackBackend"), cs.techStack.backend],
        [t("stackMobile"), cs.techStack.mobile],
        [t("stackIntegrations"), cs.techStack.integrations],
        [t("stackInfrastructure"), cs.techStack.infrastructure],
      ] as const
    )
      .filter(([, list]) => list && list.length > 0)
      .map(([label, list]) => ({ label, items: list as string[] }));
  }, [cs.techStack, t]);

  const galleryShots: Shot[] = React.useMemo(
    () =>
      (cs.gallery ?? []).map((g) => ({
        src: g.src,
        title: g.caption,
        description: undefined,
      })),
    [cs.gallery],
  );

  const mobileTrio = React.useMemo(() => {
    if (ecosystemApps.length > 0) {
      return ecosystemApps.slice(0, 3).map((a) => ({
        name: a.title.split(" – ")[0],
        description: a.description,
        image: a.image,
        href: `/projects/${a.id}` as string | undefined,
        role: (a.accent ?? "cyan") as string,
      }));
    }
    return (cs.mobileApps ?? []).slice(0, 3).map((a) => ({
      name: a.name,
      description: a.description,
      image: a.image ?? project.image,
      href: undefined as string | undefined,
      role: a.role,
    }));
  }, [ecosystemApps, cs.mobileApps, project.image]);

  // Build sticky nav from the sections that actually render.
  const navItems: NavItem[] = React.useMemo(() => {
    const items: NavItem[] = [
      { id: "overview", label: t("nav.overview") },
      { id: "problem", label: t("nav.problem") },
      { id: "solution", label: t("nav.solution") },
    ];
    if (cs.architecture) items.push({ id: "architecture", label: t("nav.architecture") });
    if (stackGroups.length > 0) items.push({ id: "stack", label: t("nav.stack") });
    if (galleryShots.length > 0) items.push({ id: "screens", label: t("nav.screens") });
    if (cs.systemFeatures?.length) items.push({ id: "features", label: t("nav.features") });
    if (cs.challenges?.length) items.push({ id: "challenges", label: t("nav.challenges") });
    if (cs.outcomes?.length) items.push({ id: "results", label: t("nav.results") });
    return items;
  }, [cs, stackGroups.length, galleryShots.length, t]);

  return (
    <div className="relative isolate overflow-hidden bg-background text-foreground">
      <style>{`
        @keyframes csFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .cs-float { animation: csFloat 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .cs-float { animation: none; } }
      `}</style>

      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(148,163,184,0.15),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.07),transparent_24%),linear-gradient(180deg,rgba(5,5,5,0.98)_0%,#050505_100%)]" />
        <div className="absolute left-[-14%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-emerald-500/[0.05] blur-3xl" />
        <div className="absolute bottom-[-18%] right-[-16%] h-[36rem] w-[36rem] rounded-full bg-teal-400/[0.05] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.032)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.028)_1px,transparent_1px)] bg-[size:92px_92px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      </div>

      {/* 1 — HERO */}
      <section className="relative pb-12 pt-20 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="-ml-3 mb-8 text-foreground/80 hover:bg-foreground/[0.07] hover:text-foreground"
          >
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("backToArchive")}
            </Link>
          </Button>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <Reveal y={30}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-200/30 bg-emerald-200/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200">
                  {t("badge")}
                </span>
                {project.group && (
                  <span className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/80">
                    {project.group}
                  </span>
                )}
                {categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                  >
                    {categoryMeta[c].label}
                  </span>
                ))}
              </div>

              <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {cs.heroHeadline ?? project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/80">
                {cs.heroSubline ?? project.description}
              </p>

              <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {(["role", "timeline", "industry", "status"] as const).map((k) => {
                  const metaLabel = {
                    role: t("metaRole"),
                    timeline: t("metaTimeline"),
                    industry: t("metaIndustry"),
                    status: t("metaStatus"),
                  }[k];
                  return cs.meta?.[k] ? (
                    <div
                      key={k}
                      className="rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {metaLabel}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-foreground">
                        {cs.meta[k]}
                      </dd>
                    </div>
                  ) : null;
                })}
              </dl>

              {(liveHref || project.githubUrl) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {liveHref && (
                    <Button asChild>
                      <a href={liveHref} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" aria-hidden />
                        {t("viewLive")}
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="border-foreground/15 bg-foreground/[0.07] text-foreground hover:border-emerald-200/35 hover:bg-foreground/[0.12]"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" aria-hidden />
                        {t("source")}
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </Reveal>

            {/* Hero showcase */}
            <Reveal x={34} y={0} delay={0.12}>
              {isMobile ? (
                <div className="cs-float mx-auto w-fit">
                  <IPhoneMockup
                    src={cs.heroImage ?? project.image}
                    alt={project.title}
                    chassis="graphite"
                  />
                </div>
              ) : (
                <BrowserFrame
                  src={cs.heroImage ?? project.image}
                  alt={project.title}
                  label={project.id}
                  priority
                />
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sticky case-study nav */}
      <CaseStudyNav items={navItems} ariaLabel={t("jumpTo")} />

      {/* 2 — OVERVIEW */}
      <SectionShell
        id="overview"
        index="01"
        eyebrow={t("overviewEyebrow")}
        title={t("overviewTitle")}
        icon={Sparkles}
      >
        <Reveal>
          <Panel>
            <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
              {cs.overview}
            </p>
          </Panel>
        </Reveal>
      </SectionShell>

      {/* 3 — PROBLEM / SOLUTION */}
      <section className="relative scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProblemSolution
            problem={{
              id: "problem",
              index: "02",
              badge: t("problemEyebrow"),
              title: t("problemTitle"),
              body: project.problem,
            }}
            solution={{
              id: "solution",
              index: "03",
              badge: t("solutionEyebrow"),
              title: t("solutionTitle"),
              body: project.solution,
            }}
          />
        </div>
      </section>

      {/* 4 — ARCHITECTURE */}
      {cs.architecture && (
        <SectionShell
          id="architecture"
          index="04"
          eyebrow={t("architectureEyebrow")}
          title={t("architectureTitle")}
          icon={Boxes}
        >
          <Reveal>
            <Panel>
              <p className="max-w-3xl leading-relaxed text-foreground/80">
                {cs.architecture.narrative}
              </p>
              <div className="mt-8">
                <ArchitectureFlow
                  nodes={cs.architecture.layers}
                  flowLabel={t("dataFlow")}
                />
              </div>
            </Panel>
          </Reveal>
        </SectionShell>
      )}

      {/* 5 — TECH STACK */}
      {stackGroups.length > 0 && (
        <SectionShell
          id="stack"
          index="05"
          eyebrow={t("stackEyebrow")}
          title={t("stackTitle")}
          icon={Layers3}
        >
          <TechStackGroups groups={stackGroups} />
        </SectionShell>
      )}

      {/* 6 — SCREENS */}
      {galleryShots.length > 0 && (
        <SectionShell
          id="screens"
          index="06"
          eyebrow={t("galleryEyebrow")}
          title={t("galleryTitle")}
          icon={ImageIcon}
        >
          <Reveal>
            <ScreenshotShowcase
              shots={galleryShots}
              expandLabel={t("expand")}
              closeLabel={t("close")}
            />
          </Reveal>
        </SectionShell>
      )}

      {/* 7 — MOBILE APPS (only when this project ships one) */}
      {mobileTrio.length > 0 && (
        <SectionShell
          index="07"
          eyebrow={t("mobileAppsEyebrow")}
          title={t("mobileAppsTitle")}
          icon={Smartphone}
        >
          <Panel className="relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-3/4 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl"
            />
            <Stagger className="relative grid items-end gap-10 sm:grid-cols-3">
              {mobileTrio.map((app, i) => {
                const body = (
                  <>
                    <div className="cs-float" style={{ animationDelay: `${i * 600}ms` }}>
                      <IPhoneMockup
                        src={app.image || "/placeholder.svg"}
                        alt={app.name}
                        chassis={i === 1 ? "graphite" : "silver"}
                      />
                    </div>
                    <div className="mt-8 text-center">
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
                        {app.role}
                      </div>
                      <div className="mt-2 text-base font-semibold text-foreground">
                        {app.name}
                      </div>
                      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-foreground/75">
                        {app.description}
                      </p>
                    </div>
                  </>
                );
                return (
                  <StaggerItem
                    key={i}
                    className={cn(
                      "flex flex-col items-center",
                      i === 1 ? "sm:-translate-y-6" : "",
                    )}
                  >
                    {app.href ? (
                      <Link
                        href={app.href}
                        className="transition-transform duration-500 hover:-translate-y-2"
                      >
                        {body}
                      </Link>
                    ) : (
                      body
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Panel>
        </SectionShell>
      )}

      {/* 8 — BACKEND SYSTEMS */}
      {cs.backendSystems && cs.backendSystems.length > 0 && (
        <SectionShell
          index="08"
          eyebrow={t("backendEyebrow")}
          title={t("backendTitle")}
          icon={ServerCog}
        >
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {cs.backendSystems.map((s) => (
              <StaggerItem key={s.name}>
                <Panel className="h-full">
                  <div className="text-base font-semibold text-foreground">{s.name}</div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {s.description}
                  </p>
                </Panel>
              </StaggerItem>
            ))}
          </Stagger>
        </SectionShell>
      )}

      {/* 9 — APIs & Integrations */}
      {cs.apisIntegrations && cs.apisIntegrations.length > 0 && (
        <SectionShell
          index="09"
          eyebrow={t("apisEyebrow")}
          title={t("apisTitle")}
          icon={Plug}
        >
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cs.apisIntegrations.map((s) => (
              <StaggerItem key={s.name}>
                <Panel className="h-full">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
                    <Plug className="h-3 w-3" /> {t("integration")}
                  </div>
                  <div className="mt-2 text-base font-semibold text-foreground">{s.name}</div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {s.description}
                  </p>
                </Panel>
              </StaggerItem>
            ))}
          </Stagger>
        </SectionShell>
      )}

      {/* 10 — DASHBOARD STRUCTURE */}
      {cs.dashboardStructure && cs.dashboardStructure.length > 0 && (
        <SectionShell
          index="10"
          eyebrow={t("dashboardEyebrow")}
          title={t("dashboardTitle")}
          icon={LayoutDashboard}
        >
          <Reveal>
            <Panel>
              <Stagger className="grid gap-4 sm:grid-cols-2">
                {cs.dashboardStructure.map((d, i) => (
                  <StaggerItem
                    key={d.name}
                    className="flex gap-4 rounded-xl border border-foreground/5 bg-card/30 p-4"
                  >
                    <span className="font-mono text-xs text-emerald-200/85">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{d.name}</div>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/75">
                        {d.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Panel>
          </Reveal>
        </SectionShell>
      )}

      {/* 11 — CHALLENGES */}
      {cs.challenges && cs.challenges.length > 0 && (
        <SectionShell
          id="challenges"
          index="11"
          eyebrow={t("challengesEyebrow")}
          title={t("challengesTitle")}
          icon={Wand2}
        >
          <ChallengeCards
            items={cs.challenges}
            challengeLabel={t("challenge")}
            resolutionLabel={t("resolution")}
            impactLabel={t("impact")}
          />
        </SectionShell>
      )}

      {/* 12 — PERFORMANCE */}
      {cs.performance && cs.performance.length > 0 && (
        <SectionShell
          index="12"
          eyebrow={t("performanceEyebrow")}
          title={t("performanceTitle")}
          icon={Gauge}
        >
          <Reveal>
            <Panel>
              <Stagger className="grid gap-3 sm:grid-cols-2">
                {cs.performance.map((p) => (
                  <StaggerItem
                    key={p}
                    className="flex items-start gap-3 rounded-lg border border-foreground/5 bg-card/30 p-4 text-sm text-foreground/90"
                  >
                    <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    {p}
                  </StaggerItem>
                ))}
              </Stagger>
            </Panel>
          </Reveal>
        </SectionShell>
      )}

      {/* 13 — UI / UX */}
      {cs.uiux && cs.uiux.length > 0 && (
        <SectionShell
          index="13"
          eyebrow={t("uiuxEyebrow")}
          title={t("uiuxTitle")}
          icon={Wand2}
        >
          <Reveal>
            <Panel>
              <Stagger className="grid gap-3 sm:grid-cols-2">
                {cs.uiux.map((u) => (
                  <StaggerItem
                    key={u}
                    className="flex items-start gap-3 rounded-lg border border-foreground/5 bg-card/30 p-4 text-sm text-foreground/90"
                  >
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                    {u}
                  </StaggerItem>
                ))}
              </Stagger>
            </Panel>
          </Reveal>
        </SectionShell>
      )}

      {/* 14 — PRODUCTION READINESS */}
      {cs.productionReadiness && cs.productionReadiness.length > 0 && (
        <SectionShell
          index="14"
          eyebrow={t("productionEyebrow")}
          title={t("productionTitle")}
          icon={ShieldCheck}
        >
          <Reveal>
            <Panel>
              <Stagger className="grid gap-3 sm:grid-cols-2">
                {cs.productionReadiness.map((u) => (
                  <StaggerItem
                    key={u}
                    className="flex items-start gap-3 rounded-lg border border-foreground/5 bg-card/30 p-4 text-sm text-foreground/90"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    {u}
                  </StaggerItem>
                ))}
              </Stagger>
            </Panel>
          </Reveal>
        </SectionShell>
      )}

      {/* 15 — SYSTEM FEATURES */}
      {cs.systemFeatures && cs.systemFeatures.length > 0 && (
        <SectionShell
          id="features"
          index="15"
          eyebrow={t("featuresEyebrow")}
          title={t("featuresTitle")}
          icon={CheckCircle2}
        >
          <Reveal>
            <Panel>
              <Stagger className="grid gap-3 sm:grid-cols-2">
                {cs.systemFeatures.map((f) => (
                  <StaggerItem
                    key={f.title}
                    className="flex items-start gap-3 rounded-lg border border-foreground/5 bg-card/30 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    <div>
                      <div className="text-sm font-semibold text-foreground">{f.title}</div>
                      {f.description && (
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {f.description}
                        </p>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Panel>
          </Reveal>
        </SectionShell>
      )}

      {/* 16 — TECHNICAL DECISIONS */}
      {cs.technicalDecisions && cs.technicalDecisions.length > 0 && (
        <SectionShell
          index="16"
          eyebrow={t("decisionsEyebrow")}
          title={t("decisionsTitle")}
          icon={GitBranch}
        >
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {cs.technicalDecisions.map((d, i) => (
              <StaggerItem key={i}>
                <Panel className="h-full">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
                    {t("decision")} 0{i + 1}
                  </div>
                  <p className="mt-3 font-medium text-foreground">{d.decision}</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {d.rationale}
                  </p>
                </Panel>
              </StaggerItem>
            ))}
          </Stagger>
        </SectionShell>
      )}

      {/* 17 — OUTCOMES */}
      {cs.outcomes && cs.outcomes.length > 0 && (
        <SectionShell
          id="results"
          index="17"
          eyebrow={t("outcomeEyebrow")}
          title={t("outcomeTitle")}
          icon={Target}
        >
          <ResultMetrics outcomes={cs.outcomes} />
        </SectionShell>
      )}

      {/* 18 — RELATED + CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {related.length > 0 && (
            <div className="mb-16">
              <Reveal>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
                      {t("continueExploring")}
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {t("otherCaseStudies")}
                    </h2>
                  </div>
                  <Link
                    href="/projects"
                    className="hidden items-center gap-1 text-sm text-foreground/80 hover:text-foreground sm:inline-flex"
                  >
                    {t("viewArchive")} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
              <div className="mt-6">
                <RelatedSlider related={related} ctaLabel={t("viewArchive")} />
              </div>
            </div>
          )}

          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-emerald-300/[0.06] via-white/[0.03] to-emerald-300/[0.06] p-8 text-center sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-emerald-400/12 blur-3xl"
              />
              <h2 className="relative text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {t("ctaHeading")}
              </h2>
              <p className="relative mx-auto mt-3 max-w-xl text-pretty text-foreground/80">
                {t("ctaLead")}
              </p>
              <div className="relative mt-6">
                <Button asChild size="lg" className="shadow-lg shadow-emerald-950/40">
                  <Link href="/contact">
                    {t("ctaButton")}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
