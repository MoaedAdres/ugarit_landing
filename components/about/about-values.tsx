import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Lightbulb, Award, Clock, Globe } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We operate with transparency, honesty, and ethical practices in all our interactions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and building strong partnerships with our clients.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously explore new technologies and methodologies to deliver cutting-edge solutions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest quality in everything we do, exceeding expectations consistently.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "We deliver on our promises with consistent, dependable service and support.",
  },
  {
    icon: Globe,
    title: "Impact",
    description: "We focus on creating meaningful, measurable impact for our clients and their businesses.",
  },
]

export function AboutValues() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">Our Values</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            The principles that guide our decisions and shape our culture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
