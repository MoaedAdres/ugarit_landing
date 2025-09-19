"use client";
import apiFetcher from "@/api/api.instance";
import { SectionResponse, SingleSectionResponse, SectionFormData } from "./interfaces";
import { post } from "@/api/axios";

export const homeRepository = {
  getsections: async (): Promise<SectionResponse> =>
    apiFetcher(`/api/sections`),
  addSection: async (data: SectionFormData): Promise<SingleSectionResponse> =>
    post(`/api/sections`, data),
  getSection: async (sectionId: number): Promise<SingleSectionResponse> =>
    apiFetcher(`/api/sections/${sectionId}`),
  updateSection: async (sectionId: number, data: SectionFormData): Promise<SingleSectionResponse> =>
    apiFetcher(`/api/sections/${sectionId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteSection: async (sectionId: number): Promise<{ success: boolean; message: string }> =>
    apiFetcher(`/api/sections/${sectionId}`, {
      method: "DELETE",
    }),
};
