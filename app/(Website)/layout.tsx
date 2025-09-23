import type React from "react";
import type { Metadata, Viewport } from "next";

import { generateMetadata as generateSEOMetadata, DEFAULT_SEO } from "@/lib/seo";
import { HeaderFooterRepository } from "@/api/services/website/home/header-and-footer";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// const montserrat = Montserrat({
//     subsets: ["latin"],
//     variable: "--font-montserrat",
//     weight: ["400", "600", "700", "900"],
//     display: "swap",
// });

// const openSans = Open_Sans({
//     subsets: ["latin"],
//     variable: "--font-open-sans",
//     weight: ["400", "600", "700"],
//     display: "swap",
// });

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

export default async function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const organizationJsonLd = generateJsonLd("Organization", {});
    // const websiteJsonLd = generateJsonLd("WebSite", {});
    // const messages = await getMessages();
    // const locale = await getLocale();
    // const isRtl = isRTL(locale);
    const headerFooter = await HeaderFooterRepository.getHeaderAndFooter()
    // console.log('header', headerFooter?.data);
    return (
        <>
            <Header logo={headerFooter?.data?.company?.logo} navigations={headerFooter?.data?.menus} />
            {children}
            <Footer navigations={headerFooter?.data?.menus} services={headerFooter?.data?.services} company={headerFooter?.data?.company} />
        </>
    );
}
