"use client";
import { SectionResponse, SingleSectionResponse, SectionFormData } from "./interfaces";
import { destroy, get, post, put } from "@/api/axios";

export const homeRepository = {
  getsections: async (): Promise<SectionResponse> => {
    const data = await get(`/sections`)
    return data?.data
  },
  addSection: async (data: SectionFormData): Promise<SingleSectionResponse> =>
    post(`/sections`, data),
  getSection: async (sectionId: number): Promise<SingleSectionResponse> => {
    const data = await get(`/sections/${sectionId}`)
    return data?.data
  },
  updateSection: async (sectionId: number, data: SectionFormData): Promise<SingleSectionResponse> =>
    put(`/sections/${sectionId}`, data),
  toggleSectionVisibility: async (sectionId: number, data: { is_hidden: boolean }): Promise<SingleSectionResponse> =>
    put(`/sections/${sectionId}`, data),
  reorderSections: async (orderedIds: number[]): Promise<{ success: boolean; message: string }> =>
    post(`/change-order`, { ordered: orderedIds, type: "Section" }),
  deleteSection: async (sectionId: number): Promise<{ success: boolean; message: string }> =>
    destroy(`/sections/${sectionId}`),
};
