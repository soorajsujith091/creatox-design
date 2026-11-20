import { NextResponse } from "next/server";
import { configured, isAdmin, laravel, sameOrigin } from "@/lib/cms/server";
export const dynamic = "force-dynamic";
export async function GET() { return NextResponse.json({ configured: configured(), authenticated: await isAdmin() }); }
export async function POST(request: Request) {
  if(!sameOrigin(request))return NextResponse.json({error:"Invalid request origin."},{status:403});
  try {
    const response=await laravel("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(await request.json())});
    const data=await response.json();
    if(!response.ok)return NextResponse.json(data,{status:response.status});
    const result=NextResponse.json({ok:true});
    result.cookies.set("creatox-cms",data.token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:28800});return result;
  }catch{return NextResponse.json({error:"Cannot connect to the local Laravel server."},{status:503});}
}
export async function DELETE(request: Request){
  if(!sameOrigin(request))return NextResponse.json({},{status:403});
  try{await laravel("/logout",{method:"POST"},true);}catch{}
  const result=NextResponse.json({ok:true});result.cookies.delete("creatox-cms");return result;
}
