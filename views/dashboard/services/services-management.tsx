"use client";
import RCard from "@/RComponents/RCard";
import RButton from "@/RComponents/RButton";
import RFlex from "@/RComponents/RFlex";
import RParagraphTruncated from "@/RComponents/RParagraphTruncated";
import RTooltip from "@/RComponents/RTooltip";
import { Badge } from "@/components/ui/badge";
import { myIcons } from "@/constants/icons";
import Link from "next/link";
import { useState } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	DragStartEvent,
	DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ServiceData {
	id: number;
	title: string;
	category: string;
	description: string;
	price: string;
	duration: string;
	isActive: boolean;
	updatedAt: string;
	icon: string;
	features: string[];
}

// Mock data for services with enhanced structure
const initialServices: ServiceData[] = [
	{
		id: 1,
		title: "Cloud Solutions",
		category: "Infrastructure",
		description:
			"Migrate and optimize your infrastructure with AWS, Azure, and Google Cloud platforms for maximum scalability and cost-efficiency.",
		price: "$3,000 - $20,000",
		duration: "6-16 weeks",
		isActive: true,
		updatedAt: "1 day ago",
		icon: "fa-solid fa-cloud",
		features: ["Cloud Migration", "Infrastructure Optimization", "Multi-cloud Strategy"],
	},
	{
		id: 2,
		title: "DevOps & CI/CD",
		category: "Development",
		description: "Streamline your development pipeline with automated testing, deployment, and monitoring solutions for faster delivery.",
		price: "$2,500 - $15,000",
		duration: "4-12 weeks",
		isActive: true,
		updatedAt: "3 days ago",
		icon: "fa-solid fa-gear",
		features: ["Automated Deployment", "Container Orchestration", "Monitoring & Logging"],
	},
	{
		id: 3,
		title: "Cybersecurity",
		category: "Security",
		description: "Protect your digital assets with comprehensive security solutions, compliance frameworks, and threat monitoring.",
		price: "$4,000 - $25,000",
		duration: "8-20 weeks",
		isActive: true,
		updatedAt: "2 days ago",
		icon: "fa-solid fa-shield-halved",
		features: ["Security Audits", "Compliance Management", "Threat Detection"],
	},
	{
		id: 4,
		title: "Custom Development",
		category: "Development",
		description: "Build scalable applications with modern technologies including microservices, APIs, and cloud-native architectures.",
		price: "$5,000 - $30,000",
		duration: "8-24 weeks",
		isActive: true,
		updatedAt: "1 week ago",
		icon: "fa-solid fa-code",
		features: ["Full-stack Development", "API Integration", "Legacy Modernization"],
	},
	{
		id: 5,
		title: "Data Analytics",
		category: "Analytics",
		description:
			"Transform your data into actionable insights with advanced analytics, machine learning, and business intelligence solutions.",
		price: "$3,500 - $18,000",
		duration: "6-16 weeks",
		isActive: false,
		updatedAt: "2 weeks ago",
		icon: "fa-solid fa-database",
		features: ["Data Warehousing", "ML/AI Solutions", "Business Intelligence"],
	},
	{
		id: 6,
		title: "Digital Transformation",
		category: "Consulting",
		description: "Modernize your business processes with digital solutions that improve efficiency and customer experience.",
		price: "$2,000 - $12,000",
		duration: "4-16 weeks",
		isActive: true,
		updatedAt: "5 days ago",
		icon: "fa-solid fa-mobile-screen",
		features: ["Process Automation", "Digital Strategy", "Change Management"],
	},
];

interface SortableServiceCardProps {
	service: ServiceData;
	onToggle: (id: number) => void;
}

