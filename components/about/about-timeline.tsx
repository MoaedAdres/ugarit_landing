import { Card, CardContent } from "@/components/ui/card"

const milestones = [
  {
    year: "2016",
    title: "Company Founded",
    description: "Ugarit Technologies was established with a vision to transform IT infrastructure for businesses.",
  },
  {
    year: "2018",
    title: "Cloud Specialization",
    description: "Became certified Azure and AWS partners, focusing on cloud migration and optimization services.",
  },
  {
    year: "2020",
    title: "DevOps Excellence",
    description: "Expanded services to include comprehensive DevOps solutions and automation frameworks.",
  },
  {
    year: "2022",
    title: "AI Integration",
    description: "Launched AI-powered infrastructure optimization and predictive analytics services.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Opened international offices and established partnerships with leading technology providers.",
  },
]

export function AboutTimeline() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">Our Journey</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Key milestones in our growth and evolution as a technology leader
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                        <span className="font-heading font-bold text-primary-foreground text-lg">{milestone.year}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-xl text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </CardContent>

                {/* Timeline connector */}
                {index < milestones.length - 1 && (
                  <div className="absolute left-12 top-24 w-0.5 h-8 bg-border hidden md:block" />
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
