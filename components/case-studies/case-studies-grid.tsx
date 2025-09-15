import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building } from "lucide-react"
import Link from "next/link"

// Mock case studies data - replace with actual API call
const caseStudies = [
  {
    id: "retail-ml-cost-cut",
    slug: "retail-ml-cost-cut",
    client_name: "RetailMax Corporation",
    sector: "Retail",
    problem: "High operational costs and inefficient inventory management",
    solution: "Implemented ML-powered inventory optimization and cloud migration",
    results_kpis: [
      { label: "Cost Reduction", value: "30%" },
      { label: "Processing Speed", value: "5x faster" },
      { label: "Inventory Accuracy", value: "95%" },
    ],
    logo: { url: "/client-retailmax.png", alt: "RetailMax Corporation" },
    tags: ["Cloud Migration", "Cost Reduction", "Performance"],
    testimonial: "Ugarit Technologies transformed our operations completely.",
  },
  {
    id: "fintech-cloud-migration",
    slug: "fintech-cloud-migration",
    client_name: "SecureBank Solutions",
    sector: "Financial Services",
    problem: "Legacy infrastructure limiting scalability and compliance",
    solution: "Complete cloud migration with enhanced security and compliance framework",
    results_kpis: [
      { label: "Uptime", value: "99.9%" },
      { label: "Security Score", value: "A+" },
      { label: "Compliance", value: "100%" },
    ],
    logo: { url: "/client-securebank.png", alt: "SecureBank Solutions" },
    tags: ["Cloud Migration", "Security", "Performance"],
    testimonial: "The migration was seamless with zero downtime.",
  },
  {
    id: "healthcare-devops",
    slug: "healthcare-devops",
    client_name: "MedTech Regional",
    sector: "Healthcare",
    problem: "Slow deployment cycles and security compliance challenges",
    solution: "DevOps transformation with automated CI/CD and security integration",
    results_kpis: [
      { label: "Deployment Speed", value: "10x faster" },
      { label: "Security Compliance", value: "100%" },
      { label: "Bug Reduction", value: "85%" },
    ],
    logo: { url: "/client-medtech.png", alt: "MedTech Regional" },
    tags: ["DevOps", "Security", "Automation"],
    testimonial: "Our development team is now incredibly efficient.",
  },
  {
    id: "manufacturing-iot",
    slug: "manufacturing-iot",
    client_name: "Industrial Dynamics",
    sector: "Manufacturing",
    problem: "Lack of real-time visibility into production processes",
    solution: "IoT implementation with real-time analytics and predictive maintenance",
    results_kpis: [
      { label: "Downtime Reduction", value: "40%" },
      { label: "Efficiency Gain", value: "25%" },
      { label: "Cost Savings", value: "$2M annually" },
    ],
    logo: { url: "/client-industrial.png", alt: "Industrial Dynamics" },
    tags: ["Automation", "Performance", "Cost Reduction"],
    testimonial: "The IoT solution revolutionized our manufacturing process.",
  },
  {
    id: "education-platform",
    slug: "education-platform",
    client_name: "EduTech University",
    sector: "Education",
    problem: "Outdated learning management system affecting student experience",
    solution: "Modern cloud-based learning platform with scalable architecture",
    results_kpis: [
      { label: "User Satisfaction", value: "92%" },
      { label: "System Performance", value: "3x faster" },
      { label: "Concurrent Users", value: "50K+" },
    ],
    logo: { url: "/client-edutech.png", alt: "EduTech University" },
    tags: ["Cloud Migration", "Performance", "Automation"],
    testimonial: "Students and faculty love the new platform.",
  },
  {
    id: "startup-scaling",
    slug: "startup-scaling",
    client_name: "InnovateLabs",
    sector: "Technology",
    problem: "Rapid growth overwhelming existing infrastructure",
    solution: "Scalable cloud architecture with automated scaling and monitoring",
    results_kpis: [
      { label: "Scalability", value: "1000x" },
      { label: "Response Time", value: "50ms" },
      { label: "Availability", value: "99.99%" },
    ],
    logo: { url: "/client-innovate.png", alt: "InnovateLabs" },
    tags: ["Cloud Migration", "Performance", "Automation"],
    testimonial: "We can now handle massive scale without any issues.",
  },
]

export function CaseStudiesGrid() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={study.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{study.sector}</Badge>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Building className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {study.client_name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{study.problem}</p>
                <p className="text-sm text-foreground">{study.solution}</p>
              </div>

              <CardContent className="p-6">
                {/* Results */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {study.results_kpis.slice(0, 3).map((result, resultIndex) => (
                    <div key={resultIndex} className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="font-heading font-bold text-lg text-primary">{result.value}</div>
                      <div className="text-xs text-muted-foreground">{result.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.slice(0, 2).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="text-sm text-muted-foreground italic mb-4 border-l-2 border-primary/20 pl-3">
                  "{study.testimonial}"
                </blockquote>

                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  asChild
                >
                  <Link href={`/case-studies/${study.slug}`}>
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Case Studies
          </Button>
        </div>
      </div>
    </section>
  )
}
