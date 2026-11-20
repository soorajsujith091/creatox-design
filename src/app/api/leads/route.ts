import { NextResponse } from "next/server";
import { configured, laravel, sameOrigin } from "@/lib/cms/server";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!configured()) return NextResponse.json({error:"Enquiries are temporarily unavailable. Please email hello@creatoxdesigns.com."},{status:503});
  try {
    if (Number(request.headers.get("content-length")) > 20000) return NextResponse.json({error:"Message is too long."},{status:413});
    const response = await laravel("/leads", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(await request.json())});
    return NextResponse.json(await response.json(), {status:response.status});
  } catch {return NextResponse.json({error:"Unable to send your enquiry. Please try again shortly."},{status:503});}
}
