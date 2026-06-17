"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Boxes,
  Smartphone,
  MonitorSmartphone,
  Network,
  Sparkles,
  CheckCircle2,
  Layers3,
  Wand2,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IPhoneMockup } from "@/components/system";
import {
  getProjectCategories,
  localizeProject,
  resolveCaseStudy,
  type Project,
  type MobileAppShowcase,
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
  ProblemSolution,
  TechStackGroups,
  ChallengeCards,
  ResultMetrics,
  RelatedSlider,
  type NavItem,
  type Shot,
} from "@/components/case-study/ui";
import { cn } from "@/lib/utils";
import { localeDirection, type Locale } from "@/i18n/routing";

/* ───────────────────────── mobile phone slider ───────────────────────── */

type FlatScreen = {
  appName: string;
  appType: string;
  src: string;
  title: string;
  description: string;
};

function localizeAppLabel(value: string, tLabels: ReturnType<typeof useTranslations>) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "customer app" || normalized === "customer") return tLabels("customerApp");
  if (normalized === "delivery app" || normalized === "delivery") return tLabels("deliveryApp");
  if (normalized === "admin dashboard" || normalized === "admin app" || normalized === "admin") {
    return tLabels("adminDashboard");
  }
  if (normalized === "sales rep app" || normalized === "sales representative app") {
    return tLabels("salesRepApp");
  }
  return value;
}

