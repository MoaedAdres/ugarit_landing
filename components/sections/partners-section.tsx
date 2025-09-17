"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  Building2,
  Cloud,
  Database,
  Code,
  Shield,
  Zap,
  GitBranch,
  Server,
  Lock,
  Cpu,
  Globe,
  Layers,
  Search,
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import MySwiper from "../Reusable-components/MySwiper";
import SinglePartner from "./SinglePartner";
import LightBottom from "@/public/jpgs/lights/Light.jpg"
import MyImage from "../Reusable-components/MyImage";
interface PartnersSectionProps {
  partnerIds: string[];
}

// Extended partners data with proper icons
const mockPartners = [
  {
    id: "microsoft",
    name: "Microsoft",
    icon: Building2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    icon: Cloud,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    icon: Database,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: "google",
    name: "Google Cloud",
    icon: Globe,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "docker",
    name: "Docker",
    icon: Code,
    color: "text-blue-400",
    bgColor: "bg-blue-50",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: Layers,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "github",
    name: "GitHub",
    icon: GitBranch,
    color: "text-gray-800",
    bgColor: "bg-gray-50",
  },
  {
    id: "nginx",
    name: "Nginx",
    icon: Server,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "redis",
    name: "Redis",
    icon: Database,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: Database,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  {
    id: "terraform",
    name: "Terraform",
    icon: Cpu,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "jenkins",
    name: "Jenkins",
    icon: Zap,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: Database,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "elasticsearch",
    name: "Elasticsearch",
    icon: Search,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: Shield,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
];

export function PartnersSection({ partnerIds }: PartnersSectionProps) {
  return (
    <section className="py-16 relative bg-gradient-hero border-y border-border/20">
      <MyImage src={LightBottom} alt="light bottom" className="absolute h-full" />
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900  mb-4">
            Trusted <span className="text-secondary-foreground">Technology Partners</span>
          </h2>
          <p className="text-secondary-800 max-w-2xl mx-auto">
            We work with industry-leading platforms and technologies to deliver
            cutting-edge solutions
          </p>
        </div>

        <MySwiper slidesPerView={4} parentClasses="" showPagination={false} pagination={false} wrapperClasses="" swiperClasses="!py-0" activeSlideClasses="" showNextButton={false} showPreviousButton={false} speed={2000} anotherModules={[Autoplay]} autoplay={{ disableOnInteraction: false, delay: 0 }}>
          {mockPartners.slice(0, mockPartners?.length / 2).map((partner, index) =>
            <SinglePartner Icon="" key={index} name={partner.name} />
          )}
        </MySwiper>

        <MySwiper slidesPerView={4} parentClasses="" showPagination={false} pagination={false} wrapperClasses="" swiperClasses="!py-0" activeSlideClasses="" showNextButton={false} showPreviousButton={false} speed={2000} anotherModules={[Autoplay]} autoplay={{ disableOnInteraction: false, reverseDirection: true, delay: 0 }}>
          {mockPartners.slice((mockPartners?.length / 2) + 1).map((partner, index) =>
            <SinglePartner Icon="" key={index} name={partner.name} />
          )}
        </MySwiper>
        {/* <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            draggable={false}
            slidesPerView={2}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              reverseDirection: false,
            }}
            loop={true}
            speed={1000}
            loopAdditionalSlides={2}
            watchSlidesProgress={true}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 50,
              },
            }}
            className="partners-swiper"
          >
            {mockPartners.map((partner, index) => {
              const IconComponent = partner.icon;
              return (
                <SwiperSlide key={partner.id}>
                  <div className="flex items-center justify-center p-4 group h-20">
                    <div
                      className={`
                       ${partner.bgColor} rounded-xl flex items-center justify-center px-4 py-3 whitespace-nowrap
                      transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg
                      border border-border/20 group-hover:border-primary/30
                      min-w-0 flex-shrink-0
                    `}
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <IconComponent
                          className={`h-5 w-5 ${partner.color} transition-colors duration-300 flex-shrink-0`}
                        />
                        <span
                          className={`text-xs font-medium ${partner.color} transition-colors duration-300 truncate`}
                        >
                          {partner.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div> */}
      </div>
    </section>
  );
}
