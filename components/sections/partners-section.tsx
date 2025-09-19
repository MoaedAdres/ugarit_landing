import {
  Building2,
  Cloud,
  Database,
  Code,
  Shield,
  Zap,
  GitBranch,
  Server,
  Lock,
  Cpu,
  Globe,
  Layers,
  Search,
} from "lucide-react";

import MySwiper from "../Reusable-components/MySwiper";
import SinglePartner from "./SinglePartner";
import LightBottom from "@/public/jpgs/lights/Light.png"
import DarkBackground from "@/public/pngs/dark-mode/lights/partner-background.png"
import MyImage from "../Reusable-components/MyImage";
import { myIcons } from "@/constants/icons";
interface PartnersSectionProps {
  partnerIds: string[];
}

// Extended partners data with proper icons
const mockPartners = [
  {
    id: "microsoft",
    name: "Microsoft",
    icon: <i className={myIcons.building} />,
    color: "#fa12de",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    icon: <i className={myIcons.clock} />,
    color: "#ae12da",
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    icon: <i className={myIcons.dragg} />,
    color: "#ea12de",
  },
  {
    id: "google",
    name: "Google Cloud",
    icon: <i className={myIcons.globe} />,
    color: "#ba12de",
  },
  {
    id: "docker",
    name: "Docker",
    icon: <i className={myIcons.comment} />,
    color: "#fa12bd",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: <i className={myIcons.like} />,
    color: "#fa14de",
  },
  {
    id: "github",
    name: "GitHub",
    icon: <i className={myIcons.graduationCap} />,
    color: "#fa12de",
  },
  {
    id: "nginx",
    name: "Nginx",
    icon: <i className={myIcons.search} />,
    color: "#fa16e2",
  },
  {
    id: "redis",
    name: "Redis",
    icon: <i className={myIcons.reddit} />,
    color: "#fa1cae",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: <i className={myIcons.cogs} />,
    color: "#fa1e6e",
  },
  {
    id: "terraform",
    name: "Terraform",
    icon: <i className={myIcons.copy} />,
    color: "#fa1e4e",
  },
  {
    id: "jenkins",
    name: "Jenkins",
    icon: <i className={myIcons.xmark} />,
    color: "#fa13ae",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: <i className={myIcons.xmark} />,
    color: "#ff52de",
  },
  {
    id: "elasticsearch",
    name: "Elasticsearch",
    icon: <i className={myIcons.search} />,
    color: "#fc42de",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: <i className={myIcons.shapes} />,
    color: "#fa22de",
  },
  {
    id: "grafana1",
    name: "Grafana",
    icon: <i className={myIcons.shareSolid} />,
    color: "#fe32de",
  },
  {
    id: "grafana2",
    name: "Grafana",
    icon: <i className={myIcons.externalLink} />,
    color: "#fca2de",
  },
  {
    id: "grafana3",
    name: "Grafana",
    icon: <i className={myIcons.dollar} />,
    color: "#fd12de",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: <i className={myIcons.forward} />,
    color: "#ff12de",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: <i className={myIcons.microphone} />,
    color: "#f612de",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: <i className={myIcons.percentage} />,
    color: "#f412de",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: <i className={myIcons.rotateRight} />,
    color: "#f212de",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: <i className={myIcons.tag} />,
    color: "#f312de",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: <i className={myIcons.userGraduate} />,
    color: "#ff12de",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: <i className={myIcons.users} />,
    color: "#ba12de",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: <i className={myIcons.angleDown} />,
    color: "#ca12de",
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: <i className={myIcons.arrowLeft} />,
    color: "#aa12de",
  },
];

export function PartnersSection({ partnerIds }: PartnersSectionProps) {
  return (
    <section className="py-16 relative bg-gradient-hero border-y border-border/20">
      <MyImage src={LightBottom} alt="light bottom" className="dark:hidden absolute w-full h-full" />
      <MyImage src={DarkBackground} alt="light bottom" className="hidden dark:block absolute w-full h-full" />
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative z-50 text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900  mb-4">
            Trusted <span className="text-secondary-foreground">Technology Partners</span>
          </h2>
          <p className="relative z-50 text-secondary-800 max-w-2xl mx-auto">
            We work with industry-leading platforms and technologies to deliver
            cutting-edge solutions
          </p>
        </div>

        <MySwiper needAutoPlay slidesPerView={4} parentClasses="" showPagination={false} pagination={false} wrapperClasses="" swiperClasses="!py-0" activeSlideClasses="" showNextButton={false} showPreviousButton={false} speed={2000} autoplay={{ disableOnInteraction: false, delay: 0 }}>
          {mockPartners.slice(0, mockPartners?.length / 2).map((partner, index) =>
            <SinglePartner color={partner.color} Icon={partner.icon} key={index} name={partner.name} />
          )}
        </MySwiper>

        <MySwiper needAutoPlay slidesPerView={4} parentClasses="" showPagination={false} pagination={false} wrapperClasses="" swiperClasses="!py-0" activeSlideClasses="" showNextButton={false} showPreviousButton={false} speed={2000} autoplay={{ disableOnInteraction: false, reverseDirection: true, delay: 0 }}>
          {mockPartners.slice((mockPartners?.length / 2) + 1).map((partner, index) =>
            <SinglePartner color={partner.color} Icon={partner.icon} key={index} name={partner.name} />
          )}
        </MySwiper>
      </div>
    </section>
  );
}
