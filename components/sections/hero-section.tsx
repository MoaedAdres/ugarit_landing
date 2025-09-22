import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/public/hero-image.jpg";
import Image, { StaticImageData } from "next/image";
import heroRightBackground from "@/public/jpgs/hero-right.jpg";
import { ModeToggle } from "../theme/toggle-theme";
import AnimatedButton from "../animations/AnimatedButton";
import MyButton from "../Reusable-components/MyButton";
import TypewriterDescription from "../Reusable-components/TypeWriterDescription";
import MyImage from "../Reusable-components/MyImage";
import AnimationArrow from "@/public/gifs/hero/animation-arrow.gif"
import HeroImagesGallery from "./hero-images-gallery";
import MySwiper from "../Reusable-components/MySwiper";
import { EffectCards } from "swiper/modules";
import HeroSwiperImages from "./hero-swiper-images";
import HeroImage from "@/public/gifs/hero/hero-image.png"
import { Swiper, SwiperSlide } from "swiper/react";
import { LocaleSwitcher } from "../locale/locale-switcher";
interface HeroProps {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctas: Array<{ label: string; href: string }>;
    bg_media: { type: string; url: string };
    images: string[] | StaticImageData[];
  };
}

export function HeroSection({ hero }: HeroProps) {
  console.log("hero", hero);
  return (
    <section className="relative min-h-screen flex flex-row-reverse items-center justify-between overflow-hidden">
      <HeroImagesGallery />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-primary-foreground/20 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 hero-section rounded-full opacity-20 animate-bounce"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex gap-2">
          <div className="my-auto">
            <h1 className="text-5xl animate-fade-in-up text-secondary-900 md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {/* <TypewriterDescription duration={200} text={hero.title} /> */}
              {hero.title}{" "}
              <span className="text-secondary-foreground">
                {/* <TypewriterDescription duration={200} text={hero.subtitle} /> */}
                {hero.subtitle}
              </span>
            </h1>
            <p className="text-lg lg:text-2xl text-secondary-800 mb-8 leading-relaxed md:max-w-3xl mx-auto">
              <TypewriterDescription text={hero.description} />
              {/* {hero.description} */}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center ">
              <div className="flex items-center">
                <MyImage className="size-14 mb-4 scale-x-[-1] rotate-[180deg]" src={AnimationArrow} alt="animation arrow" />
                <AnimatedButton href="/" text="hero.get_started_today" />
              </div>
              <MyButton
                Icon={Play}
                text="hero.watch_demo"
              />
            </div>
          </div>
          {/* <MyImage src={HeroImage} unoptimized alt="hero image" className="" /> */}
          <HeroSwiperImages images={hero.images} />
        </div>
      </div>

    </section>
  );
}
