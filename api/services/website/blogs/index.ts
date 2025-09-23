import apiFetcher from "@/api/api.instance";
import { APIResponse } from "@/api/types";
import { IBlogs } from "./interfaces";
import { HomeRoute } from "../home/routes";
export const BlogRepository = {
	getBlogs: async (param: string): Promise<APIResponse<IBlogs>> => apiFetcher<APIResponse<IBlogs>>(`${HomeRoute}/${param}`),
};
