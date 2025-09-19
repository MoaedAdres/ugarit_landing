
import MyImage from "../Reusable-components/MyImage";
import { StaticImageData } from "next/image";
import AnimatedCounter from "../animations/AnimatedCounter";
import StatsBackground from "@/public/jpgs/stats/statsBackground.jpg"
import StatsDarkBackground from "@/public/jpgs/dark-mode/stats-background.jpg"
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
    <section className="py-5 lg:py-16 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <MyImage className="dark:hidden absolute h-full inset-0 backdrop-blur-lg" src={StatsBackground} alt="stats background" />
      <MyImage className="hidden dark:block absolute h-full inset-0 backdrop-blur-lg" src={StatsDarkBackground} alt="stats dark background" />
      {/* <div className=" bg-tech-navy/10"></div> */}
      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Trusted by <span className="text-secondary-foreground">Industry Leaders</span>
          </h2>
          <p className="text-lg text-secondary-800 max-w-2xl mx-auto leading-relaxed">
            Our track record speaks for itself with measurable results and
            satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="backdrop-blur-xl shadow-md shadow-gray-200 backdrop-brightness-105 text-center p-3 lg:p-6 rounded-xl border border-border/50 
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
