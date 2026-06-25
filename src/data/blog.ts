export interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  tags: string[];
  link: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "external-linking-seo",
    title:
      "External Linking in SEO: A Complete Guide to Boost Rankings and Authority",
    date: "Mar 20, 2025",
    image:
      "https://creatoxdesigns.com/wp-content/uploads/2025/03/12252154_3203-scaled-1-800x800.jpg",
    tags: ["SEO", "Digital Marketing"],
    link: "/external-linking-in-seo/",
  },
  {
    id: "art-of-storytelling",
    title:
      "The Art of Storytelling: How Human-Focused Videos Drive Conversions",
    date: "Feb 27, 2025",
    image:
      "https://creatoxdesigns.com/wp-content/uploads/2025/02/man-woman-creating-podcast-together-scaled-1-800x800.jpg",
    tags: ["Branding", "Marketing"],
    link: "/the-art-of-storytelling/",
  },
  {
    id: "what-is-ppc",
    title: "What Is PPC? Learn the Basics of Pay-Per-Click Marketing",
    date: "Feb 14, 2025",
    image:
      "https://creatoxdesigns.com/wp-content/uploads/2025/02/showing-tablet-s-blank-screen-scaled-1-800x800.jpg",
    tags: ["SEO", "Digital Marketing"],
    link: "/what-is-ppc/",
  },
];
