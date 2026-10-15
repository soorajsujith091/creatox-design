/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const aliases = {
      "the-art-of-storytelling": "the-art-of-storytelling-how-human-focused-videos-drive-conversions",
      "what-is-ppc": "what-is-ppc-learn-the-basics-of-pay-per-click-ppc-marketing",
      "blog-standard": "blog", "blog-grid": "blog", "portfolio-showcase": "projects",
      "portfolio-grid": "projects", "careers": "career",
    };
    return Object.entries(aliases).map(([from, to]) => ({ source: `/${from}`, destination: `/${to}`, permanent: true }));
  },
  // Keep production builds from overwriting a running development server.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "creatoxdesigns.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    formats: ["image/webp"],
  },
};

export default nextConfig;
