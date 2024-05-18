/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.porplehomes.com',
        port: '',
      },
    ],
  },
 

}



module.exports = nextConfig

