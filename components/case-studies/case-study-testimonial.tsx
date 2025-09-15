import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  avatar: string
}

interface CaseStudyTestimonialProps {
  testimonial: Testimonial
}

export function CaseStudyTestimonial({ testimonial }: CaseStudyTestimonialProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <Quote className="h-12 w-12 text-primary/20 mx-auto mb-8" />
            <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 text-pretty">
              "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="font-heading font-bold text-primary text-xl">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="text-left">
                <div className="font-heading font-bold text-lg text-foreground">{testimonial.name}</div>
                <div className="text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
