import { NextResponse } from "next/server";
import { configured, isAdmin, laravel } from "@/lib/cms/server";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const path = query.get("path") || "/";
  const preview = query.get("preview") === "1";
  if (!configured()) return NextResponse.json({ content: {} });
  try {
    if (preview && !await isAdmin()) return NextResponse.json({ error: "Sign in to preview drafts." }, { status: 401 });
    const response = await laravel(`${preview ? "/admin" : ""}/page-content?path=${encodeURIComponent(path)}`, {}, preview);
    const data = await response.json();
    return NextResponse.json(preview ? { content: data.draft || {} } : data, { status: response.status });
  } catch { return NextResponse.json({ content: {} }); }
}
