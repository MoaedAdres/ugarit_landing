export interface CategoryTranslation {
    id: number;
    category_id: number;
    locale: string;
    name: string;
    summary: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface Category {
    id: number;
    slug: string;
    name: string;
    summary: string;
    created_at: string;
    updated_at: string;
    translations: CategoryTranslation[];
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
