import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock } from "lucide-react";

interface CaseStudyHeroProps {
  caseStudy: {
    client_name: string;
    sector: string;
    problem: string;
    solution: string;
    timeline: string;
    team_size: string;
    tags: string[];
  };
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{caseStudy.sector}</Badge>
            {caseStudy.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-6 text-balance">
            {caseStudy.client_name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span>Timeline: {caseStudy.timeline}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Users className="h-5 w-5" />
              <span>Team: {caseStudy.team_size}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <span>Sector: {caseStudy.sector}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                The Challenge
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                Our Solution
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
