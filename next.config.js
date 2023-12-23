/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // this is technically deprecated but works perfectly.
        // if you'd like to see the remotePatterns version, I'm happy to merge a PR
        remotePatterns: [
          {hostname: 'localhost',
          pathname: '**',
          port: '3000',
          protocol: 'http'}
        ],
      },
}

module.exports = nextConfig
