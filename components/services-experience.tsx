"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Workflow,
  Code2,
  Server,
  Smartphone,
  Boxes,
  Database,
  LayoutGrid,
  FileCode,
  Gauge,
  Layers,
  ShoppingBag,
  Sparkles,
  Zap,
  Rocket,
  ArrowRight,
  Cpu,
  LayoutDashboard,
  Plug,
  Search,
  PenTool,
  ServerCog,
  TestTube,
  CloudUpload,
  Network,
  CreditCard,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/system";
import { ServiceBlocks } from "@/components/services/service-blocks";
import {
  ServicesCarousel,
  type ServiceSlide,
  type ServiceAccent,
} from "@/components/services/services-carousel";
import {
  CapabilityCarousel,
  type CapabilityItem,
  type CarouselAccent,
} from "@/components/skills/capability-carousel";
import { AnimatedCounter } from "@/components/skills/animated-counter";

/* ------------------------------------------------------------------ */
/* Service slide config (content comes from i18n)                      */
/* ------------------------------------------------------------------ */

const serviceConfig: {
  key: string;
  icon: ServiceSlide["icon"];
  accent: ServiceAccent;
}[] = [
  { key: "fullstack", icon: Workflow, accent: "cyan" },
  { key: "frontend", icon: Code2, accent: "blue" },
  { key: "backend", icon: Server, accent: "emerald" },
  { key: "mobile", icon: Smartphone, accent: "violet" },
  { key: "saas", icon: Boxes, accent: "cyan" },
  { key: "erp", icon: Database, accent: "emerald" },
  { key: "crm", icon: LayoutGrid, accent: "violet" },
  { key: "cms", icon: FileCode, accent: "amber" },
  { key: "dashboard", icon: Gauge, accent: "blue" },
  { key: "api", icon: Layers, accent: "cyan" },
  { key: "ecommerce", icon: ShoppingBag, accent: "rose" },
  { key: "ai", icon: Sparkles, accent: "violet" },
  { key: "performance", icon: Zap, accent: "amber" },
  { key: "deployment", icon: Rocket, accent: "blue" },
];

const ecoConfig: {
  key: string;
  icon: CapabilityItem["icon"];
  accent: CarouselAccent;
  tags: string[];
}[] = [
  { key: "dashboardApiMobile", icon: LayoutDashboard, accent: "cyan", tags: ["Dashboard", "REST API", "Mobile"] },
  { key: "saas", icon: Boxes, accent: "sky", tags: ["Multi-tenant", "Billing", "Auth"] },
  { key: "erp", icon: Workflow, accent: "emerald", tags: ["Inventory", "Invoicing", "Reports"] },
  { key: "crm", icon: Network, accent: "violet", tags: ["Pipelines", "Automation", "Activity"] },
  { key: "cms", icon: FileCode, accent: "amber", tags: ["Content", "Media", "Roles"] },
  { key: "ecommerce", icon: CreditCard, accent: "rose", tags: ["Catalog", "Orders", "Payments"] },
];

const processConfig: {
  key: string;
  icon: CapabilityItem["icon"];
  accent: CarouselAccent;
}[] = [
  { key: "discovery", icon: Search, accent: "cyan" },
  { key: "architecture", icon: Cpu, accent: "sky" },
  { key: "ui", icon: PenTool, accent: "violet" },
  { key: "backend", icon: ServerCog, accent: "emerald" },
  { key: "api", icon: Plug, accent: "cyan" },
  { key: "mobile", icon: Smartphone, accent: "violet" },
  { key: "testing", icon: TestTube, accent: "amber" },
  { key: "deployment", icon: CloudUpload, accent: "sky" },
];

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

