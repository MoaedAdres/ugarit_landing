import apiFetcher from "@/api/api.instance";
import { APIResponse } from "@/api/types";
// import {
//   IComplaintConfig,
//   IComplaintsData,
//   IComplaintStatistics,
// } from "./interface";
import IComplaint from "@workspace/shared/api/services/complaints/complaints.interface";

export const citizenUserRepository = {
  getComplaints: async (): Promise<APIResponse<IComplaintsData>> =>
    apiFetcher<APIResponse<IComplaintsData>>(`/me/complaints`),
};
