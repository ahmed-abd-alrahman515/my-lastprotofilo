"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Code2, Database, Layers, Smartphone, Sparkles, Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/system/animated";

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  ctaProjects: string;
  ctaContact: string;
  badges: { years: string; label: string };
  positioning: {
    role: string;
    tag1: string;
    tag2: string;
    tag3: string;
    tag4: string;
  };
};

const techBadges = [
  { label: "Laravel", icon: Database },
  { label: "React", icon: Code2 },
  { label: "Next.js", icon: Layers },
  { label: "Mobile Apps", icon: Smartphone },
];

const codeSnippets = [
  { top: "8%", left: "4%", text: "GET /api/v1/users" },
  { top: "22%", left: "78%", text: "schema.create(...)" },
  { top: "68%", left: "2%", text: "Route::middleware('auth')" },
  { top: "82%", left: "72%", text: "useQuery({ key, fn })" },
  { top: "44%", left: "82%", text: "200 OK · 84ms" },
];

export function AboutHero({
  eyebrow,
  title,
  lead,
  ctaProjects,
  ctaContact,
  badges,
  positioning,
}: Props) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      {/* code snippet whispers */}
      <div className="pointer-events-none absolute inset-0 -z-[1]" aria-hidden="true">
        {codeSnippets.map((s) => (
          <span
            key={s.text}
            className="absolute font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/30 sm:text-[11px]"
            style={{ top: s.top, left: s.left }}
          >
            {s.text}
          </span>
        ))}
      </div>

      {/* architecture lines svg */}
      <svg
        className="pointer-events-none absolute inset-0 -z-[1] h-full w-full opacity-50"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="archGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(16,185,129,0)" />
            <stop offset="50%" stopColor="rgba(16,185,129,0.45)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </linearGradient>
        </defs>
        <path className="arch-line" d="M40 180 C260 80 420 260 640 200 S1000 120 1180 240" fill="none" stroke="url(#archGrad)" strokeWidth="1.2" />
        <path className="arch-line" style={{ animationDelay: "-2s" }} d="M60 620 C300 540 520 660 720 540 S1020 470 1180 600" fill="none" stroke="rgba(52,211,153,0.25)" strokeWidth="1" />
        <path className="arch-line" style={{ animationDelay: "-4s" }} d="M380 80 L560 360 L780 240 L1020 480" fill="none" stroke="rgba(94,234,212,0.22)" strokeWidth="1" />
        <circle cx="560" cy="360" r="3" fill="rgba(52,211,153,0.7)" />
        <circle cx="780" cy="240" r="3" fill="rgba(16,185,129,0.7)" />
        <circle cx="1020" cy="480" r="3" fill="rgba(94,234,212,0.7)" />
      </svg>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* LEFT — positioning */}
        <div className="relative">
          <AnimatedSection animation="fadeInLeft" delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {eyebrow}
            </span>
          </AnimatedSection>

          <AnimatedSection animation="fadeInLeft" delay={120}>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
              {title}
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fadeInLeft" delay={220}>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
              {lead}
            </p>
          </AnimatedSection>

          {/* positioning chips */}
          <AnimatedSection animation="fadeInUp" delay={320}>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="rounded-md border border-emerald-300/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
                {positioning.role}
              </span>
              <span className="rounded-md border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/80">{positioning.tag1}</span>
              <span className="rounded-md border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/80">{positioning.tag2}</span>
              <span className="rounded-md border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/80">{positioning.tag3}</span>
              <span className="rounded-md border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/80">{positioning.tag4}</span>
            </div>
          </AnimatedSection>

          {/* tech badges row */}
          <AnimatedSection animation="fadeInUp" delay={420}>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {techBadges.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-md border border-foreground/10 bg-foreground/[0.06] px-2.5 py-1.5 text-xs font-semibold text-foreground/90 backdrop-blur-md transition-colors hover:border-emerald-300/30 hover:text-emerald-100"
                >
                  <Icon className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection animation="fadeInUp" delay={520}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-600 text-white shadow-[0_18px_55px_-18px_rgba(16,185,129,0.7)] hover:from-emerald-400 hover:via-emerald-400 hover:to-emerald-500"
              >
                <Link href="/projects">
                  {ctaProjects}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-foreground/15 bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08]"
              >
                <Link href="/contact">{ctaContact}</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* RIGHT — composition */}
        <AnimatedSection animation="fadeInRight" delay={150} disableOnMobile>
          <div className="relative mx-auto w-full max-w-md">
            {/* ambient glow */}
            <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.18),transparent_60%)] blur-2xl" />

            {/* profile image frame */}
            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.05] p-2.5 shadow-[0_40px_120px_-30px_rgba(16,185,129,0.45)] backdrop-blur-xl">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-400/15 via-transparent to-emerald-500/15" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card">
                <Image
                  src="/image/myiamgeeelast.jpg"
                  alt="Ahmed Alaydi - Full-Stack Developer"
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                {/* scanline shimmer */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_50%,rgba(16,185,129,0.05)_50%,transparent_100%)] bg-[length:100%_4px]" />
              </div>
            </div>

            {/* 3+ years experience badge */}
            <div className="exp-badge-glow absolute -top-4 -left-4 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-emerald-300/40 bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-600 text-white shadow-[0_18px_50px_-12px_rgba(16,185,129,0.6)] sm:-top-6 sm:-left-6 sm:h-24 sm:w-24">
              <span className="text-2xl font-bold leading-none tracking-tight sm:text-3xl">{badges.years}</span>
              <span className="mt-1 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-emerald-50 sm:text-[9px]">
                {badges.label}
              </span>
            </div>

            {/* floating card: API */}
            <div className="float-card absolute -right-3 top-10 hidden w-44 rounded-lg border border-foreground/10 bg-foreground/[0.08] p-3 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:block">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-400/15 text-emerald-300">
                  <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">REST API</p>
                  <p className="font-mono text-[9px] text-emerald-200/80">200 OK · 84ms</p>
                </div>
              </div>
              <div className="mt-2 h-1 w-full rounded-full bg-foreground/10">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300" />
              </div>
            </div>

            {/* floating card: Database */}
            <div className="float-card-alt absolute -left-4 top-1/2 hidden w-44 -translate-y-1/2 rounded-lg border border-foreground/10 bg-foreground/[0.08] p-3 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:block">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-400/15 text-emerald-200">
                  <Database className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">MySQL</p>
                  <p className="font-mono text-[9px] text-emerald-100/80">SELECT * FROM users</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span className="h-1 flex-1 rounded-full bg-gradient-to-r from-emerald-400/70 to-emerald-300/70" />
                <span className="font-mono text-[8px] text-muted-foreground">12ms</span>
              </div>
            </div>

            {/* floating card: System */}
            <div className="float-card absolute -bottom-2 -right-4 hidden w-48 rounded-lg border border-foreground/10 bg-foreground/[0.08] p-3 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:block" style={{ animationDelay: "-3s" }}>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-400/15 text-teal-200">
                  <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">System</p>
                  <p className="font-mono text-[9px] text-teal-100/80">SaaS · ERP · CRM</p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1">
                <span className="h-1 rounded-full bg-emerald-300/80" />
                <span className="h-1 rounded-full bg-emerald-300/70" />
                <span className="h-1 rounded-full bg-emerald-300/60" />
              </div>
            </div>

            {/* corner brackets */}
            <span className="pointer-events-none absolute -top-2 -right-2 h-6 w-6 border-r-2 border-t-2 border-emerald-300/60" />
            <span className="pointer-events-none absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-emerald-300/60" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
