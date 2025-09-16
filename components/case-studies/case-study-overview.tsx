import { Card, CardContent } from "@/components/ui/card";

interface CaseStudyOverviewProps {
  caseStudy: {
    body_blocks: Array<{
      type: string;
      title: string;
      content: string;
    }>;
  };
}

export function CaseStudyOverview({ caseStudy }: CaseStudyOverviewProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {caseStudy.body_blocks.map((block, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
                  {block.title}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {block.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
