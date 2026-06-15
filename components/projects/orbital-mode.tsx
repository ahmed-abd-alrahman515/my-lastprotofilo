"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import { categoryMeta, type Project } from "@/lib/projects-data";
import { cn } from "@/lib/utils";
import { IPhoneMockup } from "@/components/system";
import { themeFor } from "./accent";
import { useIsMobile } from "./use-projects-ui";

const ANGLE_STEP = 0.42; // radians between adjacent projects on the arc

interface Geom {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  blur: number;
  z: number;
}

function geom(delta: number, radius: number, reduced: boolean): Geom {
  const a = delta * ANGLE_STEP;
  const ad = Math.abs(delta);
  return {
    // Bulge toward the viewer (left), recede to the right as |delta| grows.
    x: reduced ? delta * 40 : radius * (1 - Math.cos(a)),
    y: reduced ? delta * 120 : radius * Math.sin(a),
    scale: Math.max(0.4, 1 - ad * 0.17),
    opacity: ad > 3.3 ? 0 : Math.max(0, 1.1 - ad * 0.32),
    blur: Math.min(ad * 2.3, 9),
    z: Math.round(120 - ad * 12),
  };
}

function OrbitCard({ project, active }: { project: Project; active: boolean }) {
  const theme = themeFor(project);
  const isMobileApp = (project.category ?? "platform") === "mobile";
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[1.5rem] border bg-card/40 backdrop-blur-md transition-[border-color,box-shadow] duration-500",
        active ? cn("border-transparent", theme.border, theme.ring) : "border-foreground/12",
      )}
    >
      {isMobileApp ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.06),transparent_70%)]">
          <div className="scale-[0.6] transform-gpu">
            <IPhoneMockup src={project.image || "/placeholder.svg"} alt={project.title} chassis="graphite" />
          </div>
        </div>
      ) : (
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          sizes="440px"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex items-center gap-2 p-4 transition-opacity duration-500",
          active ? "opacity-0" : "opacity-100",
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", theme.dot)} />
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80">
          {project.title.split(/[–-]/)[0]}
        </span>
      </div>
    </div>
  );
}

function OrbitItem({
  project,
  index,
  progress,
  radius,
  reduced,
  onSelect,
  isActive,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  radius: number;
  reduced: boolean;
  onSelect: (i: number) => void;
  isActive: boolean;
}) {
  const x = useTransform(progress, (p) => geom(index - p, radius, reduced).x);
  const y = useTransform(progress, (p) => geom(index - p, radius, reduced).y);
  const scale = useTransform(progress, (p) => geom(index - p, radius, reduced).scale);
  const opacity = useTransform(progress, (p) => geom(index - p, radius, reduced).opacity);
  const filter = useTransform(progress, (p) => `blur(${geom(index - p, radius, reduced).blur}px)`);
  const zIndex = useTransform(progress, (p) => geom(index - p, radius, reduced).z);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={project.title}
      aria-current={isActive}
      className="absolute left-1/2 top-1/2 h-[12rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 sm:h-[14rem] sm:w-[22rem]"
      style={{ x, y, scale, opacity, filter, zIndex }}
    >
      <OrbitCard project={project} active={isActive} />
    </motion.button>
  );
}

function FeaturedPanel({ project, index, total }: { project: Project; index: number; total: number }) {
  const t = useTranslations("projects.labels");
  const theme = themeFor(project);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial="hidden"
        animate="show"
        exit="out"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
          out: { opacity: 0, transition: { duration: 0.2 } },
        }}
        className="flex max-w-md flex-col gap-4"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", theme.dot)} />
          {t("nowFeatured")} · {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
          <span
            className={cn(
              "inline-flex rounded-full border bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md",
              theme.border,
              theme.text,
            )}
          >
            {categoryMeta[project.category ?? "platform"].label}
          </span>
        </motion.div>

        <motion.h3
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
        >
          {project.title}
        </motion.h3>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="text-pretty text-sm leading-relaxed text-foreground/75 sm:text-base"
        >
          {project.description}
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="flex flex-wrap gap-1.5"
        >
          {project.technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-foreground/10 bg-card/50 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="pt-1">
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
    </AnimatePresence>
  );
}

