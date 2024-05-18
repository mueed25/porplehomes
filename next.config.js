/** @type {import('next').NextConfig} */
const nextConfig = {


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'porplehomes.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
 
    

}



module.exports = nextConfig

