"use client";

import { useState } from "react";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";
import { CaseStudyDetails } from "./case-study-details";
import { CaseStudyActions } from "./case-study-actions";

// Mock case study data
const mockCaseStudy = {
	id: 1,
	title: "E-commerce Platform Redesign",
	client: "TechCorp Inc.",
	industry: "E-commerce",
	challenge: "The client's existing e-commerce platform was experiencing slow loading times, poor mobile responsiveness, and a high cart abandonment rate of 68%. The outdated design was not converting visitors into customers effectively.",
	solution: "We redesigned the entire platform using modern technologies including React, Node.js, and optimized database queries. Implemented a mobile-first approach with progressive web app features and integrated advanced analytics for better user behavior tracking.",
	results: "Achieved a 45% increase in conversion rate, reduced cart abandonment to 23%, improved page load times by 60%, and increased mobile traffic by 85%. The client saw a 120% increase in revenue within 6 months.",
	duration: "4 months",
	teamSize: "6 people",
	technologies: ["React", "Node.js", "MongoDB", "AWS", "Stripe", "Analytics"],
	images: [],
	testimonial: "The team delivered exceptional results that exceeded our expectations. The new platform has transformed our business and significantly improved our customer experience.",
	testimonialAuthor: "Sarah Johnson",
	testimonialRole: "CEO, TechCorp Inc.",
	status: "published",
	featured: true,
	publishDate: "2024-01-15",
	updatedAt: "2 days ago",
};

export default function ViewCaseStudy() {
	const [caseStudyData] = useState(mockCaseStudy);

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<RFlex className="items-start justify-between">
				<RFlex className="items-start gap-4">
					<RButton
						variant="ghost"
						size="sm"
						className="mt-1"
						onClick={() => window.location.href = "/dashboard/case-studies"}
						icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
						text="Back to Case Studies"
					/>
					<div className="space-y-2">
						<RFlex className="items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
								<i className={`${myIcons.target} h-7 w-7 text-primary`} />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">{caseStudyData.title}</h1>
								<RFlex className="items-center gap-2 mt-2">
									<Badge variant="outline" className="font-medium">{caseStudyData.industry}</Badge>
									<Badge variant={caseStudyData.status === "published" ? "default" : "secondary"} className="font-medium">
										{caseStudyData.status === "published" ? "Published" : "Draft"}
									</Badge>
									{caseStudyData.featured && (
										<Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium">
											<i className={`${myIcons.star} h-3 w-3 mr-1`} />
											Featured
										</Badge>
									)}
								</RFlex>
							</div>
						</RFlex>
					</div>
				</RFlex>
				<RButton
					size="lg"
					className="shadow-lg"
					onClick={() => window.location.href = `/dashboard/case-studies/${caseStudyData.id}?isEdit=true`}
					icon={<i className={`${myIcons.edit} h-4 w-4`} />}
					text="Edit Case Study"
				/>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2">
					<CaseStudyDetails caseStudyData={caseStudyData} />
				</div>

				{/* Sidebar */}
				<div>
					<CaseStudyActions caseStudyData={caseStudyData} />
				</div>
			</div>
		</div>
	);
}
