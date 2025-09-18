import apiFetcher from "@/api/api.instance";
// import {
//   IComplaintConfig,
//   IComplaintsData,
//   IComplaintStatistics,
// } from "./interface";

export const homeRepository = {
  getsections: async (): Promise<any> =>
    apiFetcher(`/api/sections`),
};
