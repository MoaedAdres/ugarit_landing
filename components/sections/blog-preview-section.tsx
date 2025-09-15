import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, User } from "lucide-react"
import Link from "next/link"

interface BlogPreviewSectionProps {
  count: number
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
]

export function BlogPreviewSection({ count }: BlogPreviewSectionProps) {
  const displayPosts = mockBlogPosts.slice(0, count)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Stay updated with the latest trends, best practices, and insights from our technology experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {post.categories.map((category, catIndex) => (
                      <span key={catIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors text-balance">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed text-pretty">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  asChild
                >
                  <Link href={`/blog/${post.id}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
