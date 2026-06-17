"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  Database,
  Server,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Typing effect — cycles through a set of engineering roles          */
/* ------------------------------------------------------------------ */

const ROLES = [
  "Full-Stack Engineer",
  "Laravel API Architect",
  "Next.js Systems Builder",
  "Mobile Ecosystem Engineer",
];

function useTypewriter(words: string[], reduced: boolean) {
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState(reduced ? words[0] : "");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (reduced) return;
    const current = words[index % words.length];
    const done = text === current;
    const empty = text === "";

    let delay = deleting ? 45 : 85;
    if (done && !deleting) delay = 1800;
    if (empty && deleting) delay = 350;

    const id = window.setTimeout(() => {
      if (done && !deleting) {
        setDeleting(true);
      } else if (empty && deleting) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
        );
      }
    }, delay);

    return () => window.clearTimeout(id);
  }, [text, deleting, index, words, reduced]);

  return text;
}

/* ------------------------------------------------------------------ */
/*  Background code streams                                             */
/* ------------------------------------------------------------------ */

const CODE_STREAMS = [
  ["GET /api/v1/orders", "200 OK · 64ms", "Route::middleware('auth')", "$order->markAsPaid()", "return OrderResource::collection()"],
  ["php artisan migrate", "Schema::create('users')", "->foreignId('store_id')", "queue:work --tries=3", "Cache::remember(...)"],
  ["const { data } = useQuery()", "export default function Page()", "await prisma.user.findMany()", "<Suspense fallback={...}>", "revalidatePath('/orders')"],
  ["FCM · push delivered", "Stripe · payment_intent", "WS · realtime sync", "cron · 0 */6 * * *", "redis · cache hit 98%"],
];

