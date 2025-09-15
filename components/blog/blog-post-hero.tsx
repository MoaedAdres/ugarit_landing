import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BlogPostHeroProps {
  post: {
    title: string
    excerpt: string
    cover_image: { url: string; alt: string }
    author: {
      id: string
      name: string
      role: string
      avatar: string
    }
    published_at: string
    categories: string[]
    tags: string[]
    reading_time: string
  }
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((category, index) => (
              <Badge key={index} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-6 text-balance">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">{post.excerpt}</p>

          {/* Meta Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center space-x-6">
              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-heading font-bold text-primary">
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <Link
                    href={`/blog/author/${post.author.id}`}
                    className="font-heading font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {post.author.name}
                  </Link>
                  <div className="text-sm text-muted-foreground">{post.author.role}</div>
                </div>
              </div>

              {/* Date & Reading Time */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.published_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.reading_time}</span>
                </div>
              </div>
            </div>

            {/* Share Button */}
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
