"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, GripVertical, Star, Users, Zap, Shield } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const iconOptions = [
	{ name: "Star", icon: Star, value: "star" },
	{ name: "Users", icon: Users, value: "users" },
	{ name: "Zap", icon: Zap, value: "zap" },
	{ name: "Shield", icon: Shield, value: "shield" },
];

export default function ManageHighlightsPage() {
	const [highlights, setHighlights] = useState([
		{
			id: 1,
			title: "Expert Team",
			description: "Our experienced professionals deliver exceptional results",
			icon: "users",
			isActive: true,
			order: 1,
		},
		{
			id: 2,
			title: "Fast Delivery",
			description: "Quick turnaround times without compromising quality",
			icon: "zap",
			isActive: true,
			order: 2,
		},
		{
			id: 3,
			title: "Secure Solutions",
			description: "Enterprise-grade security for all our services",
			icon: "shield",
			isActive: true,
			order: 3,
		},
	]);

	const [editingHighlight, setEditingHighlight] = useState<any>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleAddHighlight = () => {
		setEditingHighlight({
			id: Date.now(),
			title: "",
			description: "",
			icon: "star",
			isActive: true,
			order: highlights.length + 1,
		});
		setIsDialogOpen(true);
	};

	const handleEditHighlight = (highlight: any) => {
		setEditingHighlight({ ...highlight });
		setIsDialogOpen(true);
	};

	const handleSaveHighlight = () => {
		if (editingHighlight?.id && highlights.find((h) => h.id === editingHighlight.id)) {
			setHighlights(highlights.map((h) => (h.id === editingHighlight.id ? (editingHighlight as any) : h)));
		} else {
			setHighlights([...highlights, editingHighlight as any]);
		}
		setIsDialogOpen(false);
		setEditingHighlight(null);
	};

	const handleDeleteHighlight = (id: number) => {
		setHighlights(highlights.filter((h) => h.id !== id));
	};

	const getIcon = (iconName: string) => {
		const iconOption = iconOptions.find((opt) => opt.value === iconName);
		return iconOption ? iconOption.icon : Star;
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/home">
						<Button variant="ghost" size="sm">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Home
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold">Manage Highlights</h1>
						<p className="text-muted-foreground">Configure your homepage highlight cards</p>
					</div>
				</div>
				<Button onClick={handleAddHighlight}>
					<Plus className="h-4 w-4 mr-2" />
					Add Highlight
				</Button>
			</div>

			<div className="grid gap-4">
				{highlights.map((highlight) => {
					const IconComponent = getIcon(highlight.icon);
					return (
						<Card key={highlight.id}>
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="flex items-center gap-2">
										<GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
										<div className="p-2 rounded-lg bg-cyan-100 text-cyan-600">
											<IconComponent className="h-5 w-5" />
										</div>
									</div>

									<div className="flex-1">
										<div className="flex items-start justify-between">
											<div>
												<h3 className="font-semibold text-lg">{highlight.title}</h3>
												<p className="text-muted-foreground mt-1">{highlight.description}</p>
												<div className="flex items-center gap-2 mt-2">
													<Badge variant={highlight.isActive ? "default" : "secondary"}>{highlight.isActive ? "Active" : "Inactive"}</Badge>
													<span className="text-sm text-muted-foreground">Order: {highlight.order}</span>
												</div>
											</div>

											<div className="flex items-center gap-2">
												<Button variant="ghost" size="sm" onClick={() => handleEditHighlight(highlight)}>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleDeleteHighlight(highlight.id)}
													className="text-red-600 hover:text-red-700"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Add/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle>
							{editingHighlight?.id && highlights.find((h) => h.id === editingHighlight.id) ? "Edit" : "Add"} Highlight
						</DialogTitle>
						<DialogDescription>Configure your highlight card content and appearance</DialogDescription>
					</DialogHeader>

					{editingHighlight && (
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="title">Title</Label>
								<Input
									id="title"
									value={editingHighlight.title}
									onChange={(e) =>
										setEditingHighlight({
											...editingHighlight,
											title: e.target.value,
										})
									}
									placeholder="Enter highlight title"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									value={editingHighlight.description}
									onChange={(e) =>
										setEditingHighlight({
											...editingHighlight,
											description: e.target.value,
										})
									}
									placeholder="Enter highlight description"
									rows={3}
								/>
							</div>

							<div className="space-y-2">
								<Label>Icon</Label>
								<div className="grid grid-cols-4 gap-2">
									{iconOptions.map((option) => {
										const IconComponent = option.icon;
										return (
											<Button
												key={option.value}
												variant={editingHighlight.icon === option.value ? "default" : "outline"}
												className="h-12 flex flex-col gap-1"
												onClick={() =>
													setEditingHighlight({
														...editingHighlight,
														icon: option.value,
													})
												}
											>
												<IconComponent className="h-4 w-4" />
												<span className="text-xs">{option.name}</span>
											</Button>
										);
									})}
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="order">Display Order</Label>
									<Input
										id="order"
										type="number"
										value={editingHighlight.order}
										onChange={(e) =>
											setEditingHighlight({
												...editingHighlight,
												order: Number.parseInt(e.target.value),
											})
										}
										min="1"
									/>
								</div>
								<div className="space-y-2">
									<Label>Status</Label>
									<div className="flex items-center gap-2 pt-2">
										<input
											type="checkbox"
											id="isActive"
											checked={editingHighlight.isActive}
											onChange={(e) =>
												setEditingHighlight({
													...editingHighlight,
													isActive: e.target.checked,
												})
											}
											className="rounded"
										/>
										<Label htmlFor="isActive">Active</Label>
									</div>
								</div>
							</div>
						</div>
					)}

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSaveHighlight}>Save Highlight</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
