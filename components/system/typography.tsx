import * as React from "react";
import { cn } from "@/lib/utils";

/** Small uppercase tag above section headings (Linear / Vercel style). */
export function Eyebrow({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]",
        "text-primary/90",
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_var(--glow-cyan)]"
      />
      {children}
    </p>
  );
}

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg" | "xl";
  balance?: boolean;
};

const headingSize = {
  sm: "text-2xl sm:text-3xl",
  md: "text-3xl sm:text-4xl lg:text-5xl",
  lg: "text-4xl sm:text-5xl lg:text-6xl",
  xl: "text-5xl sm:text-6xl lg:text-7xl",
} as const;

export function Heading({
  as: Tag = "h2",
  size = "md",
  balance = true,
  className,
  children,
  ...rest
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-semibold tracking-tight text-foreground",
        balance && "text-balance",
        headingSize[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Lead({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
