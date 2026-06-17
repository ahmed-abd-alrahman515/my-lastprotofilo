"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import {
  Layout,
  Smartphone,
  Gauge,
  Server,
  Database,
  Plug,
  Boxes,
  Users,
  Cloud,
  FileText,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { accentRGB, type AccentKey } from "@/components/projects/accent";
import { useIsMobile } from "@/components/projects/use-projects-ui";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Node model                                                         */
/* ------------------------------------------------------------------ */

type Side = "left" | "right" | "bottom";

interface NodeDef {
  key: string;
  icon: React.ReactNode;
  accent: AccentKey;
  side: Side;
  /** position as a fraction of the stage */
  x: number;
  y: number;
}

const ICON = "h-4 w-4";

const NODES: NodeDef[] = [
  // left column
  { key: "frontend", icon: <Layout className={ICON} />, accent: "cyan", side: "left", x: 0.16, y: 0.24 },
  { key: "mobile", icon: <Smartphone className={ICON} />, accent: "violet", side: "left", x: 0.13, y: 0.5 },
  { key: "dashboard", icon: <Gauge className={ICON} />, accent: "cyan", side: "left", x: 0.16, y: 0.76 },
  // right column
  { key: "api", icon: <Server className={ICON} />, accent: "amber", side: "right", x: 0.84, y: 0.24 },
  { key: "database", icon: <Database className={ICON} />, accent: "emerald", side: "right", x: 0.87, y: 0.5 },
  { key: "integrations", icon: <Plug className={ICON} />, accent: "rose", side: "right", x: 0.84, y: 0.76 },
  // bottom row
  { key: "erp", icon: <Boxes className={ICON} />, accent: "emerald", side: "bottom", x: 0.3, y: 0.9 },
  { key: "crm", icon: <Users className={ICON} />, accent: "violet", side: "bottom", x: 0.44, y: 0.9 },
  { key: "saas", icon: <Cloud className={ICON} />, accent: "cyan", side: "bottom", x: 0.56, y: 0.9 },
  { key: "cms", icon: <FileText className={ICON} />, accent: "amber", side: "bottom", x: 0.7, y: 0.9 },
];

/* ------------------------------------------------------------------ */
/*  Ambient background (grid, particles, volumetric light, scan lines) */
/* ------------------------------------------------------------------ */

const ECO_PARTICLES = [
  { left: 8, top: 22, s: 1.6, d: 0.4, dur: 13, o: 0.3 },
  { left: 21, top: 68, s: 2.2, d: 2.6, dur: 17, o: 0.24 },
  { left: 34, top: 16, s: 1.2, d: 1.4, dur: 12, o: 0.4 },
  { left: 47, top: 80, s: 1.8, d: 4.1, dur: 19, o: 0.2 },
  { left: 63, top: 28, s: 1.4, d: 2.0, dur: 15, o: 0.34 },
  { left: 72, top: 62, s: 2.4, d: 5.2, dur: 20, o: 0.18 },
  { left: 84, top: 18, s: 1.1, d: 0.9, dur: 12, o: 0.42 },
  { left: 91, top: 74, s: 1.9, d: 3.4, dur: 18, o: 0.22 },
  { left: 15, top: 45, s: 1.3, d: 6.0, dur: 14, o: 0.36 },
  { left: 56, top: 52, s: 1.5, d: 1.1, dur: 16, o: 0.3 },
  { left: 79, top: 40, s: 2.0, d: 4.7, dur: 21, o: 0.2 },
  { left: 40, top: 36, s: 1.2, d: 2.8, dur: 13, o: 0.38 },
];

