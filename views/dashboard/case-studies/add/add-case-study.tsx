"use client";

import { useState } from "react";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { myIcons } from "@/constants/icons";
import { CaseStudyForm } from "../CaseStudyForm";
import { CaseStudyPreview } from "./case-study-preview";
import { caseStudiesRepository } from "@/api/services/dashboard/case-studies";
import { useRouter } from "next/navigation";
import { useMutateData } from "@/hooks/use-mutate-data";
import { CaseStudyFormData } from "../CaseStudyForm";

export default function AddCaseStudy() {
	const router = useRouter();
	const [formData, setFormData] = useState<CaseStudyFormData>({
		client_name: "",
		testimonial_id: 1,
		status: "draft",
		order: 1,
		en: {
			sector: "",
			problem: "",
			solution: "",
			body_blocks: [],
			results_kpis: {}
		},
		ar: {
			sector: "",
			problem: "",
			solution: "",
			body_blocks: [],
			results_kpis: {}
		},
		fr: {
			sector: "",
			problem: "",
			solution: "",
			body_blocks: [],
			results_kpis: {}
		}
	});

	// Add mutation using hook
	const addMutation = useMutateData({
		mutationFn: caseStudiesRepository.addCaseStudy,
		onSuccessFn: () => {
			router.push("/dashboard/case-studies");
		},
		displaySuccess: true
	});

	const handleSubmit = (apiFormData: FormData) => {
		addMutation.mutate(apiFormData);
	};

	return (
		<div className="space-y-6">
			<RFlex className="items-center gap-4">
				<RButton
					variant="ghost"
					size="sm"
					onClick={() => router.push("/dashboard/case-studies")}
					icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
					text="Back to Case Studies"
				/>
				<div>
					<h1 className="text-2xl font-bold">Add New Case Study</h1>
					<p className="text-muted-foreground">Document a successful project and showcase your results</p>
				</div>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Form */}
				<div className="lg:col-span-2">
					<CaseStudyForm
						formData={formData}
						setFormData={setFormData}
						onSubmit={handleSubmit}
						isLoading={addMutation.isPending}
						isEdit={false}
					/>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<CaseStudyPreview formData={formData} />

					<div className="space-y-3">
						<RButton
							onClick={() => {
								setFormData({ ...formData, status: "published" });
							}}
							disabled={addMutation.isPending}
							className="w-full"
							icon={<i className={`${myIcons.calendar} h-4 w-4`} />}
							text="Set as Published"
						/>
						<RButton
							onClick={() => {
								setFormData({ ...formData, status: "draft" });
							}}
							disabled={addMutation.isPending}
							variant="outline"
							className="w-full"
							icon={<i className={`${myIcons.save} h-4 w-4`} />}
							text="Set as Draft"
						/>
						<RButton
							variant="outline"
							onClick={() => router.push("/dashboard/case-studies")}
							className="w-full bg-transparent"
							text="Cancel"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
