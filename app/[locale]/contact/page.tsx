import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactExperience } from "@/components/contact-experience";
import { getAbsoluteUrl, getLanguageAlternates, getLocalizedUrl, siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  const title = t("title");
  const description = t("description");
  const url = getLocalizedUrl(locale as "en" | "ar", "/contact");
  const ogImage = getAbsoluteUrl(siteConfig.ogImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates("/contact"),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Ahmed Alaydi - Full Stack Developer",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const url = getLocalizedUrl(locale as "en" | "ar", "/contact");
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: locale === "ar" ? "تواصل مع أحمد العايدي" : "Contact Ahmed Alaydi",
    url,
    inLanguage: locale,
    about: {
      "@type": "Person",
      name: "Ahmed Alaydi",
      jobTitle: "Full-Stack Engineer",
      email: `mailto:${siteConfig.email}`,
      sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.whatsapp],
    },
  };

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
