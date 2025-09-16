// API integration layer for REST endpoints
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ugarittech.com/api/v1";

export interface ApiResponse<T> {
	data: T;
	success: boolean;
	message?: string;
}

export interface HomePage {
	hero: {
		title: string;
		subtitle: string;
		ctas: Array<{ label: string; href: string }>;
		bg_media: { type: string; url: string };
	};
	highlights: Array<{
		service_slug: string;
		icon: string;
		title: string;
		excerpt: string;
	}>;
	features: Array<{
		title: string;
		bullets: string[];
		media: { url: string };
		variant: string;
	}>;
	kpis: Array<{ label: string; value: number }>;
	case_studies: string[];
	testimonials: string[];
	partners: string[];
	pricing_preview: string[];
	blog_preview_count: number;
	cta: {
		title: string;
		subtitle: string;
		button: { label: string; href: string };
	};
}

export interface Service {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	body_blocks: any[];
	features: string[];
	benefits: string[];
	process_steps: Array<{ title: string; description: string }>;
	hero_media: { url: string; alt: string };
	faqs: Array<{ question: string; answer: string }>;
	related_services: string[];
	contact_cta: { title: string; subtitle: string };
}

export interface CaseStudy {
	id: string;
	slug: string;
	client_name: string;
	sector: string;
	problem: string;
	solution: string;
	results_kpis: Array<{ label: string; value: string }>;
	body_blocks: any[];
	testimonial_ref: string;
	logo: { url: string; alt: string };
	gallery: Array<{ url: string; alt: string }>;
}

export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	body: string;
	cover_image: { url: string; alt: string };
	author_id: string;
	categories: string[];
	tags: string[];
	published_at: string;
}

// API functions
export async function fetchHomePage(): Promise<HomePage> {
	// Mock data for development - replace with actual API call
	return {
		hero: {
			title: "Build. Scale. Secure.",
			subtitle: "Professional IT solutions & cloud services for enterprise clients",
			ctas: [{ label: "Get Started", href: "/contact" }],
			bg_media: { type: "image", url: "/modern-tech-office.png" },
		},
		highlights: [
			{
				service_slug: "cloud",
				icon: "cloud",
				title: "Cloud Services",
				excerpt: "Migrate and optimize on Azure/AWS with expert guidance",
			},
			{
				service_slug: "devops",
				icon: "settings",
				title: "DevOps Solutions",
				excerpt: "Streamline development with CI/CD and automation",
			},
			{
				service_slug: "consulting",
				icon: "users",
				title: "IT Consulting",
				excerpt: "Strategic technology guidance for business growth",
			},
		],
		features: [
			{
				title: "Why Choose Ugarit Technologies",
				bullets: [
					"Microservices architecture experts",
					"Azure and AWS certified specialists",
					"24/7 support and monitoring",
					"Proven track record with enterprise clients",
				],
				media: { url: "/team-collaboration-tech.png" },
				variant: "image-right",
			},
		],
		kpis: [
			{ label: "Projects Completed", value: 120 },
			{ label: "Enterprise Clients", value: 45 },
			{ label: "Years Experience", value: 8 },
			{ label: "Team Members", value: 25 },
		],
		case_studies: ["retail-ml-cost-cut"],
		testimonials: ["sara-it-director"],
		partners: ["microsoft", "azure", "aws"],
		pricing_preview: ["consulting-standard"],
		blog_preview_count: 3,
		cta: {
			title: "Ready to modernize your IT infrastructure?",
			subtitle: "Book a discovery call with our experts",
			button: { label: "Get Started", href: "/contact" },
		},
	};
}

export async function fetchServices(): Promise<Service[]> {
	// Mock data - replace with actual API call
	return [];
}

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
	// Mock data - replace with actual API call
	return [];
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
	// Mock data - replace with actual API call
	return [];
}
