/** @type {import('next').NextConfig} */
const nextConfig = {
// <<<<<<< HEAD

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'porplehomes.com',
        port: '',
      },
    ],
  },
 
    
// =======
// images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'porplehomes.com',
//         port: '',
//       },
//     ],
//   },
// >>>>>>> b00b765ee1b137b79e62dba71b2ccb38ca91efe5
}



module.exports = nextConfig

