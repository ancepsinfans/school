/** @type {import('next').NextConfig} */
const path = require('path')
const withPlugins = require('next-compose-plugins')
const removeImports = require('next-remove-imports')()

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: 'loose' },
  compiler: {
    styledComponents: true
  },
  webpack: (config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@/components': path.resolve(__dirname, 'components'),
      '@/middleware': path.resolve(__dirname, 'middleware'),
      '@/styles': path.resolve(__dirname, 'styles'),
      '@/models': path.resolve(__dirname, 'models'),
      '@/api': path.resolve(__dirname, 'app/api'),
    }
    return config
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: [
      'zach.bullard.dev',
      's.gravatar.com',
      'www.thispersondoesnotexist.com',
      'lh3.googleusercontent.com'
    ],
  },
  env: {
    mongodburl: process.env.MONGODB_URI
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: "*"
          }
        ]
      }
    ]
  }

}

module.exports = withPlugins(
  [[removeImports], [withMDX]],
  nextConfig
)