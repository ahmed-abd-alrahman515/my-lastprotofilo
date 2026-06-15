"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Boxes, Gauge, Layers, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";

import { Container, Eyebrow, Reveal } from "@/components/system";
import { cn } from "@/lib/utils";

interface Principle {
  index: string;
  title: string;
  statement: string;
  body: string;
  icon: LucideIcon;
  rgb: string;
}

const PRINCIPLES: Principle[] = [
  {
    index: "01",
    title: "Build for Scale",
    statement: "Design today for the load of tomorrow.",
    body: "Every schema, queue, and endpoint is shaped so it keeps working when the data — and the users — multiply. Scale is a decision made early, not a fire fought late.",
    icon: Boxes,
    rgb: "103, 232, 249",
  },
  {
    index: "02",
    title: "Clean Architecture",
    statement: "Structure that survives change.",
    body: "UI, services, and data layers stay decoupled and predictable. New features slot in without unraveling what already works — the codebase reads like it was planned.",
    icon: Layers,
    rgb: "196, 181, 253",
  },
  {
    index: "03",
    title: "API First",
    statement: "One contract, every client.",
    body: "The API is the product's backbone. Web, mobile, and integrations all speak to the same well-versioned REST surface — consistent, documented, and dependable.",
    icon: Workflow,
    rgb: "110, 231, 183",
  },
  {
    index: "04",
    title: "Production Ready",
    statement: "Shipped means operable.",
    body: "Auth, permissions, error handling, deployment, and monitoring are part of the build — not an afterthought. If it ships, it can run, recover, and be maintained.",
    icon: ShieldCheck,
    rgb: "252, 211, 77",
  },
  {
    index: "05",
    title: "Performance Matters",
    statement: "Speed is a feature.",
    body: "From query plans to render paths, I chase the optimizations users actually feel. Fast interfaces and lean responses are a respect for the people on the other side.",
    icon: Gauge,
    rgb: "253, 164, 175",
  },
];

function PrincipleBlock({
  item,
  onActive,
}: {
  item: Principle;
  onActive: (idx: string) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6, margin: "-20% 0px -20% 0px" });
  const reduced = useReducedMotion() ?? false;

  React.useEffect(() => {
    if (inView) onActive(item.index);
  }, [inView, item.index, onActive]);

  const Icon = item.icon;

  return (
    <div ref={ref} className="flex min-h-[70vh] flex-col justify-center py-12 lg:min-h-screen">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "rounded-3xl border bg-card/40 p-7 backdrop-blur-xl transition-colors duration-500 sm:p-9",
          inView ? "" : "opacity-100",
        )}
        style={{ borderColor: inView ? `rgba(${item.rgb},0.35)` : "rgba(255,255,255,0.08)", boxShadow: inView ? `0 40px 120px -50px rgba(${item.rgb},0.6)` : undefined }}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border" style={{ borderColor: `rgba(${item.rgb},0.35)`, background: `rgba(${item.rgb},0.1)`, color: `rgb(${item.rgb})` }}>
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.2em]" style={{ color: `rgb(${item.rgb})` }}>
            {item.index}
          </span>
        </div>
        <h3 className="mt-6 text-balance text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {item.statement}
        </h3>
        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/75 sm:text-lg">{item.body}</p>
      </motion.div>
    </div>
  );
}

export function EngineeringPrinciples() {
  const [active, setActive] = React.useState("01");
  const onActive = React.useCallback((idx: string) => setActive(idx), []);
  const activeItem = PRINCIPLES.find((p) => p.index === active) ?? PRINCIPLES[0];

  return (
    <section className="relative isolate overflow-x-clip py-24 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container size="xl">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Engineering Principles</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              The rules I build by.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* sticky display */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <p
                className="font-mono text-[10rem] font-bold leading-none tracking-tighter transition-colors duration-500"
                style={{ color: `rgb(${activeItem.rgb})` }}
              >
                {activeItem.index}
              </p>
              <motion.h3
                key={activeItem.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-2 text-4xl font-bold tracking-tight text-foreground"
              >
                {activeItem.title}
              </motion.h3>

              {/* progress markers */}
              <div className="mt-10 flex flex-col gap-3">
                {PRINCIPLES.map((p) => {
                  const on = p.index === active;
                  return (
                    <div key={p.index} className="flex items-center gap-3">
                      <span
                        className="h-1 rounded-full transition-all duration-500"
                        style={{ width: on ? 40 : 16, background: on ? `rgb(${p.rgb})` : "rgba(255,255,255,0.18)" }}
                      />
                      <span
                        className={cn("font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-500", on ? "text-foreground" : "text-muted-foreground/60")}
                      >
                        {p.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* scrolling blocks */}
          <div>
            {PRINCIPLES.map((item) => (
              <PrincipleBlock key={item.index} item={item} onActive={onActive} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
