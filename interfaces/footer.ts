import { ICompany, IMenu, IService } from "@/api/services/website/home/header-and-footer/interfaces";

interface IFooterProps {
	company: ICompany;
	services: IService[];
	navigations: IMenu[];
}

export type { IFooterProps };
