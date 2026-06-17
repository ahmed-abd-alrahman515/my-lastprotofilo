"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";

export interface HeroVideoBackgroundProps {
  videoSrc?: string;
  videoSrcWebm?: string;
  poster?: string;
  reduce: boolean;
  isMobile: boolean;
  isLowPower: boolean;
  mounted: boolean;
  rxParallax: MotionValue<number>;
  ryParallax: MotionValue<number>;
  glowX: MotionValue<number>;
  glowY: MotionValue<number>;
}

function HeroVideoBackgroundImpl({
  videoSrc,
  videoSrcWebm,
  poster,
  reduce,
  isMobile,
  isLowPower,
  mounted,
  rxParallax,
  ryParallax,
  glowX,
  glowY,
}: HeroVideoBackgroundProps) {
  const [videoFailed, setVideoFailed] = React.useState(false);
  const [videoReady, setVideoReady] = React.useState(false);

  const useVideo =
    Boolean(videoSrc) && mounted && !reduce && !isMobile && !isLowPower && !videoFailed;

  const videoRef = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    if (!useVideo) return;
    const el = videoRef.current;
    if (el && el.readyState >= 2) setVideoReady(true);
  }, [useVideo]);

  const parallaxStyle = mounted && !reduce && !isLowPower ? { x: ryParallax, y: rxParallax } : undefined;
  const showAmbientAnimations = !reduce && !isLowPower && !isMobile;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(ellipse_at_85%_20%,rgba(45,212,191,0.12),transparent_52%),radial-gradient(ellipse_at_15%_88%,rgba(52,211,153,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_-12%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(ellipse_at_85%_18%,rgba(20,184,166,0.14),transparent_52%),radial-gradient(ellipse_at_50%_120%,rgba(6,95,70,0.18),transparent_55%)]" />

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
          <Image
            src={poster}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover opacity-[0.18] blur-[2px] dark:opacity-[0.6]"
          />
        ) : null}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/30 to-white/55 dark:from-[#050505]/80 dark:via-[#05050500]/55 dark:to-[#050505]/88" />
      <div className="absolute inset-0 bg-emerald-50/15 dark:bg-[#0a0a0a]/45" />

      {showAmbientAnimations && (
        <div className="absolute inset-0 overflow-hidden opacity-70 mix-blend-screen">
          <div className="absolute -top-1/3 left-1/2 h-[150%] w-[120%] -translate-x-1/2 bg-[repeating-linear-gradient(100deg,transparent_0,transparent_56px,rgba(16,185,129,0.05)_58px,transparent_62px,transparent_120px)] blur-[2px] motion-safe:animate-[grid-drift_30s_ease-in-out_infinite]" />
          <div className="absolute -top-1/3 left-1/2 h-[150%] w-[120%] -translate-x-1/2 bg-[repeating-linear-gradient(80deg,transparent_0,transparent_90px,rgba(52,211,153,0.04)_92px,transparent_96px,transparent_180px)] blur-[3px] motion-safe:animate-[grid-drift_44s_ease-in-out_infinite_reverse]" />
        </div>
      )}

      <div
        className="absolute left-1/2 top-1/2 h-[140%] w-[34rem] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] bg-[linear-gradient(to_top,transparent,rgba(16,185,129,0.10)_38%,rgba(52,211,153,0.16)_55%,transparent_82%)] blur-[60px] dark:bg-[linear-gradient(to_top,transparent,rgba(16,185,129,0.16)_38%,rgba(16,185,129,0.26)_55%,transparent_82%)]"
        style={showAmbientAnimations ? { animation: "hvbBeam 9s ease-in-out infinite" } : undefined}
      />
      <div
        className="absolute left-1/2 top-[42%] h-[34rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.08] blur-[120px] dark:bg-emerald-400/[0.18]"
        style={showAmbientAnimations ? { animation: "hvbBreathe 10s ease-in-out infinite" } : undefined}
      />

      <motion.div style={parallaxStyle} className="absolute inset-0">
        <div className="absolute left-[-12%] top-[4%] h-[28rem] w-[28rem] rounded-full bg-emerald-400/[0.08] blur-[140px] dark:bg-emerald-400/[0.12]" />
        <div className="absolute right-[-10%] bottom-[2%] h-[26rem] w-[26rem] rounded-full bg-teal-400/[0.07] blur-[140px] dark:bg-teal-500/[0.12]" />
      </motion.div>

      {mounted && showAmbientAnimations && (
        <motion.div style={{ x: glowX, y: glowY }} className="absolute left-0 top-0">
          <div className="-ml-[16rem] -mt-[16rem] h-[32rem] w-[32rem] rounded-full bg-emerald-400/[0.04] blur-[110px] dark:bg-emerald-400/[0.07]" />
        </motion.div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_56%_44%_at_50%_42%,rgba(248,250,252,0.30),transparent_72%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(5,5,5,0.6)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <style>{`
        @keyframes hvbBreathe {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.85; }
          50% { transform: translate(-50%,-50%) scale(1.08); opacity: 1; }
        }
        @keyframes hvbBeam {
          0%, 100% { transform: translate(-50%,-50%) rotate(-2deg) scaleY(1); opacity: 0.7; }
          50% { transform: translate(-50%,-50%) rotate(-2deg) scaleY(1.06); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export const HeroVideoBackground = React.memo(HeroVideoBackgroundImpl);
