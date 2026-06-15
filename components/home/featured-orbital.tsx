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
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { categoryMeta, type Project } from "@/lib/projects-data";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, Heading, Lead, Reveal, Magnetic, IPhoneMockup } from "@/components/system";
import { Button } from "@/components/ui/button";
import { themeFor } from "@/components/projects/accent";
import { useIsMobile } from "@/components/projects/use-projects-ui";

const ANGLE_STEP = 0.5; // radians between adjacent projects on the arc
const AUTO_MS = 4600; // auto-rotation cadence

interface Geom {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  blur: number;
  z: number;
  rotateY: number;
}

/** Position a card on a circular arc relative to the current progress. */
function geom(delta: number, radius: number, reduced: boolean): Geom {
  const a = delta * ANGLE_STEP;
  const ad = Math.abs(delta);
  return {
    x: reduced ? delta * 40 : radius * (1 - Math.cos(a)),
    y: reduced ? delta * 120 : radius * Math.sin(a),
    scale: Math.max(0.4, 1 - ad * 0.15),
    opacity: ad > 3.4 ? 0 : Math.max(0, 1.14 - ad * 0.32),
    blur: Math.min(ad * 2.1, 9),
    z: Math.round(160 - ad * 14),
    // True 3D tilt — cards rotate toward the centre as they sweep the arc.
    rotateY: reduced ? 0 : Math.max(-46, Math.min(46, -delta * 17)),
  };
}

