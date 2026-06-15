"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticProps = React.PropsWithChildren<{
  className?: string;
  /** Magnetic radius in px. Default 100. */
  radius?: number;
  /** How strong the pull is (0..1). Default 0.35. */
  strength?: number;
}>;

/**
 * Wrap a button/link in <Magnetic> to give it a soft magnetic pull toward the cursor.
 * Falls back to a no-op div when the user prefers reduced motion.
 */
export function Magnetic({
  children,
  className,
  radius = 100,
  strength = 0.35,
}: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  React.useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    }
    function onLeave() {
      x.set(0);
      y.set(0);
    }

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [radius, strength, reduce, x, y]);

  if (reduce) {
    return <div className={cn("inline-flex", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
