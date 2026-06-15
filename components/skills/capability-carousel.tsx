"use client";

import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";

export type CarouselAccent = "emerald" | "cyan" | "violet" | "amber" | "rose" | "sky";

export type CapabilityItem = {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  accent: CarouselAccent;
  /** Optional 0-100 proficiency — renders an animated bar when present. */
  proficiency?: number;
  /** Optional short label shown top-right (e.g. "3+ yrs"). */
  meta?: string;
  /** Optional chips rendered at the bottom of the card. */
  tags?: string[];
};

const accentTheme: Record<
  CarouselAccent,
  { chip: string; icon: string; bar: string; ring: string; glow: string; text: string }
> = {
  emerald: {
    chip: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    icon: "border-emerald-200/25 bg-emerald-200/10 text-emerald-200",
    bar: "from-emerald-300/80 to-emerald-300/70",
    ring: "border-emerald-300/40 shadow-[0_0_0_1px_rgba(110,231,183,0.28),0_50px_120px_-32px_rgba(16,185,129,0.55)]",
    glow: "bg-emerald-400/25",
    text: "text-emerald-200",
  },
  cyan: {
    chip: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    icon: "border-emerald-200/25 bg-emerald-200/10 text-emerald-200",
    bar: "from-emerald-300/80 to-emerald-300/70",
    ring: "border-emerald-300/40 shadow-[0_0_0_1px_rgba(52,211,153,0.28),0_50px_120px_-32px_rgba(5,150,105,0.55)]",
    glow: "bg-emerald-400/25",
    text: "text-emerald-200",
  },
  violet: {
    chip: "border-teal-300/30 bg-teal-300/10 text-teal-200",
    icon: "border-teal-200/25 bg-teal-200/10 text-teal-200",
    bar: "from-teal-300/80 to-teal-300/70",
    ring: "border-teal-300/40 shadow-[0_0_0_1px_rgba(153,246,228,0.28),0_50px_120px_-32px_rgba(13,148,136,0.55)]",
    glow: "bg-teal-400/25",
    text: "text-teal-200",
  },
  amber: {
    chip: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    icon: "border-emerald-200/25 bg-emerald-200/10 text-emerald-200",
    bar: "from-emerald-300/80 to-emerald-300/70",
    ring: "border-emerald-300/40 shadow-[0_0_0_1px_rgba(52,211,153,0.28),0_50px_120px_-32px_rgba(16,185,129,0.55)]",
    glow: "bg-emerald-400/25",
    text: "text-emerald-200",
  },
  rose: {
    chip: "border-teal-300/30 bg-teal-300/10 text-teal-200",
    icon: "border-teal-200/25 bg-teal-200/10 text-teal-200",
    bar: "from-teal-300/80 to-teal-300/70",
    ring: "border-teal-300/40 shadow-[0_0_0_1px_rgba(153,246,228,0.28),0_50px_120px_-32px_rgba(13,148,136,0.55)]",
    glow: "bg-teal-400/25",
    text: "text-teal-200",
  },
  sky: {
    chip: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    icon: "border-emerald-200/25 bg-emerald-200/10 text-emerald-200",
    bar: "from-emerald-300/80 to-emerald-300/70",
    ring: "border-emerald-300/40 shadow-[0_0_0_1px_rgba(52,211,153,0.28),0_50px_120px_-32px_rgba(2,132,199,0.55)]",
    glow: "bg-emerald-400/25",
    text: "text-emerald-200",
  },
};

function CapabilityCard({ item, active }: { item: CapabilityItem; active: boolean }) {
  const t = useTranslations("skills.v2.ui");
  const theme = accentTheme[item.accent];
  const Icon = item.icon;
  return (
    <div
      className={cn(
        "group/cap relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl border bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 backdrop-blur-xl transition-[border-color,box-shadow] duration-500 sm:p-7",
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
      {/* Faint grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-500 group-hover/cap:scale-105",
            theme.icon,
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        {item.meta && (
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {item.meta}
          </span>
        )}
      </div>

      <h3 className="relative mt-5 text-xl font-semibold tracking-tight text-foreground">
        {item.title}
      </h3>
      <p className="relative mt-2.5 text-sm leading-relaxed text-foreground/75">{item.body}</p>

      {typeof item.proficiency === "number" && (
        <div className="relative mt-auto pt-6">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>{t("proficiency")}</span>
            <span className={cn("font-mono", theme.text)}>{item.proficiency}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/5">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-[width] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                theme.bar,
              )}
              style={{ width: active ? `${item.proficiency}%` : "0%" }}
            />
          </div>
        </div>
      )}

      {item.tags && item.tags.length > 0 && (
        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium",
                theme.chip,
              )}
            >
              <ChevronRight className="h-3 w-3 opacity-70" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * CapabilityCarousel — premium horizontal slider.
 * Desktop: 3 cards with center focus. Mobile: 1 card.
 * Drag/swipe, arrows, keyboard, and a progress bar. RTL-aware (Swiper reads `dir`).
 */
export function CapabilityCarousel({
  items,
  ariaLabel,
}: {
  items: CapabilityItem[];
  ariaLabel: string;
}) {
  const t = useTranslations("skills.v2.ui");
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
    <div className="cap-carousel relative">
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
          640: { slidesPerView: 1.8, spaceBetween: 22 },
          1024: { slidesPerView: 3, spaceBetween: 26 },
        }}
        className="!overflow-visible !px-1 !py-4"
        aria-label={ariaLabel}
      >
        {items.map((item, i) => (
          <SwiperSlide key={item.key} className="h-auto">
            <CapabilityCard item={item} active={i === activeIndex} />
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

        {/* Progress bar */}
        <div className="relative h-1.5 w-40 overflow-hidden rounded-full bg-foreground/10 sm:w-56">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-300/80 via-emerald-300/80 to-teal-300/80 transition-[width] duration-300 ease-out rtl:left-auto rtl:right-0"
            style={{
              width: `${Math.max(
                10,
                ((activeIndex + 1) / items.length) * 100,
              ).toFixed(2)}%`,
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

      {/* Slide counter */}
      <p className="mt-4 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="text-foreground/70">{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="h-px w-8 bg-foreground/20" />
        <span>{String(items.length).padStart(2, "0")}</span>
        <span className="hidden sm:inline">· {t("dragHint")}</span>
      </p>

      <style>{`
        .cap-carousel .swiper-slide {
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease;
          transform: scale(0.9);
          opacity: 0.45;
        }
        .cap-carousel .swiper-slide-active {
          transform: scale(1);
          opacity: 1;
        }
        @media (max-width: 1023px) {
          .cap-carousel .swiper-slide { transform: scale(0.94); opacity: 0.55; }
          .cap-carousel .swiper-slide-active { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cap-carousel .swiper-slide { transition: none; }
        }
      `}</style>
    </div>
  );
}
