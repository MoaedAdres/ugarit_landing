import { ICompany, IService } from "@/api/services/home/header-and-footer/interfaces";

interface IFooterProps {
	company: ICompany;
	services: IService[];
}

export type { IFooterProps };
