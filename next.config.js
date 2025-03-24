/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3001']
    }
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        url: false,
        http: false,
        https: false,
        zlib: false,
        net: false,
        tls: false,
        child_process: false,
        os: false,
        dns: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig 