"use client";
import { CategoriesResponse, SingleCategoryResponse, CategoryFormData } from "./interfaces";
import { destroy, get, post, put } from "@/api/axios";

export const categoriesRepository = {
    getCategories: async (): Promise<CategoriesResponse> => {
        const data = await get(`/categories`)
        return data?.data
    },
    addCategory: async (data: CategoryFormData): Promise<SingleCategoryResponse> =>
        post(`/categories`, data),
    getCategory: async (categoryId: number): Promise<SingleCategoryResponse> => {
        const data = await get(`/categories/${categoryId}`)
        return data?.data
    },
    updateCategory: async (categoryId: number, data: CategoryFormData): Promise<SingleCategoryResponse> =>
        post(`/categories/${categoryId}`, data),
    deleteCategory: async (categoryId: number): Promise<{ success: boolean; message: string }> =>
        destroy(`/categories/${categoryId}`),
};
