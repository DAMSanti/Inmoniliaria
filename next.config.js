/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  reactStrictMode: true,
  
  // Desactivar source maps en producción para reducir memoria
  productionBrowserSourceMaps: false,
  
  // Optimización de webpack para bajo consumo de memoria
  webpack: (config, { isServer }) => {
    // Reducir el uso de memoria durante el build
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three-vendor',
            priority: 10,
            reuseExistingChunk: true,
          },
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion|gsap)[\\/]/,
            name: 'animation-vendor',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
    };
    
    // Desactivar cache de webpack para reducir memoria
    config.cache = false;
    
    return config;
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.digitaloceanspaces.com',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@react-three/drei'],
  },
  
  // Configuración del compilador SWC para reducir uso de memoria
  swcMinify: true,
  
  // No generar tipos automáticamente
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // No fallar por errores de ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
