"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Boxes, CalendarDays, Plug, Smartphone, Users } from "lucide-react";

import { Container, Eyebrow, Heading, Lead, Reveal } from "@/components/system";
import { AnimatedCounter } from "@/components/skills/animated-counter";
import { cn } from "@/lib/utils";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  icon: React.ElementType;
  rgb: string;
}

const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Systems Shipped", sub: "SaaS · ERP · CRM · CMS", icon: Boxes, rgb: "52, 211, 153" },
  { value: 3, suffix: "+", label: "Years Experience", sub: "frontend → full ecosystems", icon: CalendarDays, rgb: "45, 212, 191" },
  { value: 3, suffix: "", label: "Mobile Apps", sub: "customer · rep · admin", icon: Smartphone, rgb: "110, 231, 183" },
  { value: 100, suffix: "+", label: "APIs Built", sub: "REST · auth · integrations", icon: Plug, rgb: "16, 185, 129" },
  { value: 50, suffix: "K+", label: "Users Reached", sub: "across live products", icon: Users, rgb: "94, 234, 212" },
];

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion() ?? false;
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5"
      style={{ boxShadow: `0 26px 80px -40px rgba(${stat.rgb},0.55)` }}
    >
      {/* top hairline */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,rgba(${stat.rgb},0.7),transparent)` }}
      />
      {/* hover aura */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 0%, rgba(${stat.rgb},0.22), transparent 70%)` }}
      />

      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl border"
        style={{ borderColor: `rgba(${stat.rgb},0.35)`, background: `rgba(${stat.rgb},0.1)`, color: `rgb(${stat.rgb})` }}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>

      <div className="mt-6 flex items-end gap-1">
        <AnimatedCounter
          value={stat.value}
          suffix={stat.suffix}
          className="font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        />
      </div>
      <p className="mt-3 text-sm font-semibold tracking-tight text-foreground">{stat.label}</p>
      <p className="mt-1 font-mono text-[11px] tracking-wide text-muted-foreground">{stat.sub}</p>
    </motion.div>
  );
}

export function EngineeringStats() {
  return (
    <section className="relative isolate overflow-x-clip py-24 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.05] blur-[120px]"
      />

      <Container size="xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">By the numbers</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading as="h2" size="md" className="mt-4">
              Engineering, measured in shipped outcomes.
            </Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <Lead className="mx-auto mt-5 text-center">
              Not lines of code — real platforms, real users, real production traffic.
            </Lead>
          </Reveal>
        </div>

        <div className={cn("mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5")}>
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
