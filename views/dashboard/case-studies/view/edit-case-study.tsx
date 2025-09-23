"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { myIcons } from "@/constants/icons";
import { CaseStudyForm } from "../CaseStudyForm";
import { CaseStudyPreview } from "../add/case-study-preview";
import { caseStudiesRepository } from "@/api/services/dashboard/case-studies";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutateData } from "@/hooks/use-mutate-data";

export default function EditCaseStudy() {
	const params = useParams();
	const router = useRouter();
	const caseStudyId = parseInt(params.id as string);

	const [formData, setFormData] = useState({
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

	// Fetch case study data
	const { data: caseStudyData, isLoading } = useFetchData({
		queryKey: ["case-study", caseStudyId],
		queryFn: () => caseStudiesRepository.getCaseStudy(caseStudyId),
		enableCondition: !!caseStudyId,
		onSuccessFn: (data) => {
			const apiData = data.data;
			const enTranslation = apiData.translations.find(t => t.locale === 'en') || apiData.translations[0];
			const arTranslation = apiData.translations.find(t => t.locale === 'ar') || apiData.translations[0];
			const frTranslation = apiData.translations.find(t => t.locale === 'fr') || apiData.translations[0];

			setFormData({
				client_name: apiData.client_name,
				testimonial_id: apiData.testimonial_id,
				status: apiData.status,
				order: apiData.order,
				en: {
					sector: enTranslation?.sector || "",
					problem: enTranslation?.problem || "",
					solution: enTranslation?.solution || "",
					body_blocks: enTranslation?.body_blocks || [],
					results_kpis: enTranslation?.results_kpis || {}
				},
				ar: {
					sector: arTranslation?.sector || "",
					problem: arTranslation?.problem || "",
					solution: arTranslation?.solution || "",
					body_blocks: arTranslation?.body_blocks || [],
					results_kpis: arTranslation?.results_kpis || {}
				},
				fr: {
					sector: frTranslation?.sector || "",
					problem: frTranslation?.problem || "",
					solution: frTranslation?.solution || "",
					body_blocks: frTranslation?.body_blocks || [],
					results_kpis: frTranslation?.results_kpis || {}
				}
			});
		}
	});

	// Update mutation
	const updateMutation = useMutateData({
		mutationFn: (data: FormData) => caseStudiesRepository.updateCaseStudy(caseStudyId, data),
		onSuccessFn: () => {
			router.push(`/dashboard/case-studies/${caseStudyId}?isEdit=false`);
		},
		displaySuccess: true
	});

	const handleSubmit = (apiFormData: FormData) => {
		updateMutation.mutate(apiFormData);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-20">
				<div className="text-center">
					<i className="fas fa-spinner fa-spin h-8 w-8 text-muted-foreground mb-4"></i>
					<p className="text-muted-foreground">Loading case study...</p>
				</div>
			</div>
		);
	}

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
					<h1 className="text-2xl font-bold">Edit Case Study</h1>
								<p className="text-muted-foreground">Update case study information</p>
							</div>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Form */}
				<div className="lg:col-span-2">
					<CaseStudyForm
						formData={formData}
						setFormData={setFormData}
						onSubmit={handleSubmit}
						isLoading={updateMutation.isPending}
						isEdit={true}
					/>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<CaseStudyPreview formData={formData} />

								<div className="space-y-3">
						<RButton
							onClick={() => router.push(`/dashboard/case-studies/${caseStudyId}?isEdit=false`)}
							variant="outline"
							className="w-full"
							icon={<i className={`${myIcons.eye} h-4 w-4`} />}
							text="View Case Study"
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
