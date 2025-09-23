export interface IMenu {
	id: number;
	name: string;
	route: string;
	order: number;
	menus: ISubMenu[];
}
interface ISubMenu extends IMenu {}

interface IPressKit {
	logo: string;
	brochure: string;
	media_contact: string;
}
interface ILocation {
	city: string;
	country: string;
}
interface IContact {
	phone: string;
	email: string;
}

export interface ICompany {
	logo: string;
	name: string;
	about: string;
	press_kit: Record<string, string>;
	location: ILocation[];
	contact: IContact;
}
export interface IService {
	id: number;
	title: string;
}
export interface IHeaderFooter {
	menus: IMenu[];
	company: ICompany;
	services: IService[];
}
