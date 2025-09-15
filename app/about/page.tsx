import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutMission } from "@/components/about/about-mission"
import { AboutValues } from "@/components/about/about-values"
import { AboutTimeline } from "@/components/about/about-timeline"
import { AboutTeam } from "@/components/about/about-team"
import { AboutCertifications } from "@/components/about/about-certifications"
import { AboutCta } from "@/components/about/about-cta"
import { generateMetadata as generateSEOMetadata, generateBreadcrumbJsonLd, DEFAULT_SEO } from "@/lib/seo"

export const metadata: Metadata = generateSEOMetadata({
  title: "About Ugarit Technologies - Leading IT Solutions Provider",
  description: "Learn about Ugarit Technologies' mission, values, and expert team. Discover our journey in delivering enterprise IT solutions, cloud services, and DevOps consulting since 2020.",
  keywords: [
    "about ugarit technologies",
    "IT company history",
    "enterprise technology team",
    "cloud services provider",
    "DevOps consulting experts",
    "technology leadership",
    "IT solutions company",
    "digital transformation specialists"
  ],
  canonicalUrl: `${DEFAULT_SEO.siteUrl}/about`,
  ogImage: "/og-about.jpg",
  ogType: "website"
})

export default function AboutPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: DEFAULT_SEO.siteUrl },
    { name: "About", url: `${DEFAULT_SEO.siteUrl}/about` }
  ])

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <Header />
      <main className="pt-16">
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutTimeline />
        <AboutTeam />
        <AboutCertifications />
        <AboutCta />
      </main>
      <Footer />
    </div>
  )
}
