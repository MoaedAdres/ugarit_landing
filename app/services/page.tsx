import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ServicesGrid } from "@/components/services/services-grid";
import { ServicesCta } from "@/components/services/services-cta";
import {
  generateMetadata as generateSEOMetadata,
  generateJsonLd,
  generateBreadcrumbJsonLd,
  DEFAULT_SEO,
} from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "IT Services & Solutions - Ugarit Technologies",
  description:
    "Comprehensive enterprise IT services including cloud infrastructure, DevOps consulting, cybersecurity, software development, and digital transformation solutions. Trusted by leading businesses worldwide.",
  keywords: [
    "IT services",
    "enterprise technology solutions",
    "cloud infrastructure services",
    "DevOps consulting",
    "cybersecurity solutions",
    "software development",
    "digital transformation",
    "IT consulting services",
    "managed IT services",
    "technology solutions provider",
  ],
  canonicalUrl: `${DEFAULT_SEO.siteUrl}/services`,
  ogImage: "/og-services.jpg",
  ogType: "website",
});

export default function ServicesPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: DEFAULT_SEO.siteUrl },
    { name: "Services", url: `${DEFAULT_SEO.siteUrl}/services` },
  ]);

  const serviceJsonLd = generateJsonLd("Service", {
    name: "Enterprise IT Solutions",
    description:
      "Comprehensive IT services including cloud infrastructure, DevOps consulting, cybersecurity, and digital transformation.",
    serviceType: "Information Technology Services",
    services: [
      {
        name: "Cloud Infrastructure",
        description: "Scalable cloud solutions and migration services",
      },
      {
        name: "DevOps Consulting",
        description: "CI/CD pipeline implementation and automation",
      },
      {
        name: "Cybersecurity",
        description: "Comprehensive security assessments and solutions",
      },
      {
        name: "Software Development",
        description: "Custom software solutions and applications",
      },
      {
        name: "Digital Transformation",
        description: "End-to-end digital transformation strategies",
      },
    ],
  });

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance
                           animate-in fade-in-0 slide-in-from-bottom-8 duration-1000"
            >
              Our Services
            </h1>
            <p
              className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty
                          animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 delay-300"
            >
              Comprehensive IT solutions designed to accelerate your business
              growth, enhance security, and drive digital transformation
            </p>
          </div>
        </section>

        <ServicesGrid />
        <ServicesCta />
      </main>
      <Footer />
    </div>
  );
}
