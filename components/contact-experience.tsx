"use client";

import * as React from "react";
import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FieldState = "idle" | "valid" | "invalid";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.1 4.9A9.8 9.8 0 0 0 3.7 16.7L2.5 21l4.4-1.1A9.8 9.8 0 0 0 21.8 11.5a9.7 9.7 0 0 0-2.7-6.6Zm-6.9 14.5a8 8 0 0 1-4.1-1.1l-.3-.2-2.6.7.7-2.5-.2-.3a8 8 0 1 1 6.5 3.4Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.6.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.2.3-.4.1-.2 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1 0-.1-.2-.1-.5-.2Z" />
    </svg>
  );
}

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function FloatingField({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  multiline,
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  multiline?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  const [focused, setFocused] = React.useState(false);
  const filled = value.length > 0;
  const state: FieldState = error ? "invalid" : filled ? "valid" : "idle";

  const sharedClass = cn(
    "peer relative block w-full rounded-xl border bg-card/40 px-4 pt-6 pb-2 text-[15px] text-foreground outline-none transition-all duration-300 placeholder-transparent",
    state === "invalid"
      ? "border-rose-400/50 focus:border-rose-300 focus:ring-2 focus:ring-rose-300/20"
      : state === "valid"
      ? "border-emerald-300/40 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
      : "border-foreground/10 focus:border-emerald-300/50 focus:ring-2 focus:ring-emerald-300/20",
  );

  return (
    <div className="relative">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-r from-emerald-400/0 via-emerald-300/30 to-emerald-400/0 opacity-0 blur transition-opacity duration-500",
          focused && "opacity-60",
        )}
      />
      {multiline ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          rows={5}
          autoComplete={autoComplete}
          placeholder={label}
          className={cn(sharedClass, "min-h-[140px] resize-y")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          autoComplete={autoComplete}
          placeholder={label}
          className={sharedClass}
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300",
          (focused || filled) && "top-3 translate-y-0 text-[10px]",
          state === "invalid"
            ? "text-rose-300"
            : focused || filled
            ? "text-emerald-300/90"
            : "text-muted-foreground",
          multiline && (focused || filled) && "top-3",
          multiline && !focused && !filled && "top-6",
        )}
      >
        {label}
        {required && <span className="ms-1 text-rose-300">*</span>}
      </label>
      {state === "valid" && (
        <CheckCircle2 className="pointer-events-none absolute end-3 top-4 h-4 w-4 text-emerald-300/90" />
      )}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 ps-1 text-xs text-rose-300">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  );
}

