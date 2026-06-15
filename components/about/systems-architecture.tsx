"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Database, LayoutDashboard, Plug, Server, Smartphone, type LucideIcon } from "lucide-react";

import { Container, Eyebrow, Heading, Lead, Reveal } from "@/components/system";
import { cn } from "@/lib/utils";

interface NodeDef {
  key: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  rgb: string;
  x: number;
  y: number;
  side: "left" | "right";
}

const HUB = { x: 0.5, y: 0.5, rgb: "103, 232, 249" };

const NODES: NodeDef[] = [
  { key: "mobile", label: "Mobile App", desc: "Customer, rep & admin apps consume the same API over HTTPS.", icon: Smartphone, rgb: "196, 181, 253", x: 0.13, y: 0.26, side: "left" },
  { key: "dashboard", label: "Dashboard", desc: "React/Next.js admin panel for operations, content & analytics.", icon: LayoutDashboard, rgb: "125, 211, 252", x: 0.13, y: 0.74, side: "left" },
  { key: "database", label: "Database", desc: "MySQL — normalized schemas, indexes & transactional integrity.", icon: Database, rgb: "110, 231, 183", x: 0.87, y: 0.26, side: "right" },
  { key: "thirdparty", label: "Third-party Services", desc: "Payments, push (FCM), storage & messaging integrations.", icon: Plug, rgb: "252, 211, 77", x: 0.87, y: 0.74, side: "right" },
];

function Connection({
  ax, ay, bx, by, rgb, index, started, state, reduced, toHub,
}: {
  ax: number; ay: number; bx: number; by: number; rgb: string;
  index: number; started: boolean; state: "idle" | "active" | "dim"; reduced: boolean; toHub: boolean;
}) {
  const d = `M ${ax} ${ay} L ${bx} ${by}`;
  const delay = 0.1 + index * 0.08;
  return (
    <g style={{ opacity: state === "dim" ? 0.22 : 1, transition: "opacity 0.3s" }}>
      <motion.path
        d={d}
        fill="none"
        stroke={`rgb(${rgb})`}
        strokeWidth={state === "active" ? 2.2 : 1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0, strokeOpacity: 0 }}
        animate={started ? { pathLength: 1, strokeOpacity: state === "active" ? 0.9 : reduced ? 0.4 : [0.3, 0.55, 0.3] } : { pathLength: 0, strokeOpacity: 0 }}
        transition={{
          pathLength: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
          strokeOpacity: state === "active" || reduced ? { duration: 0.3 } : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay + 0.9 },
        }}
        style={{ filter: state === "active" ? `drop-shadow(0 0 5px rgb(${rgb}))` : undefined }}
      />
      {started && !reduced && (
        <motion.circle
          r={state === "active" ? 3.6 : 2.6}
          fill={`rgb(${rgb})`}
          initial={{ opacity: 0 }}
          animate={{
            // clients flow INTO hub; hub flows OUT to data services
            cx: toHub ? [ax, bx] : [ax, bx],
            cy: toHub ? [ay, by] : [ay, by],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: state === "active" ? 1.4 : 2.4, repeat: Infinity, ease: "easeInOut", delay: delay + 1 + index * 0.15 }}
          style={{ filter: `drop-shadow(0 0 6px rgb(${rgb}))` }}
        />
      )}
    </g>
  );
}

