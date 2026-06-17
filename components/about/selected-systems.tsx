"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container, Eyebrow, Heading, Lead, Reveal } from "@/components/system";
import { cn } from "@/lib/utils";

interface SystemSlide {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  rgb: string;
  num: string;
}

const SLIDES: SystemSlide[] = [
  {
    id: "awlad-ragab-wholesale-platform",
    title: "Awlad Ragab",
    tagline: "Wholesale commerce ecosystem",
    description: "Admin dashboard, Laravel API, plus customer and sales-rep mobile apps wired into one order-management backend.",
    image: "/image/awladragab/image_1_1_1.PNG",
    tags: ["Laravel", "React Native", "B2B", "Orders"],
    rgb: "103, 232, 249",
    num: "01",
  },
  {
    id: "project_1",
    title: "Locate",
    tagline: "Multi-store admin platform",
    description: "A centralized Laravel dashboard to manage stores, owners, products, and orders with role-based access.",
    image: "/image/locate.png",
    tags: ["Laravel", "Dashboard", "RBAC", "MySQL"],
    rgb: "196, 181, 253",
    num: "02",
  },
  {
    id: "portfolio-cms-dashboard",
    title: "Portfolio CMS",
    tagline: "Dynamic content engine",
    description: "A full Laravel CMS driving a live portfolio - projects, media, and every content section, with Cloudinary media.",
    image: "/image/dashboard.png",
    tags: ["Laravel", "CMS", "Cloudinary", "Media"],
    rgb: "110, 231, 183",
    num: "03",
  },
  {
    id: "spids-dashboard-cms",
    title: "SPIDS",
    tagline: "Conference CMS admin panel",
    description: "A React admin panel over a Laravel REST backend giving full control of the SPIDS Week 2025 platform content.",
    image: "/image/dashspides.PNG",
    tags: ["React", "Laravel", "REST", "CMS"],
    rgb: "252, 211, 77",
    num: "04",
  },
];

function SlideCard({ slide, index }: { slide: SystemSlide; index: number }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-[85vw] shrink-0 snap-center sm:w-[68vw] lg:w-[46rem]"
    >
      <Link
        href={`/projects/${slide.id}`}
        className="block overflow-hidden rounded-[1.75rem] border bg-card/50 backdrop-blur-xl transition-all duration-500"
        style={{ borderColor: `rgba(${slide.rgb},0.3)` }}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="(min-width:1024px) 46rem, 85vw"
            className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-52 w-2/3 -translate-x-1/2 rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: `rgba(${slide.rgb},0.35)` }}
          />
          <span className="pointer-events-none absolute inset-0 -translate-x-[120%] -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[120%]" />

          <span
            className="absolute left-5 top-5 rounded-full border bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md"
            style={{ borderColor: `rgba(${slide.rgb},0.4)`, color: `rgb(${slide.rgb})` }}
          >
            {slide.num} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        <div className="relative p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em]" style={{ color: `rgb(${slide.rgb})` }}>
            {slide.tagline}
          </p>
          <h3 className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {slide.title}
            <ArrowUpRight className="h-5 w-5 text-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </h3>
          <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-foreground/75 sm:text-base">{slide.description}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {slide.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                style={{ borderColor: `rgba(${slide.rgb},0.3)`, background: `rgba(${slide.rgb},0.06)` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SelectedSystems() {
  const t = useTranslations("home.selectedSystems");
  const tProjects = useTranslations("projects.labels");
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container size="xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <Heading as="h2" size="md" className="mt-4">
                {t("heading")}
              </Heading>
            </Reveal>
            <Reveal delay={0.12}>
              <Lead className="mt-5">{t("lead")}</Lead>
            </Reveal>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label={tProjects("previous")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.04] transition-all hover:border-foreground/30 hover:bg-foreground/[0.08]"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label={tProjects("next")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.04] transition-all hover:border-foreground/30 hover:bg-foreground/[0.08]"
            >
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={scrollerRef}
        className={cn(
          "mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-8",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <div aria-hidden className="hidden shrink-0 lg:block lg:w-[max(0px,calc((100vw-46rem)/2-2rem))]" />
        {SLIDES.map((slide, i) => (
          <SlideCard key={slide.id} slide={slide} index={i} />
        ))}
        <div aria-hidden className="shrink-0 w-4 sm:w-6 lg:w-[max(0px,calc((100vw-46rem)/2-2rem))]" />
      </div>
    </section>
  );
}
