export interface CaseStudyData {
    id: string;
    client_name: string;
    sector: string;
    problem: string;
    solution: string;
    status: string;
    order: number;
    logo?: string;
    images?: string[];
    results_kpis: Record<string, string>;
    testimonial?: {
        name: string;
        role: string;
        company: string;
        quote: string;
    };
    translations: Array<{
        id: number;
        locale: string;
        sector: string;
        problem: string;
        solution: string;
        body_blocks: string[];
        results_kpis: Record<string, string>;
    }>;
    lastUpdated?: string;
    href?: string;
}
