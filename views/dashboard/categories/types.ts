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
}
