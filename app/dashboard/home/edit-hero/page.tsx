"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Eye, Save } from "lucide-react";
import Link from "next/link";

export default function EditHeroPage() {
	const [heroData, setHeroData] = useState({
		title: "Transform Your Business with Our Solutions",
		subtitle: "Innovative technology solutions that drive growth and efficiency",
		description:
			"We help businesses leverage cutting-edge technology to streamline operations, enhance customer experiences, and achieve sustainable growth in today's digital landscape.",
		primaryButtonText: "Get Started",
		primaryButtonLink: "/contact",
		secondaryButtonText: "Learn More",
		secondaryButtonLink: "/services",
		backgroundImage: "/hero-bg.jpg",
		overlayOpacity: 0.6,
		textAlignment: "left",
		isActive: true,
	});

	const handleSave = () => {
		// Save logic would go here
		console.log("Saving hero data:", heroData);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Link href="/dashboard/home">
					<Button variant="ghost" size="sm">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Home
					</Button>
				</Link>
				<div>
					<h1 className="text-2xl font-bold">Edit Hero Section</h1>
					<p className="text-muted-foreground">Customize your homepage hero content</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Edit Form */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Content</CardTitle>
							<CardDescription>Main hero text and messaging</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="title">Title</Label>
								<Input
									id="title"
									value={heroData.title}
									onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
									placeholder="Enter hero title"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="subtitle">Subtitle</Label>
								<Input
									id="subtitle"
									value={heroData.subtitle}
									onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
									placeholder="Enter hero subtitle"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									value={heroData.description}
									onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
									placeholder="Enter hero description"
									rows={4}
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Call-to-Action Buttons</CardTitle>
							<CardDescription>Configure action buttons</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="primaryBtn">Primary Button Text</Label>
									<Input
										id="primaryBtn"
										value={heroData.primaryButtonText}
										onChange={(e) =>
											setHeroData({
												...heroData,
												primaryButtonText: e.target.value,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="primaryLink">Primary Button Link</Label>
									<Input
										id="primaryLink"
										value={heroData.primaryButtonLink}
										onChange={(e) =>
											setHeroData({
												...heroData,
												primaryButtonLink: e.target.value,
											})
										}
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="secondaryBtn">Secondary Button Text</Label>
									<Input
										id="secondaryBtn"
										value={heroData.secondaryButtonText}
										onChange={(e) =>
											setHeroData({
												...heroData,
												secondaryButtonText: e.target.value,
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="secondaryLink">Secondary Button Link</Label>
									<Input
										id="secondaryLink"
										value={heroData.secondaryButtonLink}
										onChange={(e) =>
											setHeroData({
												...heroData,
												secondaryButtonLink: e.target.value,
											})
										}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Design Settings</CardTitle>
							<CardDescription>Visual appearance options</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label>Background Image</Label>
								<div className="flex gap-2">
									<Input
										value={heroData.backgroundImage}
										onChange={(e) =>
											setHeroData({
												...heroData,
												backgroundImage: e.target.value,
											})
										}
										placeholder="Image URL or path"
									/>
									<Button variant="outline" size="sm">
										<Upload className="h-4 w-4" />
									</Button>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="alignment">Text Alignment</Label>
								<Select value={heroData.textAlignment} onValueChange={(value) => setHeroData({ ...heroData, textAlignment: value })}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="left">Left</SelectItem>
										<SelectItem value="center">Center</SelectItem>
										<SelectItem value="right">Right</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Active Status</Label>
									<p className="text-sm text-muted-foreground">Show this hero section</p>
								</div>
								<Switch checked={heroData.isActive} onCheckedChange={(checked) => setHeroData({ ...heroData, isActive: checked })} />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Preview */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Eye className="h-5 w-5" />
								Live Preview
							</CardTitle>
							<CardDescription>See how your hero section will look</CardDescription>
						</CardHeader>
						<CardContent>
							<div
								className="relative rounded-lg overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 min-h-[400px] flex items-center"
								style={{
									backgroundImage: heroData.backgroundImage ? `url(${heroData.backgroundImage})` : undefined,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								<div className="absolute inset-0 bg-black/40"></div>
								<div
									className={`relative z-10 max-w-2xl ${
										heroData.textAlignment === "center"
											? "mx-auto text-center"
											: heroData.textAlignment === "right"
												? "ml-auto text-right"
												: ""
									}`}
								>
									<h1 className="text-4xl font-bold mb-4">{heroData.title}</h1>
									<h2 className="text-xl mb-4 opacity-90">{heroData.subtitle}</h2>
									<p className="text-lg mb-8 opacity-80">{heroData.description}</p>
									<div className="flex gap-4">
										<Button size="lg" className="bg-white text-black hover:bg-gray-100">
											{heroData.primaryButtonText}
										</Button>
										<Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black bg-transparent">
											{heroData.secondaryButtonText}
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="flex gap-3">
						<Button onClick={handleSave} className="flex-1">
							<Save className="h-4 w-4 mr-2" />
							Save Changes
						</Button>
						<Button variant="outline" asChild>
							<Link href="/dashboard/home">Cancel</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
