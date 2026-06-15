"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  SiFlutter,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiReact,
} from "react-icons/si";
import type { IconType } from "react-icons";

import { Container, Eyebrow, Heading, Lead, Reveal } from "@/components/system";
import { cn } from "@/lib/utils";

/** react-icons' IconType returns ReactNode, which this @types/react version
 *  rejects as a JSX component — render brand icons through this renderable cast. */
type SvgIcon = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean;
}>;
const asIcon = (i: IconType) => i as unknown as SvgIcon;

interface TechNode {
  key: string;
  label: string;
  detail: string;
  icon: IconType;
  rgb: string;
  ring: 0 | 1;
  /** slot within the ring (0..n-1) */
  slot: number;
}

const INNER_COUNT = 4;
const OUTER_COUNT = 4;

const NODES: TechNode[] = [
  // inner ring
  { key: "laravel", label: "Laravel", detail: "Backbone of every API I ship — auth, queues, policies, Eloquent.", icon: SiLaravel, rgb: "253, 164, 175", ring: 0, slot: 0 },
  { key: "react", label: "React", detail: "Component-driven UIs with disciplined state and rendering.", icon: SiReact, rgb: "103, 232, 249", ring: 0, slot: 1 },
  { key: "next", label: "Next.js", detail: "App Router, RSC, and edge-ready dashboards in production.", icon: SiNextdotjs, rgb: "226, 232, 240", ring: 0, slot: 2 },
  { key: "mysql", label: "MySQL", detail: "Normalized schemas, indexing, and query tuning that scales.", icon: SiMysql, rgb: "110, 231, 183", ring: 0, slot: 3 },
  // outer ring
  { key: "php", label: "PHP", detail: "Modern, typed PHP 8 — the language under the Laravel hood.", icon: SiPhp, rgb: "196, 181, 253", ring: 1, slot: 0 },
  { key: "rn", label: "React Native", detail: "Cross-platform customer, rep, and admin apps from one codebase.", icon: SiReact, rgb: "125, 211, 252", ring: 1, slot: 1 },
  { key: "flutter", label: "Flutter", detail: "High-fidelity native experiences when motion really matters.", icon: SiFlutter, rgb: "96, 165, 250", ring: 1, slot: 2 },
  { key: "node", label: "Node.js", detail: "Realtime services, tooling, and integration glue.", icon: SiNodedotjs, rgb: "163, 230, 53", ring: 1, slot: 3 },
];

const RINGS = [
  { radius: 132, speed: 0.00018, dir: 1 },
  { radius: 224, speed: 0.00011, dir: -1 },
];

