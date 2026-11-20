import { notFound } from "next/navigation";
import { configured, db } from "@/lib/cms/server";
import type { Post } from "@/lib/cms/types";
import { Footer } from "@/components/sections/Footer";
export const dynamic = "force-dynamic";
async function getPost(slug: string): Promise<Post | undefined> { if(!configured() || !/^[a-z0-9-]+$/.test(slug))return;const posts=await db(`/rest/v1/cms_posts?slug=eq.${slug}&status=eq.published&select=*&limit=1`);return posts[0]; }
export async function generateMetadata({params}:{params:{slug:string}}){const post=await getPost(params.slug);return {title:post?`${post.title} | Creatox Insights`:"Article not found",description:post?.excerpt};}
export default async function Article({params}:{params:{slug:string}}){const post=await getPost(params.slug);if(!post)notFound();return <><article style={{maxWidth:880,margin:"0 auto",padding:"140px 24px 80px"}}><a href="/blog/" style={{color:"#dc0208"}}>← All insights</a><p style={{marginTop:36,color:"#aaa"}}>{post.category} · {new Date(post.created_at).toLocaleDateString("en-IN")}</p><h1 style={{fontSize:"clamp(36px,5vw,64px)",lineHeight:1.12,margin:"24px 0"}}>{post.title}</h1><p style={{fontSize:20,color:"#bbb",lineHeight:1.7}}>{post.excerpt}</p>{post.image&&<img src={post.image} alt={post.title} style={{width:"100%",maxHeight:500,objectFit:"cover",borderRadius:16,margin:"36px 0"}}/>}<div style={{fontSize:17,lineHeight:1.9}}>{post.body.split(/\n\s*\n/).map((paragraph,index)=><p key={index} style={{marginBottom:24,whiteSpace:"pre-wrap"}}>{paragraph}</p>)}</div></article><Footer/></>;}
