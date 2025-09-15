import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/public/hero-image.jpg";
import Image from "next/image";
import heroRightBackground from "@/public/jpgs/hero-right.jpg";
import { ModeToggle } from "../theme/toggle-theme";
interface HeroProps {
  hero: {
    title: string;
    subtitle: string;
    ctas: Array<{ label: string; href: string }>;
    bg_media: { type: string; url: string };
  };
}

export function HeroSection({ hero }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] mt-[10vh] flex flex-row-reverse hero-section items-center justify-between overflow-hidden">
      {/* <Image
        placeholder="blur"
        // priority
        // unoptimized={true}
        className="h-[500px]"
        alt="hero-right"
        src={heroRightBackground}
      /> */}
      {/* Background */}
      {/* <div className="absolute inset-0"> */}
      {/* <Image
          src={heroImage}
          alt="IT Solutions and Technology Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-tech-navy/70"></div> */}
      {/* </div> */}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-primary-foreground/20 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 hero-section rounded-full opacity-20 animate-bounce"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl text-secondary-9 md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Build. Scale.{" "}
            <span className="text-primary-foreground">Secure.</span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary-800 mb-8 leading-relaxed max-w-3xl mx-auto">
            Transform your business with cutting-edge IT solutions, cloud
            services, and digital transformation expertise from industry
            leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="hover:border-0 border border-secondary bg-transparent gradient-primary hover:opacity-90 transition-smooth px-8 py-4 text-lg font-semibold group"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-tech-navy transition-smooth px-8 py-4 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          {/* // Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-tech-teal mb-2">
                500+
              </div>
              <div className="text-gray-300">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-tech-teal mb-2">
                98%
              </div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-tech-teal mb-2">
                24/7
              </div>
              <div className="text-gray-300">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-tech-teal mb-2">
                15+
              </div>
              <div className="text-gray-300">Years Experience</div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-2"></div>
        </div>
      </div> */}
    </section>
  );
}
