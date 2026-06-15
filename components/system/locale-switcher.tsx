"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { locales, localeLabels, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [pending, startTransition] = React.useTransition();

  function onSelect(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      // `pathname` from i18n navigation is the locale-stripped path; `params` carries dynamic segments.
      router.replace(
        // @ts-expect-error -- dynamic params are spread through
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-2 px-2.5 text-xs font-medium"
          aria-label={t("language")}
          disabled={pending}
        >
          <Globe className="h-4 w-4" aria-hidden />
          <span className="font-mono uppercase tracking-wider">
            {localeLabels[locale].flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          {t("language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((code) => {
          const meta = localeLabels[code];
          const active = code === locale;
          return (
            <DropdownMenuItem
              key={code}
              onSelect={() => onSelect(code)}
              className="cursor-pointer justify-between gap-3"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {meta.flag}
                </span>
                <span className="text-sm">{meta.native}</span>
              </span>
              {active && <Check className="h-3.5 w-3.5 text-primary" aria-hidden />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
