"use client";
import { SectionResponse, SingleSectionResponse, SectionFormData } from "./interfaces";
import { destroy, get, post, put } from "@/api/axios";

export const homeRepository = {
  getsections: async (): Promise<SectionResponse> => {
    const data = await get(`/api/sections`)
    return data?.data
  },
  addSection: async (data: SectionFormData): Promise<SingleSectionResponse> =>
    post(`/api/sections`, data),
  getSection: async (sectionId: number): Promise<SingleSectionResponse> =>
    get(`/api/sections/${sectionId}`),
  updateSection: async (sectionId: number, data: SectionFormData): Promise<SingleSectionResponse> =>
    put(`/api/sections/${sectionId}`, data),
  deleteSection: async (sectionId: number): Promise<{ success: boolean; message: string }> =>
    destroy(`/api/sections/${sectionId}`),
};
