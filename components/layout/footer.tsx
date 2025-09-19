import Link from "next/link";
import { Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import LightImage from "@/public/jpgs/lights/footer-light.jpg";
import DarkImage from "@/public/pngs/dark-mode/lights/footer-background.png";
import MyImage from "../Reusable-components/MyImage";
import { myIcons } from "@/constants/icons";

export function Footer() {
  return (
    <div className="relative">
      <MyImage src={LightImage} alt="light image" className="dark:hidden absolute w-full h-[725px] md:h-[425px]" />
      <MyImage src={DarkImage} alt="light image" className="hidden dark:block absolute w-full h-[725px] md:h-[425px]" />
      <footer
        className="relative -bottom-36 md:-bottom-24 w-full h-full">
        <div className="container w-full relative z-10 bottom-0 mx-auto py-10">
          <div className="flex flex-col items md:flex-row gap-6 lg:gap-10">
            {/* Company Info */}
            <div className="md:basis-[40%] basis-[45%] space-y-2 md:space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    U
                  </span>
                </div>
                <span className="font-heading font-semibold text-[22px] text-secondary-950">
                  Ugarit Technologies
                </span>
              </div>
              <p className="text-secondary-800 md:w-[90%] text-sm leading-relaxed">
                Professional IT solutions, cloud services, and DevOps consulting
                for enterprise clients.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-secondary-800 hover:text-primary-700 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-secondary-800 hover:text-primary-700 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-secondary-800 hover:text-primary-700 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
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
                  <li>
                    <Link
                      href="/about"
                      className="text-secondary-800 hover:text-primary-700 transition-colors text-sm"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/case-studies"
                      className="text-secondary-800 hover:text-primary-700 transition-colors text-sm"
                    >
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-secondary-800 hover:text-primary-700 transition-colors text-sm"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-secondary-800 hover:text-primary-700 transition-colors text-sm"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
            </div>
            <div className="mx-auto">
              <h3 className="font-heading font-semibold text-secondary-950 mb-1 md:mb-4">
                Contact
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center space-x-2 text-sm text-secondary-800">
                  <i className={myIcons.email} />
                  <span>info@ugarittech.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-secondary-800">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-secondary-800">
                  <MapPin className="h-4 w-4" />
                  <span>New York, NY</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-5 pt-5 md:mt-8 md:pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-800 text-sm">
              © 2024 Ugarit Technologies. All rights reserved.
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
      </footer>
    </div>
  );
}