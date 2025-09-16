"use client";
import { useState } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
	Home,
	Settings,
	BarChart3,
	FileText,
	MessageSquare,
	Users,
	DollarSign,
	BookOpen,
	Target,
	Eye,
	EyeOff,
	GripVertical,
} from "lucide-react";

interface SectionData {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	href?: string;
	isActive: boolean;
	lastUpdated: string;
}

interface SectionCardProps extends SectionData {
	onToggle: (sectionId: string) => void;
}

function SortableSectionCard({ id, title, description, icon: Icon, href, isActive, lastUpdated, onToggle }: SectionCardProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	// Don't render the card content when dragging to improve performance
	if (isDragging) {
		return (
			<Card ref={setNodeRef} style={style} className="opacity-30 border-dashed border-2">
				<div className="h-48" />
			</Card>
		);
	}

	return (
		<Card ref={setNodeRef} style={style} className="relative flex flex-col justify-between">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded touch-none">
							<GripVertical className="h-4 w-4 text-muted-foreground" />
						</div>
						<Icon className="h-5 w-5 text-muted-foreground" />
						<div>
							<CardTitle className="text-lg">{title}</CardTitle>
							<CardDescription className="text-sm">{description}</CardDescription>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Inactive"}</Badge>
						<Button variant="ghost" size="sm" onClick={() => onToggle(id)} className="h-8 w-8 p-0">
							{isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{href ? (
						<Button asChild className="w-full">
							<Link href={href}>Manage Section</Link>
						</Button>
					) : (
						<Button className="w-full" disabled>
							Coming Soon
						</Button>
					)}
					{lastUpdated && <p className="text-xs text-muted-foreground text-center">Last updated: {lastUpdated}</p>}
				</div>
			</CardContent>
		</Card>
	);
}

// Static card component for drag overlay
function DragOverlayCard({ section }: { section: SectionData }) {
	const Icon = section.icon;

	return (
		<Card className="relative flex flex-col justify-between shadow-lg rotate-3 scale-105">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<GripVertical className="h-4 w-4 text-muted-foreground" />
						<Icon className="h-5 w-5 text-muted-foreground" />
						<div>
							<CardTitle className="text-lg">{section.title}</CardTitle>
							<CardDescription className="text-sm">{section.description}</CardDescription>
						</div>
					</div>
					<Badge variant={section.isActive ? "default" : "secondary"}>{section.isActive ? "Active" : "Inactive"}</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					<Button className="w-full">Manage Section</Button>
					<p className="text-xs text-muted-foreground text-center">Last updated: {section.lastUpdated}</p>
				</div>
			</CardContent>
		</Card>
	);
}

export default function HomePage() {
	const [sections, setSections] = useState<SectionData[]>([
		{
			id: "hero",
			title: "Hero Section",
			description: "Main banner and call-to-action",
			icon: Home,
			href: "/dashboard/home/edit-hero",
			isActive: true,
			lastUpdated: "2 hours ago",
		},
		{
			id: "services",
			title: "Services Highlights",
			description: "Service cards and key features",
			icon: Settings,
			href: "/dashboard/home/manage-highlights",
			isActive: true,
			lastUpdated: "1 day ago",
		},
		{
			id: "features",
			title: "Features Section",
			description: "Product features and capabilities",
			icon: Target,
			href: "/dashboard/home/manage-features",
			isActive: true,
			lastUpdated: "3 days ago",
		},
		{
			id: "stats",
			title: "Statistics Section",
			description: "Key performance indicators display",
			icon: BarChart3,
			href: "/dashboard/home/manage-stats",
			isActive: true,
			lastUpdated: "1 week ago",
		},
		{
			id: "case-studies",
			title: "Case Studies",
			description: "Success stories and project showcases",
			icon: FileText,
			href: "/dashboard/case-studies",
			isActive: true,
			lastUpdated: "2 days ago",
		},
		{
			id: "testimonials",
			title: "Testimonials",
			description: "Customer reviews and feedback",
			icon: MessageSquare,
			href: "/dashboard/testimonials",
			isActive: true,
			lastUpdated: "5 days ago",
		},
		{
			id: "partners",
			title: "Partners Section",
			description: "Partner logos and collaborations",
			icon: Users,
			href: "/dashboard/partners",
			isActive: true,
			lastUpdated: "1 week ago",
		},
		{
			id: "pricing",
			title: "Pricing Section",
			description: "Service plans and pricing tiers",
			icon: DollarSign,
			href: "/dashboard/home/manage-pricing",
			isActive: false,
			lastUpdated: "2 weeks ago",
		},
		{
			id: "blog",
			title: "Blog Preview",
			description: "Latest blog posts preview",
			icon: BookOpen,
			href: "/dashboard/blog",
			isActive: true,
			lastUpdated: "1 day ago",
		},
		{
			id: "cta",
			title: "Call to Action",
			description: "Final conversion section",
			icon: Target,
			href: "/dashboard/home/manage-cta",
			isActive: true,
			lastUpdated: "3 days ago",
		},
	]);

	const [activeId, setActiveId] = useState<string | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveId(null);

		if (over && active.id !== over.id) {
			setSections((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	const handleToggleSection = (sectionId: string) => {
		setSections((items) => items.map((item) => (item.id === sectionId ? { ...item, isActive: !item.isActive } : item)));
		// In real implementation, this would update the section status via API
		console.log(`Toggling section: ${sectionId}`);
	};

	const handleSaveOrder = () => {
		// In real implementation, this would save the new order to your API
		console.log(
			"New section order:",
			sections.map((s) => ({ id: s.id, title: s.title }))
		);
		// You could show a toast notification here
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Home Page Management</h1>
					<p className="text-muted-foreground">Manage all sections of your landing page. Drag sections to reorder them.</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" onClick={handleSaveOrder}>
						Save Order
					</Button>
					<Button>Preview Landing Page</Button>
				</div>
			</div>

			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
				<SortableContext items={sections.map((s) => s.id)} strategy={rectSortingStrategy}>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{sections.map((section) => (
							<SortableSectionCard key={section.id} {...section} onToggle={handleToggleSection} />
						))}
					</div>
				</SortableContext>
				<DragOverlay>{activeId ? <DragOverlayCard section={sections.find((s) => s.id === activeId)!} /> : null}</DragOverlay>
			</DndContext>

			<Card>
				<CardHeader>
					<CardTitle>Section Management</CardTitle>
					<CardDescription>Current section order (top to bottom, left to right as they appear on your landing page)</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						{sections.map((section, index) => (
							<div key={section.id} className="flex items-center justify-between p-2 bg-muted rounded">
								<div className="flex items-center gap-2">
									<span className="text-sm font-mono bg-background px-2 py-1 rounded">{index + 1}</span>
									<span className="text-sm">{section.title}</span>
								</div>
								<Badge variant={section.isActive ? "default" : "secondary"} className="text-xs">
									{section.isActive ? "Active" : "Inactive"}
								</Badge>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
