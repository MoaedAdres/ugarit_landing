import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";

// Mock case studies data
const caseStudies = [
	{
		id: 1,
		title: "E-commerce Platform Redesign",
		client: "TechCorp Inc.",
		industry: "Technology",
		challenge: "Outdated user interface leading to poor conversion rates",
		solution: "Complete UX/UI redesign with modern React architecture",
		results: "150% increase in conversion rate, 40% reduction in bounce rate",
		duration: "3 months",
		teamSize: "5 people",
		technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
		status: "published",
		publishDate: "2024-01-20",
		featured: true,
		views: 2340,
	},
	{
		id: 2,
		title: "Mobile App Development for Healthcare",
		client: "HealthFirst Medical",
		industry: "Healthcare",
		challenge: "Need for patient management system on mobile devices",
		solution: "Cross-platform mobile app with secure data handling",
		results: "90% user adoption rate, 60% reduction in administrative time",
		duration: "4 months",
		teamSize: "6 people",
		technologies: ["React Native", "Firebase", "HIPAA Compliance"],
		status: "draft",
		publishDate: "",
		featured: false,
		views: 0,
	},
	{
		id: 3,
		title: "AI-Powered Analytics Dashboard",
		client: "DataViz Solutions",
		industry: "Analytics",
		challenge: "Complex data visualization and real-time processing",
		solution: "Custom dashboard with machine learning insights",
		results: "200% faster data processing, 85% user satisfaction",
		duration: "6 months",
		teamSize: "8 people",
		technologies: ["Python", "TensorFlow", "D3.js", "Docker"],
		status: "published",
		publishDate: "2024-01-15",
		featured: false,
		views: 1890,
	},
];

const industries = ["Technology", "Healthcare", "Finance", "E-commerce", "Analytics", "Education"];

export default function CaseStudiesPage() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-lg font-medium">Case Studies Management</h3>
					<p className="text-sm text-muted-foreground">
						{caseStudies.length} case studies • {caseStudies.filter((cs: any) => cs.status === "published").length} published •{" "}
						{caseStudies.filter((cs: any) => cs.featured).length} featured
					</p>
				</div>
				<Button asChild>
					<Link href="/dashboard/case-studies/add">
						<Plus className="h-4 w-4 mr-2" />
						New Case Study
					</Link>
				</Button>
			</div>

			{/* Filter Bar */}
			<Card>
				<CardContent className="p-4">
					<div className="flex flex-wrap gap-2">
						<Badge variant="outline" className="cursor-pointer">
							All Studies
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							Published
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							Drafts
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							Featured
						</Badge>
						{industries.map((industry: string) => (
							<Badge key={industry} variant="outline" className="cursor-pointer">
								{industry}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Case Studies List */}
			<div className="grid gap-6">
				{caseStudies.map((study: any) => (
					<Card key={study.id}>
						<CardContent className="p-6">
							<div className="flex items-start justify-between mb-4">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<h4 className="font-semibold text-xl">{study.title}</h4>
										<Badge variant={study.status === "published" ? "default" : "secondary"}>{study.status}</Badge>
										{study.featured && <Badge className="bg-yellow-500">Featured</Badge>}
										<Badge variant="outline">{study.industry}</Badge>
									</div>

									<p className="text-lg font-medium text-cyan-600 mb-3">{study.client}</p>
								</div>

								<div className="flex items-center gap-2">
									<Button variant="ghost" size="sm" asChild>
										<Link href={`/dashboard/case-studies/${study.id}/preview`}>
											<Eye className="h-4 w-4" />
										</Link>
									</Button>
									<Button variant="ghost" size="sm" asChild>
										<Link href={`/dashboard/case-studies/${study.id}/edit`}>
											<Edit className="h-4 w-4" />
										</Link>
									</Button>
									<Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div>
									<h5 className="font-semibold mb-2 text-red-600">Challenge</h5>
									<p className="text-sm text-muted-foreground">{study.challenge}</p>
								</div>
								<div>
									<h5 className="font-semibold mb-2 text-blue-600">Solution</h5>
									<p className="text-sm text-muted-foreground">{study.solution}</p>
								</div>
								<div>
									<h5 className="font-semibold mb-2 text-green-600">Results</h5>
									<p className="text-sm text-muted-foreground">{study.results}</p>
								</div>
							</div>

							<div className="mt-4 pt-4 border-t">
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
									<div>
										<span className="font-medium">Duration:</span>
										<p className="text-muted-foreground">{study.duration}</p>
									</div>
									<div>
										<span className="font-medium">Team Size:</span>
										<p className="text-muted-foreground">{study.teamSize}</p>
									</div>
									<div>
										<span className="font-medium">Views:</span>
										<p className="text-muted-foreground">{study.views.toLocaleString()}</p>
									</div>
									<div>
										<span className="font-medium">Published:</span>
										<p className="text-muted-foreground">
											{study.publishDate ? new Date(study.publishDate).toLocaleDateString() : "Not published"}
										</p>
									</div>
								</div>
							</div>

							<div className="mt-3">
								<div className="flex flex-wrap gap-2">
									{study.technologies.map((tech: string) => (
										<Badge key={tech} variant="outline" className="text-xs">
											{tech}
										</Badge>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5 text-cyan-600" />
							<div>
								<div className="text-2xl font-bold">8</div>
								<p className="text-sm text-muted-foreground">Total Studies</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">6</div>
						<p className="text-sm text-muted-foreground">Published</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">2</div>
						<p className="text-sm text-muted-foreground">Featured</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">12.5K</div>
						<p className="text-sm text-muted-foreground">Total Views</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
