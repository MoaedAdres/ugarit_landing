"use client";
import { CaseStudiesResponse, SingleCaseStudyResponse } from "./interfaces";
import { destroy, get, post } from "@/api/axios";

export const caseStudiesRepository = {
    getCaseStudies: async (): Promise<CaseStudiesResponse> => {
        const data = await get(`/case-studies`)
        return data?.data
    },
    addCaseStudy: async (formData: FormData): Promise<SingleCaseStudyResponse> =>
        post(`/case-studies`, formData),
    getCaseStudy: async (caseStudyId: number): Promise<SingleCaseStudyResponse> => {
        const data = await get(`/case-studies/${caseStudyId}`)
        return data?.data
    },
    updateCaseStudy: async (caseStudyId: number, formData: FormData): Promise<SingleCaseStudyResponse> =>
        post(`/case-studies/${caseStudyId}`, formData),
    reorderCaseStudies: async (orderedIds: number[]): Promise<{ success: boolean; message: string }> =>
        post(`/change-order`, { ordered: orderedIds, type: "CaseStudy" }),
    deleteCaseStudy: async (caseStudyId: number): Promise<{ success: boolean; message: string }> =>
        destroy(`/case-studies/${caseStudyId}`),
};
