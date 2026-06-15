"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { Container, Reveal } from "@/components/system";

/* ──────────────────────────────────────────────────────────────────────────
 * TechMarquee — "Engineered with" infinite logo rail.
 * Two rows scrolling in opposite directions for depth. Real brand marks come
 * from the Simple Icons CDN (monochrome SVG, recolorable), rendered muted and
 * lifting to emerald-glow on hover. Pauses on hover; disabled animation under
 * reduced motion (CSS guard in globals.css). No local assets required.
 * ────────────────────────────────────────────────────────────────────────── */

type Tech = { name: string; slug: string };

const ROW_A: Tech[] = [
  { name: "Laravel", slug: "laravel" },
  { name: "PHP", slug: "php" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "MySQL", slug: "mysql" },
];

const ROW_B: Tech[] = [
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "React Native", slug: "react" },
  { name: "Redis", slug: "redis" },
  { name: "Docker", slug: "docker" },
  { name: "Vercel", slug: "vercel" },
  { name: "Git", slug: "git" },
  { name: "Figma", slug: "figma" },
  { name: "JavaScript", slug: "javascript" },
];

function LogoChip({ tech }: { tech: Tech }) {
  return (
    <li className="group/chip mx-3 flex shrink-0 items-center gap-3 rounded-2xl border border-border/60 bg-card/30 px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/60 hover:shadow-[0_0_34px_-10px_var(--glow-emerald)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${tech.slug}/a3a3a3`}
        alt={`${tech.name} logo`}
        width={28}
        height={28}
        loading="lazy"
        decoding="async"
        className="h-7 w-7 opacity-60 transition-all duration-300 group-hover/chip:opacity-100 group-hover/chip:[filter:drop-shadow(0_0_8px_var(--glow-emerald))]"
      />
      <span className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover/chip:text-foreground">
        {tech.name}
      </span>
    </li>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration = 38,
}: {
  items: Tech[];
  reverse?: boolean;
  duration?: number;
}) {
  // Render the list twice so a -50% translate produces a seamless loop.
  const doubled = [...items, ...items];
  return (
    <div className="mask-fade-x group flex overflow-hidden py-1">
      <ul
        className="animate-marquee flex w-max items-center"
        style={
          {
            ["--marquee-duration" as string]: `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {doubled.map((tech, i) => (
          <LogoChip key={`${tech.slug}-${i}`} tech={tech} />
        ))}
      </ul>
    </div>
  );
}

export function TechMarquee() {
  const t = useTranslations("home.marquee");
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <Container size="lg">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary/90">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              {t("title")}
            </h2>
          </div>
        </Reveal>
      </Container>

      {/* Full-bleed rails */}
      <div className="flex flex-col gap-4">
        <MarqueeRow items={ROW_A} duration={42} />
        <MarqueeRow items={ROW_B} duration={52} reverse />
      </div>
    </section>
  );
}
