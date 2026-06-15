import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Github, Linkedin, Mail, Play, Video } from "lucide-react";
import { AnimatedSection } from "@/components/system/animated";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14.2 8.3V6.7c0-.8.5-1 1-1h1.3V3.4c-.6-.1-1.3-.2-2-.2-2 0-3.4 1.2-3.4 3.4v1.7H8.9v2.6h2.2v9.9h2.8v-9.9h2.2l.4-2.6h-2.3Z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://github.com/ahmed-alaydee",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/ahmed-alayadi-3a3bb3291/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:ahmedalayde86@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://www.tiktok.com/@alaydi.dev?is_from_webapp=1&sender_device=pc",
    label: "TikTok",
    icon: Play,
  },
  {
    href: "https://www.youtube.com/@alaydidev",
    label: "YouTube",
    icon: Video,
  },
  {
    href: "https://www.facebook.com/ahmed.elayde.11353/?locale=ar_AR",
    label: "Facebook",
    icon: FacebookIcon,
  },
];

export async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="relative isolate overflow-hidden border-t border-foreground/10 bg-background text-foreground">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.065),transparent_24%),linear-gradient(180deg,rgba(5,5,5,0)_0%,#050505_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/25 to-transparent" />
      </div>

      <AnimatedSection animation="fadeInUp" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-foreground"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-200/75">
                dev
              </span>
              <span className="text-2xl font-bold tracking-[-0.04em]">
                Ahmed
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.45)] transition-transform duration-500 group-hover:scale-125" />
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="flex h-10 w-10 items-center justify-center rounded-md border border-foreground/10 bg-foreground/[0.055] text-foreground/80 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-emerald-200/35 hover:bg-foreground/[0.09] hover:text-emerald-100"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-foreground/10 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ahmed Alaydi. {t("rights")}</p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("signature")}
          </p>
        </div>
      </AnimatedSection>
    </footer>
  );
}
