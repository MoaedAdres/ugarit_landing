"use client";
import { ServicesResponse, SingleServiceResponse, ServiceFormData } from "./interfaces";
import { destroy, get, post, put } from "@/api/axios";

export const servicesRepository = {
    getServices: async (): Promise<ServicesResponse> => {
        const data = await get(`/services`)
        return data?.data
    },
    addService: async (data: ServiceFormData): Promise<SingleServiceResponse> =>
        post(`/services`, data),
    getService: async (serviceId: number): Promise<SingleServiceResponse> => {
        const data = await get(`/services/${serviceId}`)
        return data?.data
    },
    updateService: async (serviceId: number, data: ServiceFormData): Promise<SingleServiceResponse> =>
        post(`/services/${serviceId}`, data),
    reorderServices: async (orderedIds: number[]): Promise<{ success: boolean; message: string }> =>
        post(`/change-order`, { ordered: orderedIds, type: "Service" }),
    deleteService: async (serviceId: number): Promise<{ success: boolean; message: string }> =>
        destroy(`/services/${serviceId}`),
};
