"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";

interface Result {
  label: string;
  value: string;
}

interface CaseStudyResultsProps {
  results: Result[];
}

function AnimatedMetric({ value, label }: { value: string; label: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      // Simple animation for percentage values
      if (value.includes("%")) {
        const numValue = Number.parseInt(value.replace("%", ""));
        let current = 0;
        const increment = numValue / 30;
        const timer = setInterval(() => {
          current += increment;
          if (current >= numValue) {
            setDisplayValue(value);
            clearInterval(timer);
          } else {
            setDisplayValue(`${Math.floor(current)}%`);
          }
        }, 50);
      } else {
        setDisplayValue(value);
      }
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-heading font-black text-primary mb-2">
        {displayValue}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
}

export function CaseStudyResults({ results }: CaseStudyResultsProps) {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-balance">
            Measurable Results
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
            The numbers speak for themselves - real impact delivered
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {results.map((result, index) => (
            <Card
              key={index}
              className="bg-primary-foreground/10 border-primary-foreground/20"
            >
              <CardContent className="p-6">
                <AnimatedMetric value={result.value} label={result.label} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
