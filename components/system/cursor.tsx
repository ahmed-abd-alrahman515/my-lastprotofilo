"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────────
 * CustomCursor
 * A premium emerald cursor: a precise inner dot that tracks 1:1, and a larger
 * ring that springs behind it. The ring expands and glows over interactive
 * elements (links, buttons, [data-cursor="hover"]).
 *
 *  • Only activates on real pointers — `(hover: hover) and (pointer: fine)` —
 *    so touch devices keep their native behaviour.
 *  • Fully disabled under prefers-reduced-motion (renders nothing, native
 *    cursor restored via the CSS guard in globals.css).
 *  • Adds `.has-custom-cursor` to <html> only while active, which hides the
 *    native cursor through CSS (see globals.css).
 * ────────────────────────────────────────────────────────────────────────── */

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  // Avoid re-subscribing listeners on every visibility flip.
  const visibleRef = React.useRef(false);

  // Raw pointer position (dot tracks this 1:1).
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Ring lags slightly behind via spring for a fluid, weighty feel.
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  React.useEffect(() => {
    if (reduce) return;
    const fine =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      const t = e.target as Element | null;
      setHovering(Boolean(t && t.closest(INTERACTIVE_SELECTOR)));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  if (!enabled) return null;

  const ringSize = hovering ? 52 : 30;
  const scale = pressed ? 0.82 : 1;

  return (
    <>
      {/* Springy outer ring */}
      <motion.div
        aria-hidden
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? (hovering ? 1 : 0.7) : 0,
          scale,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.4 }}
      >
        <div
          className="h-full w-full rounded-full border"
          style={{
            marginLeft: -ringSize / 2,
            marginTop: -ringSize / 2,
            borderColor: "oklch(0.86 0.22 158 / 0.9)",
            boxShadow: hovering
              ? "0 0 22px 2px oklch(0.86 0.22 158 / 0.55), inset 0 0 12px oklch(0.86 0.22 158 / 0.25)"
              : "0 0 14px oklch(0.86 0.22 158 / 0.35)",
            background: hovering ? "oklch(0.86 0.22 158 / 0.08)" : "transparent",
            transition: "box-shadow 200ms ease, background 200ms ease",
          }}
        />
      </motion.div>

      {/* Precise inner dot (1:1 tracking) */}
      <motion.div
        aria-hidden
        className="cursor-ring"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="rounded-full"
          style={{
            width: 6,
            height: 6,
            marginLeft: -3,
            marginTop: -3,
            background: "oklch(0.9 0.23 158)",
            boxShadow: "0 0 10px oklch(0.86 0.22 158 / 0.9)",
          }}
        />
      </motion.div>
    </>
  );
}
