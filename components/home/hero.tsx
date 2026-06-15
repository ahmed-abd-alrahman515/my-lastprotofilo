"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, Download, Mail, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container, Magnetic } from "@/components/system";
import { useIsMobile } from "@/components/projects/use-projects-ui";
import { HeroVideoBackground } from "@/components/home/hero-video-background";

const ease = [0.16, 1, 0.3, 1] as const;
const stackKeys = ["laravel", "react", "next", "mobile"] as const;

/* Cinematic enterprise / data-center video background (royalty-free, Mixkit
 * License — no attribution required). A symmetrical blue server corridor that
 * reads as serious production infrastructure, not a generic coding clip.
 * Swap the file in /public/videos to change it; the poster image is the
 * mobile / reduced-motion / fallback frame.
 * Alternate clip shipped alongside: /videos/hero-cyber-alt.mp4 (cyber HUD). */
const HERO_VIDEO_SRC = "/videos/hero-enterprise.mp4";
const HERO_VIDEO_POSTER = "/videos/hero-enterprise-poster.jpg";

/* ──────────────────────────────────────────────────────────────────────────
 * Headline animation engine. Splits the (translated) headline into words and
 * plays a cinematic three-phase reveal:
 *   1. first words: letters fall from the sky (rain)
 *   2. middle words: enter from the left / right
 *   3. last words: rise from the bottom-left / bottom-right, with glow
 * Timings are deterministic and scale down on mobile / disable on reduced motion.
 * ────────────────────────────────────────────────────────────────────────── */
type WordMode = "drop" | "left" | "right" | "bottomLeft" | "bottomRight";

interface PlannedWord {
  text: string;
  mode: WordMode;
  highlight: boolean;
  delay: number;
  letterDelays: number[];
}

interface HeadlinePlan {
  words: PlannedWord[];
  done: number;
}

function planHeadline(headline: string, isMobile: boolean): HeadlinePlan {
  const words = headline.replace(/[-–]/g, " ").split(/\s+/).filter(Boolean);
  const n = words.length;

  const dropCount = Math.max(1, Math.min(n - 2, Math.round(n * 0.4)));
  const bottomCount = Math.min(2, Math.max(0, n - dropCount));
  const middleStart = dropCount;
  const middleEnd = n - bottomCount;

  const step = isMobile ? 0.028 : 0.042;
  const start = 0.2;
  const wordGap = isMobile ? 0.08 : 0.12;

  let letterCursor = 0;
  let dropDelayMax = start;

  const planned: PlannedWord[] = words.map((text, i) => {
    if (i < dropCount) {
      const letterDelays = Array.from({ length: text.length }).map(() => {
        const d = start + letterCursor * step;
        letterCursor += 1;
        dropDelayMax = Math.max(dropDelayMax, d);
        return d;
      });
      letterCursor += 1;
      return { text, mode: "drop", highlight: false, delay: 0, letterDelays };
    }
    return { text, mode: "left", highlight: false, delay: 0, letterDelays: [] };
  });

  const dropEnd = dropDelayMax + 0.4;

  const middleLen = middleEnd - middleStart;
  let middleOrder = 0;
  for (let i = middleStart; i < middleEnd; i++) {
    const fromLeft = middleOrder < middleLen / 2;
    planned[i].mode = fromLeft ? "left" : "right";
    planned[i].delay = dropEnd + middleOrder * wordGap;
    middleOrder += 1;
  }
  const middleDone = dropEnd + Math.max(0, middleLen - 1) * wordGap + 0.25;

  let bottomOrder = 0;
  for (let i = middleEnd; i < n; i++) {
    planned[i].mode = bottomOrder === 0 ? "bottomLeft" : "bottomRight";
    planned[i].delay = middleDone + bottomOrder * (isMobile ? 0.1 : 0.15);
    bottomOrder += 1;
  }
  if (n > 0) planned[n - 1].highlight = true;

  const lastDelay = planned.reduce(
    (m, w) => Math.max(m, w.delay, ...(w.letterDelays.length ? w.letterDelays : [0])),
    0,
  );

  return { words: planned, done: lastDelay + 0.55 };
}

const WORD_VARIANTS: Record<Exclude<WordMode, "drop">, { x?: number; y?: number }> = {
  left: { x: -70 },
  right: { x: 70 },
  bottomLeft: { x: -50, y: 60 },
  bottomRight: { x: 50, y: 60 },
};

/** Adaptive accent — readable in light mode, luminous in dark mode. */
const HIGHLIGHT_CLS =
  "bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(16,185,129,0.25)] dark:from-emerald-200 dark:via-emerald-400 dark:to-teal-300 dark:drop-shadow-[0_0_28px_rgba(16,185,129,0.45)]";

