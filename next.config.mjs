/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    remotePatterns: [new URL("https://ik.imagekit.io/**")],
  },
};

export default nextConfig;
