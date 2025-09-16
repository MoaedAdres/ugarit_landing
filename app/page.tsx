import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesHighlights } from "@/components/sections/services-highlights";
import { FeaturesSection } from "@/components/sections/features-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { BlogPreviewSection } from "@/components/sections/blog-preview-section";
import { CtaSection } from "@/components/sections/cta-section";
import { fetchHomePage } from "@/lib/api";

export default async function HomePage() {
	const homeData = await fetchHomePage();

	return (
		<div className="min-h-screen">
			<Header />
			<main>
				<HeroSection hero={homeData.hero} />
				<ServicesHighlights highlights={homeData.highlights} />
				<FeaturesSection features={homeData.features} />
				<StatsSection kpis={homeData.kpis} />
				<CaseStudiesSection caseStudyIds={homeData.case_studies} />
				<TestimonialsSection testimonialIds={homeData.testimonials} />
				<PartnersSection partnerIds={homeData.partners} />
				<PricingSection />
				<BlogPreviewSection count={homeData.blog_preview_count} />
				<CtaSection cta={homeData.cta} />
			</main>
			<Footer />
		</div>
	);
}
