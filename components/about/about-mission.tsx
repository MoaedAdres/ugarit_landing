import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Heart } from "lucide-react"

export function AboutMission() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mission */}
          <Card className="text-center">
            <CardContent className="p-8">
              <Target className="h-12 w-12 text-primary mx-auto mb-6" />
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with cutting-edge technology solutions that drive innovation, efficiency, and
                sustainable growth in an ever-evolving digital landscape.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="text-center">
            <CardContent className="p-8">
              <Eye className="h-12 w-12 text-primary mx-auto mb-6" />
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the trusted technology partner that enables organizations to thrive in the digital age through
                innovative solutions and exceptional service delivery.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <Card className="text-center">
            <CardContent className="p-8">
              <Heart className="h-12 w-12 text-primary mx-auto mb-6" />
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">Our Purpose</h3>
              <p className="text-muted-foreground leading-relaxed">
                To bridge the gap between complex technology and business success, making advanced IT solutions
                accessible and impactful for organizations of all sizes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
