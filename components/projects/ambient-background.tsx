"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Cinematic ambient backdrop shared by every projects viewing mode.
 *
 * Layers (back → front):
 *  1. Depth gradient + slowly animated gradient wash (dark / light aware).
 *  2. Two slowly drifting volumetric light blobs (cyan / violet).
 *  3. An animated perspective grid that slowly pans.
 *  4. Slow-moving diagonal light beams.
 *  5. Floating particles (deterministic — SSR-safe, no random at render).
 *  6. Sweeping light streaks + vignette.
 *
 * The whole field reacts subtly to the pointer (mouse parallax). Everything
 * collapses to a static, calm state under `prefers-reduced-motion`.
 *
 * IMPORTANT: nothing here may use Math.random(), Date.now() or `window`
 * during render — particle data is a hardcoded deterministic table so the
 * server and client markup match exactly (no hydration mismatch).
 */
export function AmbientBackground() {
  const reduced = useReducedMotion() ?? false;

  // Pointer parallax — normalized [-0.5, 0.5] around the viewport centre.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 40, damping: 20, mass: 0.6 });

  React.useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduced]);

  // Parallax depth per layer.
  const blobX = useTransform(sx, (v) => v * 60);
  const blobY = useTransform(sy, (v) => v * 60);
  const gridX = useTransform(sx, (v) => v * -28);
  const gridY = useTransform(sy, (v) => v * -28);
  const beamX = useTransform(sx, (v) => v * -50);
  const dotsX = useTransform(sx, (v) => v * 40);
  const dotsY = useTransform(sy, (v) => v * 40);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* 1 — base depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(148,163,184,0.10),transparent_38%)]" />
      <div className="hidden dark:block absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.0)_0%,rgba(5,5,5,0.55)_60%,#050505_100%)]" />

      {/* 1b — slowly animated gradient wash */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 opacity-70 [background:radial-gradient(60%_50%_at_20%_20%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(55%_45%_at_82%_75%,rgba(45,212,191,0.10),transparent_60%)] [background-size:200%_200%]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 50%", "0% 100%", "0% 0%"],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* 2 — volumetric light blobs */}
      <motion.div
        style={reduced ? undefined : { x: blobX, y: blobY }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute left-[-14%] top-[8%] h-[40rem] w-[40rem] rounded-full bg-emerald-500/[0.07] blur-[120px]"
          animate={reduced ? undefined : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[2%] right-[-16%] h-[44rem] w-[44rem] rounded-full bg-teal-500/[0.06] blur-[130px]"
          animate={reduced ? undefined : { x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/3 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-emerald-400/[0.05] blur-[120px]"
          animate={reduced ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* 3 — animated perspective grid */}
      <motion.div
        style={reduced ? undefined : { x: gridX, y: gridY }}
        className="absolute inset-0 [perspective:1000px]"
      >
        <div className="absolute inset-x-0 top-0 h-full [transform:rotateX(60deg)] [transform-origin:center_top] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_72%)]">
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(52,211,153,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,211,153,0.10)_1px,transparent_1px)] bg-[size:64px_64px]"
            animate={reduced ? undefined : { backgroundPositionY: ["0px", "64px"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* flat grid wash for additional texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.03)_1px,transparent_1px)] bg-[size:96px_96px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* 4 — slow moving light beams */}
      {!reduced && (
        <motion.div style={{ x: beamX }} className="absolute inset-0 overflow-hidden">
          <LightBeams />
        </motion.div>
      )}

      {/* 5 — floating particles (deterministic) */}
      {!reduced && (
        <motion.div style={{ x: dotsX, y: dotsY }} className="absolute inset-0">
          <Particles />
        </motion.div>
      )}

      {/* 6 — sweeping streaks + vignette */}
      {!reduced && <LightStreaks />}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,5,5,0.45)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(5,5,5,0.65)_100%)]" />
    </div>
  );
}

/**
 * Deterministic particle field. Hardcoded so the server and client render
 * identical markup — never generate these with Math.random() at render time.
 */
