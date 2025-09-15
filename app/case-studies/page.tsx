import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CaseStudiesGrid } from "@/components/case-studies/case-studies-grid"
import { CaseStudiesFilters } from "@/components/case-studies/case-studies-filters"

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
              Case Studies
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Real results from real clients. Discover how we've helped businesses transform their IT infrastructure and
              achieve measurable success
            </p>
          </div>
        </section>

        <CaseStudiesFilters />
        <CaseStudiesGrid />
      </main>
      <Footer />
    </div>
  )
}
