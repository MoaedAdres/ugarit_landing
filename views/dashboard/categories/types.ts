export interface CategoryData {
	id: string;
	name: string;
	summary: string;
	slug: string;
	icon: string;
	href?: string;
	lastUpdated: string;
	translations: Array<{
		id: number;
		category_id: number;
		locale: string;
		name: string;
		summary: string;
		created_at: string | null;
		updated_at: string | null;
	}>;
	media?: Array<{
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
