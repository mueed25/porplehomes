/** @type {import('next').NextConfig} */
const nextConfig = {

//     images: {
// <<<<<<< HEAD
//       domains: [
//         'localhost'
//       ] // whatever port your backend runs on
//     }
  
// =======
       
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'porplehomes.com',
          port: '',
        },
      ],
//       },
// >>>>>>> 8869c796cab9e4f3bcf870f48e9549a005691cb6
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
