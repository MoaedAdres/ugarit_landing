import apiFetcher from "@/api/api.instance";
import { APIResponse } from "@/api/types";
import { IHome } from "./interfaces";
import { HomeRoute } from "./routes";
export const HomeRepository = {
	getHome: async (): Promise<APIResponse<IHome>> => apiFetcher<APIResponse<IHome>>(HomeRoute),
};
