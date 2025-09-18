"use client";

import { useState } from "react";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";
import { TestimonialDetails } from "./testimonial-details";
import { TestimonialActions } from "./testimonial-actions";

// Mock testimonial data
const mockTestimonial = {
	id: 1,
	name: "John Smith",
	role: "CEO",
	company: "TechCorp Inc.",
	email: "john@techcorp.com",
	content: "Excellent service and outstanding results. The team delivered beyond our expectations and helped transform our business operations. Their attention to detail and commitment to quality is unmatched.",
	rating: 5,
	avatar: "/avatar1.jpg",
	status: "published",
	featured: true,
	createdAt: "2024-01-20",
	project: "E-commerce Platform",
	allowPublicDisplay: true,
	contactForFollowup: true,
	updatedAt: "2 days ago",
};

export default function ViewTestimonial() {
	const [testimonialData] = useState(mockTestimonial);

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<RFlex className="items-start justify-between">
				<RFlex className="items-start gap-4">
					<RButton
						variant="ghost"
						size="sm"
						className="mt-1"
						onClick={() => window.location.href = "/dashboard/testimonials"}
						icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
						text="Back to Testimonials"
					/>
					<div className="space-y-2">
						<RFlex className="items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-rose-500/10 to-pink-500/5 rounded-2xl border border-rose-500/20">
								<i className={`${myIcons.heart} h-7 w-7 text-rose-600`} />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">{testimonialData.name}</h1>
								<RFlex className="items-center gap-2 mt-2">
									<Badge variant="outline" className="font-medium">{testimonialData.company}</Badge>
									<Badge variant={testimonialData.status === "published" ? "default" : "secondary"} className="font-medium">
										{testimonialData.status === "published" ? "Published" : "Draft"}
									</Badge>
									{testimonialData.featured && (
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
					onClick={() => window.location.href = `/dashboard/testimonials/${testimonialData.id}?isEdit=true`}
					icon={<i className={`${myIcons.edit} h-4 w-4`} />}
					text="Edit Testimonial"
				/>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2">
					<TestimonialDetails testimonialData={testimonialData} />
				</div>

				{/* Sidebar */}
				<div>
					<TestimonialActions testimonialData={testimonialData} />
				</div>
			</div>
		</div>
	);
}
