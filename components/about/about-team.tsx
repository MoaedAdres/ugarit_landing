import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const teamMembers = [
	{
		name: "Sarah Johnson",
		role: "Chief Executive Officer",
		bio: "15+ years of experience in technology leadership and business strategy.",
		expertise: ["Strategy", "Leadership", "Business Development"],
		social: { linkedin: "#", twitter: "#" },
	},
	{
		name: "Michael Chen",
		role: "Chief Technology Officer",
		bio: "Expert in cloud architecture and enterprise system design with 12+ years experience.",
		expertise: ["Cloud Architecture", "System Design", "DevOps"],
		social: { linkedin: "#", twitter: "#" },
	},
	{
		name: "David Kim",
		role: "Cloud Solutions Architect",
		bio: "Certified Azure and AWS architect specializing in enterprise migrations.",
		expertise: ["Azure", "AWS", "Migration", "Security"],
		social: { linkedin: "#", twitter: "#" },
	},
	{
		name: "Emily Zhang",
		role: "DevOps Engineering Lead",
		bio: "Passionate about automation and continuous delivery with expertise in modern DevOps practices.",
		expertise: ["CI/CD", "Kubernetes", "Automation", "Monitoring"],
		social: { linkedin: "#", twitter: "#" },
	},
];

export function AboutTeam() {
	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance">Meet Our Team</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
						The experts behind our innovative solutions and exceptional service delivery
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{teamMembers.map((member, index) => (
						<Card key={index} className="group hover:shadow-lg transition-all duration-300">
							<CardContent className="p-6 text-center">
								{/* Avatar */}
								<div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
									<span className="font-heading font-bold text-primary text-2xl">
										{member.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</span>
								</div>

								<h3 className="font-heading font-bold text-lg text-foreground mb-1">{member.name}</h3>
								<p className="text-primary font-medium mb-3">{member.role}</p>
								<p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.bio}</p>

								{/* Expertise */}
								<div className="flex flex-wrap gap-1 justify-center mb-4">
									{member.expertise.slice(0, 3).map((skill, skillIndex) => (
										<Badge key={skillIndex} variant="secondary" className="text-xs">
											{skill}
										</Badge>
									))}
								</div>

								{/* Social Links */}
								<div className="flex justify-center space-x-2">
									<Link
										href={member.social.linkedin}
										className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
									>
										<Linkedin className="h-4 w-4" />
									</Link>
									<Link
										href={member.social.twitter}
										className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
									>
										<Twitter className="h-4 w-4" />
									</Link>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
