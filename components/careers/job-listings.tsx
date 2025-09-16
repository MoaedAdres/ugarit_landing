import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign } from "lucide-react";
import Link from "next/link";

// Mock job listings - replace with actual API call
const jobs = [
  {
    id: "senior-cloud-architect",
    title: "Senior Cloud Architect",
    department: "Engineering",
    location: { city: "New York", country: "US", remote: true },
    type: "Full-time",
    salary_range: "$120,000 - $160,000",
    description:
      "Lead cloud architecture design and implementation for enterprise clients. Work with cutting-edge technologies and mentor junior team members.",
    requirements: [
      "5+ years cloud experience",
      "Azure/AWS certifications",
      "Leadership experience",
    ],
    benefits: [
      "Health insurance",
      "401k matching",
      "Remote work",
      "Professional development",
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: { city: "San Francisco", country: "US", remote: true },
    type: "Full-time",
    salary_range: "$100,000 - $140,000",
    description:
      "Build and maintain CI/CD pipelines, automate infrastructure, and improve development workflows for our clients.",
    requirements: [
      "3+ years DevOps experience",
      "Kubernetes expertise",
      "CI/CD pipeline experience",
    ],
    benefits: [
      "Health insurance",
      "Stock options",
      "Flexible hours",
      "Learning budget",
    ],
  },
  {
    id: "security-consultant",
    title: "Security Consultant",
    department: "Consulting",
    location: { city: "Remote", country: "US", remote: true },
    type: "Full-time",
    salary_range: "$110,000 - $150,000",
    description:
      "Assess security postures, implement security frameworks, and help clients achieve compliance with industry standards.",
    requirements: [
      "Security certifications",
      "Compliance experience",
      "Risk assessment skills",
    ],
    benefits: [
      "Health insurance",
      "Travel opportunities",
      "Certification support",
      "Bonus structure",
    ],
  },
];

export function JobListings() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">
            Open Positions
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Find your next career opportunity with us
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {jobs.map((job, index) => (
            <Card
              key={job.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge variant="secondary">{job.department}</Badge>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>

                    <h3 className="font-heading font-bold text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {job.location.city}, {job.location.country}
                          {job.location.remote && " (Remote)"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary_range}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <Button asChild size="lg">
                      <Link href={`/careers/${job.id}`}>Apply Now</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Don't see a position that fits?
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">Send us your resume</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
