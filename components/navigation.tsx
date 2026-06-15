"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/system/locale-switcher";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/skills", key: "skills" },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
] as const;

export function Navigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full animate__animated animate__fadeInDown transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-b border-primary/10 bg-background/60 shadow-[0_8px_40px_-24px_var(--glow-emerald)] backdrop-blur-2xl backdrop-saturate-150"
          : "border-b border-transparent bg-background/20 backdrop-blur-md",
      )}
    >
      {/* hairline emerald glow under the bar */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/80">
            dev
          </span>
          <span className="text-[1.35rem] font-bold tracking-[-0.03em]">Ahmed</span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_var(--glow-emerald)] transition-transform duration-500 group-hover:scale-125" />
          </span>
        </Link>

        <nav
          className="relative hidden items-center gap-0.5 rounded-full border border-primary/10 bg-card/30 p-1 backdrop-blur-xl md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const showPill = hovered ? hovered === link.href : active;
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300",
                  active || hovered === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {showPill && (
                  <motion.span
                    layoutId="nav-pill"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full border border-primary/25 bg-primary/10 shadow-[0_0_24px_-6px_var(--glow-emerald)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t(link.key)}
              </Link>
            );
          })}
          <div className="ms-1 flex items-center gap-1 border-s border-primary/10 ps-1.5">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            className="h-9 w-9"
            aria-label={open ? t("close") : t("menu")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-primary/10 bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "border border-primary/20 bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
