"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { myIcons } from "@/constants/icons";

interface PartnerPreviewProps {
	partnerData: any;
}

export function PartnerPreview({ partnerData }: PartnerPreviewProps) {
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
								<Label className="text-sm font-medium">Featured Partner</Label>
								<p className="text-xs text-muted-foreground">Highlight on homepage</p>
							</div>
							<Switch
								checked={partnerData.featured}
								onCheckedChange={(checked) => {/* Handle featured change */}}
							/>
						</div>
					</div>
				}
			/>

			{/* Partner Logo */}
			<RCard
				title="Partner Logo"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-4">
						<RFlex className="flex-col items-center gap-4">
							<div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center">
								<i className={`${myIcons.building} h-8 w-8 text-muted-foreground`} />
							</div>
							<button className="w-full h-12 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
								<i className={`${myIcons.upload} h-4 w-4`} />
								Upload Logo
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
							<div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
								<i className={`${myIcons.building} h-5 w-5 text-muted-foreground`} />
							</div>
							<div>
								<h4 className="font-medium text-sm">{partnerData.name || "Partner Name"}</h4>
								<p className="text-xs text-muted-foreground">
									{partnerData.type || "Partner Type"}
								</p>
							</div>
						</RFlex>
						<RParagraphTruncated
							paragraph={partnerData.description || "Partner description will appear here..."}
							numOfChars={80}
							typographyStyles="text-sm text-muted-foreground"
						/>
						<RFlex className="items-center justify-between">
							<span className="text-xs text-muted-foreground">{partnerData.category || "Category"}</span>
							<span className="text-xs font-medium text-violet-600">{partnerData.revenue || "$0"}</span>
						</RFlex>
					</div>
				}
			/>
		</div>
	);
}
