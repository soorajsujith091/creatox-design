/** @type {import('next').NextConfig} */
const nextConfig = {
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
