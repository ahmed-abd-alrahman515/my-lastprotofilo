"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  /** Pre-rendered icon node (e.g. <Boxes className="h-5 w-5" />). */
  icon?: React.ReactNode;
  eyebrow?: string;
  title: string;
  description: string;
  tags?: string[];
  className?: string;
  /** Accent hue for glow. */
  accent?: "cyan" | "violet" | "emerald" | "amber" | "rose";
  /** Children appear below the description. */
  children?: React.ReactNode;
};

const accentMap = {
  cyan: "from-emerald-400/30 via-emerald-400/10 to-transparent",
  violet: "from-teal-400/30 via-teal-400/10 to-transparent",
  emerald: "from-emerald-400/30 via-emerald-400/10 to-transparent",
  amber: "from-emerald-400/30 via-emerald-400/10 to-transparent",
  rose: "from-teal-400/30 via-teal-400/10 to-transparent",
} as const;

/**
 * Premium glass card with an animated border highlight that follows the cursor.
 * Use as the primary tile across system showcase sections.
 */
export function FeatureCard({
  icon,
  eyebrow,
  title,
  description,
  tags,
  className,
  accent = "cyan",
  children,
}: FeatureCardProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: -200, y: -200 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={cn(
        "group relative h-full overflow-hidden rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-xl",
        "shadow-[0_18px_60px_-20px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      {/* Spotlight follow */}
      {!reduce && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, var(--glow-cyan), transparent 65%)`,
          }}
        />
      )}

      {/* Top accent line */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-60",
          accentMap[accent],
        )}
      />

      {/* Corner glow */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-80",
          "bg-gradient-radial",
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--glow-cyan), transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        {(icon || eyebrow) && (
          <div className="mb-5 flex items-center justify-between gap-4">
            {icon && (
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border/60 bg-primary/10 text-primary shadow-[0_0_24px_var(--glow-cyan)]">
                {icon}
              </span>
            )}
            {eyebrow && (
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {eyebrow}
              </span>
            )}
          </div>
        )}

        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {children}
      </div>
    </motion.article>
  );
}
