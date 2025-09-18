"use client";

import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

interface CaseStudyActionsProps {
	caseStudyData: any;
}

export function CaseStudyActions({ caseStudyData }: CaseStudyActionsProps) {
	return (
		<div className="space-y-6">
			{/* Case Study Status */}
			<RCard
				title="Case Study Status"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
						<div className="space-y-4">
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Status</div>
									<div className="text-xs text-muted-foreground">Publication status</div>
								</div>
								<Badge variant={caseStudyData.status === "published" ? "default" : "secondary"} className="font-medium">
									{caseStudyData.status === "published" ? "Published" : "Draft"}
								</Badge>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Featured</div>
									<div className="text-xs text-muted-foreground">Homepage highlight</div>
								</div>
								<Badge variant={caseStudyData.featured ? "default" : "secondary"} className="font-medium">
									{caseStudyData.featured ? "Yes" : "No"}
								</Badge>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Publish Date</div>
									<div className="text-xs text-muted-foreground">When published</div>
								</div>
								<span className="text-sm text-muted-foreground font-medium">{caseStudyData.publishDate}</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Last Updated</div>
									<div className="text-xs text-muted-foreground">Recent changes</div>
								</div>
								<span className="text-sm text-muted-foreground font-medium">{caseStudyData.updatedAt}</span>
							</div>
						</div>
					</div>
				}
			/>

			{/* Quick Actions */}
			<RCard
				title="Quick Actions"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<RFlex className="flex-col gap-3">
						<RButton
							className="w-full"
							size="lg"
							onClick={() => window.location.href = `/dashboard/case-studies/${caseStudyData.id}?isEdit=true`}
							icon={<i className={`${myIcons.edit} h-4 w-4`} />}
							text="Edit Case Study"
						/>
						<RButton
							variant="outline"
							className="w-full"
							size="lg"
							icon={<i className={`${myIcons.eye} h-4 w-4`} />}
							text="Preview on Site"
						/>
						<RButton
							variant="outline"
							className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
							size="lg"
							icon={<i className={`${myIcons.xmark} h-4 w-4`} />}
							text="Delete Case Study"
						/>
					</RFlex>
				}
			/>
		</div>
	);
}
