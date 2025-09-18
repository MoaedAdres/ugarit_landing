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
import ArticleShowcase from "@/components/sections/Articles";
interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  emoji: string;
}

interface ArticleCardProps {
  article: Article;
  isVisible: boolean;
  index: number;
}
export default async function HomePage() {
  const homeData = await fetchHomePage();
  const articles: Article[] = [
    {
      id: 1,
      title: "The Future of Web Development in 2023",
      excerpt: "Exploring the latest trends and technologies that are shaping the future of web development.",
      category: "Technology",
      author: "Sarah Johnson",
      date: "May 15, 2023",
      readTime: "8 min",
      emoji: "💻"
    },
    {
      id: 2,
      title: "Growth Strategies for Startups",
      excerpt: "Effective strategies that can help startups scale quickly and sustainably in competitive markets.",
      category: "Business",
      author: "Michael Chen",
      date: "May 10, 2023",
      readTime: "6 min",
      emoji: "📈"
    },
    {
      id: 3,
      title: "UI/UX Trends for Modern Applications",
      excerpt: "Discover the latest UI/UX design trends that are enhancing user experiences across digital platforms.",
      category: "Design",
      author: "Emma Rodriguez",
      date: "May 5, 2023",
      readTime: "10 min",
      emoji: "🎨"
    },
    {
      id: 4,
      title: "The Psychology of User Decision Making",
      excerpt: "Understanding how users make decisions can help designers create more effective interfaces.",
      category: "Psychology",
      author: "David Wilson",
      date: "May 18, 2023",
      readTime: "12 min",
      emoji: "🧠"
    },
    {
      id: 5,
      title: "Serverless Architecture Patterns",
      excerpt: "How to build scalable applications using serverless technologies and patterns.",
      category: "Technology",
      author: "Alex Turner",
      date: "May 12, 2023",
      readTime: "9 min",
      emoji: "☁️"
    },
    {
      id: 6,
      title: "Data Visualization Best Practices",
      excerpt: "Learn how to present complex data in ways that are easy to understand and actionable.",
      category: "Data Science",
      author: "Jessica Lee",
      date: "May 8, 2023",
      readTime: "7 min",
      emoji: "📊"
    }
  ];
  return (
    <div className="min-h-screen">
      <Header navigations={homeData.navigations} />
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
        <ArticleShowcase articles={articles} />
      </main>
      <Footer />
    </div>
  );
}
