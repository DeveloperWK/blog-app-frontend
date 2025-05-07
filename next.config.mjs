/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:{
            bodySizeLimit:"5mb"
        }
    },
    images:{
        remotePatterns:[new URL("https://ik.imagekit.io/**")]
    }
};

export default nextConfig;