export function ContactExperience() {
  const t = useTranslations("contact");
  const [form, setForm] = React.useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = React.useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [sendError, setSendError] = React.useState<string | null>(null);

  const contactMethods = [
    {
      title: t("methods.email"),
      value: "ahmedalayde86@gmail.com",
      href: "mailto:ahmedalayde86@gmail.com",
      icon: Mail,
      accent: "from-emerald-400/30 via-emerald-400/10 to-transparent",
      ring: "hover:shadow-[0_0_0_1px_rgba(110,231,183,0.35),0_30px_80px_-20px_rgba(16,185,129,0.45)]",
      label: t("methods.primary"),
    },
    {
      title: t("methods.whatsapp"),
      value: "+20 100 608 2709",
      href: "https://wa.me/201006082709?text=Hi%20Ahmed%2C%20I%20want%20to%20discuss%20a%20project%20with%20you.",
      icon: WhatsAppIcon,
      accent: "from-emerald-400/30 via-emerald-400/10 to-transparent",
      ring: "hover:shadow-[0_0_0_1px_rgba(110,231,183,0.35),0_30px_80px_-20px_rgba(16,185,129,0.45)]",
      label: t("methods.instant"),
    },
    {
      title: t("methods.github"),
      value: "github.com/ahmed-alaydee",
      href: "https://github.com/ahmed-alaydee",
      icon: Github,
      accent: "from-slate-300/30 via-slate-300/10 to-transparent",
      ring: "hover:shadow-[0_0_0_1px_rgba(226,232,240,0.3),0_30px_80px_-20px_rgba(148,163,184,0.4)]",
      label: t("methods.code"),
    },
    {
      title: t("methods.linkedin"),
      value: "linkedin.com/in/ahmed-alayadi",
      href: "https://www.linkedin.com/in/ahmed-alayadi-3a3bb3291/",
      icon: Linkedin,
      accent: "from-emerald-400/30 via-emerald-400/10 to-transparent",
      ring: "hover:shadow-[0_0_0_1px_rgba(52,211,153,0.35),0_30px_80px_-20px_rgba(5,150,105,0.45)]",
      label: t("methods.network"),
    },
  ];

  const fastFacts = [
    { icon: Clock, k: t("facts.response"), v: t("facts.responseValue") },
    { icon: Globe2, k: t("facts.remote"), v: t("facts.remoteValue") },
    { icon: MapPin, k: t("facts.location"), v: t("facts.locationValue") },
    { icon: Sparkles, k: t("facts.status"), v: t("facts.statusValue") },
  ];

  const shareItems = t.raw("share.items") as string[];

  const set = <K extends keyof typeof form>(k: K, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = t("form.required");
    if (!form.email.trim()) next.email = t("form.required");
    else if (!validateEmail(form.email)) next.email = t("form.invalidEmail");
    if (!form.subject.trim()) next.subject = t("form.required");
    if (form.message.trim().length < 10) next.message = t("form.minMessage");
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    setSendError(null);
    try {
      await emailjs.send(
        "service_q1iu121",
        "template_107k1zb",
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "yqBswcEHgukdGA0Or",
      );
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setSendError(t("form.sendFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-background text-foreground">
      <style>{`
        @keyframes ctReveal { from { opacity: 0; transform: translate3d(0, 28px, 0); } to { opacity: 1; transform: none; } }
        @keyframes ctFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes ctPing { 0% { box-shadow: 0 0 0 0 rgba(110,231,183,0.55); } 100% { box-shadow: 0 0 0 14px rgba(110,231,183,0); } }
        .ct-reveal { animation: ctReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .ct-float { animation: ctFloat 6s ease-in-out infinite; }
        .ct-ping { animation: ctPing 2.2s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ct-reveal, .ct-float, .ct-ping { animation: none; }
        }
      `}</style>

      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(148,163,184,0.15),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.07),transparent_24%),linear-gradient(180deg,rgba(5,5,5,0.98)_0%,#050505_100%)]" />
        <div className="absolute left-[-14%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-emerald-500/[0.05] blur-3xl" />
        <div className="absolute bottom-[-18%] right-[-16%] h-[36rem] w-[36rem] rounded-full bg-teal-400/[0.05] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      <section className="relative pb-12 pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="ct-reveal mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="ct-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {t("hero.available")}
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.heading")}
              <span className="block bg-gradient-to-r from-emerald-200 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                {t("hero.headingAccent")}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
              {t("hero.lead")}
            </p>
          </div>

          <div className="ct-reveal mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4" style={{ animationDelay: "120ms" }}>
            {fastFacts.map((f) => (
              <div
                key={f.k}
                className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4 transition-all hover:-translate-y-1 hover:border-emerald-200/30"
              >
                <f.icon className="h-4 w-4 text-emerald-200" aria-hidden />
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {f.k}
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground">{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
          <aside className="ct-reveal space-y-6" style={{ animationDelay: "60ms" }}>
            <div className="grid gap-3 sm:grid-cols-2">
              {contactMethods.map((m) => (
                <a
                  key={m.title}
                  href={m.href}
                  target={m.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={m.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/20",
                    m.ring,
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-x-0 -top-8 h-24 bg-gradient-to-b blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      m.accent,
                    )}
                  />
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.04] text-emerald-200 transition-all group-hover:scale-110">
                      <m.icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-foreground/10 bg-card/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/80">
                      {m.label}
                    </span>
                  </div>
                  <div className="mt-5 text-base font-semibold text-foreground">{m.title}</div>
                  <div className="mt-1 truncate text-sm text-foreground/80/85 transition-colors group-hover:text-emerald-100">
                    {m.value}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-emerald-200">
                    {t("methods.open")} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </a>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-br from-emerald-300/[0.07] via-white/[0.03] to-emerald-300/[0.07] p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl"
              />
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-300/10 text-emerald-200">
                  <Download className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground">{t("cv.title")}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80/90">
                    {t("cv.description")}
                  </p>
                  <Button asChild className="mt-4">
                    <a href="/Ahmed_Samir.pdf" download>
                      {t("cv.button")}
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
                {t("share.eyebrow")}
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                {t("share.heading")}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-foreground/80/90">
                {shareItems.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="ct-reveal" style={{ animationDelay: "120ms" }}>
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 h-56 w-3/4 -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl"
              />

              {submitted ? (
                <div className="ct-reveal flex min-h-[480px] flex-col items-center justify-center text-center">
                  <div className="relative">
                    <div
                      aria-hidden
                      className="absolute -inset-6 -z-10 rounded-full bg-emerald-300/20 blur-2xl"
                    />
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 text-emerald-200">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
                    {t("form.successHeading")}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/80">
                    {t("form.successLead")}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="border-foreground/15 bg-foreground/[0.06] text-foreground hover:border-emerald-200/35 hover:bg-foreground/[0.12]"
                    >
                      {t("form.sendAnother")}
                    </Button>
                    <Button asChild>
                      <a
                        href="https://wa.me/201006082709"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("form.pingWhatsApp")}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label={t("form.ariaLabel")}>
                  <header className="mb-2">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/85">
                      {t("form.eyebrow")}
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {t("form.heading")}
                    </h2>
                  </header>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FloatingField
                      id="name"
                      label={t("form.name")}
                      value={form.name}
                      onChange={(v) => set("name", v)}
                      required
                      autoComplete="name"
                      error={errors.name}
                    />
                    <FloatingField
                      id="email"
                      label={t("form.email")}
                      type="email"
                      value={form.email}
                      onChange={(v) => set("email", v)}
                      required
                      autoComplete="email"
                      error={errors.email}
                    />
                  </div>

                  <FloatingField
                    id="subject"
                    label={t("form.subject")}
                    value={form.subject}
                    onChange={(v) => set("subject", v)}
                    required
                    error={errors.subject}
                  />

                  <FloatingField
                    id="message"
                    label={t("form.message")}
                    value={form.message}
                    onChange={(v) => set("message", v)}
                    required
                    multiline
                    error={errors.message}
                  />

                  {sendError && (
                    <div className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-200">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {sendError}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-muted-foreground">
                      {t("form.privacy")}
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="group relative overflow-hidden shadow-lg shadow-emerald-950/40"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                      />
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t("form.sending")}
                        </>
                      ) : (
                        <>
                          {t("form.send")}
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
