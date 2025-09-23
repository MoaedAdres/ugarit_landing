export interface CaseStudyMedia {
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

export interface CaseStudyImage {
    id: number;
    name: string;
    url: string;
}

export interface CaseStudyTranslation {
    id: number;
    case_study_id: number;
    locale: string;
    sector: string;
    problem: string;
    solution: string;
    body_blocks: string[];
    results_kpis: {
        student_engagement: string;
        course_completion_rate: string;
        support_tickets_reduction: string;
    };
    created_at: string;
    updated_at: string;
}

export interface TestimonialTranslation {
    id: number;
    testimonial_id: number;
    locale: string;
    quote: string;
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    order: number;
    status: string;
    created_at: string;
    updated_at: string;
    images: CaseStudyImage[];
    quote: string;
    media: CaseStudyMedia[];
    translations: TestimonialTranslation[];
}

export interface CaseStudy {
    id: number;
    client_name: string;
    testimonial_id: number;
    order: number;
    status: string;
    created_at: string;
    updated_at: string;
    images: CaseStudyImage[];
    logo: CaseStudyImage[];
    sector: string;
    problem: string;
    solution: string;
    body_blocks: string[];
    results_kpis: {
        student_engagement: string;
        course_completion_rate: string;
        support_tickets_reduction: string;
    };
    testimonial: Testimonial;
    media: CaseStudyMedia[];
    translations: CaseStudyTranslation[];
}

export interface CaseStudiesResponse {
    success: boolean;
    message: string;
    data: CaseStudy[];
}

export interface SingleCaseStudyResponse {
    success: boolean;
    message: string;
    data: CaseStudy;
}

export interface CaseStudyFormData {
    client_name: string;
    testimonial_id: number;
    status: string;
    order: number;
    en: {
        sector: string;
        problem: string;
        solution: string;
        body_blocks: string[];
        results_kpis: {
            student_engagement: string;
            course_completion_rate: string;
            support_tickets_reduction: string;
        };
    };
    ar: {
        sector: string;
        problem: string;
        solution: string;
        body_blocks: string[];
        results_kpis: {
            student_engagement: string;
            course_completion_rate: string;
            support_tickets_reduction: string;
        };
    };
    fr: {
        sector: string;
        problem: string;
        solution: string;
        body_blocks: string[];
        results_kpis: {
            student_engagement: string;
            course_completion_rate: string;
            support_tickets_reduction: string;
        };
    };
    logo?: File;
    gallery?: File[];
}