function DesktopOrbital({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects.labels");
  const reduced = useReducedMotion() ?? false;
  const total = projects.length;

  const outerRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [radius, setRadius] = React.useState(360);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (!stageRef.current) return;
    const measure = () => {
      const h = stageRef.current?.clientHeight ?? 560;
      setRadius(Math.min(Math.max(h * 0.46, 280), 420));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const raw = useTransform(scrollYProgress, (v) => v * (total - 1));
  const progress = useSpring(raw, { stiffness: 70, damping: 22, mass: 0.6 });

  // Mouse parallax across the orbit field.
  const fpx = useMotionValue(0);
  const fpy = useMotionValue(0);
  const fsx = useSpring(fpx, { stiffness: 50, damping: 18, mass: 0.6 });
  const fsy = useSpring(fpy, { stiffness: 50, damping: 18, mass: 0.6 });
  const fieldX = useTransform(fsx, (v) => v * 28);
  const fieldY = useTransform(fsy, (v) => v * 22);
  const onStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    fpx.set((e.clientX - r.left) / r.width - 0.5);
    fpy.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Glowing orbit path — sampled from the same arc geometry the cards follow.
  const arcPath = React.useMemo(() => {
    const steps = 56;
    const aMax = 1.45;
    const pts: string[] = [];
    for (let k = 0; k <= steps; k++) {
      const a = -aMax + (2 * aMax * k) / steps;
      const x = radius * (1 - Math.cos(a));
      const y = radius * Math.sin(a);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return "M" + pts.join(" L");
  }, [radius]);

  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.max(0, Math.min(total - 1, Math.round(v)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const scrollToIndex = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const range = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + (total > 1 ? i / (total - 1) : 0) * range;
    window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
  };

  const activeTheme = themeFor(projects[active]);

  return (
    <div ref={outerRef} style={{ height: `${total * 70 + 60}vh` }} className="relative">
      <div
        ref={stageRef}
        onPointerMove={onStagePointerMove}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <div className="relative mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center px-6 md:grid-cols-[minmax(0,40%)_minmax(0,60%)]">
          {/* Featured text */}
          <div className="relative z-30 hidden md:flex md:items-center">
            <FeaturedPanel project={projects[active]} index={active} total={total} />
          </div>

          {/* Orbit field */}
          <motion.div
            className="relative h-full [perspective:1600px]"
            style={reduced ? undefined : { x: fieldX, y: fieldY }}
          >
            {/* glowing orbit path */}
            <svg
              aria-hidden
              width="1"
              height="1"
              className="absolute left-1/2 top-1/2 overflow-visible"
            >
              <defs>
                <linearGradient id="orbit-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(45,212,191,0)" />
                  <stop offset="50%" stopColor="rgba(52,211,153,0.55)" />
                  <stop offset="100%" stopColor="rgba(45,212,191,0)" />
                </linearGradient>
              </defs>
              {/* soft halo */}
              <path
                d={arcPath}
                fill="none"
                stroke="url(#orbit-grad)"
                strokeWidth={6}
                strokeLinecap="round"
                style={{ filter: "blur(7px)", opacity: 0.6 }}
              />
              {/* crisp line */}
              <path
                d={arcPath}
                fill="none"
                stroke="url(#orbit-grad)"
                strokeWidth={1.25}
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 4px rgba(52,211,153,0.7))" }}
              />
              {/* energy flowing along the path */}
              {!reduced && (
                <motion.path
                  d={arcPath}
                  fill="none"
                  stroke="rgba(110,231,183,0.9)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="2 220"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -222 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ filter: "drop-shadow(0 0 6px rgba(110,231,183,0.9))" }}
                />
              )}
            </svg>

            {/* gravitational anchor */}
            <motion.div
              aria-hidden
              className={cn(
                "pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]",
                activeTheme.glow,
              )}
              animate={reduced ? undefined : { scale: [1, 1.18, 1], opacity: [0.6, 0.95, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100 shadow-[0_0_24px_6px_rgba(16,185,129,0.5)]"
            />

            {projects.map((project, i) => (
              <OrbitItem
                key={project.id}
                project={project}
                index={i}
                progress={progress}
                radius={radius}
                reduced={reduced}
                onSelect={scrollToIndex}
                isActive={i === active}
              />
            ))}
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
          animate={reduced ? undefined : { y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <MousePointer2 className="h-3 w-3" />
          {t("scrollToExplore")}
        </motion.div>
      </div>
    </div>
  );
}

function MobileOrbital({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects.labels");
  return (
    <div className="relative">
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollPaddingInline: "1rem" }}
      >
        {projects.map((project, i) => {
          const theme = themeFor(project);
          const isMobileApp = (project.category ?? "platform") === "mobile";
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className={cn(
                "group relative flex w-[82vw] shrink-0 snap-center flex-col overflow-hidden rounded-[1.5rem] border bg-gradient-to-b from-white/[0.07] to-white/[0.015] backdrop-blur-xl",
                theme.border,
              )}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {isMobileApp ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.06),transparent_70%)]">
                    <div className="scale-[0.55]">
                      <IPhoneMockup src={project.image || "/placeholder.svg"} alt={project.title} chassis="graphite" />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="82vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
                <span
                  className={cn(
                    "absolute left-4 top-4 rounded-full border bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md",
                    theme.border,
                    theme.text,
                  )}
                >
                  {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-balance text-lg font-semibold leading-snug tracking-tight text-foreground">
                  {project.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-foreground/75">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-foreground/10 bg-card/50 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-foreground/5 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {t("viewFullCaseStudy")}
                  </span>
                  <ArrowUpRight className={cn("h-4 w-4", theme.text)} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function OrbitalMode({ projects }: { projects: Project[] }) {
  const isMobile = useIsMobile();
  if (projects.length === 0) return null;
  return isMobile ? <MobileOrbital projects={projects} /> : <DesktopOrbital projects={projects} />;
}
