"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

interface CaseStudyPreviewProps {
	studyData: any;
}

export function CaseStudyPreview({ studyData }: CaseStudyPreviewProps) {
	return (
		<div className="space-y-6">
			{/* Publish Settings */}
			<RCard
				title="Publish Settings"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
						<div className="space-y-3">
							<Label htmlFor="publishDate" className="text-sm font-medium">Publish Date</Label>
							<input
								id="publishDate"
								type="date"
								value={studyData.publishDate}
								onChange={(e) => {/* Handle date change */}}
								className="w-full h-11 px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
							/>
						</div>

						<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Featured Case Study</Label>
								<p className="text-xs text-muted-foreground">Highlight on homepage</p>
							</div>
							<Switch
								checked={studyData.featured}
								onCheckedChange={(checked: boolean) => {/* Handle featured change */}}
							/>
						</div>
					</div>
				}
			/>

			{/* Project Images */}
			<RCard
				title="Project Images"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-4">
						<button className="w-full h-12 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
							<i className={`${myIcons.upload} h-4 w-4`} />
							Upload Images
						</button>
						<p className="text-xs text-muted-foreground text-center">Add screenshots, mockups, or before/after images</p>
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
							<h3 className="font-semibold">{studyData.title || "Case Study Title"}</h3>
							{studyData.industry && <Badge variant="outline">{studyData.industry}</Badge>}
						</RFlex>
						
						{studyData.client && (
							<p className="text-sm text-muted-foreground">Client: {studyData.client}</p>
						)}
						
						{studyData.challenge && (
							<div>
								<h4 className="text-sm font-medium mb-1">Challenge</h4>
								<RParagraphTruncated
									paragraph={studyData.challenge}
									numOfChars={100}
									typographyStyles="text-sm text-muted-foreground"
								/>
							</div>
						)}
						
						{studyData.results && (
							<div>
								<h4 className="text-sm font-medium mb-1">Results</h4>
								<RParagraphTruncated
									paragraph={studyData.results}
									numOfChars={80}
									typographyStyles="text-sm text-muted-foreground"
								/>
							</div>
						)}
						
						{studyData.technologies.length > 0 && (
							<div>
								<h4 className="text-sm font-medium mb-2">Technologies</h4>
								<RFlex className="flex-wrap gap-1">
									{studyData.technologies.slice(0, 3).map((tech: string) => (
										<Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
											{tech}
										</Badge>
									))}
									{studyData.technologies.length > 3 && (
										<Badge variant="outline" className="text-xs px-2 py-1">
											+{studyData.technologies.length - 3} more
										</Badge>
									)}
								</RFlex>
							</div>
						)}
					</div>
				}
			/>
		</div>
	);
}
