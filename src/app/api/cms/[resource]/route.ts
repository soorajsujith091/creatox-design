import { NextResponse } from "next/server";
import { laravel, sameOrigin } from "@/lib/cms/server";
export const dynamic="force-dynamic";
const resources=["posts","leads","media","images"];
export async function GET(_:Request,{params}:{params:{resource:string}}){
  if(!resources.includes(params.resource))return NextResponse.json({},{status:404});
  try{const response=await laravel(`/admin/${params.resource}`,{},true);return NextResponse.json(await response.json(),{status:response.status});}catch{return NextResponse.json({error:"Cannot connect to Laravel."},{status:503});}
}
export async function POST(request:Request,{params}:{params:{resource:string}}){
  if(!sameOrigin(request))return NextResponse.json({error:"Invalid request origin."},{status:403});
  if(!resources.includes(params.resource))return NextResponse.json({},{status:404});
  try{
    const isUpload=params.resource==="media";
    if(Number(request.headers.get("content-length"))>6*1024*1024)return NextResponse.json({error:"Choose an image under 5 MB."},{status:413});
    const response=await laravel(`/admin/${params.resource}`,{method:"POST",headers:isUpload?{}:{"Content-Type":"application/json"},body:isUpload?await request.formData():JSON.stringify(await request.json())},true);
    return NextResponse.json(await response.json(),{status:response.status});
  }catch{return NextResponse.json({error:"Unable to save. Check the Laravel server and try again."},{status:503});}
}