const PARTICLES: {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
}[] = [
  { left: 6.4, top: 18.2, size: 1.6, delay: 0.4, duration: 13.5, drift: 14, opacity: 0.34 },
  { left: 12.8, top: 62.5, size: 2.4, delay: 3.1, duration: 17.2, drift: -18, opacity: 0.28 },
  { left: 19.1, top: 34.7, size: 1.2, delay: 1.7, duration: 11.8, drift: 9, opacity: 0.42 },
  { left: 24.6, top: 81.3, size: 2.0, delay: 5.2, duration: 19.4, drift: -12, opacity: 0.22 },
  { left: 31.2, top: 9.6, size: 1.4, delay: 2.4, duration: 14.7, drift: 16, opacity: 0.38 },
  { left: 37.9, top: 47.8, size: 2.8, delay: 6.0, duration: 20.5, drift: -20, opacity: 0.18 },
  { left: 43.3, top: 71.1, size: 1.1, delay: 0.9, duration: 12.3, drift: 11, opacity: 0.46 },
  { left: 49.7, top: 23.4, size: 1.9, delay: 4.3, duration: 16.8, drift: -8, opacity: 0.3 },
  { left: 55.2, top: 88.0, size: 1.5, delay: 7.1, duration: 18.1, drift: 13, opacity: 0.24 },
  { left: 61.8, top: 14.9, size: 2.2, delay: 1.2, duration: 15.4, drift: -15, opacity: 0.33 },
  { left: 67.4, top: 55.6, size: 1.3, delay: 5.8, duration: 13.0, drift: 7, opacity: 0.4 },
  { left: 73.0, top: 39.2, size: 2.6, delay: 2.9, duration: 21.2, drift: -22, opacity: 0.2 },
  { left: 78.5, top: 77.4, size: 1.0, delay: 0.6, duration: 11.5, drift: 10, opacity: 0.48 },
  { left: 84.1, top: 27.8, size: 1.8, delay: 6.7, duration: 17.9, drift: -10, opacity: 0.29 },
  { left: 89.6, top: 64.3, size: 2.1, delay: 3.7, duration: 16.1, drift: 18, opacity: 0.26 },
  { left: 94.2, top: 44.0, size: 1.4, delay: 1.4, duration: 14.2, drift: -6, opacity: 0.37 },
  { left: 3.1, top: 50.5, size: 2.3, delay: 7.6, duration: 19.8, drift: 19, opacity: 0.21 },
  { left: 9.7, top: 88.7, size: 1.2, delay: 4.9, duration: 12.7, drift: -9, opacity: 0.43 },
  { left: 16.3, top: 5.4, size: 1.7, delay: 2.1, duration: 15.9, drift: 12, opacity: 0.32 },
  { left: 28.8, top: 60.1, size: 2.5, delay: 6.3, duration: 20.0, drift: -17, opacity: 0.19 },
  { left: 40.4, top: 92.6, size: 1.1, delay: 0.8, duration: 11.2, drift: 8, opacity: 0.45 },
  { left: 52.0, top: 6.8, size: 1.9, delay: 5.4, duration: 17.5, drift: -13, opacity: 0.27 },
  { left: 64.5, top: 84.2, size: 1.5, delay: 3.3, duration: 14.9, drift: 15, opacity: 0.35 },
  { left: 76.1, top: 11.5, size: 2.0, delay: 7.9, duration: 18.6, drift: -11, opacity: 0.23 },
  { left: 87.7, top: 52.9, size: 1.3, delay: 1.9, duration: 13.3, drift: 6, opacity: 0.41 },
  { left: 97.0, top: 79.6, size: 2.2, delay: 5.0, duration: 16.4, drift: -19, opacity: 0.25 },
];

function Particles() {
  return (
    <>
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-emerald-200/70"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 8px rgba(52,211,153,0.6)",
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, p.drift, 0],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function LightBeams() {
  return (
    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]">
      {[
        { left: "18%", w: "16rem", rot: 14, dur: 22, delay: 0, tint: "rgba(16,185,129,0.10)" },
        { left: "52%", w: "22rem", rot: 14, dur: 28, delay: 6, tint: "rgba(52,211,153,0.08)" },
        { left: "80%", w: "18rem", rot: 14, dur: 25, delay: 3, tint: "rgba(45,212,191,0.09)" },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute -top-1/4 h-[150%] blur-2xl"
          style={{
            left: b.left,
            width: b.w,
            rotate: b.rot,
            background: `linear-gradient(to bottom, transparent, ${b.tint}, transparent)`,
          }}
          animate={{ y: ["-8%", "8%", "-8%"], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function LightStreaks() {
  return (
    <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px w-[40rem] bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent"
          style={{ top: `${28 + i * 34}%`, rotate: i === 0 ? -18 : 16 }}
          initial={{ x: "-40%", opacity: 0 }}
          animate={{ x: "140%", opacity: [0, 1, 0] }}
          transition={{
            duration: 7,
            delay: i * 4.5,
            repeat: Infinity,
            repeatDelay: 6,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
