import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow, Heading, Lead, Reveal } from "@/components/system";

export async function Closer() {
  const t = await getTranslations("home.closer");
  const tA = await getTranslations("actions");

  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--glow-cyan),transparent_65%)] opacity-50 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <Container size="md">
        <div className="relative mx-auto overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-10 text-center backdrop-blur-md shadow-[0_8px_28px_-24px_rgba(16,24,40,0.16)] dark:shadow-[0_32px_120px_-30px_rgba(0,0,0,0.6)] sm:p-14">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--glow-cyan),transparent_70%)] opacity-50 blur-3xl"
          />

          <Reveal>
            <Eyebrow className="justify-center">{t("eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading as="h2" size="md" className="mt-5">
              {t("heading")}
            </Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <Lead className="mx-auto mt-5">{t("lead")}</Lead>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full px-6 shadow-[0_4px_16px_-12px_rgba(16,185,129,0.24)] dark:shadow-[0_8px_30px_-8px_var(--glow-cyan)]"
              >
                <Link href="/contact">
                  {tA("getInTouch")}
                  <ArrowRight className="ms-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
