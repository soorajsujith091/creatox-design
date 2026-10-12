/** @type {import('next').NextConfig} */
const nextConfig = {
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
