export interface SectionData {
	id: string;
	title: string;
	description: string;
	icon: string;
	href?: string;
	isActive: boolean;
	lastUpdated: string;
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
	},
	{
		id: "services",
		title: "Services Highlights",
		description: "Service cards and key features",
		icon: "fas fa-cogs",
		href: "/dashboard/home/manage-highlights",
		isActive: true,
		lastUpdated: "1 day ago",
	},
	{
		id: "features",
		title: "Features Section",
		description: "Product features and capabilities",
		icon: "fas fa-bullseye",
		href: "/dashboard/home/manage-features",
		isActive: true,
		lastUpdated: "3 days ago",
	},
	{
		id: "stats",
		title: "Statistics Section",
		description: "Key performance indicators display",
		icon: "fas fa-chart-bar",
		href: "/dashboard/home/manage-stats",
		isActive: true,
		lastUpdated: "1 week ago",
	},
	{
		id: "case-studies",
		title: "Case Studies",
		description: "Success stories and project showcases",
		icon: "fas fa-file-alt",
		href: "/dashboard/case-studies",
		isActive: true,
		lastUpdated: "2 days ago",
	},
	{
		id: "testimonials",
		title: "Testimonials",
		description: "Customer reviews and feedback",
		icon: "fas fa-comments",
		href: "/dashboard/testimonials",
		isActive: true,
		lastUpdated: "5 days ago",
	},
	{
		id: "partners",
		title: "Partners Section",
		description: "Partner logos and collaborations",
		icon: "fas fa-users",
		href: "/dashboard/partners",
		isActive: true,
		lastUpdated: "1 week ago",
	},
	{
		id: "pricing",
		title: "Pricing Section",
		description: "Service plans and pricing tiers",
		icon: "fas fa-dollar-sign",
		href: "/dashboard/home/manage-pricing",
		isActive: false,
		lastUpdated: "2 weeks ago",
	},
	{
		id: "blog",
		title: "Blog Preview",
		description: "Latest blog posts preview",
		icon: "fas fa-book-open",
		href: "/dashboard/blog",
		isActive: true,
		lastUpdated: "1 day ago",
	},
	{
		id: "cta",
		title: "Call to Action",
		description: "Final conversion section",
		icon: "fas fa-bullseye",
		href: "/dashboard/home/manage-cta",
		isActive: true,
		lastUpdated: "3 days ago",
	},
];
