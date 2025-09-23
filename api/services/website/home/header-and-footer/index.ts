import apiFetcher from "@/api/api.instance";
import { APIResponse } from "@/api/types";
import { IHeaderFooter } from "./interfaces";
import { headerFooterRoute } from "../routes";
export const HeaderFooterRepository = {
	getHeaderAndFooter: async (): Promise<APIResponse<IHeaderFooter>> => apiFetcher<APIResponse<IHeaderFooter>>(headerFooterRoute),
};
