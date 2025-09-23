import apiFetcher from "@/api/api.instance";
import { APIResponse } from "@/api/types";
import { IHome } from "./interfaces";
import { HomeRoute } from "./routes";
export const HomeRepository = {
	getHomeData: async (param: string): Promise<APIResponse<IHome>> => apiFetcher<APIResponse<IHome>>(`${HomeRoute}/${param}`),
};
