"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Smartphone, Sparkles } from "lucide-react";
import {
  categoryMeta,
  getProjectCategories,
  localizeProject,
  type Project,
  type ProjectCategory,
} from "@/lib/projects-data";
import { cn } from "@/lib/utils";
import { IPhoneMockup } from "@/components/system";
import { AmbientBackground } from "@/components/projects/ambient-background";
import { ModeSwitcher, type ViewMode } from "@/components/projects/mode-switcher";
import { localeDirection, type Locale } from "@/i18n/routing";

const CinematicMode = dynamic(
  () => import("@/components/projects/cinematic-mode").then((mod) => mod.CinematicMode),
  { loading: () => <ModeStageSkeleton /> },
);
const TimelineMode = dynamic(
  () => import("@/components/projects/timeline-mode").then((mod) => mod.TimelineMode),
  { loading: () => <ModeStageSkeleton /> },
);
const OrbitalMode = dynamic(
  () => import("@/components/projects/orbital-mode").then((mod) => mod.OrbitalMode),
  { loading: () => <ModeStageSkeleton /> },
);

function ModeStageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="h-[28rem] rounded-[2rem] border border-foreground/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] backdrop-blur-xl" />
    </div>
  );
}

function MobileEcosystemShowcase({ apps }: { apps: Project[] }) {
  const t = useTranslations("projects.labels");
  const locale = useLocale() as Locale;
  const isRtl = localeDirection[locale] === "rtl";
  if (apps.length === 0) return null;
  return (
    <section className="relative isolate mt-28 overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] px-6 py-16 shadow-[0_8px_28px_-26px_rgba(15,23,42,0.14)] sm:px-10 sm:py-20 dark:shadow-none">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60%] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

      <div className={cn("mx-auto max-w-3xl", isRtl ? "text-right" : "text-left")}>
        <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
          <Smartphone className="h-3 w-3" /> {t("mobileExperience")}
        </span>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("mobileHeading")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-foreground/80">
          {t("mobileLead")}
        </p>
      </div>

      <div className="relative mt-14 grid items-end gap-10 sm:grid-cols-3">
        {apps.slice(0, 3).map((app, i) => (
          <div
            key={app.id}
            className={cn(
              "group relative flex flex-col items-center text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              i === 1 ? "sm:-translate-y-6" : "sm:translate-y-0",
            )}
          >
            <Link href={`/projects/${app.id}`} className="block transition-transform duration-700 group-hover:-translate-y-2">
              <IPhoneMockup
                src={app.image || "/placeholder.svg"}
                alt={app.title}
                chassis={i === 1 ? "graphite" : "silver"}
                caption={t(app.category ?? "mobile")}
              />
            </Link>
            <h3 className="mt-8 text-base font-semibold tracking-tight text-foreground">
              {app.title.split(" - ")[0]}
            </h3>
            <p className="mt-2 line-clamp-3 max-w-xs text-sm leading-relaxed text-foreground/80">
              {app.description}
            </p>
          </div>
        ))}
      </div>

      <div className={cn("mx-auto mt-14 max-w-3xl rounded-2xl border border-foreground/10 bg-card/40 p-6", isRtl ? "text-right" : "text-left")}>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
          {t("appArchitecture")}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">{t("appArchitectureText")}</p>
      </div>
    </section>
  );
}

const modeTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function ProjectsArchive({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects.labels");
  const locale = useLocale() as Locale;
  const reduced = useReducedMotion() ?? false;
  const [mode, setMode] = React.useState<ViewMode>("cinematic");
  const localizedProjects = React.useMemo(
    () => projects.map((project) => localizeProject(project, locale)),
    [locale, projects],
  );

  const mobileApps = React.useMemo(
    () => localizedProjects.filter((p) => p.category === "mobile"),
    [localizedProjects],
  );

  const counts = React.useMemo(() => {
    const map: Partial<Record<ProjectCategory, number>> = {};
    for (const p of localizedProjects) {
      for (const c of getProjectCategories(p)) map[c] = (map[c] ?? 0) + 1;
    }
    return map;
  }, [localizedProjects]);

  return (
    <section className="relative isolate overflow-x-clip bg-background pb-28 pt-24 text-foreground sm:pt-32">
      <AmbientBackground />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85"
          >
            <Sparkles className="h-3 w-3" /> {t("experienceBadge")} - {t("projectsCount", { count: localizedProjects.length })}
          </motion.span>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t("experienceHeading")}
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg"
          >
            {t("experienceLead")}
          </motion.p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4">
          {[
            { k: t("statSystems"), v: localizedProjects.length },
            { k: t("statMobile"), v: mobileApps.length },
            { k: t("statDashboards"), v: counts.dashboard ?? 0 },
            { k: t("statFullstack"), v: counts.fullstack ?? 0 },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3 text-center backdrop-blur-sm">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{s.k}</div>
              <div className="mt-1 text-xl font-semibold text-foreground">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center sm:mt-28">
          <ModeSwitcher mode={mode} onChange={setMode} />
        </div>
      </div>

      <div className="mt-16 sm:mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={modeTransition}
          >
            {mode === "cinematic" && (
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <CinematicMode projects={localizedProjects} />
              </div>
            )}
            {mode === "timeline" && (
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <TimelineMode projects={localizedProjects} />
              </div>
            )}
            {mode === "orbital" && <OrbitalMode projects={localizedProjects} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MobileEcosystemShowcase apps={mobileApps} />
      </div>
    </section>
  );
}
