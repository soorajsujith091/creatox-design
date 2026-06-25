export interface Project {
  id: string;
  title: string;
  tags: string[];
  image: string;
  description: string;
  link: string;
  layout: "image-left" | "image-right" | "full-width";
}

export const projects: Project[] = [
  {
    id: "best-western-plus",
    title: "Best Western Plus",
    tags: ["Branding", "Website"],
    image:
      "https://creatoxdesigns.com/wp-content/uploads/2024/12/creatox-works-2-1-370x370.jpg",
    description:
      "Complete branding and web design for a premium hotel property.",
    link: "/portfolio/best-western-plus/",
    layout: "image-left",
  },
  {
    id: "desham-brings",
    title: "Desham Brings",
    tags: ["Branding", "Marketing", "Website"],
    image:
      "https://creatoxdesigns.com/wp-content/uploads/2024/12/creatox-works-1-1-370x370.jpg",
    description:
      "Brand identity, marketing strategy and full web presence build-out.",
    link: "/portfolio/desham-brings/",
    layout: "image-right",
  },
  {
    id: "hudayriyat-corporate-games",
    title: "Hudayriyat Corporate Games",
    tags: ["Website"],
    image:
      "https://creatoxdesigns.com/wp-content/uploads/2024/12/creatox-works-7-1-370x370.jpg",
    description:
      "Official event website for Abu Dhabi's premier corporate sports games.",
    link: "/portfolio/hudayriyat-corporate-games/",
    layout: "full-width",
  },
  {
    id: "humble-jo",
    title: "Humble Jo",
    tags: ["Branding", "Website"],
    image:
      "https://creatoxdesigns.com/wp-content/uploads/2026/02/humble-jo-mock-file-01.jpg-1-370x370.png",
    description: "Complete brand identity and web design for a lifestyle brand.",
    link: "/portfolio/humble-jo/",
    layout: "image-left",
  },
  {
    id: "amana-toyota",
    title: "Amana Toyota",
    tags: ["Digital", "Marketing"],
    image:
      "https://creatoxdesigns.com/wp-content/uploads/2026/02/humble-jo-mock-file-03.jpg-370x370.jpeg",
    description:
      "Strategic digital marketing campaigns for a leading Toyota dealership.",
    link: "/portfolio/amana-toyota-digital-marketing-case-study/",
    layout: "image-right",
  },
];