function OrbitCard({
  project,
  active,
  reduced,
}: {
  project: Project;
  active: boolean;
  reduced: boolean;
}) {
  const theme = themeFor(project);
  const isMobileApp = (project.category ?? "platform") === "mobile";

  // Magnetic hover — soft pull toward the cursor while hovering this card.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 16, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 200, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !active) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 28);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 28);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduced ? undefined : { x: sx, y: sy }}
      className={cn(
        "group/card relative h-full w-full overflow-hidden rounded-[1.6rem] border bg-card/40 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-500",
        active
          ? cn("border-transparent shadow-[0_30px_90px_-30px_var(--glow-emerald)]", theme.border, theme.ring)
          : "border-foreground/12",
      )}
    >
      {isMobileApp ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.06),transparent_70%)]">
          <div className="scale-[0.62] transform-gpu">
            <IPhoneMockup src={project.image || "/placeholder.svg"} alt={project.title} chassis="graphite" />
          </div>
        </div>
      ) : (
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          sizes="520px"
          className="object-cover transition-transform duration-700 group-hover/card:scale-[1.06]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/88 via-background/20 to-transparent" />

      {/* Spotlight glow — only on the active card. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700",
          active && "opacity-100",
        )}
        style={{
          background: `radial-gradient(circle at 50% 35%, rgba(${theme.rgb},0.24), transparent 65%)`,
        }}
      />

      {/* Compact label (inactive cards) */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex items-center gap-2 p-4 transition-opacity duration-500",
          active ? "opacity-0" : "opacity-100 group-hover/card:opacity-0",
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", theme.dot)} />
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80">
          {project.title.split(/[–-]/)[0]}
        </span>
      </div>

      {/* Hover reveal — title + technology badges slide up on hover. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
        <div className="rounded-2xl border border-primary/20 bg-background/70 p-3.5 backdrop-blur-xl">
          <p className="truncate text-sm font-semibold tracking-tight text-foreground">
            {project.title.split(/[–-]/)[0]}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
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
  const rotateY = useTransform(progress, (p) => geom(index - p, radius, reduced).rotateY);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={project.title}
      aria-current={isActive}
      className="absolute left-1/2 top-1/2 h-[14rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] sm:h-[16rem] sm:w-[25rem]"
      style={{ x, y, scale, opacity, filter, zIndex, rotateY }}
    >
      {/* Idle floating motion (independent of the orbit transform). */}
      <motion.div
        className="h-full w-full"
        animate={reduced ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 6 + (index % 4), repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
      >
        <OrbitCard project={project} active={isActive} reduced={reduced} />
      </motion.div>
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
  const reduced = useReducedMotion() ?? false;
  const total = projects.length;

  const stageRef = React.useRef<HTMLDivElement>(null);
  const [radius, setRadius] = React.useState(380);
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Defer motion-driven markup until after hydration so the first client render
  // matches the server.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Animated progress travels smoothly toward the active index (camera feel).
  const target = useMotionValue(0);
  const progress = useSpring(target, { stiffness: 55, damping: 18, mass: 0.9 });

  React.useEffect(() => {
    target.set(active);
  }, [active, target]);

  // ── Drag / wheel inertia scrubbing ───────────────────────────────────────
  // Dragging scrubs `target` fractionally; releasing settles to the nearest
  // card. A movement threshold prevents drags from firing a card's click.
  const drag = React.useRef({ active: false, startX: 0, startTarget: 0, moved: false });
  const draggedRef = React.useRef(false);
  const wheelLock = React.useRef(false);

  const clampIdx = (i: number) => Math.max(0, Math.min(total - 1, i));

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    drag.current = { active: true, startX: e.clientX, startTarget: target.get(), moved: false };
    draggedRef.current = false;
  };
  const onPointerMoveStage = (e: React.PointerEvent<HTMLDivElement>) => {
    handleParallax(e);
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) {
      drag.current.moved = true;
      draggedRef.current = true;
    }
    // ~220px of drag == one card step.
    const next = drag.current.startTarget - dx / 220;
    target.set(Math.max(-0.5, Math.min(total - 0.5, next)));
  };
  const endDrag = () => {
    if (drag.current.active && drag.current.moved) {
      const settled = clampIdx(Math.round(target.get()));
      setActive(settled);
      target.set(settled); // spring eases in → inertia settle
    }
    drag.current.active = false;
    // Release the click-suppression flag on the next tick.
    window.setTimeout(() => (draggedRef.current = false), 40);
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (reduced || wheelLock.current) return;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(d) < 8) return;
    wheelLock.current = true;
    setActive((p) => clampIdx(p + (d > 0 ? 1 : -1)));
    window.setTimeout(() => (wheelLock.current = false), 320);
  };

  const handleSelect = (i: number) => {
    if (draggedRef.current) return;
    setActive(i);
  };

  // Auto-rotation — pauses on hover/drag and respects reduced motion.
  React.useEffect(() => {
    if (reduced || paused || total <= 1) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, total]);

  React.useEffect(() => {
    if (!stageRef.current) return;
    const measure = () => {
      const h = stageRef.current?.clientHeight ?? 600;
      setRadius(Math.min(Math.max(h * 0.48, 300), 460));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // Mouse parallax across the orbit field (depth).
  const fpx = useMotionValue(0);
  const fpy = useMotionValue(0);
  const fsx = useSpring(fpx, { stiffness: 50, damping: 18, mass: 0.6 });
  const fsy = useSpring(fpy, { stiffness: 50, damping: 18, mass: 0.6 });
  const fieldX = useTransform(fsx, (v) => v * 36);
  const fieldY = useTransform(fsy, (v) => v * 28);
  const fieldRotateX = useTransform(fsy, (v) => v * -6);
  const handleParallax = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    fpx.set((e.clientX - r.left) / r.width - 0.5);
    fpy.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Glowing orbit path — sampled from the same arc geometry the cards follow.
  const arcPath = React.useMemo(() => {
    const steps = 56;
    const aMax = 1.6;
    const pts: string[] = [];
    for (let k = 0; k <= steps; k++) {
      const a = -aMax + (2 * aMax * k) / steps;
      const x = radius * (1 - Math.cos(a));
      const y = radius * Math.sin(a);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return "M" + pts.join(" L");
  }, [radius]);

  const activeTheme = themeFor(projects[active]);

  return (
    <div
      ref={stageRef}
      onPointerMove={onPointerMoveStage}
      onPointerDown={onPointerDown}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        endDrag();
      }}
      className="relative grid h-[38rem] cursor-grab grid-cols-1 items-center select-none active:cursor-grabbing md:grid-cols-[minmax(0,38%)_minmax(0,62%)] lg:h-[42rem]"
    >
      {/* Featured text */}
      <div className="relative z-30 hidden md:flex md:items-center">
        <FeaturedPanel project={projects[active]} index={active} total={total} />
      </div>

      {/* Orbit field */}
      <motion.div
        className="relative h-full [perspective:1800px] [transform-style:preserve-3d]"
        style={mounted && !reduced ? { x: fieldX, y: fieldY, rotateX: fieldRotateX } : undefined}
      >
        <svg aria-hidden width="1" height="1" className="absolute left-1/2 top-1/2 overflow-visible">
          <defs>
            <linearGradient id="home-orbit-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(45,212,191,0)" />
              <stop offset="50%" stopColor="rgba(52,211,153,0.55)" />
              <stop offset="100%" stopColor="rgba(45,212,191,0)" />
            </linearGradient>
          </defs>
          <path
            d={arcPath}
            fill="none"
            stroke="url(#home-orbit-grad)"
            strokeWidth={6}
            strokeLinecap="round"
            style={{ filter: "blur(7px)", opacity: 0.6 }}
          />
          <path
            d={arcPath}
            fill="none"
            stroke="url(#home-orbit-grad)"
            strokeWidth={1.25}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 4px rgba(52,211,153,0.7))" }}
          />
          {mounted && !reduced && (
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
            "pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]",
            activeTheme.glow,
          )}
          animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100 shadow-[0_0_24px_6px_rgba(16,185,129,0.5)]"
        />

        {mounted &&
          projects.map((project, i) => (
            <OrbitItem
              key={project.id}
              project={project}
              index={i}
              progress={progress}
              radius={radius}
              reduced={reduced}
              onSelect={handleSelect}
              isActive={i === active}
            />
          ))}
      </motion.div>

      {/* progress dots */}
      <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 md:left-auto md:right-6 md:translate-x-0">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${p.title}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === active ? "w-6 bg-primary shadow-[0_0_12px_var(--glow-emerald)]" : "w-1.5 bg-foreground/25 hover:bg-foreground/50",
            )}
          />
        ))}
      </div>

      {/* drag hint */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 z-30 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 md:left-6 md:translate-x-0">
        drag · scroll
      </div>
    </div>
  );
}

