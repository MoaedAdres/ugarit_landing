import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock featured blog post - replace with actual API call
const featuredPost = {
  id: "future-of-cloud-computing",
  slug: "future-of-cloud-computing",
  title: "The Future of Cloud Computing: Trends Shaping 2024 and Beyond",
  excerpt:
    "Explore the emerging trends in cloud computing that are revolutionizing how businesses operate, from edge computing to serverless architectures and AI-driven automation.",
  cover_image: { url: "/blog-featured-cloud.png", alt: "Future of cloud computing" },
  author: {
    name: "David Kim",
    role: "Cloud Solutions Architect",
    avatar: "/author-david.png",
  },
  published_at: "2024-01-20",
  categories: ["Cloud", "Technology Trends"],
  reading_time: "8 min read",
  featured: true,
}

export function BlogFeatured() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            Featured Article
          </Badge>
        </div>

        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="aspect-video lg:aspect-auto">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">☁️</span>
                  </div>
                  <p className="text-muted-foreground">{featuredPost.cover_image.alt}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredPost.categories.map((category, index) => (
                  <Badge key={index} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>

              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4 text-balance">
                {featuredPost.title}
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">{featuredPost.excerpt}</p>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-heading font-semibold text-primary text-sm">
                      {featuredPost.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{featuredPost.author.name}</div>
                    <div className="text-sm text-muted-foreground">{featuredPost.author.role}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(featuredPost.published_at).toLocaleDateString()}</span>
                  </div>
                  <div>{featuredPost.reading_time}</div>
                </div>
              </div>

              <Button asChild size="lg">
                <Link href={`/blog/${featuredPost.slug}`}>
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}
