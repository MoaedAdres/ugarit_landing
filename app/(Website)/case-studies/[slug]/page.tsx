import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyOverview } from "@/components/case-studies/case-study-overview";
import { CaseStudyResults } from "@/components/case-studies/case-study-results";
import { CaseStudyTestimonial } from "@/components/case-studies/case-study-testimonial";
import { CaseStudyGallery } from "@/components/case-studies/case-study-gallery";
import { RelatedCaseStudies } from "@/components/case-studies/related-case-studies";
import { CaseStudyCta } from "@/components/case-studies/case-study-cta";
import { notFound } from "next/navigation";

// Mock case study data - replace with actual API call
const getCaseStudyData = (slug: string) => {
  const caseStudies: Record<string, any> = {
    "retail-ml-cost-cut": {
      id: "retail-ml-cost-cut",
      slug: "retail-ml-cost-cut",
      client_name: "RetailMax Corporation",
      sector: "Retail",
      problem:
        "RetailMax was struggling with high operational costs and inefficient inventory management across their 200+ store network. Manual processes were leading to stockouts, overstock situations, and significant waste.",
      solution:
        "We implemented a comprehensive ML-powered inventory optimization system combined with a complete cloud migration to Azure. The solution included real-time analytics, predictive modeling, and automated reordering systems.",
      results_kpis: [
        { label: "Cost Reduction", value: "30%" },
        { label: "Processing Speed", value: "5x faster" },
        { label: "Inventory Accuracy", value: "95%" },
        { label: "Stockout Reduction", value: "60%" },
        { label: "Waste Reduction", value: "45%" },
        { label: "ROI", value: "280%" },
      ],
      body_blocks: [
        {
          type: "challenge",
          title: "The Challenge",
          content:
            "RetailMax's legacy inventory system was causing significant operational inefficiencies. With over 200 stores and thousands of SKUs, manual inventory management was no longer sustainable. The company was experiencing frequent stockouts during peak seasons while simultaneously dealing with excess inventory in slow-moving categories.",
        },
        {
          type: "solution",
          title: "Our Solution",
          content:
            "We designed and implemented a comprehensive digital transformation strategy that included machine learning algorithms for demand forecasting, automated inventory optimization, and a complete migration to Azure cloud infrastructure. The solution integrated with existing POS systems and provided real-time visibility across all locations.",
        },
        {
          type: "implementation",
          title: "Implementation Process",
          content:
            "The project was executed in three phases over 6 months: Phase 1 involved data migration and cloud setup, Phase 2 focused on ML model development and testing, and Phase 3 included full deployment and staff training. We ensured zero downtime during the transition.",
        },
      ],
      testimonial_ref: {
        quote:
          "Ugarit Technologies completely transformed our operations. The ML-powered inventory system has not only reduced our costs by 30% but also improved customer satisfaction significantly. We can now predict demand patterns with incredible accuracy.",
        name: "Sarah Johnson",
        role: "Chief Operations Officer",
        company: "RetailMax Corporation",
        avatar: "/testimonial-sarah.png",
      },
      logo: { url: "/client-retailmax.png", alt: "RetailMax Corporation" },
      gallery: [
        { url: "/case-study-retail-1.png", alt: "Dashboard overview" },
        { url: "/case-study-retail-2.png", alt: "Analytics interface" },
        { url: "/case-study-retail-3.png", alt: "Mobile application" },
      ],
      tags: [
        "Cloud Migration",
        "Machine Learning",
        "Cost Reduction",
        "Performance",
      ],
      timeline: "6 months",
      team_size: "8 specialists",
    },
  };

  return caseStudies[slug] || null;
};

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyData(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        <CaseStudyHero caseStudy={caseStudy} />
        <CaseStudyOverview caseStudy={caseStudy} />
        <CaseStudyResults results={caseStudy.results_kpis} />
        <CaseStudyTestimonial testimonial={caseStudy.testimonial_ref} />
        <CaseStudyGallery gallery={caseStudy.gallery} />
        <RelatedCaseStudies currentSlug={caseStudy.slug} />
        <CaseStudyCta />
      </main>
    </div>
  );
}
