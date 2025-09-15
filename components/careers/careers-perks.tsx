import { Card, CardContent } from "@/components/ui/card"
import { Heart, Zap, Users, GraduationCap, Globe, Coffee } from "lucide-react"

const perks = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, dental, vision, and wellness programs",
  },
  {
    icon: Zap,
    title: "Flexible Work",
    description: "Remote work options, flexible hours, and work-life balance",
  },
  {
    icon: Users,
    title: "Great Team",
    description: "Collaborative culture with talented, passionate colleagues",
  },
  {
    icon: GraduationCap,
    title: "Learning & Growth",
    description: "Professional development, certifications, and conference attendance",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Work on projects that make a difference for clients worldwide",
  },
  {
    icon: Coffee,
    title: "Great Perks",
    description: "Competitive salary, equity options, and amazing office amenities",
  },
]

export function CareersPerks() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">
            Why Work With Us?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            We believe in creating an environment where our team can thrive and do their best work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perks.map((perk, index) => {
            const IconComponent = perk.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">{perk.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{perk.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
