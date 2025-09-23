export interface IService {
	id: number;
	title: string;
	description: string;
	icon: string;
	features: string[];
}
interface IFeature {
	title: string;
	points: string[];
}
interface ICaseStudyImage {
	id: number;
	name: string;
	mode?: "light" | "dark";
	url: string;
}
interface IKPI {
	student_engagement: string;
	course_completion_rate: string;
	support_tickets_reduction: string;
}
interface ICaseStudy {
	id: number;
	client_name: string;
	logo: string;
	images: ICaseStudyImage[];
	order: number;
	problem: string;
	solution: string;
	results_kpis: IKPI;
}
interface IPost {
	id: number;
	order: number;
	title: string;
	cover: string;
	excerpt: string;
	published_at: string;
	categories: string[];
}
interface IPartner {
	id: number;
	name: string;
	images: null;
	order: number;
	url: string;
}
interface ISection {
	id: number;
	images: ICaseStudyImage[];
	route: string;
	order: number;
	title: string;
	description: string;
	content: string;
}
interface ITestimonial {
	id: number;
	name: string;
	role: string;
	company: string;
	avatar: string;
	order: number;
	quote: string;
}

export interface IBlogs {
	sections: ISection[];
	services: IService[];
	features: IFeature[];
	case_studies: ICaseStudy[];
	testimonials: ITestimonial[];
	posts: IPost[];
	partners: IPartner[];
}
