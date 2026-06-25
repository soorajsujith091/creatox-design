export interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/projects/" },
  { name: "Services", href: "/service/branding-and-design/" },
  { name: "About", href: "/about-us/" },
  { name: "Contact", href: "/contact-us/" },
];
