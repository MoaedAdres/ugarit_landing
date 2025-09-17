import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CtaSectionProps {
  cta: {
    title: string;
    subtitle: string;
    button: { label: string; href: string };
  };
}

export function CtaSection({ cta }: CtaSectionProps) {
  return (
    <section className="py-20  text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-balance">
            {cta.title}
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 text-pretty">
            {cta.subtitle}
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6"
          >
            <Link href={cta.button.href}>{cta.button.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
