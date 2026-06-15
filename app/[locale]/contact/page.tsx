import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactExperience } from "@/components/contact-experience";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/contact" },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Ahmed Alaydi",
  url: "https://ahmed-alaydi.com/contact",
  about: {
    "@type": "Person",
    name: "Ahmed Alaydi",
    jobTitle: "Full-Stack Engineer",
    email: "mailto:ahmedalayde86@gmail.com",
    sameAs: [
      "https://github.com/ahmed-alaydee",
      "https://www.linkedin.com/in/ahmed-alayadi-3a3bb3291/",
      "https://wa.me/201006082709",
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactExperience />
    </>
  );
}
