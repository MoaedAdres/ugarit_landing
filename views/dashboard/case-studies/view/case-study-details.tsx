"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";
import { CaseStudy } from "@/api/services/dashboard/case-studies/interfaces";

interface CaseStudyDetailsProps {
	caseStudyData: CaseStudy;
}

export function CaseStudyDetails({ caseStudyData }: CaseStudyDetailsProps) {
	// Get the English translation for display, fallback to first available
	const englishTranslation = caseStudyData.translations.find(t => t.locale === 'en') || caseStudyData.translations[0];
	const testimonial = caseStudyData.testimonial;
	const englishTestimonial = testimonial?.translations.find(t => t.locale === 'en') || testimonial?.translations[0];
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
										<div className="text-2xl font-bold text-primary mb-1">{caseStudyData.client_name}</div>
										<div className="text-sm font-medium text-muted-foreground">Client</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{englishTranslation?.sector || caseStudyData.sector}</div>
										<div className="text-sm font-medium text-muted-foreground">Sector</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{caseStudyData.status}</div>
										<div className="text-sm font-medium text-muted-foreground">Status</div>
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
							paragraph={englishTranslation?.problem || caseStudyData.problem}
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
							paragraph={englishTranslation?.solution || caseStudyData.solution}
							numOfChars={500}
							typographyStyles="text-muted-foreground leading-relaxed"
						/>
					}
				/>

				<RCard
					title={
						<RFlex className="items-center gap-2">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							Results & KPIs
						</RFlex>
					}
					cardClassName="border-0 shadow-lg"
					contentComponent={
						<div className="space-y-4">
							{/* Body Blocks */}
							{englishTranslation?.body_blocks && englishTranslation.body_blocks.length > 0 && (
								<div>
									<h4 className="text-sm font-semibold text-foreground mb-3">Implementation Details</h4>
									{englishTranslation.body_blocks.map((block, index) => (
										<div key={index} className="p-3 bg-muted/30 rounded-lg mb-2">
											<p className="text-sm text-muted-foreground leading-relaxed">{block}</p>
										</div>
									))}
								</div>
							)}
							
							{/* KPIs */}
							{(englishTranslation?.results_kpis || caseStudyData.results_kpis) && (
								<div>
									<h4 className="text-sm font-semibold text-foreground mb-3">Key Performance Indicators</h4>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										{Object.entries(englishTranslation?.results_kpis || caseStudyData.results_kpis).map(([key, value]) => (
											<div key={key} className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800 text-center">
												<div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{value}</div>
												<div className="text-xs font-medium text-green-800 dark:text-green-200 capitalize">
													{key.replace(/_/g, ' ')}
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					}
				/>
			</div>

			{/* Media Gallery */}
			{caseStudyData.media && caseStudyData.media.length > 0 && (
				<RCard
					title="Project Media"
					cardClassName="border-0 shadow-lg"
					contentComponent={
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{caseStudyData.media.map((media, index) => (
								<div key={index} className="relative group overflow-hidden rounded-lg border border-border">
									<img
										src={media.original_url}
										alt={media.name}
										className="w-full h-48 object-cover transition-transform group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
										<div className="text-white text-center">
											<div className="text-sm font-medium">{media.name}</div>
											<div className="text-xs text-white/80">{media.collection_name}</div>
										</div>
									</div>
								</div>
							))}
						</div>
					}
				/>
			)}

			{/* Testimonial Card */}
			{testimonial && (
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
								"{englishTestimonial?.quote || testimonial.quote}"
							</blockquote>
							<RFlex className="items-center gap-3">
								{testimonial.images && testimonial.images.length > 0 ? (
									<img
										src={testimonial.images[0].url}
										alt={testimonial.name}
										className="w-10 h-10 rounded-full object-cover"
									/>
								) : (
									<div className="w-10 h-10 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center">
										<span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
											{testimonial.name
												?.split(" ")
												?.map((n: string) => n[0])
												.join("")}
										</span>
									</div>
								)}
								<div>
									<div className="font-semibold text-foreground">{testimonial.name}</div>
									<div className="text-sm text-muted-foreground">{testimonial.role}</div>
									<div className="text-xs text-muted-foreground">{testimonial.company}</div>
								</div>
							</RFlex>
						</div>
					}
				/>
			)}
		</div>
	);
}
