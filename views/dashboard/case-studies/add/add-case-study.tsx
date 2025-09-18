"use client";

import { useState } from "react";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { myIcons } from "@/constants/icons";
import { CaseStudyForm } from "./case-study-form";
import { CaseStudyPreview } from "./case-study-preview";

export default function AddCaseStudy() {
	const [studyData, setStudyData] = useState({
		title: "",
		client: "",
		industry: "",
		challenge: "",
		solution: "",
		results: "",
		duration: "",
		teamSize: "",
		technologies: [] as string[],
		images: [] as string[],
		testimonial: "",
		testimonialAuthor: "",
		testimonialRole: "",
		status: "draft",
		featured: false,
		publishDate: "",
	});

	const handleSave = (status = "draft") => {
		const dataToSave = { ...studyData, status };
		console.log("Saving case study:", dataToSave);
		// Save logic would go here
	};

	return (
		<div className="space-y-6">
			<RFlex className="items-center gap-4">
				<RButton
					variant="ghost"
					size="sm"
					onClick={() => window.location.href = "/dashboard/case-studies"}
					icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
					text="Back to Case Studies"
				/>
				<div>
					<h1 className="text-2xl font-bold">Add New Case Study</h1>
					<p className="text-muted-foreground">Document a successful project and showcase your results</p>
				</div>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2">
					<CaseStudyForm studyData={studyData} setStudyData={setStudyData} />
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<CaseStudyPreview studyData={studyData} />
					
					<RFlex className="flex-col gap-3">
						<RButton
							onClick={() => handleSave("published")}
							className="w-full"
							icon={<i className={`${myIcons.calendar} h-4 w-4`} />}
							text="Publish Case Study"
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
							onClick={() => window.location.href = "/dashboard/case-studies"}
							className="w-full bg-transparent"
							text="Cancel"
						/>
					</RFlex>
				</div>
			</div>
		</div>
	);
}
