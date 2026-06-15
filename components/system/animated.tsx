"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type RevealAnimation =
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "zoomIn"
  | "fadeIn";

type CommonProps = {
  animation?: RevealAnimation;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
  disableOnMobile?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

function useIsMobile() {
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * Scroll-triggered reveal hook using IntersectionObserver.
 * Returns a ref and a `revealed` flag. Apply animate.css classes when revealed.
 */
export function useRevealAnimation<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.12,
  rootMargin = "0px 0px -60px 0px",
  once = true,
}: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
} = {}) {
  const ref = React.useRef<T | null>(null);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setRevealed(false);
          }
        }
      },
      { threshold, rootMargin },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, revealed } as const;
}

function buildStyle(
  delay: number,
  duration: number,
  extra?: React.CSSProperties,
): React.CSSProperties {
  return {
    animationDelay: `${delay}ms`,
    animationDuration: `${duration}ms`,
    animationFillMode: "both",
    ...extra,
  };
}

/**
 * AnimatedSection — reveal a block when it scrolls into view.
 * Uses animate.css classes. Respects prefers-reduced-motion and (optional) mobile.
 */
export function AnimatedSection({
  animation = "fadeInUp",
  delay = 0,
  duration = 700,
  threshold = 0.12,
  once = true,
  rootMargin,
  disableOnMobile = false,
  className,
  style,
  children,
  as: Tag = "div",
}: CommonProps & { as?: keyof React.JSX.IntrinsicElements }) {
  const { ref, revealed } = useRevealAnimation<HTMLElement>({
    threshold,
    rootMargin,
    once,
  });
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const skip = reduced || (disableOnMobile && isMobile);

  const Comp = Tag as React.ElementType;

  if (skip) {
    return (
      <Comp ref={ref as React.Ref<HTMLElement>} className={className} style={style}>
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        revealed ? `animate__animated animate__${animation}` : "opacity-0",
        className,
      )}
      style={revealed ? buildStyle(delay, duration, style) : style}
    >
      {children}
    </Comp>
  );
}

/**
 * AnimatedCard — same as AnimatedSection but with a `index` prop that auto-stagger delays.
 * Pass `pattern="alternate"` to alternate directions per index (left/right/up/down).
 */
export function AnimatedCard({
  index = 0,
  pattern = "stagger",
  baseDelay = 80,
  initialDelay = 0,
  animation,
  duration = 700,
  threshold = 0.1,
  once = true,
  rootMargin,
  disableOnMobile = false,
  className,
  style,
  children,
}: Omit<CommonProps, "delay" | "animation"> & {
  index?: number;
  pattern?: "stagger" | "alternate";
  baseDelay?: number;
  initialDelay?: number;
  animation?: RevealAnimation;
}) {
  let resolved: RevealAnimation = animation ?? "fadeInUp";
  if (!animation && pattern === "alternate") {
    const cycle: RevealAnimation[] = [
      "fadeInLeft",
      "fadeInRight",
      "fadeInUp",
      "fadeInDown",
    ];
    resolved = cycle[index % cycle.length];
  }
  const delay = initialDelay + index * baseDelay;

  return (
    <AnimatedSection
      animation={resolved}
      delay={delay}
      duration={duration}
      threshold={threshold}
      once={once}
      rootMargin={rootMargin}
      disableOnMobile={disableOnMobile}
      className={className}
      style={style}
    >
      {children}
    </AnimatedSection>
  );
}
