import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield, CheckCircle } from "lucide-react"

const certifications = [
  {
    category: "Cloud Platforms",
    items: ["Microsoft Azure Certified", "AWS Advanced Consulting Partner", "Google Cloud Partner"],
  },
  {
    category: "Security & Compliance",
    items: ["ISO 27001 Certified", "SOC 2 Type II", "GDPR Compliant"],
  },
  {
    category: "Industry Standards",
    items: ["ITIL Foundation", "Agile Certified", "DevOps Institute Partner"],
  },
]

const awards = [
  "Microsoft Partner of the Year 2023",
  "AWS Rising Star Partner 2022",
  "Best Cloud Migration Service 2023",
  "Excellence in DevOps Implementation 2022",
]

export function AboutCertifications() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">
            Certifications & Awards
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our commitment to excellence recognized by industry leaders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <div className="flex items-center mb-8">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h3 className="font-heading font-bold text-2xl text-foreground">Certifications</h3>
            </div>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h4 className="font-heading font-semibold text-lg text-foreground mb-4">{cert.category}</h4>
                    <div className="space-y-2">
                      {cert.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div>
            <div className="flex items-center mb-8">
              <Award className="h-8 w-8 text-primary mr-3" />
              <h3 className="font-heading font-bold text-2xl text-foreground">Awards & Recognition</h3>
            </div>
            <div className="space-y-4">
              {awards.map((award, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{award}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