function MobileOrbital({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects.labels");
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = React.useState(0);
  const [vw, setVw] = React.useState(0);

  React.useEffect(() => {
    setVw(window.innerWidth);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Coverflow: each card rotates/scales by its distance from the viewport centre.
  const onScroll = () => {
    if (trackRef.current) setScrollX(trackRef.current.scrollLeft);
  };

  return (
    <div
      ref={trackRef}
      onScroll={onScroll}
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[12vw] pb-8 pt-4 [perspective:1200px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {projects.map((project, i) => {
        const theme = themeFor(project);
        const isMobileApp = (project.category ?? "platform") === "mobile";
        // Card centre vs viewport centre (cards are ~76vw + 4vw gap apart).
        const cardW = vw * 0.76 + 16;
        const cardCentre = i * cardW + cardW / 2 + vw * 0.12;
        const dist = vw ? (cardCentre - scrollX - vw / 2) / vw : 0;
        const clamped = Math.max(-1.2, Math.min(1.2, dist));
        const rotateY = clamped * -22;
        const scale = 1 - Math.min(Math.abs(clamped) * 0.14, 0.22);
        const opacity = 1 - Math.min(Math.abs(clamped) * 0.4, 0.55);

        return (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            style={{
              transform: `perspective(1200px) rotateY(${rotateY}deg) scale(${scale})`,
              opacity,
            }}
            className={cn(
              "group relative flex w-[76vw] shrink-0 snap-center flex-col overflow-hidden rounded-[1.5rem] border bg-gradient-to-b from-white/[0.07] to-white/[0.015] backdrop-blur-xl transition-[opacity,transform] duration-200 will-change-transform",
              theme.border,
            )}
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden">
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
                  sizes="76vw"
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
              <p className="line-clamp-2 text-sm leading-relaxed text-foreground/75">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary"
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
  );
}

export function FeaturedOrbital({ projects }: { projects: Project[] }) {
  const t = useTranslations("home.work");
  const tA = useTranslations("actions");
  const isMobile = useIsMobile();

  if (projects.length === 0) return null;

  return (
    <section id="work" className="relative isolate overflow-x-clip py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">{t("eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading as="h2" size="md" className="mt-4">
              {t("heading")}
            </Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <Lead className="mx-auto mt-5 text-center">{t("lead")}</Lead>
          </Reveal>
        </div>
      </Container>

      <Reveal delay={0.1} className="mt-14">
        {isMobile ? (
          <MobileOrbital projects={projects} />
        ) : (
          <Container size="xl">
            <DesktopOrbital projects={projects} />
          </Container>
        )}
      </Reveal>

      <div className="mt-12 flex justify-center sm:mt-16">
        <Magnetic>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-border/60 bg-card/40 px-7 backdrop-blur-md hover:bg-card/70"
          >
            <Link href="/projects">
              {tA("viewAllProjects")}
              <ArrowUpRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </Magnetic>
      </div>
    </section>
  );
}
