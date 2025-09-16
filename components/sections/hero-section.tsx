import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/public/hero-image.jpg";
import Image from "next/image";
import heroRightBackground from "@/public/jpgs/hero-right.jpg";
import { ModeToggle } from "../theme/toggle-theme";
import AnimatedButton from "../animations/AnimatedButton";
import MyButton from "../Reusable-components/MyButton";
import TypewriterDescription from "../Reusable-components/TypeWriterDescription";
interface HeroProps {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctas: Array<{ label: string; href: string }>;
    bg_media: { type: string; url: string };
  };
}

export function HeroSection({ hero }: HeroProps) {
  console.log("hero", hero);
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
          <h1 className="text-5xl animate-fade-in-up text-secondary-900 md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {/* <TypewriterDescription duration={200} text={hero.title} /> */}
            {hero.title}{" "}
            <span className="text-secondary-foreground">
              {/* <TypewriterDescription duration={200} text={hero.subtitle} /> */}
              {hero.subtitle}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary-800 mb-8 leading-relaxed max-w-3xl mx-auto">
            <TypewriterDescription text={hero.description} />
            {/* {hero.description} */}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <AnimatedButton text="hero.get_started_today" />
            <MyButton
              Icon={Play}
              classes={"text-secondary-900"}
              text="hero.watch_demo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
