"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDownRight, GitCommitVertical, Orbit } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePerformanceProfile } from "@/components/projects/use-projects-ui";

export type ViewMode = "timeline" | "orbital";

const MODES: {
  key: ViewMode;
  icon: React.ReactNode;
  labelKey: string;
  descKey: string;
}[] = [
  {
    key: "timeline",
    icon: <GitCommitVertical className="h-4 w-4" />,
    labelKey: "modeTimeline",
    descKey: "modeTimelineDesc",
  },
  {
    key: "orbital",
    icon: <Orbit className="h-4 w-4" />,
    labelKey: "modeOrbital",
    descKey: "modeOrbitalDesc",
  },
];

function ModeSwitcherImpl({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  const t = useTranslations("projects.labels");
  const { shouldReduceEffects } = usePerformanceProfile();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/8 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-200/85"
          animate={
            shouldReduceEffects
              ? undefined
              : { boxShadow: ["0 0 0 rgba(16,185,129,0)", "0 0 26px rgba(16,185,129,0.18)", "0 0 0 rgba(16,185,129,0)"] }
          }
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            animate={shouldReduceEffects ? undefined : { y: [0, 3, 0], x: [0, 2, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDownRight className="h-3.5 w-3.5" />
          </motion.span>
          {t("viewModeHint")}
        </motion.div>
        <p className="max-w-sm text-sm text-muted-foreground">{t("viewModeHelper")}</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          {t("viewMode")}
        </span>

        <div
          role="tablist"
          aria-label={t("viewMode")}
          className="relative inline-flex items-stretch gap-1 rounded-2xl border border-foreground/10 bg-card/60 p-1.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl border border-emerald-300/15"
            animate={shouldReduceEffects ? undefined : { opacity: [0.3, 0.65, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {MODES.map((m) => {
            const active = m.key === mode;
            return (
              <button
                key={m.key}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => onChange(m.key)}
                className={cn(
                  "group relative z-10 flex items-center gap-2.5 rounded-xl px-4 py-2.5 outline-none transition-[color,transform] duration-300 hover:-translate-y-0.5 sm:px-5",
                  active ? "text-foreground" : "text-foreground/55 hover:text-foreground/85",
                )}
              >
                {!active && (
                  <span className="absolute inset-0 -z-10 rounded-xl bg-foreground/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                )}

                {active && (
                  <motion.span
                    layoutId="mode-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-xl border border-emerald-300/30 bg-gradient-to-b from-white/[0.12] to-white/[0.03] shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_18px_50px_-18px_rgba(5,150,105,0.7)]"
                  >
                    {!shouldReduceEffects && (
                      <motion.span
                        className="absolute -top-8 left-1/2 h-16 w-2/3 -translate-x-1/2 rounded-full bg-emerald-400/30 blur-2xl"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </motion.span>
                )}

                <motion.span
                  className={cn("transition-colors duration-300", active ? "text-emerald-200" : "text-current")}
                  animate={active && !shouldReduceEffects ? { scale: 1.08, rotate: 0 } : { scale: 1 }}
                  whileHover={shouldReduceEffects ? undefined : { scale: 1.12, rotate: -4 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  {m.icon}
                </motion.span>

                <span className="flex flex-col items-start leading-none">
                  <span className="text-[13px] font-semibold tracking-tight">{t(m.labelKey)}</span>
                  <span className="mt-0.5 hidden text-[10px] font-medium tracking-wide text-muted-foreground sm:block">
                    {t(m.descKey)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const ModeSwitcher = React.memo(ModeSwitcherImpl);
