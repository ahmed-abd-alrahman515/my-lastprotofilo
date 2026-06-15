import type { Project } from "@/lib/projects-data";

export type AccentKey = NonNullable<Project["accent"]>;

/**
 * Single source of truth for the per-project accent palette used across every
 * projects viewing mode (cinematic / timeline / orbital). Values are kept as
 * raw rgb triples so they can be composed into glows, rings and gradients with
 * arbitrary alpha at the call site.
 */
export const accentRGB: Record<AccentKey, string> = {
  cyan: "103, 232, 249",
  violet: "196, 181, 253",
  emerald: "110, 231, 183",
  amber: "52, 211, 153",
  rose: "94, 234, 212",
};

export interface AccentTheme {
  rgb: string;
  glow: string;
  border: string;
  text: string;
  dot: string;
  ring: string;
  /** Same as `ring` but only applied on hover (static for Tailwind JIT). */
  hoverRing: string;
  /** Soft radial used behind featured media. */
  aura: string;
}

export const accentTheme: Record<AccentKey, AccentTheme> = {
  cyan: {
    rgb: accentRGB.cyan,
    glow: "bg-emerald-400/25",
    border: "border-emerald-300/40",
    text: "text-emerald-200",
    dot: "bg-emerald-300",
    ring: "shadow-[0_0_0_1px_rgba(52,211,153,0.4),0_60px_140px_-30px_rgba(5,150,105,0.65)]",
    hoverRing: "hover:shadow-[0_0_0_1px_rgba(52,211,153,0.4),0_60px_140px_-30px_rgba(5,150,105,0.65)]",
    aura: "rgba(16,185,129,0.45)",
  },
  violet: {
    rgb: accentRGB.violet,
    glow: "bg-teal-400/25",
    border: "border-teal-300/40",
    text: "text-teal-200",
    dot: "bg-teal-300",
    ring: "shadow-[0_0_0_1px_rgba(153,246,228,0.4),0_60px_140px_-30px_rgba(13,148,136,0.65)]",
    hoverRing: "hover:shadow-[0_0_0_1px_rgba(153,246,228,0.4),0_60px_140px_-30px_rgba(13,148,136,0.65)]",
    aura: "rgba(45,212,191,0.45)",
  },
  emerald: {
    rgb: accentRGB.emerald,
    glow: "bg-emerald-400/25",
    border: "border-emerald-300/40",
    text: "text-emerald-200",
    dot: "bg-emerald-300",
    ring: "shadow-[0_0_0_1px_rgba(110,231,183,0.4),0_60px_140px_-30px_rgba(5,150,105,0.65)]",
    hoverRing: "hover:shadow-[0_0_0_1px_rgba(110,231,183,0.4),0_60px_140px_-30px_rgba(5,150,105,0.65)]",
    aura: "rgba(52,211,153,0.45)",
  },
  amber: {
    rgb: accentRGB.amber,
    glow: "bg-emerald-400/25",
    border: "border-emerald-300/40",
    text: "text-emerald-200",
    dot: "bg-emerald-300",
    ring: "shadow-[0_0_0_1px_rgba(52,211,153,0.4),0_60px_140px_-30px_rgba(5,150,105,0.65)]",
    hoverRing: "hover:shadow-[0_0_0_1px_rgba(52,211,153,0.4),0_60px_140px_-30px_rgba(5,150,105,0.65)]",
    aura: "rgba(52,211,153,0.45)",
  },
  rose: {
    rgb: accentRGB.rose,
    glow: "bg-teal-400/25",
    border: "border-teal-300/40",
    text: "text-teal-200",
    dot: "bg-teal-300",
    ring: "shadow-[0_0_0_1px_rgba(153,246,228,0.4),0_60px_140px_-30px_rgba(13,148,136,0.65)]",
    hoverRing: "hover:shadow-[0_0_0_1px_rgba(153,246,228,0.4),0_60px_140px_-30px_rgba(13,148,136,0.65)]",
    aura: "rgba(45,212,191,0.45)",
  },
};

export function themeFor(project: Project): AccentTheme {
  return accentTheme[project.accent ?? "cyan"];
}