function MobilePhoneSlider({ apps }: { apps: MobileAppShowcase[] }) {
  const t = useTranslations("projects.labels");
  const locale = useLocale() as Locale;
  const isRtl = localeDirection[locale] === "rtl";
  const flat: FlatScreen[] = React.useMemo(
    () =>
      apps.flatMap((a) =>
        a.screens.map((s) => ({
          appName: localizeAppLabel(a.name, t),
          appType: localizeAppLabel(a.type, t),
          src: s.src,
          title: s.title,
          description: s.description,
        })),
      ),
    [apps, t],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
    dragFree: false,
    direction: isRtl ? "rtl" : "ltr",
  });
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (flat.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          className={cn(
            "flex items-stretch gap-4 px-2 py-4 sm:gap-6 sm:px-6",
            isRtl && "flex-row-reverse",
          )}
        >
          {flat.map((s, i) => {
            const isActive = i === selected;
            return (
              <div
                key={i}
                className={cn(
                  "min-w-0 flex-[0_0_82%] transition-all duration-500 sm:flex-[0_0_52%] lg:flex-[0_0_34%]",
                  isActive ? "opacity-100" : "opacity-55",
                )}
              >
                <div className="flex h-full flex-col items-center">
                  <div
                    className={cn(
                      "relative flex min-h-[28rem] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-foreground/10 bg-gradient-to-b from-white/[0.03] to-transparent px-3 py-8 transition-all duration-500",
                      isActive
                        ? "bg-card/72 shadow-[0_18px_44px_-30px_rgba(16,185,129,0.25)]"
                        : "bg-card/40",
                    )}
                  >
                    <div
                      aria-hidden
                      className={cn(
                        "absolute inset-x-10 top-6 h-24 rounded-full bg-emerald-400/10 blur-3xl transition-opacity duration-500",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <div className="relative flex items-center justify-center">
                      <div
                        className={cn(
                          "transform-gpu transition-transform duration-500",
                          isActive ? "scale-[0.94]" : "scale-[0.78]",
                        )}
                      >
                        <IPhoneMockup
                          src={s.src || "/placeholder.svg"}
                          alt={s.title}
                          chassis={i % 2 === 0 ? "graphite" : "silver"}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-full px-2 pb-1 pt-4 transition-all duration-300",
                      isRtl ? "text-right" : "text-left",
                    )}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
                      {s.appName}
                    </div>
                    <div className="mt-1.5 text-base font-semibold text-foreground">
                      {s.title}
                    </div>
                    <div className="mt-1 text-xs text-foreground/55">{s.appType}</div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/75">
                      {s.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label={t("previous")}
        onClick={() => emblaApi?.scrollPrev()}
        className={cn(
          "absolute top-[40%] z-10 -translate-y-1/2 rounded-full border border-foreground/10 bg-card/85 p-2 text-foreground backdrop-blur-md transition hover:border-emerald-200/40 hover:bg-muted sm:p-2.5",
          isRtl ? "right-0 sm:right-2" : "left-0 sm:left-2",
        )}
      >
        {isRtl ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>
      <button
        type="button"
        aria-label={t("next")}
        onClick={() => emblaApi?.scrollNext()}
        className={cn(
          "absolute top-[40%] z-10 -translate-y-1/2 rounded-full border border-foreground/10 bg-card/85 p-2 text-foreground backdrop-blur-md transition hover:border-emerald-200/40 hover:bg-muted sm:p-2.5",
          isRtl ? "left-0 sm:left-2" : "right-0 sm:right-2",
        )}
      >
        {isRtl ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>

      <div className="mt-6 flex justify-center gap-2 sm:mt-8">
        {flat.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={t("goToScreen", { index: i + 1 })}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === selected
                ? "w-8 bg-emerald-300"
                : "w-2 bg-foreground/20 hover:bg-foreground/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── ecosystem architecture map ───────────────────────── */

function EcosystemArchitecture({ items }: { items: string[] }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.07),transparent_60%)]"
      />
      <Stagger className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <StaggerItem key={item}>
            <div className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-foreground/10 bg-card/50 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-200/40 hover:bg-card/70">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-300/10 font-mono text-[11px] text-emerald-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <span className="text-sm font-medium text-foreground">{item}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/* ───────────────────────── main view ───────────────────────── */

export function MobileEcosystemCaseStudy({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const t = useTranslations("projects.caseStudy");
  const tLabels = useTranslations("projects.labels");
  const locale = useLocale() as Locale;
  const localizedProject = React.useMemo(() => localizeProject(project, locale), [locale, project]);
  const cs = resolveCaseStudy(project, locale);
  const liveHref = localizedProject.liveUrl ?? localizedProject.projectUrl;
  const categories = getProjectCategories(localizedProject);
  const eco = cs.mobileEcosystem;
  const isRtl = localeDirection[locale] === "rtl";

  const heroShot = eco?.systemScreenshots?.[0];
  const heroSrc = heroShot?.src ?? cs.heroImage ?? project.image;

  const systemShots: Shot[] = React.useMemo(
    () =>
      (eco?.systemScreenshots ?? []).map((s) => ({
        src: s.src,
        title: s.title,
        description: s.description,
      })),
    [eco?.systemScreenshots],
  );

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

  const navItems: NavItem[] = React.useMemo(() => {
    const items: NavItem[] = [];
    if (systemShots.length > 0) items.push({ id: "system", label: t("nav.screens") });
    if (eco?.architectureItems?.length)
      items.push({ id: "architecture", label: t("nav.architecture") });
    items.push({ id: "overview", label: t("nav.overview") });
    items.push({ id: "problem", label: t("nav.problem") });
    items.push({ id: "solution", label: t("nav.solution") });
    if (stackGroups.length > 0) items.push({ id: "stack", label: t("nav.stack") });
    if (cs.challenges?.length) items.push({ id: "challenges", label: t("nav.challenges") });
    if (cs.outcomes?.length) items.push({ id: "results", label: t("nav.results") });
    return items;
  }, [systemShots.length, eco?.architectureItems, stackGroups.length, cs, t]);

  return (
    <div className="relative isolate overflow-hidden bg-background text-foreground">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(148,163,184,0.15),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.07),transparent_24%),linear-gradient(180deg,rgba(5,5,5,0.98)_0%,#050505_100%)]" />
        <div className="absolute left-[-14%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-emerald-500/[0.05] blur-3xl" />
        <div className="absolute bottom-[-18%] right-[-16%] h-[36rem] w-[36rem] rounded-full bg-teal-400/[0.05] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.032)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.028)_1px,transparent_1px)] bg-[size:92px_92px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      </div>

      {/* 1 — HERO (system-first) */}
      <section className="relative pb-12 pt-20 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="-ml-3 mb-8 text-foreground/80 hover:bg-foreground/[0.07] hover:text-foreground"
          >
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              {t("backToArchive")}
            </Link>
          </Button>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
            <Reveal y={30}>
              <div className={cn("flex flex-wrap items-center gap-2", isRtl && "justify-end")}>
                <span className="rounded-full border border-emerald-200/30 bg-emerald-200/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200">
                  {t("ecosystemBadge")}
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
                    {tLabels(c)}
                  </span>
                ))}
              </div>

              <h1 className={cn("mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl", isRtl && "text-right leading-[1.18]")}>
                {cs.heroHeadline ?? localizedProject.title}
              </h1>
              <p className={cn("mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/80", isRtl && "text-right")}>
                {cs.heroSubline ?? localizedProject.description}
              </p>

              <dl className={cn("mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4", isRtl && "text-right")}>
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
                <div className={cn("mt-8 flex flex-wrap gap-3", isRtl && "justify-end")}>
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

            {/* Hero — LARGE SYSTEM/DASHBOARD frame (not phone) */}
            <Reveal x={34} y={0} delay={0.12}>
              <BrowserFrame
                src={heroSrc}
                alt={localizedProject.title}
                label={heroShot?.title ?? project.id}
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sticky nav */}
      <CaseStudyNav items={navItems} ariaLabel={t("jumpTo")} />

      {/* 2 — SYSTEM / DASHBOARD SHOWCASE */}
      {systemShots.length > 0 && (
        <SectionShell
          id="system"
          index="01"
          eyebrow={t("systemShowcaseEyebrow")}
          title={t("systemShowcaseTitle")}
          icon={MonitorSmartphone}
        >
          <Reveal>
            <ScreenshotShowcase
              shots={systemShots}
              expandLabel={t("expand")}
              closeLabel={t("close")}
            />
          </Reveal>
        </SectionShell>
      )}

      {/* 3 — MOBILE APPLICATIONS SHOWCASE */}
      {eco?.mobileApps && eco.mobileApps.length > 0 && (
        <SectionShell
          index="02"
          eyebrow={t("mobileShowcaseEyebrow")}
          title={t("mobileShowcaseTitle")}
          icon={Smartphone}
        >
          <Reveal>
            <Panel className="relative overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-3/4 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl"
              />
              <div className="relative">
                <MobilePhoneSlider apps={eco.mobileApps} />
              </div>
              <Stagger className="relative mt-8 grid gap-4 sm:grid-cols-3">
                {eco.mobileApps.map((a) => (
                  <StaggerItem
                    key={a.name}
                    className="rounded-xl border border-foreground/10 bg-card/40 p-4"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
                      {localizeAppLabel(a.type, tLabels)}
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-foreground">
                      {localizeAppLabel(a.name, tLabels)}
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-foreground/75">
                      {a.description}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </Panel>
          </Reveal>
        </SectionShell>
      )}

      {/* 4 — ECOSYSTEM ARCHITECTURE */}
      {eco?.architectureItems && eco.architectureItems.length > 0 && (
        <SectionShell
          id="architecture"
          index="03"
          eyebrow={t("ecosystemArchEyebrow")}
          title={t("ecosystemArchTitle")}
          icon={Network}
        >
          <Reveal>
            <Panel>
              <EcosystemArchitecture items={eco.architectureItems} />
            </Panel>
          </Reveal>
        </SectionShell>
      )}

      {/* 5 — OVERVIEW */}
      <SectionShell
        id="overview"
        index="04"
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

      {/* 6 — PROBLEM / SOLUTION */}
      <section className="relative scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProblemSolution
            problem={{
              id: "problem",
              index: "05",
              badge: t("problemEyebrow"),
              title: t("problemTitle"),
              body: localizedProject.problem,
            }}
            solution={{
              id: "solution",
              index: "06",
              badge: t("solutionEyebrow"),
              title: t("solutionTitle"),
              body: localizedProject.solution,
            }}
          />
        </div>
      </section>

      {/* 7 — FEATURES */}
      {cs.systemFeatures && cs.systemFeatures.length > 0 && (
        <SectionShell
          id="features"
          index="07"
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

      {/* 8 — TECH STACK */}
      {stackGroups.length > 0 && (
        <SectionShell
          id="stack"
          index="08"
          eyebrow={t("stackEyebrow")}
          title={t("stackTitle")}
          icon={Layers3}
        >
          <TechStackGroups groups={stackGroups} />
        </SectionShell>
      )}

      {/* 9 — CHALLENGES */}
      {cs.challenges && cs.challenges.length > 0 && (
        <SectionShell
          id="challenges"
          index="09"
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

      {/* 10 — OUTCOMES */}
      {cs.outcomes && cs.outcomes.length > 0 && (
        <SectionShell
          id="results"
          index="10"
          eyebrow={t("outcomeEyebrow")}
          title={t("outcomeTitle")}
          icon={Target}
        >
          <ResultMetrics outcomes={cs.outcomes} />
        </SectionShell>
      )}

      {/* 11 — GALLERY */}
      {cs.gallery && cs.gallery.length > 0 && (
        <SectionShell
          index="11"
          eyebrow={t("galleryEyebrow")}
          title={t("galleryTitle")}
          icon={Boxes}
        >
          <Reveal>
            <ScreenshotShowcase
              shots={cs.gallery.map((g) => ({ src: g.src, title: g.caption }))}
              expandLabel={t("expand")}
              closeLabel={t("close")}
            />
          </Reveal>
        </SectionShell>
      )}

      {/* 12 — RELATED + CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {related.length > 0 && (
            <div className="mb-16">
              <Reveal>
                <div className="flex items-end justify-between gap-4">
                  <div className={cn(isRtl && "text-right")}>
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
                    {t("viewArchive")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </Reveal>
              <div className="mt-6">
                <RelatedSlider related={related} ctaLabel={t("viewArchive")} />
              </div>
            </div>
          )}

          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-emerald-300/[0.06] via-white/[0.03] to-emerald-300/[0.06] p-8 text-center shadow-[0_8px_24px_-22px_rgba(15,23,42,0.14)] dark:shadow-none sm:p-12">
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
                <Button asChild size="lg" className="shadow-[0_4px_18px_-12px_rgba(16,185,129,0.26)] dark:shadow-lg dark:shadow-emerald-950/40">
                  <Link href="/contact">
                    {t("ctaButton")}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
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
