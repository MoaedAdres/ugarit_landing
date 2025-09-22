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
  getSection: async (sectionId: number): Promise<SingleSectionResponse> => {
    const data = await get(`/api/sections/${sectionId}`)
    return data?.data
  },
  updateSection: async (sectionId: number, data: SectionFormData): Promise<SingleSectionResponse> =>
    put(`/api/sections/${sectionId}`, data),
  toggleSectionVisibility: async (sectionId: number, isHidden: boolean): Promise<SingleSectionResponse> =>
    post(`/api/sections/${sectionId}`, { is_hidden: isHidden, _method: "PUT" }),
  deleteSection: async (sectionId: number): Promise<{ success: boolean; message: string }> =>
    destroy(`/api/sections/${sectionId}`),
};
