import type React from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";

import {
  generateMetadata as generateSEOMetadata,
  generateJsonLd,
  DEFAULT_SEO,
} from "@/lib/seo";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/SessionHandler";
import { isRTL } from "@/i18n/request";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/theme/theme-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = generateSEOMetadata({
  title: DEFAULT_SEO.defaultTitle,
  description: DEFAULT_SEO.defaultDescription,
  keywords: DEFAULT_SEO.defaultKeywords,
  canonicalUrl: DEFAULT_SEO.siteUrl,
  ogImage: DEFAULT_SEO.defaultOgImage,
  ogType: "website",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(255, 255%, 98%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(222.2, 84%, 4.9%)" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generateJsonLd("Organization", {});
  const websiteJsonLd = generateJsonLd("WebSite", {});
  const messages = await getMessages();
  const locale = await getLocale();
  const isRtl = isRTL(locale);

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      suppressHydrationWarning
      className="scroll-smooth bg-primary-50"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body
        className={`font-sans antialiased ${montserrat.variable} ${openSans.variable} ${GeistMono.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={<div>Loading...</div>}>
            <AuthProvider>
              {/* <TokenRefreshHandler /> */}
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
              <Toaster />
            </AuthProvider>
          </Suspense>
        </NextIntlClientProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
