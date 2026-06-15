"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Boxes,
  Database,
  Smartphone,
  ServerCog,
  Plug,
  LayoutDashboard,
  CloudUpload,
  Network,
  Gauge,
  Cpu,
  Code2,
  CircuitBoard,
  Activity,
  Zap,
  ChevronRight,
  Layers3,
  ShieldCheck,
  Bell,
  CreditCard,
  MapPin,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/system";
import {
  CapabilityCarousel,
  type CapabilityItem,
} from "@/components/skills/capability-carousel";
import { AnimatedCounter } from "@/components/skills/animated-counter";

/* ------------------------------------------------------------------ */
/* Tech stack — grouped by category (names are literal brand strings)  */
/* ------------------------------------------------------------------ */

type StackCat = "frontend" | "backend" | "mobile" | "database" | "devops" | "business";

const stackCatOrder: StackCat[] = [
  "frontend",
  "backend",
  "mobile",
  "database",
  "devops",
  "business",
];

const stackCatAccent: Record<StackCat, string> = {
  frontend: "from-emerald-300/80 to-emerald-300/70",
  backend: "from-emerald-300/80 to-teal-300/70",
  mobile: "from-teal-300/80 to-teal-300/70",
  database: "from-emerald-300/80 to-emerald-300/70",
  devops: "from-emerald-300/80 to-emerald-300/70",
  business: "from-teal-300/80 to-teal-300/70",
};

const stackGroups: Record<StackCat, { name: string; level: number }[]> = {
  frontend: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 93 },
    { name: "TypeScript", level: 94 },
    { name: "JavaScript", level: 95 },
    { name: "Tailwind CSS", level: 96 },
  ],
  backend: [
    { name: "Laravel", level: 95 },
    { name: "PHP", level: 92 },
    { name: "REST APIs", level: 95 },
  ],
  mobile: [
    { name: "React Native", level: 88 },
    { name: "Flutter", level: 78 },
  ],
  database: [{ name: "MySQL", level: 90 }],
  devops: [
    { name: "Git / GitHub", level: 93 },
    { name: "Vercel", level: 90 },
    { name: "Railway", level: 85 },
    { name: "Cloudinary", level: 86 },
    { name: "Firebase", level: 84 },
  ],
  business: [
    { name: "CMS", level: 92 },
    { name: "SaaS", level: 90 },
    { name: "ERP", level: 82 },
    { name: "CRM", level: 80 },
  ],
};

/* ------------------------------------------------------------------ */
/* Architecture diagram                                                */
/* ------------------------------------------------------------------ */

