"use client";

import * as React from "react";
import { motion, type MotionValue } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────────
 * HeroVideoBackground
 * A premium, cinematic, video-first hero background.
 *
 *  • Plays a real 16:9 MP4 (muted / autoplay / loop / playsInline / object-cover),
 *    lazily mounted on the client, with a smooth fade-in once the first frame is
 *    actually decodable (`onCanPlay`) — no pop-in, no layout shift.
 *  • An ~80% cinematic dark veil + cyan accent wash sits on top for contrast and
 *    the Apple / Stripe / Vercel "enterprise" mood. A vertical light-beam glows
 *    behind the headline.
 *  • Gracefully falls back to a poster image on mobile, reduced motion, video
 *    error, or when no source is provided.
 *  • Deterministic markup → no Math.random in SSR, no hydration drift.
 * ────────────────────────────────────────────────────────────────────────── */

export interface HeroVideoBackgroundProps {
  /** Real video asset, e.g. "/videos/hero-enterprise.mp4". */
  videoSrc?: string;
  videoSrcWebm?: string;
  /** Poster / fallback image, e.g. "/videos/hero-enterprise-poster.jpg". */
  poster?: string;
  reduce: boolean;
  isMobile: boolean;
  mounted: boolean;
  /** Parallax inputs (normalized -0.5..0.5 springs). */
  rxParallax: MotionValue<number>;
  ryParallax: MotionValue<number>;
  /** Raw cursor position (px) for the follow-glow. */
  glowX: MotionValue<number>;
  glowY: MotionValue<number>;
}

