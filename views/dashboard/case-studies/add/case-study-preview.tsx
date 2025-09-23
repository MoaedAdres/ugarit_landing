"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

interface CaseStudyPreviewProps {
	formData: any;
}

export function CaseStudyPreview({ formData }: CaseStudyPreviewProps) {
	return (
		<div className="space-y-6">
			{/* Status Overview */}
			<RCard
				title="Overview"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-4">
						<RFlex className="items-center justify-between">
							<Label>Status</Label>
							<Badge variant={formData.status === "published" ? "default" : "secondary"}>
								{formData.status}
							</Badge>
						</RFlex>
						<RFlex className="items-center justify-between">
							<Label>Client</Label>
							<span className="text-sm text-muted-foreground">
								{formData.client_name || "Not set"}
							</span>
						</RFlex>
						<RFlex className="items-center justify-between">
							<Label>Order</Label>
							<span className="text-sm text-muted-foreground">{formData.order}</span>
						</RFlex>
						<RFlex className="items-center justify-between">
							<Label>Testimonial ID</Label>
							<span className="text-sm text-muted-foreground">{formData.testimonial_id}</span>
						</RFlex>
					</div>
				}
			/>

			{/* Content Summary */}
			<RCard
				title="Content Summary"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-4">
						{formData.en.sector && (
							<div>
								<Label className="text-sm font-medium">Sector</Label>
								<p className="text-sm text-muted-foreground">{formData.en.sector}</p>
							</div>
						)}
						
						{formData.en.problem && (
							<div>
								<Label className="text-sm font-medium">Problem</Label>
								<RParagraphTruncated
									paragraph={formData.en.problem}
									numOfChars={100}
									typographyStyles="text-sm text-muted-foreground"
								/>
							</div>
						)}
						
						{formData.en.solution && (
							<div>
								<Label className="text-sm font-medium">Solution</Label>
								<RParagraphTruncated
									paragraph={formData.en.solution}
									numOfChars={100}
									typographyStyles="text-sm text-muted-foreground"
								/>
							</div>
						)}

						{formData.en.body_blocks.length > 0 && (
							<div>
								<Label className="text-sm font-medium">Body Blocks</Label>
								<p className="text-sm text-muted-foreground">
									{formData.en.body_blocks.length} block(s) added
								</p>
							</div>
						)}

						{Object.keys(formData.en.results_kpis).length > 0 && (
							<div>
								<Label className="text-sm font-medium">Results KPIs</Label>
								<div className="space-y-1">
									{Object.entries(formData.en.results_kpis).slice(0, 3).map(([key, value]) => (
										<div key={key} className="flex justify-between text-xs">
											<span className="text-muted-foreground capitalize">
												{key.replace(/_/g, ' ')}:
											</span>
											<span className="font-medium">{value as string}</span>
										</div>
									))}
									{Object.keys(formData.en.results_kpis).length > 3 && (
										<p className="text-xs text-muted-foreground">
											+{Object.keys(formData.en.results_kpis).length - 3} more
										</p>
									)}
								</div>
							</div>
						)}
					</div>
				}
			/>

			{/* Files */}
			<RCard
				title="Files"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-3">
						<RFlex className="items-center justify-between">
							<Label>Logo</Label>
							<span className="text-sm text-muted-foreground">
								{formData.logo ? formData.logo.name : "Not uploaded"}
							</span>
						</RFlex>
						<RFlex className="items-center justify-between">
							<Label>Gallery</Label>
							<span className="text-sm text-muted-foreground">
								{formData.gallery ? `${formData.gallery.length} file(s)` : "Not uploaded"}
							</span>
						</RFlex>
					</div>
				}
			/>
		</div>
	);
}
