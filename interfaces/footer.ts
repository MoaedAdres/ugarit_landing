import { ICompany, IMenu, IService } from "@/api/services/landing/home/header-and-footer/interfaces";

interface IFooterProps {
	company: ICompany;
	services: IService[];
	navigations: IMenu[];
}

export type { IFooterProps };
