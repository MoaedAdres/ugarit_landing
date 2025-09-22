import z from "zod";

const translationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().min(1, "Excerpt is required"),
    body_blocks: z.array(z.string()).min(1, "At least one body block is required"),
    features: z.array(z.string()).min(1, "At least one feature is required"),
    benefits: z.array(z.string()).min(1, "At least one benefit is required"),
    process_steps: z.array(z.string()).min(1, "At least one process step is required"),
    faqs: z.array(z.string()).min(1, "At least one FAQ is required"),
});

export const addServiceSchema = z.object({
    category_id: z.number().min(1, "Category is required"),
    status: z.string().min(1, "Status is required"),
    order: z.number().min(0, "Order must be a positive number"),
    en: translationSchema,
    ar: translationSchema,
    fr: translationSchema,
    icon: z.instanceof(File).optional(),
});

export const updateServiceSchema = z.object({
    category_id: z.number().min(1, "Category is required"),
    status: z.string().min(1, "Status is required"),
    order: z.number().min(0, "Order must be a positive number"),
    en: translationSchema,
    ar: translationSchema,
    fr: translationSchema,
    icon: z.instanceof(File).optional(),
});
