# Creatox inner pages

Built locally in the existing Next.js project. Homepage content and styling are retained; its header now uses the original website navigation structure with desktop dropdowns and an expandable mobile drawer.

## Routes

- Company: `/about-us/`, `/our-clients/`, `/our-team/`, `/lifecreatox/`, `/career/`, `/contact-us/`, `/faq/`.
- Services: `/services/` and all ten original `/service/[slug]/` paths, including the original `/service/creative-branding/` web-design URL.
- Work: `/projects/`, `/case-studies/`, 14 `/portfolio/[slug]/` pages, `/grand-malabar-expo/`.
- Editorial: `/blog/` and 24 original article paths.
- Permanent redirects preserve the older shortened Storytelling and PPC paths used by homepage links, plus legacy listing aliases.

The route set has 60 canonical inner pages. Server-rendered metadata includes unique titles/descriptions, canonical URLs, social previews and breadcrumb structured data. Articles have BlogPosting data; service pages have Service data. `/sitemap.xml` and `/robots.txt` are generated from the same route set. Set `NEXT_PUBLIC_SITE_URL` if deploying on a different canonical domain.

## Content provenance

Public content was retrieved from https://creatoxdesigns.com/ on 15 October 2026 via the WordPress pages/posts API and public service/portfolio pages. Each imported record stores its original source URL in `src/data/website/`; service sources are in `src/data/inner-services.ts`.

Main source collections:

- https://creatoxdesigns.com/about-us/
- https://creatoxdesigns.com/our-clients/
- https://creatoxdesigns.com/our-team/
- https://creatoxdesigns.com/lifecreatox/
- https://creatoxdesigns.com/career/
- https://creatoxdesigns.com/contact-us/
- https://creatoxdesigns.com/case-studies/
- https://creatoxdesigns.com/projects/
- https://creatoxdesigns.com/blog/
- https://creatoxdesigns.com/grand-malabar-expo/

Service copy was organised and paraphrased around verified offerings. Blog articles retain their original publication dates. Obvious template fragments and text naming unrelated clients were excluded from project pages. Pink Papilio and Best Western Premier have listing details only because their original detail pages were empty or contained unrelated theme-demo copy. Portfolio/client/team imagery uses original website assets; it has not been replaced with invented client work. Careers visitors are asked to confirm availability with the team rather than presenting the source listing as live hiring data.

## Components and behaviour

- Reuses the existing NotchedProjectCard UI for searchable/filterable project and blog lists.
- Reuses the existing Bundui Magnetic Button interaction adapted from https://21st.dev/community/components/bundui/magnetic-button/default in the inner-page CTAs.
- Navigation uses native desktop details/summary dropdowns with outside-click and Escape dismissal, plus a modal mobile drawer with expandable groups, focus restoration and scroll locking.
- Native accordion FAQs work without a JavaScript dependency.
- Scroll reveals and magnetic CTAs respect reduced motion.
- Contact and career forms create email drafts. They do not submit to a backend; the visitor sends the email, and attaches a CV for career enquiries, in their email app.

## Validation

Run `npm run build`, then `node node_modules/next/dist/bin/next start -p 3011`, then `node scripts/check-inner-pages.cjs`. The checker audits canonical page responses, H1 count, metadata, structured data, internal destinations, homepage menu presence, robots/sitemap and an unknown-path 404. `CHECK_SITE_URL` can override the test server address.

Live browser tooling was unavailable in this session; responsive CSS was reviewed, but a desktop/mobile visual pass is still recommended before deployment.
