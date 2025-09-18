"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";

interface BlogPostDetailsProps {
	blogPostData: any;
}

export function BlogPostDetails({ blogPostData }: BlogPostDetailsProps) {
	return (
		<div className="space-y-8">
			{/* Post Overview */}
			<RCard
				cardClassName="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20"
				contentComponent={
					<div className="p-8">
						<div className="space-y-6">
							<div>
								<h2 className="text-xl font-semibold mb-3 text-foreground">Post Overview</h2>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-muted/30 rounded-xl">
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{blogPostData.author}</div>
										<div className="text-sm font-medium text-muted-foreground">Author</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{blogPostData.readTime}</div>
										<div className="text-sm font-medium text-muted-foreground">Read Time</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-1">{blogPostData.views.toLocaleString()}</div>
										<div className="text-sm font-medium text-muted-foreground">Views</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			{/* Excerpt */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
						Post Excerpt
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<RParagraphTruncated
						paragraph={blogPostData.excerpt}
						numOfChars={500}
						typographyStyles="text-muted-foreground leading-relaxed text-lg"
					/>
				}
			/>

			{/* Content Preview */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						Content Preview
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="prose prose-sm max-w-none">
						<RParagraphTruncated
							paragraph={blogPostData.content}
							numOfChars={500}
							typographyStyles="text-muted-foreground leading-relaxed"
						/>
						<p className="text-muted-foreground mt-2">...</p>
					</div>
				}
			/>

			{/* Tags */}
			<RCard
				title={
					<RFlex className="items-center gap-2">
						<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
						Tags
					</RFlex>
				}
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="flex flex-wrap gap-3">
						{blogPostData.tags.map((tag: string, index: number) => (
							<Badge key={index} variant="secondary" className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
								<i className={`${myIcons.hashtag} h-3 w-3 mr-1`} />
								{tag}
							</Badge>
						))}
					</div>
				}
			/>
		</div>
	);
}
