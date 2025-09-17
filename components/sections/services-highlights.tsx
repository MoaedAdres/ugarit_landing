import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  Settings,
  Shield,
  Code,
  Database,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import AnimatedButton from "../animations/AnimatedButton";
import MyImage from "../Reusable-components/MyImage";
import LightImage from "@/public/jpgs/lights/Light.jpg"
import TypewriterDescription from "../Reusable-components/TypeWriterDescription";
// Static services data with the new styling
const services = [
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Migrate and optimize your infrastructure with AWS, Azure, and Google Cloud platforms for maximum scalability and cost-efficiency.",
    features: [
      "Cloud Migration",
      "Infrastructure Optimization",
      "Multi-cloud Strategy",
    ],
  },
  {
    icon: Settings,
    title: "DevOps & CI/CD",
    description:
      "Streamline your development pipeline with automated testing, deployment, and monitoring solutions for faster delivery.",
    features: [
      "Automated Deployment",
      "Container Orchestration",
      "Monitoring & Logging",
    ],
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Protect your digital assets with comprehensive security solutions, compliance frameworks, and threat monitoring.",
    features: ["Security Audits", "Compliance Management", "Threat Detection"],
  },
  {
    icon: Code,
    title: "Custom Development",
    description:
      "Build scalable applications with modern technologies including microservices, APIs, and cloud-native architectures.",
    features: [
      "Full-stack Development",
      "API Integration",
      "Legacy Modernization",
    ],
  },
  {
    icon: Database,
    title: "Data Analytics",
    description:
      "Transform your data into actionable insights with advanced analytics, machine learning, and business intelligence solutions.",
    features: ["Data Warehousing", "ML/AI Solutions", "Business Intelligence"],
  },
  {
    icon: Smartphone,
    title: "Digital Transformation",
    description:
      "Modernize your business processes with digital solutions that improve efficiency and customer experience.",
    features: ["Process Automation", "Digital Strategy", "Change Management"],
  },
];
import SupportImage from "@/public/jpgs/stats/support.jpg"
import Image from "next/image";
interface ServicesHighlightsProps {
  highlights?: any[]; // Keep for API compatibility but use static data
}

export function ServicesHighlights({ highlights }: ServicesHighlightsProps) {
  return (
    <section className="pt-8 relative">
      <div className="grid absolute bg-primary-50 -top-12 w-[80%] mx-28 rounded-lg shadow-lg py-4 z-50 grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { title: "500+", description: "Projects Delivered", img: SupportImage },
          { title: "98%", description: "Client Satisfaction", img: SupportImage },
          { title: "24/7", description: "Support Available", img: SupportImage },
          { title: "15+", description: "Years Experience", img: SupportImage }
        ].map((element, index) => (
          <div key={index} className="text-center flex flex-col items-center animate-fade-in-up hover:opacity-0">
            {/* <Image className="size-16" src={element.img} alt={element.description} /> */}
            <div className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
              {element.title}
            </div>
            <div className="text-secondary-800">{element.description}</div>
          </div>
        ))}
      </div>
      <MyImage src={LightImage} className="h-full absolute top-56" alt="light bottom" />
      <div className="container relative mt-24 mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Our <span className="text-secondary-foreground">Services</span>
          </h2>
          <p className="text-lg text-secondary-800 max-w-2xl mx-auto leading-relaxed">
            <TypewriterDescription duration={100} text="We deliver comprehensive IT solutions that drive innovation, enhance
            security, and accelerate your digital transformation journey." />
            {/* We deliver comprehensive IT solutions that drive innovation, enhance
            security, and accelerate your digital transformation journey. */}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="cardgroup group backdrop-contrast-150 backdrop-blur-lg shadow-xl hover:shadow-glow transition-all duration-300 border-0 hover:-translate-y-2 hover:scale-110 !pb-0"
              >
                <CardContent className="p-5">
                  <div className="flex items-center mx-auto justify-center w-16 h-16 group-hover:bg-primary ease-in-out duration-300 delay-200 rounded-xl mb-6 group-hover:scale-110 transition-all">
                    <Icon className="h-10 w-10 text-secondary-800" />
                  </div>

                  <h3 className="text-2xl text-center font-bold text-secondary-800 mb-4 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-secondary-800 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <div className="w-2 h-2 hero-section rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="w-full flex justify-end">

                    <Button
                      variant="ghost"
                      className="group/btn justify-end text-transparent group-hover:text-secondary-foreground hover:text-secondary-foreground hover:bg-primary/10 p-0 h-auto font-semibold"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <AnimatedButton text="services.explore_all_services" />
        </div>
      </div>
    </section>
  );
}
