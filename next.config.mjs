/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ['react-map-gl', 'mapbox-gl'],
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
          {
              protocol: 'https',
              hostname: 'api.mapbox.com',
              pathname: '/**',
          },

      ],
    }
};

export default nextConfig;