function SortableServiceCard({ service, onToggle }: SortableServiceCardProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: service.id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	if (isDragging) {
		return (
			<RCard
				ref={setNodeRef}
				style={style}
				cardClassName="opacity-30 border-dashed border-2"
				contentComponent={<div className="h-48" />}
			/>
		);
	}

	return (
		<RCard
			ref={setNodeRef}
			style={style}
			cardClassName="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20 hover:-translate-y-1"
			contentComponent={
				<div className="p-4">
					<RFlex className="items-start justify-between mb-3">
						<RFlex className="items-center gap-2">
							<div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded touch-none">
								<i className={`${myIcons.gripHorizontal} h-3 w-3 text-muted-foreground`} />
							</div>
							<div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
								<i className={`${service.icon} h-5 w-5 text-primary`} />
							</div>
						</RFlex>
						<RFlex className="items-center gap-1">
							<Badge variant={service.isActive ? "default" : "secondary"} className="text-xs px-2 py-0.5">
								{service.isActive ? "Active" : "Inactive"}
							</Badge>
							<RButton
								variant="ghost"
								size="sm"
								onClick={() => onToggle(service.id)}
								className="h-6 w-6 p-0"
								icon={<i className={`${myIcons.eye} h-3 w-3`} />}
							/>
						</RFlex>
					</RFlex>

					<div className="space-y-3">
						<div>
							<h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{service.title}</h4>
							<Badge variant="outline" className="text-xs px-2 py-0.5">
								{service.category}
							</Badge>
						</div>

						<RParagraphTruncated 
							paragraph={service.description}
							numOfChars={100}
							typographyStyles="text-muted-foreground text-sm leading-relaxed"
						/>

						<RFlex className="items-center justify-between text-xs text-muted-foreground">
							<span>{service.price}</span>
							<span>•</span>
							<span>{service.duration}</span>
						</RFlex>

						<RFlex className="items-center justify-between pt-2 border-t">
							<p className="text-xs text-muted-foreground">Updated {service.updatedAt}</p>
							<RFlex className="items-center gap-1">
								<RTooltip
									triggerComponent={
										<RButton
											variant="ghost"
											size="sm"
											className="h-6 w-6 p-0"
											icon={<i className={`${myIcons.eye} h-3 w-3`} />}
											onClick={() => window.location.href = `/dashboard/services/${service.id}?isEdit=false`}
										/>
									}
									tooltipText="View Service"
								/>
								<RTooltip
									triggerComponent={
										<RButton
											variant="ghost"
											size="sm"
											className="h-6 w-6 p-0"
											icon={<i className={`${myIcons.edit} h-3 w-3`} />}
											onClick={() => window.location.href = `/dashboard/services/${service.id}?isEdit=true`}
										/>
									}
									tooltipText="Edit Service"
								/>
								<RTooltip
									triggerComponent={
										<RButton
											variant="ghost"
											size="sm"
											className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
											icon={<i className={`${myIcons.delete} h-3 w-3`} />}
										/>
									}
									tooltipText="Delete Service"
								/>
							</RFlex>
						</RFlex>
					</div>
				</div>
			}
		/>
	);
}

// Drag overlay component
function DragOverlayCard({ service }: { service: ServiceData }) {
	return (
		<RCard
			cardClassName="shadow-lg rotate-3 scale-105 border-0 bg-gradient-to-br from-background to-muted/20"
			contentComponent={
				<div className="p-4">
					<RFlex className="items-center gap-2 mb-3">
						<div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg">
							<i className={`${service.icon} h-5 w-5 text-primary`} />
						</div>
						<div>
							<h4 className="font-semibold text-lg">{service.title}</h4>
							<Badge variant="outline" className="text-xs px-2 py-0.5">
								{service.category}
							</Badge>
						</div>
					</RFlex>
					<RParagraphTruncated 
						paragraph={service.description}
						numOfChars={80}
						typographyStyles="text-muted-foreground text-sm"
					/>
				</div>
			}
		/>
	);
}

export default function ServicesManagement() {
	const [services, setServices] = useState<ServiceData[]>(initialServices);
	const [activeId, setActiveId] = useState<number | null>(null);

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
		setActiveId(event.active.id as number);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveId(null);

		if (over && active.id !== over.id) {
			setServices((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	const handleToggleService = (id: number) => {
		setServices((items) => items.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item)));
	};

	const handleSaveOrder = () => {
		console.log(
			"New service order:",
			services.map((s) => ({ id: s.id, title: s.title }))
		);
	};

	// Calculate category counts
	const categoryCounts = services.reduce((acc, service) => {
		acc[service.category] = (acc[service.category] || 0) + 1;
		return acc;
	}, {} as Record<string, number>);

	return (
		<div className="space-y-6">
			<RFlex className="items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Service Management</h1>
					<p className="text-muted-foreground">
						{services.length} services • {services.filter((s) => s.isActive).length} active
					</p>
				</div>
				<RFlex className="gap-2">
					<RButton
						variant="outline"
						onClick={handleSaveOrder}
						text="Save Order"
					/>
					<RButton
						onClick={() => window.location.href = "/dashboard/services/add"}
						icon={<i className={`${myIcons.plus} h-4 w-4`} />}
						text="Add Service"
					/>
				</RFlex>
			</RFlex>

			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
				<SortableContext items={services.map((s) => s.id)} strategy={rectSortingStrategy}>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{services.map((service) => (
							<SortableServiceCard key={service.id} service={service} onToggle={handleToggleService} />
						))}
					</div>
				</SortableContext>
				<DragOverlay>{activeId ? <DragOverlayCard service={services.find((s) => s.id === activeId)!} /> : null}</DragOverlay>
			</DndContext>

			<RCard
				title="Service Categories"
				contentComponent={
					<RFlex className="flex-wrap gap-2">
						{Object.entries(categoryCounts).map(([category, count]) => (
							<Badge key={category} variant="outline">
								{category} ({count})
							</Badge>
						))}
					</RFlex>
				}
			/>
		</div>
	);
}
