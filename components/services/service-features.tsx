import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceFeaturesProps {
  service: {
    features: string[]
    benefits: string[]
  }
}

export function ServiceFeatures({ service }: ServiceFeaturesProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Features */}
          <div>
            <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-balance">What's Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-balance">Key Benefits</h2>
            <div className="space-y-4">
              {service.benefits.map((benefit, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <p className="text-muted-foreground">{benefit}</p>
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
