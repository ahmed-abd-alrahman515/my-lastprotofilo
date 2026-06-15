import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import {
  GlobalBackground,
  SmoothScroll,
  CustomCursor,
} from "@/components/system";

import { routing, localeDirection, type Locale } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    icons: { icon: "/image/myiamgeeelast.jpg" },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      siteName: "Ahmed Alaydi Portfolio",
      images: [
        {
          url: "/image/myimage.jpeg",
          width: 1200,
          height: 630,
          alt: "Ahmed Alaydi — Full-Stack Engineer",
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/image/myiamgeeelast.jpg"],
    },
    authors: [{ name: "Ahmed Alaydi" }],
    keywords: [
      "Full-Stack Engineer",
      "Next.js",
      "React",
      "Laravel",
      "SaaS",
      "System Architect",
    ],
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7faf8" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const dir = localeDirection[locale as Locale];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmed Alaydi",
    jobTitle: "Full-Stack Engineer",
    url: "https://ahmed-alaydi.com",
    image: "https://ahmed-alaydi.com/image/myimage.jpeg",
    sameAs: [
      "https://github.com/ahmed-alaydee",
      "https://www.linkedin.com/in/ahmed-alayadi-3a3bb3291/",
      "https://wa.me/201006082709",
    ],
    knowsAbout: [
      "Laravel",
      "Next.js",
      "React",
      "React Native",
      "TypeScript",
      "MySQL",
      "REST APIs",
      "SaaS",
      "ERP",
      "CRM",
    ],
  };

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ahmed Alaydi Portfolio",
    url: "https://ahmed-alaydi.com",
    inLanguage: routing.locales,
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="portfolio-theme"
            disableTransitionOnChange
          >
            <SmoothScroll>
              <CustomCursor />
              <GlobalBackground />
              <div className="relative flex min-h-screen flex-col">
                <Navigation />
                <main key={locale} className="page-mount flex-1">{children}</main>
                <Footer />
                <WhatsAppFloatingButton />
              </div>
            </SmoothScroll>
          </ThemeProvider>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
