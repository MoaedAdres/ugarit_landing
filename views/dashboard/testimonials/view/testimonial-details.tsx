"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import { Label } from "@/components/ui/label";
import { myIcons } from "@/constants/icons";

interface TestimonialDetailsProps {
	testimonialData: any;
}

export function TestimonialDetails({ testimonialData }: TestimonialDetailsProps) {
	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }).map((_, i) => (
			<i key={i} className={`${myIcons.star} h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} />
		));
	};

	return (
		<div className="space-y-8">
			{/* Testimonial Overview */}
			<RCard
				cardClassName="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20"
				contentComponent={
					<div className="p-8">
						<div className="space-y-6">
							<div>
								<h2 className="text-xl font-semibold mb-3 text-foreground">Testimonial Overview</h2>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-muted/30 rounded-xl">
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{testimonialData.role}</div>
										<div className="text-sm font-medium text-muted-foreground">Position</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{testimonialData.rating}/5</div>
										<div className="text-sm font-medium text-muted-foreground">Rating</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{testimonialData.project}</div>
										<div className="text-sm font-medium text-muted-foreground">Project</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			{/* Testimonial Content */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-rose-500 rounded-full"></div>
						Client Testimonial
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div>
						<div className="relative p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 rounded-xl">
							<div className="absolute top-4 left-4">
								<i className={`${myIcons.quote} h-8 w-8 text-rose-200 dark:text-rose-800`} />
							</div>
							<RParagraphTruncated
								paragraph={`"${testimonialData.content}"`}
								numOfChars={500}
								typographyStyles="text-muted-foreground leading-relaxed text-lg italic ml-8"
							/>
						</div>
						<div className="flex items-center justify-center mt-6">
							<RFlex className="items-center gap-2">
								<div className="flex">{renderStars(testimonialData.rating)}</div>
								<span className="text-lg font-medium text-muted-foreground ml-2">{testimonialData.rating}/5 stars</span>
							</RFlex>
						</div>
					</div>
				}
			/>

			{/* Contact Information */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
						Contact Information
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
							<p className="text-foreground font-medium">{testimonialData.email}</p>
						</div>
						<div className="space-y-2">
							<Label className="text-sm font-medium text-muted-foreground">Company</Label>
							<p className="text-foreground font-medium">{testimonialData.company}</p>
						</div>
					</div>
				}
			/>
		</div>
	);
}
