"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

interface ServicePreviewProps {
	serviceData: any;
}

export function ServicePreview({ serviceData }: ServicePreviewProps) {
	return (
		<>
			{/* Settings Card */}
			<RCard
				title="Settings"
				contentComponent={
					<div className="space-y-4">
						<RFlex className="items-center justify-between">
							<div className="space-y-0.5">
								<Label>Active Status</Label>
								<p className="text-sm text-muted-foreground">Make service available</p>
							</div>
							<Switch
								checked={serviceData.isActive}
								onCheckedChange={(checked) => {
									// This would be handled by parent component
									console.log("Toggle active status:", checked);
								}}
							/>
						</RFlex>

						<RFlex className="items-center justify-between">
							<div className="space-y-0.5">
								<Label>Featured Service</Label>
								<p className="text-sm text-muted-foreground">Highlight on homepage</p>
							</div>
							<Switch
								checked={serviceData.featured}
								onCheckedChange={(checked) => {
									// This would be handled by parent component
									console.log("Toggle featured status:", checked);
								}}
							/>
						</RFlex>
					</div>
				}
			/>

			{/* Preview Card */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<i className={`${myIcons.eye} h-5 w-5`} />
						Preview
					</RFlex>
				}
				contentComponent={
					<div className="border rounded-lg p-4 space-y-3">
						<RFlex className="items-center gap-2">
							<h3 className="font-semibold">{serviceData.title || "Service Title"}</h3>
							{serviceData.category && <Badge variant="outline">{serviceData.category}</Badge>}
						</RFlex>
						<RParagraphTruncated
							paragraph={serviceData.description || "Service description will appear here"}
							numOfChars={100}
							typographyStyles="text-sm text-muted-foreground"
						/>
						<div className="text-sm">
							<span className="font-medium">
								${serviceData.priceMin || "0"} - ${serviceData.priceMax || "0"}
							</span>
							{serviceData.duration && (
								<span className="text-muted-foreground ml-2">• {serviceData.duration}</span>
							)}
						</div>
					</div>
				}
			/>
		</>
	);
}
