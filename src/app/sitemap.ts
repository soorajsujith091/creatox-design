import type { MetadataRoute } from "next";
import { allPaths, siteUrl } from "@/lib/inner-content";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["",...allPaths()].map(path=>({ url:`${siteUrl}/${path ? path+"/" : ""}`,changeFrequency:path==="blog" ? "weekly" : "monthly",priority:path==="" ? 1 : path.includes("/") ? .6 : .8 }));
}
