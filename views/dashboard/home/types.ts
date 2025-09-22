export interface SectionData {
	id: string;
	title: string;
	description: string;
	icon: string;
	href?: string;
	isActive: boolean;
	lastUpdated: string;
	order: number;
}

export const defaultSections: SectionData[] = [
	{
		id: "hero",
		title: "Hero Section",
		description: "Main banner and call-to-action",
		icon: "fas fa-home",
		href: "/dashboard/hero",
		isActive: true,
		lastUpdated: "2 hours ago",
		order: 1,
	},
	{
		id: "services",
		title: "Services Highlights",
		description: "Service cards and key features",
		icon: "fas fa-cogs",
		href: "/dashboard/home/manage-highlights",
		isActive: true,
		lastUpdated: "1 day ago",
		order: 2,
	},
	{
		id: "features",
		title: "Features Section",
		description: "Product features and capabilities",
		icon: "fas fa-bullseye",
		href: "/dashboard/home/manage-features",
		isActive: true,
		lastUpdated: "3 days ago",
		order: 3,
	},
	{
		id: "stats",
		title: "Statistics Section",
		description: "Key performance indicators display",
		icon: "fas fa-chart-bar",
		href: "/dashboard/home/manage-stats",
		isActive: true,
		lastUpdated: "1 week ago",
		order: 4,
	},
	{
		id: "case-studies",
		title: "Case Studies",
		description: "Success stories and project showcases",
		icon: "fas fa-file-alt",
		href: "/dashboard/case-studies",
		isActive: true,
		lastUpdated: "2 days ago",
		order: 5,
	},
	{
		id: "testimonials",
		title: "Testimonials",
		description: "Customer reviews and feedback",
		icon: "fas fa-comments",
		href: "/dashboard/testimonials",
		isActive: true,
		lastUpdated: "5 days ago",
		order: 6,
	},
	{
		id: "partners",
		title: "Partners Section",
		description: "Partner logos and collaborations",
		icon: "fas fa-users",
		href: "/dashboard/partners",
		isActive: true,
		lastUpdated: "1 week ago",
		order: 7,
	},
	{
		id: "pricing",
		title: "Pricing Section",
		description: "Service plans and pricing tiers",
		icon: "fas fa-dollar-sign",
		href: "/dashboard/home/manage-pricing",
		isActive: false,
		lastUpdated: "2 weeks ago",
		order: 8,
	},
	{
		id: "blog",
		title: "Blog Preview",
		description: "Latest blog posts preview",
		icon: "fas fa-book-open",
		href: "/dashboard/blog",
		isActive: true,
		lastUpdated: "1 day ago",
		order: 9,
	},
	{
		id: "cta",
		title: "Call to Action",
		description: "Final conversion section",
		icon: "fas fa-bullseye",
		href: "/dashboard/home/manage-cta",
		isActive: true,
		lastUpdated: "3 days ago",
		order: 10,
	},
];
