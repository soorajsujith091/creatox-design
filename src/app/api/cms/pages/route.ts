import { NextResponse } from "next/server";
import { allPaths, articles, companyPages, innerServices, projects } from "@/lib/inner-content";
import { isAdmin, laravel, sameOrigin } from "@/lib/cms/server";
export const dynamic = "force-dynamic";
const paths = () => Array.from(new Set(["/", ...allPaths().map(path => `/${path}/`)]));
export async function GET(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const path = new URL(request.url).searchParams.get("path");
  if (!path) return NextResponse.json(paths().map(value => {
    const slug = value.replace(/^\/|\/$/g, "");
    const service = innerServices.find(item => slug === `service/${item.slug}`);
    const project = projects.find(item => slug === `portfolio/${item.slug}`);
    const article = articles.find(item => slug === item.slug);
    const title = value === "/" ? "Home" : service?.title || project?.title || article?.title || slug.replace(/-/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());
    const group = value === "/" || companyPages[slug] ? "Main pages" : service ? "Services" : project ? "Projects" : "Articles";
    return { path: value, title, group };
  }));
  if (!paths().includes(path)) return NextResponse.json({ error: "Page not found." }, { status: 404 });
  try { const response = await laravel(`/admin/page-content?path=${encodeURIComponent(path)}`, {}, true); return NextResponse.json(await response.json(), { status: response.status }); }
  catch { return NextResponse.json({ error: "Laravel is unavailable." }, { status: 503 }); }
}
export async function POST(request: Request) {
  if (!sameOrigin(request) || !await isAdmin()) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  try {
    const data = await request.json();
    if (!paths().includes(data.path)) return NextResponse.json({ error: "Page not found." }, { status: 404 });
    const response = await laravel("/admin/page-content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }, true);
    return NextResponse.json(await response.json(), { status: response.status });
  } catch { return NextResponse.json({ error: "Unable to save the page." }, { status: 503 }); }
}
