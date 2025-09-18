"use client";

import RCard from "@/RComponents/RCard";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import RSelect from "@/RComponents/RSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";
import RButton from "@/RComponents/RButton";

interface BlogPostPreviewProps {
	postData: any;
}

export function BlogPostPreview({ postData }: BlogPostPreviewProps) {
	const categories = ["Technology", "Development", "Design", "Business", "Marketing"];

	return (
		<div className="space-y-6">
			{/* Publish Settings */}
			<RCard
				title="Publish Settings"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
						<div className="space-y-3">
							<Label htmlFor="author" className="text-sm font-medium">Author</Label>
							<Input
								id="author"
								value={postData.author}
								onChange={(e) => {/* Handle author change */}}
								placeholder="Author name"
								className="h-11"
							/>
						</div>

						<div className="space-y-3">
							<Label htmlFor="publishDate" className="text-sm font-medium">Publish Date</Label>
							<input
								id="publishDate"
								type="datetime-local"
								value={postData.publishDate}
								onChange={(e) => {/* Handle date change */}}
								className="w-full h-11 px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
							/>
						</div>

						<div className="space-y-3">
							<Label htmlFor="readTime" className="text-sm font-medium">Read Time</Label>
							<Input
								id="readTime"
								value={postData.readTime}
								onChange={(e) => {/* Handle read time change */}}
								placeholder="5 min read"
								className="h-11"
							/>
						</div>

						<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Allow Comments</Label>
								<p className="text-xs text-muted-foreground">Enable reader comments</p>
							</div>
							<Switch
								checked={postData.allowComments}
								onCheckedChange={(checked: boolean) => {/* Handle comments change */}}
							/>
						</div>

						<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
							<div className="space-y-1">
								<Label className="text-sm font-medium">Featured Post</Label>
								<p className="text-xs text-muted-foreground">Highlight on homepage</p>
							</div>
							<Switch
								checked={postData.featured}
								onCheckedChange={(checked: boolean) => {/* Handle featured change */}}
							/>
						</div>
					</div>
				}
			/>

			{/* Categories & Tags */}
			<RCard
				title="Categories & Tags"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-6">
						<div className="space-y-3">
							<Label htmlFor="category" className="text-sm font-medium">Category</Label>
							<RSelect
								value={postData.category}
								handleChange={(value: string) => {/* Handle category change */}}
								placeholder="Select category"
								options={categories.map(cat => ({ value: cat, label: cat }))}
								triggerClassName="h-11"
							/>
						</div>

						<div className="space-y-3">
							<Label className="text-sm font-medium">Tags</Label>
							<div className="flex gap-3">
								<Input
									placeholder="Add tag"
									onKeyPress={(e: any) => e.key === "Enter" && {/* Handle add tag */}}
									className="h-11"
								/>
								<RButton size="lg" className="px-6" icon={<i className={`${myIcons.plus} h-4 w-4`} />} text="Add" />
							</div>
							<div className="flex flex-wrap gap-3">
								{postData.tags.map((tag: string) => (
									<Badge key={tag} variant="secondary" className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
										{tag}
										<i className={`${myIcons.xmark} h-3 w-3 cursor-pointer hover:text-red-500 transition-colors`} onClick={() => {/* Handle remove tag */}} />
									</Badge>
								))}
							</div>
						</div>
					</div>
				}
			/>

			{/* Featured Image */}
			<RCard
				title="Featured Image"
				cardClassName="border-0 shadow-lg"
				contentComponent={
					<div className="space-y-4">
						<div className="space-y-3">
							<Input
								value={postData.featuredImage}
								onChange={(e) => {/* Handle image change */}}
								placeholder="Image URL"
								className="h-11"
							/>
							<button className="w-full h-12 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
								<i className={`${myIcons.upload} h-4 w-4`} />
								Upload Image
							</button>
						</div>
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
							<h3 className="font-semibold">{postData.title || "Blog Post Title"}</h3>
							{postData.category && <Badge variant="outline">{postData.category}</Badge>}
						</RFlex>
						
						{postData.author && (
							<p className="text-sm text-muted-foreground">Author: {postData.author}</p>
						)}
						
						{postData.excerpt && (
							<div>
								<h4 className="text-sm font-medium mb-1">Excerpt</h4>
								<RParagraphTruncated
									paragraph={postData.excerpt}
									numOfChars={100}
									typographyStyles="text-sm text-muted-foreground"
								/>
							</div>
						)}
						
						{postData.content && (
							<div>
								<h4 className="text-sm font-medium mb-1">Content Preview</h4>
								<RParagraphTruncated
									paragraph={postData.content}
									numOfChars={150}
									typographyStyles="text-sm text-muted-foreground"
								/>
							</div>
						)}
						
						{postData.tags.length > 0 && (
							<div>
								<h4 className="text-sm font-medium mb-2">Tags</h4>
								<RFlex className="flex-wrap gap-1">
									{postData.tags.slice(0, 3).map((tag: string) => (
										<Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
											{tag}
										</Badge>
									))}
									{postData.tags.length > 3 && (
										<Badge variant="outline" className="text-xs px-2 py-1">
											+{postData.tags.length - 3} more
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