function NodePill({
  node, started, index, hovered, onHover,
}: {
  node: NodeDef; started: boolean; index: number; hovered: string | null; onHover: (k: string | null) => void;
}) {
  const Icon = node.icon;
  const isHover = hovered === node.key;
  const dim = hovered !== null && !isHover;
  const tipPos = node.side === "left" ? "left-[112%] top-1/2 -translate-y-1/2" : "right-[112%] top-1/2 -translate-y-1/2";

  return (
    <motion.div
      className="absolute z-20"
      style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%`, x: "-50%", y: "-50%" }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={started ? { opacity: dim ? 0.5 : 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.55, delay: 0.5 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => onHover(node.key)}
      onHoverEnd={() => onHover(null)}
    >
      <motion.button
        type="button"
        className="group relative flex items-center gap-2.5 rounded-2xl border bg-card/75 px-4 py-3 backdrop-blur-xl outline-none"
        style={{
          borderColor: `rgba(${node.rgb},0.35)`,
          boxShadow: isHover ? `0 0 0 1px rgba(${node.rgb},0.5), 0 20px 54px -16px rgba(${node.rgb},0.6)` : `0 10px 34px -18px rgba(${node.rgb},0.5)`,
        }}
        animate={{ scale: isHover ? 1.08 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        aria-label={node.label}
      >
        <span aria-hidden className="absolute -inset-3 -z-10 rounded-3xl blur-xl transition-opacity duration-300" style={{ background: `radial-gradient(circle, rgba(${node.rgb},0.4), transparent 70%)`, opacity: isHover ? 0.9 : 0.3 }} />
        <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ color: `rgb(${node.rgb})`, background: `rgba(${node.rgb},0.12)` }}>
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-foreground">{node.label}</span>
      </motion.button>

      <AnimatePresence>
        {isHover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn("absolute z-30 w-52 rounded-xl border bg-card/95 p-3 text-left shadow-2xl backdrop-blur-xl", tipPos)}
            style={{ borderColor: `rgba(${node.rgb},0.4)` }}
          >
            <p className="text-xs leading-relaxed text-foreground/80">{node.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DesktopArchitecture() {
  const reduced = useReducedMotion() ?? false;
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

  // pointer parallax
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 45, damping: 18 });
  const sy = useSpring(py, { stiffness: 45, damping: 18 });
  const fieldX = useTransform(sx, (v) => v * 18);
  const fieldY = useTransform(sy, (v) => v * 14);
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const hubX = HUB.x * size.w;
  const hubY = HUB.y * size.h;

  return (
    <div ref={stageRef} onPointerMove={onMove} className="relative mx-auto mt-14 hidden h-[30rem] w-full max-w-4xl md:block">
      <motion.div className="absolute inset-0" style={reduced ? undefined : { x: fieldX, y: fieldY }}>
        {size.w > 0 && (
          <svg className="absolute inset-0 h-full w-full overflow-visible" width={size.w} height={size.h}>
            {NODES.map((node, i) => {
              const nx = node.x * size.w;
              const ny = node.y * size.h;
              const state: "idle" | "active" | "dim" = hovered === null ? "idle" : hovered === node.key ? "active" : "dim";
              const toHub = node.side === "left";
              return (
                <Connection
                  key={node.key}
                  ax={toHub ? nx : hubX}
                  ay={toHub ? ny : hubY}
                  bx={toHub ? hubX : nx}
                  by={toHub ? hubY : ny}
                  rgb={node.rgb}
                  index={i}
                  started={inView}
                  state={state}
                  reduced={reduced}
                  toHub={toHub}
                />
              );
            })}
          </svg>
        )}

        {/* hub — REST API */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl"
            animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {!reduced && [0, 1].map((i) => (
            <motion.div
              key={i}
              aria-hidden
              className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/40"
              animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
              transition={{ duration: 4, delay: i * 2, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
          <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-3xl border border-emerald-300/40 bg-[radial-gradient(circle_at_50%_35%,rgba(52,211,153,0.3),rgba(10,10,10,0.92))] text-center shadow-[0_0_0_1px_rgba(52,211,153,0.25),0_30px_80px_-20px_rgba(5,150,105,0.8)] backdrop-blur-xl">
            <Server className="h-6 w-6 text-emerald-200" aria-hidden />
            <p className="mt-1.5 text-xs font-bold tracking-tight text-emerald-50">REST API</p>
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-emerald-200/60">Laravel core</p>
          </div>
        </motion.div>

        {NODES.map((node, i) => (
          <NodePill key={node.key} node={node} started={inView} index={i} hovered={hovered} onHover={setHovered} />
        ))}
      </motion.div>

      <motion.p
        className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        hover a node to inspect the layer
      </motion.p>
    </div>
  );
}

function MobileArchitecture() {
  const reduced = useReducedMotion() ?? false;
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const order = [NODES[0], NODES[1], { key: "api", label: "REST API", desc: "Laravel core that powers every client and orchestrates data.", icon: Server, rgb: HUB.rgb } as Omit<NodeDef, "x" | "y" | "side">, NODES[2], NODES[3]];

  return (
    <div ref={ref} className="mt-10 md:hidden">
      <div className="relative pl-7">
        <div className="absolute left-[0.85rem] top-0 h-full w-px bg-gradient-to-b from-teal-300/60 via-emerald-300/40 to-emerald-300/50" />
        <div className="flex flex-col gap-3">
          {order.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.key}
                className="relative"
                initial={reduced ? false : { opacity: 0, x: -18 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="absolute -left-[1.05rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full" style={{ background: `rgb(${node.rgb})`, boxShadow: `0 0 12px rgba(${node.rgb},0.8)` }} />
                <div className="flex items-start gap-3 rounded-2xl border bg-card/60 p-3.5 backdrop-blur-xl" style={{ borderColor: `rgba(${node.rgb},0.3)` }}>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ color: `rgb(${node.rgb})`, background: `rgba(${node.rgb},0.12)` }}>
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-foreground">{node.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/70">{node.desc}</p>
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

export function SystemsArchitecture() {
  return (
    <section className="relative isolate overflow-x-clip py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Systems Architecture</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading as="h2" size="md" className="mt-4">
              One backend, every surface connected.
            </Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <Lead className="mx-auto mt-5 text-center">
              How the pieces fit — clients talk to a single REST API that owns the data and the integrations.
            </Lead>
          </Reveal>
        </div>

        <DesktopArchitecture />
        <MobileArchitecture />
      </Container>
    </section>
  );
}
