"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Server,
  Code2,
  Smartphone,
  Cloud,
  Network,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Block config — titles & descriptions come from i18n; tags literal   */
/* ------------------------------------------------------------------ */

type Block = {
  key: "backend" | "frontend" | "mobile" | "cloud" | "architecture";
  index: string;
  icon: LucideIcon;
  tags: string[];
};

const blocks: Block[] = [
  {
    key: "backend",
    index: "01",
    icon: Server,
    tags: ["Laravel", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    key: "frontend",
    index: "02",
    icon: Code2,
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    key: "mobile",
    index: "03",
    icon: Smartphone,
    tags: ["React Native", "Flutter", "Expo"],
  },
  {
    key: "cloud",
    index: "04",
    icon: Cloud,
    tags: ["AWS", "Docker", "CI/CD", "Terraform"],
  },
  {
    key: "architecture",
    index: "05",
    icon: Network,
    tags: ["DDD", "REST", "Event-Driven", "Microservices"],
  },
];

/* ------------------------------------------------------------------ */
/* Single block                                                        */
/* ------------------------------------------------------------------ */

function ServiceBlock({
  block,
  even,
}: {
  block: Block;
  even: boolean;
}) {
  const t = useTranslations("services.blocks");
  const reduce = useReducedMotion();
  const Icon = block.icon;

  const variants: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, y: 48, x: even ? 56 : -56 },
        show: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <motion.article
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/30 p-7 backdrop-blur-xl transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-emerald-300/30 hover:shadow-[0_0_44px_-12px_var(--glow-emerald)] sm:p-9 lg:p-11"
    >
      {/* ghosted index numeral */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-3 select-none font-mono text-[8rem] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(110,231,183,0.16)] transition-all duration-500 group-hover:[-webkit-text-stroke:1px_rgba(110,231,183,0.32)] sm:text-[10rem] lg:text-[12rem] rtl:right-auto rtl:left-3"
      >
        {block.index}
      </span>

      {/* emerald hover wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_0%,var(--glow-emerald),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-40"
      />

      <div className="relative max-w-2xl">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-200 transition-colors duration-500 group-hover:border-emerald-300/40 group-hover:text-emerald-300">
            <Icon className="h-6 w-6" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-emerald-200/70">
            {block.index}
          </span>
        </div>

        <h3 className="mt-6 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {t(`${block.key}.title`)}
        </h3>

        <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t(`${block.key}.desc`)}
        </p>

        <ul className="mt-7 flex flex-wrap gap-2.5">
          {block.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 bg-foreground/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/70 transition-colors duration-500 group-hover:border-emerald-300/25 group-hover:text-emerald-100/90"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* ServiceBlocks                                                       */
/* ------------------------------------------------------------------ */

export function ServiceBlocks() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:gap-6 sm:px-6 lg:px-8">
      {blocks.map((block, i) => (
        <ServiceBlock key={block.key} block={block} even={i % 2 === 1} />
      ))}
    </div>
  );
}
