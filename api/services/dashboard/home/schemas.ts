import z from "zod";

const translationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
});

export const addSectionSchema = z.object({
    en: translationSchema,
    ar: translationSchema,
    fr: translationSchema,
    is_hidden: z.boolean().default(false),
    order: z.number().int().min(0, "Order must be at least 0"),
});

export const updateSectionSchema = z.object({
    en: translationSchema,
    ar: translationSchema,
    fr: translationSchema,
    is_hidden: z.boolean(),
    order: z.number().int().min(0, "Order must be at least 0"),
});