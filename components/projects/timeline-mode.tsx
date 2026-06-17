"use client";

import * as React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  categoryMeta,
  resolveCaseStudy,
  type Project,
} from "@/lib/projects-data";
import { cn } from "@/lib/utils";
import { IPhoneMockup } from "@/components/system";
import { themeFor } from "./accent";
import { useIsMobile } from "./use-projects-ui";
import { localeDirection, type Locale } from "@/i18n/routing";

function TimelineCard({
  project,
  index,
  side,
}: {
  project: Project;
  index: number;
  side: "left" | "right";
}) {
  const t = useTranslations("projects.labels");
  const locale = useLocale() as Locale;
  const theme = themeFor(project);
  const cs = resolveCaseStudy(project, locale);
  const year = cs.meta?.timeline ?? cs.meta?.status ?? t("viewProject");
  const isMobileApp = (project.category ?? "platform") === "mobile";
  const isRtl = localeDirection[locale] === "rtl";

  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[1.6rem] border border-foreground/10 bg-gradient-to-b from-white/[0.07] to-white/[0.015] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-foreground/20",
        theme.hoverRing,
      )}
    >
      {/* accent glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-20 left-1/2 h-44 w-[70%] -translate-x-1/2 rounded-full blur-[80px] opacity-0 transition-opacity duration-700 group-hover:opacity-100",
          theme.glow,
        )}
      />

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {isMobileApp ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.06),transparent_70%)]">
            <div className="scale-[0.55] transform-gpu transition-transform duration-700 group-hover:scale-[0.6]">
              <IPhoneMockup
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                chassis={index % 2 === 0 ? "graphite" : "silver"}
              />
            </div>
          </div>
        ) : (
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(min-width:1024px) 42vw, 92vw"
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />

        <div className={cn("absolute top-4 flex items-center gap-2", side === "left" ? "right-4" : "left-4")}>
          <span
            className={cn(
              "rounded-full border bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md",
              theme.border,
              theme.text,
            )}
          >
            {t(project.category ?? "platform")}
          </span>
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col gap-3 p-6", isRtl && "text-right")}>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className={cn("h-1.5 w-1.5 rounded-full", theme.dot)} />
          {String(index + 1).padStart(2, "0")}
          <span className="h-px w-5 bg-foreground/20" />
          {year}
        </div>

        <h3 className="text-balance text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-pretty text-sm leading-relaxed text-foreground/75">
          {project.description}
        </p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-foreground/10 bg-card/50 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-md border border-foreground/10 bg-card/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-foreground/5 pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {t("viewFullCaseStudy")}
          </span>
          <ArrowUpRight className={cn("h-4 w-4 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]", theme.text)} />
        </div>
      </div>
    </Link>
  );
}

function TimelineRow({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const theme = themeFor(project);
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, margin: "-10% 0px -10% 0px" });

  // Desktop: alternate sides. Mobile: everything to the right of the rail.
  const side: "left" | "right" = isMobile ? "right" : index % 2 === 0 ? "left" : "right";
  const fromX = reduced ? 0 : side === "left" ? -70 : 70;

  return (
    <div
      ref={ref}
      className={cn(
        "relative grid items-center gap-6",
        isMobile ? "grid-cols-[auto_1fr] pl-2" : "grid-cols-[1fr_auto_1fr]",
      )}
    >
      {/* LEFT cell (desktop) */}
      {!isMobile && (
        <div className={cn(side === "left" ? "flex justify-end pr-4" : "")}>
          {side === "left" && (
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, x: fromX, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <TimelineCard project={project} index={index} side="left" />
            </motion.div>
          )}
        </div>
      )}

      {/* NODE on the rail */}
      <div className="relative flex h-full w-8 items-center justify-center">
        <motion.span
          aria-hidden
          className={cn("absolute h-16 w-16 rounded-full blur-2xl", theme.glow)}
          animate={{ opacity: inView ? 0.9 : 0, scale: inView ? 1 : 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.span
          className={cn(
            "relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-background",
            inView ? theme.border : "border-foreground/25",
          )}
          animate={{ scale: inView ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
        >
          <motion.span
            className={cn("h-2 w-2 rounded-full", theme.dot)}
            animate={{ scale: inView ? 1 : 0.5, opacity: inView ? 1 : 0.4 }}
            transition={{ duration: 0.4 }}
          />
        </motion.span>
      </div>

      {/* RIGHT cell */}
      <div className={cn(isMobile ? "" : side === "right" ? "flex justify-start pl-4" : "")}>
        {(side === "right" || isMobile) && (
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: fromX, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <TimelineCard project={project} index={index} side="right" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function TimelineMode({ projects }: { projects: Project[] }) {
  const isMobile = useIsMobile();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Fill the rail with light as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const headTop = useTransform(fill, (v) => `${Math.min(v, 1) * 100}%`);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-6xl">
      {/* The rail */}
      <div
        className={cn(
          "absolute top-0 h-full w-px",
          isMobile ? "left-[1.4rem]" : "left-1/2 -translate-x-1/2",
        )}
      >
        {/* dim track */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/12 to-transparent" />
        {/* light fill */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-emerald-300/0 via-emerald-300/80 to-teal-300/70 shadow-[0_0_18px_rgba(52,211,153,0.7)]"
          style={{ height: "100%", scaleY: fill }}
        />
        {/* glowing head that travels down the rail as it fills */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100 shadow-[0_0_22px_8px_rgba(52,211,153,0.75)]"
          style={{ top: headTop }}
        />
      </div>

      <div className="flex flex-col gap-16 py-6 sm:gap-24">
        {projects.map((project, i) => (
          <TimelineRow key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
