"use client";

import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Container, IPhoneMockup } from "@/components/system";

type Device = {
  src: string;
  alt: string;
  caption: string;
};

export function MobileShowcaseClient({ devices }: { devices: Device[] }) {
  const t = useTranslations("home.mobile");

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Ambient floor glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--glow-cyan),transparent_65%)] opacity-40 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <Container size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary/90">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_var(--glow-cyan)]" />
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("lead")}
          </p>
        </div>

        <div className="mt-16">
          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            speed={900}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 24,
              depth: 220,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              bulletClass:
                "inline-block h-1.5 w-6 rounded-full bg-border/60 transition-all cursor-pointer mx-1",
              bulletActiveClass: "!bg-primary !w-10",
            }}
            className="!pb-16"
          >
            {devices.map((d, i) => (
              <SwiperSlide key={i} className="!w-[280px] sm:!w-[300px]">
                <IPhoneMockup
                  src={d.src}
                  alt={d.alt}
                  caption={d.caption}
                  chassis={i % 2 === 0 ? "graphite" : "silver"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Tabs (decorative labels under the carousel) */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>{t("tabs.customer")}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-border" />
          <span>{t("tabs.delivery")}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-border" />
          <span>{t("tabs.admin")}</span>
        </div>
      </Container>
    </section>
  );
}