function EcosystemBackground({ reduced, isMobile }: { reduced: boolean; isMobile: boolean }) {
  const visibleParticles = isMobile ? ECO_PARTICLES.slice(0, 4) : ECO_PARTICLES;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(16,185,129,0.10),transparent_55%)]" />

      {/* volumetric blue light */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.08] blur-[120px]"
        animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-teal-500/[0.06] blur-[110px]"
        animate={reduced ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* animated grid */}
      <div className="absolute inset-0 [perspective:900px]">
        <div className="absolute inset-0 [transform:rotateX(64deg)] [transform-origin:center_60%] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(52,211,153,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,211,153,0.08)_1px,transparent_1px)] bg-[size:54px_54px]"
            animate={reduced ? undefined : { backgroundPositionY: ["0px", "54px"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* scan lines */}
      <div className="absolute inset-0 opacity-[0.5] [background:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(52,211,153,0.035)_3px,transparent_4px)]" />
      {!reduced && (
        <motion.div
          className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-emerald-300/[0.06] to-transparent"
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* particles */}
      {!reduced &&
        visibleParticles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-emerald-200/70"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.s, height: p.s, boxShadow: "0 0 8px rgba(52,211,153,0.6)" }}
            animate={{ y: [0, -50, 0], opacity: [0, p.o, 0] }}
            transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Connection (line + data-flow dot)                                  */
/* ------------------------------------------------------------------ */

function Connection({
  cx,
  cy,
  nx,
  ny,
  rgb,
  index,
  started,
  state,
  reduced,
}: {
  cx: number;
  cy: number;
  nx: number;
  ny: number;
  rgb: string;
  index: number;
  started: boolean;
  state: "idle" | "active" | "dim";
  reduced: boolean;
}) {
  const d = `M ${cx} ${cy} L ${nx} ${ny}`;
  const drawDelay = 0.1 + index * 0.05;
  const outward = index % 2 === 0;

  return (
    <g style={{ opacity: state === "dim" ? 0.25 : 1, transition: "opacity 0.3s" }}>
      {/* line */}
      <motion.path
        d={d}
        fill="none"
        stroke={`rgb(${rgb})`}
        strokeWidth={state === "active" ? 2 : 1.2}
        strokeLinecap="round"
        initial={{ pathLength: 0, strokeOpacity: 0 }}
        animate={
          started
            ? { pathLength: 1, strokeOpacity: state === "active" ? 0.85 : reduced ? 0.4 : [0.28, 0.5, 0.28] }
            : { pathLength: 0, strokeOpacity: 0 }
        }
        transition={{
          pathLength: { duration: 0.9, delay: drawDelay, ease: [0.22, 1, 0.36, 1] },
          strokeOpacity:
            state === "active" || reduced
              ? { duration: 0.3 }
              : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: drawDelay + 0.9 },
        }}
        style={{ filter: state === "active" ? `drop-shadow(0 0 5px rgb(${rgb}))` : undefined }}
      />

      {/* data-flow dot */}
      {started && !reduced && (
        <motion.circle
          r={state === "active" ? 3.4 : 2.4}
          fill={`rgb(${rgb})`}
          initial={{ opacity: 0 }}
          animate={{
            cx: outward ? [cx, nx] : [nx, cx],
            cy: outward ? [cy, ny] : [ny, cy],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: state === "active" ? 1.5 : 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: drawDelay + 1 + index * 0.12,
          }}
          style={{ filter: `drop-shadow(0 0 6px rgb(${rgb}))` }}
        />
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Node pill                                                          */
/* ------------------------------------------------------------------ */

function NodePill({
  node,
  started,
  index,
  hovered,
  onHover,
  label,
  desc,
}: {
  node: NodeDef;
  started: boolean;
  index: number;
  hovered: string | null;
  onHover: (key: string | null) => void;
  label: string;
  desc: string;
}) {
  const rgb = accentRGB[node.accent];
  const isHover = hovered === node.key;
  const dim = hovered !== null && !isHover;

  const tooltipPos =
    node.side === "left"
      ? "left-[112%] top-1/2 -translate-y-1/2"
      : node.side === "right"
        ? "right-[112%] top-1/2 -translate-y-1/2"
        : "bottom-[130%] left-1/2 -translate-x-1/2";

  return (
    <motion.div
      className="absolute z-20"
      style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%`, x: "-50%", y: "-50%" }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={started ? { opacity: dim ? 0.55 : 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.55, delay: 0.55 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => onHover(node.key)}
      onHoverEnd={() => onHover(null)}
    >
      <motion.button
        type="button"
        className="group relative flex items-center gap-2 rounded-2xl border bg-card/70 px-3.5 py-2.5 backdrop-blur-xl outline-none"
        style={{
          borderColor: `rgba(${rgb},0.35)`,
          boxShadow: isHover
            ? `0 0 0 1px rgba(${rgb},0.5), 0 18px 50px -16px rgba(${rgb},0.55)`
            : `0 8px 30px -18px rgba(${rgb},0.5)`,
        }}
        animate={{ scale: isHover ? 1.08 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        aria-label={label}
      >
        {/* glow halo */}
        <motion.span
          aria-hidden
          className="absolute -inset-3 -z-10 rounded-3xl blur-xl"
          style={{ background: `radial-gradient(circle, rgba(${rgb},0.4), transparent 70%)` }}
          animate={{ opacity: isHover ? 0.9 : 0.35 }}
          transition={{ duration: 0.3 }}
        />
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.12)` }}
        >
          {node.icon}
        </span>
        <span className="whitespace-nowrap text-[13px] font-semibold tracking-tight text-foreground">
          {label}
        </span>
      </motion.button>

      {/* description tooltip */}
      <AnimatePresence>
        {isHover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: node.side === "bottom" ? 6 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute z-30 w-48 rounded-xl border bg-card/95 p-3 text-left shadow-2xl backdrop-blur-xl",
              tooltipPos,
            )}
            style={{ borderColor: `rgba(${rgb},0.4)` }}
          >
            <p className="text-xs leading-relaxed text-foreground/80">{desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Core                                                               */
/* ------------------------------------------------------------------ */

function Core({ started, reduced, label, sub }: { started: boolean; reduced: boolean; label: string; sub: string }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={started ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* breathing aura */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl"
        animate={reduced ? undefined : { scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* expanding pulse rings */}
      {!reduced &&
        [0, 1].map((i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/40"
            animate={{ scale: [1, 2.1], opacity: [0.5, 0] }}
            transition={{ duration: 4, delay: i * 2, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

      {/* orb */}
      <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border border-emerald-300/40 bg-[radial-gradient(circle_at_50%_35%,rgba(52,211,153,0.35),rgba(10,10,10,0.9))] text-center shadow-[0_0_0_1px_rgba(52,211,153,0.25),0_30px_80px_-20px_rgba(5,150,105,0.8)] backdrop-blur-xl sm:h-40 sm:w-40">
        {!reduced && (
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full [background:conic-gradient(from_0deg,transparent,rgba(52,211,153,0.5),transparent_40%)] opacity-60"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
        )}
        <div className="relative px-3">
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-emerald-100 sm:text-[10px]">
            {label}
          </div>
          <div className="mt-1 text-[9px] tracking-wide text-emerald-200/60 sm:text-[10px]">{sub}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Diagram                                                            */
/* ------------------------------------------------------------------ */

function EcosystemDiagram() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDiagram /> : <DesktopDiagram />;
}

function MobileDiagram() {
  const t = useTranslations("home.ecosystem");
  const reduced = useReducedMotion() ?? false;
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="relative mx-auto mt-10 max-w-md">
      {/* core */}
      <div className="relative mx-auto flex justify-center">
        <Core started={inView} reduced={reduced} label={t("coreLabel")} sub={t("coreSub")} />
      </div>

      {/* vertical connecting spine */}
      <div className="relative mt-6 pl-7">
        <div className="absolute left-[0.85rem] top-0 h-full w-px bg-gradient-to-b from-emerald-300/60 via-foreground/15 to-transparent" />
        <div className="flex flex-col gap-3">
          {NODES.map((node, i) => {
            const rgb = accentRGB[node.accent];
            return (
              <motion.div
                key={node.key}
                className="relative"
                initial={{ opacity: 0, x: -18 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* node dot on the spine */}
                <span
                  className="absolute -left-[1.05rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
                  style={{ background: `rgb(${rgb})`, boxShadow: `0 0 12px rgba(${rgb},0.8)` }}
                />
                <div
                  className="flex items-start gap-3 rounded-2xl border bg-card/60 p-3.5 backdrop-blur-xl"
                  style={{ borderColor: `rgba(${rgb},0.3)` }}
                >
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.12)` }}
                  >
                    {node.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold tracking-tight text-foreground">
                      {t(`nodes.${node.key}.label`)}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/70">
                      {t(`nodes.${node.key}.desc`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DesktopDiagram() {
  const t = useTranslations("home.ecosystem");
  const reduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const stageRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.3 });
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  const [hovered, setHovered] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!stageRef.current) return;
    const measure = () => {
      const el = stageRef.current;
      if (el) setSize({ w: el.clientWidth, h: el.clientHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // pointer parallax across the whole diagram
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 45, damping: 18 });
  const sy = useSpring(py, { stiffness: 45, damping: 18 });
  const fieldX = useTransform(sx, (v) => v * 22);
  const fieldY = useTransform(sy, (v) => v * 16);
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || isMobile) return;
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const cx = size.w / 2;
  const cy = size.h / 2;
  const started = inView;

  return (
    <div
      ref={stageRef}
      onPointerMove={onPointerMove}
      className="relative mx-auto mt-12 h-[34rem] w-full max-w-5xl sm:mt-16 sm:h-[40rem]"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced || isMobile ? undefined : { x: fieldX, y: fieldY }}
        animate={reduced || isMobile ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* connections */}
        {size.w > 0 && (
          <svg className="absolute inset-0 h-full w-full overflow-visible" width={size.w} height={size.h}>
            {NODES.map((node, i) => {
              const nx = node.x * size.w;
              const ny = node.y * size.h;
              const state: "idle" | "active" | "dim" =
                hovered === null ? "idle" : hovered === node.key ? "active" : "dim";
              return (
                <Connection
                  key={node.key}
                  cx={cx}
                  cy={cy}
                  nx={nx}
                  ny={ny}
                  rgb={accentRGB[node.accent]}
                  index={i}
                  started={started}
                  state={state}
                  reduced={reduced}
                />
              );
            })}
          </svg>
        )}

        <Core started={started} reduced={reduced} label={t("coreLabel")} sub={t("coreSub")} />

        {NODES.map((node, i) => (
          <NodePill
            key={node.key}
            node={node}
            started={started}
            index={i}
            hovered={hovered}
            onHover={setHovered}
            label={t(`nodes.${node.key}.label`)}
            desc={t(`nodes.${node.key}.desc`)}
          />
        ))}
      </motion.div>

      {/* hint */}
      <motion.div
        className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        {t("hint")}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cinematic slider                                                   */
/* ------------------------------------------------------------------ */

interface SlideDef {
  key: string;
  image: string;
  accent: AccentKey;
}

const SLIDES: SlideDef[] = [
  { key: "erp", image: "/image/carnew.PNG", accent: "emerald" },
  { key: "crm", image: "/image/awladragab/image_1_1_1.PNG", accent: "violet" },
  { key: "saas", image: "/image/locate.png", accent: "cyan" },
  { key: "mobile", image: "/image/mopillll/im1.jpg", accent: "violet" },
  { key: "api", image: "/image/dashspides.PNG", accent: "amber" },
  { key: "fullstack", image: "/image/awladragab/image-2.PNG", accent: "cyan" },
];

function slideTransform(offset: number) {
  const abs = Math.abs(offset);
  const dir = Math.sign(offset);
  if (abs === 0) return { x: "0%", scale: 1, opacity: 1, blur: 0, z: 40 };
  if (abs === 1) return { x: `${dir * 56}%`, scale: 0.82, opacity: 0.55, blur: 2.5, z: 30 };
  if (abs === 2) return { x: `${dir * 96}%`, scale: 0.68, opacity: 0.22, blur: 4, z: 20 };
  return { x: `${dir * 130}%`, scale: 0.55, opacity: 0, blur: 6, z: 10 };
}

function SystemsSlider() {
  const t = useTranslations("home.systems.items");
  const te = useTranslations("home.ecosystem");
  const tp = useTranslations("projects.labels");
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = React.useState(2);
  const total = SLIDES.length;
  const isMobile = useIsMobile();

  const clamp = (i: number) => Math.max(0, Math.min(total - 1, i));
  const go = (d: number) => setActive((i) => clamp(i + d));

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 400) go(-1);
  };

  return (
    <div className="mt-28 sm:mt-36">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-200/80">
          {te("sliderEyebrow")}
        </span>
        <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {te("sliderHeading")}
        </h3>
      </div>

      <div
        className="relative mx-auto mt-12 h-[26rem] w-full select-none [perspective:2000px] sm:h-[30rem]"
        role="region"
        aria-roledescription="carousel"
      >
        <motion.div
          className="absolute inset-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          dragSnapToOrigin
          onDragEnd={onDragEnd}
          style={{ cursor: "grab" }}
          whileTap={{ cursor: "grabbing" }}
        >
          {SLIDES.map((slide, i) => {
            const offset = i - active;
            const tf = slideTransform(offset);
            const far = Math.abs(offset) > 2;
            const rgb = accentRGB[slide.accent];
            const isActive = offset === 0;
            return (
              <div
                key={slide.key}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ zIndex: tf.z }}
              >
                <motion.div
                  className={cn("pointer-events-auto w-[88%] max-w-[680px] sm:w-[74%]", isActive ? "cursor-default" : "cursor-pointer")}
                  initial={false}
                  animate={{ x: tf.x, scale: tf.scale, opacity: tf.opacity, filter: `blur(${tf.blur}px)` }}
                  transition={reduced ? { duration: 0.2 } : { type: "spring", stiffness: 240, damping: 30 }}
                  style={{ pointerEvents: far ? "none" : "auto" }}
                  onClick={() => !isActive && setActive(clamp(i))}
                  aria-hidden={!isActive}
                >
                  <div
                    className="group relative overflow-hidden rounded-[1.75rem] border bg-card/60 backdrop-blur-xl"
                    style={{
                      borderColor: isActive ? `rgba(${rgb},0.45)` : "rgba(255,255,255,0.08)",
                      boxShadow: isActive ? `0 0 0 1px rgba(${rgb},0.3), 0 50px 120px -30px rgba(${rgb},0.5)` : undefined,
                    }}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
                      <Image
                        src={slide.image}
                        alt={t(`${slide.key}.title`)}
                        fill
                        sizes="(min-width:1024px) 70vw, 90vw"
                        className={cn("object-cover transition-transform duration-[1200ms] ease-out", isActive ? "scale-100" : "scale-105")}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                      <div
                        aria-hidden
                        className="absolute -top-24 left-1/2 h-52 w-2/3 -translate-x-1/2 rounded-full blur-[80px] transition-opacity duration-700"
                        style={{ background: `rgba(${rgb},0.3)`, opacity: isActive ? 1 : 0 }}
                      />
                      {/* glass shine */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-[120%] -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[120%]" />
                    </div>

                    <div className="relative p-6 sm:p-8">
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            key={slide.key}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                          >
                            <motion.h4
                              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                              className="text-balance text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                            >
                              {t(`${slide.key}.title`)}
                            </motion.h4>
                            <motion.p
                              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                              className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-foreground/75"
                            >
                              {t(`${slide.key}.description`)}
                            </motion.p>
                            <motion.div
                              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                              className="mt-4 flex flex-wrap gap-1.5"
                            >
                              {(t.raw(`${slide.key}.tags`) as string[]).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md border px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                                  style={{ borderColor: `rgba(${rgb},0.3)`, background: `rgba(${rgb},0.06)` }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* controls */}
      <div className="mt-10 flex items-center justify-center gap-4 sm:mt-12">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label={tp("previous")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.04] transition-all hover:border-foreground/30 hover:bg-foreground/[0.08] disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        </button>
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(i)}
              aria-label={tp("goToSlide", { index: i + 1 })}
              className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-8 bg-emerald-300" : "w-1.5 bg-foreground/20 hover:bg-foreground/40")}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={active === total - 1}
          aria-label={tp("next")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.04] transition-all hover:border-foreground/30 hover:bg-foreground/[0.08] disabled:opacity-30"
        >
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </button>
      </div>
      {isMobile && (
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */

export function SystemsEcosystem() {
  const reduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  return (
    <div className="relative">
      <EcosystemBackground reduced={reduced} isMobile={isMobile} />
      <EcosystemDiagram />
      <SystemsSlider />
    </div>
  );
}
