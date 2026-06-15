"use client";

import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import "swiper/css";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type ServiceAccent = "cyan" | "blue" | "violet" | "emerald" | "amber" | "rose";

export type ServiceSlide = {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: ServiceAccent;
  title: string;
  description: string;
  deliver: string;
  value: string;
  tags: string[];
};

const accentTheme: Record<
  ServiceAccent,
  { icon: string; ring: string; glow: string; text: string; chip: string }
> = {
  cyan: {
    icon: "border-emerald-200/25 bg-emerald-200/10 text-emerald-200",
    ring: "border-emerald-300/40 shadow-[0_0_0_1px_rgba(52,211,153,0.28),0_50px_120px_-32px_rgba(5,150,105,0.55)]",
    glow: "bg-emerald-400/25",
    text: "text-emerald-200",
    chip: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  },
  blue: {
    icon: "border-emerald-200/25 bg-emerald-200/10 text-emerald-200",
    ring: "border-emerald-300/40 shadow-[0_0_0_1px_rgba(147,197,253,0.28),0_50px_120px_-32px_rgba(5,150,105,0.55)]",
    glow: "bg-emerald-400/25",
    text: "text-emerald-200",
    chip: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  },
  violet: {
    icon: "border-teal-200/25 bg-teal-200/10 text-teal-200",
    ring: "border-teal-300/40 shadow-[0_0_0_1px_rgba(153,246,228,0.28),0_50px_120px_-32px_rgba(13,148,136,0.55)]",
    glow: "bg-teal-400/25",
    text: "text-teal-200",
    chip: "border-teal-300/30 bg-teal-300/10 text-teal-200",
  },
  emerald: {
    icon: "border-emerald-200/25 bg-emerald-200/10 text-emerald-200",
    ring: "border-emerald-300/40 shadow-[0_0_0_1px_rgba(110,231,183,0.28),0_50px_120px_-32px_rgba(16,185,129,0.55)]",
    glow: "bg-emerald-400/25",
    text: "text-emerald-200",
    chip: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  },
  amber: {
    icon: "border-emerald-200/25 bg-emerald-200/10 text-emerald-200",
    ring: "border-emerald-300/40 shadow-[0_0_0_1px_rgba(52,211,153,0.28),0_50px_120px_-32px_rgba(16,185,129,0.55)]",
    glow: "bg-emerald-400/25",
    text: "text-emerald-200",
    chip: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  },
  rose: {
    icon: "border-teal-200/25 bg-teal-200/10 text-teal-200",
    ring: "border-teal-300/40 shadow-[0_0_0_1px_rgba(153,246,228,0.28),0_50px_120px_-32px_rgba(13,148,136,0.55)]",
    glow: "bg-teal-400/25",
    text: "text-teal-200",
    chip: "border-teal-300/30 bg-teal-300/10 text-teal-200",
  },
};

