"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SiFigma, SiGithub, SiLaravel, SiNextdotjs, SiPostman } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import type { IconType } from "react-icons";

import { Container, Eyebrow, Heading, Lead, Reveal } from "@/components/system";

/** Renderable cast for react-icons under this @types/react version. */
type SvgIcon = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean;
}>;

interface Tool {
  key: string;
  label: string;
  role: string;
  icon: IconType;
  rgb: string;
  /** float animation offset for variety */
  delay: number;
  amp: number;
}

const TOOLS: Tool[] = [
  { key: "vscode", label: "VS Code", role: "where it all gets written", icon: VscVscode, rgb: "125, 211, 252", delay: 0, amp: 10 },
  { key: "github", label: "GitHub", role: "version control & CI", icon: SiGithub, rgb: "226, 232, 240", delay: 0.6, amp: 8 },
  { key: "postman", label: "Postman", role: "API design & testing", icon: SiPostman, rgb: "252, 146, 60", delay: 1.1, amp: 12 },
  { key: "figma", label: "Figma", role: "interface & flows", icon: SiFigma, rgb: "196, 181, 253", delay: 0.3, amp: 9 },
  { key: "laravel", label: "Laravel", role: "the backend engine", icon: SiLaravel, rgb: "253, 164, 175", delay: 0.9, amp: 11 },
  { key: "nextjs", label: "Next.js", role: "the frontend framework", icon: SiNextdotjs, rgb: "226, 232, 240", delay: 1.4, amp: 8 },
];

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const reduced = useReducedMotion() ?? false;
  const Icon = tool.icon as unknown as SvgIcon;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -tool.amp, 0] }}
        transition={{ duration: 4.5 + index * 0.4, delay: tool.delay, repeat: Infinity, ease: "easeInOut" }}
        className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6 text-center backdrop-blur-xl transition-colors duration-500 hover:border-foreground/20 sm:p-7"
        style={{ boxShadow: `0 24px 70px -42px rgba(${tool.rgb},0.6)` }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle at 50% 30%, rgba(${tool.rgb},0.28), transparent 70%)` }}
        />
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110"
          style={{ borderColor: `rgba(${tool.rgb},0.3)`, background: `rgba(${tool.rgb},0.1)` }}
        >
          <Icon className="h-7 w-7" style={{ color: `rgb(${tool.rgb})` }} aria-hidden />
        </span>
        <div>
          <p className="text-sm font-semibold tracking-tight text-foreground">{tool.label}</p>
          <p className="mt-1 font-mono text-[10px] tracking-wide text-muted-foreground">{tool.role}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Workspace() {
  return (
    <section className="relative isolate overflow-x-clip py-24 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.04] blur-[120px]" />

      <Container size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">The Workspace</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading as="h2" size="md" className="mt-4">
              The tools that never leave my desk.
            </Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <Lead className="mx-auto mt-5 text-center">
              The daily stack — from first sketch to shipped deploy.
            </Lead>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.key} tool={tool} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
