export type InnerService = {
  slug: string; title: string; kicker: string; description: string;
  paragraphs: string[]; offerings: { title: string; description: string }[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[]; image: string; source: string;
};

const items = (entries: [string, string][]) => entries.map(([title, description]) => ({ title, description }));
const faq = (question: string, answer: string) => ({ question, answer });

export const innerServices: InnerService[] = [
  {
    slug: 'branding-and-design', title: 'Branding & Design', kicker: 'Creative agency that inspires',
    description: 'Build a distinctive identity that helps people recognise, remember and connect with your business.',
    paragraphs: ['A recognisable brand gives your business a clear presence in a competitive market. Creatox combines research and design to create identities shaped around your audience and business needs.', 'From your logo to packaging and everyday communication, we develop a consistent visual language that carries your story across digital and physical touchpoints.'],
    offerings: items([['Logo design', 'Simple, distinctive logos designed around your business, personality and audience.'], ['Brochure design', 'Clear, engaging brochures that introduce your products, services and brand story.'], ['Packaging & product design', 'Attractive, functional packaging developed through an understanding of your product and customer.'], ['Rebranding', 'Refresh your identity and communication to reflect the next chapter of your business.']]),
    process: items([['Understand your business', 'Study your goals, audience and market before shaping a creative direction.'], ['Define your identity', 'Develop a recognisable system of logos, colours and design elements.'], ['Explore the audience', 'Consider customer needs and competitor positioning to create a relevant identity.'], ['Deliver the brand', 'Bring the identity together in a practical package with ongoing project support.']]),
    faqs: [faq('How much does logo design cost?', 'The cost depends on your requirements and the scope of the identity. Contact Creatox to discuss your brief and request a quote.'), faq('Can you design brand stationery?', 'Yes. We design business cards, letterheads and envelopes alongside logo design.'), faq('How long does a branding project take?', 'Timing depends on the complexity and requirements of your project. We can agree a schedule after reviewing your brief.')],
    image: '/images/Creatox Horizon_ A Futuristic Dreamscape.png', source: 'https://creatoxdesigns.com/service/branding-and-design/',
  },
  {
    slug: 'creative-branding', title: 'Creative Web Design', kicker: 'Creative agency beyond design',
    description: 'Purposeful websites that bring together strong visual design, clear navigation and a comfortable browsing experience.',
    paragraphs: ['Your website should express your brand and help visitors find their next step. Our Kannur team designs and redesigns websites around your audience, content and business goals.', 'Every page brings together visual detail and practical usability. Responsive layouts help your experience work across phones, tablets and desktop screens.'],
    offerings: items([['Responsive web design', 'Layouts that adapt to different devices while keeping content easy to browse.'], ['Custom web design', 'A tailored website that reflects your brand and the requirements of your business.'], ['WordPress websites', 'Engaging WordPress experiences with an emphasis on usability and clear content.'], ['Website redesign', 'Rework an existing website with improved structure, presentation and mobile experience.']]),
    process: items([['Concept', 'Understand the purpose of your site and explore competitors to define a clear brief.'], ['Planning', 'Organise the structure, navigation and content flow around visitor needs.'], ['Design & development', 'Turn the plan into a considered visual experience and a functional website.']]),
    faqs: [faq('Can you redesign an existing website?', 'Yes. Website redesign is part of our offering for businesses with an existing online presence.'), faq('Will the website work on mobile?', 'Responsive design is a core part of the service, with layouts considered across screen sizes.')],
    image: '/images/creatox-creative-studio-hero.png', source: 'https://creatoxdesigns.com/service/creative-branding/',
  },
  {
    slug: 'social-media-management', title: 'Social Media Management', kicker: 'Connect with your community',
    description: 'Consistent content and thoughtful channel management that help your brand stay connected to its audience.',
    paragraphs: ['Build a social presence with a clear strategy, relevant content and regular interaction. Creatox supports brands through content creation, community engagement and performance reporting.', 'Each platform plays a different role. We shape communication for visual discovery, business conversations and video audiences while keeping your brand consistent.'],
    offerings: items([['Facebook', 'Content planning, brand communication and community engagement supported by monthly analysis.'], ['Instagram', 'Visually engaging content that introduces your brand and helps followers explore your offering.'], ['LinkedIn', 'Company updates, relevant insights and business communication for professional audiences.'], ['YouTube', 'Channel management with attention to your video presence, engagement and audience.']]),
    process: items([['Plan the channel strategy', 'Align your platform presence with the audience you want to reach.'], ['Create consistent content', 'Develop relevant visual and written content for each channel.'], ['Engage & review', 'Support community interaction and review monthly channel performance.']]),
    faqs: [faq('Which platforms can you manage?', 'The service covers Facebook, Instagram, LinkedIn and YouTube.'), faq('Does management include reporting?', 'Monthly analysis and reporting are part of the social media management offering.')],
    image: '/images/Robotic Hands and Glowing Starburst Emblem.png', source: 'https://creatoxdesigns.com/service/social-media-management/',
  },
  {
    slug: 'ads-and-campaigns', title: 'Ads & Campaigns', kicker: 'Creative agency defined by ideas',
    description: 'Audience-focused digital campaigns built around your brand, your goals and the channels your customers use.',
    paragraphs: ['Creatox brings together campaign strategy, content and creative to help businesses build visibility and reach prospective customers.', 'We study your business and competition before planning targeting, creative and budget. Campaigns can span social platforms, search and video depending on your needs.'],
    offerings: items([['Facebook marketing', 'Audience research, strategy, content and advertising creative for your Facebook presence.'], ['Instagram marketing', 'Campaigns designed to introduce products, increase awareness and support customer enquiries.'], ['Google Ads', 'Industry research, campaign planning and landing-page design for search advertising.'], ['YouTube marketing', 'Video promotion and campaign planning aligned with your business requirements.']]),
    process: items([['Research', 'Understand the product, audience and competitive landscape.'], ['Plan', 'Shape the campaign strategy, messaging, creative and budget.'], ['Launch & manage', 'Put the campaign into action across the selected advertising channels.']]),
    faqs: [faq('Which advertising channels are available?', 'Facebook, Instagram, Google Ads and YouTube are available for your campaigns.'), faq('Can you help with landing pages?', 'The Google Ads service includes planning and designing campaign landing pages.')],
    image: '/images/Portal Over a Neon Cosmic Horizon.png', source: 'https://creatoxdesigns.com/service/ads-and-campaigns/',
  },
  {
    slug: 'e-commerce-development', title: 'E-commerce Development', kicker: 'Creative agency designed for growth',
    description: 'Online stores that combine your brand identity with a clear, accessible shopping experience.',
    paragraphs: ['Creatox develops visually engaging ecommerce websites for businesses of different sizes. We focus on responsive shopping experiences and practical store functionality.', 'Whether you are starting a new store or moving from another platform, our work brings design and development together around your products and customers.'],
    offerings: items([['WooCommerce development', 'Flexible online stores with customisation options suited to your business requirements.'], ['Shopify development', 'Shopify stores developed with usability, search visibility and ongoing business needs in mind.'], ['Store design', 'A considered interface and product presentation that support a comfortable shopping journey.'], ['Platform migration', 'Support for businesses moving an existing store to a new platform.']]),
    process: items([['Understand the store', 'Review your products, customers and functional needs.'], ['Design the experience', 'Create a brand-led shopping interface that works across devices.'], ['Build & support', 'Develop the store on the selected platform and provide project support.']]),
    faqs: [faq('Which store platforms do you work with?', 'We work with WooCommerce and Shopify.'), faq('Can you help with an existing store?', 'Yes. The service covers both new stores and businesses migrating from a previous platform.')],
    image: '/images/project-beverage-concept.png', source: 'https://creatoxdesigns.com/service/e-commerce-development/',
  },
  {
    slug: 'web-and-mobile-apps', title: 'Web & Mobile Apps', kicker: 'Creative agency creating what’s next',
    description: 'Custom web software and mobile applications shaped around your business and the people who use them.',
    paragraphs: ['A digital product should solve real business needs while remaining easy to use. Creatox develops customised web and mobile experiences through clear communication at each stage.', 'Our work spans business websites, ecommerce and mobile applications for organisations of different sizes. The team works with web technologies including Node.js, Laravel and PHP.'],
    offerings: items([['Custom web development', 'Business-focused web software and websites tailored to your requirements.'], ['Ecommerce development', 'Online shopping platforms with an emphasis on usability and performance.'], ['Android apps', 'Android application development guided by a structured, iterative process.'], ['iOS apps', 'Interactive iOS experiences designed around your customers and business needs.']]),
    process: items([['Define requirements', 'Establish the needs of your business and the expectations of your users.'], ['Design & develop', 'Build a customised product with communication throughout development.'], ['Deliver & support', 'Prepare the application for delivery and provide customer support.']]),
    faqs: [faq('Do you develop both Android and iOS apps?', 'Yes. Both Android and iOS application development are listed services.'), faq('Can you build custom business software?', 'Yes. Custom web development is available to address specific business requirements.')],
    image: '/images/build-transform-orb.jpeg', source: 'https://creatoxdesigns.com/service/web-and-mobile-apps/',
  },
  {
    slug: 'seo', title: 'Search Engine Optimisation', kicker: 'Creative agency made to matter',
    description: 'Improve your search presence with a practical approach to content, technical foundations and local visibility.',
    paragraphs: ['Creatox provides SEO support for businesses in Kannur, across Kerala and those seeking a wider audience. Strategies are shaped around your market and the searches that matter to your customers.', 'Our approach combines keyword planning, on-page improvements, technical optimisation and local search. Clear communication and ethical practices underpin the work.'],
    offerings: items([['Keyword research & strategy', 'Understand search intent and identify relevant terms for your audience and business.'], ['On-page SEO', 'Improve titles, descriptions, headings and internal links for clearer page structure.'], ['Off-page SEO', 'Develop website authority through relevant backlinks and accurate business citations.'], ['Technical SEO', 'Review speed, mobile responsiveness and indexation to improve the site foundation.'], ['Local SEO', 'Improve Google Business Profile information and local visibility for nearby searches.']]),
    process: items([['Understand search demand', 'Research your audience, market and relevant keywords.'], ['Optimise the foundation', 'Address page structure, content and technical performance.'], ['Build visibility', 'Support local discovery and relevant authority signals.']]),
    faqs: [faq('Can you help a local Kannur business?', 'Yes. Local SEO and Google Business Profile optimisation are included in the service.'), faq('Does SEO include technical work?', 'The service covers site speed, mobile responsiveness and indexation alongside page content.')],
    image: '/images/market-grow-ring-still.png', source: 'https://creatoxdesigns.com/service/seo/',
  },
  {
    slug: 'productions', title: 'Productions', kicker: 'Creative agency purely creative',
    description: 'Visual stories and video content that bring your brand, product or event to life.',
    paragraphs: ['Creatox creates video content for a range of brand communication needs, from short social clips to cinematic advertising.', 'We bring creative thinking to formats that suit your message and audience. Our production services include presenter-led content, scripted stories, promotional videos and AI-generated visuals.'],
    offerings: items([['Reels & social content', 'Short, engaging videos shaped for fast-moving social platforms.'], ['Anchor videos', 'Presenter-led videos that add personality to brand communication.'], ['Promo videos', 'Focused content introducing a product, service or event.'], ['Podcast videos', 'Video content for your podcast communication.'], ['Short scripted videos', 'Concise stories with a clear creative direction.'], ['AI videos', 'Computer-generated visual content for imaginative brand communication.'], ['Theater advertisements', 'Cinematic creative developed for theater displays.']]),
    process: items([['Choose the format', 'Match the communication goal with a suitable video format.'], ['Shape the story', 'Develop a creative direction around your brand and message.'], ['Create the content', 'Produce visual content for the intended platform or display.']]),
    faqs: [faq('Do you create short social videos?', 'Yes. Reels and social media reels are part of the production offering.'), faq('Can you create presenter-led videos?', 'Yes. Anchor-style videos are listed as a production service.')],
    image: '/images/creatox-immersive-brand-studio-hero.png', source: 'https://creatoxdesigns.com/service/productions/',
  },
  {
    slug: 'advertising', title: 'Advertising', kicker: 'Creative agency where ideas perform',
    description: 'Paid media that brings strategic targeting, persuasive messaging and considered creative together.',
    paragraphs: ['Creatox plans advertising around your goals, whether you want to introduce a brand, generate enquiries or support sales.', 'Our paid media work combines audience insights, competitive research and ongoing optimisation. Campaign strategy and creative are developed together so your message stays clear across placements.'],
    offerings: items([['Google Ads', 'Search, Display and Shopping campaigns for different stages of customer discovery.'], ['Meta advertising', 'Facebook and Instagram campaigns with audience targeting and platform-ready creative.'], ['YouTube video ads', 'Video advertising with storytelling and strategic audience selection.'], ['Strategy, copywriting & creative', 'Brand-aligned messaging and visuals shaped around the campaign goal.'], ['LinkedIn & Twitter ads', 'B2B advertising aimed at relevant professional audiences.'], ['Testing & optimisation', 'Campaign setup, A/B testing and refinement of targeting, creative and budget.']]),
    process: items([['Set the direction', 'Use audience and competitor insights to define a campaign strategy.'], ['Build the campaign', 'Prepare messaging, creative, targeting and channel setup.'], ['Test & refine', 'Review campaign performance and adjust creative, audiences and budgets.']]),
    faqs: [faq('Do you provide B2B advertising?', 'Yes. We offer LinkedIn and Twitter advertising for B2B audiences.'), faq('Can you help with advertising creative?', 'Yes. Strategy, copywriting and creative development are part of the offering.')],
    image: '/images/Portal Over a Neon Cosmic Horizon.png', source: 'https://creatoxdesigns.com/service/advertising/',
  },
  {
    slug: 'influencer-marketing-pr-pays', title: 'Influencer Marketing & PR', kicker: 'Where influence meets strategy',
    description: 'Relevant creator partnerships and clear brand stories that build visibility and trust.',
    paragraphs: ['Creatox connects brands with creators whose audiences and voices fit the message. Collaborations can range from smaller community creators to established public figures.', 'Public relations extends that story through media outreach, press communication, reputation management and event coverage. The work is shaped around your business goals and audience.'],
    offerings: items([['Influencer discovery', 'Identify creators through audience relevance, engagement and brand alignment.'], ['Campaign strategy & content', 'Plan the message and content direction around your campaign goals.'], ['Creative briefing & storytelling', 'Give collaborators a clear framework for consistent, brand-relevant communication.'], ['Execution & tracking', 'Manage campaign delivery and review performance.'], ['Press releases & media outreach', 'Prepare brand updates and connect with relevant media and digital platforms.'], ['Brand story & reputation', 'Develop your narrative and support a clear, trusted online presence.'], ['Event PR & coverage', 'Coordinate media and influencer communication around your event.']]),
    process: items([['Find the right voice', 'Review audience fit and creator relevance before selecting collaborators.'], ['Develop the story', 'Prepare messaging, creative briefs and a clear campaign plan.'], ['Coordinate & review', 'Support execution, media communication and campaign tracking.']]),
    faqs: [faq('How are influencers selected?', 'Selection considers audience relevance, engagement and alignment with your brand.'), faq('Does the service include public relations?', 'Yes. Press releases, media outreach, brand storytelling, online reputation and event coverage are included.')],
    image: '/images/agency-runners.png', source: 'https://creatoxdesigns.com/service/influencer-marketing-pr-pays/',
  },
];

export const agencyHistory = [
  { year: '2019', title: 'An independent beginning', description: 'Started as a freelance agency, working on websites and international projects.' },
  { year: '2020', title: 'A home in Kannur', description: 'Established an office in Kannur and worked on social media, design and websites in Kerala and Dubai.' },
  { year: '2023', title: 'Creative partnerships', description: 'Partnered with design and marketing agencies on international branding and website projects.' },
  { year: '2024', title: 'Space to grow', description: 'Moved into a dedicated agency space with a team of more than 15 people.' },
  { year: '2025', title: 'New connections', description: 'Joined BNI and became the Official Digital Media Partner for Grand Malabar Expo 2025.' },
  { year: '2026', title: 'The next chapter', description: 'Opened a new office as the agency continued to grow.' },
];

export const agencyValues = items([
  ['Creativity', 'Use strategy, content and design to create positive impact and help meaningful businesses grow.'],
  ['Quality', 'Bring care, experience and a commitment to innovation to each business goal.'],
  ['Abilities', 'Combine the skills of our team with an understanding of business, technology and market research.'],
  ['Relationships', 'Build long-term partnerships and work with clients as part of the extended Creatox family.'],
]);