function ServiceCard({
  slide,
  index,
  active,
}: {
  slide: ServiceSlide;
  index: number;
  active: boolean;
}) {
  const t = useTranslations("services.v2.ui");
  const theme = accentTheme[slide.accent];
  const Icon = slide.icon;

  return (
    <div
      className={cn(
        "group/svc relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-3xl border bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 backdrop-blur-xl transition-[border-color,box-shadow] duration-500 sm:p-7",
        active ? cn("border-transparent", theme.ring) : "border-foreground/10",
      )}
    >
      {/* Active glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-24 left-1/2 h-52 w-[72%] -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-700",
          theme.glow,
          active ? "opacity-100" : "opacity-0",
        )}
      />
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-500 group-hover/svc:scale-105",
            theme.icon,
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          /{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="relative mt-5 text-xl font-semibold tracking-tight text-foreground">
        {slide.title}
      </h3>
      <p className="relative mt-2.5 text-sm leading-relaxed text-foreground/75">
        {slide.description}
      </p>

      {/* Deliver + Value */}
      <div className="relative mt-5 space-y-2.5">
        <div className="flex items-start gap-2.5">
          <span
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
              theme.chip,
            )}
          >
            <Check className="h-3 w-3" />
          </span>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              {t("deliver")}
            </div>
            <p className="text-sm leading-snug text-foreground/85">{slide.deliver}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <span
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
              theme.chip,
            )}
          >
            <Sparkles className="h-3 w-3" />
          </span>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              {t("value")}
            </div>
            <p className="text-sm leading-snug text-foreground/85">{slide.value}</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {slide.tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "rounded-md border px-2 py-0.5 text-[11px] font-medium",
              theme.chip,
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="relative mt-auto pt-6">
        <Link
          href="/contact"
          className={cn(
            "group/cta inline-flex items-center gap-2 rounded-full border bg-foreground/[0.04] px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-foreground/[0.08]",
            theme.ring.split(" ")[0],
          )}
        >
          {t("discuss")}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

/**
 * ServicesCarousel — premium horizontal slider for rich service cards.
 * Desktop: 3 cards, center focus. Mobile: 1 card. Drag, arrows, keyboard, progress bar.
 * RTL-aware (Swiper reads `dir`).
 */
export function ServicesCarousel({
  slides,
  ariaLabel,
}: {
  slides: ServiceSlide[];
  ariaLabel: string;
}) {
  const t = useTranslations("services.v2.ui");
  const [swiper, setSwiper] = React.useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const sync = React.useCallback((s: SwiperClass) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
    setActiveIndex(s.realIndex ?? s.activeIndex);
  }, []);

  return (
    <div className="svc-carousel relative">
      <Swiper
        modules={[Navigation, Pagination, Keyboard, A11y, Mousewheel]}
        onSwiper={(s) => {
          setSwiper(s);
          sync(s);
        }}
        onSlideChange={sync}
        centeredSlides
        grabCursor
        slidesPerView={1.1}
        spaceBetween={18}
        keyboard={{ enabled: true }}
        watchSlidesProgress
        a11y={{ enabled: true, containerRoleDescriptionMessage: "carousel" }}
        breakpoints={{
          640: { slidesPerView: 1.7, spaceBetween: 22 },
          1024: { slidesPerView: 3, spaceBetween: 26 },
        }}
        className="!overflow-visible !px-1 !py-4"
        aria-label={ariaLabel}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.key} className="h-auto">
            <ServiceCard slide={slide} index={i} active={i === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="mt-7 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => swiper?.slidePrev()}
          disabled={isBeginning}
          aria-label={t("prev")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.04] text-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/[0.08] disabled:cursor-not-allowed disabled:opacity-30 rtl:rotate-180"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className="relative h-1.5 w-40 overflow-hidden rounded-full bg-foreground/10 sm:w-56">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-300/80 via-emerald-300/80 to-emerald-300/80 transition-[width] duration-300 ease-out rtl:left-auto rtl:right-0"
            style={{
              width: `${Math.max(8, ((activeIndex + 1) / slides.length) * 100).toFixed(2)}%`,
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => swiper?.slideNext()}
          disabled={isEnd}
          aria-label={t("next")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.04] text-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/[0.08] disabled:cursor-not-allowed disabled:opacity-30 rtl:rotate-180"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-4 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="text-foreground/70">{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="h-px w-8 bg-foreground/20" />
        <span>{String(slides.length).padStart(2, "0")}</span>
        <span className="hidden sm:inline">· {t("dragHint")}</span>
      </p>

      <style>{`
        .svc-carousel .swiper-slide {
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease;
          transform: scale(0.9);
          opacity: 0.45;
        }
        .svc-carousel .swiper-slide-active { transform: scale(1); opacity: 1; }
        @media (max-width: 1023px) {
          .svc-carousel .swiper-slide { transform: scale(0.94); opacity: 0.55; }
          .svc-carousel .swiper-slide-active { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-carousel .swiper-slide { transition: none; }
        }
      `}</style>
    </div>
  );
}
