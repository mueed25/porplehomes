/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'porplehomes.com',
        port: '',
      },
    ],
  },
}



module.exports = nextConfig

