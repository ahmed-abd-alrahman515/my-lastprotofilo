"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/system";

const PARTICLES = [
  { left: 8, top: 24, s: 2.2, d: 0.4, dur: 14, o: 0.4 },
  { left: 18, top: 70, s: 1.4, d: 2.6, dur: 18, o: 0.3 },
  { left: 30, top: 40, s: 2.6, d: 1.2, dur: 16, o: 0.28 },
  { left: 42, top: 80, s: 1.6, d: 3.4, dur: 20, o: 0.24 },
  { left: 54, top: 30, s: 2.0, d: 0.8, dur: 15, o: 0.36 },
  { left: 64, top: 64, s: 1.3, d: 4.2, dur: 19, o: 0.3 },
  { left: 74, top: 22, s: 2.4, d: 1.8, dur: 17, o: 0.26 },
  { left: 84, top: 72, s: 1.5, d: 2.0, dur: 21, o: 0.34 },
  { left: 92, top: 44, s: 1.8, d: 5.0, dur: 14, o: 0.3 },
  { left: 12, top: 52, s: 1.2, d: 3.0, dur: 22, o: 0.22 },
  { left: 48, top: 56, s: 2.2, d: 1.0, dur: 16, o: 0.32 },
  { left: 68, top: 38, s: 1.6, d: 2.4, dur: 18, o: 0.28 },
];

export function PremiumCta() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="relative isolate overflow-hidden py-32 sm:py-44">
      {/* animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* moving gradient blobs */}
        <motion.div
          className="absolute left-[10%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-emerald-500/[0.14] blur-[140px]"
          animate={reduced ? undefined : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[8%] h-[36rem] w-[36rem] rounded-full bg-teal-500/[0.12] blur-[150px]"
          animate={reduced ? undefined : { x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.10] blur-[120px]" />

        {/* grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(52,211,153,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,211,153,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

        {/* particles */}
        {!reduced &&
          PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-emerald-200"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.s, height: p.s, boxShadow: "0 0 10px rgba(52,211,153,0.7)" }}
              animate={{ y: [0, -60, 0], opacity: [0, p.o, 0] }}
              transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

        {/* sweeping beam */}
        {!reduced && (
          <motion.div
            className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-emerald-300/[0.05] to-transparent"
            animate={{ top: ["-15%", "115%"] }}
            transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>

      <Container size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new systems
          </motion.span>

          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-balance text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Have a system worth
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
              building right?
            </span>
          </motion.h2>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/75 sm:text-lg"
          >
            Whether it&apos;s an API, a dashboard, or a full mobile ecosystem — let&apos;s
            turn the idea into something production-ready.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="h-13 bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-600 px-8 text-base text-white shadow-[0_24px_70px_-18px_rgba(16,185,129,0.75)] hover:from-emerald-400 hover:via-emerald-400 hover:to-emerald-500"
            >
              <Link href="/contact">
                <Mail className="h-4 w-4" aria-hidden />
                Start a conversation
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 border-foreground/15 bg-foreground/[0.04] px-8 text-base text-foreground hover:bg-foreground/[0.08]"
            >
              <Link href="/projects">
                See the work
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
