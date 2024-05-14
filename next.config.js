/** @type {import('next').NextConfig} */
const nextConfig = {

       
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'porplehomes.com',
          port: '',
        },
      ],
}



module.exports = nextConfig



    // images: {
       
    //   // remotePatterns: [
    //   //   {
    //   //     protocol: 'https',
    //   //     hostname: 'nw-porplehomes-production.up.railway.app',
    //   //     port: '',
    //   //   },
    //   // ],
    //   domains: [
    //       'localhost:3000'
    //   ],
    //   },
