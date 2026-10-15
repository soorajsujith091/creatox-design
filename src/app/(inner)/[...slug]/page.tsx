import { notFound, permanentRedirect } from "next/navigation";
import { AboutPage, ArticlePage, BlogPage, CareerPage, ClientsPage, ContactPage, ExpoPage, FaqPage, LifePage, ProjectPage, ServicePage, ServicesPage, TeamPage, WorkPage } from "@/components/inner/page-content";
import { aliases, allPaths, companyPages, JsonLd, pageMetadata, siteUrl } from "@/lib/inner-content";

export function generateStaticParams() { return allPaths().map(path=>({slug:path.split("/")})); }
export function generateMetadata({ params }: { params: { slug: string[] } }) { const path=params.slug.join("/");return pageMetadata(aliases[path] || path); }
export default function InnerPage({ params }: { params: { slug: string[] } }) {
  const path=params.slug.join("/");
  if(aliases[path]) permanentRedirect(`/${aliases[path]}/`);
  if(!allPaths().includes(path)) notFound();
  let content;
  if(path.startsWith("service/")) content=<ServicePage slug={params.slug[1]}/>;
  else if(path.startsWith("portfolio/")) content=<ProjectPage slug={params.slug[1]}/>;
  else switch(path) {
    case "about-us":content=<AboutPage/>;break;
    case "services":content=<ServicesPage/>;break;
    case "our-clients":content=<ClientsPage/>;break;
    case "our-team":content=<TeamPage/>;break;
    case "lifecreatox":content=<LifePage/>;break;
    case "career":content=<CareerPage/>;break;
    case "contact-us":content=<ContactPage/>;break;
    case "projects":content=<WorkPage/>;break;
    case "case-studies":content=<WorkPage cases/>;break;
    case "blog":content=<BlogPage/>;break;
    case "grand-malabar-expo":content=<ExpoPage/>;break;
    case "faq":content=<FaqPage/>;break;
    default:content=<ArticlePage slug={path}/>;
  }
  const label=companyPages[path]?.title || path.split("/").pop()?.replace(/-/g," ") || "Creatox";
  return <><JsonLd value={{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:siteUrl},{"@type":"ListItem",position:2,name:label,item:`${siteUrl}/${path}/`}]}}/>{content}</>;
}
