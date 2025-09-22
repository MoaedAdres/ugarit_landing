export interface ServiceData {
	id: string;
	title: string;
	excerpt: string;
	category: string;
	status: string;
	order: number;
	icon: string;
	href?: string;
	lastUpdated: string;
	translations: Array<{
		id: number;
		service_id: number;
		locale: string;
		title: string;
		excerpt: string;
		body_blocks: string[];
		features: string[];
		benefits: string[];
		process_steps: string[];
		faqs: string[];
		created_at: string | null;
		updated_at: string | null;
	}>;
	media: Array<{
		id: number;
		model_type: string;
		model_id: number;
		uuid: string;
		collection_name: string;
		name: string;
		file_name: string;
		mime_type: string;
		disk: string;
		conversions_disk: string;
		size: number;
		manipulations: any[];
		custom_properties: any[];
		generated_conversions: any[];
		responsive_images: any[];
		order_column: number;
		created_at: string;
		updated_at: string;
		original_url: string;
		preview_url: string;
	}>;
}
