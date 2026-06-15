"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type GlobalBackgroundProps = {
  /** Disable on mobile (perf). Default true. */
  hideOnMobile?: boolean;
  /** Show drifting particles. Default true on desktop. */
  particles?: boolean;
  /** Show rotating light beams. Default true on desktop. */
  beams?: boolean;
  /** Show vertical emerald data-stream lines. Default true on desktop. */
  dataStreams?: boolean;
  /** Number of particles to render. Default 22. */
  particleCount?: number;
  className?: string;
};

/**
 * Site-wide ambient background — emerald cinematic edition.
 * Fixed full-viewport layer. GPU-cheap (transforms + opacity only).
 * Disabled under prefers-reduced-motion via CSS (motion-safe utilities + the
 * reduced-motion guard in globals.css).
 */
export function GlobalBackground({
  hideOnMobile = true,
  particles = true,
  beams = true,
  dataStreams = true,
  particleCount = 22,
  className,
}: GlobalBackgroundProps) {
  // Generated once, deterministic per mount (no SSR/CSR mismatch).
  const particleSeeds = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const x = (i * 53) % 100;
      const y = (i * 91) % 100;
      const delay = (i * 0.37) % 10;
      const duration = 14 + ((i * 7) % 18);
      const dx = ((i % 5) - 2) * 18;
      const dy = -120 - ((i * 11) % 80);
      const size = 1 + (i % 3);
      return { x, y, delay, duration, dx, dy, size, key: i };
    });
  }, [particleCount]);

  // Deterministic vertical data-stream columns.
  const streamSeeds = React.useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => ({
      key: i,
      left: 6 + ((i * 11.3) % 90),
      height: 22 + ((i * 9) % 30),
      duration: 7 + ((i * 5) % 9),
      delay: (i * 1.7) % 9,
      opacity: 0.16 + ((i % 4) * 0.05),
    }));
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        hideOnMobile && "hidden md:block",
        className,
      )}
    >
      {/* Base ambient gradient — emerald aurora top, deep teal-emerald bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--glow-emerald),transparent_55%),radial-gradient(ellipse_at_bottom_right,var(--glow-violet),transparent_60%)]" />

      {/* Floating grid (slow drift) */}
      <div className="bg-grid mask-radial absolute inset-0 opacity-60 motion-safe:animate-[grid-drift_28s_var(--ease-in-out-cinema)_infinite]" />

      {/* Drifting aurora blobs for soft depth */}
      <div className="absolute -left-[10%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-[var(--glow-emerald)] opacity-50 blur-[150px] motion-safe:aurora-drift" />
      <div className="absolute -right-[8%] bottom-[6%] h-[30rem] w-[30rem] rounded-full bg-[var(--glow-violet)] opacity-40 blur-[150px] motion-safe:aurora-drift [animation-delay:-8s]" />

      {/* Center beam — soft vertical emerald glow */}
      <div className="absolute left-1/2 top-0 h-[60vh] w-[42rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,var(--beam),transparent_70%)] opacity-50 blur-2xl motion-safe:animate-[glow-pulse_8s_ease-in-out_infinite]" />

      {/* Vertical data-stream lines (thin emerald rain) */}
      {dataStreams && (
        <div className="absolute inset-0">
          {streamSeeds.map((s) => (
            <span
              key={s.key}
              className="data-stream absolute top-0 w-px"
              style={
                {
                  left: `${s.left}%`,
                  height: `${s.height}vh`,
                  opacity: s.opacity,
                  ["--d" as string]: `${s.duration}s`,
                  ["--delay" as string]: `${s.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Rotating light beams */}
      {beams && (
        <>
          <div className="absolute left-[20%] top-[30%] h-[60rem] w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--beam)] to-transparent opacity-30 motion-safe:animate-[beam-sweep_22s_linear_infinite] [animation-delay:-4s]" />
          <div className="absolute right-[18%] top-[20%] h-[60rem] w-[2px] origin-top translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--glow-violet)] to-transparent opacity-25 motion-safe:animate-[beam-sweep_28s_linear_infinite] [animation-delay:-12s]" />
        </>
      )}

      {/* Drifting particles (emerald) */}
      {particles && (
        <div className="absolute inset-0">
          {particleSeeds.map((p) => (
            <span
              key={p.key}
              className="absolute rounded-full bg-primary/60 shadow-[0_0_8px_var(--glow-emerald)] motion-safe:animate-[particle-drift_var(--d)_linear_infinite]"
              style={
                {
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  ["--dx" as string]: `${p.dx}px`,
                  ["--dy" as string]: `${p.dy}px`,
                  ["--d" as string]: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Bottom fade so content sits on a calmer surface */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-background via-background/60 to-transparent" />
    </div>
  );
}
