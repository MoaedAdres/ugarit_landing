"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";

interface ServiceDetailsProps {
	serviceData: any;
}

export function ServiceDetails({ serviceData }: ServiceDetailsProps) {
	return (
		<div className="space-y-8">
			{/* Overview Card */}
			<RCard
				cardClassName="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20"
				contentComponent={
					<div className="p-8">
						<div className="space-y-6">
							<div>
								<h2 className="text-xl font-semibold mb-3 text-foreground">Service Overview</h2>
								<RParagraphTruncated
									paragraph={serviceData.description}
									numOfChars={200}
									typographyStyles="text-muted-foreground leading-relaxed text-base"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/30 rounded-xl">
								<div className="text-center">
									<div className="text-3xl font-bold text-primary mb-1">
										${serviceData.priceMin} - ${serviceData.priceMax}
									</div>
									<div className="text-sm font-medium text-muted-foreground">Price Range</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold text-primary mb-1">{serviceData.duration}</div>
									<div className="text-sm font-medium text-muted-foreground">Project Duration</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-3 text-foreground">Detailed Description</h3>
								<RParagraphTruncated
									paragraph={serviceData.fullDescription}
									numOfChars={300}
									typographyStyles="text-muted-foreground leading-relaxed"
								/>
							</div>
						</div>
					</div>
				}
			/>

			{/* Features Card */}
			<RCard
				title="Key Features"
				description="What this service includes"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{serviceData.features.map((feature: string, index: number) => (
							<RFlex key={index} className="items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
								<div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
								</div>
								<span className="font-medium text-foreground">{feature}</span>
							</RFlex>
						))}
					</div>
				}
			/>

			{/* Requirements & Deliverables Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<RCard
					title={
						<RFlex className="items-center gap-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
							Requirements
						</RFlex>
					}
					description="What we need from you"
					cardClassName="border-0 shadow-lg"
					contentComponent={
						<div className="space-y-3">
							{serviceData.requirements.map((requirement: string, index: number) => (
								<RFlex key={index} className="items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
									<div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
									<span className="text-sm text-foreground leading-relaxed">{requirement}</span>
								</RFlex>
							))}
						</div>
					}
				/>

				<RCard
					title={
						<RFlex className="items-center gap-2">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							Deliverables
						</RFlex>
					}
					description="What you'll receive"
					cardClassName="border-0 shadow-lg"
					contentComponent={
						<div className="space-y-3">
							{serviceData.deliverables.map((deliverable: string, index: number) => (
								<RFlex key={index} className="items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
									<div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
									<span className="text-sm text-foreground leading-relaxed">{deliverable}</span>
								</RFlex>
							))}
						</div>
					}
				/>
			</div>
		</div>
	);
}
