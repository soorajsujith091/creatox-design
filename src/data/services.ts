export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  link: string;
}

export const services: Service[] = [
  {
    id: "social-media",
    number: "01",
    title: "Social Media Management",
    description:
      "Result-oriented services that amplify your reach with years of proven social media experience.",
    link: "/service/social-media-management/",
  },
  {
    id: "ads-campaigns",
    number: "02",
    title: "Ads & Campaigns",
    description:
      "Facebook, Instagram, and Google ads that improve your online presence and actually convert.",
    link: "/service/ads-and-campaigns/",
  },
  {
    id: "seo",
    number: "03",
    title: "Search Engine Optimisation",
    description: "Help customers discover your business through search-friendly content, technical improvements and a clear SEO strategy.",
    link: "/service/seo/",
  },
  {
    id: "influencer-marketing",
    number: "04",
    title: "Influencer Marketing & PR",
    description: "Connect your brand with relevant creators and tell your story through thoughtful partnerships and public relations.",
    link: "/service/influencer-marketing-pr-pays/",
  },
  {
    id: "branding-design",
    number: "05",
    title: "Branding & Design",
    description:
      "We target your audience's needs and emotions to transform your business into a recognisable brand.",
    link: "/service/branding-and-design/",
  },
  {
    id: "web-design",
    number: "06",
    title: "Creative Web Design",
    description:
      "Functional, user-friendly and beautiful websites. Every page is crafted with purpose.",
    link: "/service/creative-branding/",
  },
  {
    id: "productions",
    number: "07",
    title: "Productions",
    description:
      "Brand films, photography and video content that bring your story to life across digital channels.",
    link: "/service/productions/",
  },
  {
    id: "ecommerce",
    number: "08",
    title: "E-commerce Development",
    description:
      "Custom online stores designed to convert visitors into loyal, returning customers.",
    link: "/service/e-commerce-development/",
  },
  {
    id: "custom-software",
    number: "09",
    title: "Custom Software Development",
    description: "Bring workflows, teams and information together with tailored business applications, dashboards and customer portals.",
    link: "/service/custom-software-development/",
  },
  {
    id: "web-mobile-apps",
    number: "10",
    title: "Web & Mobile Apps",
    description: "Turn business needs into useful web and mobile applications, with clear interfaces and practical features for your users.",
    link: "/service/web-and-mobile-apps/",
  },
];

export interface PillarCard {
  number: string;
  title: string;
  description: string;
  cta: string;
  link: string;
  iconType: "geometric" | "orb" | "code";
}

export const pillars: PillarCard[] = [
  {
    number: "01",
    title: "Design",
    description:
      "We create visually compelling designs that reflect your brand's personality and connect with your audience. Crafted to attract attention, communicate value, and drive engagement.",
    cta: "Explore →",
    link: "/service/branding-and-design/",
    iconType: "geometric",
  },
  {
    number: "02",
    title: "Digital",
    description:
      "Our digital services help brands grow, engage, and convert. We combine strategy, creativity, and technology to build strong digital presence that drives real results.",
    cta: "Explore →",
    link: "/service/social-media-management/",
    iconType: "orb",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Our skilled professionals craft customised, responsive websites that reflect your brand, engage users, and deliver seamless experiences across all devices.",
    cta: "Explore →",
    link: "/service/e-commerce-development/",
    iconType: "code",
  },
];
