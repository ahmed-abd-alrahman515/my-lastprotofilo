"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container, Eyebrow, Magnetic } from "@/components/system";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/skills/animated-counter";

const stats = [
  { value: 3, suffix: "+", label: "Years building systems" },
  { value: 13, suffix: "+", label: "Production systems" },
  { value: 20, suffix: "+", label: "Technologies shipped" },
  { value: 4, suffix: "", label: "Platform domains" },
] as const;

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function AboutIntro() {
  const t = useTranslations("about");
  const tA = useTranslations("actions");
  const reduced = useReducedMotion() ?? false;

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Subtle parallax on the portrait as the section scrolls through view.
  const yRaw = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 48, reduced ? 0 : -48]);
  const y = useSpring(yRaw, { stiffness: 60, damping: 20, mass: 0.6 });

  return (
    <section id="about" className="relative isolate overflow-x-clip py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow-cyan),transparent_65%)] opacity-30 blur-3xl"
      />

      <Container size="lg">
        <div ref={sectionRef} className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* LEFT — portrait */}
          <motion.div
            variants={reveal}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div
              aria-hidden
              className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.25),transparent_60%)] blur-2xl"
            />
            <motion.div
              style={reduced ? undefined : { y }}
              className="relative overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-foreground/[0.04] p-2.5 shadow-[0_50px_140px_-40px_rgba(16,185,129,0.5)] backdrop-blur-xl"
            >
              <div className="absolute inset-0 -z-10 rounded-[1.75rem] bg-gradient-to-br from-emerald-400/15 via-transparent to-teal-500/15" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-card">
                <Image
                  src="/image/myiamgeeelast.jpg"
                  alt="Ahmed Alaydi — Full-Stack Developer"
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* floating experience badge */}
            <div className="absolute -bottom-5 -right-3 flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-emerald-300/40 bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-600 text-white shadow-[0_18px_50px_-12px_rgba(16,185,129,0.6)] sm:h-24 sm:w-24">
              <span className="text-2xl font-bold leading-none tracking-tight sm:text-3xl">{t("expBadge.years")}</span>
              <span className="mt-1 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-emerald-50 sm:text-[9px]">
                {t("expBadge.label")}
              </span>
            </div>

            {/* corner brackets */}
            <span className="pointer-events-none absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-emerald-300/60" />
            <span className="pointer-events-none absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-emerald-300/60" />
          </motion.div>

          {/* RIGHT — story */}
          <div>
            <motion.div variants={reveal} custom={1} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            </motion.div>

            <motion.h2
              variants={reveal}
              custom={2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Ahmed Alaydi
            </motion.h2>

            <motion.p
              variants={reveal}
              custom={3}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-2 font-mono text-sm uppercase tracking-[0.22em] text-primary/90"
            >
              {t("positioning.role")}
            </motion.p>

            <motion.div
              variants={reveal}
              custom={4}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-muted-foreground"
            >
              <p>{t("profile.p1")}</p>
              <p>{t("profile.p2")}</p>
            </motion.div>

            {/* animated stats */}
            <motion.div
              variants={reveal}
              custom={5}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border/60 bg-card/40 px-4 py-4 text-center backdrop-blur-sm"
                >
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix}
                    className="bg-gradient-to-br from-emerald-300 via-emerald-200 to-emerald-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl"
                  />
                  <div className="mt-1.5 text-[11px] leading-tight text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={reveal}
              custom={6}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-600 px-6 text-white shadow-[0_18px_55px_-18px_rgba(16,185,129,0.7)] hover:from-emerald-400 hover:via-emerald-400 hover:to-emerald-500"
                >
                  <a href="/Ahmed_Samir.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="me-2 h-4 w-4" />
                    {tA("downloadCv")}
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group h-12 rounded-full border-border/60 bg-card/40 px-6 backdrop-blur-md hover:bg-card/70"
                >
                  <Link href="/contact">
                    {tA("contactMe")}
                    <ArrowRight className="ms-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
