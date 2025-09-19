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
    <section className="py-20 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="-mb-6 border border-secondary px-0 md:px-10 py-5 rounded-lg backdrop-blur-3xl backdrop-brightness-150 max-w-4xl mx-auto">
          <h2 className="font-heading text-secondary-900 font-bold text-2xl md:text-3xl lg:text-4xl mb-4 text-balance">
            {cta.title}
          </h2>
          <p className="text-lg md:text-xl mb-8 text-secondary-foreground text-pretty">
            {cta.subtitle}
          </p>
        </div>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="text-lg px-8 py-6"
        >
          <Link href={cta.button.href}>{cta.button.label}</Link>
        </Button>
      </div>
    </section>
  );
}
