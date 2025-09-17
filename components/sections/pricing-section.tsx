import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import AnimatedButton from "../animations/AnimatedButton";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started",
    price: 299,
    period: "month",
    popular: false,
    features: [
      "Cloud Infrastructure Setup",
      "Basic Security Monitoring",
      "Email Support",
      "Monthly Health Checks",
      "Backup & Recovery",
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    description: "Ideal for growing companies",
    price: 599,
    period: "month",
    popular: true,
    features: [
      "Everything in Starter",
      "Advanced DevOps Pipeline",
      "24/7 Priority Support",
      "Weekly Performance Reports",
      "Custom Integrations",
      "Security Audits",
      "Dedicated Account Manager",
    ],
    cta: "Most Popular",
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex needs",
    price: 1299,
    period: "month",
    popular: false,
    features: [
      "Everything in Professional",
      "Custom Cloud Architecture",
      "Dedicated Support Team",
      "Real-time Monitoring",
      "Advanced Analytics",
      "Compliance Management",
      "Training & Workshops",
      "SLA Guarantee",
    ],
    cta: "Contact Sales",
  },
];

export function PricingSection() {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold  text-secondary-900 mb-4">
            Choose Your <span className="text-secondary-foreground">Plan</span>
          </h2>
          <p className="text-lg text-secondary-800 max-w-2xl mx-auto leading-relaxed">
            Flexible pricing options designed to scale with your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`cardgroup group hover:shadow-glow shadow-lg transition-all duration-300 border-0 gradient-card hover:-translate-y-2 relative flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute z-[60] -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-secondary-foreground text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardContent className="p-6 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-tech-navy mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-secondary">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-5 h-5 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    className={`w-full transition-all duration-300 ${plan.popular
                      ? "gradient-primary hover:opacity-90"
                      : "bg-white text-tech-navy border border-border hover:bg-primary hover:text-white"
                      }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground mb-4">
            Need a custom solution? We're here to help.
          </p>
          <AnimatedButton text="pricing.contact_us_for_custom_pricing" />
        </div>
      </div>
    </section>
  );
}