export function ServicesExperience() {
  const t = useTranslations("services");
  const tv = useTranslations("services.v2");
  const tb = useTranslations("services.blocks");
  const ti = useTranslations("services.items");
  const tA = useTranslations("actions");

  const serviceSlides: ServiceSlide[] = serviceConfig.map((c) => ({
    key: c.key,
    icon: c.icon,
    accent: c.accent,
    title: ti(`${c.key}.title`),
    description: ti(`${c.key}.description`),
    deliver: ti(`${c.key}.deliver`),
    value: ti(`${c.key}.value`),
    tags: ti.raw(`${c.key}.tags`) as string[],
  }));

  const ecoItems: CapabilityItem[] = ecoConfig.map((c) => ({
    key: c.key,
    icon: c.icon,
    accent: c.accent,
    tags: c.tags,
    title: tv(`eco.items.${c.key}.title`),
    body: tv(`eco.items.${c.key}.body`),
  }));

  const processItems: CapabilityItem[] = processConfig.map((c, i) => ({
    key: c.key,
    icon: c.icon,
    accent: c.accent,
    meta: `Step ${String(i + 1).padStart(2, "0")}`,
    title: tv(`process.items.${c.key}.title`),
    body: tv(`process.items.${c.key}.body`),
  }));

  const stats: { value: number; suffix?: string; label: string }[] = [
    { value: 14, label: tv("counters.services") },
    { value: 3, suffix: "+", label: tv("counters.years") },
    { value: 6, label: tv("counters.ecosystems") },
    { value: 100, suffix: "%", label: tv("counters.production") },
  ];

  return (
    <div className="relative isolate overflow-hidden bg-background text-foreground">
      <style>{`
        @keyframes svcGridPulse { 0%,100% { opacity: .25; } 50% { opacity: .45; } }
        .svc-grid-pulse { animation: svcGridPulse 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .svc-grid-pulse { animation: none; } }
      `}</style>

      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(148,163,184,0.15),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.08),transparent_24%),linear-gradient(180deg,rgba(5,5,5,0.98)_0%,#050505_100%)]" />
        <div className="absolute left-[-14%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-emerald-500/[0.06] blur-3xl" />
        <div className="absolute bottom-[-18%] right-[-16%] h-[36rem] w-[36rem] rounded-full bg-emerald-400/[0.05] blur-3xl" />
        <div className="svc-grid-pulse absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
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
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-300 to-emerald-300 bg-clip-text text-transparent">
                {tv("hero.title2")}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
              {tv("hero.lead")}
            </p>
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

      {/* NUMBERED SERVICE BLOCKS */}
      <section className="relative py-10">
        <SectionHeader
          index="01"
          eyebrow={tb("eyebrow")}
          title={tb("title")}
          icon={Layers}
        />
        <ServiceBlocks />
      </section>

      {/* MAIN SERVICES SLIDER */}
      <section className="relative py-10">
        <SectionHeader
          index="02"
          eyebrow={tv("sectionHeaders.servicesEyebrow")}
          title={tv("sectionHeaders.servicesTitle")}
          icon={LayoutGrid}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServicesCarousel slides={serviceSlides} ariaLabel={tv("sectionHeaders.servicesTitle")} />
        </div>
      </section>

      {/* END-TO-END ECOSYSTEMS SLIDER */}
      <section className="relative py-10">
        <SectionHeader
          index="03"
          eyebrow={tv("sectionHeaders.ecoEyebrow")}
          title={tv("sectionHeaders.ecoTitle")}
          icon={Boxes}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CapabilityCarousel items={ecoItems} ariaLabel={tv("sectionHeaders.ecoTitle")} />
        </div>
      </section>

      {/* PROCESS TIMELINE SLIDER */}
      <section className="relative py-10">
        <SectionHeader
          index="04"
          eyebrow={tv("sectionHeaders.processEyebrow")}
          title={tv("sectionHeaders.processTitle")}
          icon={Workflow}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CapabilityCarousel items={processItems} ariaLabel={tv("sectionHeaders.processTitle")} />
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
              {t("closer.heading")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-foreground/80">{t("closer.lead")}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="shadow-[0_4px_18px_-12px_rgba(16,185,129,0.26)] dark:shadow-lg dark:shadow-emerald-950/40">
                <Link href="/contact">
                  {tA("getInTouch")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
