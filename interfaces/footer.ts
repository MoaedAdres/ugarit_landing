import { ICompany, IService } from "@/api/services/landing/header-and-footer/interfaces";

interface IFooterProps {
	company: ICompany;
	services: IService[];
}

export type { IFooterProps };
