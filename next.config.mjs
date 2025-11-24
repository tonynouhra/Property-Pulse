/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
    images:{
      remotePatterns:[
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/**',
        },
          {
              protocol: 'https',
              hostname: 'res.imagekit.io',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'ik.imagekit.io',
              pathname: '/**',
          },

      ],
    }
};

export default nextConfig;
