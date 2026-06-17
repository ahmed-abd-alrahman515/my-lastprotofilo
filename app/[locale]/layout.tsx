import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import { GlobalBackground, SmoothScroll, CustomCursor } from "@/components/system";
import { routing, localeDirection, type Locale } from "@/i18n/routing";
import {
  getAbsoluteUrl,
  getLanguageAlternates,
  getLocaleTag,
  getLocalizedUrl,
  siteConfig,
} from "@/lib/site";
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
  const currentLocale = locale as Locale;
  const canonicalUrl = getLocalizedUrl(currentLocale);
  const ogImage = getAbsoluteUrl(siteConfig.ogImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.title,
    description: siteConfig.description,
    applicationName: siteConfig.title,
    icons: {
      icon: [
        { url: siteConfig.icon, href: siteConfig.icon },
      ],
      shortcut: [{ url: siteConfig.icon, href: siteConfig.icon }],
      apple: [{ url: siteConfig.icon, href: siteConfig.icon }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(),
    },
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url: canonicalUrl,
      siteName: siteConfig.title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Ahmed Alaydi - Full Stack Developer",
        },
      ],
      locale: getLocaleTag(currentLocale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [ogImage],
    },
    authors: [{ name: siteConfig.personName, url: siteConfig.url }],
    keywords: [
      "Ahmed Alaydi",
      "Full Stack Developer",
      "Laravel Developer",
      "React Developer",
      "Next.js",
      "React",
      "Laravel",
      "React Native",
      "SaaS",
      "Admin Dashboards",
      "REST APIs",
      "Full Stack Development",
    ],
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
    name: siteConfig.personName,
    jobTitle: "Full Stack Developer",
    url: siteConfig.url,
    image: getAbsoluteUrl(siteConfig.ogImage),
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.whatsapp],
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
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: getAbsoluteUrl(siteConfig.ogImage),
    inLanguage: getLocaleTag(locale as Locale),
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased ${
          dir === "rtl" ? "rtl text-right" : "ltr text-left"
        }`}
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
                <main
                  key={locale}
                  className={`page-mount flex-1 ${dir === "rtl" ? "rtl text-right" : "ltr text-left"}`}
                >
                  {children}
                </main>
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
