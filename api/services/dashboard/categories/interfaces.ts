export interface CategoryTranslation {
    id: number;
    category_id: number;
    locale: string;
    name: string;
    summary: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface CategoryMedia {
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
}

export interface Category {
    id: number;
    slug: string;
    name: string;
    summary: string;
    created_at: string;
    updated_at: string;
    translations: CategoryTranslation[];
    media: CategoryMedia[];
}

export interface CategoriesResponse {
    success: boolean;
    message: string;
    data: Category[];
}

export interface SingleCategoryResponse {
    success: boolean;
    message: string;
    data: Category;
}

export interface CategoryFormData {
    slug: string;
    en: {
        name: string;
        summary: string;
    };
    ar: {
        name: string;
        summary: string;
    };
    fr: {
        name: string;
        summary: string;
    };
    icon?: File;
}
