"use client";

import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { SectionLabel } from "../SectionLabel";

export function BlogGrid() {
  return (
    <section className="py-24 bg-surface px-6" aria-label="Blog & Insights">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center flex flex-col items-center mb-16">
          <SectionLabel text="BLOG & INSIGHTS" className="!mb-4" />
          <h2 className="font-heading text-fluid-2xl text-white font-semibold">
            Check out our latest tips and stories.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className="group bg-black border border-border rounded-[4px] overflow-hidden card-hover flex flex-col h-full"
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
                
                <h3 className="font-body text-[17px] text-white font-bold leading-[1.4] mb-6 line-clamp-2">
                  {post.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mt-auto mb-6">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-surface text-gray font-mono text-[10px] px-2 py-1 rounded-[2px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={post.link}
                  className="font-mono text-[12px] text-red hover:text-white transition-colors flex items-center gap-2 group/link w-fit"
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
            className="border border-white text-white px-8 py-4 text-[14px] font-body hover:bg-white hover:text-black transition-all duration-300"
          >
            View All Posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
