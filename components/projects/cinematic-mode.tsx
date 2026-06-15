"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import {
  categoryMeta,
  getProjectCategories,
  type Project,
} from "@/lib/projects-data";
import { cn } from "@/lib/utils";
import { IPhoneMockup } from "@/components/system";
import { themeFor, type AccentTheme } from "./accent";

/** Per-offset transform recipe for the cinematic stage (deeper than before). */
function transformFor(offset: number, reduced: boolean) {
  const abs = Math.abs(offset);
  const dir = Math.sign(offset);
  if (abs === 0) {
    return { x: "0%", scale: 1, rotateY: 0, opacity: 1, blur: 0, z: 50 };
  }
  if (abs === 1) {
    return {
      x: `${dir * 58}%`,
      scale: 0.78,
      rotateY: reduced ? 0 : dir * -26,
      opacity: 0.65,
      blur: 2,
      z: 40,
    };
  }
  if (abs === 2) {
    return {
      x: `${dir * 100}%`,
      scale: 0.6,
      rotateY: reduced ? 0 : dir * -32,
      opacity: 0.32,
      blur: 4,
      z: 30,
    };
  }
  return {
    x: `${dir * 138}%`,
    scale: 0.46,
    rotateY: reduced ? 0 : dir * -36,
    opacity: 0,
    blur: 7,
    z: 20,
  };
}

const revealItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function StackTags({ project }: { project: Project }) {
  const cats = getProjectCategories(project)
    .map((c) => categoryMeta[c].shortLabel)
    .slice(0, 4);
  return (
    <div className="flex flex-wrap gap-1.5">
      {cats.map((c) => (
        <span
          key={c}
          className="rounded-full border border-foreground/15 bg-foreground/[0.05] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function CinematicCard({
  project,
  active,
  index,
  theme,
}: {
  project: Project;
  active: boolean;
  index: number;
  theme: AccentTheme;
}) {
  const t = useTranslations("projects.labels");
  const reduced = useReducedMotion() ?? false;
  const primaryCategory = project.category ?? "platform";
  const isMobile = primaryCategory === "mobile";

  // Mouse parallax on the active card's media — gentle layered depth.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const imgX = useTransform(smx, (v) => v * 22);
  const imgY = useTransform(smy, (v) => v * 22);
  const glowX = useTransform(smx, (v) => v * -34);
  const glowY = useTransform(smy, (v) => v * -34);
  // Subtle pointer tilt for the whole card (active only).
  const tiltY = useTransform(smx, (v) => v * 6);
  const tiltX = useTransform(smy, (v) => v * -6);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !active) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={
        active && !reduced
          ? { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }
          : undefined
      }
      className={cn(
        "group/card relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] border bg-gradient-to-b from-white/[0.08] to-white/[0.015] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 [transform-style:preserve-3d]",
        active ? cn("border-transparent", theme.border, theme.ring) : "border-foreground/10",
      )}
    >
      {/* border glow pulse (active only) */}
      {active && !reduced && (
        <motion.div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[2rem] border",
            theme.border,
          )}
          animate={{ opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* glass shine sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 -translate-x-[120%] -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-x-[120%]"
      />

      {/* inner grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.04)_1px,transparent_1px)] bg-[size:46px_46px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />

      {/* layered accent glows that track the pointer */}
      <motion.div
        aria-hidden
        style={active && !reduced ? { x: glowX, y: glowY } : undefined}
        className={cn(
          "pointer-events-none absolute -top-28 left-1/2 h-64 w-[78%] -translate-x-1/2 rounded-full blur-[90px] transition-opacity duration-700",
          theme.glow,
          active ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-10 bottom-0 h-40 rounded-full blur-[80px] transition-opacity duration-700",
          theme.glow,
          active ? "opacity-60" : "opacity-0",
        )}
      />

      {/* Media — larger 16/9 hero with parallax */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {isMobile ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.06),transparent_70%)]">
            <div
              className={cn(
                "transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                active ? "scale-[0.62]" : "scale-[0.52]",
              )}
            >
              <IPhoneMockup
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                chassis={index % 2 === 0 ? "graphite" : "silver"}
              />
            </div>
          </div>
        ) : (
          <motion.div
            className="absolute inset-[-6%]"
            style={active && !reduced ? { x: imgX, y: imgY } : undefined}
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              sizes="(min-width:1024px) 64vw, 92vw"
              priority={active}
              className={cn(
                "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                active ? "scale-100 group-hover/card:scale-[1.06]" : "scale-110",
              )}
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/45 via-transparent to-background/45" />

        <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full border bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md",
              theme.border,
              theme.text,
            )}
          >
            {categoryMeta[primaryCategory].label}
          </span>
          {project.group && (
            <span className="rounded-full border border-foreground/15 bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 backdrop-blur-md">
              {project.group}
            </span>
          )}
        </div>
      </div>

      {/* Copy */}
      <div className="relative flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={project.id}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
              }}
              className="flex flex-1 flex-col gap-4"
            >
              <motion.div variants={revealItem}>
                <StackTags project={project} />
              </motion.div>

              <motion.h3
                variants={revealItem}
                className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl"
              >
                {project.title}
              </motion.h3>

              <motion.p
                variants={revealItem}
                className="line-clamp-3 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/75 sm:text-base"
              >
                {project.description}
              </motion.p>

              <motion.div variants={revealItem} className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-foreground/10 bg-card/50 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="rounded-md border border-foreground/10 bg-card/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    +{project.technologies.length - 5}
                  </span>
                )}
              </motion.div>

              <motion.div variants={revealItem} className="mt-auto pt-2">
                <Link
                  href={`/projects/${project.id}`}
                  className={cn(
                    "group/cta inline-flex items-center gap-2 rounded-full border bg-foreground/[0.04] px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-foreground/[0.08]",
                    theme.border,
                  )}
                >
                  {t("viewFullCaseStudy")}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!active && (
          <div className="flex flex-1 flex-col gap-3 opacity-70">
            <StackTags project={project} />
            <h3 className="text-balance text-xl font-semibold leading-tight tracking-tight text-foreground/80">
              {project.title}
            </h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function CinematicMode({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects.labels");
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = React.useState(0);
  const total = projects.length;

  const clamp = React.useCallback(
    (i: number) => Math.max(0, Math.min(total - 1, i)),
    [total],
  );
  const go = React.useCallback(
    (dir: number) => setActive((i) => clamp(i + dir)),
    [clamp],
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 70;
    if (info.offset.x < -threshold || info.velocity.x < -400) go(1);
    else if (info.offset.x > threshold || info.velocity.x > 400) go(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  if (total === 0) return null;
  const activeTheme = themeFor(projects[active]);

  return (
    <div className="relative">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t("exploreShowcase")}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative mx-auto h-[480px] w-full select-none outline-none [perspective:2400px] sm:h-[560px] lg:h-[620px]"
      >
        <motion.div
          className="absolute inset-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          dragSnapToOrigin
          onDragEnd={handleDragEnd}
          style={{ cursor: "grab" }}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.map((project, i) => {
            const offset = i - active;
            const tf = transformFor(offset, reduced);
            const far = Math.abs(offset) > 2;
            return (
              <div
                key={project.id}
                className="pointer-events-none absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]"
                style={{ zIndex: tf.z }}
              >
                <motion.div
                  className={cn(
                    "pointer-events-auto w-[90%] max-w-[760px] sm:w-[76%] lg:w-[62%]",
                    offset === 0 ? "cursor-default" : "cursor-pointer",
                  )}
                  initial={false}
                  animate={{
                    x: tf.x,
                    scale: tf.scale,
                    rotateY: tf.rotateY,
                    opacity: tf.opacity,
                    filter: `blur(${tf.blur}px)`,
                  }}
                  transition={
                    reduced
                      ? { duration: 0.2 }
                      : { type: "spring", stiffness: 240, damping: 30, mass: 0.9 }
                  }
                  style={{ pointerEvents: far ? "none" : "auto", transformOrigin: "center center" }}
                  onClick={() => {
                    if (offset !== 0) setActive(clamp(i));
                  }}
                  aria-hidden={offset !== 0}
                >
                  <CinematicCard
                    project={project}
                    active={offset === 0}
                    index={i}
                    theme={offset === 0 ? activeTheme : themeFor(project)}
                  />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-col items-center gap-5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label={t("prevProject")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.04] text-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/[0.08] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          </button>

          <div className="flex items-center gap-2">
            {projects.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`${i + 1} / ${total}`}
                  aria-current={isActive}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    isActive ? cn("w-8", activeTheme.dot) : "w-1.5 bg-foreground/20 hover:bg-foreground/40",
                  )}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            disabled={active === total - 1}
            aria-label={t("nextProject")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.04] text-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/[0.08] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>

        <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="text-foreground/70">{String(active + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-foreground/20" />
          <span>{String(total).padStart(2, "0")}</span>
          <span className="hidden sm:inline">· {t("dragHint")}</span>
        </p>
      </div>
    </div>
  );
}
