"use client";

import { useEffect, useState, useRef } from "react";
import StatsBacground from "@/public/jpgs/stats/statsBackground.jpg"
import MyImage from "../Reusable-components/MyImage";
interface KPI {
  label: string;
  value: number;
}

interface StatsSectionProps {
  kpis: KPI[];
}

function AnimatedCounter({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Use easeOutQuart for smoother animation
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return <span ref={counterRef}>{count}</span>;
}

export function StatsSection({ kpis }: StatsSectionProps) {
  return (
    <section className="py-16 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <MyImage className="absolute inset-0  backdrop-blur-lg" src={StatsBacground} alt="stats background" />
      {/* <div className=" bg-tech-navy/10"></div> */}
      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Trusted by <span className="text-secondary-foreground">Industry Leaders</span>
          </h2>
          <p className="text-lg text-secondary-800 max-w-2xl mx-auto leading-relaxed">
            Our track record speaks for itself with measurable results and
            satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-border/50 
                         hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-glow
                         group"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 text-tech-navy group-hover:text-primary transition-colors">
                <AnimatedCounter end={kpi.value} />
                {kpi.label.includes("Years") ? "+" : ""}
              </div>
              <p className="text-muted-foreground font-medium text-sm group-hover:text-primary transition-colors">
                {kpi.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
