import Link from "next/link";
import LightImage from "@/public/jpgs/lights/footer-light.jpg";
import DarkImage from "@/public/pngs/dark-mode/lights/footer-background.png";
import MyImage from "../Reusable-components/MyImage";
import { myIcons } from "@/constants/icons";
import { IFooterProps } from "@/interfaces/footer";

export function Footer({ company, services, navigations }: IFooterProps) {
  console.log('company', company);
  const renderSocialMediaIcon = (media: string) => {
    switch (media) {
      case "facebook":
        return myIcons.facebook
      case "twitter":
        return myIcons.twitter
      case "linkedIn":
        return myIcons.linkedin
      default:
        return myIcons.calendar
    }
  }
  return (
    <div className="relative">
      <MyImage src={LightImage} alt="light image" className="dark:hidden absolute w-full h-full" />
      <MyImage src={DarkImage} alt="light image" className="hidden dark:block absolute w-full h-full" />
      <footer
        className="relative w-full h-full">
        <div className="container w-full relative z-10 bottom-0 mx-auto pt-40 md:pt-28 pb-5">
          <div className="flex flex-col md:flex-row gap-3 lg:gap-10">
            {/* Company Info */}
            <div className="md:basis-[40%] basis-[45%] space-y-2 md:space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    {company?.name?.[0]}
                  </span>
                </div>
                <span className="font-heading font-semibold text-[22px] text-secondary-950">
                  {company?.name}
                </span>
              </div>
              <p className="text-secondary-800 md:w-[90%] text-sm leading-relaxed">
                {company?.about}
              </p>
              <div className="flex space-x-4">
                {company?.press_kit && Object.entries(company?.press_kit)?.map((kit) =>
                  <Link
                    href={kit[1]}
                    key={kit[0]}
                    className="text-secondary-800 hover:text-primary-700 transition-colors"
                  >
                    <i className={renderSocialMediaIcon(kit[0])} />
                  </Link>
                )}
              </div>
            </div>
            <div className="grid place-items-center md:gap-5 lg:gap-10 grid-cols-2 ">

              {/* Services */}
              <div>
                <h3 className="font-heading font-semibold text-secondary-950 mb-1 md:mb-4">
                  Services
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  <li>
                    <Link
                      href="/services/cloud"
                      className="text-secondary-800 hover:text-primary-700 transition-colors text-sm"
                    >
                      Cloud Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/devops"
                      className="text-secondary-800 hover:text-primary-700 transition-colors text-sm"
                    >
                      DevOps
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/consulting"
                      className="text-secondary-800 hover:text-primary-700 transition-colors text-sm"
                    >
                      IT Consulting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/security"
                      className="text-secondary-800 hover:text-primary-700 transition-colors text-sm"
                    >
                      Security
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-heading font-semibold text-secondary-950  mb-1 md:mb-4">
                  Company
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  {navigations?.map(nav =>
                    nav.menus?.length === 0 && <li key={nav.id}>
                      <Link
                        href={nav.route}
                        className="text-secondary-800 hover:text-primary-700 transition-colors text-sm"
                      >
                        {nav.name}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

            </div>
            {/* Contact */}
            <div>
              <h3 className="font-heading font-semibold text-secondary-950 mb-1 md:mb-4">
                Contact
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center space-x-2 text-sm text-secondary-800">
                  <i className={myIcons.email} />
                  <span>{company?.contact?.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-secondary-800">
                  <i className={myIcons.phone} />
                  <span>{company?.contact?.phone}</span>
                </div>
                {company?.location?.map(location =>
                  <div key={location.city} className="space-x-2 flex items-center gap-0.5 text-sm text-secondary-800">
                    <i className={myIcons.mapDot} />
                    <span>{location.city}, {location.country}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-3 pt-3 md:mt-5 md:pt-5 flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-800 text-sm">
              © 2025 Ugarit Technologies. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-secondary-800 hover:text-primary-700 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-secondary-800 hover:text-primary-700 transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer >
    </div >
  );
}