export function HeroVideoBackground({
  videoSrc,
  videoSrcWebm,
  poster,
  reduce,
  isMobile,
  mounted,
  rxParallax,
  ryParallax,
  glowX,
  glowY,
}: HeroVideoBackgroundProps) {
  const [videoFailed, setVideoFailed] = React.useState(false);
  const [videoReady, setVideoReady] = React.useState(false);

  // Use the real video only on the client, with motion allowed, on larger
  // screens, and when a source actually exists. Everything else → poster image.
  const useVideo =
    Boolean(videoSrc) && mounted && !reduce && !isMobile && !videoFailed;

  // Some browsers fire `canplay` before React attaches the handler (cache hit):
  // poll `readyState` once on mount as a safety net so the fade-in always runs.
  const videoRef = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    if (!useVideo) return;
    const el = videoRef.current;
    if (el && el.readyState >= 2) setVideoReady(true);
  }, [useVideo]);

  // Subtle parallax on the media (gated by `mounted` so SSR === first client render).
  const parallaxStyle = mounted && !reduce ? { x: ryParallax, y: rxParallax } : undefined;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Opaque, self-contained base (no global grid bleed-through). */}
      <div className="absolute inset-0 bg-background" />

      {/* Cinematic ambient wash — pale cyan / blue / violet. Also the graceful
          fallback when neither video nor poster is available. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(ellipse_at_85%_20%,rgba(45,212,191,0.12),transparent_52%),radial-gradient(ellipse_at_15%_88%,rgba(52,211,153,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_-12%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(ellipse_at_85%_18%,rgba(20,184,166,0.14),transparent_52%),radial-gradient(ellipse_at_50%_120%,rgba(6,95,70,0.18),transparent_55%)]" />

      {/* ── Media: real video, or poster image fallback ─────────────────────
          The video covers the full hero and fades in smoothly once it can play.
          Light mode keeps it soft (text stays dark-on-light); dark mode lets it
          shine for the full cinematic effect. */}
      <motion.div style={parallaxStyle} className="absolute inset-[-3%]">
        {useVideo ? (
          <video
            ref={videoRef}
            className={`h-full w-full scale-105 object-cover blur-[1px] transition-opacity duration-[1400ms] ease-out ${
              videoReady ? "opacity-[0.34] dark:opacity-[0.82]" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
          >
            {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
            {videoSrc && <source src={videoSrc} type="video/mp4" />}
          </video>
        ) : poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            aria-hidden
            loading="eager"
            decoding="async"
            className="h-full w-full scale-105 object-cover opacity-[0.18] blur-[2px] dark:opacity-[0.6]"
          />
        ) : null}
      </motion.div>

      {/* ── Cinematic dark overlay (~80% in dark mode) ──────────────────────
          Dark: deep navy veil top→bottom + a flat scrim → reads ≈75-85% dark.
          Light: soft ice veil with a cyan tint so the page stays bright/clean. */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/30 to-white/55 dark:from-[#050505]/80 dark:via-[#05050500]/55 dark:to-[#050505]/88" />
      <div className="absolute inset-0 bg-emerald-50/15 dark:bg-[#0a0a0a]/45" />

      {/* ── Volumetric light rays (god rays) ────────────────────────────────
          Thin diagonal emerald shafts that drift slowly for cinematic depth. */}
      {!reduce && (
        <div className="absolute inset-0 overflow-hidden opacity-70 mix-blend-screen">
          <div className="absolute -top-1/3 left-1/2 h-[150%] w-[120%] -translate-x-1/2 bg-[repeating-linear-gradient(100deg,transparent_0,transparent_56px,rgba(16,185,129,0.05)_58px,transparent_62px,transparent_120px)] blur-[2px] motion-safe:animate-[grid-drift_30s_ease-in-out_infinite]" />
          <div className="absolute -top-1/3 left-1/2 h-[150%] w-[120%] -translate-x-1/2 bg-[repeating-linear-gradient(80deg,transparent_0,transparent_90px,rgba(52,211,153,0.04)_92px,transparent_96px,transparent_180px)] blur-[3px] motion-safe:animate-[grid-drift_44s_ease-in-out_infinite_reverse]" />
        </div>
      )}

      {/* ── Light beam behind the headline ──────────────────────────────────
          A soft vertical column of emerald light sweeping up behind the title,
          plus a focused glow core. Gently breathes (disabled on reduced motion). */}
      <div
        className="absolute left-1/2 top-1/2 h-[140%] w-[34rem] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] bg-[linear-gradient(to_top,transparent,rgba(16,185,129,0.10)_38%,rgba(52,211,153,0.16)_55%,transparent_82%)] blur-[60px] dark:bg-[linear-gradient(to_top,transparent,rgba(16,185,129,0.16)_38%,rgba(16,185,129,0.26)_55%,transparent_82%)]"
        style={reduce ? undefined : { animation: "hvbBeam 9s ease-in-out infinite" }}
      />
      <div
        className="absolute left-1/2 top-[42%] h-[34rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.08] blur-[120px] dark:bg-emerald-400/[0.18]"
        style={reduce ? undefined : { animation: "hvbBreathe 10s ease-in-out infinite" }}
      />

      {/* ── Very subtle aurora depth (minimal, no particles) ────────────── */}
      <motion.div style={parallaxStyle} className="absolute inset-0">
        <div className="absolute left-[-12%] top-[4%] h-[28rem] w-[28rem] rounded-full bg-emerald-400/[0.08] blur-[140px] dark:bg-emerald-400/[0.12]" />
        <div className="absolute right-[-10%] bottom-[2%] h-[26rem] w-[26rem] rounded-full bg-teal-400/[0.07] blur-[140px] dark:bg-teal-500/[0.12]" />
      </motion.div>

      {/* ── Cursor-follow glow (client only, subtle) ────────────────────── */}
      {mounted && !reduce && (
        <motion.div style={{ x: glowX, y: glowY }} className="absolute left-0 top-0">
          <div className="-ml-[16rem] -mt-[16rem] h-[32rem] w-[32rem] rounded-full bg-emerald-400/[0.04] blur-[110px] dark:bg-emerald-400/[0.07]" />
        </motion.div>
      )}

      {/* ── Readability protection + edge fades ─────────────────────────── */}
      {/* Light: faint centre scrim behind text; edges stay vivid/cinematic. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_56%_44%_at_50%_42%,rgba(248,250,252,0.30),transparent_72%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(5,5,5,0.6)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <style>{`
        @keyframes hvbBreathe {
          0%, 100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.85; }
          50%      { transform: translate(-50%,-50%) scale(1.08); opacity: 1; }
        }
        @keyframes hvbBeam {
          0%, 100% { transform: translate(-50%,-50%) rotate(-2deg) scaleY(1);    opacity: 0.7; }
          50%      { transform: translate(-50%,-50%) rotate(-2deg) scaleY(1.06); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="hvb"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
