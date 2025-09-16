"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Plus, X, Upload, Package } from "lucide-react";
import Link from "next/link";

interface ProductData {
	name: string;
	category: string;
	description: string;
	fullDescription: string;
	price: string;
	currency: string;
	sku: string;
	features: string[];
	specifications: { name: string; value: string }[];
	images: string[];
	status: string;
	featured: boolean;
	inStock: boolean;
	weight: string;
	dimensions: string;
	warranty: string;
	tags: string[];
}

export default function AddProductPage() {
	const [productData, setProductData] = useState<ProductData>({
		name: "",
		category: "",
		description: "",
		fullDescription: "",
		price: "",
		currency: "USD",
		sku: "",
		features: [],
		specifications: [],
		images: [],
		status: "draft",
		featured: false,
		inStock: true,
		weight: "",
		dimensions: "",
		warranty: "",
		tags: [],
	});

	const [newFeature, setNewFeature] = useState<string>("");
	const [newSpec, setNewSpec] = useState<{ name: string; value: string }>({
		name: "",
		value: "",
	});
	const [newTag, setNewTag] = useState<string>("");

	const categories = ["Software", "Service", "Consulting", "Training", "Support"];
	const currencies = ["USD", "EUR", "GBP", "CAD"];

	const addFeature = () => {
		if (newFeature.trim() && !productData.features.includes(newFeature.trim())) {
			setProductData({
				...productData,
				features: [...productData.features, newFeature.trim()],
			});
			setNewFeature("");
		}
	};

	const addSpecification = () => {
		if (newSpec.name.trim() && newSpec.value.trim()) {
			setProductData({
				...productData,
				specifications: [...productData.specifications, { ...newSpec }],
			});
			setNewSpec({ name: "", value: "" });
		}
	};

	const addTag = () => {
		if (newTag.trim() && !productData.tags.includes(newTag.trim())) {
			setProductData({
				...productData,
				tags: [...productData.tags, newTag.trim()],
			});
			setNewTag("");
		}
	};

	const removeFeature = (featureToRemove: string) => {
		setProductData({
			...productData,
			features: productData.features.filter((feature) => feature !== featureToRemove),
		});
	};

	const handleSave = (status = "draft") => {
		const dataToSave = { ...productData, status };
		console.log("Saving product:", dataToSave);
		// Save logic would go here
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Link href="/dashboard/products">
					<Button variant="ghost" size="sm">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Products
					</Button>
				</Link>
				<div>
					<h1 className="text-2xl font-bold">Add New Product</h1>
					<p className="text-muted-foreground">Create a new product or service offering</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Basic Information</CardTitle>
							<CardDescription>Core product details</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="name">Product Name</Label>
									<Input
										id="name"
										value={productData.name}
										onChange={(e) => setProductData({ ...productData, name: e.target.value })}
										placeholder="Enterprise Web Platform"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="sku">SKU</Label>
									<Input
										id="sku"
										value={productData.sku}
										onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
										placeholder="EWP-001"
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="category">Category</Label>
									<Select value={productData.category} onValueChange={(value) => setProductData({ ...productData, category: value })}>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											{categories.map((cat: string) => (
												<SelectItem key={cat} value={cat}>
													{cat}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="grid grid-cols-2 gap-2">
									<div className="space-y-2">
										<Label htmlFor="price">Price</Label>
										<Input
											id="price"
											type="number"
											value={productData.price}
											onChange={(e) =>
												setProductData({
													...productData,
													price: e.target.value,
												})
											}
											placeholder="2999"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="currency">Currency</Label>
										<Select value={productData.currency} onValueChange={(value) => setProductData({ ...productData, currency: value })}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{currencies.map((curr: string) => (
													<SelectItem key={curr} value={curr}>
														{curr}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">Short Description</Label>
								<Textarea
									id="description"
									value={productData.description}
									onChange={(e) =>
										setProductData({
											...productData,
											description: e.target.value,
										})
									}
									placeholder="Brief product description"
									rows={2}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="fullDescription">Full Description</Label>
								<Textarea
									id="fullDescription"
									value={productData.fullDescription}
									onChange={(e) =>
										setProductData({
											...productData,
											fullDescription: e.target.value,
										})
									}
									placeholder="Detailed product description"
									rows={4}
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Features</CardTitle>
							<CardDescription>Key product features and benefits</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex gap-2">
								<Input
									value={newFeature}
									onChange={(e) => setNewFeature(e.target.value)}
									placeholder="Add a feature"
									onKeyPress={(e) => e.key === "Enter" && addFeature()}
								/>
								<Button onClick={addFeature} size="sm">
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							<div className="flex flex-wrap gap-2">
								{productData.features.map((feature: string) => (
									<Badge key={feature} variant="secondary" className="flex items-center gap-1">
										{feature}
										<X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(feature)} />
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Specifications</CardTitle>
							<CardDescription>Technical specifications and details</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-3 gap-2">
								<Input
									value={newSpec.name}
									onChange={(e) => setNewSpec({ ...newSpec, name: e.target.value })}
									placeholder="Specification name"
								/>
								<Input value={newSpec.value} onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })} placeholder="Value" />
								<Button onClick={addSpecification} size="sm">
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							<div className="space-y-2">
								{productData.specifications.map((spec: { name: string; value: string }, index: number) => (
									<div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
										<span className="text-sm">
											<strong>{spec.name}:</strong> {spec.value}
										</span>
										<X
											className="h-4 w-4 cursor-pointer"
											onClick={() => {
												setProductData({
													...productData,
													specifications: productData.specifications.filter((_, i) => i !== index),
												});
											}}
										/>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Settings</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>In Stock</Label>
									<p className="text-sm text-muted-foreground">Product availability</p>
								</div>
								<Switch checked={productData.inStock} onCheckedChange={(checked) => setProductData({ ...productData, inStock: checked })} />
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Featured Product</Label>
									<p className="text-sm text-muted-foreground">Highlight on homepage</p>
								</div>
								<Switch
									checked={productData.featured}
									onCheckedChange={(checked) => setProductData({ ...productData, featured: checked })}
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Product Images</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<Button variant="outline" size="sm" className="w-full bg-transparent">
								<Upload className="h-4 w-4 mr-2" />
								Upload Images
							</Button>
							<p className="text-xs text-muted-foreground">Add product photos, screenshots, or mockups</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Preview</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="border rounded-lg p-4 space-y-3">
								<div className="w-full h-24 bg-muted rounded flex items-center justify-center">
									<Package className="h-8 w-8 text-muted-foreground" />
								</div>
								<div>
									<h3 className="font-semibold">{productData.name || "Product Name"}</h3>
									<p className="text-sm text-muted-foreground">{productData.description || "Product description"}</p>
									<div className="text-lg font-bold text-cyan-600 mt-2">
										{productData.currency} ${productData.price || "0"}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-3">
						<Button onClick={() => handleSave("active")} className="w-full">
							<Save className="h-4 w-4 mr-2" />
							Publish Product
						</Button>
						<Button onClick={() => handleSave("draft")} variant="outline" className="w-full">
							<Save className="h-4 w-4 mr-2" />
							Save Draft
						</Button>
						<Button variant="ghost" asChild className="w-full">
							<Link href="/dashboard/products">Cancel</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
