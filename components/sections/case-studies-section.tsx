import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
interface CaseStudiesSectionProps {
  caseStudyIds: string[];
}

// Mock case studies data - replace with actual API call
const mockCaseStudies = [
  {
    id: "retail-ml-cost-cut",
    title: "Retail Chain ML Implementation",
    client: "Major Retail Corporation",
    sector: "Retail",
    summary:
      "Reduced operational costs by 30% through machine learning optimization",
    results: [
      { label: "Cost Reduction", value: "30%" },
      { label: "Processing Speed", value: "5x faster" },
    ],
    image: "/case-study-retail.png",
  },
  {
    id: "fintech-cloud-migration",
    title: "FinTech Cloud Migration",
    client: "Financial Services Startup",
    sector: "Financial Services",
    summary: "Seamless cloud migration with 99.9% uptime and enhanced security",
    results: [
      { label: "Uptime", value: "99.9%" },
      { label: "Security Score", value: "A+" },
    ],
    image: "/case-study-fintech.png",
  },
  {
    id: "healthcare-devops",
    title: "Healthcare DevOps Transformation",
    client: "Regional Healthcare Network",
    sector: "Healthcare",
    summary: "Accelerated deployment cycles and improved patient data security",
    results: [
      { label: "Deployment Speed", value: "10x faster" },
      { label: "Security Compliance", value: "100%" },
    ],
    image: "/case-study-healthcare.png",
  },
  {
    id: "healthcare-devopss",
    title: "Healthcare DevOps Transformation",
    client: "Regional Healthcare Network",
    sector: "Healthcare",
    summary: "Accelerated deployment cycles and improved patient data security",
    results: [
      { label: "Deployment Speed", value: "10x faster" },
      { label: "Security Compliance", value: "100%" },
    ],
    image: "/case-study-healthcare.png",
  },
  {
    id: "healthcare-devopsss",
    title: "Healthcare DevOps Transformation",
    client: "Regional Healthcare Network",
    sector: "Healthcare",
    summary: "Accelerated deployment cycles and improved patient data security",
    results: [
      { label: "Deployment Speed", value: "10x faster" },
      { label: "Security Compliance", value: "100%" },
    ],
    image: "/case-study-healthcare.png",
  },

];

// import required modules
import MySwiper from "../Reusable-components/MySwiper";

export function CaseStudiesSection({ caseStudyIds }: CaseStudiesSectionProps) {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Success <span className="text-secondary-foreground">Stories</span>
          </h2>
          <p className="text-lg text-secondary-800 max-w-2xl mx-auto leading-relaxed">
            Real results from real clients. See how we've helped businesses
            transform their IT infrastructure
          </p>
        </div>
        <MySwiper xsSpaceBetween={0} activeSlideClasses="" effect={'coverflow'} grabCursor={true} slidesPerView={"auto"} loop={true} speed={2000} autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
          showNextButton={false}
          showPreviousButton={false}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          swiperClasses="h-[600px] !py-0 xl:h-[650px]"
          wrapperClasses=""
          swiperSlideClasses="!w-fit !h-full"
        >
          {mockCaseStudies.map((study) => (
            <Card
              key={study.id}
              className="group !py-0 hover:shadow-glow transition-all duration-300 border-0 gradient-card overflow-hidden"
            >
              {/* Image placeholder with overlay */}
              <div className="h-60 bg-gradient-to-br from-tech-blue/20 to-tech-teal/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-tech-navy/60 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-10 w-10 text-white mx-auto mb-2" />
                    <p className="text-xs text-white/80 font-medium">
                      {study.sector}
                    </p>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-secondary-900 mb-2 transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs text-secondary-950 mb-1 tracking-wide font-medium">
                  {study.client}
                </p>
                <p className="text-sm text-secondary-800 mb-4 leading-relaxed">
                  {study.summary}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {study.results.map((result, resultIndex) => (
                    <div
                      key={resultIndex}
                      className="text-center p-3 bg-primary/5 rounded-lg border border-primary/10"
                    >
                      <div className="font-bold text-base text-secondary">
                        {result.value}
                      </div>
                      <div className="text-xs text-secondary-900">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="group/btn text-seondary hover:text-primary hover:bg-primary/10 p-0 h-auto font-medium text-sm w-full justify-center"
                  asChild
                >
                  <Link href={`/case-studies/${study.id}`}>
                    Read Full Story
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </MySwiper>
        {/* </div> */}

        <div className="text-center">
          <Button
            className="gradient-primary hover:opacity-90 transition-smooth px-6 py-3 font-semibold"
            asChild
          >
            <Link href="/case-studies">
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section >
  );
}
