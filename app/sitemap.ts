import { MetadataRoute } from "next";
import { DEFAULT_SEO } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DEFAULT_SEO.siteUrl;

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // In a real application, you would fetch these from your CMS/database
  // For now, we'll generate some example dynamic pages
  const services = [
    "cloud-infrastructure",
    "devops-consulting",
    "cybersecurity",
    "software-development",
    "it-consulting",
    "digital-transformation",
  ];

  const dynamicServicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Example case studies
  const caseStudies = [
    "enterprise-cloud-migration",
    "fintech-security-audit",
    "startup-devops-implementation",
    "healthcare-compliance-system",
  ];

  const dynamicCaseStudyPages = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Example blog posts
  const blogPosts = [
    "kubernetes-best-practices-2024",
    "cloud-security-checklist",
    "devops-transformation-guide",
    "ai-in-enterprise-development",
  ];

  const dynamicBlogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...dynamicServicePages,
    ...dynamicCaseStudyPages,
    ...dynamicBlogPages,
  ];
}
