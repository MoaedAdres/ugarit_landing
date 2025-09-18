"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { myIcons } from "@/constants/icons";

interface TestimonialPreviewProps {
	testimonialData: any;
}

export function TestimonialPreview({ testimonialData }: TestimonialPreviewProps) {
	return (
		<div className="space-y-6">
			{/* Settings */}
			<RCard
				title="Settings"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
						<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Featured Testimonial</Label>
								<p className="text-xs text-muted-foreground">Highlight on homepage</p>
							</div>
							<Switch
								checked={testimonialData.featured}
								onCheckedChange={(checked) => {/* Handle featured change */}}
							/>
						</div>
					</div>
				}
			/>

			{/* Profile Photo */}
			<RCard
				title="Profile Photo"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-4">
						<RFlex className="flex-col items-center gap-4">
							<div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
								<i className={`${myIcons.user} h-8 w-8 text-muted-foreground`} />
							</div>
							<button className="w-full h-12 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
								<i className={`${myIcons.upload} h-4 w-4`} />
								Upload Photo
							</button>
						</RFlex>
					</div>
				}
			/>

			{/* Preview */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<i className={`${myIcons.eye} h-5 w-5`} />
						Preview
					</RFlex>
				}
				contentComponent={
					<div className="border rounded-lg p-4 space-y-3">
						<RFlex className="items-center gap-3">
							<div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
								<i className={`${myIcons.user} h-5 w-5 text-muted-foreground`} />
							</div>
							<div>
								<h4 className="font-medium text-sm">{testimonialData.name || "Client Name"}</h4>
								<p className="text-xs text-muted-foreground">
									{testimonialData.role || "Role"} at {testimonialData.company || "Company"}
								</p>
							</div>
						</RFlex>
						<p className="text-sm italic">"{testimonialData.content || "Testimonial content will appear here..."}"</p>
						<div className="flex">
							{Array.from({ length: 5 }).map((_, i) => (
								<i key={i} className={`${myIcons.star} h-4 w-4 ${i < testimonialData.rating ? "text-yellow-400" : "text-gray-300"}`} />
							))}
						</div>
					</div>
				}
			/>
		</div>
	);
}
