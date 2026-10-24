import Timeline, { type TimelineItem } from "@/components/ui/timeline-01-utils/timeline";
import { Badge } from "@/components/ui/badge";
import "./timeline-01.css";

const timelineData: TimelineItem[] = [
  {
    title: "GRAND MALABAR EXPO", heading: "Bringing people and brands together.", date: "2025",
    description: "As the official social media partner for Grand Malabar Expo 2025, Creatox helped the event connect with audiences through creative content, digital campaigns and continuous visitor engagement.",
    image: "https://creatoxdesigns.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-24-at-5.15.02-PM.jpeg",
    imageAlt: "Grand Malabar Expo 2025 event", fallbackImage: "/images/project-sports-concept.png",
    href: "/grand-malabar-expo/", linkLabel: "Explore the partnership",
    stats: [{ label: "Happy visitors", value: "1L+" }, { label: "Views", value: "21M+" }],
  },
  {
    title: "MALABAR JALOLSAVAM", heading: "Making waves. Reaching millions.", date: "2026",
    description: "For Malabar Jalolsavam 2026, Creatox brought the excitement of the boat race to social media. Creative content and digital promotion helped Navodaya Mangalassery reach audiences far beyond the venue.",
    image: "/images/Creatox%20x%20jalolsavam%20copy.jpg.jpeg",
    imageAlt: "Creatox campaign for Malabar Jalolsavam 2026, featuring snake boats and social media creatives",
    href: "/images/Creatox%20x%20jalolsavam%20copy.jpg.jpeg", linkLabel: "View the campaign",
    stats: [{ label: "Content views", value: "5M+" }, { label: "Malabar Jalolsavam", value: "2026" }],
  },
];

export default function TimelineBlock01() {
  return <section className="event-timeline site-gutter" aria-labelledby="event-timeline-heading">
    <div className="event-timeline-frame">
      <header className="event-timeline-header"><Badge variant="outline" className="font-normal">Event partnerships</Badge><h2 id="event-timeline-heading">Creative partnerships.<br /><span>Real impact.</span></h2><p>Connecting people, brands and communities through creative content and digital campaigns.</p></header>
      <Timeline items={timelineData} />
      <div className="event-timeline-end" aria-hidden="true" />
    </div>
  </section>;
}
