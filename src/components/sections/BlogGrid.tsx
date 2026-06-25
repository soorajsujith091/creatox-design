"use client";

import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { SectionLabel } from "../SectionLabel";

export function BlogGrid() {
  return (
    <section className="py-24 bg-white px-6" aria-label="Blog & Insights">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center flex flex-col items-center mb-16">
          <SectionLabel text="BLOG & INSIGHTS" className="!mb-4" />
          <h2 className="font-heading text-fluid-2xl text-[#0A0A0A] font-semibold">
            Check out our latest tips and stories.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className="group bg-white border border-[#E8E8E8] rounded-[4px] overflow-hidden card-hover flex flex-col h-full shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <div className="relative h-[240px] w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover img-zoom"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="font-mono text-[11px] text-red mb-4">
                  {post.date}
                </div>
                
                <h3 className="font-body text-[17px] text-[#0A0A0A] font-bold leading-[1.4] mb-6 line-clamp-2">
                  {post.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mt-auto mb-6">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-[#F0F0F0] text-[#555555] font-mono text-[10px] px-2 py-1 rounded-[2px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={post.link}
                  className="font-mono text-[12px] text-red hover:text-[#0A0A0A] transition-colors flex items-center gap-2 group/link w-fit"
                >
                  Read More
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/blog/"
            className="border border-[#0A0A0A] text-[#0A0A0A] px-8 py-4 text-[14px] font-body hover:bg-red hover:text-white hover:border-red transition-all duration-300"
          >
            View All Posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
