import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TechnicalBackdrop({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "soft" | "dense";
}) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden="true">
      <div
        className={cn(
          "hidden dark:block absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.98)_0%,#050505_100%)]",
          variant === "soft" &&
            "bg-[linear-gradient(180deg,rgba(5,5,5,0.96)_0%,#050505_100%)]",
        )}
      />
      <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(148,163,184,0.15),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(16,185,129,0.07),transparent_24%),radial-gradient(circle_at_50%_82%,rgba(20,20,20,0.36),transparent_36%)]" />
      <div className="absolute left-[-14%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-slate-300/[0.055] blur-3xl" />
      <div className="absolute bottom-[-18%] right-[-16%] h-[36rem] w-[36rem] rounded-full bg-emerald-300/[0.045] blur-3xl" />
      <svg
        className={cn(
          "absolute inset-0 h-full w-full opacity-30",
          variant === "dense" && "opacity-40",
        )}
        viewBox="0 0 1200 860"
        preserveAspectRatio="none"
      >
        <path
          d="M-80 190 C160 72 302 184 506 116 S842 52 1280 204"
          fill="none"
          stroke="rgba(226,232,240,0.14)"
          strokeWidth="1"
        />
        <path
          d="M56 720 C284 580 468 706 682 540 S936 438 1220 594"
          fill="none"
          stroke="rgba(16,185,129,0.12)"
          strokeWidth="1"
        />
        <path
          d="M386 224 L560 420 L766 318 L990 508"
          fill="none"
          stroke="rgba(148,163,184,0.13)"
          strokeWidth="1"
        />
        <circle cx="560" cy="420" r="3" fill="rgba(226,232,240,0.24)" />
        <circle cx="766" cy="318" r="3" fill="rgba(16,185,129,0.22)" />
        <circle cx="990" cy="508" r="3" fill="rgba(226,232,240,0.22)" />
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.032)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.028)_1px,transparent_1px)] bg-[size:92px_92px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_74%)]" />
    </div>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="animate-fade-in-up text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200/85 opacity-0">
        {eyebrow}
      </p>
      <h1 className="animate-fade-in-up animation-delay-100 mt-4 text-balance text-4xl font-bold tracking-tight text-foreground opacity-0 sm:text-5xl">
        {title}
      </h1>
      <p className="animate-fade-in-up animation-delay-200 mt-5 text-pretty text-base leading-relaxed text-foreground/80 opacity-0 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export function TechChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-md border border-foreground/10 bg-card/35 px-2.5 py-1 text-xs font-medium text-foreground/80 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-emerald-200/25 hover:text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PremiumSurface({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "shadow-soft rounded-lg border border-foreground/10 bg-foreground/[0.055] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-emerald-200/25 hover:bg-foreground/[0.075]",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
