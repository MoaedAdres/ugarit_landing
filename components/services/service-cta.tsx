import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ServiceCtaProps {
  cta: {
    title: string;
    subtitle: string;
  };
}

export function ServiceCta({ cta }: ServiceCtaProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-balance">
            {cta.title}
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 text-pretty">
            {cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
            >
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
