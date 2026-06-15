"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Code2, Database, Layers, Smartphone, type LucideIcon } from "lucide-react";

import { Container, Eyebrow, Heading, Lead, Reveal } from "@/components/system";
import { cn } from "@/lib/utils";

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string; // tailwind text/border color stem
  glow: string; // rgb triple for glow
}

const milestones: Milestone[] = [
  {
    year: "2023",
    title: "Frontend Foundations",
    description:
      "Started by crafting responsive, component-driven interfaces with React, Next.js, and modern CSS — obsessing over performance, accessibility, and clean UI.",
    icon: Code2,
    accent: "cyan",
    glow: "103, 232, 249",
  },
  {
    year: "2024",
    title: "Laravel & APIs",
    description:
      "Moved deeper into the backend — building Laravel REST APIs, MySQL data models, authentication, and integrations that power real production clients.",
    icon: Database,
    accent: "violet",
    glow: "196, 181, 253",
  },
  {
    year: "2025",
    title: "ERP / CRM Systems",
    description:
      "Designed and shipped full operational systems — dashboards, role-based access, inventory, invoicing, and CRM pipelines built around real business workflows.",
    icon: Layers,
    accent: "emerald",
    glow: "110, 231, 183",
  },
  {
    year: "2026",
    title: "Mobile Ecosystems",
    description:
      "Now building complete ecosystems — customer, delivery, and admin mobile apps wired into one backend, push, and payment fabric. End-to-end product engineering.",
    icon: Smartphone,
    accent: "amber",
    glow: "252, 211, 77",
  },
];

function MilestoneRow({ item, index }: { item: Milestone; index: number }) {
  const reduced = useReducedMotion() ?? false;
  const Icon = item.icon;
  const flip = index % 2 === 1; // alternate sides on desktop

  return (
    <div className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
      {/* Card */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative ml-16 md:ml-0",
          flip ? "md:col-start-3 md:text-left" : "md:col-start-1 md:text-right",
        )}
      >
        <div
          className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 sm:p-7"
          style={{ boxShadow: `0 30px 90px -40px rgba(${item.glow},0.5)` }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, rgba(${item.glow},0.6), transparent)` }}
          />
          <div className={cn("flex items-center gap-3", flip ? "md:flex-row" : "md:flex-row-reverse")}>
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
              style={{
                borderColor: `rgba(${item.glow},0.35)`,
                backgroundColor: `rgba(${item.glow},0.1)`,
                color: `rgb(${item.glow})`,
              }}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span
              className="font-mono text-2xl font-bold tracking-tight"
              style={{ color: `rgb(${item.glow})` }}
            >
              {item.year}
            </span>
          </div>
          <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
      </motion.div>

      {/* Center node */}
      <div className="absolute left-6 top-7 z-10 -translate-x-1/2 md:static md:col-start-2 md:translate-x-0">
        <motion.span
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 bg-background"
          style={{ borderColor: `rgb(${item.glow})` }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `rgb(${item.glow})` }} />
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full blur-md"
            style={{ backgroundColor: `rgba(${item.glow},0.6)` }}
          />
        </motion.span>
      </div>

      {/* Spacer for the empty grid column on desktop */}
      <div className={cn("hidden md:block", flip ? "md:col-start-1" : "md:col-start-3")} aria-hidden />
    </div>
  );
}

export function JourneyTimeline() {
  const reduced = useReducedMotion() ?? false;

  const trackRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });

  return (
    <section id="journey" className="relative isolate overflow-x-clip py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Engineering Journey</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading as="h2" size="md" className="mt-4">
              From interfaces to full ecosystems.
            </Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <Lead className="mx-auto mt-5 text-center">
              A three-year arc from frontend craft to shipping complete, production-grade systems end to end.
            </Lead>
          </Reveal>
        </div>

        <div ref={trackRef} className="relative mt-16 sm:mt-20">
          {/* Connector track — left on mobile, centered on desktop */}
          <div
            aria-hidden
            className="absolute left-6 top-0 h-full w-px -translate-x-1/2 bg-border/50 md:left-1/2"
          />
          {/* Glowing fill that grows with scroll */}
          <motion.div
            aria-hidden
            style={{ scaleY: reduced ? 1 : fill }}
            className="absolute left-6 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-emerald-300 via-teal-300 to-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)] md:left-1/2"
          />

          <div className="space-y-14 sm:space-y-20">
            {milestones.map((item, i) => (
              <MilestoneRow key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