function OrbitNode({
  node,
  elapsed,
  active,
  dim,
  onHover,
  reduced,
}: {
  node: TechNode;
  elapsed: MotionValue<number>;
  active: boolean;
  dim: boolean;
  onHover: (key: string | null) => void;
  reduced: boolean;
}) {
  const ring = RINGS[node.ring];
  const count = node.ring === 0 ? INNER_COUNT : OUTER_COUNT;
  const base = (node.slot / count) * Math.PI * 2 + (node.ring === 1 ? Math.PI / 4 : 0);

  const angle = useTransform(elapsed, (ms) => base + ring.dir * ms * ring.speed);
  const x = useTransform(angle, (a) => Math.cos(a) * ring.radius);
  const y = useTransform(angle, (a) => Math.sin(a) * ring.radius);

  const Icon = asIcon(node.icon);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-20"
      style={reduced ? { x: Math.cos(base) * ring.radius, y: Math.sin(base) * ring.radius } : { x, y }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.button
          type="button"
          onHoverStart={() => onHover(node.key)}
          onHoverEnd={() => onHover(null)}
          onFocus={() => onHover(node.key)}
          onBlur={() => onHover(null)}
          aria-label={node.label}
          className="group relative flex h-16 w-16 items-center justify-center rounded-2xl border bg-card/80 backdrop-blur-xl outline-none sm:h-[4.5rem] sm:w-[4.5rem]"
          style={{
            borderColor: `rgba(${node.rgb},${active ? 0.7 : 0.35})`,
            boxShadow: active
              ? `0 0 0 1px rgba(${node.rgb},0.55), 0 22px 60px -18px rgba(${node.rgb},0.7)`
              : `0 10px 34px -18px rgba(${node.rgb},0.6)`,
            opacity: dim ? 0.4 : 1,
          }}
          animate={{ scale: active ? 1.16 : 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
        >
          <span
            aria-hidden
            className="absolute -inset-3 -z-10 rounded-3xl blur-lg transition-opacity duration-300"
            style={{ background: `radial-gradient(circle, rgba(${node.rgb},0.5), transparent 70%)`, opacity: active ? 0.9 : 0.3 }}
          />
          <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" style={{ color: `rgb(${node.rgb})` }} aria-hidden />
          <span
            className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-semibold tracking-wide transition-opacity duration-300"
            style={{ color: `rgb(${node.rgb})`, opacity: active ? 1 : 0.6 }}
          >
            {node.label}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

function OrbitStage() {
  const reduced = useReducedMotion() ?? false;
  const elapsed = useMotionValue(0);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const pausedRef = React.useRef(false);
  pausedRef.current = hovered !== null;

  useAnimationFrame((_, delta) => {
    if (reduced || pausedRef.current) return;
    elapsed.set(elapsed.get() + delta);
  });

  const activeNode = NODES.find((n) => n.key === hovered) ?? null;

  return (
    <div className="relative mx-auto mt-14 hidden h-[34rem] w-full max-w-3xl md:block">
      {/* ring guides */}
      {RINGS.map((r, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-foreground/10"
          style={{ width: r.radius * 2, height: r.radius * 2 }}
        />
      ))}

      {/* core */}
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl"
          animate={reduced ? undefined : { scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full border border-emerald-300/40 bg-[radial-gradient(circle_at_50%_35%,rgba(52,211,153,0.32),rgba(10,10,10,0.92))] text-center shadow-[0_0_0_1px_rgba(52,211,153,0.25),0_30px_80px_-20px_rgba(5,150,105,0.8)] backdrop-blur-xl">
          {!reduced && (
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full [background:conic-gradient(from_0deg,transparent,rgba(52,211,153,0.5),transparent_40%)] opacity-60"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          )}
          <div className="relative px-4">
            <p className="text-lg font-bold tracking-tight text-emerald-50">Ahmed</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.24em] text-emerald-200/70">the core</p>
          </div>
        </div>
      </div>

      {/* nodes */}
      {NODES.map((node) => (
        <OrbitNode
          key={node.key}
          node={node}
          elapsed={elapsed}
          active={hovered === node.key}
          dim={hovered !== null && hovered !== node.key}
          onHover={setHovered}
          reduced={reduced}
        />
      ))}

      {/* detail panel */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <motion.div
          key={activeNode?.key ?? "idle"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-md rounded-2xl border bg-card/80 px-5 py-3 text-center backdrop-blur-xl"
          style={{ borderColor: activeNode ? `rgba(${activeNode.rgb},0.4)` : "rgba(255,255,255,0.08)" }}
        >
          {activeNode ? (
            <>
              <p className="text-sm font-semibold tracking-tight" style={{ color: `rgb(${activeNode.rgb})` }}>
                {activeNode.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-foreground/75">{activeNode.detail}</p>
            </>
          ) : (
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              hover a technology to explore
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function MobileGrid() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 md:hidden">
      {NODES.map((node) => {
        const Icon = asIcon(node.icon);
        return (
          <div
            key={node.key}
            className="flex flex-col items-center gap-2 rounded-2xl border bg-card/50 p-4 backdrop-blur-xl"
            style={{ borderColor: `rgba(${node.rgb},0.3)` }}
          >
            <Icon className="h-7 w-7" style={{ color: `rgb(${node.rgb})` }} aria-hidden />
            <span className="text-xs font-semibold text-foreground">{node.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function TechUniverse() {
  return (
    <section className="relative isolate overflow-x-clip py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/[0.05] blur-[130px]" />

      <Container size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Tech Universe</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading as="h2" size="md" className="mt-4">
              Everything orbits one engineer.
            </Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <Lead className="mx-auto mt-5 text-center">
              The stack I reach for — backend, frontend, and mobile — all wired together by one person.
            </Lead>
          </Reveal>
        </div>

        <OrbitStage />
        <MobileGrid />
      </Container>
    </section>
  );
}
