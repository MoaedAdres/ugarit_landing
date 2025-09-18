"use client";

import { useState } from "react";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { myIcons } from "@/constants/icons";
import { TestimonialForm } from "./testimonial-form";
import { TestimonialPreview } from "./testimonial-preview";

export default function AddTestimonial() {
	const [testimonialData, setTestimonialData] = useState({
		name: "",
		role: "",
		company: "",
		email: "",
		content: "",
		rating: 5,
		avatar: "",
		project: "",
		status: "draft",
		featured: false,
		allowPublicDisplay: true,
		contactForFollowup: false,
	});

	const handleSave = (status = "draft") => {
		const dataToSave = { ...testimonialData, status };
		console.log("Saving testimonial:", dataToSave);
		// Save logic would go here
	};

	return (
		<div className="space-y-6">
			<RFlex className="items-center gap-4">
				<RButton
					variant="ghost"
					size="sm"
					onClick={() => window.location.href = "/dashboard/testimonials"}
					icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
					text="Back to Testimonials"
				/>
				<div>
					<h1 className="text-2xl font-bold">Add New Testimonial</h1>
					<p className="text-muted-foreground">Collect and manage customer feedback</p>
				</div>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2">
					<TestimonialForm testimonialData={testimonialData} setTestimonialData={setTestimonialData} />
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<TestimonialPreview testimonialData={testimonialData} />
					
					<RFlex className="flex-col gap-3">
						<RButton
							onClick={() => handleSave("published")}
							className="w-full"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
							text="Publish Testimonial"
						/>
						<RButton
							onClick={() => handleSave("draft")}
							variant="outline"
							className="w-full"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
							text="Save Draft"
						/>
						<RButton
							variant="outline"
							onClick={() => window.location.href = "/dashboard/testimonials"}
							className="w-full bg-transparent"
							text="Cancel"
						/>
					</RFlex>
				</div>
			</div>
		</div>
	);
}
