"use client";

import { useTranslations } from "next-intl";

const whatsappNumber = "201006082709";
const whatsappMessage = "Hi Ahmed, I want to discuss a project with you.";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.1 4.9A9.8 9.8 0 0 0 3.7 16.7L2.5 21l4.4-1.1A9.8 9.8 0 0 0 21.8 11.5a9.7 9.7 0 0 0-2.7-6.6Zm-6.9 14.5a8 8 0 0 1-4.1-1.1l-.3-.2-2.6.7.7-2.5-.2-.3a8 8 0 1 1 6.5 3.4Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.6.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.2.3-.4.1-.2 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1 0-.1-.2-.1-.5-.2Z" />
    </svg>
  );
}

export function WhatsAppFloatingButton() {
  const t = useTranslations("contact.methods");
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsAppAria")}
      className="group fixed bottom-6 right-6 z-[70] flex items-center gap-3 rounded-full border border-emerald-200/30 bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-600 px-4 py-3 text-white shadow-[0_18px_60px_-12px_rgba(16,185,129,0.55)] ring-1 ring-emerald-300/30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-[1.03] hover:from-emerald-400 hover:via-emerald-400 hover:to-emerald-500 hover:shadow-[0_24px_80px_-12px_rgba(16,185,129,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-emerald-400/40 blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute -inset-1 -z-20 rounded-full bg-gradient-to-br from-emerald-400/30 to-emerald-500/30 blur-2xl opacity-70" />
      <WhatsAppIcon className="h-5 w-5 drop-shadow-[0_2px_6px_rgba(15,23,42,0.45)]" />
      <span className="hidden text-sm font-semibold tracking-tight sm:inline">{t("whatsapp")}</span>
    </a>
  );
}
