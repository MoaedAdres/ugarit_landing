export interface SectionTranslation {
    id: number;
    section_id: number;
    locale: string;
    title: string;
    description: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface Section {
    id: number;
    is_hidden: number;
    order: number;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    translations: SectionTranslation[];
}

export interface SectionResponse {
    success: boolean;
    message: string;
    data: Section[];
}

export interface SingleSectionResponse {
    success: boolean;
    message: string;
    data: Section;
}

export interface SectionFormData {
    en: {
        title: string;
        description: string;
    };
    ar: {
        title: string;
        description: string;
    };
    fr: {
        title: string;
        description: string;
    };
    is_hidden: boolean;
    order: number;
}
