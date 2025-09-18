"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

interface CaseStudyDetailsProps {
	caseStudyData: any;
}

export function CaseStudyDetails({ caseStudyData }: CaseStudyDetailsProps) {
	return (
		<div className="space-y-8">
			{/* Overview Card */}
			<RCard
				cardClassName="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20"
				contentComponent={
					<div className="p-8">
						<div className="space-y-6">
							<div>
								<h2 className="text-xl font-semibold mb-3 text-foreground">Project Overview</h2>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-muted/30 rounded-xl">
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{caseStudyData.client}</div>
										<div className="text-sm font-medium text-muted-foreground">Client</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{caseStudyData.duration}</div>
										<div className="text-sm font-medium text-muted-foreground">Duration</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{caseStudyData.teamSize}</div>
										<div className="text-sm font-medium text-muted-foreground">Team Size</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			{/* Challenge, Solution, Results */}
			<div className="grid grid-cols-1 gap-6">
				<RCard
					title={
						<RFlex className="items-center gap-2">
							<div className="w-2 h-2 bg-red-500 rounded-full"></div>
							Challenge
						</RFlex>
					}
					cardClassName="border-0 shadow-lg"
					contentComponent={
						<RParagraphTruncated
							paragraph={caseStudyData.challenge}
							numOfChars={500}
							typographyStyles="text-muted-foreground leading-relaxed"
						/>
					}
				/>

				<RCard
					title={
						<RFlex className="items-center gap-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
							Solution
						</RFlex>
					}
					cardClassName="border-0 shadow-lg"
					contentComponent={
						<RParagraphTruncated
							paragraph={caseStudyData.solution}
							numOfChars={500}
							typographyStyles="text-muted-foreground leading-relaxed"
						/>
					}
				/>

				<RCard
					title={
						<RFlex className="items-center gap-2">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							Results
						</RFlex>
					}
					cardClassName="border-0 shadow-lg"
					contentComponent={
						<RParagraphTruncated
							paragraph={caseStudyData.results}
							numOfChars={500}
							typographyStyles="text-muted-foreground leading-relaxed"
						/>
					}
				/>
			</div>

			{/* Technologies Card */}
			<RCard
				title="Technologies Used"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="flex flex-wrap gap-3">
						{caseStudyData.technologies.map((tech: string, index: number) => (
							<Badge key={index} variant="secondary" className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
								{tech}
							</Badge>
						))}
					</div>
				}
			/>

			{/* Testimonial Card */}
			{caseStudyData.testimonial && (
				<RCard
					title={
						<RFlex className="items-center gap-2">
							<i className={`${myIcons.quote} h-5 w-5 text-purple-600`} />
							Client Testimonial
						</RFlex>
					}
					cardClassName="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20"
					contentComponent={
						<div>
							<blockquote className="text-lg italic text-foreground mb-4">
								"{caseStudyData.testimonial}"
							</blockquote>
							<RFlex className="items-center gap-3">
								<div className="w-10 h-10 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center">
									<span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
										{caseStudyData.testimonialAuthor.split(' ').map((n: string) => n[0]).join('')}
									</span>
								</div>
								<div>
									<div className="font-semibold text-foreground">{caseStudyData.testimonialAuthor}</div>
									<div className="text-sm text-muted-foreground">{caseStudyData.testimonialRole}</div>
								</div>
							</RFlex>
						</div>
					}
				/>
			)}
		</div>
	);
}