function CodeStreams({ reduced }: { reduced: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_18%,black_78%)]"
    >
      {CODE_STREAMS.map((lines, col) => {
        const left = `${6 + col * 26}%`;
        const dur = 26 + col * 6;
        const loop = [...lines, ...lines, ...lines];
        return (
          <motion.div
            key={col}
            className="absolute top-0 flex flex-col gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200/[0.14] sm:text-[11px]"
            style={{ left }}
            initial={{ y: col % 2 === 0 ? "-40%" : "-60%" }}
            animate={reduced ? undefined : { y: col % 2 === 0 ? "0%" : "-20%" }}
            transition={{ duration: dur, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          >
            {loop.map((line, i) => (
              <span key={i} className="whitespace-nowrap">
                {line}
              </span>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating tech card                                                 */
/* ------------------------------------------------------------------ */

function FloatCard({
  icon: Icon,
  title,
  meta,
  rgb,
  className,
  depth,
  px,
  py,
  reduced,
  children,
}: {
  icon: React.ElementType;
  title: string;
  meta: string;
  rgb: string;
  className: string;
  depth: number;
  px: ReturnType<typeof useSpring>;
  py: ReturnType<typeof useSpring>;
  reduced: boolean;
  children?: React.ReactNode;
}) {
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);
  return (
    <motion.div
      style={reduced ? undefined : { x, y }}
      className={cn(
        "absolute z-20 w-44 rounded-2xl border bg-card/70 p-3 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg,transparent,rgba(${rgb},0.7),transparent)` }} />
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.12)` }}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold text-foreground">{title}</p>
          <p className="truncate font-mono text-[9px]" style={{ color: `rgba(${rgb},0.9)` }}>
            {meta}
          </p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function EngineeringHero() {
  const reduced = useReducedMotion() ?? false;
  const typed = useTypewriter(ROLES, reduced);

  const stageRef = React.useRef<HTMLDivElement>(null);

  // Pointer-driven parallax / tilt / glow
  const pmx = useMotionValue(0); // -0.5..0.5
  const pmy = useMotionValue(0);
  const px = useSpring(pmx, { stiffness: 60, damping: 18, mass: 0.6 });
  const py = useSpring(pmy, { stiffness: 60, damping: 18, mass: 0.6 });

  const rotX = useTransform(py, (v) => v * -10);
  const rotY = useTransform(px, (v) => v * 14);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(40);
  const glowXs = useSpring(glowX, { stiffness: 120, damping: 24 });
  const glowYs = useSpring(glowY, { stiffness: 120, damping: 24 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowXs}% ${glowYs}%, rgba(16,185,129,0.16), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    pmx.set(nx - 0.5);
    pmy.set(ny - 0.5);
    glowX.set(nx * 100);
    glowY.set(ny * 100);
  };
  const onLeave = () => {
    pmx.set(0);
    pmy.set(0);
    glowX.set(50);
    glowY.set(40);
  };

  return (
    <section
      ref={stageRef}
      onPointerMove={reduced ? undefined : onMove}
      onPointerLeave={reduced ? undefined : onLeave}
      className="relative isolate min-h-[92vh] overflow-hidden"
    >
      {/* mouse-follow glow */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-[1]" style={{ background: glow }} />

      {/* code streams */}
      <CodeStreams reduced={reduced} />

      {/* ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[2]">
        <div className="absolute left-[-10%] top-[8%] h-96 w-96 rounded-full bg-emerald-500/[0.10] blur-[120px]" />
        <div className="absolute bottom-[-12%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-teal-500/[0.08] blur-[130px]" />
      </div>

      <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* LEFT — narrative */}
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200"
          >
            <Sparkles className="h-3 w-3" aria-hidden />
            The engineer behind the systems
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[4.4rem]"
          >
            I&apos;m Ahmed.
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
              I engineer systems
            </span>
            <br />
            that ship.
          </motion.h1>

          {/* typing line */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex h-7 items-center gap-2 font-mono text-base text-emerald-200/90 sm:text-lg"
          >
            <span className="text-foreground/40">{">"}</span>
            <span>{typed}</span>
            <span className="inline-block h-5 w-[2px] animate-pulse bg-emerald-300" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/75 sm:text-lg"
          >
            I design and build complete digital ecosystems — Laravel APIs, Next.js
            dashboards, and mobile apps wired into one backend. From the first schema
            to production deploy, I own the whole stack.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-600 text-white shadow-[0_18px_55px_-18px_rgba(16,185,129,0.7)] hover:from-emerald-400 hover:via-emerald-400 hover:to-emerald-500"
            >
              <Link href="/projects">
                Explore my systems
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-foreground/15 bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08]"
            >
              <Link href="/contact">Let&apos;s talk</Link>
            </Button>
          </motion.div>

          {/* live status row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-foreground/55"
          >
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              API · all systems operational
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-300" /> uptime 99.9%
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-300" /> avg response 84ms
            </span>
          </motion.div>
        </div>

        {/* RIGHT — portrait composition with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden w-full max-w-md lg:block [perspective:1400px]"
        >
          <motion.div
            style={reduced ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* ambient halo */}
            <div className="absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(16,185,129,0.22),transparent_62%)] blur-2xl" />

            {/* portrait frame */}
            <div className="relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground/[0.05] p-2.5 shadow-[0_50px_140px_-30px_rgba(16,185,129,0.5)] backdrop-blur-xl">
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-400/15 via-transparent to-teal-500/15" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-card">
                <Image
                  src="/image/ahmedimage.png"
                  alt="Ahmed Alaydi — Full-Stack Engineer"
                  fill
                  priority
                  sizes="(min-width:1024px) 440px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_50%,rgba(16,185,129,0.05)_50%,transparent_100%)] bg-[length:100%_4px]" />
              </div>
            </div>

            {/* corner brackets */}
            <span className="pointer-events-none absolute -top-2 -right-2 h-7 w-7 border-r-2 border-t-2 border-emerald-300/60" />
            <span className="pointer-events-none absolute -bottom-2 -left-2 h-7 w-7 border-b-2 border-l-2 border-emerald-300/60" />

            {/* floating cards (parallax depth) */}
            <FloatCard
              icon={Zap}
              title="REST API"
              meta="200 OK · 84ms"
              rgb="103, 232, 249"
              depth={38}
              px={px}
              py={py}
              reduced={reduced}
              className="-right-10 top-12"
            >
              <div className="mt-2 h-1 w-full rounded-full bg-foreground/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300"
                  initial={{ width: "20%" }}
                  animate={reduced ? { width: "78%" } : { width: ["20%", "92%", "78%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </FloatCard>

            <FloatCard
              icon={Database}
              title="MySQL"
              meta="SELECT · 12ms"
              rgb="110, 231, 183"
              depth={56}
              px={px}
              py={py}
              reduced={reduced}
              className="-left-12 top-1/2"
            />

            <FloatCard
              icon={Smartphone}
              title="Mobile"
              meta="customer · rep · admin"
              rgb="196, 181, 253"
              depth={28}
              px={px}
              py={py}
              reduced={reduced}
              className="-right-8 bottom-10"
            />

            <FloatCard
              icon={Cpu}
              title="System"
              meta="SaaS · ERP · CRM"
              rgb="252, 211, 77"
              depth={46}
              px={px}
              py={py}
              reduced={reduced}
              className="-left-8 bottom-1/4"
            >
              <div className="mt-2 grid grid-cols-3 gap-1">
                <span className="h-1 rounded-full bg-emerald-300/80" />
                <span className="h-1 rounded-full bg-emerald-300/70" />
                <span className="h-1 rounded-full bg-teal-300/60" />
              </div>
            </FloatCard>
          </motion.div>
        </motion.div>

        {/* mobile portrait (no tilt) */}
        <div className="relative mx-auto block w-full max-w-xs lg:hidden">
          <div className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(16,185,129,0.2),transparent_62%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-foreground/[0.05] p-2 shadow-[0_40px_120px_-30px_rgba(16,185,129,0.45)] backdrop-blur-xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-card">
              <Image
                src="/image/myiamgeeelast.jpg"
                alt="Ahmed Alaydi — Full-Stack Engineer"
                fill
                priority
                sizes="320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40"
        animate={reduced ? undefined : { y: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        scroll ↓
      </motion.div>
    </section>
  );
}
