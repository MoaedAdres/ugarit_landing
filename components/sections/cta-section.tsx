import Link from "next/link";
import MyImage from "../Reusable-components/MyImage";
import CTAImage from "@/public/pngs/contact/frame3.png"
import MyButton from "../Reusable-components/MyButton";

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
      <div className="container mx-auto text-center">
        <div className="-mb-6 border border-secondary px-0 lg:px-5 py-5 rounded-lg backdrop-blur-3xl backdrop-brightness-150 mx-auto flex flex-col md:flex-row items-center md:gap-2">
          <div className="flex-1">
            <h2 className="font-heading text-secondary-900 font-bold text-2xl md:text-3xl lg:text-3xl xl:text-4xl mb-4 text-balance">
              {cta.title}
            </h2>
            <p className="text-base md:text-xl mb-8 text-secondary-foreground text-pretty">
              {cta.subtitle}
            </p>
          </div>
          <div>
            <MyImage unoptimized alt="CTA Image" src={CTAImage} placeholder="blur" />
          </div>
        </div>
        <MyButton
          classes="dark:shadow-gray-600 shadow-md"
        >
          <Link href={cta.button.href}>{cta.button.label}</Link>
        </MyButton>
      </div>
    </section>
  );
}
