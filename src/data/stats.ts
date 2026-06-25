export interface Stat {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  {
    value: "6+",
    numericValue: 6,
    suffix: "+",
    label: "Years of Digital Excellence",
  },
  {
    value: "1k+",
    numericValue: 1000,
    suffix: "+",
    label: "Successful Projects",
  },
  {
    value: "22+",
    numericValue: 22,
    suffix: "+",
    label: "Team Members",
  },
  {
    value: "6+",
    numericValue: 6,
    suffix: "+",
    label: "Industry Partners",
  },
];

export const badges: string[] = [
  "Official Social Media Partner — Grand Malabar Expo 2025",
  "Proud BNI Member",
  "Kerala Startup Mission",
];

export const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/creatoxdesigns/",
    icon: "Instagram",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/creatoxdesigns",
    icon: "Facebook",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@creatoxdesigns",
    icon: "Youtube",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/creatoxdesigns/",
    icon: "Linkedin",
  },
  {
    name: "Pinterest",
    url: "https://in.pinterest.com/creatoxdesigns/",
    icon: "PinIcon",
  },
  {
    name: "Behance",
    url: "https://www.behance.net/creatoxdesigns",
    icon: "Palette",
  },
];

export const companyInfo = {
  name: "Creatox Designs",
  tagline: "Crafting designs and brands with love ❤ since 2019",
  phone1: "+91 80860 82 888",
  phone2: "+91 96138 82 888",
  email: "hello@creatoxdesigns.com",
  address: "3rd Floor, CCRB Complex, Melechovva, Kannur 670006, Kerala, India",
  addressShort: "Kannur, Kerala",
  established: "2019",
  directorName: "Sreya Mithun",
  directorImage:
    "https://creatoxdesigns.com/wp-content/uploads/2026/02/compressed_420044430_-removebg-preview-300x300.png",
};

export const footerServices = [
  { name: "Branding & Design", link: "/service/branding-and-design/" },
  { name: "Creative Web Design", link: "/service/creative-branding/" },
  {
    name: "Social Media Management",
    link: "/service/social-media-management/",
  },
  { name: "Ads & Campaigns", link: "/service/ads-and-campaigns/" },
  { name: "SEO", link: "/service/seo/" },
  {
    name: "E-commerce Development",
    link: "/service/e-commerce-development/",
  },
  { name: "Productions", link: "/service/productions/" },
  { name: "Web & Mobile Apps", link: "/service/web-and-mobile-apps/" },
];

export const footerCompany = [
  { name: "About Us", link: "/about-us/" },
  { name: "Case Studies", link: "/case-studies/" },
  { name: "Expo 2025", link: "/grand-malabar-expo/" },
  { name: "Projects", link: "/projects/" },
  { name: "Life@Creatox", link: "/lifecreatox/" },
  { name: "Careers", link: "/career/" },
  { name: "Blog", link: "/blog/" },
  { name: "Contact", link: "/contact-us/" },
];
