import { getTranslations } from "next-intl/server";

import { Eyebrow, Heading, Lead, Reveal, Section } from "@/components/system";
import { SystemsEcosystem } from "@/components/home/systems-ecosystem";

export async function FeaturedSystems() {
  const t = await getTranslations("home.systems");

  return (
    <Section spacing="lg" size="lg" id="systems" className="overflow-x-clip">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading as="h2" size="md" className="mt-4">
            {t("heading")}
          </Heading>
        </Reveal>
        <Reveal delay={0.12}>
          <Lead className="mx-auto mt-5 text-center">{t("lead")}</Lead>
        </Reveal>
      </div>

      <SystemsEcosystem />
    </Section>
  );
}
