"use client";

import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

interface TestimonialActionsProps {
	testimonialData: any;
}

export function TestimonialActions({ testimonialData }: TestimonialActionsProps) {
	return (
		<div className="space-y-6">
			{/* Testimonial Status */}
			<RCard
				title="Testimonial Status"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
						<div className="space-y-4">
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Status</div>
									<div className="text-xs text-muted-foreground">Publication status</div>
								</div>
								<Badge variant={testimonialData.status === "published" ? "default" : "secondary"} className="font-medium">
									{testimonialData.status === "published" ? "Published" : "Draft"}
								</Badge>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Featured</div>
									<div className="text-xs text-muted-foreground">Homepage highlight</div>
								</div>
								<Badge variant={testimonialData.featured ? "default" : "secondary"} className="font-medium">
									{testimonialData.featured ? "Yes" : "No"}
								</Badge>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Public Display</div>
									<div className="text-xs text-muted-foreground">Show on website</div>
								</div>
								<Badge variant={testimonialData.allowPublicDisplay ? "default" : "secondary"} className="font-medium">
									{testimonialData.allowPublicDisplay ? "Yes" : "No"}
								</Badge>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Follow-up Contact</div>
									<div className="text-xs text-muted-foreground">Case study permission</div>
								</div>
								<Badge variant={testimonialData.contactForFollowup ? "default" : "secondary"} className="font-medium">
									{testimonialData.contactForFollowup ? "Yes" : "No"}
								</Badge>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Created Date</div>
									<div className="text-xs text-muted-foreground">When submitted</div>
								</div>
								<span className="text-sm text-muted-foreground font-medium">
									{new Date(testimonialData.createdAt).toLocaleDateString()}
								</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
								<div>
									<div className="font-medium text-sm">Last Updated</div>
									<div className="text-xs text-muted-foreground">Recent changes</div>
								</div>
								<span className="text-sm text-muted-foreground font-medium">{testimonialData.updatedAt}</span>
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
							onClick={() => window.location.href = `/dashboard/testimonials/${testimonialData.id}?isEdit=true`}
							icon={<i className={`${myIcons.edit} h-4 w-4`} />}
							text="Edit Testimonial"
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
							className="w-full"
							size="lg"
							icon={<i className={`${myIcons.comment} h-4 w-4`} />}
							text="Contact Client"
						/>
						<RButton
							variant="outline"
							className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
							size="lg"
							icon={<i className={`${myIcons.xmark} h-4 w-4`} />}
							text="Delete Testimonial"
						/>
					</RFlex>
				}
			/>
		</div>
	);
}
