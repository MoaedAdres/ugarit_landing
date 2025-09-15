import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, FileText, Users } from "lucide-react"
import Link from "next/link"

export function CareersApplication() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">
            Application Process
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">Simple steps to join our team</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-8">
              <FileText className="h-12 w-12 text-primary mx-auto mb-6" />
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">1. Apply</h3>
              <p className="text-muted-foreground">Submit your application with resume and cover letter</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <Users className="h-12 w-12 text-primary mx-auto mb-6" />
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">2. Interview</h3>
              <p className="text-muted-foreground">Meet with our team to discuss your experience and goals</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <Mail className="h-12 w-12 text-primary mx-auto mb-6" />
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">3. Decision</h3>
              <p className="text-muted-foreground">Receive feedback and hopefully welcome you to the team!</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">Questions About Working Here?</h3>
              <p className="text-muted-foreground mb-6">
                We'd love to hear from you. Reach out to our HR team for any questions about careers, culture, or
                opportunities.
              </p>
              <Button asChild>
                <Link href="mailto:careers@ugarittech.com">Contact HR Team</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
