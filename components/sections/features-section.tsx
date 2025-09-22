import { StaticImageData } from "next/image";
import MyImage from "../Reusable-components/MyImage";
import Check from "@/public/gifs/features/check.gif"
interface Feature {
  title: string;
  bullets: string[];
  media: { url: StaticImageData, darkUrl: StaticImageData };
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
            className={`flex flex-col lg:flex-row items-center ${feature.variant === "image-right"
              ? "lg:flex-row"
              : "lg:flex-row-reverse"
              } animate-in fade-in-0 slide-in-from-bottom-8 duration-1000`}
            style={{ animationDelay: `${index * 300}ms` }}
          >
            {/* Content */}
            <div className="flex-1 space-y-6">
              <h2
                className="text-2xl md:text-4xl font-bold text-secondary-900 mb-4
                           transition-colors duration-300"
              >
                {feature.title}
              </h2>
              <div className="">
                {feature.bullets.map((bullet, bulletIndex) => (
                  <div
                    key={bulletIndex}
                    className="animate-fade-in-left flex items-center justify-start group transition-all duration-300 hover:translate-x-2"
                    style={{
                      animationDelay: `${index * 300 + bulletIndex * 100}ms`,
                    }}
                  >
                    <MyImage className="size-16" src={Check} alt="Check mark" />
                    <p className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-tech-navy">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="flex-1" >
              <MyImage
                placeholder="blur"
                src={feature.media.url} alt="Features Image" />
              <div
                className="relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-500 
                             hover:shadow-glow hover:scale-105 hover:-rotate-1 transform-gpu"
              >
                {/* <Image
                  src={feature.media.url || "/placeholder.svg"}
                  alt={feature.title}
                  // fill
                  priority
                  unoptimized={true}
                  placeholder="blur"
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                /> */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 
                               transition-opacity duration-500 hover:opacity-100"
                />
              </div>
            </div>
          </div>
        ))
        }
      </div >
    </section >
  );
}
