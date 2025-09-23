"use client";

import { useParams, useRouter } from "next/navigation";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";
import { CaseStudyDetails } from "./case-study-details";
import { CaseStudyActions } from "./case-study-actions";
import { caseStudiesRepository } from "@/api/services/dashboard/case-studies";
import { useFetchData } from "@/hooks/use-fetch-data";

export default function ViewCaseStudy() {
	const params = useParams();
	const router = useRouter();
	const caseStudyId = parseInt(params.id as string);

	// Fetch case study data
	const { data: caseStudyData, isLoading, error } = useFetchData({
		queryKey: ["case-study", caseStudyId],
		queryFn: () => caseStudiesRepository.getCaseStudy(caseStudyId),
		enableCondition: !!caseStudyId
	});

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

	if (error || !caseStudyData) {
		return (
			<div className="flex items-center justify-center py-20">
				<div className="text-center">
					<i className="fas fa-exclamation-triangle h-8 w-8 text-destructive mb-4"></i>
					<p className="text-destructive">Failed to load case study</p>
				</div>
			</div>
		);
	}

	const englishTranslation = caseStudyData.data.translations.find(t => t.locale === 'en') || caseStudyData.data.translations[0];

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<RFlex className="items-start justify-between">
				<RFlex className="items-start gap-4">
					<RButton
						variant="ghost"
						size="sm"
						className="mt-1"
						onClick={() => router.push("/dashboard/case-studies")}
						icon={<i className={`${myIcons.arrowLeft} h-4 w-4`} />}
						text="Back to Case Studies"
					/>
					<div className="space-y-2">
						<RFlex className="items-center gap-3">
							<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
								<i className={`${myIcons.target} h-7 w-7 text-primary`} />
							</div>
							<div>
								<h1 className="text-3xl font-bold tracking-tight">{caseStudyData.data.client_name}</h1>
								<RFlex className="items-center gap-2 mt-2">
									<Badge variant="outline" className="font-medium">{englishTranslation?.sector}</Badge>
									<Badge variant={caseStudyData.data.status === "published" ? "default" : "secondary"} className="font-medium">
										{caseStudyData.data.status === "published" ? "Published" : "Draft"}
									</Badge>
									{caseStudyData.data.testimonial && (
										<Badge variant="default" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium">
											<i className={`${myIcons.quote} h-3 w-3 mr-1`} />
											Has Testimonial
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
					onClick={() => router.push(`/dashboard/case-studies/${caseStudyData.data.id}?isEdit=true`)}
					icon={<i className={`${myIcons.edit} h-4 w-4`} />}
					text="Edit Case Study"
				/>
			</RFlex>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2">
					<CaseStudyDetails caseStudyData={caseStudyData.data} />
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<CaseStudyActions caseStudyData={caseStudyData.data} />
				</div>
			</div>
		</div>
	);
}
