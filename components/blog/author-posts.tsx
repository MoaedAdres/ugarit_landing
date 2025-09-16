import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AuthorPostsProps {
  authorId: string;
}

// Mock author posts - replace with actual API call
const authorPosts = [
  {
    slug: "cloud-migration-best-practices",
    title: "Cloud Migration Best Practices for Enterprise Applications",
    excerpt:
      "Learn the essential strategies and considerations for successfully migrating enterprise applications to the cloud.",
    published_at: "2024-01-15",
    categories: ["Cloud", "Best Practices"],
    reading_time: "6 min read",
  },
  {
    slug: "azure-cost-optimization",
    title: "Azure Cost Optimization: Strategies for Enterprise Workloads",
    excerpt:
      "Discover proven techniques to optimize your Azure spending while maintaining performance and reliability.",
    published_at: "2024-01-08",
    categories: ["Cloud", "Azure"],
    reading_time: "8 min read",
  },
];

export function AuthorPosts({ authorId }: AuthorPostsProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-12 text-center">
            Latest Articles
          </h2>

          <div className="space-y-8">
            {authorPosts.map((post, index) => (
              <Card
                key={post.slug}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category, catIndex) => (
                      <Badge key={catIndex} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors text-balance">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(post.published_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.reading_time}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="bg-transparent"
                      asChild
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
