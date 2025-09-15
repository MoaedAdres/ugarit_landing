import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock blog posts data - replace with actual API call
const blogPosts = [
  {
    id: "cloud-migration-best-practices",
    slug: "cloud-migration-best-practices",
    title: "Cloud Migration Best Practices for Enterprise Applications",
    excerpt:
      "Learn the essential strategies and considerations for successfully migrating enterprise applications to the cloud without disrupting business operations.",
    cover_image: { url: "/blog-cloud-migration.png", alt: "Cloud migration strategy" },
    author: {
      id: "david-kim",
      name: "David Kim",
      role: "Cloud Solutions Architect",
    },
    published_at: "2024-01-15",
    categories: ["Cloud", "Best Practices"],
    tags: ["Azure", "AWS", "Migration"],
    reading_time: "6 min read",
  },
  {
    id: "devops-security-integration",
    slug: "devops-security-integration",
    title: "Integrating Security into Your DevOps Pipeline",
    excerpt:
      "Discover how to implement DevSecOps practices that enhance security without slowing down your development and deployment processes.",
    cover_image: { url: "/blog-devsecops.png", alt: "DevSecOps pipeline" },
    author: {
      id: "emily-zhang",
      name: "Emily Zhang",
      role: "DevOps Engineer",
    },
    published_at: "2024-01-10",
    categories: ["DevOps", "Security"],
    tags: ["CI/CD", "Security", "Automation"],
    reading_time: "8 min read",
  },
  {
    id: "kubernetes-monitoring-guide",
    slug: "kubernetes-monitoring-guide",
    title: "Complete Guide to Kubernetes Monitoring and Observability",
    excerpt:
      "Master the tools and techniques needed to effectively monitor and troubleshoot Kubernetes clusters in production environments.",
    cover_image: { url: "/blog-kubernetes.png", alt: "Kubernetes monitoring dashboard" },
    author: {
      id: "alex-rodriguez",
      name: "Alex Rodriguez",
      role: "Platform Engineer",
    },
    published_at: "2024-01-05",
    categories: ["DevOps", "Monitoring"],
    tags: ["Kubernetes", "Monitoring", "Observability"],
    reading_time: "10 min read",
  },
  {
    id: "ai-infrastructure-optimization",
    slug: "ai-infrastructure-optimization",
    title: "AI-Driven Infrastructure Optimization: The Next Frontier",
    excerpt:
      "Explore how artificial intelligence is revolutionizing infrastructure management and optimization for modern enterprises.",
    cover_image: { url: "/blog-ai-infrastructure.png", alt: "AI infrastructure optimization" },
    author: {
      id: "sarah-chen",
      name: "Sarah Chen",
      role: "AI Solutions Architect",
    },
    published_at: "2024-01-01",
    categories: ["AI & ML", "Cloud"],
    tags: ["AI", "Optimization", "Automation"],
    reading_time: "7 min read",
  },
  {
    id: "microservices-architecture-patterns",
    slug: "microservices-architecture-patterns",
    title: "Microservices Architecture Patterns for Scalable Applications",
    excerpt:
      "Learn proven patterns and best practices for designing and implementing microservices architectures that scale.",
    cover_image: { url: "/blog-microservices.png", alt: "Microservices architecture diagram" },
    author: {
      id: "michael-torres",
      name: "Michael Torres",
      role: "Software Architect",
    },
    published_at: "2023-12-28",
    categories: ["Architecture", "Best Practices"],
    tags: ["Microservices", "Architecture", "Scalability"],
    reading_time: "9 min read",
  },
  {
    id: "zero-trust-security-model",
    slug: "zero-trust-security-model",
    title: "Implementing Zero Trust Security in Modern IT Infrastructure",
    excerpt:
      "A comprehensive guide to implementing zero trust security principles to protect your organization's digital assets.",
    cover_image: { url: "/blog-zero-trust.png", alt: "Zero trust security model" },
    author: {
      id: "jennifer-lee",
      name: "Jennifer Lee",
      role: "Security Consultant",
    },
    published_at: "2023-12-25",
    categories: ["Security", "Best Practices"],
    tags: ["Security", "Zero Trust", "Compliance"],
    reading_time: "11 min read",
  },
]

export function BlogGrid() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Cover Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {post.categories.slice(0, 2).map((category, catIndex) => (
                      <Badge key={catIndex} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors text-balance">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed text-pretty">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <Link href={`/blog/author/${post.author.id}`} className="hover:text-primary transition-colors">
                      {post.author.name}
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.reading_time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
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

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </section>
  )
}
