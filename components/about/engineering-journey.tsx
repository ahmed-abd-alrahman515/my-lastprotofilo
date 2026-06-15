"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Code2, Database, Layers, Smartphone, type LucideIcon } from "lucide-react";

import { Container, Eyebrow, Heading, Lead, Reveal } from "@/components/system";
import { cn } from "@/lib/utils";

interface Milestone {
  year: string;
  chapter: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  glow: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2023",
    chapter: "Chapter 01",
    title: "Frontend Development",
    description:
      "It started with the interface. I obsessed over responsive, component-driven UIs in React and Next.js — pixel discipline, accessibility, and performance budgets that never slipped.",
    tags: ["React", "Next.js", "Tailwind", "UI engineering"],
    icon: Code2,
    glow: "103, 232, 249",
  },
  {
    year: "2024",
    chapter: "Chapter 02",
    title: "Laravel APIs",
    description:
      "I went deeper into the backend — Laravel REST APIs, MySQL data modeling, authentication, queues, and third-party integrations powering real production clients.",
    tags: ["Laravel", "MySQL", "REST", "Auth"],
    icon: Database,
    glow: "196, 181, 253",
  },
  {
    year: "2025",
    chapter: "Chapter 03",
    title: "ERP / CRM Systems",
    description:
      "Then came full operational systems — dashboards, role-based access, inventory, invoicing, and CRM pipelines designed around how businesses actually work.",
    tags: ["ERP", "CRM", "Dashboards", "RBAC"],
    icon: Layers,
    glow: "110, 231, 183",
  },
  {
    year: "2026",
    chapter: "Chapter 04",
    title: "Mobile Ecosystems",
    description:
      "Now I build complete ecosystems — customer, delivery, and admin apps wired into one backend, push, and payment fabric. End-to-end product engineering.",
    tags: ["React Native", "Flutter", "Push", "Payments"],
    icon: Smartphone,
    glow: "252, 211, 77",
  },
];

function MilestoneRow({ item, index }: { item: Milestone; index: number }) {
  const reduced = useReducedMotion() ?? false;
  const Icon = item.icon;
  const flip = index % 2 === 1;

  return (
    <div className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 48, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn("relative ml-16 md:ml-0", flip ? "md:col-start-3 md:text-left" : "md:col-start-1 md:text-right")}
      >
        <div
          className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 sm:p-8"
          style={{ boxShadow: `0 36px 110px -48px rgba(${item.glow},0.6)` }}
        >
          {/* ghosted big year */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute -top-4 select-none font-mono text-[7rem] font-bold leading-none tracking-tighter opacity-[0.06]",
              flip ? "left-2" : "right-2",
            )}
            style={{ color: `rgb(${item.glow})` }}
          >
            {item.year}
          </span>

          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: `linear-gradient(90deg,transparent,rgba(${item.glow},0.65),transparent)` }}
          />

          <div className={cn("relative flex items-center gap-3", flip ? "md:flex-row" : "md:flex-row-reverse")}>
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
              style={{ borderColor: `rgba(${item.glow},0.35)`, background: `rgba(${item.glow},0.1)`, color: `rgb(${item.glow})` }}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div className={cn(flip ? "text-left" : "md:text-right")}>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{item.chapter}</p>
              <p className="font-mono text-2xl font-bold tracking-tight" style={{ color: `rgb(${item.glow})` }}>
                {item.year}
              </p>
            </div>
          </div>

          <h3 className="relative mt-5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{item.title}</h3>
          <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

          <div className={cn("relative mt-5 flex flex-wrap gap-1.5", flip ? "justify-start" : "md:justify-end")}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                style={{ borderColor: `rgba(${item.glow},0.3)`, background: `rgba(${item.glow},0.06)` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* center node */}
      <div className="absolute left-6 top-8 z-10 -translate-x-1/2 md:static md:col-start-2 md:translate-x-0">
        <motion.span
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-110px" }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background"
          style={{ borderColor: `rgb(${item.glow})` }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: `rgb(${item.glow})` }} />
          <span aria-hidden className="absolute inset-0 -z-10 rounded-full blur-md" style={{ backgroundColor: `rgba(${item.glow},0.7)` }} />
          {!reduced && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: `rgba(${item.glow},0.5)` }}
              animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: index * 0.4 }}
            />
          )}
        </motion.span>
      </div>

      <div className={cn("hidden md:block", flip ? "md:col-start-1" : "md:col-start-3")} aria-hidden />
    </div>
  );
}

export function EngineeringJourney() {
  const reduced = useReducedMotion() ?? false;
  const trackRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start center", "end center"] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });

  return (
    <section className="relative isolate overflow-x-clip py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Engineering Journey</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading as="h2" size="md" className="mt-4">
              A three-year arc, told in chapters.
            </Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <Lead className="mx-auto mt-5 text-center">
              From crafting interfaces to shipping complete, production-grade ecosystems — end to end.
            </Lead>
          </Reveal>
        </div>

        <div ref={trackRef} className="relative mt-16 sm:mt-24">
          <div aria-hidden className="absolute left-6 top-0 h-full w-px -translate-x-1/2 bg-border/50 md:left-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: reduced ? 1 : fill }}
            className="absolute left-6 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-emerald-300 via-teal-300 to-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.85)] md:left-1/2"
          />

          <div className="space-y-16 sm:space-y-24">
            {MILESTONES.map((item, i) => (
              <MilestoneRow key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
