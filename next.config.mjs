/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'img.daisyui.com',
      },
    ],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
