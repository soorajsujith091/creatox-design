export interface Testimonial {
  id: number;
  quote: string;
  clientName: string;
  clientLabel: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The team did a really nice job with my WooCommerce website. They were super friendly and helpful the whole time. Even made product mockups which made listing items so much easier. Finished quickly, price was fair.",
    clientName: "Vivek P",
    clientLabel: "E-commerce Client",
  },
  {
    id: 2,
    quote:
      "The branding and website crafted exceeded expectations. Their innovative approach showcased a deep understanding of our brand, resulting in a visually appealing and user-friendly website with cohesive branding.",
    clientName: "Best Western Premier M Four Hotel, Dubai",
    clientLabel: "Hospitality Brand",
  },
  {
    id: 3,
    quote:
      "Professionalism is something I really liked, right from proposals to execution. They work on a plan, and the best part is the flexibility which I really demand.",
    clientName: "Nathan R. Calloway",
    clientLabel: "Business Client",
  },
  {
    id: 4,
    quote:
      "Exceptional branding and social media management! Strategic approach significantly boosted our online presence with a cohesive brand identity.",
    clientName: "Aanand Tuttu",
    clientLabel: "Brand Partner",
  },
  {
    id: 5,
    quote:
      "A very creative solution to all your requirements! All their ideas are out of the box and the team is highly supportive. Must work with them.",
    clientName: "Raina D'souza",
    clientLabel: "Creative Partner",
  },
];
