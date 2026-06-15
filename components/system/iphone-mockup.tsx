import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IPhoneMockupProps = {
  src: string;
  alt: string;
  className?: string;
  chassis?: "graphite" | "silver";
  caption?: string;
};


export function IPhoneMockup({
  src,
  alt,
  className,
  chassis = "graphite",
  caption,
}: IPhoneMockupProps) {
  const chassisStyle =
    chassis === "graphite"
      ? "from-zinc-800 via-zinc-700 to-zinc-900"
      : "from-zinc-300 via-zinc-200 to-zinc-400";

  return (
    <div className={cn("relative mx-auto w-[260px] select-none", className)}>
      {caption && (
        <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {caption}
        </p>
      )}

      {/* Outer chassis */}
      <div
        className={cn(
          "relative aspect-[9/19.5] rounded-[2.4rem] p-[3px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]",
          "bg-gradient-to-b",
          chassisStyle,
        )}
      >
        {/* Inner bezel */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-black">
          {/* Screen content */}
          <div className="absolute inset-0">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="260px"
              className="object-cover"
            />
            {/* Subtle screen sheen */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18)_0%,transparent_30%,transparent_70%,rgba(255,255,255,0.08)_100%)] mix-blend-overlay"
            />
            {/* Top status bar tint */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/40 to-transparent"
            />
          </div>

          {/* Dynamic Island */}
          <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-7 w-[88px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_-2px_8px_rgba(255,255,255,0.06)]" />

          {/* Side buttons subtle highlights */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-[5px] top-24 h-12 w-[3px] rounded-l bg-zinc-700"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-[5px] top-32 h-16 w-[3px] rounded-r bg-zinc-700"
          />
        </div>
      </div>

      {/* Reflection / floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 h-10 w-[80%] -translate-x-1/2 rounded-full bg-primary/30 blur-2xl opacity-50"
      />
    </div>
  );
}
