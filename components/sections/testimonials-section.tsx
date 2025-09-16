"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface TestimonialsSectionProps {
  testimonialIds: string[];
}

// Mock testimonials data - replace with actual API call
const mockTestimonials = [
  {
    id: "sara-it-director",
    name: "Sarah Johnson",
    role: "IT Director",
    company: "TechCorp Industries",
    quote:
      "Ugarit Technologies transformed our entire cloud infrastructure. Their expertise in Azure migration saved us months of work and significantly reduced our operational costs.",
    rating: 5,
    avatar: "/avatar-sarah.png",
  },
  {
    id: "mike-cto",
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateLabs",
    quote:
      "The DevOps solutions implemented by Ugarit have revolutionized our deployment process. We've gone from weekly releases to daily deployments with zero downtime.",
    rating: 5,
    avatar: "/avatar-michael.png",
  },
  {
    id: "lisa-founder",
    name: "Lisa Rodriguez",
    role: "Founder & CEO",
    company: "HealthTech Solutions",
    quote:
      "Security and compliance were our biggest concerns. Ugarit not only addressed these but exceeded our expectations with their comprehensive approach.",
    rating: 5,
    avatar: "/avatar-lisa.png",
  },
  {
    id: "david-cio",
    name: "David Kim",
    role: "CIO",
    company: "FinanceFirst",
    quote:
      "The team's attention to detail and commitment to excellence is unmatched. They delivered our project on time and under budget.",
    rating: 5,
    avatar: "/avatar-david.png",
  },
  {
    id: "emma-cto",
    name: "Emma Wilson",
    role: "CTO",
    company: "RetailTech",
    quote:
      "Ugarit's cloud architecture design has scaled beautifully with our business growth. Highly recommend their services.",
    rating: 5,
    avatar: "/avatar-emma.png",
  },
];

export function TestimonialsSection({
  testimonialIds,
}: TestimonialsSectionProps) {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-tech-navy mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what industry leaders have
            to say about our services
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="testimonials-swiper"
          >
            {mockTestimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <Card className="group hover:shadow-glow transition-all duration-300 border-0 gradient-card hover:-translate-y-2 h-full flex flex-col">
                  <CardContent className="p-6 h-full flex flex-col">
                    <Quote className="h-6 w-6 text-primary/30 mb-4" />

                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    <blockquote className="text-muted-foreground leading-relaxed mb-6 text-sm flex-grow">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="flex items-center space-x-3 mt-auto">
                      <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                        <span className="font-semibold text-white text-sm">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-tech-navy text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
