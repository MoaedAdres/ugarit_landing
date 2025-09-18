import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import SingleBlog from "./SingleBlog";

interface BlogPreviewSectionProps {
  count: number;
}

// Mock blog posts data - replace with actual API call
const mockBlogPosts = [
  {
    id: "cloud-migration-best-practices",
    title: "Cloud Migration Best Practices for Enterprise Applications",
    excerpt:
      "Learn the essential strategies and considerations for successfully migrating enterprise applications to the cloud without disrupting business operations.",
    author: "David Kim",
    published_at: "2024-01-15",
    cover_image: "/blog-cloud-migration.png",
    categories: ["Cloud", "Migration"],
  },
  {
    id: "devops-security-integration",
    title: "Integrating Security into Your DevOps Pipeline",
    excerpt:
      "Discover how to implement DevSecOps practices that enhance security without slowing down your development and deployment processes.",
    author: "Emily Zhang",
    published_at: "2024-01-10",
    cover_image: "/blog-devsecops.png",
    categories: ["DevOps", "Security"],
  },
  {
    id: "kubernetes-monitoring-guide",
    title: "Complete Guide to Kubernetes Monitoring and Observability",
    excerpt:
      "Master the tools and techniques needed to effectively monitor and troubleshoot Kubernetes clusters in production environments.",
    author: "Alex Rodriguez",
    published_at: "2024-01-05",
    cover_image: "/blog-kubernetes.png",
    categories: ["Kubernetes", "Monitoring"],
  },
];

export function BlogPreviewSection({ count }: BlogPreviewSectionProps) {
  const displayPosts = mockBlogPosts.slice(0, count).map((blog, index) => ({ ...blog, index }));

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Stay updated with the latest trends, best practices, and insights
            from our technology experts
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {displayPosts.map((post) => (
            <SingleBlog article={post} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
