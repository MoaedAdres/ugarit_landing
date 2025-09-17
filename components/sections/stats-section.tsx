
import MyImage from "../Reusable-components/MyImage";
import { StaticImageData } from "next/image";
import AnimatedCounter from "../animations/AnimatedCounter";
import LightTop from "@/public/pngs/lights/Light Top.png"
import StatsBacنground from "@/public/jpgs/stats/statsBackground.jpg"
interface KPI {
  label: string;
  value: number;
  img?: string | StaticImageData
}
interface StatsSectionProps {
  kpis: KPI[];
}

export function StatsSection({ kpis }: StatsSectionProps) {
  return (
    <section className="py-16 bg-gradient-hero relative overflow-hidden">
      {/* <MyImage src={LightTop} className="h-full absolute top-0" alt="light top" /> */}
      {/* Background decoration */}
      <MyImage className="absolute inset-0  backdrop-blur-lg" src={StatsBacنground} alt="stats background" />
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
              className="backdrop-blur-xl backdrop-brightness-105 text-center p-6 rounded-xl border border-border/50 
                          transition-all duration-300 hover:scale-105 hover:shadow-glow
                         group"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 text-tech-navy group-hover:text-primary transition-colors flex items-center justify-evenly">
                {/* {kpi.img && <MyImage className="size-15" alt={kpi.label} src={kpi.img} />} */}
                <div>
                  <div className="flex text-secondary-900">
                    <AnimatedCounter end={kpi.value} />
                    {kpi.label.includes("Years") ? "+" : ""}
                  </div>
                </div>
              </div>
              <p className="text-secondary-800 font-medium text-sm transition-colors">
                {kpi.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
