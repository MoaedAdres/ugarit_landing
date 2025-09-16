import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Github, Calendar, FileText } from "lucide-react";
import Link from "next/link";

interface AuthorProfileProps {
  author: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
    socials: {
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
    expertise: string[];
    posts_count: number;
    joined_date: string;
  };
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-heading font-bold text-primary text-4xl">
                  {author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-heading font-black text-3xl md:text-4xl text-foreground mb-2">
                  {author.name}
                </h1>
                <p className="text-xl text-primary mb-4">{author.role}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {author.bio}
                </p>

                {/* Expertise */}
                <div className="mb-6">
                  <h3 className="font-heading font-semibold text-foreground mb-3">
                    Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {author.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center md:justify-start gap-6 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{author.posts_count} articles</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Joined {new Date(author.joined_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  {author.socials.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={author.socials.linkedin} target="_blank">
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {author.socials.twitter && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={author.socials.twitter} target="_blank">
                        <Twitter className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {author.socials.github && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={author.socials.github} target="_blank">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
