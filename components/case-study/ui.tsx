"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useInView,
  type Variants,
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@/i18n/navigation";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpRight,
  Maximize2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type Project } from "@/lib/projects-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ───────────────────────── Reveal / motion ───────────────────────── */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  x = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/* ───────────────────────── Sticky scroll-spy nav ───────────────────────── */

export type NavItem = { id: string; label: string };

export function CaseStudyNav({
  items,
  ariaLabel,
}: {
  items: NavItem[];
  ariaLabel: string;
}) {
  const [active, setActive] = React.useState(items[0]?.id);

  React.useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  const onJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label={ariaLabel}
      className="sticky top-3 z-30 mx-auto mt-2 hidden max-w-fit md:block"
    >
      <ul className="flex items-center gap-1 rounded-full border border-foreground/10 bg-card/70 p-1.5 backdrop-blur-xl">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => onJump(e, item.id)}
                className={cn(
                  "relative inline-flex items-center rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300",
                  isActive
                    ? "text-background"
                    : "text-foreground/65 hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="cs-nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-emerald-300"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ───────────────────────── Section primitives ───────────────────────── */

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-6 backdrop-blur-xl transition-all duration-500 hover:border-foreground/15 hover:bg-foreground/[0.06] sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionShell({
  id,
  index,
  eyebrow,
  title,
  icon: Icon,
  children,
  className,
}: {
  id?: string;
  index: string;
  eyebrow: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-12 sm:py-16", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200/20 bg-emerald-200/[0.06] text-emerald-200/85">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
                <span>{index}</span>
                <span className="h-px w-6 bg-gradient-to-r from-emerald-200/60 to-transparent" />
                <span className="text-muted-foreground">{eyebrow}</span>
              </div>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h2>
            </div>
          </div>
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/* ───────────────────────── Browser frame w/ parallax tilt ───────────────────────── */

export function BrowserFrame({
  src,
  alt,
  label,
  priority,
  className,
  tilt = true,
}: {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  className?: string;
  tilt?: boolean;
}) {
  const reduced = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const enabled = tilt && !reduced;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 12);
    rx.set(py * -10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className={cn("group relative [perspective:1600px]", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-emerald-400/20 via-emerald-300/12 to-teal-400/20 blur-2xl transition-opacity duration-700 group-hover:opacity-90"
      />
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-soft-image"
      >
        <div className="flex h-9 items-center gap-1.5 border-b border-foreground/5 bg-foreground/[0.03] px-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          {label && (
            <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {label}
            </span>
          )}
        </div>
        <div className="relative aspect-video">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

/* ───────────────────────── Screenshot showcase + lightbox ───────────────────────── */

export type Shot = { src: string; title?: string; description?: string };

export function ScreenshotShowcase({
  shots,
  expandLabel,
  closeLabel,
}: {
  shots: Shot[];
  expandLabel: string;
  closeLabel: string;
}) {
  const t = useTranslations("projects.labels");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: shots.length > 1,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = React.useState(0);
  const [lightbox, setLightbox] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? i : (i + 1) % shots.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i === null ? i : (i - 1 + shots.length) % shots.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, shots.length]);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-tr from-emerald-400/12 via-emerald-300/8 to-teal-400/12 blur-3xl"
      />
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {shots.map((s, i) => {
            const isActive = i === selected;
            return (
              <div
                key={i}
                className="min-w-0 flex-[0_0_100%] px-1 sm:px-2"
              >
                <div
                  className={cn(
                    "group/shot overflow-hidden rounded-2xl border bg-card shadow-soft-image transition-all duration-300",
                    isActive
                      ? "border-emerald-200/20"
                      : "border-foreground/10",
                  )}
                >
                  <div className="flex h-9 items-center gap-1.5 border-b border-foreground/5 bg-foreground/[0.03] px-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                    {s.title && (
                      <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {s.title}
                      </span>
                    )}
                  </div>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={s.src || "/placeholder.svg"}
                      alt={s.title ?? "Screenshot"}
                      fill
                      sizes="(min-width:1024px) 900px, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/shot:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
                    {isActive && (
                      <button
                        type="button"
                        onClick={() => setLightbox(i)}
                        aria-label={expandLabel}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-background/60 text-foreground opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/shot:opacity-100"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {(s.title || s.description) && (
                    <div className="border-t border-foreground/5 bg-card/60 px-5 py-4">
                      {s.title && (
                        <div className="text-sm font-semibold text-foreground">
                          {s.title}
                        </div>
                      )}
                      {s.description && (
                        <p className="mt-1 text-sm leading-relaxed text-foreground/75">
                          {s.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {shots.length > 1 && (
        <>
          <button
            type="button"
            aria-label={t("previous")}
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-2 top-[38%] z-10 -translate-y-1/2 rounded-full border border-foreground/10 bg-card/80 p-2 text-foreground backdrop-blur-md transition hover:border-emerald-200/40 hover:bg-muted sm:left-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={t("next")}
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-2 top-[38%] z-10 -translate-y-1/2 rounded-full border border-foreground/10 bg-card/80 p-2 text-foreground backdrop-blur-md transition hover:border-emerald-200/40 hover:bg-muted sm:right-4"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {shots.map((s, i) => {
              const activeThumb = i === selected;
              return (
                <button
                  key={`thumb-${i}`}
                  type="button"
                  aria-label={t("goToSlide", { index: i + 1 })}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "group/thumb relative overflow-hidden rounded-xl border bg-card/60 text-left transition-all duration-300",
                    activeThumb
                      ? "border-emerald-300/50 ring-1 ring-emerald-300/35"
                      : "border-foreground/10 hover:border-foreground/20",
                  )}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={s.src || "/placeholder.svg"}
                      alt={s.title ?? `Screenshot ${i + 1}`}
                      fill
                      sizes="240px"
                      className={cn(
                        "object-cover transition-all duration-300",
                        activeThumb ? "scale-100 opacity-100" : "scale-[1.02] opacity-75 group-hover/thumb:opacity-95",
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  </div>
                  {s.title && (
                    <div className="absolute inset-x-0 bottom-0 px-2 py-1.5">
                      <div className="line-clamp-1 text-[11px] font-medium text-foreground/90">
                        {s.title}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {shots.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={t("goToSlide", { index: i + 1 })}
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
        </>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label={closeLabel}
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-card/70 text-foreground backdrop-blur-md transition hover:border-emerald-200/40"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-soft-image"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={shots[lightbox].src || "/placeholder.svg"}
                  alt={shots[lightbox].title ?? "Screenshot"}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              {(shots[lightbox].title || shots[lightbox].description) && (
                <div className="border-t border-foreground/5 bg-card/70 px-5 py-4">
                  {shots[lightbox].title && (
                    <div className="text-sm font-semibold text-foreground">
                      {shots[lightbox].title}
                    </div>
                  )}
                  {shots[lightbox].description && (
                    <p className="mt-1 text-sm leading-relaxed text-foreground/75">
                      {shots[lightbox].description}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── Architecture flow diagram ───────────────────────── */

export function ArchitectureFlow({
  nodes,
  flowLabel,
}: {
  nodes: { name: string; description?: string }[];
  flowLabel: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div className="relative">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
        {flowLabel}
      </div>
      <Stagger className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
        {nodes.map((node, i) => (
          <React.Fragment key={node.name}>
            <StaggerItem className="flex-1">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-foreground/10 bg-card/50 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-200/35 hover:bg-card/70">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-400/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-300/10 font-mono text-[11px] text-emerald-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
                <div className="mt-3 text-base font-semibold text-foreground">
                  {node.name}
                </div>
                {node.description && (
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {node.description}
                  </p>
                )}
              </div>
            </StaggerItem>

            {i < nodes.length - 1 && (
              <div
                aria-hidden
                className="relative flex shrink-0 items-center justify-center self-stretch py-1 lg:w-10 lg:py-0"
              >
                {/* vertical line on mobile, horizontal on lg — pulses to suggest data flow */}
                <motion.span
                  className="block h-6 w-px bg-gradient-to-b from-emerald-300/60 via-emerald-300/30 to-transparent lg:h-px lg:w-full lg:bg-gradient-to-r"
                  animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.35,
                  }}
                />
                <ChevronRight className="absolute hidden h-4 w-4 text-emerald-300/70 lg:block" />
              </div>
            )}
          </React.Fragment>
        ))}
      </Stagger>
    </div>
  );
}

/* ───────────────────────── Problem / Solution split ───────────────────────── */

export function ProblemSolution({
  problem,
  solution,
}: {
  problem: {
    id?: string;
    badge: string;
    title: string;
    body: string;
    index: string;
  };
  solution: {
    id?: string;
    badge: string;
    title: string;
    body: string;
    index: string;
  };
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Reveal x={-26} y={0}>
        <div
          id={problem.id}
          className="group relative h-full scroll-mt-24 overflow-hidden rounded-2xl border border-rose-400/15 bg-gradient-to-b from-rose-500/[0.06] to-transparent p-6 backdrop-blur-xl sm:p-8"
        >
          <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose-500/15 blur-3xl" />
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-rose-300/90">
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-rose-400/30 bg-rose-400/10">
              {problem.index}
            </span>
            {problem.badge}
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-foreground">
            {problem.title}
          </h3>
          <p className="mt-4 leading-relaxed text-foreground/80">{problem.body}</p>
        </div>
      </Reveal>

      <Reveal x={26} y={0} delay={0.08}>
        <div
          id={solution.id}
          className="group relative h-full scroll-mt-24 overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-b from-emerald-500/[0.07] to-transparent p-6 backdrop-blur-xl sm:p-8"
        >
          <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/90">
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-emerald-400/30 bg-emerald-400/10">
              {solution.index}
            </span>
            {solution.badge}
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-foreground">
            {solution.title}
          </h3>
          <p className="mt-4 leading-relaxed text-foreground/80">
            {solution.body}
          </p>
        </div>
      </Reveal>
    </div>
  );
}

/* ───────────────────────── Tech stack groups ───────────────────────── */

export function TechStackGroups({
  groups,
}: {
  groups: { label: string; items: string[] }[];
}) {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g) => (
        <StaggerItem key={g.label}>
          <Panel className="h-full">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
              {g.label}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="cursor-default rounded-md border border-foreground/10 bg-card/35 px-2.5 py-1 text-sm text-foreground/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200/40 hover:bg-emerald-300/10 hover:text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </Panel>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ───────────────────────── Challenge cards ───────────────────────── */

export function ChallengeCards({
  items,
  challengeLabel,
  resolutionLabel,
  impactLabel,
}: {
  items: { problem: string; resolution: string }[];
  challengeLabel: string;
  resolutionLabel: string;
  impactLabel: string;
}) {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2">
      {items.map((c, i) => (
        <StaggerItem key={i}>
          <Panel className="relative h-full overflow-hidden">
            <span className="absolute right-4 top-4 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-200/90">
              {impactLabel}
            </span>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-rose-300/85">
              {challengeLabel} {String(i + 1).padStart(2, "0")}
            </div>
            <p className="mt-3 leading-relaxed text-foreground/90">{c.problem}</p>
            <div className="mt-5 border-t border-foreground/5 pt-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/85">
                <ArrowRight className="h-3 w-3" />
                {resolutionLabel}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                {c.resolution}
              </p>
            </div>
          </Panel>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ───────────────────────── Animated metric counters ───────────────────────── */

function AnimatedValue({ value }: { value: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const match = value.match(/^(\D*)([\d][\d,.]*)(.*)$/);
  const [display, setDisplay] = React.useState(
    match && !reduced ? `${match[1]}0${match[3]}` : value,
  );

  React.useEffect(() => {
    if (!match || reduced || !inView) {
      setDisplay(value);
      return;
    }
    const prefix = match[1];
    const raw = match[2];
    const suffix = match[3];
    const target = parseFloat(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const start = performance.now();
    const duration = 1200;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, match, reduced, value]);

  return (
    <div ref={ref} className="text-3xl font-bold text-foreground sm:text-4xl">
      {display}
    </div>
  );
}

export function ResultMetrics({
  outcomes,
}: {
  outcomes: { label: string; value: string }[];
}) {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {outcomes.map((o) => (
        <StaggerItem key={o.label}>
          <div className="group relative h-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-6 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-emerald-200/30">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-emerald-400/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="relative">
              <AnimatedValue value={o.value} />
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {o.label}
              </div>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ───────────────────────── Related projects slider ───────────────────────── */

export function RelatedSlider({
  related,
  ctaLabel,
}: {
  related: Project[];
  ctaLabel: string;
}) {
  const t = useTranslations("projects.labels");
  const tLabels = useTranslations("projects.labels");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: related.length > 3,
    containScroll: "trimSnaps",
  });

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 px-1 py-2">
          {related.map((r) => (
            <div
              key={r.id}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_31.5%]"
            >
              <Link
                href={`/projects/${r.id}`}
                className="group block h-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-200/30 hover:shadow-[0_40px_120px_-30px_rgba(16,185,129,0.4)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={r.image || "/placeholder.svg"}
                    alt={r.title}
                    fill
                    sizes="(min-width:1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                  <div className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-foreground/20 bg-background/60 text-foreground opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
                    {tLabels(r.category ?? "platform")}
                  </div>
                  <div className="mt-2 line-clamp-1 text-base font-semibold text-foreground">
                    {r.title}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/70">
                    {r.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 transition-colors group-hover:text-emerald-200">
                    {ctaLabel}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {related.length > 3 && (
        <>
          <button
            type="button"
            aria-label={t("previous")}
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute -left-2 top-1/3 z-10 hidden -translate-y-1/2 rounded-full border border-foreground/10 bg-card/70 p-2 text-foreground backdrop-blur-md transition hover:border-emerald-200/40 hover:bg-muted sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={t("next")}
            onClick={() => emblaApi?.scrollNext()}
            className="absolute -right-2 top-1/3 z-10 hidden -translate-y-1/2 rounded-full border border-foreground/10 bg-card/70 p-2 text-foreground backdrop-blur-md transition hover:border-emerald-200/40 hover:bg-muted sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
