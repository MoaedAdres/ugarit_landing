export interface ServiceTranslation {
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
}

export interface ServiceMedia {
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

export interface ServiceCategory {
    id: number;
    slug: string;
    name: string;
    summary: string;
    created_at: string;
    updated_at: string;
    images: Array<{
        id: number;
        name: string;
        url: string;
    }>;
    media: ServiceMedia[];
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

export interface Service {
    id: number;
    category_id: number;
    order: number;
    status: string;
    created_at: string;
    updated_at: string;
    images: any[];
    title: string;
    excerpt: string;
    body_blocks: string[];
    features: string[];
    benefits: string[];
    process_steps: string[];
    faqs: string[];
    category: ServiceCategory;
    media: ServiceMedia[];
    translations: ServiceTranslation[];
    products?: any[];
    related_services?: any[];
}

export interface ServicesResponse {
    success: boolean;
    message: string;
    data: Service[];
}

export interface SingleServiceResponse {
    success: boolean;
    message: string;
    data: Service;
}

export interface ServiceFormData {
    category_id: number;
    status: string;
    order: number;
    en: {
        title: string;
        excerpt: string;
        body_blocks: string[];
        features: string[];
        benefits: string[];
        process_steps: string[];
        faqs: string[];
    };
    ar: {
        title: string;
        excerpt: string;
        body_blocks: string[];
        features: string[];
        benefits: string[];
        process_steps: string[];
        faqs: string[];
    };
    fr: {
        title: string;
        excerpt: string;
        body_blocks: string[];
        features: string[];
        benefits: string[];
        process_steps: string[];
        faqs: string[];
    };
    icon?: File;
}
