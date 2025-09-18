import { IAnimatedButtonProps } from "@/interfaces/ui";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

async function AnimatedButton({ text }: IAnimatedButtonProps) {
  const t = await getTranslations();
  return (
    <Button
      size="lg"
      className="relative items-center overflow-hidden border border-secondary-900 bg-transparent hover:bg-transparent px-8 py-4 text-lg font-semibold group"
    >
      {/* Static background */}
      <span className="absolute inset-0 bg-transparent z-0"></span>
      {/* Animated gradient background */}
      <span
        className="absolute bottom-0 left-0 w-0 h-0 bg-gradient-to-tl from-[#DFEFFB] to-[#A6806A] 
                        transition-all duration-700 ease-in-out group-hover:w-full group-hover:h-full 
                        group-hover:bottom-auto group-hover:left-auto group-hover:top-0 group-hover:right-0 
                        opacity-90 z-0"
      ></span>

      {/* Button content */}
      <span className="relative z-10 text-secondary-900 transition-colors duration-500">
        {t(text)}
      </span>
      <ArrowRight className="text-secondary-900 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
    </Button>
  );
}

export default AnimatedButton;
