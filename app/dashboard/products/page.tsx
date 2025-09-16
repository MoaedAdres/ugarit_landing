import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, DollarSign, Package } from "lucide-react";
import Link from "next/link";

// Mock products data
const products = [
	{
		id: 1,
		name: "Enterprise Web Platform",
		category: "Software",
		description: "Complete web development platform with advanced features",
		price: 2999,
		currency: "USD",
		status: "active",
		featured: true,
		inStock: true,
		sku: "EWP-001",
		features: ["Custom Development", "24/7 Support", "Cloud Hosting", "Analytics"],
		images: ["/product1.jpg"],
		createdAt: "2024-01-15",
		updatedAt: "2024-01-20",
	},
	{
		id: 2,
		name: "Mobile App Development Kit",
		category: "Software",
		description: "Cross-platform mobile app development solution",
		price: 1999,
		currency: "USD",
		status: "active",
		featured: false,
		inStock: true,
		sku: "MAD-002",
		features: ["iOS & Android", "React Native", "Backend Integration", "App Store Deployment"],
		images: ["/product2.jpg"],
		createdAt: "2024-01-10",
		updatedAt: "2024-01-18",
	},
	{
		id: 3,
		name: "Digital Marketing Suite",
		category: "Service",
		description: "Comprehensive digital marketing and SEO package",
		price: 999,
		currency: "USD",
		status: "draft",
		featured: false,
		inStock: true,
		sku: "DMS-003",
		features: ["SEO Optimization", "Social Media", "Content Marketing", "Analytics"],
		images: ["/product3.jpg"],
		createdAt: "2024-01-05",
		updatedAt: "2024-01-12",
	},
];

const categories = ["Software", "Service", "Consulting", "Training", "Support"];

export default function ProductsPage() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-lg font-medium">Products Management</h3>
					<p className="text-sm text-muted-foreground">
						{products.length} products • {products.filter((p) => p.status === "active").length} active •{" "}
						{products.filter((p) => p.featured).length} featured
					</p>
				</div>
				<Button asChild>
					<Link href="/dashboard/products/add">
						<Plus className="h-4 w-4 mr-2" />
						Add Product
					</Link>
				</Button>
			</div>

			{/* Filter Bar */}
			<Card>
				<CardContent className="p-4">
					<div className="flex flex-wrap gap-2">
						<Badge variant="outline" className="cursor-pointer">
							All Products
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							Active
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							Drafts
						</Badge>
						<Badge variant="outline" className="cursor-pointer">
							Featured
						</Badge>
						{categories.map((category: string) => (
							<Badge key={category} variant="outline" className="cursor-pointer">
								{category}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Products Grid */}
			<div className="grid gap-6">
				{products.map((product) => (
					<Card key={product.id}>
						<CardContent className="p-6">
							<div className="flex items-start justify-between">
								<div className="flex gap-4 flex-1">
									<div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
										<Package className="h-8 w-8 text-muted-foreground" />
									</div>

									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<h4 className="font-semibold text-lg">{product.name}</h4>
											<Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
											{product.featured && <Badge className="bg-yellow-500">Featured</Badge>}
											<Badge variant="outline">{product.category}</Badge>
										</div>

										<p className="text-muted-foreground mb-3">{product.description}</p>

										<div className="flex flex-wrap gap-2 mb-3">
											{product.features.slice(0, 3).map((feature) => (
												<Badge key={feature} variant="outline" className="text-xs">
													{feature}
												</Badge>
											))}
											{product.features.length > 3 && (
												<Badge variant="outline" className="text-xs">
													+{product.features.length - 3} more
												</Badge>
											)}
										</div>

										<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
											<div className="flex items-center gap-1">
												<DollarSign className="h-4 w-4" />
												<span className="font-medium">${product.price.toLocaleString()}</span>
											</div>
											<div>
												<span className="font-medium">SKU:</span>
												<span className="text-muted-foreground ml-1">{product.sku}</span>
											</div>
											<div>
												<span className="font-medium">Stock:</span>
												<span className={`ml-1 ${product.inStock ? "text-green-600" : "text-red-600"}`}>
													{product.inStock ? "In Stock" : "Out of Stock"}
												</span>
											</div>
											<div>
												<span className="font-medium">Updated:</span>
												<span className="text-muted-foreground ml-1">{new Date(product.updatedAt).toLocaleDateString()}</span>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-center gap-2 ml-4">
									<Button variant="ghost" size="sm" asChild>
										<Link href={`/dashboard/products/${product.id}/preview`}>
											<Eye className="h-4 w-4" />
										</Link>
									</Button>
									<Button variant="ghost" size="sm" asChild>
										<Link href={`/dashboard/products/${product.id}/edit`}>
											<Edit className="h-4 w-4" />
										</Link>
									</Button>
									<Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">12</div>
						<p className="text-sm text-muted-foreground">Total Products</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">9</div>
						<p className="text-sm text-muted-foreground">Active</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">3</div>
						<p className="text-sm text-muted-foreground">Featured</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="text-2xl font-bold">$24.5K</div>
						<p className="text-sm text-muted-foreground">Total Value</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
