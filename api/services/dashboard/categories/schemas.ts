import z from "zod";

const translationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    summary: z.string().min(1, "Summary is required"),
});

export const addCategorySchema = z.object({
    slug: z.string().min(1, "Slug is required"),
    en: translationSchema,
    ar: translationSchema,
    fr: translationSchema,
    icon: z.instanceof(File).optional(),
});

export const updateCategorySchema = z.object({
    slug: z.string().min(1, "Slug is required"),
    en: translationSchema,
    ar: translationSchema,
    fr: translationSchema,
    icon: z.instanceof(File).optional(),
});
