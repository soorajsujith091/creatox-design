import { NextResponse } from "next/server";
import { configured, laravel } from "@/lib/cms/server";
export const dynamic = "force-dynamic";
export async function GET() {
  if (!configured()) return NextResponse.json({});
  try { const response = await laravel("/images"); return NextResponse.json(await response.json(), { status: response.status }); }
  catch { return NextResponse.json({}); }
}
