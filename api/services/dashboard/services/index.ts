"use client";
import { ServicesResponse, SingleServiceResponse, ServiceFormData } from "./interfaces";
import { destroy, get, post, put } from "@/api/axios";

export const servicesRepository = {
    getServices: async (): Promise<ServicesResponse> => {
        const data = await get(`/api/services`)
        return data?.data
    },
    addService: async (data: ServiceFormData): Promise<SingleServiceResponse> =>
        post(`/api/services`, data),
    getService: async (serviceId: number): Promise<SingleServiceResponse> => {
        const data = await get(`/api/services/${serviceId}`)
        return data?.data
    },
    updateService: async (serviceId: number, data: ServiceFormData): Promise<SingleServiceResponse> =>
        put(`/api/services/${serviceId}`, data),
    deleteService: async (serviceId: number): Promise<{ success: boolean; message: string }> =>
        destroy(`/api/services/${serviceId}`),
};