function AnimatedHeadline({ plan, reduce }: { plan: HeadlinePlan; reduce: boolean }) {
  return (
    <h1 className="mt-7 flex max-w-5xl flex-wrap justify-center gap-x-[0.28em] gap-y-1 text-balance text-center text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
      {plan.words.map((word, wi) => {
        const highlightCls = word.highlight ? `relative ${HIGHLIGHT_CLS}` : "";

        if (word.mode === "drop") {
          return (
            <span key={wi} className={`inline-flex ${highlightCls}`}>
              {word.text.split("").map((ch, ci) => (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={reduce ? false : { y: -120, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: reduce ? 0 : word.letterDelays[ci], ease }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          );
        }

        const offset = WORD_VARIANTS[word.mode];
        return (
          <motion.span
            key={wi}
            className={`inline-block ${highlightCls}`}
            initial={reduce ? false : { opacity: 0, ...offset, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: word.mode.startsWith("bottom") ? 0.85 : 0.7,
              delay: reduce ? 0 : word.delay,
              ease,
            }}
          >
            {word.highlight && (
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent opacity-40 blur-2xl dark:from-emerald-200 dark:via-emerald-400 dark:to-teal-300 dark:opacity-60"
              >
                {word.text}
              </span>
            )}
            {word.text}
          </motion.span>
        );
      })}
    </h1>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

export function Hero() {
  const t = useTranslations("home.hero");
  const tA = useTranslations("actions");
  const reduce = useReducedMotion() ?? false;
  const isMobile = useIsMobile();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Parallax (normalized) + raw cursor position (px) for the follow-glow.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 60, damping: 20, mass: 0.5 });
  const ry = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.5 });

  const gxRaw = useMotionValue(0);
  const gyRaw = useMotionValue(0);
  const glowX = useSpring(gxRaw, { stiffness: 120, damping: 22, mass: 0.6 });
  const glowY = useSpring(gyRaw, { stiffness: 120, damping: 22, mass: 0.6 });

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduce) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
      gxRaw.set(e.clientX - rect.left);
      gyRaw.set(e.clientY - rect.top);
    },
    [mx, my, gxRaw, gyRaw, reduce],
  );

  const plan = React.useMemo(() => planHeadline(t("headlineV2"), isMobile), [t, isMobile]);
  const after = (offset: number) => plan.done + offset;

  return (
    <section
      onMouseMove={onMouseMove}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <HeroVideoBackground
        videoSrc={HERO_VIDEO_SRC}
        poster={HERO_VIDEO_POSTER}
        reduce={reduce}
        isMobile={isMobile}
        mounted={mounted}
        rxParallax={rx}
        ryParallax={ry}
        glowX={glowX}
        glowY={glowY}
      />

      <Container size="lg" className="relative">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* Status pill */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/55 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-[0_1px_12px_-9px_rgba(16,185,129,0.3)] backdrop-blur-md dark:border-emerald-400/20 dark:bg-card/30 dark:shadow-none">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {t("status")}
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mt-8 font-mono text-[11px] uppercase tracking-[0.4em] text-primary/90 dark:text-primary/80"
          >
            {t("eyebrow")}
          </motion.p>

          {/* Cinematic three-phase headline */}
          <AnimatedHeadline plan={plan} reduce={reduce} />

          {/* Description — soft glass card, fades up after the headline, glows on hover */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : after(-0.4), ease }}
            className="group mt-9 max-w-2xl rounded-2xl border border-emerald-500/15 bg-emerald-50/45 px-6 py-5 shadow-[0_2px_18px_-14px_rgba(16,185,129,0.3)] backdrop-blur-md transition-all duration-500 hover:border-emerald-400/40 hover:bg-emerald-50/65 hover:shadow-[0_4px_26px_-14px_rgba(16,185,129,0.4)] dark:border-emerald-400/15 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-emerald-300/45 dark:hover:bg-white/[0.06] dark:hover:shadow-[0_0_44px_-8px_rgba(16,185,129,0.4)]"
          >
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground/90 sm:text-base">
              {t("leadV2")}
            </p>
          </motion.div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            {/* View Projects — enters from the left, magnetic, cyan glow */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: reduce ? 0 : after(0.1), ease }}
              className="w-full sm:w-auto"
            >
              <Magnetic className="w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 w-full rounded-full px-7 text-sm font-medium shadow-[0_12px_40px_-12px_var(--glow-cyan)] transition-shadow duration-300 hover:shadow-[0_16px_52px_-10px_rgba(16,185,129,0.55)] sm:w-auto"
                >
                  <Link href="/projects">
                    {tA("viewProjects")}
                    <ArrowRight className="ms-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>

            {/* Contact Me — enters from the right, glass, hover glow */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: reduce ? 0 : after(0.22), ease }}
              className="w-full sm:w-auto"
            >
              <Magnetic className="w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-full border-emerald-500/25 bg-emerald-50/50 px-7 text-sm font-medium backdrop-blur-md transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-50/75 hover:shadow-[0_2px_22px_-14px_rgba(16,185,129,0.45)] sm:w-auto dark:border-emerald-400/25 dark:bg-card/30 dark:hover:bg-card/50 dark:hover:shadow-[0_0_36px_-10px_rgba(16,185,129,0.5)]"
                >
                  <Link href="/contact">
                    <Mail className="me-2 h-4 w-4" />
                    {tA("contactMe")}
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Download CV — appears after both buttons, minimal secondary style */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : after(0.4), ease }}
            className="mt-6"
          >
            <a
              href="/Ahmed_Samir.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              <Download className="h-3.5 w-3.5" />
              {tA("downloadCv")}
            </a>
          </motion.div>

          {/* Minimal stack strip */}
          <motion.ul
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduce ? 0 : after(0.6), ease }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/70"
          >
            {stackKeys.map((k, i) => (
              <React.Fragment key={k}>
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-muted-foreground/30" />}
                <li>{t(`stack.${k}`)}</li>
              </React.Fragment>
            ))}
          </motion.ul>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : after(0.8), ease }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-muted-foreground/60"
        >
          <span>{t("scrollHint")}</span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.div>
      </Container>
    </section>
  );
}
