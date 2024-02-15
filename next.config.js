/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
       
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'nw-porplehomes-production.up.railway.app',
          port: '',
        },
      ],
      },
}

// domains: [
//   'localhost',
//   'digitalhippo-production.up.railway.app',
// ],

module.exports = nextConfig
