export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  link: string;
}

export const services: Service[] = [
  {
    id: "branding-design",
    number: "01",
    title: "Branding & Design",
    description:
      "We target your audience's needs and emotions to transform your business into a recognisable brand.",
    link: "/service/branding-and-design/",
  },
  {
    id: "social-media",
    number: "02",
    title: "Social Media Management",
    description:
      "Result-oriented services that amplify your reach with years of proven social media experience.",
    link: "/service/social-media-management/",
  },
  {
    id: "web-design",
    number: "03",
    title: "Creative Web Design",
    description:
      "Functional, user-friendly and beautiful websites. Every page is crafted with purpose.",
    link: "/service/creative-branding/",
  },
  {
    id: "ads-campaigns",
    number: "04",
    title: "Ads & Campaigns",
    description:
      "Facebook, Instagram, and Google ads that improve your online presence and actually convert.",
    link: "/service/ads-and-campaigns/",
  },
  {
    id: "productions",
    number: "05",
    title: "Productions",
    description:
      "Bold visual identities that speak your story — visually and verbally across all media.",
    link: "/service/productions/",
  },
  {
    id: "ecommerce",
    number: "06",
    title: "E-commerce Development",
    description:
      "Custom online stores designed to convert visitors into loyal, returning customers.",
    link: "/service/e-commerce-development/",
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
