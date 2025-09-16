import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

interface RelatedPostsProps {
  currentSlug: string;
}

// Mock related posts - replace with actual API call
const relatedPosts = [
  {
    slug: "devops-security-integration",
    title: "Integrating Security into Your DevOps Pipeline",
    excerpt:
      "Discover how to implement DevSecOps practices that enhance security without slowing down development.",
    published_at: "2024-01-10",
    categories: ["DevOps", "Security"],
    reading_time: "8 min read",
  },
  {
    slug: "kubernetes-monitoring-guide",
    title: "Complete Guide to Kubernetes Monitoring and Observability",
    excerpt:
      "Master the tools and techniques needed to effectively monitor Kubernetes clusters in production.",
    published_at: "2024-01-05",
    categories: ["DevOps", "Monitoring"],
    reading_time: "10 min read",
  },
];

export function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const filteredPosts = relatedPosts.filter(
    (post) => post.slug !== currentSlug,
  );

  if (filteredPosts.length === 0) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-4 text-balance">
            Related Articles
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Continue reading with these related insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredPosts.map((post, index) => (
            <Card
              key={post.slug}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((category, catIndex) => (
                    <Badge key={catIndex} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors text-balance">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-pretty">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{post.reading_time}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    asChild
                  >
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