function ArchitectureDiagram() {
  const t = useTranslations("skills.architecture");
  const reduce = useReducedMotion();
  const nodes = [
    { label: "Customer App", sub: "React Native" },
    { label: "Delivery App", sub: "React Native" },
    { label: "Admin App", sub: "React Native" },
    { label: "Web Dashboard", sub: "Next.js / Blade" },
  ];
  const integrations = [
    { label: "Firebase", sub: "Push + FCM" },
    { label: "Telr", sub: "Payments" },
    { label: "Cloudinary", sub: "Media CDN" },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-3/4 -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl"
      />

      {/* Animated flow lines (desktop only) */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="arch-flow absolute left-[26%] right-[58%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-emerald-300/0 via-emerald-300/50 to-emerald-300/0" />
          <div className="arch-flow arch-flow--delay absolute left-[58%] right-[26%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-teal-300/0 via-teal-300/50 to-teal-300/0" />
        </div>
      )}

      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
        {/* Clients */}
        <div className="space-y-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
            {t("clients")}
          </div>
          {nodes.map((n, i) => (
            <motion.div
              key={n.label}
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-card/40 p-3 transition-all hover:border-emerald-200/30"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <div>
                <div className="text-sm font-semibold text-foreground">{n.label}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {n.sub}
                </div>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground rtl:rotate-180" />
            </motion.div>
          ))}
        </div>

        {/* Center: API core */}
        <motion.div
          className="relative mx-auto"
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-emerald-300/15 via-emerald-300/10 to-teal-300/15 blur-2xl"
          />
          <div className="relative w-56 rounded-2xl border border-foreground/15 bg-card/70 p-5 text-center backdrop-blur-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200/30 bg-emerald-200/10">
              <ServerCog className="h-6 w-6 text-emerald-200" />
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
              {t("apiCore")}
            </div>
            <div className="mt-1 text-base font-semibold text-foreground">{t("sourceOfTruth")}</div>
            <div className="mt-4 flex items-center justify-center gap-2">
              {[t("auth"), t("domain"), t("webhooks")].map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border border-foreground/10 bg-foreground/[0.04] px-2 py-0.5 text-[10px] text-foreground/80"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <Database className="h-3 w-3" /> {t("db")}
          </div>
        </motion.div>

        {/* Integrations */}
        <div className="space-y-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85 lg:text-end">
            {t("integrations")}
          </div>
          {integrations.map((n, i) => (
            <motion.div
              key={n.label}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-card/40 p-3 transition-all hover:border-teal-200/30"
            >
              <Plug className="h-4 w-4 text-teal-200" />
              <div>
                <div className="text-sm font-semibold text-foreground">{n.label}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {n.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tech stack tabbed carousel                                          */
/* ------------------------------------------------------------------ */

function TechStackCarousel() {
  const t = useTranslations("skills.v2.stack");
  const reduce = useReducedMotion();
  const [cat, setCat] = React.useState<StackCat>("frontend");
  const items = stackGroups[cat];

  // Represent proficiency as 5 emerald dots (●●●●○) — no progress bars.
  const dots = (level: number) => {
    const filled = Math.max(0, Math.min(5, Math.round(level / 20)));
    return { filled, empty: 5 - filled };
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-card/60 shadow-[0_24px_60px_-30px_rgba(16,185,129,0.35)] backdrop-blur-xl">
      {/* faint emerald top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent"
      />

      {/* Terminal title bar */}
      <div className="flex items-center gap-3 border-b border-foreground/10 bg-foreground/[0.03] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        </div>
        <div className="mx-auto font-mono text-[11px] tracking-tight text-muted-foreground">
          ahmed@portfolio:~/stack
        </div>
        {/* keep the dots row centered */}
        <div className="h-2.5 w-[42px] shrink-0" aria-hidden />
      </div>

      <div className="p-4 sm:p-6">
        {/* Category commands (interactive terminal-style tabs) */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="categories">
          {stackCatOrder.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-tight transition-all",
                  active
                    ? "border-emerald-200/40 bg-emerald-200/10 text-emerald-200 text-glow-emerald shadow-[0_0_0_1px_rgba(110,231,183,0.2)]"
                    : "border-foreground/10 bg-foreground/[0.03] text-foreground/70 hover:border-emerald-200/25 hover:text-foreground",
                )}
              >
                <span className="text-emerald-300/70">./</span>
                {t(`cat.${c}`).toLowerCase()}
              </button>
            );
          })}
        </div>

        {/* Output area */}
        <div className="mt-5 font-mono text-sm leading-relaxed">
          {/* prompt line */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-emerald-300">$</span>
            <span>
              ls <span className="text-emerald-200/90">./{cat}</span>
            </span>
          </div>

          {/* technology clusters */}
          <motion.div
            key={cat}
            initial={reduce ? false : "hidden"}
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
            }}
            className="mt-3 flex flex-wrap gap-2"
          >
            {items.map((tech) => {
              const { filled, empty } = dots(tech.level);
              return (
                <motion.span
                  key={`${cat}-${tech.name}`}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group inline-flex items-center gap-2 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-2.5 py-1.5 transition-all hover:-translate-y-0.5 hover:border-emerald-200/35 hover:bg-emerald-200/[0.06]"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                  />
                  <span className="text-foreground">{tech.name}</span>
                  <span
                    aria-hidden
                    className="ml-1 text-[10px] tracking-[0.12em] text-emerald-300/60"
                    title={`${tech.level}`}
                  >
                    <span className="text-emerald-300/90">{"●".repeat(filled)}</span>
                    {"○".repeat(empty)}
                  </span>
                </motion.span>
              );
            })}
          </motion.div>

          {/* blinking caret line */}
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <span className="text-emerald-300">$</span>
            <span
              aria-hidden
              className="caret-blink inline-block h-4 w-2 bg-emerald-300/80 align-middle"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section header                                                      */
/* ------------------------------------------------------------------ */

function SectionHeader({
  index,
  eyebrow,
  title,
  icon: Icon,
}: {
  index: string;
  eyebrow: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Reveal className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.04] text-emerald-200">
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
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function EngineeringCapabilities() {
  const t = useTranslations("skills");
  const tv = useTranslations("skills.v2");

  const coreItems: CapabilityItem[] = [
    { key: "frontend", icon: Code2, accent: "cyan", proficiency: 95 },
    { key: "backend", icon: ServerCog, accent: "emerald", proficiency: 95 },
    { key: "mobile", icon: Smartphone, accent: "violet", proficiency: 88 },
    { key: "api", icon: Plug, accent: "sky", proficiency: 95 },
    { key: "dashboards", icon: LayoutDashboard, accent: "amber", proficiency: 92 },
    { key: "saas", icon: Boxes, accent: "emerald", proficiency: 90 },
    { key: "erpcrm", icon: Workflow, accent: "rose", proficiency: 82 },
    { key: "perf", icon: Gauge, accent: "cyan", proficiency: 90 },
  ].map((c) => ({
    ...c,
    title: tv(`core.items.${c.key}.title`),
    body: tv(`core.items.${c.key}.body`),
  })) as CapabilityItem[];

  const mobileItems: CapabilityItem[] = [
    { key: "customer", icon: Smartphone, accent: "violet" },
    { key: "delivery", icon: Activity, accent: "cyan" },
    { key: "admin", icon: ShieldCheck, accent: "emerald" },
    { key: "backend", icon: Plug, accent: "sky" },
    { key: "realtime", icon: Zap, accent: "amber" },
    { key: "push", icon: Bell, accent: "rose" },
    { key: "payments", icon: CreditCard, accent: "emerald" },
    { key: "maps", icon: MapPin, accent: "violet" },
  ].map((c) => ({
    ...c,
    title: tv(`mobileSlider.items.${c.key}.title`),
    body: tv(`mobileSlider.items.${c.key}.body`),
  })) as CapabilityItem[];

  const mindsetItems: CapabilityItem[] = [
    { key: "maintainability", icon: Boxes, accent: "emerald" },
    { key: "clean", icon: CircuitBoard, accent: "cyan" },
    { key: "scalable", icon: Network, accent: "violet" },
    { key: "apifirst", icon: Plug, accent: "sky" },
    { key: "deployment", icon: CloudUpload, accent: "amber" },
    { key: "optimization", icon: Gauge, accent: "rose" },
    { key: "reusable", icon: Layers3, accent: "emerald" },
  ].map((c) => ({
    ...c,
    title: tv(`mindset.items.${c.key}.title`),
    body: tv(`mindset.items.${c.key}.body`),
  })) as CapabilityItem[];

  const positioning = ["Full-Stack", "Mobile", "Backend", "SaaS", "ERP", "CRM"];

  const stats: { value: number; suffix?: string; label: string }[] = [
    { value: 3, suffix: "+", label: tv("stats.years") },
    { value: 15, suffix: "+", label: tv("stats.systems") },
    { value: 3, label: tv("stats.apps") },
    { value: 6, label: tv("stats.domains") },
  ];

  return (
    <div className="relative isolate overflow-hidden bg-background text-foreground">
      <style>{`
        @keyframes capGridPulse { 0%,100% { opacity: .25; } 50% { opacity: .45; } }
        .cap-grid-pulse { animation: capGridPulse 6s ease-in-out infinite; }
        @keyframes archFlow { 0% { opacity: .15; transform: translateY(-50%) scaleX(0.4); } 50% { opacity: 1; } 100% { opacity: .15; transform: translateY(-50%) scaleX(1); } }
        .arch-flow { transform-origin: left center; animation: archFlow 3.2s ease-in-out infinite; }
        .arch-flow--delay { animation-delay: 1.6s; }
        @media (prefers-reduced-motion: reduce) {
          .cap-grid-pulse, .arch-flow { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(148,163,184,0.15),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.07),transparent_24%),linear-gradient(180deg,rgba(5,5,5,0.98)_0%,#050505_100%)]" />
        <div className="absolute left-[-14%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-emerald-500/[0.05] blur-3xl" />
        <div className="absolute bottom-[-18%] right-[-16%] h-[36rem] w-[36rem] rounded-full bg-teal-400/[0.05] blur-3xl" />
        <div className="cap-grid-pulse absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      {/* HERO */}
      <section className="relative pb-14 pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
              <Cpu className="h-3 w-3" /> {tv("hero.badge")}
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {tv("hero.title1")}{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                {tv("hero.title2")}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
              {tv("hero.lead")}
            </p>

            {/* Positioning chips */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {positioning.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-foreground/12 bg-foreground/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/80"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Animated counters */}
          <Reveal delay={0.12} className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-5 text-center transition-all hover:border-emerald-200/30"
              >
                <div className="text-3xl font-bold text-foreground sm:text-4xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CORE CAPABILITIES SLIDER */}
      <section className="relative py-10">
        <SectionHeader
          index="01"
          eyebrow={tv("core.eyebrow")}
          title={tv("core.title")}
          icon={Cpu}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CapabilityCarousel items={coreItems} ariaLabel={tv("core.title")} />
        </div>
      </section>

      {/* TECH STACK CAROUSEL */}
      <section className="relative py-10">
        <SectionHeader
          index="02"
          eyebrow={tv("stack.eyebrow")}
          title={tv("stack.title")}
          icon={Layers3}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TechStackCarousel />
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE */}
      <section className="relative py-10">
        <SectionHeader
          index="03"
          eyebrow={t("sectionHeaders.architectureEyebrow")}
          title={t("sectionHeaders.architectureTitle")}
          icon={Network}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <ArchitectureDiagram />
          </Reveal>
        </div>
      </section>

      {/* MOBILE ENGINEERING SLIDER */}
      <section className="relative py-10">
        <SectionHeader
          index="04"
          eyebrow={tv("mobileSlider.eyebrow")}
          title={tv("mobileSlider.title")}
          icon={Smartphone}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CapabilityCarousel items={mobileItems} ariaLabel={tv("mobileSlider.title")} />
        </div>
      </section>

      {/* ENGINEERING MINDSET SLIDER */}
      <section className="relative py-10">
        <SectionHeader
          index="05"
          eyebrow={tv("mindset.eyebrow")}
          title={tv("mindset.title")}
          icon={CircuitBoard}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CapabilityCarousel items={mindsetItems} ariaLabel={tv("mindset.title")} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-24 pt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-emerald-300/[0.06] via-white/[0.03] to-emerald-300/[0.06] p-8 text-center sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-3/4 -translate-x-1/2 rounded-full bg-emerald-300/15 blur-3xl"
            />
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {t("cta.heading")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-foreground/80">{t("cta.lead")}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="shadow-lg shadow-emerald-950/40">
                <Link href="/contact">
                  {t("cta.primary")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-foreground/15 bg-foreground/[0.06] text-foreground hover:border-emerald-200/35 hover:bg-foreground/[0.12]"
              >
                <Link href="/projects">{t("cta.secondary")}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
