import Image from "next/image";
import { Check } from "lucide-react";

interface Feature {
  title: string;
  bullets: string[];
  media: { url: string };
  variant: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-12 ${
              feature.variant === "image-right"
                ? "lg:flex-row"
                : "lg:flex-row-reverse"
            } animate-in fade-in-0 slide-in-from-bottom-8 duration-1000`}
            style={{ animationDelay: `${index * 300}ms` }}
          >
            {/* Content */}
            <div className="flex-1 space-y-6">
              <h2
                className="text-3xl md:text-4xl font-bold text-tech-navy mb-4
                           transition-colors duration-300 hover:text-primary"
              >
                {feature.title}
              </h2>
              <div className="space-y-4">
                {feature.bullets.map((bullet, bulletIndex) => (
                  <div
                    key={bulletIndex}
                    className="flex items-start space-x-3 group transition-all duration-300 hover:translate-x-2"
                    style={{
                      animationDelay: `${index * 300 + bulletIndex * 100}ms`,
                    }}
                  >
                    <div
                      className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                                   transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                    >
                      <Check className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-tech-navy">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="flex-1">
              <div
                className="relative aspect-video rounded-xl overflow-hidden shadow-lg transition-all duration-500 
                             hover:shadow-glow hover:scale-105 hover:-rotate-1 transform-gpu"
              >
                <Image
                  src={feature.media.url || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 
                               transition-opacity duration-500 hover:opacity-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
