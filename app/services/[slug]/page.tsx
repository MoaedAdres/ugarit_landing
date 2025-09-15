import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServiceHero } from "@/components/services/service-hero"
import { ServiceFeatures } from "@/components/services/service-features"
import { ServiceProcess } from "@/components/services/service-process"
import { ServiceFaqs } from "@/components/services/service-faqs"
import { ServiceCta } from "@/components/services/service-cta"
import { RelatedServices } from "@/components/services/related-services"
import { notFound } from "next/navigation"

// Mock service data - replace with actual API call
const getServiceData = (slug: string) => {
  const services: Record<string, any> = {
    cloud: {
      slug: "cloud",
      title: "Cloud Services",
      excerpt: "Comprehensive cloud migration and optimization services for Azure and AWS",
      hero_media: { url: "/service-cloud-hero.png", alt: "Cloud infrastructure" },
      body_blocks: [
        {
          type: "rich_text",
          content:
            "Transform your business with our comprehensive cloud services. We help organizations migrate, optimize, and manage their cloud infrastructure with expert guidance and proven methodologies.",
        },
      ],
      features: [
        "Azure & AWS Migration",
        "Cloud Architecture Design",
        "Cost Optimization",
        "24/7 Monitoring & Support",
        "Disaster Recovery Planning",
        "Multi-cloud Strategy",
      ],
      benefits: [
        "Reduce infrastructure costs by up to 40%",
        "Improve scalability and flexibility",
        "Enhanced security and compliance",
        "24/7 expert support and monitoring",
      ],
      process_steps: [
        {
          title: "Assessment & Planning",
          description: "Comprehensive analysis of your current infrastructure and migration strategy development",
        },
        {
          title: "Migration Execution",
          description: "Careful migration of applications and data with minimal downtime",
        },
        {
          title: "Optimization & Monitoring",
          description: "Ongoing optimization and 24/7 monitoring to ensure peak performance",
        },
      ],
      faqs: [
        {
          question: "How long does a typical cloud migration take?",
          answer:
            "Migration timelines vary based on complexity, but most projects complete within 3-6 months with our proven methodology.",
        },
        {
          question: "What about data security during migration?",
          answer:
            "We implement enterprise-grade security measures and encryption throughout the migration process to ensure your data remains protected.",
        },
      ],
      related_services: ["devops", "security"],
      contact_cta: {
        title: "Ready to Move to the Cloud?",
        subtitle: "Let's discuss your cloud migration strategy",
      },
    },
    devops: {
      slug: "devops",
      title: "DevOps Solutions",
      excerpt: "Streamline development with CI/CD pipelines, automation, and best practices",
      hero_media: { url: "/service-devops-hero.png", alt: "DevOps pipeline" },
      body_blocks: [
        {
          type: "rich_text",
          content:
            "Accelerate your software delivery with our comprehensive DevOps solutions. We implement CI/CD pipelines, infrastructure automation, and monitoring to help your team deploy faster and more reliably.",
        },
      ],
      features: [
        "CI/CD Pipeline Implementation",
        "Infrastructure as Code",
        "Container Orchestration",
        "Automated Testing",
        "Monitoring & Alerting",
        "Security Integration",
      ],
      benefits: [
        "Deploy 10x faster with automated pipelines",
        "Reduce deployment failures by 90%",
        "Improve team collaboration and efficiency",
        "Enhanced security with DevSecOps practices",
      ],
      process_steps: [
        {
          title: "Current State Analysis",
          description: "Assess existing development and deployment processes to identify improvement opportunities",
        },
        {
          title: "Pipeline Design & Implementation",
          description: "Design and implement automated CI/CD pipelines tailored to your technology stack",
        },
        {
          title: "Training & Optimization",
          description: "Train your team and continuously optimize processes for maximum efficiency",
        },
      ],
      faqs: [
        {
          question: "What technologies do you work with?",
          answer:
            "We work with all major platforms including Jenkins, GitLab CI, Azure DevOps, AWS CodePipeline, Docker, Kubernetes, and more.",
        },
        {
          question: "How do you ensure security in DevOps?",
          answer:
            "We implement DevSecOps practices, integrating security scanning, compliance checks, and vulnerability assessments into every stage of the pipeline.",
        },
      ],
      related_services: ["cloud", "security"],
      contact_cta: {
        title: "Ready to Accelerate Your Development?",
        subtitle: "Let's build your DevOps pipeline",
      },
    },
  }

  return services[slug] || null
}

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceData(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <ServiceHero service={service} />
        <ServiceFeatures service={service} />
        <ServiceProcess steps={service.process_steps} />
        <ServiceFaqs faqs={service.faqs} />
        <RelatedServices relatedIds={service.related_services} />
        <ServiceCta cta={service.contact_cta} />
      </main>
      <Footer />
    </div>
  )
}
